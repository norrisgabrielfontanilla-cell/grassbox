import { useEffect, useRef, useState } from 'react';

export default function SessionPlanner({ config, selectedGoal }) {
  const [experience, setExperience] = useState('New to boxing');
  const [gloves, setGloves] = useState(false);
  const [preferredTime, setPreferredTime] = useState('');
  const [copyState, setCopyState] = useState('');
  const messageRef = useRef(null);
  const timer = useRef(null);
  const total = config.price + (gloves ? config.gloveFee : 0);
  const message = `Hi Norris! I’d like to book a private boxing session at Grass Residences.\n\nGoal: ${selectedGoal}\nExperience: ${experience}\nGloves: ${gloves ? 'I need a pair (+₱' + config.gloveFee + ')' : 'I’ll bring my own'}\nPreferred day/time: ${preferredTime.trim() || 'Please let me know your available times'}\nSession total: ₱${total}\n\nWhat times are available?`;
  useEffect(() => { setCopyState(''); }, [message]);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const copy = async () => {
    try { await navigator.clipboard.writeText(message); setCopyState('Copied. Open Instagram and paste it in a message to Norris.'); if(typeof window.gtag === 'function') window.gtag('event','booking_request_copied',{gloves}); }
    catch { messageRef.current?.focus(); messageRef.current?.select(); setCopyState('Select and copy the request below, then paste it into Instagram.'); }
    window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setCopyState(''), 10000);
  };
  return <div className="session-planner"><div className="planner-heading"><span className="eyebrow">LET’S GET YOU STARTED</span><h3>Plan your first session.</h3><p>Choose a few details. Send your request to Norris to confirm availability.</p></div><fieldset><legend>YOUR EXPERIENCE</legend><div className="experience-options">{['New to boxing','Some experience','Regular training'].map(option => <label key={option} className={experience === option ? 'selected' : ''}><input type="radio" name="experience" value={option} checked={experience === option} onChange={() => setExperience(option)} /><span>{option}</span></label>)}</div></fieldset><div className="glove-option"><div><label htmlFor="gloves">Need boxing gloves?</label><p>Add ₱{config.gloveFee} to use a pair.</p></div><input id="gloves" className="switch-input" type="checkbox" role="switch" checked={gloves} onChange={event => setGloves(event.target.checked)} /><label className="switch" htmlFor="gloves"><span className="sr-only">Need boxing gloves</span></label></div><label className="time-label" htmlFor="preferred-time">PREFERRED DAY & TIME <span>Optional</span></label><input id="preferred-time" className="time-input" value={preferredTime} onChange={event => setPreferredTime(event.target.value)} placeholder="e.g. Saturday afternoon" maxLength="100" /><div className="planner-total" aria-live="polite"><div><span>YOUR SESSION TOTAL</span><small>{gloves ? `₱${config.price} coaching + ₱${config.gloveFee} gloves` : 'Private coaching · bringing your own gloves'}</small></div><strong>₱{total}</strong></div><button className="button button-dark copy-request" type="button" onClick={copy}>1. COPY YOUR REQUEST <span aria-hidden="true">↗</span></button><a className="button button-instagram" href={`https://instagram.com/${config.instagram}`} target="_blank" rel="noopener noreferrer" onClick={() => { if(typeof window.gtag === 'function') window.gtag('event','booking_click',{location:'session_planner'}); }}>2. OPEN INSTAGRAM <span aria-hidden="true">↗</span></a><p className="planner-status" role="status">{copyState || 'Your session is confirmed once Norris replies.'}</p><details className="request-preview" open={copyState.startsWith('Select')}><summary>View your message <span aria-hidden="true">+</span></summary><textarea ref={messageRef} readOnly value={message} aria-label="Your booking request" rows="9" /></details></div>;
}

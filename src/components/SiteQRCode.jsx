import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
export default function SiteQRCode({ brandName }) {
  const [code,setCode] = useState('');
  const [url,setUrl] = useState('');
  const [status,setStatus] = useState('');
  useEffect(() => { const siteUrl = new URL(import.meta.env.BASE_URL,window.location.origin).href; setUrl(siteUrl); QRCode.toDataURL(siteUrl,{errorCorrectionLevel:'H',margin:3,width:720,color:{dark:'#111410FF',light:'#FFFFFFFF'}}).then(setCode).catch(() => setStatus('QR unavailable. You can still copy the website link.')); },[]);
  return <details className="share-site"><summary>SHARE GRASS BOXING <span aria-hidden="true">+</span></summary><div className="site-qr">{code && <div className="site-qr-image"><img src={code} alt={`QR code for ${brandName}`} width="80" height="80" /></div>}<div className="site-qr-copy">{code && <a href={code} download="GRASS_BOXING_QR.png">DOWNLOAD QR PNG ↘</a>}<button type="button" onClick={async () => { try { await navigator.clipboard.writeText(url);setStatus('Website link copied.'); } catch {setStatus(url);} }}>COPY WEBSITE LINK ↗</button></div></div><p className="site-qr-status" role="status">{status}</p></details>;
}

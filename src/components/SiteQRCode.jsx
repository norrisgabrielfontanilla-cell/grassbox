import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export default function SiteQRCode({ brandName }) {
  const [code, setCode] = useState('');
  const [siteUrl, setSiteUrl] = useState('');

  useEffect(() => {
    // Vite's base path includes the repository name on GitHub Pages.
    const url = new URL(import.meta.env.BASE_URL, window.location.origin).href;
    setSiteUrl(url);
    QRCode.toDataURL(url, {
      errorCorrectionLevel: 'H',
      margin: 3,
      width: 720,
      color: { dark: '#0A0A0AFF', light: '#FFFFFFFF' },
    }).then(setCode).catch(() => setCode(''));
  }, []);

  if (!code) return null;
  return <div className="site-qr">
    <div className="site-qr-image"><img src={code} alt={`QR code linking to ${brandName} website`} width="122" height="122" /></div>
    <div className="site-qr-copy"><span>TAKE THE SITE WITH YOU</span><strong>SCAN TO OPEN<br />{brandName}.</strong>
      <a href={code} download={`${brandName.replace(/\s+/g, '_')}_QR.png`} aria-label={`Download QR code for ${siteUrl}`}>DOWNLOAD QR ↘</a>
    </div>
  </div>;
}

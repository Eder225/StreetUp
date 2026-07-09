import Link from "next/link";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link href="/" className="logo-text footer-logo">
            STREET<span className="logo-accent">UP</span>
          </Link>
          <p className="footer-tagline">
            Le streetwear qui redéfinit ton style, drop après drop.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-link" aria-label="Instagram">
              <svg className="icon" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.034-.757.078-1.132.13-.467.066-.795.49-.795.965v9.36c0 .475.328.9.795.965.375.052.752.096 1.132.13a2.31 2.31 0 011.64 1.055m4.346-13.66a2.31 2.31 0 011.642 1.055c.38.034.757.078 1.132.13.467.066.795.49.795.965v9.36c0 .475-.328.9-.795.965-.375.052-.752.096-1.132.13a2.31 2.31 0 01-1.642 1.055m-4.346-13.66L8.586 4.5a2.25 2.25 0 011.342-.5h4.144a2.25 2.25 0 011.342.5l1.927 1.675m-8.713 0a48.667 48.667 0 018.713 0M12 12.75a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="TikTok">
              <svg className="icon" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.5a3.5 3.5 0 103.5 3.5V4c.5 2.5 2.5 4 5 4" />
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="Facebook">
              <svg className="icon" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.244 4H14.41c-2.063 0-3.736 1.673-3.736 3.736V10H7.756v3.736h2.918V20h3.736v-6.264h2.918l.918-3.736h-3.836V7.736c0-.516.419-.935.935-.935h2.9V4z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-heading">Boutique</h4>
          <Link href="/nouveautes" className="footer-link">Nouveautés</Link>
          <Link href="/vetements" className="footer-link">Vêtements</Link>
          <Link href="/sneakers" className="footer-link">Sneakers</Link>
          <Link href="/accessoires" className="footer-link">Accessoires</Link>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-heading">Aide</h4>
          <a href="#" className="footer-link">Livraison</a>
          <a href="#" className="footer-link">Retours &amp; Échanges</a>
          <a href="#" className="footer-link">Guide des tailles</a>
          <a href="#" className="footer-link">FAQ</a>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-heading">Contact</h4>
          <a href="mailto:contact@streetup.com" className="footer-link">contact@streetup.com</a>
          <a href="tel:+2250000000000" className="footer-link">+225 00 00 00 00 00</a>
          <p className="footer-link footer-address">Abidjan, Côte d&apos;Ivoire</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">© 2026 StreetUp. Tous droits réservés.</p>
        <div className="footer-legal">
          <a href="#" className="footer-legal-link">Mentions légales</a>
          <a href="#" className="footer-legal-link">Confidentialité</a>
        </div>
      </div>
    </footer>
  );
}

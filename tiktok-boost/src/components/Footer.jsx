import { Music, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <Music size={32} />
            <span>TikTok Boost</span>
          </div>
          <p>Boost your TikTok presence with our professional services. Get more followers, likes, and views instantly.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li>Followers</li>
            <li>Likes</li>
            <li>Views</li>
            <li>Comments</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <a href="https://t.me/tiktokboost" target="_blank" rel="noopener noreferrer" className="telegram-btn">
            <Send size={18} />
            <span>Telegram Support</span>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 TikTok Boost. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

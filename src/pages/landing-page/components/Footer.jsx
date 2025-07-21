import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Browse Loans', path: '/loan-details' },
      { label: 'Create Request', path: '/create-loan-request' },
      { label: 'Repayments', path: '/repayment-management' }
    ],
    resources: [
      { label: 'Documentation', path: '#' },
      { label: 'API Reference', path: '#' },
      { label: 'Smart Contracts', path: '#' },
      { label: 'Security Audit', path: '#' }
    ],
    community: [
      { label: 'Discord', path: '#' },
      { label: 'Telegram', path: '#' },
      { label: 'Twitter', path: '#' },
      { label: 'GitHub', path: '#' }
    ],
    legal: [
      { label: 'Privacy Policy', path: '#' },
      { label: 'Terms of Service', path: '#' },
      { label: 'Risk Disclosure', path: '#' },
      { label: 'Compliance', path: '#' }
    ]
  };

  const socialLinks = [
    { icon: 'MessageCircle', label: 'Discord', href: '#' },
    { icon: 'Send', label: 'Telegram', href: '#' },
    { icon: 'Twitter', label: 'Twitter', href: '#' },
    { icon: 'Github', label: 'GitHub', href: '#' }
  ];

  return (
    <footer className="bg-card border-t border-border animate-fadeInUp">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Main Footer Content */}
        <div className="h-2 w-full bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-b-xl mb-2 animate-fadeInUp" style={{animationDelay: '0.1s'}} />
        <div className="py-16 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link to="/landing-page" className="flex items-center space-x-2 mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
                  <Icon name="Coins" size={24} color="white" />
                </div>
                <span className="text-2xl font-bold text-foreground">DeFi Micro</span>
              </Link>

              <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                Decentralized microfinance platform connecting small businesses 
                with global lenders through blockchain technology.
              </p>

              {/* Decentralized Hosting Indicators */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="text-sm text-muted-foreground">Hosted on IPFS</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Lock" size={16} className="text-primary" />
                  <span className="text-sm text-muted-foreground">Smart Contract Verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Globe" size={16} className="text-secondary" />
                  <span className="text-sm text-muted-foreground">Fully Decentralized</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-gradient-to-br hover:from-primary/20 hover:to-accent/20 transition-all duration-200 shadow hover:shadow-lg"
                    aria-label={social.label}
                  >
                    <Icon name={social.icon} size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Platform</h3>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-foreground transition-smooth"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.path}
                      className="text-muted-foreground hover:text-foreground transition-smooth"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.path}
                      className="text-muted-foreground hover:text-foreground transition-smooth"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>© {currentYear} DeFi Micro. All rights reserved.</span>
              <div className="flex items-center space-x-2">
                <Icon name="Code" size={14} />
                <span>Open Source</span>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-muted-foreground">Network Status: Active</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={14} className="text-primary" />
                <span className="text-muted-foreground">Solana</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="Hexagon" size={14} className="text-secondary" />
                <span className="text-muted-foreground">Ethereum</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
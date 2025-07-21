import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import WalletStatusIndicator from './WalletStatusIndicator';
import BlockchainNetworkToggle from './BlockchainNetworkToggle';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Marketplace', path: '/loan-details', icon: 'Store' },
    { label: 'My Loans', path: '/create-loan-request', icon: 'FileText' },
    { label: 'Payments', path: '/repayment-management', icon: 'CreditCard' },
    { label: 'Profile', path: '/user-profile', icon: 'User' },
  ];

  const isActivePath = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-xl border-b-2 border-accent shadow-2xl rounded-b-2xl">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Coins" size={20} color="white" />
          </div>
          <span className="text-xl font-semibold text-foreground">DeFi Micro</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative group ${
                isActivePath(item.path)
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-accent to-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full" />
            </Link>
          ))}
        </nav>

        {/* Right Side - Wallet & Network */}
        <div className="flex items-center space-x-4">
          <BlockchainNetworkToggle />
          <WalletStatusIndicator />
          {/* Floating User Avatar/Status */}
          <Link to="/user-profile" className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/40 to-primary/40 flex items-center justify-center shadow-lg border-2 border-accent animate-popIn hover:scale-105 hover:shadow-glow transition-transform duration-200" title="Profile">
            <Icon name="User" size={20} className="text-primary" />
          </Link>
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-smooth ${
                  isActivePath(item.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
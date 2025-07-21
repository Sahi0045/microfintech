import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import HeroSection from './components/HeroSection';
import BenefitsGrid from './components/BenefitsGrid';
import StatisticsSection from './components/StatisticsSection';
import WalletConnectionModal from './components/WalletConnectionModal';
import CallToActionSection from './components/CallToActionSection';
import Footer from './components/Footer';

const LandingPage = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [walletData, setWalletData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing wallet connection
    const savedWallet = localStorage.getItem('walletConnected');
    const savedAddress = localStorage.getItem('walletAddress');
    const savedBalance = localStorage.getItem('walletBalance');
    
    if (savedWallet === 'true' && savedAddress) {
      setIsWalletConnected(true);
      setWalletData({
        address: savedAddress,
        balance: savedBalance || '0.00'
      });
    }
  }, []);

  // Force dark mode on mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleConnectWallet = () => {
    setShowWalletModal(true);
  };

  const handleWalletConnected = (data) => {
    setIsWalletConnected(true);
    setWalletData(data);
    setShowWalletModal(false);
  };

  const handleDisconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletData(null);
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletBalance');
    localStorage.removeItem('selectedNetwork');
    localStorage.removeItem('walletType');
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-card/80 backdrop-blur-xl border-b border-border shadow-2xl rounded-b-2xl">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/landing-page" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Icon name="Coins" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">DeFi Micro</span>
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#benefits" className="text-muted-foreground hover:text-foreground transition-smooth">
                Benefits
              </a>
              <a href="#statistics" className="text-muted-foreground hover:text-foreground transition-smooth">
                Statistics
              </a>
              <a href="#get-started" className="text-muted-foreground hover:text-foreground transition-smooth">
                Get Started
              </a>
            </nav>

            {/* Wallet Connection */}
            <div className="flex items-center space-x-4">
              {isWalletConnected ? (
                <div className="flex items-center space-x-3">
                  <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-success/10 text-success rounded-lg border border-success/20">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm font-mono">{formatAddress(walletData?.address)}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/dashboard')}
                    iconName="LayoutDashboard"
                    iconPosition="left"
                  >
                    Dashboard
                  </Button>
                </div>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleConnectWallet}
                  iconName="Wallet"
                  iconPosition="left"
                >
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* Hero Image Placeholder */}
      <div className="w-full flex justify-center items-center bg-transparent mt-2 mb-8">
        <img src="/public/assets/images/no_image.png" alt="Hero" className="max-w-4xl w-full h-64 object-cover rounded-3xl shadow-2xl border border-border bg-muted/30" style={{background: 'linear-gradient(135deg, #232526 0%, #414345 100%)'}} />
      </div>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection 
          onConnectWallet={handleConnectWallet}
          isWalletConnected={isWalletConnected}
        />

        {/* Benefits Grid */}
        <div id="benefits">
          <BenefitsGrid />
        </div>

        {/* Statistics Section */}
        <div id="statistics">
          <StatisticsSection />
        </div>

        {/* Call to Action Section */}
        <div id="get-started">
          <CallToActionSection 
            onConnectWallet={handleConnectWallet}
            isWalletConnected={isWalletConnected}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Wallet Connection Modal */}
      <WalletConnectionModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onWalletConnected={handleWalletConnected}
      />
    </div>
  );
};

export default LandingPage;
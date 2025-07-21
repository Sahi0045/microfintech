import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnimatedBackground = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none z-0"
    viewBox="0 0 1440 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1" gradientTransform="rotate(120)">
        <stop stopColor="#a5b4fc" stopOpacity="0.18" />
        <stop offset="1" stopColor="#f472b6" stopOpacity="0.12" />
      </linearGradient>
    </defs>
    <ellipse cx="720" cy="300" rx="900" ry="320" fill="url(#heroGradient)" />
    <ellipse cx="300" cy="100" rx="200" ry="80" fill="#f472b6" fillOpacity="0.08" />
    <ellipse cx="1200" cy="500" rx="180" ry="60" fill="#a5b4fc" fillOpacity="0.10" />
  </svg>
);

const HeroSection = ({ onConnectWallet, isWalletConnected }) => {
  const navigate = useNavigate();

  const handleStartBorrowing = () => {
    if (isWalletConnected) {
      navigate('/create-loan-request');
    } else {
      onConnectWallet();
    }
  };

  const handleStartLending = () => {
    if (isWalletConnected) {
      navigate('/dashboard');
    } else {
      onConnectWallet();
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-20 lg:py-32 overflow-hidden">
      {/* Animated SVG Background */}
      <AnimatedBackground />
      {/* Decorative Circles */}
      <div className="absolute top-10 left-10 w-24 h-24 border-2 border-primary rounded-full opacity-10 animate-pulse" />
      <div className="absolute top-32 right-20 w-16 h-16 border-2 border-secondary rounded-full opacity-10 animate-pulse delay-200" />
      <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-accent rounded-full opacity-10 animate-pulse delay-500" />
      {/* Floating SVG Illustration */}
      <svg className="absolute right-0 bottom-0 w-64 h-64 opacity-30 animate-float-slow pointer-events-none z-0" viewBox="0 0 300 300" fill="none"><ellipse cx="150" cy="150" rx="140" ry="80" fill="url(#floatGradient)" /><defs><linearGradient id="floatGradient" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#927A5E" stopOpacity="0.18" /><stop offset="1" stopColor="#D4493D" stopOpacity="0.12" /></linearGradient></defs></svg>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fadeInUp" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-6">
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={18} className="text-success" />
                <span className="text-base font-medium text-success">Blockchain Secured</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <div className="flex items-center space-x-1">
                <Icon name="Globe" size={18} className="text-primary" />
                <span className="text-base font-medium text-primary">Decentralized</span>
              </div>
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold text-foreground mb-8 leading-tight tracking-tight drop-shadow-xl" style={{lineHeight: '1.1'}}>
              Microfinance
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Reimagined</span>
            </h1>

            <p className="text-xl lg:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 font-medium">
              Connect small businesses with global lenders through our decentralized platform. 
              No banks, no intermediaries – just transparent, blockchain-powered microloans.
            </p>

            {/* Dual CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Button
                variant="default"
                size="xl"
                onClick={handleStartBorrowing}
                iconName="TrendingUp"
                iconPosition="left"
                className="flex-1 sm:flex-none transition-transform duration-200 hover:scale-105 focus:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Borrowing
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={handleStartLending}
                iconName="Coins"
                iconPosition="left"
                className="flex-1 sm:flex-none transition-transform duration-200 hover:scale-105 focus:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Lending
              </Button>
            </div>

            {!isWalletConnected && (
              <p className="text-base text-muted-foreground flex items-center justify-center lg:justify-start space-x-2 animate-fadeIn">
                <Icon name="Wallet" size={18} />
                <span>Connect your wallet to get started</span>
              </p>
            )}

            {/* Trust Indicators */}
            <div className="flex items-center justify-center lg:justify-start space-x-8 mt-10 pt-8 border-t border-border animate-fadeInUp delay-300">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={18} className="text-success" />
                <span className="text-base text-muted-foreground">Smart Contract Verified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={18} className="text-primary" />
                <span className="text-base text-muted-foreground">IPFS Secured</span>
              </div>
            </div>
          </div>

          {/* Visual Card */}
          <div className="relative animate-fadeInUp delay-200" style={{animationDelay: '0.2s'}}>
            <div className="relative bg-card rounded-3xl p-10 shadow-2xl border border-border backdrop-blur-xl bg-opacity-90">
              <div className="absolute -top-5 -right-5 w-10 h-10 bg-success rounded-full flex items-center justify-center shadow-lg animate-popIn">
                <Icon name="Check" size={20} color="white" />
              </div>
              <div className="space-y-8">
                <div className="flex items-center space-x-5">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="User" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">Maria Santos</h3>
                    <p className="text-base text-muted-foreground">Small Business Owner</p>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base text-muted-foreground">Loan Amount</span>
                    <span className="font-semibold text-foreground">$2,500 USDC</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base text-muted-foreground">Interest Rate</span>
                    <span className="font-semibold text-success">8.5% APR</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-base text-muted-foreground">Repayment</span>
                    <span className="font-semibold text-foreground">12 months</span>
                  </div>
                </div>
                {/* Animated Progress Bar */}
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-success/20 rounded-full h-3 overflow-hidden">
                    <div className="bg-success h-3 rounded-full animate-progressBar" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-base font-medium text-success">75% Funded</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={18} className="text-muted-foreground" />
                    <span className="text-base text-muted-foreground">12 Lenders</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={18} className="text-muted-foreground" />
                    <span className="text-base text-muted-foreground">2 days left</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating Badges */}
            <div className="absolute -top-8 left-8 bg-card border border-border rounded-lg p-4 shadow-lg animate-fadeInUp delay-300">
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={18} className="text-success" />
                <span className="text-base font-medium text-foreground">98% Success Rate</span>
              </div>
            </div>
            <div className="absolute -bottom-8 right-8 bg-card border border-border rounded-lg p-4 shadow-lg animate-fadeInUp delay-500">
              <div className="flex items-center space-x-2">
                <Icon name="Globe" size={18} className="text-primary" />
                <span className="text-base font-medium text-foreground">Global Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
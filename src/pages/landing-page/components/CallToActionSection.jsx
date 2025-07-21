import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CallToActionSection = ({ onConnectWallet, isWalletConnected }) => {
  const navigate = useNavigate();

  const handleBorrowerAction = () => {
    if (isWalletConnected) {
      navigate('/create-loan-request');
    } else {
      onConnectWallet();
    }
  };

  const handleLenderAction = () => {
    if (isWalletConnected) {
      navigate('/dashboard');
    } else {
      onConnectWallet();
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 relative overflow-hidden">
      {/* Top Wave Divider */}
      <svg className="absolute top-0 left-0 w-full h-12 lg:h-16 text-background" viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0,0 C480,60 960,0 1440,60 L1440,0 L0,0 Z" /></svg>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of borrowers and lenders who are already using our 
              decentralized microfinance platform.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Borrower Card */}
            <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Icon name="TrendingUp" size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                For Borrowers
              </h3>
              <p className="text-muted-foreground mb-6">
                Access microloans from $100 to $5,000 with competitive rates 
                and flexible terms. No traditional banking requirements.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <Icon name="Check" size={18} className="text-success" />
                  <span className="text-sm text-muted-foreground">Quick approval process</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Icon name="Check" size={18} className="text-success" />
                  <span className="text-sm text-muted-foreground">Competitive interest rates</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Icon name="Check" size={18} className="text-success" />
                  <span className="text-sm text-muted-foreground">Build blockchain reputation</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Icon name="Check" size={18} className="text-success" />
                  <span className="text-sm text-muted-foreground">Global funding access</span>
                </li>
              </ul>
              <Button
                variant="default"
                size="lg"
                onClick={handleBorrowerAction}
                iconName="Plus"
                iconPosition="left"
                className="w-full transition-transform duration-200 hover:scale-105 focus:scale-105 shadow-lg hover:shadow-xl"
              >
                {isWalletConnected ? 'Create Loan Request' : 'Connect & Borrow'}
              </Button>
            </div>
            {/* Lender Card */}
            <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
              <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Icon name="Coins" size={28} className="text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                For Lenders
              </h3>
              <p className="text-muted-foreground mb-6">
                Earn attractive returns while supporting small businesses worldwide. 
                Diversify your portfolio with microfinance investments.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <Icon name="Check" size={18} className="text-success" />
                  <span className="text-sm text-muted-foreground">8-15% annual returns</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Icon name="Check" size={18} className="text-success" />
                  <span className="text-sm text-muted-foreground">Portfolio diversification</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Icon name="Check" size={18} className="text-success" />
                  <span className="text-sm text-muted-foreground">Social impact investing</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Icon name="Check" size={18} className="text-success" />
                  <span className="text-sm text-muted-foreground">Transparent tracking</span>
                </li>
              </ul>
              <Button
                variant="outline"
                size="lg"
                onClick={handleLenderAction}
                iconName="Search"
                iconPosition="left"
                className="w-full transition-transform duration-200 hover:scale-105 focus:scale-105 shadow-lg hover:shadow-xl"
              >
                {isWalletConnected ? 'Browse Loans' : 'Connect & Lend'}
              </Button>
            </div>
          </div>
          {/* Bottom CTA */}
          {!isWalletConnected && (
            <div className="text-center animate-fadeInUp delay-300">
              <div className="bg-card border border-border rounded-xl p-6 inline-block shadow-lg">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Icon name="Wallet" size={22} className="text-primary" />
                  <span className="text-base font-medium text-foreground">
                    Connect your wallet to get started
                  </span>
                </div>
                <Button
                  variant="default"
                  onClick={onConnectWallet}
                  iconName="Wallet"
                  iconPosition="left"
                >
                  Connect Wallet
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
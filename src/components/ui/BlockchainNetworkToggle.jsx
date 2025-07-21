import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const BlockchainNetworkToggle = () => {
  const [selectedNetwork, setSelectedNetwork] = useState('solana');
  const [showDropdown, setShowDropdown] = useState(false);

  const networks = [
    {
      id: 'solana',
      name: 'Solana',
      icon: 'Zap',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'Fast & Low Cost'
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      icon: 'Hexagon',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Secure & Established'
    }
  ];

  useEffect(() => {
    const savedNetwork = localStorage.getItem('selectedNetwork');
    if (savedNetwork && networks.find(n => n.id === savedNetwork)) {
      setSelectedNetwork(savedNetwork);
    }
  }, []);

  const handleNetworkChange = (networkId) => {
    setSelectedNetwork(networkId);
    setShowDropdown(false);
    localStorage.setItem('selectedNetwork', networkId);
    
    // Emit custom event for other components to listen to network changes
    window.dispatchEvent(new CustomEvent('networkChanged', { 
      detail: { network: networkId } 
    }));
  };

  const currentNetwork = networks.find(n => n.id === selectedNetwork);

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 px-3 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-smooth"
      >
        <div className={`flex items-center justify-center w-6 h-6 rounded ${currentNetwork.bgColor}`}>
          <Icon name={currentNetwork.icon} size={14} className={currentNetwork.color} />
        </div>
        <span className="hidden sm:block text-sm font-medium text-foreground">
          {currentNetwork.name}
        </span>
        <Icon name="ChevronDown" size={14} className="text-muted-foreground" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-elevated z-50">
          <div className="p-2">
            <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Select Network
            </div>
            {networks.map((network) => (
              <button
                key={network.id}
                onClick={() => handleNetworkChange(network.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md text-left transition-smooth ${
                  selectedNetwork === network.id
                    ? 'bg-primary/10 text-primary' :'text-popover-foreground hover:bg-muted'
                }`}
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded ${network.bgColor}`}>
                  <Icon name={network.icon} size={16} className={network.color} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{network.name}</span>
                    {selectedNetwork === network.id && (
                      <Icon name="Check" size={14} className="text-primary" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{network.description}</span>
                </div>
              </button>
            ))}
          </div>
          
          <div className="px-3 py-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Network affects transaction fees and processing times
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockchainNetworkToggle;
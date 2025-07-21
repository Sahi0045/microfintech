import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const NetworkStatusCard = () => {
  const [selectedNetwork, setSelectedNetwork] = useState('solana');
  const [networkStats, setNetworkStats] = useState({
    solana: {
      status: 'online',
      blockHeight: '245,678,901',
      tps: '2,847',
      avgFee: '$0.00025',
      congestion: 'low'
    },
    ethereum: {
      status: 'online',
      blockHeight: '18,567,234',
      tps: '15',
      avgFee: '$12.45',
      congestion: 'medium'
    }
  });

  useEffect(() => {
    const savedNetwork = localStorage.getItem('selectedNetwork');
    if (savedNetwork) {
      setSelectedNetwork(savedNetwork);
    }

    // Listen for network changes from header component
    const handleNetworkChange = (event) => {
      setSelectedNetwork(event.detail.network);
    };

    window.addEventListener('networkChanged', handleNetworkChange);
    return () => window.removeEventListener('networkChanged', handleNetworkChange);
  }, []);

  const currentStats = networkStats[selectedNetwork];
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-emerald-600';
      case 'degraded': return 'text-amber-600';
      case 'offline': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'online': return 'bg-emerald-50';
      case 'degraded': return 'bg-amber-50';
      case 'offline': return 'bg-red-50';
      default: return 'bg-muted';
    }
  };

  const getCongestionColor = (congestion) => {
    switch (congestion) {
      case 'low': return 'text-emerald-600';
      case 'medium': return 'text-amber-600';
      case 'high': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Wifi" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Network Status</h3>
      </div>
      
      <div className="space-y-4">
        {/* Current Network */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center space-x-3">
            <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${getStatusBgColor(currentStats.status)}`}>
              <Icon 
                name={selectedNetwork === 'solana' ? 'Zap' : 'Hexagon'} 
                size={16} 
                className={getStatusColor(currentStats.status)} 
              />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground capitalize">
                {selectedNetwork} Network
              </h4>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${currentStats.status === 'online' ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`}></div>
                <span className={`text-xs capitalize ${getStatusColor(currentStats.status)}`}>
                  {currentStats.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Network Statistics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Layers" size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Block Height</span>
            </div>
            <p className="text-sm font-semibold text-foreground font-mono">
              {currentStats.blockHeight}
            </p>
          </div>
          
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Gauge" size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">TPS</span>
            </div>
            <p className="text-sm font-semibold text-foreground font-mono">
              {currentStats.tps}
            </p>
          </div>
          
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="DollarSign" size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Avg Fee</span>
            </div>
            <p className="text-sm font-semibold text-foreground font-mono">
              {currentStats.avgFee}
            </p>
          </div>
          
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Activity" size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Congestion</span>
            </div>
            <p className={`text-sm font-semibold capitalize ${getCongestionColor(currentStats.congestion)}`}>
              {currentStats.congestion}
            </p>
          </div>
        </div>

        {/* Last Updated */}
        <div className="flex items-center justify-center pt-2 border-t border-border">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="RefreshCw" size={12} />
            <span>Updated {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkStatusCard;
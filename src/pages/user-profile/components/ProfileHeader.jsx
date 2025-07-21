import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ userProfile, onEditProfile }) => {
  const [showDIDDetails, setShowDIDDetails] = useState(false);

  const copyDID = () => {
    navigator.clipboard.writeText(userProfile.did);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Profile Info */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-card flex items-center justify-center">
              <Icon name="Check" size={12} color="white" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h1 className="text-xl font-semibold text-foreground">{userProfile.name}</h1>
              <div className="flex items-center space-x-1 px-2 py-1 bg-success/10 text-success rounded-md">
                <Icon name="Shield" size={14} />
                <span className="text-xs font-medium">Verified</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="MapPin" size={14} />
              <span>{userProfile.location}</span>
              <span>•</span>
              <span>Member since {userProfile.memberSince}</span>
            </div>
            
            <div className="flex items-center space-x-2 mt-2">
              <button
                onClick={() => setShowDIDDetails(!showDIDDetails)}
                className="flex items-center space-x-1 text-xs text-primary hover:text-primary/80 transition-smooth"
              >
                <Icon name="Key" size={12} />
                <span className="font-mono">DID: {userProfile.did.slice(0, 12)}...</span>
                <Icon name={showDIDDetails ? "ChevronUp" : "ChevronDown"} size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Share"
            iconPosition="left"
            onClick={() => navigator.share({ url: window.location.href })}
          >
            Share Profile
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            onClick={onEditProfile}
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {/* DID Details Dropdown */}
      {showDIDDetails && (
        <div className="mt-4 p-4 bg-muted rounded-lg border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Decentralized Identity</span>
            <div className="flex items-center space-x-1 text-success">
              <Icon name="Shield" size={14} />
              <span className="text-xs">Verified</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <code className="flex-1 text-xs font-mono bg-background px-2 py-1 rounded border">
              {userProfile.did}
            </code>
            <Button
              variant="ghost"
              size="xs"
              iconName="Copy"
              onClick={copyDID}
            />
          </div>
          
          <div className="mt-3 text-xs text-muted-foreground">
            <p>Your DID is stored on-chain and provides cryptographic proof of identity verification.</p>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{userProfile.stats.totalLoans}</div>
          <div className="text-xs text-muted-foreground">Total Loans</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success">{userProfile.stats.successRate}%</div>
          <div className="text-xs text-muted-foreground">Success Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{userProfile.stats.reputationScore}</div>
          <div className="text-xs text-muted-foreground">Reputation</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">${userProfile.stats.totalVolume}</div>
          <div className="text-xs text-muted-foreground">Total Volume</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const AutoPaymentSetup = ({ isEnabled, onToggle, settings, onUpdateSettings }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localSettings, setLocalSettings] = useState({
    frequency: settings?.frequency || 'monthly',
    daysBefore: settings?.daysBefore || 3,
    maxAmount: settings?.maxAmount || 1000,
    enableNotifications: settings?.enableNotifications || true,
    backupWallet: settings?.backupWallet || '',
    ...settings
  });

  const handleSave = () => {
    onUpdateSettings(localSettings);
    setIsExpanded(false);
  };

  const handleCancel = () => {
    setLocalSettings({
      frequency: settings?.frequency || 'monthly',
      daysBefore: settings?.daysBefore || 3,
      maxAmount: settings?.maxAmount || 1000,
      enableNotifications: settings?.enableNotifications || true,
      backupWallet: settings?.backupWallet || '',
      ...settings
    });
    setIsExpanded(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
              isEnabled ? 'bg-success/10' : 'bg-muted'
            }`}>
              <Icon 
                name={isEnabled ? 'CheckCircle' : 'Clock'} 
                size={20} 
                className={isEnabled ? 'text-success' : 'text-muted-foreground'} 
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Automated Payments</h3>
              <p className="text-sm text-muted-foreground">
                {isEnabled ? 'Automatic payments are active' : 'Set up recurring payments'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? 'ChevronUp' : 'Settings'}
              iconPosition="left"
            >
              {isExpanded ? 'Collapse' : 'Configure'}
            </Button>
            
            <Button
              variant={isEnabled ? 'destructive' : 'default'}
              size="sm"
              onClick={onToggle}
              iconName={isEnabled ? 'Pause' : 'Play'}
              iconPosition="left"
            >
              {isEnabled ? 'Disable' : 'Enable'}
            </Button>
          </div>
        </div>
      </div>

      {isEnabled && !isExpanded && (
        <div className="p-4 bg-muted/30">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Frequency</span>
              <div className="font-medium text-foreground capitalize">{localSettings.frequency}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Days Before Due</span>
              <div className="font-medium text-foreground">{localSettings.daysBefore} days</div>
            </div>
            <div>
              <span className="text-muted-foreground">Max Amount</span>
              <div className="font-medium text-foreground font-mono">${localSettings.maxAmount.toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}

      {isExpanded && (
        <div className="p-4 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Payment Frequency
              </label>
              <select
                value={localSettings.frequency}
                onChange={(e) => setLocalSettings({...localSettings, frequency: e.target.value})}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="monthly">Monthly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            
            <Input
              label="Days Before Due Date"
              type="number"
              min="1"
              max="30"
              value={localSettings.daysBefore}
              onChange={(e) => setLocalSettings({...localSettings, daysBefore: parseInt(e.target.value)})}
              description="How many days before the due date to process payment"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Maximum Payment Amount"
              type="number"
              min="0"
              step="0.01"
              value={localSettings.maxAmount}
              onChange={(e) => setLocalSettings({...localSettings, maxAmount: parseFloat(e.target.value)})}
              description="Safety limit for automatic payments"
            />
            
            <Input
              label="Backup Wallet Address (Optional)"
              type="text"
              placeholder="0x... or wallet address"
              value={localSettings.backupWallet}
              onChange={(e) => setLocalSettings({...localSettings, backupWallet: e.target.value})}
              description="Alternative wallet if primary fails"
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Notification Preferences</h4>
            
            <div className="space-y-3">
              <Checkbox
                label="Email notifications before payments"
                checked={localSettings.enableNotifications}
                onChange={(e) => setLocalSettings({...localSettings, enableNotifications: e.target.checked})}
              />
              
              <Checkbox
                label="SMS alerts for payment confirmations"
                checked={localSettings.smsAlerts || false}
                onChange={(e) => setLocalSettings({...localSettings, smsAlerts: e.target.checked})}
              />
              
              <Checkbox
                label="Browser notifications for failed payments"
                checked={localSettings.browserNotifications || false}
                onChange={(e) => setLocalSettings({...localSettings, browserNotifications: e.target.checked})}
              />
            </div>
          </div>

          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
              <div className="text-sm">
                <h5 className="font-medium text-foreground mb-1">Important Security Notice</h5>
                <p className="text-muted-foreground">
                  Automated payments require wallet approval for each transaction. Ensure your wallet has sufficient USDC balance and gas fees. 
                  You can cancel or modify these settings at any time.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button
              variant="ghost"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
            >
              Save Settings
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoPaymentSetup;
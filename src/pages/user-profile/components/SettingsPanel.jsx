import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SettingsPanel = ({ settings, onSave }) => {
  const [formData, setFormData] = useState(settings);
  const [showBackupPhrase, setShowBackupPhrase] = useState(false);

  const timezoneOptions = [
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'London (GMT)' },
    { value: 'Europe/Paris', label: 'Paris (CET)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
    { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
    { value: 'Asia/Kolkata', label: 'Mumbai (IST)' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'zh', label: '中文' },
    { value: 'ja', label: '日本語' },
    { value: 'ko', label: '한국어' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'JPY', label: 'JPY - Japanese Yen' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' },
    { value: 'AUD', label: 'AUD - Australian Dollar' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  const copyBackupPhrase = () => {
    navigator.clipboard.writeText(formData.security.backupPhrase);
  };

  const generateNewBackupPhrase = () => {
    const words = [
      'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract',
      'absurd', 'abuse', 'access', 'accident', 'account', 'accuse', 'achieve', 'acid'
    ];
    
    const newPhrase = Array.from({ length: 12 }, () => 
      words[Math.floor(Math.random() * words.length)]
    ).join(' ');
    
    handleNestedChange('security', 'backupPhrase', newPhrase);
  };

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">General Settings</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Select
            label="Language"
            options={languageOptions}
            value={formData.language}
            onChange={(value) => handleInputChange('language', value)}
          />
          
          <Select
            label="Timezone"
            options={timezoneOptions}
            value={formData.timezone}
            onChange={(value) => handleInputChange('timezone', value)}
            searchable
          />
          
          <Select
            label="Display Currency"
            options={currencyOptions}
            value={formData.currency}
            onChange={(value) => handleInputChange('currency', value)}
          />
          
          <Select
            label="Default Network"
            options={[
              { value: 'solana', label: 'Solana' },
              { value: 'ethereum', label: 'Ethereum' }
            ]}
            value={formData.defaultNetwork}
            onChange={(value) => handleInputChange('defaultNetwork', value)}
          />
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Notification Preferences</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Mail" size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground">Email Notifications</div>
                <div className="text-sm text-muted-foreground">
                  Receive updates about loans and transactions
                </div>
              </div>
            </div>
            <Checkbox
              checked={formData.notifications.email}
              onChange={(e) => handleNestedChange('notifications', 'email', e.target.checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="Smartphone" size={20} className="text-success" />
              </div>
              <div>
                <div className="font-medium text-foreground">Push Notifications</div>
                <div className="text-sm text-muted-foreground">
                  Get instant alerts on your device
                </div>
              </div>
            </div>
            <Checkbox
              checked={formData.notifications.push}
              onChange={(e) => handleNestedChange('notifications', 'push', e.target.checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Icon name="MessageSquare" size={20} className="text-warning" />
              </div>
              <div>
                <div className="font-medium text-foreground">SMS Notifications</div>
                <div className="text-sm text-muted-foreground">
                  Receive text messages for important updates
                </div>
              </div>
            </div>
            <Checkbox
              checked={formData.notifications.sms}
              onChange={(e) => handleNestedChange('notifications', 'sms', e.target.checked)}
            />
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Privacy & Security</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Eye" size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground">Public Profile</div>
                <div className="text-sm text-muted-foreground">
                  Allow others to view your profile in marketplace
                </div>
              </div>
            </div>
            <Checkbox
              checked={formData.privacy.publicProfile}
              onChange={(e) => handleNestedChange('privacy', 'publicProfile', e.target.checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="BarChart3" size={20} className="text-success" />
              </div>
              <div>
                <div className="font-medium text-foreground">Show Statistics</div>
                <div className="text-sm text-muted-foreground">
                  Display your lending/borrowing statistics publicly
                </div>
              </div>
            </div>
            <Checkbox
              checked={formData.privacy.showStats}
              onChange={(e) => handleNestedChange('privacy', 'showStats', e.target.checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Icon name="Activity" size={20} className="text-warning" />
              </div>
              <div>
                <div className="font-medium text-foreground">Transaction History</div>
                <div className="text-sm text-muted-foreground">
                  Allow public viewing of transaction history
                </div>
              </div>
            </div>
            <Checkbox
              checked={formData.privacy.showTransactions}
              onChange={(e) => handleNestedChange('privacy', 'showTransactions', e.target.checked)}
            />
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Security</h2>
        
        <div className="space-y-6">
          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={20} className="text-success" />
              </div>
              <div>
                <div className="font-medium text-foreground">Two-Factor Authentication</div>
                <div className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-success">Enabled</span>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
          </div>

          {/* Backup Phrase */}
          <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Icon name="Key" size={20} className="text-warning" />
              </div>
              <div>
                <div className="font-medium text-foreground">Backup Phrase</div>
                <div className="text-sm text-muted-foreground">
                  Your 12-word recovery phrase for wallet access
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 mb-4">
              <Button
                variant="outline"
                size="sm"
                iconName={showBackupPhrase ? "EyeOff" : "Eye"}
                iconPosition="left"
                onClick={() => setShowBackupPhrase(!showBackupPhrase)}
              >
                {showBackupPhrase ? 'Hide' : 'Show'} Phrase
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                iconName="Copy"
                iconPosition="left"
                onClick={copyBackupPhrase}
                disabled={!showBackupPhrase}
              >
                Copy
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={generateNewBackupPhrase}
              >
                Generate New
              </Button>
            </div>
            
            {showBackupPhrase && (
              <div className="p-3 bg-background rounded border font-mono text-sm">
                {formData.security.backupPhrase}
              </div>
            )}
            
            <div className="mt-3 text-xs text-warning">
              ⚠️ Keep your backup phrase secure and never share it with anyone
            </div>
          </div>

          {/* Session Management */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-medium text-foreground">Active Sessions</div>
                <div className="text-sm text-muted-foreground">
                  Manage your active login sessions
                </div>
              </div>
              <Button variant="outline" size="sm" iconName="LogOut" iconPosition="left">
                Sign Out All
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Monitor" size={16} className="text-muted-foreground" />
                  <span>Current Session - Chrome on Windows</span>
                </div>
                <span className="text-success">Active</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Smartphone" size={16} className="text-muted-foreground" />
                  <span>Mobile App - Last seen 2 hours ago</span>
                </div>
                <Button variant="ghost" size="xs" iconName="X">
                  End
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          variant="default"
          iconName="Save"
          iconPosition="left"
          onClick={handleSave}
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
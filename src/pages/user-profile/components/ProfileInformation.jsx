import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProfileInformation = ({ userProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    location: userProfile.location,
    businessType: userProfile.businessType,
    businessDescription: userProfile.businessDescription,
    website: userProfile.website,
    publicProfile: userProfile.publicProfile
  });

  const businessTypes = [
    { value: 'retail', label: 'Retail Business' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'services', label: 'Services' },
    { value: 'technology', label: 'Technology' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone,
      location: userProfile.location,
      businessType: userProfile.businessType,
      businessDescription: userProfile.businessDescription,
      website: userProfile.website,
      publicProfile: userProfile.publicProfile
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Profile Information</h2>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        ) : (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Save"
              iconPosition="left"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground mb-3">Basic Information</h3>
          
          <Input
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            disabled={!isEditing}
            required
          />

          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={!isEditing}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            disabled={!isEditing}
          />

          <Input
            label="Location"
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            disabled={!isEditing}
            placeholder="City, Country"
          />
        </div>

        {/* Business Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground mb-3">Business Information</h3>
          
          <Select
            label="Business Type"
            options={businessTypes}
            value={formData.businessType}
            onChange={(value) => handleInputChange('businessType', value)}
            disabled={!isEditing}
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Business Description
            </label>
            <textarea
              value={formData.businessDescription}
              onChange={(e) => handleInputChange('businessDescription', e.target.value)}
              disabled={!isEditing}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Describe your business..."
            />
          </div>

          <Input
            label="Website"
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            disabled={!isEditing}
            placeholder="https://example.com"
          />
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-foreground mb-4">Privacy Settings</h3>
        
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Eye" size={20} className="text-primary" />
            </div>
            <div>
              <div className="font-medium text-foreground">Public Profile</div>
              <div className="text-sm text-muted-foreground">
                Allow others to view your profile in the marketplace
              </div>
            </div>
          </div>
          
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.publicProfile}
              onChange={(e) => handleInputChange('publicProfile', e.target.checked)}
              disabled={!isEditing}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>

      {/* Verification Status */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-foreground mb-4">Verification Status</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg border border-success/20">
            <Icon name="Shield" size={20} className="text-success" />
            <div>
              <div className="text-sm font-medium text-success">Identity Verified</div>
              <div className="text-xs text-muted-foreground">DID confirmed</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg border border-success/20">
            <Icon name="Mail" size={20} className="text-success" />
            <div>
              <div className="text-sm font-medium text-success">Email Verified</div>
              <div className="text-xs text-muted-foreground">Confirmed</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
            <Icon name="Phone" size={20} className="text-warning" />
            <div>
              <div className="text-sm font-medium text-warning">Phone Pending</div>
              <div className="text-xs text-muted-foreground">Verification needed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
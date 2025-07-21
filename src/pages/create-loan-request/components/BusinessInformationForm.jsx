import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const BusinessInformationForm = ({ formData, onFormChange, errors }) => {
  const [descriptionLength, setDescriptionLength] = useState(formData.businessDescription?.length || 0);
  const maxDescriptionLength = 1000;

  const businessTypeOptions = [
    { value: 'sole-proprietorship', label: 'Sole Proprietorship' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'llc', label: 'Limited Liability Company (LLC)' },
    { value: 'corporation', label: 'Corporation' },
    { value: 'cooperative', label: 'Cooperative' },
    { value: 'other', label: 'Other' }
  ];

  const industryOptions = [
    { value: 'agriculture', label: 'Agriculture & Farming' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'services', label: 'Professional Services' },
    { value: 'food-beverage', label: 'Food & Beverage' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'construction', label: 'Construction' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'other', label: 'Other' }
  ];

  const employeeCountOptions = [
    { value: '1', label: '1 (Just me)' },
    { value: '2-5', label: '2-5 employees' },
    { value: '6-10', label: '6-10 employees' },
    { value: '11-25', label: '11-25 employees' },
    { value: '26-50', label: '26-50 employees' },
    { value: '50+', label: '50+ employees' }
  ];

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxDescriptionLength) {
      setDescriptionLength(value.length);
      onFormChange('businessDescription', value);
    }
  };

  const formatText = (type) => {
    const textarea = document.getElementById('businessDescription');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.businessDescription.substring(start, end);
    
    let formattedText = '';
    switch (type) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'bullet':
        formattedText = `\n• ${selectedText}`;
        break;
      default:
        return;
    }
    
    const newText = formData.businessDescription.substring(0, start) + 
                   formattedText + 
                   formData.businessDescription.substring(end);
    
    if (newText.length <= maxDescriptionLength) {
      onFormChange('businessDescription', newText);
      setDescriptionLength(newText.length);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 border-2 border-secondary rounded-xl shadow-lg animate-popIn">
          <Icon name="Building2" size={22} className="text-secondary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Business Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Business Name"
          type="text"
          placeholder="Enter your business name"
          value={formData.businessName}
          onChange={(e) => onFormChange('businessName', e.target.value)}
          error={errors.businessName}
          required
          maxLength="100"
        />

        <Select
          label="Business Type"
          options={businessTypeOptions}
          value={formData.businessType}
          onChange={(value) => onFormChange('businessType', value)}
          error={errors.businessType}
          required
          placeholder="Select business type"
        />

        <Select
          label="Industry"
          options={industryOptions}
          value={formData.industry}
          onChange={(value) => onFormChange('industry', value)}
          error={errors.industry}
          required
          searchable
          placeholder="Select your industry"
        />

        <Select
          label="Number of Employees"
          options={employeeCountOptions}
          value={formData.employeeCount}
          onChange={(value) => onFormChange('employeeCount', value)}
          error={errors.employeeCount}
          required
          placeholder="Select employee count"
        />

        <Input
          label="Years in Business"
          type="number"
          placeholder="Enter years"
          value={formData.yearsInBusiness}
          onChange={(e) => onFormChange('yearsInBusiness', e.target.value)}
          error={errors.yearsInBusiness}
          required
          min="0"
          max="100"
        />

        <Input
          label="Monthly Revenue (USDC)"
          type="number"
          placeholder="Enter monthly revenue"
          value={formData.monthlyRevenue}
          onChange={(e) => onFormChange('monthlyRevenue', e.target.value)}
          error={errors.monthlyRevenue}
          required
          min="0"
          description="Average monthly revenue"
        />
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">
          Business Description *
        </label>
        
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="flex items-center space-x-2 p-2 bg-muted border-b border-border">
            <button
              type="button"
              onClick={() => formatText('bold')}
              className="p-1 hover:bg-background rounded text-muted-foreground hover:text-foreground transition-smooth"
              title="Bold"
            >
              <Icon name="Bold" size={14} />
            </button>
            <button
              type="button"
              onClick={() => formatText('italic')}
              className="p-1 hover:bg-background rounded text-muted-foreground hover:text-foreground transition-smooth"
              title="Italic"
            >
              <Icon name="Italic" size={14} />
            </button>
            <button
              type="button"
              onClick={() => formatText('bullet')}
              className="p-1 hover:bg-background rounded text-muted-foreground hover:text-foreground transition-smooth"
              title="Bullet Point"
            >
              <Icon name="List" size={14} />
            </button>
            <div className="flex-1"></div>
            <span className="text-xs text-muted-foreground">
              {descriptionLength}/{maxDescriptionLength}
            </span>
          </div>
          
          <textarea
            id="businessDescription"
            className="w-full p-4 bg-background text-foreground placeholder-muted-foreground resize-none focus:outline-none"
            rows="6"
            placeholder="Describe your business, what you do, your target market, and how this loan will help you grow..."
            value={formData.businessDescription}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        
        {errors.businessDescription && (
          <p className="text-sm text-destructive">{errors.businessDescription}</p>
        )}
        
        <p className="text-xs text-muted-foreground">
          Provide a detailed description of your business to help lenders understand your loan request.
        </p>
      </div>

      <div className="space-y-4">
        <h4 className="text-md font-medium text-foreground">Additional Information</h4>
        
        <div className="space-y-3">
          <Checkbox
            label="I have existing business licenses and permits"
            checked={formData.hasLicenses}
            onChange={(e) => onFormChange('hasLicenses', e.target.checked)}
          />
          
          <Checkbox
            label="I have business bank account"
            checked={formData.hasBankAccount}
            onChange={(e) => onFormChange('hasBankAccount', e.target.checked)}
          />
          
          <Checkbox
            label="I have previous loan experience"
            checked={formData.hasLoanExperience}
            onChange={(e) => onFormChange('hasLoanExperience', e.target.checked)}
          />
          
          <Checkbox
            label="I consent to credit and business verification checks"
            checked={formData.consentToVerification}
            onChange={(e) => onFormChange('consentToVerification', e.target.checked)}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessInformationForm;
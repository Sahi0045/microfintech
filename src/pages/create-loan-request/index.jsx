import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import LoanDetailsForm from './components/LoanDetailsForm';
import BusinessInformationForm from './components/BusinessInformationForm';
import DocumentUploadForm from './components/DocumentUploadForm';
import LoanPreviewPanel from './components/LoanPreviewPanel';
import SmartContractPanel from './components/SmartContractPanel';
import FormProgressIndicator from './components/FormProgressIndicator';

const CreateLoanRequest = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    // Loan Details
    amount: '',
    purpose: '',
    termLength: '',
    
    // Business Information
    businessName: '',
    businessType: '',
    industry: '',
    employeeCount: '',
    yearsInBusiness: '',
    monthlyRevenue: '',
    businessDescription: '',
    hasLicenses: false,
    hasBankAccount: false,
    hasLoanExperience: false,
    consentToVerification: false,
    
    // Documents
    documents: []
  });
  
  const [errors, setErrors] = useState({});
  const [completedSteps, setCompletedSteps] = useState([]);

  const stepLabels = [
    'Loan Details',
    'Business Info',
    'Documents',
    'Review & Submit'
  ];

  useEffect(() => {
    // Load draft from localStorage
    const savedDraft = localStorage.getItem('loanRequestDraft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Auto-save draft
    const timeoutId = setTimeout(() => {
      localStorage.setItem('loanRequestDraft', JSON.stringify(formData));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [formData]);

  useEffect(() => {
    // Update completed steps based on form validation
    const newCompletedSteps = [];
    
    if (validateStep(0)) newCompletedSteps.push(0);
    if (validateStep(1)) newCompletedSteps.push(1);
    if (validateStep(2)) newCompletedSteps.push(2);
    
    setCompletedSteps(newCompletedSteps);
  }, [formData]);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (stepIndex) => {
    const stepErrors = {};
    
    switch (stepIndex) {
      case 0: // Loan Details
        if (!formData.amount || parseFloat(formData.amount) < 100) {
          stepErrors.amount = 'Amount must be at least $100';
        }
        if (!formData.purpose) {
          stepErrors.purpose = 'Please select a loan purpose';
        }
        if (!formData.termLength) {
          stepErrors.termLength = 'Please select a term length';
        }
        break;
        
      case 1: // Business Information
        if (!formData.businessName?.trim()) {
          stepErrors.businessName = 'Business name is required';
        }
        if (!formData.businessType) {
          stepErrors.businessType = 'Please select business type';
        }
        if (!formData.industry) {
          stepErrors.industry = 'Please select an industry';
        }
        if (!formData.employeeCount) {
          stepErrors.employeeCount = 'Please select employee count';
        }
        if (!formData.yearsInBusiness || parseFloat(formData.yearsInBusiness) < 0) {
          stepErrors.yearsInBusiness = 'Years in business is required';
        }
        if (!formData.monthlyRevenue || parseFloat(formData.monthlyRevenue) < 0) {
          stepErrors.monthlyRevenue = 'Monthly revenue is required';
        }
        if (!formData.businessDescription?.trim() || formData.businessDescription.length < 50) {
          stepErrors.businessDescription = 'Business description must be at least 50 characters';
        }
        if (!formData.consentToVerification) {
          stepErrors.consentToVerification = 'Verification consent is required';
        }
        break;
        
      case 2: // Documents
        if (!formData.documents || formData.documents.length < 3) {
          stepErrors.documents = 'Please upload at least 3 required documents';
        }
        break;
    }
    
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < stepLabels.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Clear draft after successful submission
      localStorage.removeItem('loanRequestDraft');
      
      // Navigate to loan details or dashboard
      navigate('/loan-details', { 
        state: { 
          message: 'Loan request submitted successfully!',
          loanId: `LOAN-${Date.now()}`
        }
      });
      
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to submit loan request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveDraft = () => {
    localStorage.setItem('loanRequestDraft', JSON.stringify(formData));
    alert('Draft saved successfully!');
  };

  const clearDraft = () => {
    if (window.confirm('Are you sure you want to clear all form data?')) {
      setFormData({
        amount: '',
        purpose: '',
        termLength: '',
        businessName: '',
        businessType: '',
        industry: '',
        employeeCount: '',
        yearsInBusiness: '',
        monthlyRevenue: '',
        businessDescription: '',
        hasLicenses: false,
        hasBankAccount: false,
        hasLoanExperience: false,
        consentToVerification: false,
        documents: []
      });
      setCurrentStep(0);
      setErrors({});
      localStorage.removeItem('loanRequestDraft');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <LoanDetailsForm
            formData={formData}
            onFormChange={handleFormChange}
            errors={errors}
          />
        );
      case 1:
        return (
          <BusinessInformationForm
            formData={formData}
            onFormChange={handleFormChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <DocumentUploadForm
            formData={formData}
            onFormChange={handleFormChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <SmartContractPanel
            formData={formData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Animated Floating SVGs for Depth */}
      <svg className="absolute left-0 top-0 w-96 h-96 opacity-20 animate-float-slow pointer-events-none z-0" viewBox="0 0 400 400" fill="none"><ellipse cx="200" cy="200" rx="180" ry="120" fill="url(#loanGrad1)" /><defs><linearGradient id="loanGrad1" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#927A5E" stopOpacity="0.18" /><stop offset="1" stopColor="#D4493D" stopOpacity="0.12" /></linearGradient></defs></svg>
      <svg className="absolute right-0 bottom-0 w-96 h-96 opacity-20 animate-float-slow pointer-events-none z-0" style={{animationDelay: '2s'}} viewBox="0 0 400 400" fill="none"><ellipse cx="200" cy="200" rx="180" ry="120" fill="url(#loanGrad2)" /><defs><linearGradient id="loanGrad2" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#1E1E1E" stopOpacity="0.18" /><stop offset="1" stopColor="#927A5E" stopOpacity="0.12" /></linearGradient></defs></svg>
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 animate-fadeInUp">
        <NavigationBreadcrumbs />
        
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Create Loan Request</h1>
            <p className="text-muted-foreground">
              Submit your loan application to connect with global lenders
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={saveDraft}
              iconName="Save"
              iconPosition="left"
            >
              Save Draft
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={clearDraft}
              iconName="Trash2"
              iconPosition="left"
              className="text-destructive hover:text-destructive"
            >
              Clear
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              iconName={showPreview ? 'EyeOff' : 'Eye'}
              iconPosition="left"
              className="lg:hidden"
            >
              {showPreview ? 'Hide' : 'Preview'}
            </Button>
          </div>
        </div>

        {/* Progress Indicator */}
        <FormProgressIndicator
          currentStep={currentStep}
          totalSteps={stepLabels.length}
          stepLabels={stepLabels}
          completedSteps={completedSteps}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
          {/* Main Form */}
          <div className={`lg:col-span-2 ${showPreview ? 'hidden lg:block' : ''}`}>
            <div className="bg-card/80 border border-border rounded-2xl shadow-xl p-8 backdrop-blur-md animate-fadeInUp" style={{animationDelay: '0.3s'}}>
              {renderStepContent()}
              
              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                  iconName="ChevronLeft"
                  iconPosition="left"
                >
                  Previous
                </Button>
                
                <div className="flex items-center space-x-3">
                  {currentStep < stepLabels.length - 1 ? (
                    <Button
                      variant="default"
                      onClick={handleNextStep}
                      iconName="ChevronRight"
                      iconPosition="right"
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      onClick={handleSubmit}
                      loading={isSubmitting}
                      iconName="Send"
                      iconPosition="left"
                      className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className={`lg:col-span-1 ${showPreview ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-24 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
              <LoanPreviewPanel formData={formData} />
            </div>
          </div>
        </div>

        {/* Mobile Floating Action Button */}
        <div className="fixed bottom-6 right-6 lg:hidden">
          <Button
            variant="default"
            size="icon"
            onClick={() => setShowPreview(!showPreview)}
            className="w-14 h-14 rounded-full shadow-elevated"
          >
            <Icon name={showPreview ? 'Edit' : 'Eye'} size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateLoanRequest;
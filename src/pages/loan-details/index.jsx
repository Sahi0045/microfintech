import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import LoanStatusBadge from './components/LoanStatusBadge';
import FundingProgressBar from './components/FundingProgressBar';
import BorrowerProfile from './components/BorrowerProfile';
import DocumentViewer from './components/DocumentViewer';
import ReputationBreakdown from './components/ReputationBreakdown';
import FundingCalculator from './components/FundingCalculator';
import CommentsSection from './components/CommentsSection';
import RelatedLoans from './components/RelatedLoans';
import StickyActionBar from './components/StickyActionBar';

const LoanDetails = () => {
  const [searchParams] = useSearchParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showFundingModal, setShowFundingModal] = useState(false);

  // Mock loan data
  const loanData = {
    id: searchParams.get('id') || 'loan-001',
    title: "Expand Organic Vegetable Farm Operations",
    description: `Our family-owned organic vegetable farm has been serving the local community for over 8 years. We're seeking funding to expand our greenhouse operations and purchase new irrigation equipment to increase our production capacity by 40%.\n\nThe loan will be used for:\n• New greenhouse construction ($3,000)\n• Drip irrigation system ($1,500)\n• Seeds and organic fertilizers ($800)\n• Equipment maintenance ($700)\n\nWe have established relationships with 3 local restaurants and 2 farmers markets, providing steady revenue streams. Our current monthly revenue averages $2,800 with seasonal peaks reaching $4,200.`,
    amount: 6000,
    currentFunding: 3600,
    fundingProgress: 60,
    interestRate: 12.5,
    term: 18,
    status: 'active',category: 'Agriculture',location: 'Rural Kenya',createdDate: '2025-01-15',
    borrower: {
      name: "Sarah Wanjiku",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      location: "Nakuru County, Kenya",
      memberSince: "March 2023",
      businessType: "Organic Farming",
      didVerified: true,
      totalLoans: 3,
      repaymentRate: 100,
      creditScore: 785
    },
    documents: [
      {
        id: 1,
        name: "Business Registration Certificate",
        type: "pdf",
        size: "2.4 MB",
        uploadDate: "Jan 15, 2025",
        verified: true,
        ipfsHash: "QmX7Y8Z9A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0"
      },
      {
        id: 2,
        name: "Farm Photos & Equipment",
        type: "image",
        size: "8.7 MB",
        uploadDate: "Jan 15, 2025",
        verified: true,
        ipfsHash: "QmA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3"
      },
      {
        id: 3,
        name: "Financial Statements (2024)",
        type: "spreadsheet",
        size: "1.2 MB",
        uploadDate: "Jan 14, 2025",
        verified: true,
        ipfsHash: "QmB2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4"
      }
    ],
    reputation: {
      overallScore: 85,
      breakdown: [
        { category: "Payment History", score: 100 },
        { category: "Business Stability", score: 82 },
        { category: "Communication", score: 78 },
        { category: "Documentation", score: 90 }
      ],
      recentActivity: [
        { type: "positive", description: "Completed loan repayment early", date: "Dec 2024" },
        { type: "positive", description: "Updated business documentation", date: "Nov 2024" },
        { type: "neutral", description: "Responded to lender inquiry", date: "Jan 2025" }
      ]
    }
  };

  // Mock comments data
  const [comments] = useState([
    {
      id: 1,
      author: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      content: "What's your backup plan if weather conditions affect crop yields this season?",
      timestamp: new Date(Date.now() - 86400000 * 2),
      verified: true,
      replies: [
        {
          id: 11,
          author: "Sarah Wanjiku",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
          content: "Great question! We have crop insurance and also grow diverse vegetables to minimize risk. The greenhouse will provide additional protection from weather variations.",
          timestamp: new Date(Date.now() - 86400000)
        }
      ]
    },
    {
      id: 2,
      author: "Emma Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      content: "Your repayment history looks excellent. How do you plan to scale operations after this expansion?",
      timestamp: new Date(Date.now() - 86400000 * 3),
      verified: true,
      replies: []
    }
  ]);

  // Mock related loans
  const relatedLoans = [
    {
      id: 'loan-002',
      title: "Coffee Processing Equipment",
      amount: 4500,
      fundingProgress: 75,
      interestRate: 11.8,
      term: 12,
      status: 'active',
      borrower: {
        name: "James Kiprotich",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        rating: 4.8
      }
    },
    {
      id: 'loan-003',
      title: "Textile Workshop Expansion",
      amount: 3200,
      fundingProgress: 45,
      interestRate: 13.2,
      term: 15,
      status: 'active',
      borrower: {
        name: "Fatima Al-Rashid",
        avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150",
        rating: 4.6
      }
    }
  ];

  const handleFundLoan = () => {
    setShowFundingModal(true);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleFundingSubmit = (fundingData) => {
    console.log('Funding submitted:', fundingData);
    setShowFundingModal(false);
    // Here you would typically handle the blockchain transaction
  };

  const handleAddComment = (comment) => {
    console.log('New comment added:', comment);
  };

  const breadcrumbs = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Loan Details', path: '/loan-details', icon: 'FileText', current: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <NavigationBreadcrumbs customBreadcrumbs={breadcrumbs} />
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <LoanStatusBadge status={loanData.status} fundingProgress={loanData.fundingProgress} />
                <div className="hidden lg:flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBookmark}
                    iconName={isBookmarked ? "BookmarkCheck" : "Bookmark"}
                    iconPosition="left"
                  >
                    {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                  </Button>
                </div>
              </div>
              
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                {loanData.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} />
                  <span>{loanData.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} />
                  <span>Created {loanData.createdDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Tag" size={14} />
                  <span>{loanData.category}</span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <Button
                variant="default"
                size="lg"
                onClick={handleFundLoan}
                iconName="DollarSign"
                iconPosition="left"
              >
                Fund This Loan
              </Button>
            </div>
          </div>
          
          <FundingProgressBar
            currentAmount={loanData.currentFunding}
            targetAmount={loanData.amount}
            fundingProgress={loanData.fundingProgress}
          />
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Loan Overview */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center space-x-2">
                <Icon name="FileText" size={20} />
                <span>Loan Overview</span>
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-foreground">
                      ${loanData.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Loan Amount</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {loanData.interestRate}%
                    </div>
                    <div className="text-sm text-muted-foreground">Interest Rate</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-foreground">
                      {loanData.term}
                    </div>
                    <div className="text-sm text-muted-foreground">Months</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-success">
                      ${Math.round(loanData.amount * (1 + loanData.interestRate/100 * loanData.term/12) / loanData.term).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Monthly Payment</div>
                  </div>
                </div>
                
                <div className="prose prose-sm max-w-none">
                  <h3 className="text-lg font-medium text-foreground mb-3">Business Description</h3>
                  <div className="text-foreground whitespace-pre-line">
                    {loanData.description}
                  </div>
                </div>
              </div>
            </div>
            
            <BorrowerProfile borrower={loanData.borrower} />
            <DocumentViewer documents={loanData.documents} />
            <ReputationBreakdown reputation={loanData.reputation} />
            <CommentsSection comments={comments} onAddComment={handleAddComment} />
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <FundingCalculator
              loanAmount={loanData.amount}
              interestRate={loanData.interestRate}
              term={loanData.term}
              onFundingSubmit={handleFundingSubmit}
            />
            <RelatedLoans loans={relatedLoans} />
          </div>
        </div>
      </div>
      
      {/* Mobile Sticky Action Bar */}
      <StickyActionBar
        onFundLoan={handleFundLoan}
        onBookmark={handleBookmark}
        isBookmarked={isBookmarked}
        loanAmount={loanData.amount}
        fundingProgress={loanData.fundingProgress}
      />
      
      {/* Funding Modal */}
      {showFundingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Fund This Loan</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFundingModal(false)}
                iconName="X"
              />
            </div>
            <div className="p-6">
              <FundingCalculator
                loanAmount={loanData.amount}
                interestRate={loanData.interestRate}
                term={loanData.term}
                onFundingSubmit={handleFundingSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanDetails;
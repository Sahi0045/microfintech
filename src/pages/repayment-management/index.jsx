import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import PaymentScheduleTable from './components/PaymentScheduleTable';
import PaymentCalendar from './components/PaymentCalendar';
import PaymentSummaryStats from './components/PaymentSummaryStats';
import PaymentHistorySection from './components/PaymentHistorySection';
import AutoPaymentSetup from './components/AutoPaymentSetup';
import PaymentModal from './components/PaymentModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const RepaymentManagement = () => {
  const [userType, setUserType] = useState('borrower'); // borrower or lender
  const [walletBalance, setWalletBalance] = useState(2450.75);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [autoPayEnabled, setAutoPayEnabled] = useState(false);
  const [autoPaySettings, setAutoPaySettings] = useState({
    frequency: 'monthly',
    daysBefore: 3,
    maxAmount: 1000,
    enableNotifications: true
  });

  // Mock payment schedule data
  const paymentSchedule = [
    {
      id: 1,
      installment: 1,
      dueDate: '12/15/2024',
      daysToDue: 'Due in 5 days',
      amount: 520.50,
      principal: 450.00,
      interest: 70.50,
      status: 'upcoming'
    },
    {
      id: 2,
      installment: 2,
      dueDate: '01/15/2025',
      daysToDue: 'Due in 36 days',
      amount: 520.50,
      principal: 465.25,
      interest: 55.25,
      status: 'upcoming'
    },
    {
      id: 3,
      installment: 3,
      dueDate: '02/15/2025',
      daysToDue: 'Due in 67 days',
      amount: 520.50,
      principal: 480.75,
      interest: 39.75,
      status: 'upcoming'
    },
    {
      id: 4,
      installment: 4,
      dueDate: '11/15/2024',
      daysToDue: 'Overdue by 5 days',
      amount: 520.50,
      principal: 435.00,
      interest: 85.50,
      status: 'overdue'
    },
    {
      id: 5,
      installment: 5,
      dueDate: '10/15/2024',
      daysToDue: 'Paid on time',
      amount: 520.50,
      principal: 420.00,
      interest: 100.50,
      status: 'paid'
    }
  ];

  // Mock payment history data
  const paymentHistory = [
    {
      id: 'ph1',
      installment: 5,
      date: '10/15/2024',
      time: '2:34 PM',
      amount: 520.50,
      network: 'solana',
      txHash: '5KJp7z2X9vQ4mR8nL3cF1wE6tY9uI0oP2sA7bN4xM6hG3dV8kJ',
      explorerUrl: 'https://solscan.io/tx/5KJp7z2X9vQ4mR8nL3cF1wE6tY9uI0oP2sA7bN4xM6hG3dV8kJ',
      status: 'completed'
    },
    {
      id: 'ph2',
      installment: 4,
      date: '09/15/2024',
      time: '11:22 AM',
      amount: 520.50,
      network: 'ethereum',
      txHash: '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4C0532925a3b8D4',
      explorerUrl: 'https://etherscan.io/tx/0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4C0532925a3b8D4',
      status: 'completed'
    },
    {
      id: 'ph3',
      installment: 3,
      date: '08/15/2024',
      time: '4:15 PM',
      amount: 520.50,
      network: 'solana',
      txHash: '8MNq9w4Y7rT6pS2kH5gJ3xF9tU1vI8oL4sB9cP6yN2hK7eW5mQ',
      explorerUrl: 'https://solscan.io/tx/8MNq9w4Y7rT6pS2kH5gJ3xF9tU1vI8oL4sB9cP6yN2hK7eW5mQ',
      status: 'failed'
    }
  ];

  // Calculate summary statistics
  const summaryStats = {
    totalPaid: paymentSchedule.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
    remainingBalance: paymentSchedule.filter(p => p.status !== 'paid').reduce((sum, p) => sum + p.amount, 0),
    nextPayment: paymentSchedule.find(p => p.status === 'upcoming')?.amount || 0,
    nextPaymentDate: paymentSchedule.find(p => p.status === 'upcoming')?.dueDate || 'N/A',
    overdueAmount: paymentSchedule.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0),
    paidCount: paymentSchedule.filter(p => p.status === 'paid').length,
    remainingCount: paymentSchedule.filter(p => p.status !== 'paid').length,
    overdueCount: paymentSchedule.filter(p => p.status === 'overdue').length,
    daysUntilNext: 5
  };

  const handleMakePayment = (payment) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

  const handleConfirmPayment = async (paymentData) => {
    // Simulate payment processing
    console.log('Processing payment:', paymentData);
    
    // Update wallet balance
    setWalletBalance(prev => prev - paymentData.amount);
    
    // Close modal
    setShowPaymentModal(false);
    setSelectedPayment(null);
    
    // In a real app, this would update the payment schedule and history
  };

  const handleViewDetails = (payment) => {
    console.log('Viewing payment details:', payment);
    // In a real app, this would open a detailed view or receipt
  };

  const handleViewReceipt = (payment) => {
    console.log('Viewing receipt for:', payment);
    // In a real app, this would generate and display a receipt
  };

  const handleExportHistory = () => {
    console.log('Exporting payment history...');
    // In a real app, this would generate and download a CSV file
  };

  const handleToggleAutoPay = () => {
    setAutoPayEnabled(!autoPayEnabled);
  };

  const handleUpdateAutoPaySettings = (settings) => {
    setAutoPaySettings(settings);
  };

  useEffect(() => {
    // Load user preferences and wallet data
    const savedUserType = localStorage.getItem('userType') || 'borrower';
    setUserType(savedUserType);
  }, []);

  return (
    <>
      <Helmet>
        <title>Repayment Management - DeFi Micro</title>
        <meta name="description" content="Manage your loan repayments, track payment schedules, and process USDC payments on the blockchain" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-6 max-w-7xl">
          <NavigationBreadcrumbs />
          
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Repayment Management</h1>
              <p className="text-muted-foreground mt-1">
                {userType === 'borrower' ?'Track your payment schedule and manage loan repayments' :'Monitor borrower payments and track portfolio performance'
                }
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* User Type Toggle */}
              <div className="flex items-center bg-muted rounded-lg p-1">
                <button
                  onClick={() => setUserType('borrower')}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-smooth ${
                    userType === 'borrower' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Borrower View
                </button>
                <button
                  onClick={() => setUserType('lender')}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-smooth ${
                    userType === 'lender' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Lender View
                </button>
              </div>
              
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                onClick={handleExportHistory}
              >
                Export Report
              </Button>
            </div>
          </div>

          {/* Summary Statistics */}
          <div className="mb-6">
            <PaymentSummaryStats stats={summaryStats} userType={userType} />
          </div>

          {/* Late Payment Alert */}
          {summaryStats.overdueAmount > 0 && userType === 'borrower' && (
            <div className="mb-6 bg-error/10 border border-error/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-error mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-error mb-1">Overdue Payment Alert</h3>
                  <p className="text-sm text-error/80 mb-3">
                    You have ${summaryStats.overdueAmount.toLocaleString()} in overdue payments. 
                    Late fees may apply. Please make payment as soon as possible.
                  </p>
                  <Button
                    size="sm"
                    variant="destructive"
                    iconName="CreditCard"
                    iconPosition="left"
                    onClick={() => handleMakePayment(paymentSchedule.find(p => p.status === 'overdue'))}
                  >
                    Pay Now
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Payment Calendar - Desktop 4 cols */}
            <div className="lg:col-span-4">
              <PaymentCalendar payments={paymentSchedule} />
            </div>
            
            {/* Payment Schedule - Desktop 8 cols */}
            <div className="lg:col-span-8">
              <PaymentScheduleTable
                payments={paymentSchedule}
                userType={userType}
                onMakePayment={handleMakePayment}
                onViewDetails={handleViewDetails}
              />
            </div>
          </div>

          {/* Automated Payment Setup */}
          {userType === 'borrower' && (
            <div className="mt-6">
              <AutoPaymentSetup
                isEnabled={autoPayEnabled}
                onToggle={handleToggleAutoPay}
                settings={autoPaySettings}
                onUpdateSettings={handleUpdateAutoPaySettings}
              />
            </div>
          )}

          {/* Payment History */}
          <div className="mt-6">
            <PaymentHistorySection
              paymentHistory={paymentHistory}
              onViewReceipt={handleViewReceipt}
              onExportHistory={handleExportHistory}
            />
          </div>
        </main>

        {/* Payment Modal */}
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedPayment(null);
          }}
          payment={selectedPayment}
          walletBalance={walletBalance}
          onConfirmPayment={handleConfirmPayment}
        />
      </div>
    </>
  );
};

export default RepaymentManagement;
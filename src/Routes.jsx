import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import LandingPage from "pages/landing-page";
import Dashboard from "pages/dashboard";
import LoanDetails from "pages/loan-details";
import CreateLoanRequest from "pages/create-loan-request";
import UserProfile from "pages/user-profile";
import RepaymentManagement from "pages/repayment-management";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/loan-details" element={<LoanDetails />} />
        <Route path="/create-loan-request" element={<CreateLoanRequest />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/repayment-management" element={<RepaymentManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
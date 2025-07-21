import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBreadcrumbs = ({ customBreadcrumbs = null }) => {
  const location = useLocation();

  const routeMap = {
    '/dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/loan-details': { label: 'Loan Details', icon: 'FileText', parent: '/dashboard' },
    '/create-loan-request': { label: 'Create Loan Request', icon: 'Plus', parent: '/dashboard' },
    '/repayment-management': { label: 'Repayment Management', icon: 'CreditCard', parent: '/dashboard' },
    '/user-profile': { label: 'Profile', icon: 'User', parent: '/dashboard' },
    '/landing-page': { label: 'Home', icon: 'Home' }
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const currentPath = location.pathname;
    const currentRoute = routeMap[currentPath];
    
    if (!currentRoute) {
      return [{ label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' }];
    }

    const breadcrumbs = [];
    
    // Add parent if exists
    if (currentRoute.parent) {
      const parentRoute = routeMap[currentRoute.parent];
      breadcrumbs.push({
        label: parentRoute.label,
        path: currentRoute.parent,
        icon: parentRoute.icon
      });
    }
    
    // Add current route
    breadcrumbs.push({
      label: currentRoute.label,
      path: currentPath,
      icon: currentRoute.icon,
      current: true
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs for single-level pages
  if (breadcrumbs.length <= 1 && !customBreadcrumbs) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path || index}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground/50" />
          )}
          
          {crumb.current ? (
            <div className="flex items-center space-x-2 text-foreground font-medium">
              <Icon name={crumb.icon} size={14} />
              <span className="hidden sm:inline">{crumb.label}</span>
              <span className="sm:hidden">{crumb.label.split(' ')[0]}</span>
            </div>
          ) : (
            <Link
              to={crumb.path}
              className="flex items-center space-x-2 hover:text-foreground transition-smooth"
            >
              <Icon name={crumb.icon} size={14} />
              <span className="hidden sm:inline">{crumb.label}</span>
              <span className="sm:hidden">{crumb.label.split(' ')[0]}</span>
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default NavigationBreadcrumbs;
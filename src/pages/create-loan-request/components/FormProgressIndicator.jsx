import React from 'react';
import Icon from '../../../components/AppIcon';

const FormProgressIndicator = ({ currentStep, totalSteps, stepLabels, completedSteps }) => {
  const getStepStatus = (stepIndex) => {
    if (completedSteps.includes(stepIndex)) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'pending';
  };

  const getStepIcon = (stepIndex, status) => {
    if (status === 'completed') return 'CheckCircle';
    if (status === 'current') return 'Circle';
    return 'Circle';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-white border-success';
      case 'current':
        return 'bg-primary text-white border-primary';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getConnectorClasses = (stepIndex) => {
    const isCompleted = completedSteps.includes(stepIndex) && completedSteps.includes(stepIndex + 1);
    return isCompleted ? 'bg-success' : 'bg-border';
  };

  return (
    <div className="w-full">
      {/* Mobile Progress Bar */}
      <div className="block md:hidden mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(((currentStep + 1) / totalSteps) * 100)}%
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
        
        <p className="text-sm text-muted-foreground mt-2">
          {stepLabels[currentStep]}
        </p>
      </div>

      {/* Desktop Step Indicator */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {stepLabels.map((label, index) => {
            const status = getStepStatus(index);
            const isLast = index === stepLabels.length - 1;
            
            return (
              <div key={index} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  {/* Step Circle */}
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200
                    ${getStepClasses(status)}
                  `}>
                    {status === 'completed' ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  
                  {/* Step Label */}
                  <div className="mt-2 text-center">
                    <p className={`text-sm font-medium ${
                      status === 'current' ? 'text-primary' : 
                      status === 'completed' ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {label}
                    </p>
                  </div>
                </div>
                
                {/* Connector Line */}
                {!isLast && (
                  <div className="flex-1 mx-4">
                    <div className={`h-0.5 transition-all duration-200 ${getConnectorClasses(index)}`}></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Progress Summary */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Progress: {completedSteps.length} of {totalSteps} steps completed
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-xs text-muted-foreground">Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-xs text-muted-foreground">Current</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-muted rounded-full border border-border"></div>
                <span className="text-xs text-muted-foreground">Pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormProgressIndicator;
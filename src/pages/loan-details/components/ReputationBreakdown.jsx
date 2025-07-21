import React from 'react';
import Icon from '../../../components/AppIcon';

const ReputationBreakdown = ({ reputation }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreIcon = (score) => {
    if (score >= 80) return 'TrendingUp';
    if (score >= 60) return 'Minus';
    return 'TrendingDown';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
        <Icon name="Star" size={20} />
        <span>Reputation Breakdown</span>
      </h3>
      
      <div className="space-y-4">
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className={`text-3xl font-bold ${getScoreColor(reputation.overallScore)}`}>
            {reputation.overallScore}
          </div>
          <div className="text-sm text-muted-foreground">Overall Score</div>
        </div>
        
        <div className="space-y-3">
          {reputation.breakdown.map((item) => (
            <div key={item.category} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{item.category}</span>
                <div className="flex items-center space-x-1">
                  <Icon name={getScoreIcon(item.score)} size={14} className={getScoreColor(item.score)} />
                  <span className={`text-sm font-medium ${getScoreColor(item.score)}`}>
                    {item.score}
                  </span>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    item.score >= 80 ? 'bg-success' : 
                    item.score >= 60 ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-4 border-t border-border space-y-3">
          <h4 className="font-medium text-foreground">Recent Activity</h4>
          <div className="space-y-2">
            {reputation.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 text-sm">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'positive' ? 'bg-success' : 
                  activity.type === 'negative' ? 'bg-error' : 'bg-warning'
                }`} />
                <span className="text-muted-foreground">{activity.description}</span>
                <span className="text-xs text-muted-foreground ml-auto">{activity.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReputationBreakdown;
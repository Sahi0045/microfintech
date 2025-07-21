import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const ReputationDashboard = ({ reputationData }) => {
  const performanceData = [
    { month: 'Jan', score: 85 },
    { month: 'Feb', score: 88 },
    { month: 'Mar', score: 92 },
    { month: 'Apr', score: 89 },
    { month: 'May', score: 94 },
    { month: 'Jun', score: 96 }
  ];

  const categoryData = [
    { name: 'Payment History', value: 95, color: '#10B981' },
    { name: 'Communication', value: 88, color: '#3B82F6' },
    { name: 'Documentation', value: 92, color: '#8B5CF6' },
    { name: 'Transparency', value: 90, color: '#F59E0B' }
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-success/10 border-success/20';
    if (score >= 70) return 'bg-warning/10 border-warning/20';
    return 'bg-error/10 border-error/20';
  };

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Reputation Score</h2>
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm text-success">+2 this month</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Score Display */}
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full border-4 ${getScoreBg(reputationData.overallScore)}`}>
              <span className={`text-3xl font-bold ${getScoreColor(reputationData.overallScore)}`}>
                {reputationData.overallScore}
              </span>
            </div>
            <div className="mt-3">
              <div className="text-sm font-medium text-foreground">Overall Score</div>
              <div className="text-xs text-muted-foreground">Out of 100</div>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {categoryData.map((category) => (
                <div key={category.name} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{category.name}</span>
                    <span className={`text-sm font-bold ${getScoreColor(category.value)}`}>
                      {category.value}
                    </span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${category.value}%`,
                        backgroundColor: category.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score History */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Score History</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Score Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Achievements</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reputationData.achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-center space-x-3 p-4 bg-muted rounded-lg border border-border"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${achievement.bgColor}`}>
                <Icon name={achievement.icon} size={20} className={achievement.color} />
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">{achievement.title}</div>
                <div className="text-sm text-muted-foreground">{achievement.description}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Earned {achievement.earnedDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Improvement Suggestions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Improvement Suggestions</h3>
        
        <div className="space-y-4">
          {reputationData.suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Lightbulb" size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground mb-1">{suggestion.title}</div>
                <div className="text-sm text-muted-foreground">{suggestion.description}</div>
                <div className="text-xs text-primary mt-2">
                  Potential score increase: +{suggestion.scoreIncrease}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReputationDashboard;
import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';

const StatisticsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    totalLoans: 0,
    successRate: 0,
    totalFunded: 0,
    activeLenders: 0
  });
  
  const sectionRef = useRef(null);

  const finalValues = {
    totalLoans: 12847,
    successRate: 98,
    totalFunded: 2.4,
    activeLenders: 5632
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setCounters({
        totalLoans: Math.floor(finalValues.totalLoans * easeOutQuart),
        successRate: Math.floor(finalValues.successRate * easeOutQuart),
        totalFunded: (finalValues.totalFunded * easeOutQuart).toFixed(1),
        activeLenders: Math.floor(finalValues.activeLenders * easeOutQuart)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters({
          totalLoans: finalValues.totalLoans,
          successRate: finalValues.successRate,
          totalFunded: finalValues.totalFunded,
          activeLenders: finalValues.activeLenders
        });
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible]);

  const stats = [
    {
      id: 1,
      icon: 'FileText',
      label: 'Total Loans',
      value: counters.totalLoans.toLocaleString(),
      suffix: '+',
      description: 'Loans processed successfully',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 2,
      icon: 'TrendingUp',
      label: 'Success Rate',
      value: counters.successRate,
      suffix: '%',
      description: 'Loans repaid on time',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 3,
      icon: 'DollarSign',
      label: 'Total Funded',
      value: counters.totalFunded,
      suffix: 'M USDC',
      description: 'In microloans funded',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      id: 4,
      icon: 'Users',
      label: 'Active Lenders',
      value: counters.activeLenders.toLocaleString(),
      suffix: '+',
      description: 'Global lenders participating',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Platform Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real numbers from our decentralized microfinance ecosystem. 
            Join thousands of borrowers and lenders worldwide.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <div
              key={stat.id}
              className={`bg-card border border-border rounded-xl p-6 lg:p-8 text-center shadow-soft hover:shadow-elevated transition-all duration-300 animate-fadeInUp`} 
              style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
            >
              <div className={`w-16 h-16 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <Icon name={stat.icon} size={28} className={stat.color} />
              </div>
              <div className="mb-2">
                <span className="text-2xl lg:text-3xl font-bold text-foreground">
                  {stat.value}
                </span>
                <span className="text-lg lg:text-xl font-semibold text-muted-foreground ml-1">
                  {stat.suffix}
                </span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {stat.label}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
        {/* Additional Metrics */}
        <div className="mt-16 pt-16 border-t-2 border-dashed border-border animate-fadeInUp delay-300">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Icon name="Clock" size={20} className="text-primary" />
                <span className="text-2xl font-bold text-foreground">2.3</span>
                <span className="text-lg text-muted-foreground">days</span>
              </div>
              <p className="text-sm text-muted-foreground">Average funding time</p>
            </div>

            <div>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Icon name="Globe" size={20} className="text-secondary" />
                <span className="text-2xl font-bold text-foreground">45</span>
                <span className="text-lg text-muted-foreground">countries</span>
              </div>
              <p className="text-sm text-muted-foreground">Global reach</p>
            </div>

            <div>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Icon name="Repeat" size={20} className="text-accent" />
                <span className="text-2xl font-bold text-foreground">73</span>
                <span className="text-lg text-muted-foreground">%</span>
              </div>
              <p className="text-sm text-muted-foreground">Repeat borrowers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentCalendar = ({ payments, currentDate = new Date() }) => {
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [viewMode, setViewMode] = useState('month'); // month, week

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getPaymentsForDate = (date) => {
    if (!date) return [];
    const dateString = date.toISOString().split('T')[0];
    return payments.filter(payment => {
      const paymentDate = new Date(payment.dueDate).toISOString().split('T')[0];
      return paymentDate === dateString;
    });
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!date) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const getDateClasses = (date, dayPayments) => {
    let classes = 'w-full h-10 flex items-center justify-center text-sm rounded-md transition-smooth cursor-pointer relative ';
    
    if (!date) {
      return classes + 'invisible';
    }
    
    if (isToday(date)) {
      classes += 'bg-primary text-primary-foreground font-medium ';
    } else if (isSelected(date)) {
      classes += 'bg-primary/20 text-primary font-medium ';
    } else {
      classes += 'hover:bg-muted text-foreground ';
    }
    
    if (dayPayments.length > 0) {
      classes += 'font-semibold ';
    }
    
    return classes;
  };

  const getPaymentIndicator = (dayPayments) => {
    if (dayPayments.length === 0) return null;
    
    const hasOverdue = dayPayments.some(p => p.status === 'overdue');
    const hasUpcoming = dayPayments.some(p => p.status === 'upcoming');
    const hasPaid = dayPayments.some(p => p.status === 'paid');
    
    let indicatorColor = 'bg-muted-foreground';
    if (hasOverdue) indicatorColor = 'bg-error';
    else if (hasUpcoming) indicatorColor = 'bg-warning';
    else if (hasPaid) indicatorColor = 'bg-success';
    
    return (
      <div className={`absolute bottom-1 right-1 w-2 h-2 rounded-full ${indicatorColor}`}>
        {dayPayments.length > 1 && (
          <span className="absolute -top-1 -right-1 text-xs font-bold text-foreground">
            {dayPayments.length}
          </span>
        )}
      </div>
    );
  };

  const days = getDaysInMonth(selectedDate);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Payment Calendar</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth(-1)}
              iconName="ChevronLeft"
            />
            <span className="text-sm font-medium text-foreground min-w-[120px] text-center">
              {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth(1)}
              iconName="ChevronRight"
            />
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            const dayPayments = getPaymentsForDate(date);
            return (
              <div
                key={index}
                className={getDateClasses(date, dayPayments)}
                onClick={() => date && setSelectedDate(date)}
              >
                {date && (
                  <>
                    <span>{date.getDate()}</span>
                    {getPaymentIndicator(dayPayments)}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-muted-foreground">Paid</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-muted-foreground">Upcoming</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-muted-foreground">Overdue</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Today</span>
            </div>
          </div>
        </div>

        {/* Selected Date Payments */}
        {selectedDate && getPaymentsForDate(selectedDate).length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <h4 className="text-sm font-medium text-foreground mb-2">
              Payments on {selectedDate.toLocaleDateString()}
            </h4>
            <div className="space-y-2">
              {getPaymentsForDate(selectedDate).map(payment => (
                <div key={payment.id} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                  <div className="flex items-center space-x-2">
                    <Icon name="CreditCard" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">Payment #{payment.installment}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-mono text-foreground">${payment.amount.toLocaleString()}</span>
                    <span className={`w-2 h-2 rounded-full ${
                      payment.status === 'paid' ? 'bg-success' :
                      payment.status === 'overdue' ? 'bg-error' :
                      payment.status === 'upcoming' ? 'bg-warning' : 'bg-muted-foreground'
                    }`}></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentCalendar;
import React from 'react';
import Icon from '../../../components/AppIcon';

const BenefitsGrid = () => {
  const benefits = [
    {
      id: 1,
      icon: 'Users',
      title: 'No Intermediaries',
      description: 'Direct peer-to-peer lending eliminates traditional banking fees and delays. Connect directly with lenders worldwide.',
      features: ['Zero banking fees', 'Direct connections', 'Faster approvals'],
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 2,
      icon: 'Globe',
      title: 'Global Access',
      description: 'Access funding from anywhere in the world. Our decentralized platform breaks down geographical barriers.',
      features: ['Worldwide reach', 'Multi-currency support', '24/7 availability'],
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      id: 3,
      icon: 'Shield',
      title: 'Transparent Reputation',
      description: 'Blockchain-based reputation system ensures trust and transparency. Every transaction is recorded immutably.',
      features: ['Immutable records', 'Public verification', 'Trust scoring'],
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Choose DeFi Microfinance?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of microfinance with our blockchain-powered platform 
            that puts control back in your hands.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <div
              key={benefit.id}
              className={`bg-card border border-border rounded-xl p-8 shadow-soft hover:shadow-elevated transition-all duration-300 group animate-fadeInUp`} 
              style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
            >
              <div className={`w-16 h-16 ${benefit.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <Icon name={benefit.icon} size={28} className={benefit.color} />
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-4">
                {benefit.title}
              </h3>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {benefit.description}
              </p>

              <ul className="space-y-2">
                {benefit.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-16 pt-16 border-t-2 border-dashed border-border">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Lock" size={20} className="text-success" />
              </div>
              <h4 className="font-semibold text-foreground mb-1">Secure</h4>
              <p className="text-sm text-muted-foreground">Smart contract protected</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Zap" size={20} className="text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-1">Fast</h4>
              <p className="text-sm text-muted-foreground">Instant transactions</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Eye" size={20} className="text-secondary" />
              </div>
              <h4 className="font-semibold text-foreground mb-1">Transparent</h4>
              <p className="text-sm text-muted-foreground">Open source code</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="DollarSign" size={20} className="text-accent" />
              </div>
              <h4 className="font-semibold text-foreground mb-1">Low Cost</h4>
              <p className="text-sm text-muted-foreground">Minimal fees</p>
            </div>
          </div>
         {/* Testimonials Section */}
         <div className="mt-20">
           <h3 className="text-2xl font-bold text-center text-foreground mb-8 animate-fadeInUp">What Our Users Say</h3>
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[1,2,3].map((i) => (
               <div key={i} className="bg-card/80 rounded-2xl shadow-xl border border-border p-8 flex flex-col items-center animate-fadeInUp" style={{animationDelay: `${0.2 + i * 0.1}s`}}>
                 <Icon name="Star" size={28} className="text-amber-400 mb-2" />
                 <p className="text-lg text-foreground text-center mb-4">“This platform made microloans easy and transparent. Highly recommended!”</p>
                 <div className="flex items-center space-x-3 mt-4">
                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/40 to-primary/40 flex items-center justify-center shadow-lg">
                     <Icon name="User" size={20} className="text-primary" />
                   </div>
                   <span className="text-sm text-muted-foreground">Maria S.</span>
                 </div>
               </div>
             ))}
           </div>
           {/* Partner Logos */}
           <div className="flex flex-wrap justify-center items-center gap-8 mt-12 animate-fadeInUp" style={{animationDelay: '0.5s'}}>
             {["Solana", "Ethereum", "Visa", "Mastercard"].map((partner) => (
               <div key={partner} className="flex items-center space-x-2">
                 <Icon name="Zap" size={24} className="text-accent" />
                 <span className="text-base text-muted-foreground font-semibold">{partner}</span>
               </div>
             ))}
           </div>
         </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsGrid;
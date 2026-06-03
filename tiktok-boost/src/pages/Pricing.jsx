import { useState } from 'react';
import { Check, Send } from 'lucide-react';

const Pricing = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const plans = [
    {
      name: 'Starter',
      price: { monthly: 9.99, yearly: 99.99 },
      description: 'Perfect for beginners starting their TikTok journey',
      features: [
        '1,000 Followers',
        '5,000 Likes',
        '10,000 Views',
        'Basic Support',
        '7-day Delivery',
      ],
      popular: false,
    },
    {
      name: 'Pro',
      price: { monthly: 29.99, yearly: 299.99 },
      description: 'Best for growing creators and influencers',
      features: [
        '5,000 Followers',
        '25,000 Likes',
        '100,000 Views',
        'Priority Support',
        '3-day Delivery',
        'Custom Comments',
        'Analytics Report',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: { monthly: 99.99, yearly: 999.99 },
      description: 'For established brands and viral creators',
      features: [
        '20,000 Followers',
        '100,000 Likes',
        '500,000 Views',
        '24/7 VIP Support',
        'Instant Delivery',
        'Custom Strategy',
        'Dedicated Manager',
        'Money-back Guarantee',
      ],
      popular: false,
    },
  ];

  return (
    <div className="pricing">
      <section className="pricing-header">
        <h1 className="page-title">Pricing Plans</h1>
        <p className="page-subtitle">Choose the perfect plan to boost your TikTok presence</p>
        
        <div className="pricing-toggle">
          <button
            className={selectedPeriod === 'monthly' ? 'active' : ''}
            onClick={() => setSelectedPeriod('monthly')}
          >
            Monthly
          </button>
          <button
            className={selectedPeriod === 'yearly' ? 'active' : ''}
            onClick={() => setSelectedPeriod('yearly')}
          >
            Yearly <span className="save-badge">Save 20%</span>
          </button>
        </div>
      </section>

      <section className="pricing-grid">
        {plans.map((plan, index) => (
          <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
            {plan.popular && <span className="popular-badge">Most Popular</span>}
            <h3>{plan.name}</h3>
            <p className="plan-description">{plan.description}</p>
            <div className="plan-price">
              <span className="currency">$</span>
              <span className="amount">{plan.price[selectedPeriod]}</span>
              <span className="period">/{selectedPeriod === 'monthly' ? 'month' : 'year'}</span>
            </div>
            <ul className="plan-features">
              {plan.features.map((feature, idx) => (
                <li key={idx}>
                  <Check size={18} />
                  {feature}
                </li>
              ))}
            </ul>
            <a href="/contact" className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}>
              Get Started
            </a>
          </div>
        ))}
      </section>

      <section className="pricing-cta">
        <h2>Need a Custom Package?</h2>
        <p>Contact us on Telegram for personalized solutions</p>
        <a href="https://t.me/tiktokboost" target="_blank" rel="noopener noreferrer" className="telegram-btn-large">
          <Send size={20} />
          <span>Contact on Telegram</span>
        </a>
      </section>
    </div>
  );
};

export default Pricing;

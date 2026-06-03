import { Link } from 'react-router-dom';
import { ArrowRight, Users, Heart, Eye, TrendingUp, Zap, Shield, Clock } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Users size={40} />,
      title: 'Real Followers',
      description: 'Get authentic followers who engage with your content',
    },
    {
      icon: <Heart size={40} />,
      title: 'Quality Likes',
      description: 'Boost your video engagement with genuine likes',
    },
    {
      icon: <Eye size={40} />,
      title: 'More Views',
      description: 'Increase your video visibility and reach',
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'Go Viral',
      description: 'Enhance your chances of trending on TikTok',
    },
  ];

  const benefits = [
    {
      icon: <Zap size={24} />,
      title: 'Instant Delivery',
      description: 'Fast and reliable service delivery',
    },
    {
      icon: <Shield size={24} />,
      title: '100% Safe',
      description: 'No password required, completely secure',
    },
    {
      icon: <Clock size={24} />,
      title: '24/7 Support',
      description: 'Round the clock customer support',
    },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Boost Your <span className="highlight">TikTok</span> Presence
          </h1>
          <p className="hero-subtitle">
            Get more followers, likes, and views instantly. Grow your TikTok account with our professional boosting services.
          </p>
          <div className="hero-buttons">
            <Link to="/pricing" className="btn btn-primary">
              Get Started <ArrowRight size={20} />
            </Link>
            <Link to="/services" className="btn btn-secondary">
              View Services
            </Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-card">
            <h3>10M+</h3>
            <p>Followers Delivered</p>
          </div>
          <div className="stat-card">
            <h3>50M+</h3>
            <p>Likes Generated</p>
          </div>
          <div className="stat-card">
            <h3>100K+</h3>
            <p>Happy Customers</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <h2 className="section-title">Our Promise</h2>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Go Viral?</h2>
        <p>Start boosting your TikTok account today!</p>
        <Link to="/pricing" className="btn btn-primary btn-large">
          View Pricing Plans
        </Link>
      </section>
    </div>
  );
};

export default Home;

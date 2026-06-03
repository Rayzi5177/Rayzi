import { Users, Heart, Eye, MessageCircle, TrendingUp, Zap } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Users size={48} />,
      title: 'TikTok Followers',
      description: 'Increase your follower count with high-quality, engaged followers. Build credibility and attract organic growth.',
      features: ['High-quality profiles', 'Gradual delivery available', 'No password required', 'Lifetime guarantee'],
      popular: true,
    },
    {
      icon: <Heart size={48} />,
      title: 'TikTok Likes',
      description: 'Boost your video engagement with authentic likes. Improve your chances of appearing on the For You page.',
      features: ['Real-looking engagement', 'Fast delivery', 'Safe & secure', '24/7 support'],
      popular: false,
    },
    {
      icon: <Eye size={48} />,
      title: 'TikTok Views',
      description: 'Get more eyes on your content. Increase visibility and improve your viral potential.',
      features: ['Instant start', 'High retention rate', 'Worldwide views', 'Analytics friendly'],
      popular: false,
    },
    {
      icon: <MessageCircle size={48} />,
      title: 'TikTok Comments',
      description: 'Engage your audience with custom or random comments. Create buzz around your videos.',
      features: ['Custom comments option', 'Natural language', 'Emoji included', 'Thread replies available'],
      popular: false,
    },
    {
      icon: <TrendingUp size={48} />,
      title: 'Viral Package',
      description: 'Complete growth package combining followers, likes, views, and comments for maximum impact.',
      features: ['All-in-one solution', 'Best value', 'Priority support', 'Growth strategy guide'],
      popular: true,
    },
    {
      icon: <Zap size={48} />,
      title: 'Live Stream Boost',
      description: 'Boost your live streams with viewers and engagement. Get discovered during live broadcasts.',
      features: ['Real-time delivery', 'Viewer retention', 'Chat engagement', 'Peak time optimization'],
      popular: false,
    },
  ];

  return (
    <div className="services">
      <section className="services-header">
        <h1 className="page-title">Our Services</h1>
        <p className="page-subtitle">Choose the perfect service to boost your TikTok presence</p>
      </section>

      <section className="services-grid">
        {services.map((service, index) => (
          <div key={index} className={`service-card ${service.popular ? 'popular' : ''}`}>
            {service.popular && <span className="popular-badge">Most Popular</span>}
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p className="service-description">{service.description}</p>
            <ul className="service-features">
              {service.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <a href="/pricing" className="btn btn-primary">Order Now</a>
          </div>
        ))}
      </section>

      <section className="services-cta">
        <h2>Need a Custom Solution?</h2>
        <p>Contact us for tailored packages that fit your specific needs</p>
        <a href="/contact" className="btn btn-secondary">Contact Us</a>
      </section>
    </div>
  );
};

export default Services;

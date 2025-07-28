import React from 'react';
import { 
  FaHeart, 
  FaAward, 
  FaUsers, 
  FaGlobeAmericas, 
  FaHandshake,
  FaLeaf,
  FaShieldAlt,
  FaStar
} from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About 20 Degrees</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Empowering your health journey with premium wellness products, cutting-edge technology, 
            and expert guidance for optimal well-being.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6">
                <FaHeart />
                <span>Our Mission</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Transforming Lives Through <span className="text-blue-600">Wellness Innovation</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                At 20 Degrees, we believe that optimal health is the foundation of a fulfilling life. 
                Founded with a passion for wellness and technology, we curate premium health products 
                and provide expert guidance to help you achieve your wellness goals.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: FaAward, title: "Premium Quality", desc: "Carefully curated products from trusted brands" },
                  { icon: FaUsers, title: "Expert Team", desc: "Health professionals and wellness experts" },
                  { icon: FaGlobeAmericas, title: "Global Reach", desc: "Serving customers across Canada and beyond" },
                  { icon: FaHandshake, title: "Trust & Reliability", desc: "Building lasting relationships with our customers" }
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative">
              <img
                src="/20-degrees-logo.png"
                alt="20 Degrees Team"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and shape our commitment to your wellness journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FaHeart,
                title: "Health First",
                description: "Your well-being is our top priority in every product we offer and service we provide.",
                color: "red"
              },
              {
                icon: FaLeaf,
                title: "Natural & Pure",
                description: "We prioritize natural, clean ingredients and sustainable practices in our product selection.",
                color: "green"
              },
              {
                icon: FaShieldAlt,
                title: "Trust & Safety",
                description: "Rigorous quality standards and transparent practices ensure your complete confidence.",
                color: "blue"
              },
              {
                icon: FaStar,
                title: "Excellence",
                description: "We strive for excellence in every interaction, product, and service we deliver.",
                color: "yellow"
              }
            ].map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`w-20 h-20 bg-${value.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-10 h-10 text-${value.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Numbers that reflect our commitment to transforming lives through wellness.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "Happy Customers", color: "blue" },
              { number: "500+", label: "Premium Products", color: "green" },
              { number: "15+", label: "Health Categories", color: "purple" },
              { number: "98%", label: "Satisfaction Rate", color: "orange" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl md:text-5xl font-bold text-${stat.color}-600 mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Health professionals, wellness experts, and passionate individuals dedicated to your well-being.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                role: "Chief Health Officer",
                description: "15+ years in nutritional science and wellness coaching",
                image: "/team-member-1.jpg"
              },
              {
                name: "Michael Chen",
                role: "Product Director",
                description: "Expert in health technology and product innovation",
                image: "/team-member-2.jpg"
              },
              {
                name: "Emily Rodriguez",
                role: "Customer Success Lead",
                description: "Dedicated to ensuring exceptional customer experiences",
                image: "/team-member-3.jpg"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{member.name}</h3>
                <div className="text-blue-600 font-medium mb-4 text-center">{member.role}</div>
                <p className="text-gray-600 text-center leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Wellness Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of satisfied customers who have transformed their health with 20 Degrees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              Explore Products
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

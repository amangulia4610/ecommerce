import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaHeadset,
  FaComments,
  FaQuestionCircle,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    // Add your form submission logic here
    alert("Thank you for contacting us! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            We're here to help! Reach out to our team for any questions about
            products, orders, or wellness guidance.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FaPhone,
                title: "Phone Support",
                info: "+1 (555) 123-4567",
                description: "Mon-Fri 9AM-6PM EST",
                color: "blue",
              },
              {
                icon: FaEnvelope,
                title: "Email Support",
                info: "support@10fit.com",
                description: "24/7 response within 2 hours",
                color: "green",
              },
              {
                icon: FaMapMarkerAlt,
                title: "Visit Us",
                info: "123 Wellness Ave, Toronto, ON",
                description: "By appointment only",
                color: "purple",
              },
              {
                icon: FaHeadset,
                title: "Live Chat",
                info: "Available 24/7",
                description: "Instant support online",
                color: "orange",
              },
            ].map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <div
                  key={index}
                  className="text-center group hover:shadow-lg p-6 rounded-2xl transition-all duration-300"
                >
                  <div
                    className={`w-16 h-16 bg-${contact.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent
                      className={`w-8 h-8 text-${contact.color}-600`}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {contact.title}
                  </h3>
                  <div
                    className={`text-${contact.color}-600 font-semibold mb-2`}
                  >
                    {contact.info}
                  </div>
                  <p className="text-gray-600 text-sm">{contact.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <FaComments className="text-blue-600 text-2xl" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Send us a Message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="product">Product Questions</option>
                    <option value="order">Order Support</option>
                    <option value="technical">Technical Support</option>
                    <option value="wellness">Wellness Consultation</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief subject of your message"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Business Hours */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <FaClock className="text-green-600 text-2xl" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Business Hours
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM EST" },
                    { day: "Saturday", hours: "10:00 AM - 4:00 PM EST" },
                    { day: "Sunday", hours: "Closed" },
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="font-medium text-gray-700">
                        {schedule.day}
                      </span>
                      <span className="text-gray-600">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <FaQuestionCircle className="text-purple-600 text-2xl" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Quick Help
                  </h3>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      question: "How do I track my order?",
                      answer:
                        "Log into your account and visit the Orders section to track your shipment.",
                    },
                    {
                      question: "What's your return policy?",
                      answer:
                        "We offer 30-day returns on unopened products with original packaging.",
                    },
                    {
                      question: "Do you offer wellness consultations?",
                      answer:
                        "Yes! Our certified health professionals provide personalized consultations.",
                    },
                  ].map((faq, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-100 pb-4 last:border-b-0"
                    >
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {faq.question}
                      </h4>
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Visit Our Location
            </h2>
            <p className="text-lg text-gray-600">
              Schedule an appointment to visit our wellness center and meet our
              team.
            </p>
          </div>

          <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <FaMapMarkerAlt className="text-4xl text-gray-400 mb-4 mx-auto" />
              <p className="text-gray-600">
                Interactive map would be integrated here
              </p>
              <p className="text-sm text-gray-500 mt-2">
                123 Wellness Ave, Toronto, ON M5V 3A1
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

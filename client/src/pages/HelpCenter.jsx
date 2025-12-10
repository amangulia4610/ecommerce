import React from "react";
import {
  FaQuestionCircle,
  FaShippingFast,
  FaUndoAlt,
  FaCreditCard,
  FaShieldAlt,
  FaHeadset,
  FaBoxOpen,
  FaUserFriends,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { useState } from "react";

const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState("orders");
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const categories = [
    {
      id: "orders",
      name: "Orders & Shipping",
      icon: FaShippingFast,
      color: "blue",
    },
    {
      id: "returns",
      name: "Returns & Refunds",
      icon: FaUndoAlt,
      color: "green",
    },
    {
      id: "payments",
      name: "Payments & Billing",
      icon: FaCreditCard,
      color: "purple",
    },
    {
      id: "products",
      name: "Products & Health",
      icon: FaBoxOpen,
      color: "orange",
    },
    {
      id: "account",
      name: "Account & Profile",
      icon: FaUserFriends,
      color: "red",
    },
    {
      id: "technical",
      name: "Technical Support",
      icon: FaShieldAlt,
      color: "indigo",
    },
  ];

  const faqData = {
    orders: [
      {
        question: "How do I track my order?",
        answer:
          "You can track your order by logging into your account and visiting the 'My Orders' section. You'll receive a tracking number via email once your order ships. You can also use this tracking number on our shipping partner's website for real-time updates.",
      },
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping takes 3-5 business days within Canada. Express shipping (1-2 business days) is available for an additional fee. International shipping typically takes 7-14 business days depending on the destination.",
      },
      {
        question: "Do you offer same-day delivery?",
        answer:
          "Yes! Same-day delivery is available in Toronto, Vancouver, and Montreal for orders placed before 2 PM. A $15 fee applies for this premium service.",
      },
      {
        question: "Can I change my shipping address after placing an order?",
        answer:
          "You can change your shipping address within 2 hours of placing your order by contacting our customer service. After this window, we cannot guarantee changes as your order may have already been processed.",
      },
    ],
    returns: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy for unopened products in their original packaging. Health supplements and personal care items must be unopened for hygiene reasons. Electronics can be returned within 15 days if unopened.",
      },
      {
        question: "How do I initiate a return?",
        answer:
          "Log into your account, go to 'My Orders', find the item you want to return, and click 'Request Return'. You'll receive a prepaid return label via email within 24 hours.",
      },
      {
        question: "When will I receive my refund?",
        answer:
          "Refunds are processed within 3-5 business days after we receive your returned item. The refund will be credited to your original payment method. Bank processing times may vary.",
      },
      {
        question: "Can I exchange an item instead of returning it?",
        answer:
          "Yes! You can exchange items for a different size, color, or similar product. The exchange process is the same as returns, but select 'Exchange' instead of 'Return' when submitting your request.",
      },
    ],
    payments: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and e-transfers. We also offer buy-now-pay-later options through Klarna and Afterpay.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Absolutely! We use industry-standard SSL encryption and are PCI DSS compliant. Your payment information is never stored on our servers and is processed through secure payment gateways.",
      },
      {
        question: "Why was my payment declined?",
        answer:
          "Payment declines can occur due to insufficient funds, expired cards, incorrect billing information, or bank security measures. Please verify your information and try again, or contact your bank if the issue persists.",
      },
      {
        question: "Can I use multiple payment methods for one order?",
        answer:
          "Currently, we only accept one payment method per order. However, you can use gift cards in combination with other payment methods to complete your purchase.",
      },
    ],
    products: [
      {
        question: "Are your products authentic and safe?",
        answer:
          "Yes! All our products are sourced directly from authorized distributors and manufacturers. We maintain strict quality control standards and all supplements are third-party tested for purity and potency.",
      },
      {
        question: "Do you provide health consultations?",
        answer:
          "Yes! We have certified nutritionists and wellness experts available for personalized consultations. Book a free 15-minute consultation through your account or contact our health team directly.",
      },
      {
        question: "How do I know which supplements are right for me?",
        answer:
          "We recommend starting with our online health assessment quiz, which provides personalized product recommendations. You can also book a consultation with our health experts for detailed guidance.",
      },
      {
        question: "Do your products have expiration dates?",
        answer:
          "Yes, all our products have clearly marked expiration dates. We ensure all products have at least 12 months before expiry when shipped. We regularly rotate our inventory to maintain freshness.",
      },
    ],
    account: [
      {
        question: "How do I create an account?",
        answer:
          "Click 'Sign Up' on our website, enter your email and create a password. You'll receive a verification email to activate your account. Creating an account allows you to track orders, save favorites, and access exclusive member benefits.",
      },
      {
        question: "I forgot my password. How do I reset it?",
        answer:
          "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a password reset link. The link is valid for 24 hours for security purposes.",
      },
      {
        question: "How do I update my personal information?",
        answer:
          "Log into your account and go to 'Account Settings' or 'Profile'. You can update your name, email, phone number, and addresses. Changes to your email will require verification.",
      },
      {
        question: "Can I delete my account?",
        answer:
          "Yes, you can delete your account by contacting customer service or using the 'Delete Account' option in your account settings. Please note this action is permanent and cannot be undone.",
      },
    ],
    technical: [
      {
        question: "The website is not loading properly. What should I do?",
        answer:
          "Try clearing your browser cache and cookies, or try using a different browser. If the issue persists, it might be a temporary server issue. Contact our technical support team if problems continue.",
      },
      {
        question: "I'm having trouble placing an order. What's wrong?",
        answer:
          "This could be due to browser issues, payment problems, or system maintenance. Try using a different browser, check your payment information, or contact our support team for assistance.",
      },
      {
        question: "Why am I not receiving emails from 10 Fit?",
        answer:
          "Check your spam/junk folder first. Add support@10fit.com to your contacts. If you're still not receiving emails, contact us to verify your email address in our system.",
      },
      {
        question: "Is there a mobile app available?",
        answer:
          "We currently have a mobile-optimized website that works great on phones and tablets. A dedicated mobile app is in development and will be available soon with exclusive app-only features.",
      },
    ],
  };

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FaQuestionCircle className="text-6xl mb-6 mx-auto text-blue-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Help Center</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Find answers to common questions, get support, and learn how to make
            the most of your 10 Fit experience.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help topics, products, or common issues..."
              className="w-full pl-12 pr-6 py-4 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
            />
          </div>
        </div>
      </section>

      {/* Quick Help Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quick Help
            </h2>
            <p className="text-lg text-gray-600">
              Get instant answers to the most common questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                    activeCategory === category.id
                      ? `border-${category.color}-500 bg-${category.color}-50`
                      : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-lg"
                  }`}
                >
                  <IconComponent
                    className={`text-3xl mb-4 ${
                      activeCategory === category.id
                        ? `text-${category.color}-600`
                        : "text-gray-400"
                    }`}
                  />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {category.id === "orders" &&
                      "Tracking, shipping, and delivery questions"}
                    {category.id === "returns" &&
                      "Return process, refunds, and exchanges"}
                    {category.id === "payments" &&
                      "Payment methods, billing, and security"}
                    {category.id === "products" &&
                      "Product information and health guidance"}
                    {category.id === "account" &&
                      "Profile management and account settings"}
                    {category.id === "technical" &&
                      "Website issues and technical problems"}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {categories.find((cat) => cat.id === activeCategory)?.name} FAQ
            </h2>
            <p className="text-lg text-gray-600">
              Frequently asked questions about{" "}
              {categories
                .find((cat) => cat.id === activeCategory)
                ?.name.toLowerCase()}
            </p>
          </div>

          <div className="space-y-4">
            {faqData[activeCategory]?.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {expandedFAQ === index ? (
                    <FaChevronUp className="text-gray-400 flex-shrink-0" />
                  ) : (
                    <FaChevronDown className="text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FaHeadset className="text-5xl text-blue-600 mb-6 mx-auto" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Still Need Help?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Can't find what you're looking for? Our support team is here to help
            you 24/7.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-50 rounded-2xl">
              <FaHeadset className="text-3xl text-blue-600 mb-4 mx-auto" />
              <h3 className="font-bold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get instant help from our support team
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                Start Chat
              </button>
            </div>

            <div className="p-6 bg-green-50 rounded-2xl">
              <FaEnvelope className="text-3xl text-green-600 mb-4 mx-auto" />
              <h3 className="font-bold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 text-sm mb-4">
                We'll respond within 2 hours
              </p>
              <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
                Send Email
              </button>
            </div>

            <div className="p-6 bg-purple-50 rounded-2xl">
              <FaPhone className="text-3xl text-purple-600 mb-4 mx-auto" />
              <h3 className="font-bold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 text-sm mb-4">
                Call us at +1 (555) 123-4567
              </p>
              <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors">
                Call Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;

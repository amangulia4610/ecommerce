import React from "react";
import {
  FaUndoAlt,
  FaShippingFast,
  FaBoxOpen,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const Returns = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-900 via-blue-900 to-teal-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FaUndoAlt className="text-6xl mb-6 mx-auto text-green-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Returns & Exchanges
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            We want you to be completely satisfied with your purchase. Learn
            about our hassle-free return and exchange policy.
          </p>
        </div>
      </section>

      {/* Return Policy Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaClock className="text-3xl text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                30-Day Window
              </h3>
              <p className="text-gray-600">
                Return items within 30 days of delivery for a full refund
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaShippingFast className="text-3xl text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Free Return Shipping
              </h3>
              <p className="text-gray-600">
                We provide prepaid return labels for your convenience
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaCheckCircle className="text-3xl text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Easy Process
              </h3>
              <p className="text-gray-600">
                Initiate returns online in just a few clicks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Return Process Steps */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How to Return an Item
            </h2>
            <p className="text-lg text-gray-600">
              Follow these simple steps to return your purchase
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: 1,
                title: "Log Into Your Account",
                description:
                  "Sign in to your 10 Fit account and navigate to 'My Orders' section",
                icon: FaBoxOpen,
                color: "blue",
              },
              {
                step: 2,
                title: "Select Return Item",
                description:
                  "Find your order and click 'Return Item' next to the product you want to return",
                icon: FaUndoAlt,
                color: "green",
              },
              {
                step: 3,
                title: "Choose Return Reason",
                description:
                  "Select the reason for your return and provide any additional details",
                icon: FaInfoCircle,
                color: "purple",
              },
              {
                step: 4,
                title: "Print Return Label",
                description:
                  "Download and print the prepaid return shipping label we'll email you",
                icon: FaShippingFast,
                color: "orange",
              },
              {
                step: 5,
                title: "Pack & Ship",
                description:
                  "Pack the item in its original packaging and attach the return label",
                icon: FaBoxOpen,
                color: "red",
              },
              {
                step: 6,
                title: "Get Refund",
                description:
                  "Receive your refund within 3-5 business days after we process your return",
                icon: FaCheckCircle,
                color: "green",
              },
            ].map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-6 bg-white p-8 rounded-2xl shadow-lg"
                >
                  <div
                    className={`w-16 h-16 bg-${step.color}-100 rounded-2xl flex items-center justify-center flex-shrink-0`}
                  >
                    <IconComponent
                      className={`text-2xl text-${step.color}-600`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span
                        className={`w-8 h-8 bg-${step.color}-600 text-white rounded-full flex items-center justify-center text-sm font-bold`}
                      >
                        {step.step}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Return Conditions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Return Conditions
            </h2>
            <p className="text-lg text-gray-600">
              Please ensure your items meet these requirements for returns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Returnable Items */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <FaCheckCircle className="text-2xl text-green-600" />
                <h3 className="text-xl font-bold text-green-900">
                  Returnable Items
                </h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Unopened supplements in original packaging",
                  "Electronics in original packaging with all accessories",
                  "Fitness equipment within 30 days",
                  "Books and educational materials",
                  "Health monitors and devices (unopened)",
                  "Apparel with tags attached",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-green-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Non-Returnable Items */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <FaExclamationTriangle className="text-2xl text-red-600" />
                <h3 className="text-xl font-bold text-red-900">
                  Non-Returnable Items
                </h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Opened supplements or personal care items",
                  "Perishable health foods",
                  "Custom or personalized products",
                  "Gift cards and digital products",
                  "Items used or showing wear",
                  "Products without original packaging",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FaExclamationTriangle className="text-red-600 mt-1 flex-shrink-0" />
                    <span className="text-red-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Exchange Policy */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Exchange Policy
            </h2>
            <p className="text-lg text-gray-600">
              Want to exchange for a different size, color, or similar product?
              We've got you covered.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Exchange Process
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-600 mt-1" />
                    <span className="text-gray-700">
                      Follow the same return process but select "Exchange"
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-600 mt-1" />
                    <span className="text-gray-700">
                      Choose your preferred replacement item
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-600 mt-1" />
                    <span className="text-gray-700">
                      We'll ship the new item once we receive your return
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-600 mt-1" />
                    <span className="text-gray-700">
                      No additional shipping fees for exchanges
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Exchange Conditions
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <FaInfoCircle className="text-blue-600 mt-1" />
                    <span className="text-gray-700">
                      Same or lower value items only
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaInfoCircle className="text-blue-600 mt-1" />
                    <span className="text-gray-700">
                      Must be within 30-day return window
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaInfoCircle className="text-blue-600 mt-1" />
                    <span className="text-gray-700">
                      Original item must meet return conditions
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaInfoCircle className="text-blue-600 mt-1" />
                    <span className="text-gray-700">
                      One exchange per original purchase
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Common questions about returns and exchanges
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How long do refunds take to process?",
                answer:
                  "Refunds are processed within 3-5 business days after we receive and inspect your returned item. Bank processing times may add 1-2 additional days.",
              },
              {
                question: "Can I return items purchased with a discount code?",
                answer:
                  "Yes, but the refund amount will reflect the actual amount paid after any discounts were applied.",
              },
              {
                question: "What if I received a damaged or wrong item?",
                answer:
                  "Contact us immediately! We'll provide a prepaid return label and either send a replacement or issue a full refund including original shipping costs.",
              },
              {
                question: "Can I return items to a physical store?",
                answer:
                  "Currently, all returns must be processed through our online return system. We don't accept in-store returns at this time.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Need Help with Your Return?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Our customer service team is here to assist you with any return or
            exchange questions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <FaEnvelope className="text-3xl text-white mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white mb-2">
                Email Support
              </h3>
              <p className="text-blue-100 mb-4">returns@10fit.com</p>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Send Email
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <FaPhone className="text-3xl text-white mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white mb-2">
                Phone Support
              </h3>
              <p className="text-blue-100 mb-4">+1 (555) 123-4567</p>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Call Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Returns;

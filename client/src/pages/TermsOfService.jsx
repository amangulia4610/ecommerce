import React from "react";
import {
  FaGavel,
  FaShieldAlt,
  FaUserCheck,
  FaExclamationTriangle,
  FaInfoCircle,
  FaCopyright,
  FaEnvelope,
  FaPhone,
  FaCheckCircle,
  FaBan,
} from "react-icons/fa";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FaGavel className="text-6xl mb-6 mx-auto text-blue-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Please read these terms carefully before using our services. These
            terms govern your use of 10 Fit.
          </p>
          <p className="text-sm text-blue-200 mt-4">
            Last updated: January 2025
          </p>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Terms Overview
            </h2>
            <p className="text-lg text-gray-600">
              Key points about our terms and your rights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaUserCheck className="text-2xl text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                User Responsibilities
              </h3>
              <p className="text-gray-600 text-sm">
                Use our services responsibly and legally
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-2xl text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Our Commitments</h3>
              <p className="text-gray-600 text-sm">
                Quality products and reliable service
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaCopyright className="text-2xl text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                Intellectual Property
              </h3>
              <p className="text-gray-600 text-sm">
                Respect for copyrights and trademarks
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaExclamationTriangle className="text-2xl text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Limitations</h3>
              <p className="text-gray-600 text-sm">
                Important limitations and disclaimers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Terms Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8 space-y-12">
              {/* Acceptance of Terms */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <FaCheckCircle className="text-green-600" />
                  Acceptance of Terms
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    By accessing and using the 10 Fit website and services, you
                    accept and agree to be bound by the terms and provision of
                    this agreement. If you do not agree to abide by the above,
                    please do not use this service.
                  </p>
                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <h3 className="font-bold text-green-900 mb-3">
                      By using our services, you agree to:
                    </h3>
                    <ul className="space-y-2 text-green-800">
                      <li>• Comply with all applicable laws and regulations</li>
                      <li>• Provide accurate and complete information</li>
                      <li>• Use our services for lawful purposes only</li>
                      <li>• Respect the rights of other users</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Use of Services */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <FaUserCheck className="text-blue-600" />
                  Use of Services
                </h2>
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-blue-900 mb-4">
                      Permitted Uses
                    </h3>
                    <ul className="space-y-2 text-blue-800">
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                        <span>
                          Browse and purchase products for personal use
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                        <span>Create and manage your account</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                        <span>Contact customer support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                        <span>Participate in wellness consultations</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-red-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-red-900 mb-4">
                      Prohibited Uses
                    </h3>
                    <ul className="space-y-2 text-red-800">
                      <li className="flex items-start gap-2">
                        <FaBan className="text-red-600 mt-1 flex-shrink-0" />
                        <span>Use our services for any unlawful purpose</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaBan className="text-red-600 mt-1 flex-shrink-0" />
                        <span>
                          Attempt to gain unauthorized access to our systems
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaBan className="text-red-600 mt-1 flex-shrink-0" />
                        <span>Transmit viruses, malware, or harmful code</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaBan className="text-red-600 mt-1 flex-shrink-0" />
                        <span>
                          Resell products commercially without authorization
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Account Terms */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Account Terms
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    When you create an account with us, you must provide
                    information that is accurate, complete, and current at all
                    times. You are responsible for safeguarding the password and
                    all activities that occur under your account.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-purple-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-purple-900 mb-3">
                        Your Responsibilities
                      </h3>
                      <ul className="space-y-2 text-purple-800 text-sm">
                        <li>• Keep your password secure</li>
                        <li>• Update account information promptly</li>
                        <li>• Notify us of unauthorized access</li>
                        <li>• Use only one account per person</li>
                      </ul>
                    </div>

                    <div className="bg-indigo-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-indigo-900 mb-3">
                        Our Rights
                      </h3>
                      <ul className="space-y-2 text-indigo-800 text-sm">
                        <li>• Suspend accounts for violations</li>
                        <li>• Verify account information</li>
                        <li>• Remove content that violates terms</li>
                        <li>• Terminate accounts if necessary</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products and Orders */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Products and Orders
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    All product descriptions, prices, and availability are
                    subject to change without notice. We reserve the right to
                    limit quantities and refuse orders at our discretion.
                  </p>
                  <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                    <h3 className="text-lg font-bold text-yellow-900 mb-3">
                      Important Notes
                    </h3>
                    <ul className="space-y-2 text-yellow-800">
                      <li>
                        • Prices are in Canadian Dollars (CAD) unless otherwise
                        stated
                      </li>
                      <li>• Product availability may vary by location</li>
                      <li>• We reserve the right to correct pricing errors</li>
                      <li>• Health products are for personal use only</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Health Disclaimers */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <FaExclamationTriangle className="text-orange-600" />
                  Health Disclaimers
                </h2>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                  <div className="space-y-4 text-orange-800">
                    <p className="font-semibold">
                      IMPORTANT: The health information and products offered on
                      this site are not intended to diagnose, treat, cure, or
                      prevent any disease.
                    </p>
                    <ul className="space-y-2">
                      <li>
                        • Always consult with healthcare professionals before
                        starting new supplements
                      </li>
                      <li>
                        • Individual results may vary based on personal health
                        conditions
                      </li>
                      <li>
                        • We are not responsible for adverse reactions to
                        products
                      </li>
                      <li>
                        • Stop use and consult a doctor if you experience any
                        side effects
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Intellectual Property */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <FaCopyright className="text-purple-600" />
                  Intellectual Property
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    The service and its original content, features, and
                    functionality are and will remain the exclusive property of
                    10 Fit and its licensors. The service is protected by
                    copyright, trademark, and other laws.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-purple-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-purple-900 mb-3">
                        Protected Content
                      </h3>
                      <ul className="space-y-2 text-purple-800 text-sm">
                        <li>• Website design and layout</li>
                        <li>• Product descriptions and images</li>
                        <li>• 10 Fit logo and branding</li>
                        <li>• Educational content and articles</li>
                      </ul>
                    </div>

                    <div className="bg-pink-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-pink-900 mb-3">
                        Your Rights
                      </h3>
                      <ul className="space-y-2 text-pink-800 text-sm">
                        <li>• View content for personal use</li>
                        <li>• Share product links with others</li>
                        <li>• Print receipts and order information</li>
                        <li>• Use with permission for reviews</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Limitation of Liability */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Limitation of Liability
                </h2>
                <div className="bg-gray-100 rounded-xl p-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    In no event shall 10 Fit, nor its directors, employees,
                    partners, agents, suppliers, or affiliates, be liable for
                    any indirect, incidental, special, consequential, or
                    punitive damages, including without limitation, loss of
                    profits, data, use, goodwill, or other intangible losses,
                    resulting from your use of the service.
                  </p>
                  <p className="text-gray-700 text-sm">
                    Our total liability to you for all claims shall not exceed
                    the amount you paid for products or services in the 12
                    months preceding the claim.
                  </p>
                </div>
              </div>

              {/* Governing Law */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Governing Law
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    These Terms shall be interpreted and governed by the laws of
                    the Province of Ontario, Canada, without regard to its
                    conflict of law provisions. Any disputes arising from these
                    terms will be resolved in the courts of Ontario.
                  </p>
                </div>
              </div>

              {/* Changes to Terms */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Changes to Terms
                </h2>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <p className="text-blue-800">
                    We reserve the right to modify or replace these Terms at any
                    time. If a revision is material, we will try to provide at
                    least 30 days notice prior to any new terms taking effect.
                    Your continued use of the service after changes constitutes
                    acceptance of the new Terms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Questions About These Terms?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Our legal team is available to clarify any questions about our terms
            of service.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-2xl p-6">
              <FaEnvelope className="text-3xl text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                Email Legal Team
              </h3>
              <p className="text-blue-700 mb-4">legal@10fit.com</p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                Send Email
              </button>
            </div>

            <div className="bg-green-50 rounded-2xl p-6">
              <FaPhone className="text-3xl text-green-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-green-900 mb-2">
                Call Legal Hotline
              </h3>
              <p className="text-green-700 mb-4">+1 (555) 123-LEGAL</p>
              <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
                Call Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;

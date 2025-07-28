import React from 'react';
import { 
  FaShieldAlt, 
  FaLock, 
  FaEye, 
  FaDatabase,
  FaCookie,
  FaUserFriends,
  FaEnvelope,
  FaPhone,
  FaInfoCircle,
  FaCheckCircle
} from 'react-icons/fa';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FaShieldAlt className="text-6xl mb-6 mx-auto text-indigo-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. Learn how we collect, use, and protect your personal information.
          </p>
          <p className="text-sm text-indigo-200 mt-4">Last updated: January 2025</p>
        </div>
      </section>

      {/* Privacy Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaLock className="text-2xl text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Secure Data</h3>
              <p className="text-gray-600 text-sm">Bank-level encryption protects your information</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaEye className="text-2xl text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Transparent</h3>
              <p className="text-gray-600 text-sm">Clear about what data we collect and why</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaUserFriends className="text-2xl text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Your Control</h3>
              <p className="text-gray-600 text-sm">You control your data and privacy settings</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaDatabase className="text-2xl text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Minimal Collection</h3>
              <p className="text-gray-600 text-sm">We only collect what's necessary</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8 space-y-12">
              
              {/* Introduction */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <FaInfoCircle className="text-blue-600" />
                  Introduction
                </h2>
                <div className="prose max-w-none text-gray-600 leading-relaxed space-y-4">
                  <p>
                    Welcome to 20 Degrees ("we," "our," or "us"). This Privacy Policy explains how we collect, 
                    use, disclose, and safeguard your information when you visit our website and use our services. 
                    Please read this privacy policy carefully.
                  </p>
                  <p>
                    By using our services, you consent to the data practices described in this policy. 
                    If you do not agree with the terms of this privacy policy, please do not access or use our services.
                  </p>
                </div>
              </div>

              {/* Information We Collect */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <FaDatabase className="text-green-600" />
                  Information We Collect
                </h2>
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-blue-900 mb-3">Personal Information</h3>
                    <ul className="space-y-2 text-blue-800">
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                        <span>Name, email address, phone number</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                        <span>Billing and shipping addresses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                        <span>Payment information (securely processed by third parties)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                        <span>Health information you choose to share for consultations</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-green-900 mb-3">Usage Information</h3>
                    <ul className="space-y-2 text-green-800">
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                        <span>IP address, browser type, device information</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                        <span>Pages visited, time spent on our site</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                        <span>Search queries and product interactions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                        <span>Cookies and similar tracking technologies</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How We Use Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <FaEye className="text-purple-600" />
                  How We Use Your Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-purple-900">Service Delivery</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Process and fulfill your orders</li>
                      <li>• Provide customer support</li>
                      <li>• Send order confirmations and updates</li>
                      <li>• Process payments securely</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-purple-900">Improvement & Marketing</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Improve our website and services</li>
                      <li>• Send promotional emails (with consent)</li>
                      <li>• Provide personalized recommendations</li>
                      <li>• Analyze usage patterns</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Data Protection */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <FaShieldAlt className="text-red-600" />
                  How We Protect Your Data
                </h2>
                <div className="bg-red-50 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-bold text-red-900 mb-3">Technical Safeguards</h3>
                      <ul className="space-y-2 text-red-800">
                        <li>• SSL/TLS encryption for data transmission</li>
                        <li>• Encrypted data storage</li>
                        <li>• Regular security audits</li>
                        <li>• Secure payment processing</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-red-900 mb-3">Administrative Safeguards</h3>
                      <ul className="space-y-2 text-red-800">
                        <li>• Employee access controls</li>
                        <li>• Regular staff training</li>
                        <li>• Incident response procedures</li>
                        <li>• Third-party security assessments</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cookies */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <FaCookie className="text-orange-600" />
                  Cookies & Tracking
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    We use cookies and similar technologies to enhance your browsing experience, 
                    analyze site traffic, and personalize content. You can control cookie preferences 
                    through your browser settings.
                  </p>
                  <div className="bg-orange-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-orange-900 mb-3">Types of Cookies We Use</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-orange-800 mb-2">Essential Cookies</h4>
                        <p className="text-orange-700 text-sm">Required for basic site functionality</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-orange-800 mb-2">Analytics Cookies</h4>
                        <p className="text-orange-700 text-sm">Help us understand site usage</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-orange-800 mb-2">Marketing Cookies</h4>
                        <p className="text-orange-700 text-sm">Enable personalized advertising</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-orange-800 mb-2">Preference Cookies</h4>
                        <p className="text-orange-700 text-sm">Remember your settings and choices</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Your Rights */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <FaUserFriends className="text-indigo-600" />
                  Your Privacy Rights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-indigo-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-indigo-900 mb-4">You Have the Right To:</h3>
                    <ul className="space-y-3 text-indigo-800">
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-indigo-600 mt-1 flex-shrink-0" />
                        <span>Access your personal data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-indigo-600 mt-1 flex-shrink-0" />
                        <span>Correct inaccurate information</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-indigo-600 mt-1 flex-shrink-0" />
                        <span>Delete your personal data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-indigo-600 mt-1 flex-shrink-0" />
                        <span>Opt-out of marketing communications</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-100 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">To Exercise Your Rights:</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Log into your account settings</li>
                      <li>• Contact our privacy team</li>
                      <li>• Use unsubscribe links in emails</li>
                      <li>• Adjust cookie preferences</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Third Parties */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Third-Party Services</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    We may share information with trusted third-party service providers who assist us 
                    in operating our website, conducting business, or serving you. These parties are 
                    bound by confidentiality agreements and are prohibited from using your information 
                    for any other purpose.
                  </p>
                  <div className="bg-gray-100 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Service Partners Include:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                      <div>• Payment processors</div>
                      <div>• Shipping companies</div>
                      <div>• Email service providers</div>
                      <div>• Analytics platforms</div>
                      <div>• Customer support tools</div>
                      <div>• Security services</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Updates */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Policy Updates</h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <p className="text-yellow-800">
                    We may update this privacy policy from time to time. We will notify you of any 
                    significant changes by posting the new policy on this page and updating the 
                    "Last updated" date. Your continued use of our services after any modifications 
                    indicates your acceptance of the updated policy.
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Questions About Privacy?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our privacy team is here to help with any questions or concerns about your data.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-2xl p-6">
              <FaEnvelope className="text-3xl text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">Email Privacy Team</h3>
              <p className="text-blue-700 mb-4">privacy@20degrees.com</p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                Send Email
              </button>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-6">
              <FaPhone className="text-3xl text-green-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-green-900 mb-2">Call Privacy Hotline</h3>
              <p className="text-green-700 mb-4">+1 (555) 123-PRIV</p>
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

export default PrivacyPolicy;

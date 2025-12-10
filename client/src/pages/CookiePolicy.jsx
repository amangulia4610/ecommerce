import React from "react";
import {
  FaCookie,
  FaInfoCircle,
  FaCog,
  FaShieldAlt,
  FaToggleOn,
  FaToggleOff,
  FaCheckCircle,
  FaExclamationTriangle,
  FaEye,
  FaChartLine,
} from "react-icons/fa";
import { useState } from "react";

const CookiePolicy = () => {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    analytics: true,
    marketing: false,
    preferences: true,
  });

  const toggleCookie = (type) => {
    if (type === "essential") return; // Essential cookies cannot be disabled
    setCookiePreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const saveCookiePreferences = () => {
    // Here you would save the preferences to localStorage or send to server
    alert("Cookie preferences saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-900 via-red-900 to-pink-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FaCookie className="text-6xl mb-6 mx-auto text-orange-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Cookie Policy</h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
            Learn about how we use cookies to enhance your browsing experience
            and protect your privacy.
          </p>
          <p className="text-sm text-orange-200 mt-4">
            Last updated: January 2025
          </p>
        </div>
      </section>

      {/* Cookie Preferences Panel */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <FaCog className="text-2xl text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Manage Cookie Preferences
              </h2>
            </div>
            <p className="text-gray-600 mb-8">
              Customize your cookie settings below. Essential cookies are
              required for the website to function and cannot be disabled.
            </p>

            <div className="space-y-6">
              {[
                {
                  type: "essential",
                  title: "Essential Cookies",
                  description:
                    "Required for basic website functionality, security, and your account access.",
                  icon: FaShieldAlt,
                  color: "green",
                  required: true,
                },
                {
                  type: "analytics",
                  title: "Analytics Cookies",
                  description:
                    "Help us understand how visitors interact with our website to improve user experience.",
                  icon: FaChartLine,
                  color: "blue",
                  required: false,
                },
                {
                  type: "marketing",
                  title: "Marketing Cookies",
                  description:
                    "Used to deliver personalized advertisements and track marketing campaign effectiveness.",
                  icon: FaEye,
                  color: "purple",
                  required: false,
                },
                {
                  type: "preferences",
                  title: "Preference Cookies",
                  description:
                    "Remember your settings and preferences to provide a personalized experience.",
                  icon: FaCog,
                  color: "orange",
                  required: false,
                },
              ].map((cookie, index) => {
                const IconComponent = cookie.icon;
                const isEnabled = cookiePreferences[cookie.type];

                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div
                          className={`w-12 h-12 bg-${cookie.color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}
                        >
                          <IconComponent
                            className={`w-6 h-6 text-${cookie.color}-600`}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                            {cookie.title}
                            {cookie.required && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                Required
                              </span>
                            )}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {cookie.description}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleCookie(cookie.type)}
                        disabled={cookie.required}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                          cookie.required
                            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                            : isEnabled
                            ? `bg-${cookie.color}-600 text-white hover:bg-${cookie.color}-700`
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {isEnabled ? <FaToggleOn /> : <FaToggleOff />}
                        {isEnabled ? "Enabled" : "Disabled"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={saveCookiePreferences}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What Are Cookies */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8 space-y-12">
              {/* Introduction */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <FaInfoCircle className="text-blue-600" />
                  What Are Cookies?
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Cookies are small text files that are placed on your
                    computer or mobile device when you visit a website. They are
                    widely used to make websites work more efficiently and
                    provide a better user experience.
                  </p>
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-blue-900 mb-3">
                      How Cookies Work
                    </h3>
                    <ul className="space-y-2 text-blue-800">
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                        <span>
                          Stored locally on your device by your web browser
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                        <span>
                          Contain information about your preferences and actions
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                        <span>Help websites remember you between visits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                        <span>Can be temporary (session) or persistent</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Types of Cookies */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Types of Cookies We Use
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Essential Cookies */}
                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center gap-3 mb-4">
                      <FaShieldAlt className="text-2xl text-green-600" />
                      <h3 className="text-lg font-bold text-green-900">
                        Essential Cookies
                      </h3>
                    </div>
                    <p className="text-green-800 mb-4 text-sm">
                      These cookies are necessary for the website to function
                      and cannot be switched off.
                    </p>
                    <ul className="space-y-2 text-green-700 text-sm">
                      <li>• Login and authentication</li>
                      <li>• Shopping cart functionality</li>
                      <li>• Security features</li>
                      <li>• Basic website operations</li>
                    </ul>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center gap-3 mb-4">
                      <FaChartLine className="text-2xl text-blue-600" />
                      <h3 className="text-lg font-bold text-blue-900">
                        Analytics Cookies
                      </h3>
                    </div>
                    <p className="text-blue-800 mb-4 text-sm">
                      Help us understand how visitors use our website to improve
                      user experience.
                    </p>
                    <ul className="space-y-2 text-blue-700 text-sm">
                      <li>• Page views and navigation</li>
                      <li>• Time spent on pages</li>
                      <li>• Popular content areas</li>
                      <li>• Site performance metrics</li>
                    </ul>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                    <div className="flex items-center gap-3 mb-4">
                      <FaEye className="text-2xl text-purple-600" />
                      <h3 className="text-lg font-bold text-purple-900">
                        Marketing Cookies
                      </h3>
                    </div>
                    <p className="text-purple-800 mb-4 text-sm">
                      Used to deliver relevant advertisements and track
                      marketing effectiveness.
                    </p>
                    <ul className="space-y-2 text-purple-700 text-sm">
                      <li>• Personalized ads</li>
                      <li>• Campaign tracking</li>
                      <li>• Social media integration</li>
                      <li>• Remarketing pixels</li>
                    </ul>
                  </div>

                  {/* Preference Cookies */}
                  <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                    <div className="flex items-center gap-3 mb-4">
                      <FaCog className="text-2xl text-orange-600" />
                      <h3 className="text-lg font-bold text-orange-900">
                        Preference Cookies
                      </h3>
                    </div>
                    <p className="text-orange-800 mb-4 text-sm">
                      Remember your settings and preferences for a personalized
                      experience.
                    </p>
                    <ul className="space-y-2 text-orange-700 text-sm">
                      <li>• Language preferences</li>
                      <li>• Display settings</li>
                      <li>• Saved filters</li>
                      <li>• User interface choices</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Third-Party Cookies */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Third-Party Cookies
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Some cookies on our site are set by third-party services
                    that appear on our pages. These services may set their own
                    cookies to provide features like social media integration,
                    analytics, and advertising.
                  </p>
                  <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                    <h3 className="text-lg font-bold text-yellow-900 mb-3">
                      Third-Party Services We Use
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-yellow-800 mb-2">
                          Analytics
                        </h4>
                        <ul className="text-yellow-700 text-sm space-y-1">
                          <li>• Google Analytics</li>
                          <li>• Hotjar</li>
                          <li>• Adobe Analytics</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-yellow-800 mb-2">
                          Marketing
                        </h4>
                        <ul className="text-yellow-700 text-sm space-y-1">
                          <li>• Facebook Pixel</li>
                          <li>• Google Ads</li>
                          <li>• Email marketing tools</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-yellow-800 mb-2">
                          Social Media
                        </h4>
                        <ul className="text-yellow-700 text-sm space-y-1">
                          <li>• Facebook widgets</li>
                          <li>• Twitter buttons</li>
                          <li>• Instagram feeds</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-yellow-800 mb-2">
                          Customer Support
                        </h4>
                        <ul className="text-yellow-700 text-sm space-y-1">
                          <li>• Live chat tools</li>
                          <li>• Help desk systems</li>
                          <li>• Feedback widgets</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Managing Cookies */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Managing Your Cookies
                </h2>
                <div className="space-y-6">
                  <p className="text-gray-600">
                    You have several options for managing cookies on our website
                    and in your browser.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-blue-900 mb-3">
                        On Our Website
                      </h3>
                      <ul className="space-y-2 text-blue-800 text-sm">
                        <li>• Use the cookie preference panel above</li>
                        <li>• Enable/disable specific cookie types</li>
                        <li>• Changes take effect immediately</li>
                        <li>• Preferences saved for future visits</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-purple-900 mb-3">
                        In Your Browser
                      </h3>
                      <ul className="space-y-2 text-purple-800 text-sm">
                        <li>• Browser settings and privacy controls</li>
                        <li>• Block all cookies (may break functionality)</li>
                        <li>• Delete existing cookies</li>
                        <li>• Private/incognito browsing mode</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                    <div className="flex items-start gap-3">
                      <FaExclamationTriangle className="text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-bold text-red-900 mb-2">
                          Important Note
                        </h3>
                        <p className="text-red-800 text-sm">
                          Disabling certain cookies may limit website
                          functionality. Essential cookies are required for
                          basic features like shopping cart and account access.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cookie Lifespan */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Cookie Lifespan
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-indigo-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-indigo-900 mb-3">
                      Session Cookies
                    </h3>
                    <p className="text-indigo-800 text-sm mb-3">
                      Temporary cookies that expire when you close your browser.
                    </p>
                    <ul className="space-y-1 text-indigo-700 text-sm">
                      <li>• Shopping cart contents</li>
                      <li>• Login sessions</li>
                      <li>• Navigation state</li>
                    </ul>
                  </div>

                  <div className="bg-teal-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-teal-900 mb-3">
                      Persistent Cookies
                    </h3>
                    <p className="text-teal-800 text-sm mb-3">
                      Cookies that remain on your device for a set period or
                      until deleted.
                    </p>
                    <ul className="space-y-1 text-teal-700 text-sm">
                      <li>• User preferences (30 days)</li>
                      <li>• Analytics data (2 years)</li>
                      <li>• Marketing tracking (1 year)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Updates */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Policy Updates
                </h2>
                <div className="bg-gray-100 rounded-xl p-6">
                  <p className="text-gray-700">
                    We may update this Cookie Policy from time to time to
                    reflect changes in our practices or applicable laws. We will
                    notify you of any significant changes by posting the updated
                    policy on this page and updating the "Last updated" date.
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
            Questions About Cookies?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Contact us if you have any questions about our use of cookies or
            this policy.
          </p>

          <div className="bg-orange-50 rounded-2xl p-8">
            <FaCookie className="text-4xl text-orange-600 mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-orange-900 mb-4">
              Cookie Support
            </h3>
            <p className="text-orange-800 mb-6">
              Our team can help you understand and manage your cookie
              preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors">
                Email: cookies@10fit.com
              </button>
              <button className="bg-white text-orange-600 border-2 border-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-colors">
                Call: +1 (555) 123-COOKIE
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicy;

'use client';

import { useState, useEffect } from 'react';

const fuelOptions = [
  { value: 'petrol', label: 'Petrol', price: 280, icon: '⛽' },
  { value: 'diesel', label: 'Diesel', price: 250, icon: '🚛' },
  { value: 'cng', label: 'CNG', price: 150, icon: '💨' },
];

const paymentMethods = [
  { value: 'cod', label: 'Cash on Delivery', icon: '💵' },
  { value: 'jazzcash', label: 'JazzCash', icon: '📱' },
  { value: 'easypaisa', label: 'EasyPaisa', icon: '📲' },
  { value: 'bank', label: 'Bank Transfer', icon: '🏦' },
];

export default function Home() {
  const [location, setLocation] = useState('');
  const [fuelType, setFuelType] = useState('petrol');
  const [quantity, setQuantity] = useState(5);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedFuel = fuelOptions.find(f => f.value === fuelType);
  const totalPrice = selectedFuel ? selectedFuel.price * quantity : 0;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation(`${pos.coords.latitude}, ${pos.coords.longitude}`);
        },
        (err) => {
          setError('Location access denied. Please enter your location manually.');
        }
      );
    } else {
      setError('Geolocation not supported. Please enter your location manually.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) {
      setError('Location is required.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location, fuelType, quantity, paymentMethod, totalPrice }),
      });
      const data = await res.json();
      setOrderId(data.orderId);
    } catch (err) {
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-3xl mr-2">⛽</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">FuelNow</div>
              <span className="ml-2 text-sm text-gray-500">Pakistan</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium transition duration-200">Home</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium transition duration-200">Services</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium transition duration-200">Pricing</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition duration-200">Contact</a>
            </nav>
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-blue-600">
                <span className="text-2xl">☰</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-500/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Emergency Fuel Delivery
              <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Across Pakistan</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Never run out of fuel again! Get premium quality fuel delivered to your doorstep in 15-30 minutes.
              Trusted by thousands of drivers across Pakistan.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-md">
                <span className="text-2xl mr-3">✅</span>
                <span className="font-semibold text-gray-800">Premium Quality Fuel</span>
              </div>
              <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-md">
                <span className="text-2xl mr-3">🚚</span>
                <span className="font-semibold text-gray-800">Fast Delivery</span>
              </div>
              <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-md">
                <span className="text-2xl mr-3">💳</span>
                <span className="font-semibold text-gray-800">Multiple Payment Options</span>
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <div className="text-6xl animate-bounce">⛽</div>
              <div className="text-6xl animate-bounce delay-100">🚗</div>
              <div className="text-6xl animate-bounce delay-200">⚡</div>
            </div>
          </div>
        </div>
      </section>

      {/* Fuel Types Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Fuel Type</h2>
            <p className="text-gray-600">Premium quality fuels available across Pakistan</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {fuelOptions.map((fuel) => (
              <div key={fuel.value} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 border border-gray-200">
                <div className="text-center">
                  <div className="text-5xl mb-4">{fuel.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{fuel.label}</h3>
                  <p className="text-2xl font-bold text-green-600 mb-4">Rs. {fuel.price}/L</p>
                  <p className="text-gray-600 text-sm">High-quality, tested fuel delivered fresh</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">🚀 Order Fuel Now</h2>
              <p className="text-gray-600">Fill in your details and get fuel delivered instantly</p>
            </div>
            {!orderId ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">📍 Your Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter your address or allow GPS access"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition duration-200 text-gray-800"
                      required
                    />
                    {error && <p className="text-red-500 text-sm mt-2 flex items-center"><span className="mr-1">⚠️</span>{error}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">⛽ Fuel Type</label>
                    <select
                      value={fuelType}
                      onChange={(e) => setFuelType(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition duration-200 text-gray-800"
                    >
                      {fuelOptions.map((fuel) => (
                        <option key={fuel.value} value={fuel.value}>
                          {fuel.icon} {fuel.label} - Rs. {fuel.price}/L
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">📏 Quantity (Liters)</label>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition duration-200 text-gray-800"
                    >
                      <option value={5}>5 Liters</option>
                      <option value={10}>10 Liters</option>
                      <option value={15}>15 Liters</option>
                      <option value={20}>20 Liters</option>
                      <option value={25}>25 Liters</option>
                      <option value={30}>30 Liters</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">💳 Payment Method</label>
                    <div className="grid grid-cols-2 gap-3">
                      {paymentMethods.map((method) => (
                        <label key={method.value} className="flex items-center p-3 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition duration-200">
                          <input
                            type="radio"
                            name="payment"
                            value={method.value}
                            checked={paymentMethod === method.value}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mr-3 text-blue-500 focus:ring-blue-500"
                          />
                          <span className="text-lg mr-2">{method.icon}</span>
                          <span className="font-medium text-gray-800">{method.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border-2 border-dashed border-gray-300">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl mb-1">⏱️</div>
                      <p className="text-sm text-gray-600">Estimated Delivery</p>
                      <p className="text-lg font-bold text-blue-600">15-30 minutes</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">💰</div>
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="text-3xl font-bold text-green-600">Rs. {totalPrice.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                      Placing Order...
                    </span>
                  ) : (
                    <span>🚀 Order Fuel Now - Rs. {totalPrice.toLocaleString()}</span>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-300 text-green-800 px-8 py-6 rounded-xl mb-6">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="font-bold text-2xl mb-2">Order Placed Successfully!</h3>
                  <p className="text-lg mb-2">Order ID: <span className="font-mono font-bold text-blue-600">{orderId}</span></p>
                  <p className="text-gray-700">Our delivery partner will contact you within 5 minutes.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={`https://wa.me/923001234567?text=Order ID: ${orderId} - FuelNow Pakistan`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition duration-200 shadow-md"
                  >
                    <span className="text-lg mr-2">📱</span>
                    WhatsApp Support
                  </a>
                  <button
                    onClick={() => setOrderId(null)}
                    className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition duration-200 shadow-md"
                  >
                    <span className="text-lg mr-2">🔄</span>
                    Place Another Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose FuelNow Pakistan?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Pakistan's most trusted emergency fuel delivery service</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition duration-300">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Super Fast</h3>
              <p className="text-gray-600">15-30 minute delivery across major Pakistani cities</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition duration-300">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Safe</h3>
              <p className="text-gray-600">PSO and Shell certified fuel with quality guarantee</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition duration-300">
                <span className="text-3xl">💳</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Payments</h3>
              <p className="text-gray-600">Cash, JazzCash, EasyPaisa, and bank transfer options</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition duration-300">
                <span className="text-3xl">📞</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support in Urdu & English</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Current Fuel Prices</h2>
            <p className="text-gray-600">Competitive rates with no hidden charges</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {fuelOptions.map((fuel) => (
              <div key={fuel.value} className="bg-white rounded-xl shadow-lg p-6 text-center border-2 border-gray-100 hover:border-blue-300 transition duration-300">
                <div className="text-5xl mb-4">{fuel.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{fuel.label}</h3>
                <div className="text-4xl font-bold text-green-600 mb-4">Rs. {fuel.price}</div>
                <p className="text-gray-600 mb-4">per liter</p>
                <div className="text-sm text-gray-500">
                  <p>• Premium quality</p>
                  <p>• Fresh delivery</p>
                  <p>• Quality tested</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How FuelNow Works</h2>
            <p className="text-blue-100">Simple 3-step process to get fuel delivered</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border-4 border-white/30">
                <span className="text-3xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">📱 Place Order</h3>
              <p className="text-blue-100">Select fuel type, quantity, and payment method</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border-4 border-white/30">
                <span className="text-3xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">🚚 Track Delivery</h3>
              <p className="text-blue-100">Our partner contacts you and delivers fuel safely</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border-4 border-white/30">
                <span className="text-3xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">💰 Pay & Drive</h3>
              <p className="text-blue-100">Pay using your preferred method and continue journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600">Trusted by drivers across Pakistan</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-3">⭐⭐⭐⭐⭐</div>
                <div className="text-sm text-gray-600">Ahmed K., Lahore</div>
              </div>
              <p className="text-gray-700 italic">"FuelNow saved me during an emergency trip. Got diesel delivered in 20 minutes! Highly recommend."</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-3">⭐⭐⭐⭐⭐</div>
                <div className="text-sm text-gray-600">Sara M., Karachi</div>
              </div>
              <p className="text-gray-700 italic">"Amazing service! EasyPaisa payment and the fuel quality is excellent. Will use again."</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-3">⭐⭐⭐⭐⭐</div>
                <div className="text-sm text-gray-600">Bilal R., Islamabad</div>
              </div>
              <p className="text-gray-700 italic">"Best fuel delivery service in Pakistan. Fast, reliable, and great customer support."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-2">⛽</div>
                <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">FuelNow</div>
              </div>
              <p className="text-gray-400 mb-4">Pakistan's #1 emergency fuel delivery service. Available in Lahore, Karachi, Islamabad, and major cities.</p>
              <div className="flex space-x-4">
                <span className="text-2xl">📘</span>
                <span className="text-2xl">📷</span>
                <span className="text-2xl">🐦</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Fuel Types</h4>
              <ul className="space-y-2 text-gray-400">
                <li>⛽ Premium Petrol</li>
                <li>🚛 High-Grade Diesel</li>
                <li>💨 Compressed Natural Gas</li>
                <li>🔧 Emergency Services</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Payment Methods</h4>
              <ul className="space-y-2 text-gray-400">
                <li>💵 Cash on Delivery</li>
                <li>📱 JazzCash</li>
                <li>📲 EasyPaisa</li>
                <li>🏦 Bank Transfer</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 support@fuelnow.pk</li>
                <li>📱 +92 300 123 4567</li>
                <li>🏢 Lahore, Pakistan</li>
                <li>🕒 24/7 Available</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 FuelNow Pakistan. All rights reserved. | Licensed fuel delivery service | Made with ❤️ for Pakistani drivers</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
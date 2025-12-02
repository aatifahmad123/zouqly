import { useState, useMemo, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";
import { CheckCircle, Package, User, MapPin } from "lucide-react";
import { saveOrderToGoogleSheets } from "../utils/googleSheets";
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

interface CheckoutPageProps {
  onBack: () => void;
}

type DeliveryLocation = "delhi" | "ncr" | "outside" | "";

const DELIVERY_RATES = {
  delhi: 50,
  ncr: 70,
  outside: 90,
};

export default function CheckoutPage({ onBack }: CheckoutPageProps) {
  const { theme } = useTheme();
  const { cart, getCartTotal, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  
  useEffect(() => {
    if (isSubmitted) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 6000); // Increased from 3000ms to 6000ms (6 seconds)
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    location: "" as DeliveryLocation,
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const deliveryRate = useMemo(() => {
    if (!formData.location) return 0;
    if (formData.location in DELIVERY_RATES) {
      return DELIVERY_RATES[formData.location as keyof typeof DELIVERY_RATES];
    }
    return 0;
  }, [formData.location]);

  const totalAmount = useMemo(() => {
    return getCartTotal() + deliveryRate;
  }, [getCartTotal, deliveryRate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        location: formData.location,
        notes: formData.notes || "",
        items: cart.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          weight: item.weight,
        })),
        subtotal: getCartTotal(),
        deliveryCharge: deliveryRate,
        total: totalAmount,
        orderDate: new Date().toISOString(),
      };

      await saveOrderToGoogleSheets(orderData);
      setIsSubmitted(true);
      clearCart();
    } catch (error) {
      console.error("Error saving order:", error);
      alert("There was an error placing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    // Scroll to top when order is submitted
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    return (
      <>
        {showConfetti && (
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={500}
            gravity={0.2}
            colors={['#f59e0b', '#f97316', '#fbbf24', '#fde047', '#84cc16', '#10b981']}
            style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000 }}
          />
        )}
      <div className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-green-50 via-emerald-50 to-white'
      }`}>
        <div className={`max-w-md w-full rounded-2xl shadow-2xl p-8 text-center transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        }`}>
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
            theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100'
          }`}>
            <CheckCircle size={48} className={theme === 'dark' ? 'text-green-400' : 'text-green-600'} />
          </div>
          <h2 className={`text-3xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            Order Placed Successfully!
          </h2>
          <p className={`mb-2 leading-relaxed ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Thank you for your order,{" "}
            <span className="font-semibold">{formData.fullName}</span>!
          </p>
          <p className={`mb-8 leading-relaxed ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            We'll contact you shortly at{" "}
            <span className="font-semibold">{formData.phone}</span> to confirm
            your order.
          </p>
          <button
            onClick={onBack}
            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Continue Shopping
          </button>
        </div>
      </div>
      </>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-amber-50 via-orange-50 to-white text-gray-800"
      } py-12 px-4`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className={`text-4xl font-bold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            Checkout
          </h1>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            Complete your order by filling in your details
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className={`rounded-2xl shadow-lg p-8 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className={`flex items-center space-x-3 mb-6 pb-4 ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
              } border-b-2`}>
                <User size={24} className={theme === 'dark' ? 'text-amber-400' : 'text-amber-600'} />
                <h2 className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                  Contact Information
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-gray-300 bg-gray-100 text-gray-800 hover:border-amber-300'
                    } transition-colors`}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-gray-300 bg-gray-100 text-gray-800 hover:border-amber-300'
                    } transition-colors`}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className={`block text-sm font-semibold mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'border-gray-300 bg-gray-100 text-gray-800 hover:border-amber-300'
                  } transition-colors`}
                  placeholder="Enter your email"
                />
              </div>

              <div className={`mt-8 flex items-center space-x-3 mb-6 pb-4 ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
              } border-b-2`}>
                <MapPin size={24} className={theme === 'dark' ? 'text-amber-400' : 'text-amber-600'} />
                <h2 className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                  Delivery Information
                </h2>
              </div>

              <div className="mb-6">
                <label className={`block text-sm font-semibold mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'border-gray-300 bg-gray-100 text-gray-800 hover:border-amber-300'
                  } transition-colors`}
                  placeholder="House no, Street name"
                />
              </div>

              <div className="mb-6">
                <label className={`block text-sm font-semibold mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Delivery Location *
                </label>
                <select
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'border-gray-300 bg-gray-100 text-gray-800 hover:border-amber-300'
                  } transition-colors`}
                >
                  <option value="">Select your location</option>
                  <option value="delhi">Within Delhi</option>
                  <option value="ncr">
                    Outside Delhi but within Delhi NCR
                  </option>
                  <option value="outside">Outside Delhi NCR</option>
                </select>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-gray-300 bg-gray-100 text-gray-800 hover:border-amber-300'
                    } transition-colors`}
                    placeholder="City"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-gray-300 bg-gray-100 text-gray-800 hover:border-amber-300'
                    } transition-colors`}
                    placeholder="State"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-gray-300 bg-gray-100 text-gray-800 hover:border-amber-300'
                    } transition-colors`}
                    placeholder="Pincode"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className={`block text-sm font-semibold mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Order Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'border-gray-300 bg-white text-gray-800 hover:border-amber-300'
                  } transition-colors resize-none`}
                  placeholder="Any special instructions?"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={onBack}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Back to Shop
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.location}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className={`rounded-2xl shadow-lg p-8 h-fit ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className={`flex items-center space-x-3 mb-6 pb-4 ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
              } border-b-2`}>
                <Package size={24} className={theme === 'dark' ? 'text-amber-400' : 'text-amber-600'} />
                <h2 className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                  Order Summary
                </h2>
              </div>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start"
                  >
                    <div className="flex-1">
                      <div>
                        <p className={`font-semibold text-sm ${
                          theme === 'dark' ? 'text-white' : 'text-gray-800'
                        }`}>
                          {item.name}
                        </p>
                        <p className={`text-xs ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {item.weight} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}>
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-gray-100 pt-4 space-y-3">
                <div className={`flex justify-between items-center py-3 ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
                } border-b`}>
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    Subtotal
                  </span>
                  <span className={`font-semibold ${
                    theme === 'dark' ? 'text-gray-200' : ''
                  }`}>
                    ₹{getCartTotal()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    Delivery
                  </span>
                  <span className={`font-semibold ${
                    theme === 'dark' ? 'text-gray-200' : ''
                  }`}>
                    {formData.location ? (
                      `₹${deliveryRate}`
                    ) : (
                      <span className="text-gray-400">Select location</span>
                    )}
                  </span>
                </div>
                <div className={`flex justify-between text-xl font-bold pt-3 border-t-2 ${
                  theme === 'dark' ? 'border-gray-700 text-white' : 'border-gray-100 text-gray-800'
                }`}>
                  <span>Total</span>
                  <span className={theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}>₹{totalAmount}</span>
                </div>
              </div>

              <div className={`mt-6 rounded-lg p-4 ${
                theme === 'dark' ? 'bg-amber-900/20' : 'bg-amber-50'
              }`}>
                <p className={`text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-amber-100' : 'text-gray-700'
                }`}>
                  <span className="font-semibold">Payment:</span> Cash on
                  Delivery available. We'll confirm your order via phone before
                  delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartSidebar({ isOpen, onClose, onCheckout }: CartSidebarProps) {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 flex flex-col">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShoppingBag size={28} />
            <div>
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <p className="text-sm text-amber-100">{cart.length} items</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={64} className="text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Add some delicious dry fruits to get started!</p>
              <button
                onClick={onClose}
                className="bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-700 border-2 border-gray-100 dark:border-gray-600 rounded-xl p-4 hover:border-amber-200 dark:hover:border-amber-700 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.weight}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-600 rounded-lg px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition-colors p-1"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-semibold text-gray-800 dark:text-white w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition-colors p-1"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <span className="font-bold text-amber-600 dark:text-amber-500 text-lg">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-3 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t-2 border-gray-100 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-900">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total:</span>
              <span className="text-3xl font-bold text-amber-600 dark:text-amber-500">₹{getCartTotal()}</span>
            </div>
            <button
              onClick={() => {
                onCheckout();
                onClose();
              }}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

import { X, ShoppingCart, Plus, Minus, Check } from "lucide-react";
import type { Product } from "../data/products";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
}: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 800);
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => Math.max(1, prev - 1));

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X size={24} className="text-gray-700" />
          </button>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 h-64 md:h-auto">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-md">
                <span className="text-sm font-semibold text-gray-700">
                  {product.weight}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-3">
                  {product.category}
                </span>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {product.name}
                </h2>
                <div className="flex items-baseline space-x-2 mb-4">
                  <span className="text-4xl font-bold text-amber-600">
                    ₹{product.price}
                  </span>
                  <span className="text-lg text-gray-500">
                    / {product.weight}
                  </span>
                </div>
              </div>

              {/* Full Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Features
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-2 text-gray-600"
                    >
                      <Check
                        size={20}
                        className="text-amber-600 mt-0.5 flex-shrink-0"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="border-t-2 border-gray-100 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-700">
                    Quantity:
                  </span>
                  <div className="flex items-center space-x-3 bg-gray-100 rounded-lg px-3 py-2">
                    <button
                      onClick={decrementQuantity}
                      className="text-gray-600 hover:text-amber-600 transition-colors p-1"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="font-semibold text-gray-800 w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      className="text-gray-600 hover:text-amber-600 transition-colors p-1"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-300 ${
                    isAdding
                      ? "bg-green-500 text-white"
                      : "bg-amber-600 text-white hover:bg-amber-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  }`}
                >
                  <ShoppingCart size={22} />
                  <span>
                    {isAdding ? "Added to Cart!" : "Add to Cart"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


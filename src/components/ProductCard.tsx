import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '../data/products';
import { useCart } from '../contexts/CartContext';
import ProductModal from './ProductModal';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, quantity);
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 800);
  };

  const incrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div 
        onClick={handleCardClick}
        className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group cursor-pointer"
      >
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 h-56">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
          <span className="text-sm font-semibold text-gray-700">{product.weight}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="mb-4">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-amber-600">₹{product.price}</span>
            <span className="text-sm text-gray-500">/ {product.weight}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700">Quantity:</span>
          <div className="flex items-center space-x-3 bg-gray-100 rounded-lg px-2 py-1">
            <button
              onClick={decrementQuantity}
              className="text-gray-600 hover:text-amber-600 transition-colors p-1"
            >
              <Minus size={18} />
            </button>
            <span className="font-semibold text-gray-800 w-8 text-center">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="text-gray-600 hover:text-amber-600 transition-colors p-1"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-300 ${
            isAdding
              ? 'bg-green-500 text-white'
              : 'bg-amber-600 text-white hover:bg-amber-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          <ShoppingCart size={20} />
          <span>{isAdding ? 'Added!' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>

    <ProductModal
      product={product}
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    />
    </>
  );
}

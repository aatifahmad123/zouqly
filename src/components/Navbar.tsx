import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import logoIcon from '../assets/logo-icon.png';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onCartClick: () => void;
}

export default function Navbar({ currentPage, onNavigate, onCartClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-3 group"
          >
            <img 
              src={logoIcon} 
              alt="Zouqly Logo" 
              className="w-14 h-14 object-contain transform group-hover:scale-110 transition-transform duration-300"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors">
                Zouqly
              </h1>
              <p className="text-xs text-gray-500">Your Taste Habit</p>
            </div>
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className={`text-gray-700 hover:text-amber-600 font-medium transition-colors ${
                currentPage === 'home' ? 'text-amber-600' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('products')}
              className={`text-gray-700 hover:text-amber-600 font-medium transition-colors ${
                currentPage === 'products' ? 'text-amber-600' : ''
              }`}
            >
              Products
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`text-gray-700 hover:text-amber-600 font-medium transition-colors ${
                currentPage === 'about' ? 'text-amber-600' : ''
              }`}
            >
              About
            </button>
            <button
              onClick={onCartClick}
              className="relative bg-amber-600 text-white px-6 py-2.5 rounded-full hover:bg-amber-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <ShoppingCart size={20} />
              <span className="font-medium">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-amber-600 transition-colors"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            <button
              onClick={() => {
                onNavigate('home');
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 rounded-lg hover:bg-amber-50 transition-colors ${
                currentPage === 'home' ? 'bg-amber-50 text-amber-600' : 'text-gray-700'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                onNavigate('products');
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 rounded-lg hover:bg-amber-50 transition-colors ${
                currentPage === 'products' ? 'bg-amber-50 text-amber-600' : 'text-gray-700'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => {
                onNavigate('about');
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 rounded-lg hover:bg-amber-50 transition-colors ${
                currentPage === 'about' ? 'bg-amber-50 text-amber-600' : 'text-gray-700'
              }`}
            >
              About
            </button>
            <button
              onClick={() => {
                onCartClick();
                setIsMenuOpen(false);
              }}
              className="relative w-full bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingCart size={20} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

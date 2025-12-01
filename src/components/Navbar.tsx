import { ShoppingCart, Menu, X, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import logoIcon from '../assets/logo-icon.png';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onCartClick: () => void;
}

export default function Navbar({ currentPage, onNavigate, onCartClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const cartCount = getCartCount();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full top-0 z-50 transition-colors duration-300">
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
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
                Zouqly
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Your Taste Habit</p>
            </div>
          </button>

          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => onNavigate('home')}
              className={`text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 font-medium transition-colors ${
                currentPage === 'home' ? 'text-amber-600 dark:text-amber-500' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('products')}
              className={`text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 font-medium transition-colors ${
                currentPage === 'products' ? 'text-amber-600 dark:text-amber-500' : ''
              }`}
            >
              Products
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 font-medium transition-colors ${
                currentPage === 'about' ? 'text-amber-600 dark:text-amber-500' : ''
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

          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-4 py-4 space-y-3">
            <button
              onClick={() => {
                onNavigate('home');
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-800 transition-colors ${
                currentPage === 'home' ? 'bg-amber-50 dark:bg-gray-800 text-amber-600 dark:text-amber-500' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                onNavigate('products');
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-800 transition-colors ${
                currentPage === 'products' ? 'bg-amber-50 dark:bg-gray-800 text-amber-600 dark:text-amber-500' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => {
                onNavigate('about');
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-800 transition-colors ${
                currentPage === 'about' ? 'bg-amber-50 dark:bg-gray-800 text-amber-600 dark:text-amber-500' : 'text-gray-700 dark:text-gray-300'
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

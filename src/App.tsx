import { useState } from "react";
import { CartProvider } from "./contexts/CartContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import AboutPage from "./pages/AboutPage";
import CheckoutPage from "./pages/CheckoutPage";
import CartSidebar from "./components/CartSidebar";
import zouqlyFooterImage from "./assets/zouqly-image.jpeg";
import huboFallFooterImage from "./assets/hubo-fall-image.jpeg";
import logoIcon from "./assets/logo-icon.png";

function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCheckout = () => {
    setCurrentPage("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onCartClick={() => setIsCartOpen(true)}
        />

        <main className="pt-20">
          {currentPage === "home" && <HomePage onNavigate={handleNavigate} />}
          {currentPage === "products" && <ProductsPage />}
          {currentPage === "about" && <AboutPage />}
          {currentPage === "checkout" && (
            <CheckoutPage onBack={() => handleNavigate("products")} />
          )}
        </main>

        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onCheckout={handleCheckout}
        />

        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={logoIcon}
                    alt="Zouqly Logo"
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <h3 className="text-xl font-bold">Zouqly</h3>
                    <p className="text-sm text-gray-400">Your Taste Habit</p>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Premium handpicked dry fruits that bring nature's finest
                  treasures to your table.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => handleNavigate("home")}
                      className="text-gray-400 hover:text-amber-500 transition-colors"
                    >
                      Home
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigate("products")}
                      className="text-gray-400 hover:text-amber-500 transition-colors"
                    >
                      Products
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigate("about")}
                      className="text-gray-400 hover:text-amber-500 transition-colors"
                    >
                      About Us
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-4">Contact Us</h4>
                <div className="space-y-2 text-gray-400">
                  <p>Hubo Fall Ventures LLP</p>
                  <p>Okhla, New Delhi-110025</p>
                  <p>Email: info.hubofall@gmail.com</p>
                  <p>Phone: +91 9818168895</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 pb-4 flex flex-col md:flex-row items-center justify-center gap-8">
              <img
                src={zouqlyFooterImage}
                alt="Zouqly"
                className="h-24 md:h-32 w-auto object-contain"
              />
              <img
                src={huboFallFooterImage}
                alt="Hubo Fall Ventures LLP"
                className="h-24 md:h-32 w-auto object-contain"
              />
            </div>

            <div className="border-t border-gray-800 pt-4 text-center text-gray-400">
              <p>
                &copy; 2024 Zouqly - Hubo Fall Ventures LLP. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;

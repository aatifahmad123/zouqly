import { ArrowRight, Award, Leaf, Heart, Shield } from "lucide-react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import dryFruitsBg from "../assets/dry-fruits.png";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      <section className="relative text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${dryFruitsBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/60 via-orange-900/60 to-amber-800/60"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Welcome to <span className="text-amber-100">Zouqly</span>
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-amber-50 leading-relaxed">
              Your Taste Habit
            </p>
            <p className="text-lg md:text-xl mb-10 text-white opacity-90 max-w-2xl mx-auto leading-relaxed">
              Premium handpicked dry fruits that bring nature's finest treasures
              to your table
            </p>
            <button
              onClick={() => onNavigate("products")}
              className="bg-white text-amber-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-50 transition-all duration-300 inline-flex items-center space-x-2 shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              <span>Explore Products</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Premium Quality",
                description:
                  "Handpicked finest dry fruits with uncompromised quality",
              },
              {
                icon: Leaf,
                title: "100% Natural",
                description:
                  "No artificial colors, preservatives, or additives",
              },
              {
                icon: Heart,
                title: "Health First",
                description: "Packed with nutrients, vitamins, and minerals",
              },
              {
                icon: Shield,
                title: "Hygienically Sealed",
                description: "Premium packaging ensures maximum freshness",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-amber-500 group-hover:to-orange-500 transition-all duration-300">
                  <feature.icon
                    size={36}
                    className="text-amber-600 group-hover:text-white transition-colors"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Discover our most popular premium dry fruits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate("products")}
              className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>View All Products</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">About Zouqly</h2>
          <p className="text-lg mb-6 leading-relaxed text-amber-50">
            At Zouqly, we bring you nature's finest treasures in the form of
            handpicked premium dry fruits. Every product is crafted with care,
            combining health, taste, and tradition into one.
          </p>
          <p className="text-lg leading-relaxed text-amber-50 mb-8">
            With premium packaging and uncompromised quality, Zouqly is not just
            about dry fruits — it's about shaping habits that nourish body and
            soul.
          </p>
          <button
            onClick={() => onNavigate("about")}
            className="bg-white text-amber-600 px-8 py-3 rounded-full font-bold hover:bg-amber-50 transition-all duration-300 inline-flex items-center space-x-2 shadow-xl"
          >
            <span>Learn More</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}

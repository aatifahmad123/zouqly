import { useState } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Our Premium Collection
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Handpicked dry fruits packed with nutrition and flavor
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-amber-600 dark:bg-amber-700 text-white shadow-lg transform scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-700 shadow-md hover:shadow-lg'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 dark:text-gray-300">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

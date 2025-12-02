import { Target, Eye, CheckCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function AboutPage() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gradient-to-br from-amber-50 via-orange-50 to-white text-gray-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">About Zouqly</h1>
          <p className={`text-2xl ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'} font-semibold mb-6`}>
            "A name that celebrates flavor, purity, and the art of savoring life."
          </p>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-4xl mx-auto leading-relaxed`}>
            At Zouqly, we bring you nature's finest treasures in the form of handpicked premium dry fruits.
            Every product is crafted with care, combining health, taste, and tradition into one. With
            premium packaging and uncompromised quality, Zouqly is not just about dry fruits - it's about
            shaping habits that nourish body and soul.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300`}>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Target size={32} className="text-white" />
              </div>
              <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Mission</h2>
            </div>
            <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'} mb-4`}>
              "Premium Nutrition in Every Bite"
            </h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed text-lg`}>
              We are committed to delivering healthy, pure, and luxurious dry fruit products that
              enrich everyday living.
            </p>
          </div>

          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300`}>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                <Eye size={32} className="text-white" />
              </div>
              <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Vision</h2>
            </div>
            <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-amber-400' : 'text-orange-600'} mb-4`}>
              "Inspiring Healthier Lifestyles"
            </h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed text-lg`}>
              To be the most trusted brand in premium dry fruits, known for quality, innovation,
              and making healthy snacking delightful and accessible to all.
            </p>
          </div>
        </div>

        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-10`}>
          <div className="text-center mb-10">
            <h2 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-4`}>Core Values</h2>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-lg`}>The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Purity',
                description: 'Delivering natural goodness without compromise, free from adulteration.'
              },
              {
                title: 'Quality',
                description: 'Maintaining the highest standards in sourcing, processing, and packaging.'
              },
              {
                title: 'Innovation',
                description: 'Blending modern practices with timeless traditions to create delightful experiences.'
              },
              {
                title: 'Sustainability',
                description: 'Ethical sourcing and eco-conscious practices for a healthier planet.'
              },
              {
                title: 'Customer Delight',
                description: 'Going beyond satisfaction to build lasting relationships based on trust.'
              },
              {
                title: 'Excellence',
                description: 'Striving for perfection in every aspect of our business and products.'
              }
            ].map((value, index) => (
              <div
                key={index}
                className={`group p-6 rounded-xl transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50'
                }`}
              >
                <div className="flex items-start space-x-3 mb-3">
                  <CheckCircle size={24} className="text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className={`text-xl font-bold ${
                      theme === 'dark' 
                        ? 'text-white group-hover:text-amber-400' 
                        : 'text-gray-800 group-hover:text-amber-600'
                    } transition-colors`}>
                      {value.title}
                    </h3>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl shadow-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Hubo Fall Ventures LLP</h2>
          <p className="text-lg text-amber-50 leading-relaxed max-w-3xl mx-auto">
            Proudly operated by Hubo Fall Ventures LLP, Zouqly represents our commitment to bringing
            the finest quality dry fruits to homes across India and beyond. We combine traditional
            values with modern business practices to ensure every customer receives nothing but the best.
          </p>
        </div>
      </div>
    </div>
  );
}

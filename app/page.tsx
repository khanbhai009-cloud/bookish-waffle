
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });
  const [copiedLink, setCopiedLink] = useState('');
  const [lastClickedProduct, setLastClickedProduct] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);

  // Seasonal collections for slider
  const seasonalCollections = [
    {
      title: "Spring Bloom Collection",
      subtitle: "Fresh pastels & flowy fabrics",
      image: "https://readdy.ai/api/search-image?query=beautiful%20spring%20fashion%20collection%20pastel%20colors%20flowing%20dresses%20cherry%20blossoms%20soft%20lighting%20ethereal%20feminine%20elegant%20clean%20background%20professional%20photography&width=1200&height=600&seq=spring001&orientation=landscape",
      color: "from-pink-200 to-purple-200"
    },
    {
      title: "Summer Glow Collection", 
      subtitle: "Vibrant colors & breezy styles",
      image: "https://readdy.ai/api/search-image?query=summer%20fashion%20collection%20bright%20colors%20beach%20vibes%20sunny%20day%20ocean%20breeze%20elegant%20swimwear%20casual%20wear%20soft%20lighting%20professional%20photography&width=1200&height=600&seq=summer001&orientation=landscape",
      color: "from-yellow-200 to-orange-200"
    },
    {
      title: "Autumn Elegance Collection",
      subtitle: "Warm tones & cozy textures", 
      image: "https://readdy.ai/api/search-image?query=autumn%20fashion%20collection%20warm%20colors%20cozy%20sweaters%20elegant%20coats%20fall%20leaves%20golden%20hour%20soft%20lighting%20luxury%20fashion%20photography&width=1200&height=600&seq=autumn001&orientation=landscape",
      color: "from-orange-200 to-red-200"
    }
  ];

  // Load saved preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedProduct = localStorage.getItem('lastClickedProduct');
    const savedCart = localStorage.getItem('cart');
    if (savedTheme === 'dark') setIsDarkMode(true);
    if (savedProduct) setLastClickedProduct(savedProduct);
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Seasonal slider auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % seasonalCollections.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Product data with categories
  const fashionProducts = [
    { id: 1, name: 'Vintage Band Tees', price: '$2.99', image: 'https://envs.sh/nf.jpg/IMG2025080223.jpg', affiliate: 'https://bitli.in/1S4kh1u', category: 'tops' },
    { id: 2, name: 'Faux Leather Pants', price: '$8.99', image: 'https://envs.sh/nO.jpg/IMG20250802322.jpg', affiliate: 'https://bitli.in/2SCvOYj', category: 'bottoms' },
    { id: 3, name: 'Y2K Graphic Tees', price: '$3', image: 'https://envs.sh/ny.jpg/IMG20250802322.jpg', affiliate: 'https://bitli.in/Goq5eTD', category: 'tops' },
    { id: 4, name: 'Oversized Blazer', price: '$6.5', image: 'https://envs.sh/nH.jpg/IMG20250802456.jpg', affiliate: 'https://bitli.in/4cmL4uw', category: 'outerwear' },
    { id: 5, name: 'Biker Shorts', price: '$24.99', image: 'https://envs.sh/ng.jpg/IMG20250802640.jpg', affiliate: 'https://bitli.in/mF3KwXK', category: 'bottoms' },
    { id: 6, name: 'Chunky Dad Sneakers', price: '$1.99', image: 'https://readdy.ai/api/search-image?query=trendy%20chunky%20dad%20sneakers%20white%20leather%20urban%20streetwear%20fashion%20Gen%20Z%20style%20clean%20white%20background%20product%20photography%20professional%20lighting&width=400&height=400&seq=sneakers001&orientation=squarish', affiliate: 'https://bitli.in/xxJwRYC', category: 'shoes' },
    { id: 7, name: 'Oversized Hoodies', price: '$6.99', image: 'https://envs.sh/na.jpg/IMG20250802250.jpg', affiliate: 'https://bitli.in/wZioAac', category: 'tops' },
    { id: 8, name: 'Sequined Mini Dress', price: '$7.99', image: 'https://envs.sh/nm.jpg/IMG2025080295.jpg', affiliate: 'https://bitli.in/oSls67D', category: 'dresses' },
    { id: 9, name: 'Knee High Boots', price: '$1.99', image: 'https://envs.sh/nM.jpg/IMG20250802941.jpg', affiliate: 'https://bitli.in/bxvT2ce', category: 'shoes' },
    { id: 10, name: 'Fabric Paints', price: '$8.99', image: 'https://readdy.ai/api/search-image?query=colorful%20fabric%20paints%20tubes%20art%20supplies%20creative%20DIY%20fashion%20customization%20tools%20bright%20colors%20white%20background%20product%20photography&width=400&height=400&seq=paints001&orientation=squarish', affiliate: 'https://bitli.in/c3anXUi', category: 'accessories' },
    { id: 11, name: 'Distressed Jeans', price: '$7.99', image: 'https://envs.sh/nN.jpg/IMG20250802339.jpg', affiliate: 'https://bitli.in/iYVtQyi', category: 'bottoms' }
  ];

  const hairProducts = [
    { id: 12, name: 'Curl Defining Cream', price: '$1.99', image: 'https://envs.sh/n-.jpg/IMG2025080216.jpg', affiliate: 'https://bitli.in/5z3NLoZ', category: 'styling' },
    { id: 13, name: 'Shine Spray', price: '$1.99', image: 'https://envs.sh/nX.jpg/IMG20250802339.jpg', affiliate: 'https://bitli.in/HoXbKv0', category: 'styling' },
    { id: 14, name: 'Hair Elastic Bands', price: '$0.99', image: 'https://envs.sh/nV.jpg/IMG20250802478.jpg', affiliate: 'https://bitli.in/Y4cbxN2', category: 'accessories' },
    { id: 15, name: 'Detangling Spray', price: '$2.99', image: 'https://envs.sh/n6.jpg/IMG20250802538.jpg', affiliate: 'https://bitli.in/z2fmw1i', category: 'care' },
    { id: 16, name: 'Styling Cream', price: '$2.99', image: 'https://envs.sh/nv.jpg/IMG20250802186.jpg', affiliate: 'https://bitli.in/F6NotdR', category: 'styling' },
    { id: 17, name: 'Hair Glitter Spray', price: '$1.99', image: 'https://envs.sh/nx.jpg/IMG20250802827.jpg', affiliate: 'https://bitli.in/ZHsyKvV', category: 'styling' }
  ];

  // Filter products
  const getFilteredProducts = (products: any[], section: string) => {
    if (activeFilter === 'all') return products;
    return products.filter(product => product.category === activeFilter);
  };

  // Cart functions
  const addToCart = (product: any) => {
    const newCart = [...cart, { ...product, quantity: 1, id: Date.now() + Math.random() }];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeFromCart = (id: number) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0).toFixed(2);
  };

           const getOriginalPrice = (currentPrice: string): string => {
  const priceNum = parseFloat(currentPrice.replace('$', ''));
  const originalPrice = (priceNum * (3 + Math.random() * 2)).toFixed(2);
  return `$${originalPrice}`;
};

  const handleProductClick = (productName: string, affiliateLink: string) => {
    setLastClickedProduct(productName);
    localStorage.setItem('lastClickedProduct', productName);
    window.open(affiliateLink, '_blank');
  };

  const copyAffiliateLink = (link: string, productName: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(productName);
    setTimeout(() => setCopiedLink(''), 2000);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 text-gray-800'}`}>
      {/* Sticky Navigation */}
      <nav className={`sticky top-0 z-50 px-6 py-4 transition-all duration-300 backdrop-blur-md ${isDarkMode ? 'bg-gray-900/90' : 'bg-white/80'} border-b ${isDarkMode ? 'border-gray-700' : 'border-pink-200'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-[\\\'Pacifico\\\'] text-2xl bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">StyleFusion</div>
          <div className="flex items-center gap-6">
            <a href="#collections" className="hover:text-pink-400 transition-colors duration-300">Collections</a>
            <a href="#fashion" className="hover:text-pink-400 transition-colors duration-300">Fashion</a>
            <a href="#haircare" className="hover:text-pink-400 transition-colors duration-300">Hair Care</a>
            <a href="#testimonials" className="hover:text-pink-400 transition-colors duration-300">Reviews</a>
            <a href="https://t.me/imFINISHER" target="_blank" className="hover:text-pink-400 transition-colors duration-300"> Telegram</a>
            <a href="https://pin.it/3jHxrZPrn" target="_blank" className="hover:text-pink-400 transition-colors duration-300"> Pinterest</a>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative p-2 hover:text-pink-400 transition-colors duration-300"
            >
              ({cart.length})
            </button>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-purple-200 text-purple-800'} hover:scale-110`}
            >
              {isDarkMode ? '' : ''}
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowCart(false)}></div>
          <div className={`absolute right-0 top-0 h-full w-96 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl transform transition-transform duration-300`}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Your Cart </h3>
                <button onClick={() => setShowCart(false)} className="text-2xl hover:text-pink-400">✕</button>
              </div>

              {cart.length === 0 ? (
                <p className="text-center py-8 opacity-60">Your cart is empty</p>
              ) : (
                <div>
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className={`flex items-center gap-4 p-4 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-pink-50'} border ${isDarkMode ? 'border-gray-600' : 'border-pink-100'}`}>
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{item.name}</h4>
                          <p className="text-pink-500 font-bold">{item.price}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold">Total: ${getTotalPrice()}</span>
                    </div>
                    <button className="w-full py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-lg whitespace-nowrap cursor-pointer">
                      Checkout 
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Hero Section - Headlines Removed */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 via-purple-200/20 to-blue-200/30"></div>

        {/* Enhanced floating elements with premium glow */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20 animate-pulse shadow-2xl"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-20 animate-bounce shadow-xl"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full opacity-20 animate-pulse shadow-lg"></div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          {/* Enhanced Premium Countdown Timer */}
          <div className={`inline-flex flex-col items-center gap-4 px-12 py-8 rounded-3xl mb-12 ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-md border-4 border-gradient-to-r from-pink-400 to-purple-400 shadow-2xl relative overflow-hidden`}>
            {/* Premium glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400/10 to-purple-400/10 animate-pulse"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent animate-pulse">
                 🔥 FLASH SALE ENDING IN 🔥
              </h3>

              <div className="flex gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="text-4xl md:text-5xl font-black text-red-500 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent drop-shadow-lg">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wide">Hours</span>
                </div>
                <div className="text-4xl md:text-5xl font-black text-red-500 animate-pulse">:</div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl md:text-5xl font-black text-orange-500 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent drop-shadow-lg">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wide">Minutes</span>
                </div>
                <div className="text-4xl md:text-5xl font-black text-orange-500 animate-pulse">:</div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl md:text-5xl font-black text-yellow-500 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent drop-shadow-lg animate-bounce">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wide">Seconds</span>
                </div>
              </div>

              <p className="text-lg md:text-xl font-bold text-red-500 mt-4 animate-pulse">
                 ⚡ UP TO 70% OFF - DON'T MISS OUT! ⚡
              </p>
            </div>
          </div>

          <p className="text-xl md:text-2xl mb-8 opacity-80 font-medium">
            Premium fashion & beauty essentials for the modern trendsetter ✨
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-10 py-5 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black rounded-full text-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 shadow-xl whitespace-nowrap cursor-pointer border-4 border-white/20 relative overflow-hidden">
              <span className="relative z-10">SHOP NOW - SAVE 70% 🛍️</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
            </button>
            <button className="px-10 py-5 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-black rounded-full text-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 shadow-xl whitespace-nowrap cursor-pointer border-4 border-white/20 relative overflow-hidden">
              <span className="relative z-10">GET PREMIUM ACCESS 💎</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
            </button>
          </div>

          {/* Premium guarantee badge */}
          <div className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-400 text-white font-bold rounded-full shadow-lg">
            <span className="text-2xl">✓</span>
            <span>Premium Quality Guaranteed</span>
          </div>
        </div>
      </section>

      {/* Seasonal Collections Slider */}
      <section id="collections" className="py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Seasonal Collections 
          </h2>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              {seasonalCollections.map((collection, index) => (
                <div
                  key={index}
                  className={`relative h-96 transition-all duration-700 ease-in-out ${index === currentSlide ? 'block' : 'hidden'}`}
                  style={{
                    backgroundImage: `url(${collection.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${collection.color} bg-opacity-70`}></div>
                  <div className="absolute inset-0 flex items-center justify-center text-center">
                    <div className="max-w-2xl">
                      <h3 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">{collection.title}</h3>
                      <p className="text-xl md:text-2xl text-white/90 mb-6 drop-shadow-md">{collection.subtitle}</p>
                      <button className="px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white/30 hover:scale-105 transition-all duration-300 whitespace-nowrap">
                        Explore Collection
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slide indicators */}
            <div className="flex justify-center mt-6 gap-3">
              {seasonalCollections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-pink-400 w-8' : 'bg-pink-200'}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Filters */}
      <section className="py-8 px-6">
         <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['all', 'tops', 'bottoms', 'dresses', 'outerwear', 'shoes', 'accessories'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 capitalize ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg'
                    : isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-pink-50 border border-pink-200'
                }`}
              >
                {filter} {filter === 'all' && ''}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Fashion Products */}
      <section id="fashion" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Trending Fashion 
          </h2>
          <p className="text-center text-xl mb-12 opacity-80">Instagram-worthy pieces that define your aesthetic</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getFilteredProducts(fashionProducts, 'fashion').map((product) => (
              <div key={product.id} className={`group rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white/80 backdrop-blur-sm'} border ${isDarkMode ? 'border-gray-700' : 'border-pink-100'} shadow-lg`}>
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => addToCart(product)}
                      className="p-2 bg-pink-400 text-white rounded-full hover:bg-pink-500 transition-colors duration-300"
                    >
                      
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-pink-500 mb-4">{product.price}</p>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleProductClick(product.name, product.affiliate)}
                      className="w-full py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer"
                    >
                       Shop Now 
                    </button>
                    <button
                      onClick={() => copyAffiliateLink(product.affiliate, product.name)}
                      className={`w-full py-2 border-2 border-pink-400 text-pink-500 font-semibold rounded-full hover:bg-pink-400 hover:text-white transition-all duration-300 whitespace-nowrap cursor-pointer ${copiedLink === product.name ? 'bg-green-400 border-green-400 text-white' : ''}`}
                    >
                      {copiedLink === product.name ? 'Copied! ' : 'Copy Link '}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hair Care Products */}
      <section id="haircare" className={`py-20 px-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-purple-50 to-pink-50'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Hair Care Essentials 
          </h2>
          <p className="text-center text-xl mb-12 opacity-80">Premium products for that perfect hair day</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hairProducts.map((product) => (
              <div key={product.id} className={`group rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl ${isDarkMode ? 'bg-gray-900' : 'bg-white/80 backdrop-blur-sm'} border ${isDarkMode ? 'border-gray-600' : 'border-purple-100'} shadow-lg`}>
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => addToCart(product)}
                      className="p-2 bg-purple-400 text-white rounded-full hover:bg-purple-500 transition-colors duration-300"
                    >
                      
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-purple-500 mb-4">{product.price}</p>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleProductClick(product.name, product.affiliate)}
                      className="w-full py-3 bg-gradient-to-r from-purple-400 to-blue-400 text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer"
                    >
                       Shop Now 
                    </button>
                    <button
                      onClick={() => copyAffiliateLink(product.affiliate, product.name)}
                      className={`w-full py-2 border-2 border-purple-400 text-purple-500 font-semibold rounded-full hover:bg-purple-400 hover:text-white transition-all duration-300 whitespace-nowrap cursor-pointer ${copiedLink === product.name ? 'bg-green-400 border-green-400 text-white' : ''}`}
                    >
                      {copiedLink === product.name ? 'Copied! ' : 'Copy Link '}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">What Gen Z is Saying </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-8 rounded-3xl ${isDarkMode ? 'bg-gray-800' : 'bg-white/80 backdrop-blur-sm'} border ${isDarkMode ? 'border-gray-700' : 'border-pink-100'} shadow-lg hover:scale-105 transition-all duration-300`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">@aestheticava</h4>
                  <div className="text-yellow-400"></div>
                </div>
              </div>
              <p className="text-lg">"This collection is literally PERFECT! My feed has never looked better "</p>
            </div>

            <div className={`p-8 rounded-3xl ${isDarkMode ? 'bg-gray-800' : 'bg-white/80 backdrop-blur-sm'} border ${isDarkMode ? 'border-gray-700' : 'border-pink-100'} shadow-lg hover:scale-105 transition-all duration-300`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">@moodymaya</h4>
                  <div className="text-yellow-400"></div>
                </div>
              </div>
              <p className="text-lg">"The hair products are a game changer! My curls have never been more defined "</p>
            </div>

            <div className={`p-8 rounded-3xl ${isDarkMode ? 'bg-gray-800' : 'bg-white/80 backdrop-blur-sm'} border ${isDarkMode ? 'border-gray-700' : 'border-pink-100'} shadow-lg hover:scale-105 transition-all duration-300`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                  Z
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">@zoe.vibes</h4>
                  <div className="text-yellow-400"></div>
                </div>
              </div>
              <p className="text-lg">"Fast shipping and quality is amazing! These pieces are my new go-to "</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 px-6 ${isDarkMode ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/50' : 'bg-gradient-to-r from-pink-100 to-purple-100'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Ready to Transform Your Style? </h2>
          <p className="text-xl mb-8 opacity-80">Join thousands of Gen Z trendsetters who've upgraded their aesthetic</p>

          <div className={`inline-block p-8 rounded-3xl mb-8 ${isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm shadow-xl border ${isDarkMode ? 'border-gray-700' : 'border-pink-200'}`}>
            <h3 className="text-2xl font-bold mb-4"> 100% Satisfaction Guarantee</h3>
            <p className="text-lg opacity-80">Love it or return it - no questions asked!</p>
          </div>

          <button className="px-12 py-6 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold rounded-full text-xl hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg whitespace-nowrap cursor-pointer">
            Start Your Style Journey 
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-6 border-t ${isDarkMode ? 'border-gray-800 bg-gray-900' : 'bg-gradient-to-r from-pink-50 to-purple-50'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-[\\\'Pacifico\\\'] text-3xl mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">StyleFusion</div>

          {/* Contact Links */}
          <div className="flex justify-center gap-8 mb-8">
            <a
              href="https://t.me/imFINISHER"
              target="_blank"
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-400 text-white'} shadow-lg`}
            >
               Telegram
            </a>
            <a
              href="https://pin.it/3jHxrZPrn"
              target="_blank"
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-red-600 text-white' : 'bg-red-400 text-white'} shadow-lg`}
            >
               Pinterest
            </a>
          </div>

          <div className={`p-6 rounded-xl mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white/80'} backdrop-blur-sm border ${isDarkMode ? 'border-gray-700' : 'border-pink-200'} shadow-lg`}>
            <h4 className="font-bold text-lg mb-2"> Important Disclaimer</h4>
            <p className="text-sm opacity-80">
              This site is not a part of Advanced Bionutritionals. This is an affiliate promotional page. 
              Individual results may vary. Always consult professionals before making purchase decisions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm opacity-70">
            <Link href="/privacy" className="hover:text-pink-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-pink-400 transition-colors">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-pink-400 transition-colors">Disclaimer</Link>
          </div>

          {lastClickedProduct && (
            <div className="mt-6 p-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full shadow-lg">
              <p className="text-sm">Last viewed: {lastClickedProduct} </p>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}


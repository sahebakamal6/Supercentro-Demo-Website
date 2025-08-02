import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star, ChevronLeft, ChevronRight, Check, ArrowRight, Menu, X, Search, Filter, SortAsc, Eye, MapPin, Phone, Printer, Mail } from "lucide-react";
import { useCart } from "../contexts/CartContext";


const products = [
  { id: 1, name: "Power Loom Cotton Towel", price: 2500, image: "https://images.pexels.com/photos/3610006/pexels-photo-3610006.jpeg", category: "Power Towels", rating: 5 },
  { id: 2, name: "Local Hand Towel", price: 1250, image: "https://m.media-amazon.com/images/I/91CZxdYCaTL.jpg", category: "Hand Towels", rating: 5 },
  { id: 3, name: "Zero Twist Cotton Towel", price: 1800, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn98kP80e2eeilYwjizmf3FI2qu_8vvjMqlw&s", category: "Organic", rating: 4.8 },
  { id: 4, name: "Dobby Border Cotton Towel", price: 3500, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTldLDBzw6kUt3PHLkB-eEv5CDg6Ycksso0rw&s", category: "Premium", rating: 5 },
  { id: 5, name: "Quick-Dry Sports Towel", price: 980, image: "https://image.made-in-china.com/202f0j00nNPhiqDBpmkK/Quick-Dry-Sports-Microfiber-Towel-Gym-Towel-with-Mesh-Bag-Custom-Logo.webp", category: "Sport", rating: 4.5 },
  { id: 6, name: "Bamboo Blend Towel", price: 1550, image: "https://plus.unsplash.com/premium_photo-1675799686553-9a3ac3819f2f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFtYm9vJTIwdG93ZWxzfGVufDB8fDB8fHww", category: "Eco-Friendly", rating: 4.7 },
  { id: 7, name: "Hotel Use White Towel", price: 2750, image: "https://trusunhotellinen.com/wp-content/uploads/2022/02/1-White-Plain-Hotel-Towels.jpg", category: "Luxury", rating: 5 },
  { id: 8, name: "Travel Size Microfiber Towel", price: 720, image: "https://media.istockphoto.com/id/1202895685/photo/microfiber-cleaning-towel.jpg?s=612x612&w=0&k=20&c=ewY007nMbxNfAVWTWvXjHDTayyTww21WnYceyDAQlWc=", category: "Travel", rating: 4.3 },
  { id: 9, name: "Pakistani Cotton Towel", price: 2200, image: "https://comfortcorepk.b-cdn.net/wp-content/uploads/2023/07/Terry-cotton-towel-green.jpg", category: "Traditional", rating: 4.9 },
  { id: 10, name: "Spa Grade Soft Towel", price: 3200, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSawttTIoRZS4t2inCUUos7uqJ9kM0w8pP4AA&s", category: "Spa", rating: 5 },
  { id: 11, name: "Cartoon Print Kids Towel", price: 850, image: "https://ae01.alicdn.com/kf/Sdc5839019c934ad5a32f6138ffd8048eN.jpg_640x640q90.jpg", category: "Kids", rating: 4.6 },
  { id: 12, name: "Beach Stripe Towel", price: 1700, image: "https://images.unsplash.com/photo-1575077989416-4b5d37823098?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Beach", rating: 4.8 },
  { id: 13, name: "Antibacterial Face Towel", price: 2000, image: "https://plus.unsplash.com/premium_photo-1679430887821-ddbcff722424?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG93ZWx8ZW58MHx8MHx8fDA%3D", category: "Health", rating: 4.7 },
  { id: 14, name: "Velvet Touch Luxury Towel", price: 4000, image: "https://decenttowel.com/wp-content/uploads/2024/05/velvet-blue.jpg", category: "Luxury", rating: 5 },
  { id: 15, name: "Cooling Sports Towel", price: 1150, image: "https://images-na.ssl-images-amazon.com/images/I/51DPrZhxgFL._SL500_._AC_SL500_.jpg", category: "Sport", rating: 4.4 },
  { id: 16, name: "Classic Pakistani Towel", price: 1400, image: "https://ae01.alicdn.com/kf/H41a5681dd05145b39cc9af4fdd61caa4n.jpg", category: "Vintage", rating: 4.5 },
  { id: 17, name: "Gym Absorbent Towel", price: 580, image: "https://images-na.ssl-images-amazon.com/images/I/91GFBOlUOrL._AC_UL210_SR210,210_.jpg", category: "Fitness", rating: 4.2 },
  { id: 18, name: "Baby Hooded Towel", price: 980, image: "https://images.unsplash.com/photo-1565775913442-79337915b869?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhYnklMjBob29kZWQlMjB0b3dlbHN8ZW58MHx8MHx8fDA%3D", category: "Baby", rating: 4.9 },
  { id: 19, name: "Designer Dobby Towel Set", price: 5200, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHbYk75Gu9YXixXjqu1-00_09ELJ4uGkO-WQ&s", category: "Designer", rating: 5 },
  { id: 20, name: "Quick Absorb Cotton Towel", price: 1300, image: "https://image.made-in-china.com/202f0j00NfDkmbqgrwpI/Wholesale-Fashion-Soft-100-Cotton-Quick-Dry-Bath-Towel-for-Strong-Water-Absorption-Cotton-Absorbent-Adult-Bath-Towels-Quick-Dry-Absorb-Water-Towel.webp", category: "Performance", rating: 4.6 }
];


const categories = [
  { name: "Bath Towels", description: "Luxurious bath towels for comfort", image: "https://images.pexels.com/photos/3610006/pexels-photo-3610006.jpeg" },
  { name: "Hand Towels", description: "Elegant hand towels for your bathroom", image: "https://m.media-amazon.com/images/I/91CZxdYCaTL.jpg" },
  { name: "Beach Towels", description: "Large, absorbent towels for beach days", image: "https://images.unsplash.com/photo-1575077989416-4b5d37823098?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Organic", description: "Eco-friendly organic cotton towels", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn98kP80e2eeilYwjizmf3FI2qu_8vvjMqlw&s" },
  { name: "Luxury", description: "Premium towels for the ultimate experience", image: "https://decenttowel.com/wp-content/uploads/2024/05/velvet-blue.jpg" },
  { name: "Sport", description: "Quick-dry towels for active lifestyles", image: "https://images-na.ssl-images-amazon.com/images/I/51DPrZhxgFL._SL500_._AC_SL500_.jpg" }
];

const testimonials = [
  { name: "Fatima Khan", text: "یہ تولیے بہت نرم اور جاذب ہیں۔ بہترین خریداری ہے! These towels are incredibly soft and absorbent.", rating: 5, avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" },
  { name: "Ahmed Hassan", text: "Outstanding quality and fast delivery to Karachi. It is truly reliable!", rating: 5, avatar: "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg" },
  { name: "Ayesha Malik", text: "Love the organic cotton collection. Perfect for sensitive skin.", rating: 5, avatar: "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg" },
  { name: "Muhammad Ali", text: "The luxury towels exceeded my expectations. Hotel-quality comfort at home in Lahore!", rating: 5, avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg" }
];

const features = [
  { title: "Premium Quality", description: "Made from the finest materials for lasting comfort", icon: "⭐" },
  { title: "Quick Dry", description: "Advanced fiber technology for faster drying", icon: "💨" },
  { title: "Eco-Friendly", description: "Sustainable production with organic materials", icon: "🌱" },
  { title: "Machine Washable", description: "Easy care instructions for long-lasting use", icon: "🧺" }
];

const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

const useEnhancedScrollReveal = (direction = 'up') => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getTransformClass = () => {
    if (!isVisible) {
      switch (direction) {
        case 'left':
          return 'opacity-0 -translate-x-20';
        case 'right':
          return 'opacity-0 translate-x-20';
        case 'down':
          return 'opacity-0 -translate-y-20';
        default:
          return 'opacity-0 translate-y-20';
      }
    }
    return 'opacity-100 translate-x-0 translate-y-0';
  };

  return [ref, getTransformClass()];
};

const Header = ({ cartCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="container bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 mx-auto max-w-7xl px-3 sm:px-4 lg:px-4 xl:px-8 py-2 sm:py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="relative">
            <img
              src="/logo.png" 
              alt="Supercentro Casanova Logo"
              className="w-20 h-20 sm:w-15 sm:h-15 object-contain"
              style={{ mixBlendMode: 'multiply', filter: 'brightness(1.2) contrast(1.1)' }}
            />
          </div>
          <div>
            <div className="text-md md:text-xl font-bold text-gray-800">Supercentro</div>
            <div className="text-sm md:text-base font-semibold bg-gradient-to-r from-red-600 via-blue-600 to-yellow-600 bg-clip-text text-transparent">CASANOVA</div>
          </div>
        </div>

        <nav className="hidden md:flex space-x-6 lg:space-x-8 xl:space-x-10">
          <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</a>
          <a href="#products" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Products</a>
          <a href="#categories" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Categories</a>
          <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Reviews</a>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/checkout" className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
            <ShoppingCart size={20} className="md:w-6 md:h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <a href="#home" className="block text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#products" className="block text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Products</a>
            <a href="#categories" className="block text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Categories</a>
            <a href="#testimonials" className="block text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
          </nav>
        </div>
      )}
    </header>
  );
};

const Hero = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="home" ref={ref} className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-purple-600/10"></div>

      <div className={`container mx-auto max-w-6xl px-4 lg:px-6 xl:px-8 text-center relative z-10 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}>
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
          <span className="bg-gradient-to-r from-red-600 via-blue-600 to-yellow-600 bg-clip-text text-transparent">
            Premium Towels
          </span>
          <br />
          <span className="text-gray-800 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-6xl">by Supercentro Casanova</span>
        </h1>
        <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto px-4 leading-relaxed">
          Experience unparalleled softness and quality with our premium collection of handcrafted towels by Shawkat Ali
        </p>
        <div className="flex flex-col xs:flex-row gap-3 md:gap-4 justify-center px-4 max-w-md mx-auto">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 sm:px-6 md:px-8 py-3 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex-1 xs:flex-initial">
            Shop Collection
          </button>
          <button className="border-2 border-gray-300 text-gray-700 px-5 sm:px-6 md:px-8 py-3 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300 flex-1 xs:flex-initial">
            Learn More
          </button>
        </div>
      </div>

      <div className="hidden md:block absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
      <div className="hidden md:block absolute bottom-20 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-bounce" style={{animationDelay: '1s'}}></div>
    </section>
  );
};

const Features = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section ref={ref} className="py-8 sm:py-12 md:py-20 xl:py-24 bg-white">
      <div className="container mx-auto max-w-6xl px-4 lg:px-6 xl:px-8">
        <div className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">Why Choose Our Towels?</h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Discover the features that make our towels the perfect choice for your home
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`text-center p-3 sm:p-4 md:p-6 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{transitionDelay: `${index * 100 + 400}ms`}}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 md:mb-4">{feature.icon}</div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">{feature.title}</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductSlider = ({ products, addToCart }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, isVisible] = useScrollReveal();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name'); 
  const [showFilters, setShowFilters] = useState(false);

  const getItemsToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 480) return 1;
      if (window.innerWidth < 768) return 1; 
      if (window.innerWidth < 1024) return 2;
      if (window.innerWidth < 1280) return 3; 
      if (window.innerWidth < 1536) return 4; 
      return 5; 
    }
    return 4;
  };

  const [itemsToShow, setItemsToShow] = useState(getItemsToShow());

  const filteredProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(getItemsToShow());
      setCurrentIndex(0); // Reset to start when screen size changes
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset currentIndex when search or sort changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [searchTerm, sortBy]);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsToShow >= filteredProducts.length ? 0 : prev + itemsToShow
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, filteredProducts.length - itemsToShow) : Math.max(0, prev - itemsToShow)
    );
  };

  return (
    <section id="products" ref={ref} className="py-12 md:py-20 xl:py-24 bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6 xl:px-8">
        <div className={`text-center mb-8 md:mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Featured Products</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4 mb-6">
            Explore our premium collection of luxury towels
          </p>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto space-y-3 px-4 lg:px-0">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search towels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-700"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 items-center justify-center">
              <div className="flex items-center space-x-1.5 order-2 sm:order-1">
                <SortAsc size={14} className="text-gray-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs bg-white"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price ↑</option>
                  <option value="price-high">Price ↓</option>
                  <option value="rating">Rating</option>
                </select>
              </div>

              <div className="text-xs text-gray-600 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full order-1 sm:order-2">
                {filteredProducts.length} items
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Navigation buttons - always show but adjust for mobile */}
          <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8 px-1">
            <button
              onClick={prevSlide}
              className="p-2 sm:p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 z-10 border border-gray-100"
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={16} className={`sm:w-5 sm:h-5 md:w-6 md:h-6 ${currentIndex === 0 ? 'text-gray-400' : 'text-gray-700'}`} />
            </button>

            <div className="flex space-x-1 sm:space-x-2 max-w-xs overflow-hidden">
              {(() => {
                const totalPages = Math.ceil(filteredProducts.length / itemsToShow);
                const currentPage = Math.floor(currentIndex / itemsToShow);
                const maxDots = itemsToShow === 1 ? 5 : totalPages; // Limit dots on mobile

                if (totalPages <= maxDots) {
                  // Show all dots if total is less than max
                  return Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i * itemsToShow)}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors flex-shrink-0 ${
                        currentPage === i ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ));
                } else {
                  // Show limited dots with ellipsis for mobile
                  const dots = [];
                  const showEllipsis = totalPages > maxDots;

                  // Always show first dot
                  dots.push(
                    <button
                      key={0}
                      onClick={() => setCurrentIndex(0)}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors flex-shrink-0 ${
                        currentPage === 0 ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  );

                  // Show middle dots around current page
                  if (currentPage > 2) {
                    dots.push(<span key="ellipsis1" className="text-gray-400 text-xs">...</span>);
                  }

                  const start = Math.max(1, currentPage - 1);
                  const end = Math.min(totalPages - 1, currentPage + 1);

                  for (let i = start; i <= end; i++) {
                    if (i !== 0 && i !== totalPages - 1) {
                      dots.push(
                        <button
                          key={i}
                          onClick={() => setCurrentIndex(i * itemsToShow)}
                          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors flex-shrink-0 ${
                            currentPage === i ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        />
                      );
                    }
                  }

                  // Show ellipsis before last
                  if (currentPage < totalPages - 3) {
                    dots.push(<span key="ellipsis2" className="text-gray-400 text-xs">...</span>);
                  }

                  // Always show last dot
                  if (totalPages > 1) {
                    dots.push(
                      <button
                        key={totalPages - 1}
                        onClick={() => setCurrentIndex((totalPages - 1) * itemsToShow)}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors flex-shrink-0 ${
                          currentPage === totalPages - 1 ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      />
                    );
                  }

                  return dots;
                }
              })()}
            </div>

            <button
              onClick={nextSlide}
              className="p-2 sm:p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 z-10 border border-gray-100"
              disabled={currentIndex + itemsToShow >= filteredProducts.length}
            >
              <ChevronRight size={16} className={`sm:w-5 sm:h-5 md:w-6 md:h-6 ${currentIndex + itemsToShow >= filteredProducts.length ? 'text-gray-400' : 'text-gray-700'}`} />
            </button>
          </div>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)` }}
            >
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`flex-shrink-0 px-1.5 sm:px-2 lg:px-2 xl:px-3 transition-all duration-1000 ease-out ${
                    itemsToShow === 1 ? 'w-full' :
                    itemsToShow === 2 ? 'w-1/2' :
                    itemsToShow === 3 ? 'w-1/3' :
                    itemsToShow === 4 ? 'w-1/4' : 'w-1/5'
                  } ${isVisible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' :
                    itemsToShow === 1 ?
                      (index % 2 === 0 ? 'opacity-0 -translate-x-16 translate-y-8 scale-95' : 'opacity-0 translate-x-16 translate-y-8 scale-95') :
                      'opacity-0 translate-y-20 scale-95'
                  }`}
                  style={{transitionDelay: `${index * 150}ms`}}
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
                    <Link to={`/product/${product.id}`} className="block">
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-40 xs:h-44 sm:h-48 md:h-52 lg:h-48 xl:h-52 2xl:h-56 3xl:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Eye size={16} className="text-gray-700" />
                        </div>
                      </div>
                    </Link>
                    <div className="p-3 sm:p-4 lg:p-4 xl:p-5 2xl:p-6">
                      <span className="text-xs sm:text-sm text-blue-600 font-medium">{product.category}</span>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-gray-800 mb-2 line-clamp-1 hover:text-blue-600 transition-colors leading-tight">{product.name}</h3>
                      </Link>
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={`sm:w-3 sm:h-3 lg:w-4 lg:h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="text-xs sm:text-sm text-gray-600 ml-2">({product.rating})</span>
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <span className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-800 block">PKR {product.price.toLocaleString()}</span>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Link
                            to={`/product/${product.id}`}
                            className="flex items-center justify-center px-2 sm:px-3 py-1.5 sm:py-2 border border-blue-600 text-blue-600 rounded-lg text-xs hover:bg-blue-600 hover:text-white transition-colors flex-1"
                          >
                            <Eye size={12} className="mr-1" />
                            View
                          </Link>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              addToCart(product);
                            }}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300 flex-1"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};

const Categories = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="categories" ref={ref} className="py-12 md:py-20 xl:py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6 xl:px-8">
        <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Shop by Category</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Find the perfect towels for every need and occasion
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`group cursor-pointer transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{transitionDelay: `${index * 100 + 200}ms`}}
            >
              <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 md:mb-2">{category.name}</h3>
                  <p className="text-gray-200 text-sm md:text-base mb-3 md:mb-4">{category.description}</p>
                  <div className="flex items-center text-xs md:text-sm font-medium">
                    Shop Now <ArrowRight size={14} className="md:w-4 md:h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Locations = () => {
  const [ref, isVisible] = useScrollReveal();

  const offices = [
    {
      name: "Panama Office",
      address: "EL Dorado, Calle 3RA Frente al Taller Alfredo Casa #20-I",
      city: "Panama",
      phone: "(507)-279-0990",
      fax: "(507)-279-0991",
      panamaCell: "00-507-61128783",
      type: "Main Office",
      flag: "🇵🇦"
    },
    {
      name: "China Office",
      address: "C Area, 5th Floor, Qin Ye Plaza Keqiaq, Shaoxing, Zhejiang.R.P. China",
      city: "Guangzhou, China",
      phone: "+86-575-85750608/85750609-15",
      fax: "+86-575-85750607",
      ChinaCell: "+86-15067511790",
      type: "Manufacturing Hub",
      flag: "🇨🇳"
    }
    // {
    //   name: "Pakistan Office",
    //   address: "Textile District, Faisalabad",
    //   city: "Faisalabad, Pakistan",
    //   phone: "+92-XXX-XXXXXXX",
    //   fax: "+92-XXX-XXXXXXX",
    //   type: "Regional Office",
    //   flag: "🇵🇰"
    // },
    // {
    //   name: "India Office",
    //   address: "Textile Hub, Mumbai",
    //   city: "Mumbai, India",
    //   phone: "+91-XXX-XXXXXXX",
    //   fax: "+91-XXX-XXXXXXX",
    //   type: "Regional Office",
    //   flag: "🇮🇳"
    // }
  ];

  return (
    <section ref={ref} className="py-12 md:py-20 xl:py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6 xl:px-8">
        <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Our Global Offices</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Supercentro Casanova serves customers worldwide with offices across multiple continents
          </p>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-2 justify-center gap-4 sm:gap-6 md:gap-8">
          {offices.map((office, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-1000 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{transitionDelay: `${index * 200 + 300}ms`}}
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{office.flag}</div>
                <h3 className="text-lg font-bold text-gray-800">{office.name}</h3>
                <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {office.type}
                </span>
              </div>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <MapPin size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{office.address}</div>
                    <div>{office.city}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-green-500 flex-shrink-0" />
                  <span>{office.phone}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Printer size={16} className="text-blue-500 flex-shrink-0" />
                  <span>{office.fax}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="w-full bg-gradient-to-r from-red-500 via-blue-500 to-yellow-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300">
                  Contact Office
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-12 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <p className="text-gray-600 text-sm md:text-base">
            <Mail className="inline mr-2" size={16} />
            Email: shawkat786@hotmail.com | super.centro@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="testimonials" ref={ref} className="py-12 md:py-20 xl:py-24 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto max-w-6xl px-4 lg:px-6 xl:px-8">
        <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Reviews from satisfied customers who love our towels
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{transitionDelay: `${index * 200 + 300}ms`}}
            >
              <div className="flex items-center mb-3 md:mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover mr-3 md:mr-4"
                />
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-gray-800">{testimonial.name}</h4>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={12} className="md:w-3.5 md:h-3.5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm md:text-base text-gray-600 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12 md:py-16 xl:py-20">
    <div className="container mx-auto max-w-7xl px-4 lg:px-6 xl:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center space-x-2 mb-4">
            <img
              src="logo.png"
              alt="Supercentro Casanova Logo"
              className="w-16 h-16 object-contain"
              style={{ mixBlendMode: 'screen', filter: 'brightness(1.3) contrast(1.2)' }}
            />
            <div>
              <div className="text-lg font-bold text-white">Supercentro</div>
              <div className="text-sm font-semibold bg-gradient-to-r from-red-400 via-blue-400 to-yellow-400 bg-clip-text text-transparent">CASANOVA</div>
            </div>
          </div>
          <p className="text-gray-400 text-sm md:text-base mb-2">
            Premium towels crafted with care by Shawkat Ali for the ultimate comfort experience.
          </p>
          <p className="text-gray-500 text-xs md:text-sm">
            📍 Pakistan | 📞 +92-330-7382007
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Quick Links</h4>
          <ul className="space-y-2 text-gray-400 text-sm md:text-base">
            <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="#products" className="hover:text-white transition-colors">Products</a></li>
            <li><a href="#categories" className="hover:text-white transition-colors">Categories</a></li>
            <li><a href="#testimonials" className="hover:text-white transition-colors">Reviews</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Customer Service</h4>
          <ul className="space-y-2 text-gray-400 text-sm md:text-base">
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
          </ul>
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Newsletter</h4>
          <p className="text-gray-400 text-sm md:text-base mb-4">Subscribe for exclusive offers and updates</p>
          <div className="w-full max-w-xs sm:max-w-full flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Your email"
              className="flex-grow px-3 py-2 rounded-t-lg sm:rounded-l-full sm:rounded-tr-none bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
            />
            <button className="whitespace-nowrap bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-b-lg sm:rounded-r-full sm:rounded-bl-none text-sm hover:shadow-lg transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-gray-400">
        <p className="text-xs md:text-sm">&copy; 2025 Supercentro Casanova by Shawkat Ali. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default function Index() {
  const { addToCart, getCartCount } = useCart();

  return (
    <div className="min-h-screen">
      <Header cartCount={getCartCount()} />
      <Hero />
      <Features />
      <ProductSlider products={products} addToCart={addToCart} />
      <Categories />
      <Locations />
      <Testimonials />
      <Footer />
    </div>
  );
}

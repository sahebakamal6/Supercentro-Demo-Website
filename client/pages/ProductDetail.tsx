import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart, Plus, Minus, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react";
import { useCart } from "../contexts/CartContext";

const products = [
  {
    id: 1,
    name: "Power Loom Cotton Towel",
    price: 2500,
    image: "https://images.pexels.com/photos/3610006/pexels-photo-3610006.jpeg",
    category: "Power Towels",
    rating: 5,
    description: "Locally produced power‑loom cotton towel with high absorbency and durability.",
    features: ["100% Egyptian Cotton", "Quick‑Dry Technology", "Machine Washable", "Fade Resistant"],
    dimensions: "30\" x 56\"",
    weight: "600 GSM"
  },
  {
    id: 2,
    name: "Local Hand Towel",
    price: 1250,
    image: "https://m.media-amazon.com/images/I/91CZxdYCaTL.jpg",
    category: "Hand Towels",
    rating: 5,
    description: "Soft hand towel made from local cotton, ideal for daily hand use.",
    features: ["Organic Bamboo Fiber", "Antibacterial", "Eco‑Friendly", "Ultra Soft"],
    dimensions: "16\" x 30\"",
    weight: "400 GSM"
  },
  {
    id: 3,
    name: "Zero Twist Cotton Towel",
    price: 1800,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn98kP80e2eeilYwjizmf3FI2qu_8vvjMqlw&s",
    category: "Organic",
    rating: 4.8,
    description: "Zero‑twist yarn cotton towel: ultra‑soft and fast‑dry, suitable for sensitive skin.",
    features: ["100% Organic Cotton", "Chemical‑Free", "Hypoallergenic", "GOTS Certified"],
    dimensions: "27\" x 52\"",
    weight: "500 GSM"
  },
  {
    id: 4,
    name: "Dobby Border Cotton Towel",
    price: 3500,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTldLDBzw6kUt3PHLkB-eEv5CDg6Ycksso0rw&s",
    category: "Premium",
    rating: 5,
    description: "Premium dobby‑border cotton towel with elegant texture and finish.",
    features: ["Extra‑Long Fiber Cotton", "Superior Durability", "Luxury Grade", "Hotel Quality"],
    dimensions: "32\" x 58\"",
    weight: "750 GSM"
  },
  {
    id: 5,
    name: "Quick‑Dry Sports Towel",
    price: 980,
    image: "https://image.made-in-china.com/202f0j00nNPhiqDBpmkK/Quick-Dry-Sports-Microfiber-Towel-Gym-Towel-with-Mesh-Bag-Custom-Logo.webp",
    category: "Sport",
    rating: 4.5,
    description: "Lightweight microfiber towel for athletes; dries fast and packs small.",
    features: ["Microfiber Material", "3x Faster Drying", "Lightweight", "Compact Design"],
    dimensions: "24\" x 48\"",
    weight: "300 GSM"
  },
  {
    id: 6,
    name: "Bamboo Blend Towel",
    price: 1550,
    image: "https://plus.unsplash.com/premium_photo-1675799686553-9a3ac3819f2f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFtYm9vJTIwdG93ZWxzfGVufDB8fDB8fHww",
    category: "Eco‑Friendly",
    rating: 4.7,
    description: "Eco‑friendly towel made with bamboo cotton blend for antibacterial softness.",
    features: ["Bamboo Fiber", "Antibacterial", "Silky Texture", "Sustainable"],
    dimensions: "28\" x 54\"",
    weight: "450 GSM"
  },
  {
    id: 7,
    name: "Hotel Use White Towel",
    price: 2750,
    image: "https://trusunhotellinen.com/wp-content/uploads/2022/02/1-White-Plain-Hotel-Towels.jpg",
    category: "Luxury",
    rating: 5,
    description: "Classic white hotel-grade towel: thick, plush, and long-lasting.",
    features: ["Hotel Grade", "Professional Quality", "Luxury Feel", "Commercial Durability"],
    dimensions: "30\" x 56\"",
    weight: "650 GSM"
  },
  {
    id: 8,
    name: "Travel Microfiber Towel",
    price: 720,
    image: "https://media.istockphoto.com/id/1202895685/photo/microfiber-cleaning-towel.jpg?s=612x612&w=0&k=20&c=ewY007nMbxNfAVWTWvXjHDTayyTww21WnYceyDAQlWc=",
    category: "Travel",
    rating: 4.3,
    description: "Compact travel towel: dries rapidly and fits in small bags.",
    features: ["Ultra Compact", "Travel Size", "Quick Pack", "Lightweight"],
    dimensions: "20\" x 40\"",
    weight: "200 GSM"
  },
  {
    id: 9,
    name: "Pakistani Cotton Towel",
    price: 2200,
    image: "https://comfortcorepk.b-cdn.net/wp-content/uploads/2023/07/Terry-cotton-towel-green.jpg",
    category: "Traditional",
    rating: 4.9,
    description: "Authentic Pakistani terry cotton towel with long-lasting softness.",
    features: ["Traditional Weaving", "Authentic Turkish Cotton", "Gets Softer Over Time", "Artisan Made"],
    dimensions: "29\" x 55\"",
    weight: "550 GSM"
  },
  {
    id: 10,
    name: "Spa Grade Soft Towel",
    price: 3200,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSawttTIoRZS4t2inCUUos7uqJ9kM0w8pP4AA&s",
    category: "Spa",
    rating: 5,
    description: "Ultra-plush spa towel for luxury and comfort—thick pile and absorbent.",
    features: ["Spa Quality", "Plush Pile", "Professional Grade", "Luxury Experience"],
    dimensions: "31\" x 57\"",
    weight: "700 GSM"
  },
  {
    id: 11,
    name: "Cartoon Kids Towel",
    price: 850,
    image: "https://ae01.alicdn.com/kf/Sdc5839019c934ad5a32f6138ffd8048eN.jpg_640x640q90.jpg",
    category: "Kids",
    rating: 4.6,
    description: "Fun and colorful towel designed for children with playful prints.",
    features: ["Kid-Safe Materials", "Vibrant Colors", "Fun Design", "Easy Care"],
    dimensions: "24\" x 44\"",
    weight: "350 GSM"
  },
  {
    id: 12,
    name: "Beach Stripe Towel",
    price: 1700,
    image: "https://images.unsplash.com/photo-1575077989416-4b5d37823098?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Beach",
    rating: 4.8,
    description: "Large striped cotton towel, ideal for beach and poolside lounging.",
    features: ["Sand Resistant", "UV Protection", "Extra Large", "Quick Dry"],
    dimensions: "36\" x 70\"",
    weight: "400 GSM"
  },
  {
    id: 13,
    name: "Antibacterial Face Towel",
    price: 2000,
    image: "https://plus.unsplash.com/premium_photo-1679430887821-ddbcff722424?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG93ZWx8ZW58MHx8MHx8fDA%3D",
    category: "Health",
    rating: 4.7,
    description: "Silver‑ion treated face towel to reduce bacteria and odors.",
    features: ["Silver Ion Technology", "Antibacterial", "Odor Resistant", "Health Protection"],
    dimensions: "28\" x 52\"",
    weight: "500 GSM"
  },
  {
    id: 14,
    name: "Velvet Touch Luxury Towel",
    price: 4000,
    image: "https://decenttowel.com/wp-content/uploads/2024/05/velvet-blue.jpg",
    category: "Luxury",
    rating: 5,
    description: "Ultra-soft luxury towel with velvet-like texture and rich finish.",
    features: ["Extra Thick Pile", "Premium Materials", "Ultimate Luxury", "Indulgent Feel"],
    dimensions: "33\" x 60\"",
    weight: "800 GSM"
  },
  {
    id: 15,
    name: "Cooling Sports Towel",
    price: 1150,
    image: "https://images-na.ssl-images-amazon.com/images/I/51DPrZhxgFL._SL500_._AC_SL500_.jpg",
    category: "Sport",
    rating: 4.4,
    description: "Cooling towel designed to stay chilled during workouts and hot days.",
    features: ["Cooling Technology", "Stays Cool for Hours", "Workout Ready", "Heat Relief"],
    dimensions: "12\" x 40\"",
    weight: "250 GSM"
  },
  {
    id: 16,
    name: "Classic Pakistani Towel",
    price: 1400,
    image: "https://ae01.alicdn.com/kf/H41a5681dd05145b39cc9af4fdd61caa4n.jpg",
    category: "Vintage",
    rating: 4.5,
    description: "Classic-style towel inspired by traditional Pakistani weaving designs.",
    features: ["Vintage Design", "Retro Patterns", "Timeless Style", "Character Building"],
    dimensions: "26\" x 50\"",
    weight: "450 GSM"
  },
  {
    id: 17,
    name: "Gym Absorbent Towel",
    price: 580,
    image: "https://images-na.ssl-images-amazon.com/images/I/91GFBOlUOrL._AC_UL210_SR210,210_.jpg",
    category: "Fitness",
    rating: 4.2,
    description: "Compact gym towel with high absorbency and quick-dry fabric.",
    features: ["Workout Optimized", "Highly Absorbent", "Compact Size", "Gym Ready"],
    dimensions: "16\" x 32\"",
    weight: "300 GSM"
  },
  {
    id: 18,
    name: "Baby Hooded Towel",
    price: 980,
    image: "https://images.unsplash.com/photo-1565775913442-79337915b869?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhYnklMjBob29kZWQlMjB0b3dlbHN8ZW58MHx8MHx8fDA%3D",
    category: "Baby",
    rating: 4.9,
    description: "Soft hooded towel for babies made with hypoallergenic cotton.",
    features: ["Baby Safe", "Hypoallergenic", "Ultra Gentle", "Sensitive Skin"],
    dimensions: "20\" x 30\"",
    weight: "300 GSM"
  },
  {
    id: 19,
    name: "Designer Dobby Towel Set",
    price: 5200,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHbYk75Gu9YXixXjqu1-00_09ELJ4uGkO-WQ&s",
    category: "Designer",
    rating: 5,
    description: "Stylish dobby‑woven towel set, perfect for modern bathrooms.",
    features: ["Designer Exclusive", "Contemporary Patterns", "Statement Piece", "Modern Design"],
    dimensions: "30\" x 56\" (Set of 3)",
    weight: "600 GSM"
  },
  {
    id: 20,
    name: "Quick Absorb Cotton Towel",
    price: 1300,
    image: "https://image.made-in-china.com/202f0j00NfDkmbqgrwpI/Wholesale-Fashion-Soft-100-Cotton-Quick-Dry-Bath-Towel-for-Strong-Water-Absorption-Cotton-Absorbent-Adult-Bath-Towels-Quick-Dry-Absorb-Water-Towel.webp",
    category: "Performance",
    rating: 4.6,
    description: "Performance cotton towel engineered for rapid absorption and drying.",
    features: ["Advanced Absorption", "High Performance", "Efficient Drying", "Technology Enhanced"],
    dimensions: "28\" x 54\"",
    weight: "500 GSM"
  }
];


export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, getCartCount } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock additional images for the product
  const additionalImages = [
    product?.image,
  ];

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    // Show success message or animation here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/logo.png" // Replace with your logo path
              alt="Supercentro Casanova Logo"
              className="w-16 h-16 object-contain"
              style={{ mixBlendMode: 'multiply', filter: 'brightness(1.2) contrast(1.1)' }}
            />
            <div>
              <div className="text-lg font-bold text-gray-800">Supercentro</div>
              <div className="text-sm font-semibold bg-gradient-to-r from-red-600 via-blue-600 to-yellow-600 bg-clip-text text-transparent">CASANOVA</div>
            </div>
          </Link>
          <Link to="/checkout" className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
            <ShoppingCart size={24} />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-gray-800">{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
              <img
                src={additionalImages[selectedImage]}
                alt={product.name}
                className="w-full h-96 md:h-[500px] object-cover"
              />
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`absolute top-4 right-4 p-2 rounded-full ${
                  isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
                } shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
              </button>
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {additionalImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                  } hover:border-blue-600 transition-colors`}
                >
                  <img src={img} alt={`View ${index + 1}`} className="w-full h-20 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.rating}) • 127 reviews</span>
              </div>

              {/* Price */}
              <div className="text-4xl font-bold text-gray-800 mb-6">PKR {product.price.toLocaleString()}</div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
              <ul className="grid grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-100 rounded-xl">
              <div>
                <span className="text-sm font-medium text-gray-800">Dimensions:</span>
                <p className="text-sm text-gray-600">{product.dimensions}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-800">Weight:</span>
                <p className="text-sm text-gray-600">{product.weight}</p>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-800">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 text-center min-w-[60px]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  Add to Cart • PKR {(product.price * quantity).toLocaleString()}
                </button>
                <Link
                  to="/checkout"
                  className="flex-1 bg-gray-800 text-white py-4 px-6 rounded-xl font-semibold text-center hover:bg-gray-900 transition-colors"
                >
                  Buy Now
                </Link>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Truck className="mx-auto mb-2 text-blue-600" size={24} />
                <div className="text-xs font-medium text-gray-800">Free Shipping</div>
                <div className="text-xs text-gray-600">Orders over $100</div>
              </div>
              <div className="text-center">
                <Shield className="mx-auto mb-2 text-blue-600" size={24} />
                <div className="text-xs font-medium text-gray-800">2 Year Warranty</div>
                <div className="text-xs text-gray-600">Quality guaranteed</div>
              </div>
              <div className="text-center">
                <RotateCcw className="mx-auto mb-2 text-blue-600" size={24} />
                <div className="text-xs font-medium text-gray-800">Easy Returns</div>
                <div className="text-xs text-gray-600">30-day policy</div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}

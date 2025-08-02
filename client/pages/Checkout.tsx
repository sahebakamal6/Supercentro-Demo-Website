import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Minus, Trash2, CreditCard, Lock } from "lucide-react";
import { useCart } from "../contexts/CartContext";

export default function Checkout() {
  const { cartItems, updateQuantity, removeItem } = useCart();
  const [step, setStep] = useState(1); // 1: Cart, 2: Shipping, 3: Payment
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });



  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = cartItems.length === 0 ? 0 : (subtotal > 3000 ? 0 : 450); // Free shipping over PKR 3000
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const CartStep = () => (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800">Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-8 md:py-12">
          <p className="text-gray-600 text-lg md:text-xl mb-4">Your cart is empty</p>
          <Link to="/" className="bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base hover:bg-blue-700 transition-colors">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center space-x-4 sm:flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg" />
                  <div className="flex-1 sm:flex-initial">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{item.name}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">PKR {item.price.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:flex-1 sm:justify-end sm:space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Minus size={14} className="sm:w-4 sm:h-4" />
                    </button>
                    <span className="w-8 text-center text-sm sm:text-base">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Plus size={14} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="font-semibold text-sm sm:text-base">PKR {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={14} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center pt-4 md:pt-6 space-y-3 sm:space-y-0">
            <Link to="/" className="text-blue-600 hover:text-blue-700 flex items-center text-sm md:text-base">
              <ArrowLeft size={14} className="md:w-4 md:h-4 mr-2" />
              Continue Shopping
            </Link>
            <button
              onClick={() => setStep(2)}
              className="bg-blue-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              Proceed to Shipping
            </button>
          </div>
        </>
      )}
    </div>
  );

  const ShippingStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Shipping Information</h2>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your@email.com"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="First"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Last"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="abc Street, House #123, Sector 4"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your City"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="10001"
            />
          </div>
        </div>
      </form>
      
      <div className="flex justify-between pt-6">
        <button 
          onClick={() => setStep(1)}
          className="text-gray-600 hover:text-gray-700 flex items-center"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Cart
        </button>
        <button 
          onClick={() => setStep(3)}
          className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );

  const PaymentStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Payment Information</h2>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <Lock size={16} className="text-green-600 mr-2" />
          <span className="text-green-800 text-sm">Your payment information is secure and encrypted</span>
        </div>
      </div>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
          <div className="relative">
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1234 5678 9012 3456"
            />
            <CreditCard size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="MM/YY"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
          <input
            type="text"
            name="nameOnCard"
            value={formData.nameOnCard}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Name on Card"
          />
        </div>
      </form>
      
      <div className="flex justify-between pt-6">
        <button 
          onClick={() => setStep(2)}
          className="text-gray-600 hover:text-gray-700 flex items-center"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Shipping
        </button>
        <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300">
          Complete Order
        </button>
      </div>
    </div>
  );

  const OrderSummary = () => (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
      
      <div className="space-y-3">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>{item.name} × {item.quantity}</span>
            <span>PKR {(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>PKR {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `PKR ${shipping.toLocaleString()}`}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>PKR {Math.round(tax).toLocaleString()}</span>
        </div>
        <div className="border-t border-gray-200 pt-2">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>PKR {Math.round(total).toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      {shipping === 0 && subtotal > 0 && (
        <div className="mt-4 text-sm text-green-600 bg-green-50 p-3 rounded">
          🎉 You qualify for free shipping! (Orders over PKR 3,000)
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 mx-auto px-4 py-4">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/logo.png" // Replace with your logo path
              alt="Supercentro Casanova Logo"
              className="w-16 h-16 object-contain"
              style={{ mixBlendMode: 'multiply', filter: 'brightness(1.2) contrast(1.1)' }}
            />
            <div>
              <div className="text-base font-bold text-gray-800">Supercentro</div>
              <div className="text-xs font-semibold bg-gradient-to-r from-red-600 via-blue-600 to-yellow-600 bg-clip-text text-transparent">CASANOVA</div>
            </div>
          </Link>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-4 md:space-x-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-medium ${
                  step >= stepNumber
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                <span className={`ml-1 md:ml-2 text-xs md:text-sm ${
                  step >= stepNumber ? 'text-blue-600' : 'text-gray-600'
                } hidden sm:inline`}>
                  {stepNumber === 1 ? 'Cart' : stepNumber === 2 ? 'Shipping' : 'Payment'}
                </span>
                {stepNumber < 3 && <div className="w-8 md:w-16 h-px bg-gray-300 ml-2 md:ml-4"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 order-2 lg:order-1">
            {step === 1 && <CartStep />}
            {step === 2 && <ShippingStep />}
            {step === 3 && <PaymentStep />}
          </div>

          <div className="order-1 lg:order-2">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

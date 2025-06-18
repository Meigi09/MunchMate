import { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  Settings,
  MapPin,
  Star,
  ArrowRight,
  ChefHat,
  Clock,
  Heart,
  Crown,
  X,
  Plus,
  Minus,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CustomerDashboard = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [scrollY, setScrollY] = useState(0);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cart, setCart] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filterTabs = [
    { id: "All", label: "All", icon: "🍕" },
    { id: "FastFood", label: "Fast Food", icon: "🍔" },
    { id: "Asian", label: "Asian", icon: "🍜" },
    { id: "Healthy", label: "Healthy", icon: "🥗" },
    { id: "Desserts", label: "Desserts", icon: "🍰" },
    { id: "Coffee", label: "Coffee", icon: "☕" },
    { id: "Local", label: "Local", icon: "🥘" },
  ];

  const restaurants = [
    {
      id: 1,
      name: "Pizza Palace",
      emoji: "🍕",
      rating: 4.8,
      time: "25-35 min",
      delivery: "$3 delivery",
      badge: "Free delivery",
      badgeStyle: "bg-gradient-to-r from-lime-400 to-green-500",
      tags: ["Italian", "Pizza", "Fast delivery"],
      gradient: "from-orange-400 to-red-500",
      category: "FastFood",
      menu: [
        {
          id: 1,
          name: "Margherita Pizza",
          description: "Classic tomato, mozzarella, and fresh basil",
          price: 12000,
          image: "🍕",
          category: "Pizza",
          popular: true,
        },
        {
          id: 2,
          name: "Pepperoni Supreme",
          description: "Loaded with pepperoni, cheese, and Italian herbs",
          price: 15000,
          image: "🍕",
          category: "Pizza",
        },
        {
          id: 3,
          name: "Quattro Stagioni",
          description: "Four seasons pizza with ham, mushrooms, artichokes",
          price: 18000,
          image: "🍕",
          category: "Pizza",
        },
        {
          id: 4,
          name: "Garlic Bread",
          description: "Crispy bread with garlic butter and herbs",
          price: 5000,
          image: "🥖",
          category: "Sides",
        },
      ],
    },
    {
      id: 2,
      name: "Burger Barn",
      emoji: "🍔",
      rating: 4.6,
      time: "20-30 min",
      delivery: "$2 delivery",
      badge: "Popular",
      badgeStyle: "bg-gradient-to-r from-yellow-400 to-orange-500",
      tags: ["American", "Burgers", "Fries"],
      gradient: "from-yellow-400 to-orange-500",
      category: "FastFood",
      menu: [
        {
          id: 5,
          name: "Classic Beef Burger",
          description: "Juicy beef patty with lettuce, tomato, onion",
          price: 8000,
          image: "🍔",
          category: "Burgers",
          popular: true,
        },
        {
          id: 6,
          name: "Chicken Deluxe",
          description: "Grilled chicken breast with avocado and bacon",
          price: 10000,
          image: "🍔",
          category: "Burgers",
        },
        {
          id: 7,
          name: "Loaded Fries",
          description: "Crispy fries with cheese, bacon, and ranch",
          price: 6000,
          image: "🍟",
          category: "Sides",
        },
      ],
    },
    {
      id: 3,
      name: "Noodle House",
      emoji: "🍜",
      rating: 4.9,
      time: "30-40 min",
      delivery: "$4 delivery",
      badge: "Chef's Choice",
      badgeStyle: "bg-gradient-to-r from-purple-500 to-pink-500",
      tags: ["Asian", "Noodles", "Soup"],
      gradient: "from-green-400 to-blue-500",
      category: "Asian",
      menu: [
        {
          id: 8,
          name: "Ramen Bowl",
          description: "Rich pork broth with noodles, egg, and vegetables",
          price: 12000,
          image: "🍜",
          category: "Noodles",
          popular: true,
        },
        {
          id: 9,
          name: "Pad Thai",
          description: "Stir-fried rice noodles with shrimp and peanuts",
          price: 11000,
          image: "🍝",
          category: "Noodles",
        },
        {
          id: 10,
          name: "Spring Rolls",
          description: "Fresh vegetables wrapped in rice paper",
          price: 4000,
          image: "🥟",
          category: "Appetizers",
        },
      ],
    },
    {
      id: 4,
      name: "Green Garden",
      emoji: "🥗",
      rating: 4.7,
      time: "15-25 min",
      delivery: "$3 delivery",
      badge: "Healthy",
      badgeStyle: "bg-gradient-to-r from-green-400 to-emerald-500",
      tags: ["Healthy", "Salads", "Vegan"],
      gradient: "from-lime-400 to-green-500",
      category: "Healthy",
      menu: [
        {
          id: 11,
          name: "Mediterranean Bowl",
          description: "Quinoa, olives, feta, cucumber, and herbs",
          price: 9000,
          image: "🥗",
          category: "Bowls",
          popular: true,
        },
        {
          id: 12,
          name: "Avocado Toast",
          description: "Multigrain bread with smashed avocado and seeds",
          price: 7000,
          image: "🥑",
          category: "Toast",
        },
        {
          id: 13,
          name: "Green Smoothie",
          description: "Spinach, apple, banana, and coconut water",
          price: 5000,
          image: "🥤",
          category: "Drinks",
        },
      ],
    },
    {
      id: 5,
      name: "Sweet Treats",
      emoji: "🍰",
      rating: 4.5,
      time: "35-45 min",
      delivery: "$5 delivery",
      badge: "Artisan",
      badgeStyle: "bg-gradient-to-r from-pink-400 to-rose-500",
      tags: ["Desserts", "Cakes", "Coffee"],
      gradient: "from-pink-400 to-purple-500",
      category: "Desserts",
      menu: [
        {
          id: 14,
          name: "Chocolate Cake",
          description: "Rich chocolate cake with ganache frosting",
          price: 8000,
          image: "🍰",
          category: "Cakes",
          popular: true,
        },
        {
          id: 15,
          name: "Tiramisu",
          description: "Classic Italian dessert with coffee and mascarpone",
          price: 7000,
          image: "🍮",
          category: "Desserts",
        },
        {
          id: 16,
          name: "Cappuccino",
          description: "Espresso with steamed milk and foam art",
          price: 3000,
          image: "☕",
          category: "Coffee",
        },
      ],
    },
    {
      id: 6,
      name: "Kigali Kitchen",
      emoji: "🥘",
      rating: 4.8,
      time: "20-30 min",
      delivery: "$2 delivery",
      badge: "Authentic",
      badgeStyle: "bg-gradient-to-r from-amber-500 to-orange-600",
      tags: ["Rwandan", "Local", "Traditional"],
      gradient: "from-amber-400 to-red-500",
      category: "Local",
      menu: [
        {
          id: 17,
          name: "Ubugali with Isombe",
          description: "Traditional cornmeal with cassava leaves stew",
          price: 6000,
          image: "🥘",
          category: "Traditional",
          popular: true,
        },
        {
          id: 18,
          name: "Rwandan Beef Stew",
          description: "Tender beef in rich tomato and onion sauce",
          price: 8000,
          image: "🍖",
          category: "Main Course",
        },
        {
          id: 19,
          name: "Igikoma",
          description: "Traditional Rwandan milk tea",
          price: 2000,
          image: "🫖",
          category: "Drinks",
        },
      ],
    },
  ];

  const trackingSteps = [
    { id: 1, label: "Order Confirmed", active: true },
    { id: 2, label: "Preparing", active: true },
    { id: 3, label: "On the way", active: false },
    { id: 4, label: "Delivered", active: false },
  ];

  const handleFabClick = () => {
    const fab = document.querySelector(".fab-button");
    if (fab) {
      fab.style.transform = "scale(1.2) rotate(180deg)";
      setTimeout(() => {
        fab.style.transform = "scale(1) rotate(0deg)";
      }, 200);
    }
  };

  const openMenu = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const closeMenu = () => {
    setSelectedRestaurant(null);
  };

  const addToCart = (restaurantId, item) => {
    const key = `${restaurantId}-${item.id}`;
    setCart((prev) => ({
      ...prev,
      [key]: {
        ...item,
        restaurantId,
        quantity: (prev[key]?.quantity || 0) + 1,
      },
    }));
  };

  const updateQuantity = (restaurantId, item, change) => {
    const key = `${restaurantId}-${item.id}`;
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[key]) {
        newCart[key].quantity += change;
        if (newCart[key].quantity <= 0) {
          delete newCart[key];
        }
      }
      return newCart;
    });
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  };

  const formatPrice = (price) => {
    return `${price.toLocaleString()} RWF`;
  };

  const filteredRestaurants =
    activeFilter === "All"
      ? restaurants
      : restaurants.filter(
          (restaurant) => restaurant.category === activeFilter
        );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              MunchMate
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search restaurants..."
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-full border-0 focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all duration-300"
              />
            </div>
            <button className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-xs flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </button>
            <div className="flex items-center space-x-2">              
                <Button className="bg-gradient-to-r from-lime-400 to-green-500 flex items-center justify-center" variant="ghost">Sign Up</Button>             
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-20 left-20 w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
        <div
          className="absolute top-40 right-32 w-3 h-3 bg-white/30 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/3 w-3.5 h-3.5 bg-white/25 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            <span className="bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
              Delicious food,
            </span>
            <br />
            <span className="text-white">delivered fast</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover amazing restaurants and get your favorite meals delivered
            in minutes
          </p>
          <button className="inline-flex items-center px-8 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full hover:bg-white/30 hover:scale-105 transition-all duration-300">
            <MapPin className="w-5 h-5 mr-2" />
            Kigali, Rwanda • Change location
          </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        {/* Order Tracking */}
        <div className="my-12 bg-white rounded-2xl shadow-xl border-l-4 border-l-green-500 relative overflow-hidden p-8 hover:shadow-2xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-transparent rounded-full transform translate-x-12 -translate-y-12"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🍕</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Your Order from Pizza Palace
                  </h3>
                  <p className="text-gray-600 text-sm">Order #MP-12345</p>
                </div>
              </div>
              <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-full animate-pulse">
                Preparing
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 md:gap-8">
              {trackingSteps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      step.active
                        ? "bg-gradient-to-r from-green-400 to-green-600 animate-bounce shadow-lg"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <span
                    className={`text-sm font-medium ${
                      step.active ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </span>
                  {index < trackingSteps.length - 1 && (
                    <div className="hidden md:block w-8 h-px bg-gray-300 ml-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Explore by{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Cuisine
            </span>
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                className={`whitespace-nowrap rounded-2xl px-6 py-3 transition-all duration-300 font-medium ${
                  activeFilter === tab.id
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105"
                    : "bg-white border-2 border-gray-200 text-gray-700 hover:border-orange-300 hover:shadow-md hover:scale-105"
                }`}
                onClick={() => setActiveFilter(tab.id)}
              >
                <span className="mr-2 text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Popular Restaurants */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Popular{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                near you
              </span>
            </h2>
            <button className="inline-flex items-center text-orange-600 hover:text-red-600 font-semibold hover:translate-x-1 transition-all duration-300">
              View all
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="group cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
              >
                {/* Restaurant Image */}
                <div
                  className={`h-48 bg-gradient-to-br ${restaurant.gradient} relative flex items-center justify-center text-6xl overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="relative z-10 drop-shadow-lg">
                    {restaurant.emoji}
                  </span>
                  {restaurant.badge && (
                    <span
                      className={`absolute top-4 left-4 px-3 py-1 ${restaurant.badgeStyle} text-white text-sm font-semibold rounded-full shadow-lg`}
                    >
                      {restaurant.badge}
                    </span>
                  )}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Restaurant Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1 text-yellow-500 font-semibold">
                      <Star className="w-4 h-4 fill-current" />
                      {restaurant.rating}
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {restaurant.time}
                    </div>
                    <span>•</span>
                    <span className="text-green-600 font-medium">
                      {restaurant.delivery}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {restaurant.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => openMenu(restaurant)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Menu
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Menu Dialog */}
      {selectedRestaurant && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Dialog Header */}
            <div
              className={`bg-gradient-to-br ${selectedRestaurant.gradient} p-6 text-white relative`}
            >
              <button
                onClick={closeMenu}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-4">
                <div className="text-6xl">{selectedRestaurant.emoji}</div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    {selectedRestaurant.name}
                  </h2>
                  <div className="flex items-center gap-4 text-white/90">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-current text-yellow-300" />
                      <span className="font-semibold">
                        {selectedRestaurant.rating}
                      </span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-5 h-5" />
                      <span>{selectedRestaurant.time}</span>
                    </div>
                    <span>•</span>
                    <span className="font-medium">
                      {selectedRestaurant.delivery}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Menu Items
              </h3>
              <div className="grid gap-4">
                {selectedRestaurant.menu.map((item) => {
                  const cartKey = `${selectedRestaurant.id}-${item.id}`;
                  const cartItem = cart[cartKey];

                  return (
                    <div
                      key={item.id}
                      className="bg-gray-50 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{item.image}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-gray-800">
                              {item.name}
                            </h4>
                            {item.popular && (
                              <span className="px-2 py-1 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-semibold rounded-full">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-2">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-lg text-orange-600">
                              {formatPrice(item.price)}
                            </span>
                            <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                              {item.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {cartItem ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(selectedRestaurant.id, item, -1)
                              }
                              className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(selectedRestaurant.id, item, 1)
                              }
                              className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-lg text-white rounded-full flex items-center justify-center transition-all"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              addToCart(selectedRestaurant.id, item)
                            }
                            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cart Summary in Menu */}
              {Object.keys(cart).some(
                (key) => cart[key].restaurantId === selectedRestaurant.id
              ) && (
                <div className="mt-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
                  <h4 className="font-bold text-lg mb-4">Your Order</h4>
                  <div className="space-y-2 mb-4">
                    {Object.values(cart)
                      .filter(
                        (item) => item.restaurantId === selectedRestaurant.id
                      )
                      .map((item) => (
                        <div
                          key={`${item.restaurantId}-${item.id}`}
                          className="flex justify-between items-center"
                        >
                          <span>
                            {item.quantity}x {item.name}
                          </span>
                          <span className="font-semibold">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                  </div>
                  <div className="border-t border-white/20 pt-4 flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span>
                      {formatPrice(
                        Object.values(cart)
                          .filter(
                            (item) =>
                              item.restaurantId === selectedRestaurant.id
                          )
                          .reduce(
                            (sum, item) => sum + item.price * item.quantity,
                            0
                          )
                      )}
                    </span>
                  </div>
                  <button className="w-full mt-4 bg-white text-orange-600 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FAB (Floating Action Button) */}
      <button
        className="fab-button fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center z-40"
        onClick={handleFabClick}
      >
        <Settings className="w-8 h-8" />
      </button>

      {/* Cart Sidebar */}
      {getCartItemCount() > 0 && (
        <div className="fixed bottom-24 right-8 bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-80 z-30 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-gray-800">Your Cart</h3>
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {getCartItemCount()} items
            </span>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
            {Object.values(cart).map((item) => {
              const restaurant = restaurants.find(
                (r) => r.id === item.restaurantId
              );
              return (
                <div
                  key={`${item.restaurantId}-${item.id}`}
                  className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.image}</span>
                    <div>
                      <p className="font-semibold text-sm text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {restaurant?.name}
                      </p>
                      <p className="text-sm font-bold text-orange-600">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.restaurantId, item, -1)
                      }
                      className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center font-semibold text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.restaurantId, item, 1)}
                      className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center transition-all"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-lg text-gray-800">Total:</span>
              <span className="font-bold text-xl text-orange-600">
                {formatPrice(
                  Object.values(cart).reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                  )
                )}
              </span>
            </div>
            <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Checkout Now
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  MunchMate
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Your favorite food delivery service in Kigali. Fast, reliable,
                and delicious.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 transition-all duration-300 cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 transition-all duration-300 cursor-pointer">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 transition-all duration-300 cursor-pointer">
                  <span className="text-sm font-bold">i</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Browse Restaurants
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Track Order
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    My Account
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Help Center
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-white">
                For Partners
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Become a Partner
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Delivery Driver
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Business Solutions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Partner Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Contact</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <span>KG 123 St, Kigali, Rwanda</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 flex items-center justify-center text-orange-500">
                    📞
                  </span>
                  <span>+250 788 123 456</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 flex items-center justify-center text-orange-500">
                    ✉️
                  </span>
                  <span>hello@munchmate.rw</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 MunchMate. All rights reserved. Made with ❤️ in Rwanda
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CustomerDashboard;
import React, { useState, useEffect } from "react";
import {
  ChefHat,
  Users,
  Star,
  TrendingUp,
  Utensils,
  Crown,
  Clock,
  Heart,
} from "lucide-react";

const MunchMateLanding = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              MunchMate
            </span>
          </div>
          <div className="flex space-x-4">
            <button
              className="px-6 py-2 text-gray-700 hover:text-orange-600 transition-colors font-medium"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              onClick={() => {
                window.location.href = "/signup"
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-lime-600 via-yellow-500 via-orange-500 to-red-600 bg-clip-text text-transparent">
                Elevate Your
              </span>
              <br />
              <span className="text-gray-800">Culinary Journey</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Where exceptional restaurants meet discerning diners. MunchMate
              connects culinary artisans with food enthusiasts, creating
              unforgettable dining experiences.
            </p>
          </div>

          {/* Dual CTA */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-lime-400 to-yellow-500 p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors"></div>
              <div className="relative z-10">
                <Crown className="w-12 h-12 text-white mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">
                  For Restaurant Owners
                </h3>
                <p className="text-white/90 mb-6">
                  Showcase your culinary mastery and attract food connoisseurs
                  who appreciate fine dining.
                </p>
                <button className="w-full bg-white text-yellow-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors">
                  Join as Restaurant
                </button>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors"></div>
              <div className="relative z-10">
                <Heart className="w-12 h-12 text-white mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">
                  For Food Lovers
                </h3>
                <p className="text-white/90 mb-6">
                  Discover hidden gems and savor extraordinary dishes crafted by
                  passionate chefs.
                </p>
                <button className="w-full bg-white text-red-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors">
                  Explore Restaurants
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Crafted for{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Excellence
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Premium tools and insights designed for the sophisticated food
              industry
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Utensils className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Curated Excellence
              </h3>
              <p className="text-gray-600">
                Only the finest establishments join our exclusive network of
                culinary destinations.
              </p>
            </div>

            <div className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Smart Analytics
              </h3>
              <p className="text-gray-600">
                Sophisticated insights to help restaurants understand and
                delight their clientele.
              </p>
            </div>

            <div className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Seamless Experience
              </h3>
              <p className="text-gray-600">
                Effortless reservations and personalized recommendations for
                discerning diners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="group">
              <div className="text-4xl font-bold bg-gradient-to-r from-lime-600 to-yellow-500 bg-clip-text text-transparent mb-2">
                500+
              </div>
              <p className="text-gray-600 font-medium">Premium Restaurants</p>
            </div>
            <div className="group">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
                50K+
              </div>
              <p className="text-gray-600 font-medium">Food Connoisseurs</p>
            </div>
            <div className="group">
              <div className="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mb-2">
                4.9★
              </div>
              <p className="text-gray-600 font-medium">Average Rating</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-12">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <blockquote className="text-xl text-gray-700 italic mb-4 max-w-3xl mx-auto">
              "MunchMate has transformed how we connect with food lovers. The
              quality of diners we attract through this platform truly
              appreciates our culinary artistry."
            </blockquote>
            <cite className="text-gray-600 font-medium">
              Chef Marco Aurelius, Le Petit Jardin ★★★
            </cite>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Begin Your{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Gourmet Journey
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the most sophisticated dining community where culinary passion
            meets discerning taste.
          </p>
          <button className="px-12 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white text-lg font-semibold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            Start Your Experience
          </button>
        </div>
      </section>
    </div>
  );
};

export default MunchMateLanding;

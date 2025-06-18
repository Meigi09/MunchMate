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
    <div className="min-h-screen bg-white">
      {/* Navigation - Minimal Japanese style with color accent */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-8 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-green-500 to-yellow-500 flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-light tracking-wider text-black">
              MunchMate
            </span>
          </div>
          <div className="flex items-center space-x-8">
            <button
              className="text-sm font-light text-gray-600 hover:text-orange-500 transition-colors duration-500 tracking-wide"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              className="px-8 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-light tracking-wide hover:from-orange-600 hover:to-red-600 transition-all duration-500 border border-orange-500 hover:shadow-lg hover:shadow-orange-500/20"
              onClick={() => {
                window.location.href = "/signup";
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Zen minimalism */}
      <section className="pt-32 pb-24 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <div className="mb-8">
              <div className="w-1 h-16 bg-gradient-to-b from-green-500 to-yellow-500 mx-auto mb-8"></div>
              <h1 className="text-5xl md:text-6xl font-extralight mb-4 tracking-tight leading-tight">
                <span className="block bg-gradient-to-r from-green-500 to-yellow-500 bg-clip-text text-transparent mb-2">
                  Elevate Your
                </span>
                <span className="block font-light text-gray-700">Culinary</span>
                <span className="block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Journey
                </span>
              </h1>
              <div className="w-12 h-px bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-8"></div>
            </div>
            <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto leading-relaxed tracking-wide">
              Where exceptional restaurants meet discerning diners. MunchMate
              <br />
              connects culinary artisans with food enthusiasts, creating
              <br />
              unforgettable dining experiences.
            </p>
          </div>

          {/* Dual CTA - Clean geometric design with colors */}
          <div className="grid md:grid-cols-2 gap-1 max-w-3xl mx-auto">
            <div className="group relative bg-gradient-to-br from-green-50 to-yellow-50 hover:from-green-100 hover:to-yellow-100 transition-all duration-700 p-12 border border-green-200">
              <div className="text-center">
                <div className="w-12 h-12 border border-green-500 mx-auto mb-8 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-green-500 group-hover:to-yellow-500 transition-colors duration-500">
                  <Crown className="w-6 h-6 text-green-500 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-light text-black mb-6 tracking-wide">
                  For Restaurant Owners
                </h3>
                <p className="text-gray-600 font-light mb-8 text-sm leading-relaxed">
                  Showcase your culinary mastery and
                  <br />
                  attract food connoisseurs who
                  <br />
                  appreciate fine dining.
                </p>
                <button className="w-full border border-green-500 text-green-600 font-light py-4 hover:bg-gradient-to-r hover:from-green-500 hover:to-yellow-500 hover:text-white transition-all duration-500 tracking-wider text-sm">
                  Join as Restaurant
                </button>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 transition-all duration-700 p-12 border border-orange-200">
              <div className="text-center">
                <div className="w-12 h-12 border border-orange-500 mx-auto mb-8 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-red-500 transition-colors duration-500">
                  <Heart className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-light text-black mb-6 tracking-wide">
                  For Food Lovers
                </h3>
                <p className="text-gray-600 font-light mb-8 text-sm leading-relaxed">
                  Discover hidden gems and savor
                  <br />
                  extraordinary dishes crafted by
                  <br />
                  passionate chefs.
                </p>
                <button className="w-full border border-orange-500 text-orange-600 font-light py-4 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white transition-all duration-500 tracking-wider text-sm">
                  Explore Restaurants
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Grid layout with subtle shadows */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-16">
            <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-yellow-500 mx-auto mb-6"></div>
            <h2 className="text-3xl font-light text-black mb-4 tracking-wide">
              Crafted for
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-normal">
                {" "}
                Excellence
              </span>
            </h2>
            <p className="text-gray-600 font-light max-w-xl mx-auto text-sm leading-relaxed">
              Premium tools and insights designed for
              <br />
              the sophisticated food industry
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-gray-200">
            <div className="group bg-white p-12 hover:bg-gradient-to-br hover:from-green-50 hover:to-yellow-50 transition-all duration-700">
              <div className="text-center">
                <div className="w-16 h-16 border border-gray-300 mx-auto mb-8 flex items-center justify-center group-hover:border-green-500 group-hover:bg-gradient-to-br group-hover:from-green-500 group-hover:to-yellow-500 transition-colors duration-500">
                  <Utensils className="w-8 h-8 text-gray-600 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-lg font-light text-black mb-4 tracking-wide">
                  Curated Excellence
                </h3>
                <p className="text-gray-600 font-light text-sm leading-relaxed">
                  Only the finest establishments join our
                  <br />
                  exclusive network of culinary destinations.
                </p>
              </div>
            </div>

            <div className="group bg-white p-12 hover:bg-gradient-to-br hover:from-yellow-50 hover:to-orange-50 transition-all duration-700">
              <div className="text-center">
                <div className="w-16 h-16 border border-gray-300 mx-auto mb-8 flex items-center justify-center group-hover:border-yellow-500 group-hover:bg-gradient-to-br group-hover:from-yellow-500 group-hover:to-orange-500 transition-colors duration-500">
                  <TrendingUp className="w-8 h-8 text-gray-600 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-lg font-light text-black mb-4 tracking-wide">
                  Smart Analytics
                </h3>
                <p className="text-gray-600 font-light text-sm leading-relaxed">
                  Sophisticated insights to help restaurants
                  <br />
                  understand and delight their clientele.
                </p>
              </div>
            </div>

            <div className="group bg-white p-12 hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-50 transition-all duration-700">
              <div className="text-center">
                <div className="w-16 h-16 border border-gray-300 mx-auto mb-8 flex items-center justify-center group-hover:border-orange-500 group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-red-500 transition-colors duration-500">
                  <Clock className="w-8 h-8 text-gray-600 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-lg font-light text-black mb-4 tracking-wide">
                  Seamless Experience
                </h3>
                <p className="text-gray-600 font-light text-sm leading-relaxed">
                  Effortless reservations and personalized
                  <br />
                  recommendations for discerning diners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Minimalist stats */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-16 mb-20">
            <div className="text-center group">
              <div className="text-4xl font-extralight text-black mb-2 group-hover:scale-105 transition-transform duration-500">
                500
                <span className="bg-gradient-to-r from-green-500 to-yellow-500 bg-clip-text text-transparent">
                  +
                </span>
              </div>
              <div className="w-8 h-px bg-gradient-to-r from-green-500 to-yellow-500 mx-auto mb-2"></div>
              <p className="text-gray-600 font-light text-sm tracking-wide">
                Premium Restaurants
              </p>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-extralight text-black mb-2 group-hover:scale-105 transition-transform duration-500">
                50K
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  +
                </span>
              </div>
              <div className="w-8 h-px bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto mb-2"></div>
              <p className="text-gray-600 font-light text-sm tracking-wide">
                Food Connoisseurs
              </p>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-extralight text-black mb-2 group-hover:scale-105 transition-transform duration-500">
                4.9
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  ★
                </span>
              </div>
              <div className="w-8 h-px bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-2"></div>
              <p className="text-gray-600 font-light text-sm tracking-wide">
                Average Rating
              </p>
            </div>
          </div>

          <div className="border border-gray-200 p-12 bg-gradient-to-br from-gray-50 to-white">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 fill-current mx-1 ${
                      i < 2
                        ? "text-green-500"
                        : i < 4
                        ? "text-yellow-500"
                        : "text-orange-500"
                    }`}
                  />
                ))}
              </div>
              <blockquote className="text-lg font-light text-black italic mb-8 max-w-2xl mx-auto leading-relaxed">
                "MunchMate has transformed how we connect with food lovers. The
                quality of diners we attract through this platform truly
                appreciates our culinary artistry."
              </blockquote>
              <div className="w-12 h-px bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto mb-4"></div>
              <cite className="text-gray-600 font-light text-sm tracking-wide">
                Chef Marco Aurelius, Le Petit Jardin ★★★
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA - Dramatic black section with color accents */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-black text-white border-t border-gray-800">
        <div className="max-w-3xl mx-auto text-center px-8">
          <div className="w-1 h-12 bg-gradient-to-b from-green-500 to-red-500 mx-auto mb-8"></div>
          <h2 className="text-3xl font-light mb-8 tracking-wide leading-tight">
            Ready to Begin Your
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent font-normal mt-2">
              Gourmet Journey
            </span>
            <span className="block font-light mt-2">?</span>
          </h2>
          <p className="text-gray-300 font-light mb-12 max-w-xl mx-auto text-sm leading-relaxed">
            Join the most sophisticated dining community where
            <br />
            culinary passion meets discerning taste.
          </p>
          <button className="px-16 py-4 border border-gradient-to-r from-orange-500 to-red-500 bg-gradient-to-r from-orange-500 to-red-500 text-white font-light hover:from-orange-600 hover:to-red-600 transition-all duration-500 tracking-widest text-sm hover:shadow-lg hover:shadow-orange-500/20">
            Start Your Experience
          </button>
        </div>
      </section>
    </div>
  );
};

export default MunchMateLanding;

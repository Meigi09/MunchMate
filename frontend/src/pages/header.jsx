import React, { useState } from 'react';
import { Search, ShoppingCart, Settings, MapPin, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

function HeaderLayout() {
  const [cartItems, setCartItems] = useState(3);
  const handleCartClick = () => {
    // Add bounce animation effect
    const cartBtn = document.querySelector('.cart-button');
    if (cartBtn) {
      cartBtn.style.animation = 'bounce 0.6s ease';
      setTimeout(() => {
        cartBtn.style.animation = '';
      }, 600);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b shadow-lg">
            <div className="container mx-auto px-4 py-3">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Logo */}
                <div className="flex items-center gap-2 text-xl font-bold text-palette-green">
                  <span className="text-lg">🍽️</span>
                  MunchMate
                </div>
    
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search restaurants, dishes, or cuisines..."
                    className="pl-10 pr-4 py-2 rounded-full border-2 focus:border-palette-green transition-all duration-300 hover:scale-105 focus:scale-105"
                  />
                </div>
    
                {/* Header Actions */}
                <div className="flex items-center gap-3">
                  <Button
                    size="icon"
                    className="cart-button relative bg-palette-orange hover:bg-palette-dark-orange text-white rounded-full w-11 h-11 transition-all duration-300 hover:scale-105"
                    onClick={handleCartClick}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <Badge className="absolute -top-2 -right-2 bg-palette-red text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
                      {cartItems}
                    </Badge>
                  </Button>
                  <Button
                    size="icon"
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-palette-green to-palette-yellow text-white font-semibold hover:scale-105 transition-transform duration-300"
                  >
                    JD
                  </Button>
                </div>
              </div>
            </div>
          </header>
  );
}

export default HeaderLayout;
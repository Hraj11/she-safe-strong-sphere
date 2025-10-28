import { useState } from "react";
import { ShoppingBag, Heart, Star, Plus, Search, Filter, TrendingUp, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const TalentMarketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const featuredCreators = [
    {
      id: 1,
      name: "Sarah's Handmade Jewelry",
      category: "jewelry",
      rating: 4.9,
      sales: 127,
      items: 23,
      image: "/api/placeholder/80/80",
      description: "Unique handmade necklaces and earrings",
      featured: true
    },
    {
      id: 2,
      name: "Creative Candles by Maya",
      category: "home",
      rating: 4.8,
      sales: 89,
      items: 15,
      image: "/api/placeholder/80/80",
      description: "Artisan soy candles with natural scents",
      featured: true
    },
    {
      id: 3,
      name: "Emma's Embroidery Art",
      category: "art",
      rating: 4.7,
      sales: 64,
      items: 18,
      image: "/api/placeholder/80/80",
      description: "Custom embroidery and textile art",
      featured: false
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Handmade Silver Necklace",
      creator: "Sarah's Handmade Jewelry",
      price: "$45.00",
      originalPrice: "$60.00",
      rating: 4.9,
      reviews: 42,
      image: "/api/placeholder/300/300",
      category: "jewelry",
      tags: ["Handmade", "Silver", "Necklace"],
      quickAdd: true
    },
    {
      id: 2,
      name: "Lavender Soy Candle Set",
      creator: "Creative Candles by Maya",
      price: "$32.00",
      originalPrice: "$40.00",
      rating: 4.8,
      reviews: 28,
      image: "/api/placeholder/300/300",
      category: "home",
      tags: ["Eco-friendly", "Soy Wax", "Set of 3"],
      quickAdd: true
    },
    {
      id: 3,
      name: "Custom Name Embroidery",
      creator: "Emma's Embroidery Art",
      price: "$55.00",
      originalPrice: "$70.00",
      rating: 4.7,
      reviews: 35,
      image: "/api/placeholder/300/300",
      category: "art",
      tags: ["Custom", "Embroidery", "Personalized"],
      quickAdd: false
    },
    {
      id: 4,
      name: "Hand-painted Ceramic Mugs",
      creator: "Pottery by Lisa",
      price: "$28.00",
      rating: 4.9,
      reviews: 51,
      image: "/api/placeholder/300/300",
      category: "home",
      tags: ["Ceramic", "Hand-painted", "Set of 2"],
      quickAdd: true
    }
  ];

  const categories = [
    { id: "all", name: "All Categories", count: 156, icon: ShoppingBag },
    { id: "jewelry", name: "Jewelry", count: 42, icon: ShoppingBag },
    { id: "clothing", name: "Clothing", count: 38, icon: ShoppingBag },
    { id: "home", name: "Home Decor", count: 35, icon: ShoppingBag },
    { id: "art", name: "Art & Prints", count: 28, icon: ShoppingBag },
    { id: "crafts", name: "Crafts", count: 13, icon: ShoppingBag }
  ];

  const marketplaceStats = [
    { number: "500+", label: "Women Creators" },
    { number: "2,000+", label: "Products Listed" },
    { number: "10,000+", label: "Happy Customers" },
    { number: "$250K+", label: "Total Sales" }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
            Talent Marketplace
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Showcase and sell your handmade creations. Support women entrepreneurs and discover unique products.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {marketplaceStats.map((stat, index) => (
            <Card key={index} className="p-6 text-center bg-white/60 backdrop-blur-sm">
              <div className="text-2xl font-bold text-orange-600 mb-2">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  selectedCategory === category.id
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-orange-300'
                }`}
              >
                <Icon className="w-6 h-6 mx-auto mb-2" />
                <div className="font-semibold text-sm">{category.name}</div>
                <div className="text-xs text-gray-500">{category.count} items</div>
              </button>
            );
          })}
        </div>

        {/* Featured Creators */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display text-2xl font-bold text-gray-900">Featured Creators</h3>
            <Link to="/creators">
              <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                View All Creators
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCreators.map((creator) => (
              <Card key={creator.id} className="p-6 bg-white/60 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 flex items-center justify-center text-white font-semibold">
                    {creator.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{creator.name}</h4>
                    <p className="text-sm text-gray-600">{creator.description}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-semibold">{creator.rating}</span>
                      <span className="text-sm text-gray-500 ml-2">({creator.sales} sales)</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/creator/${creator.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Shop
                    </Button>
                  </Link>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display text-2xl font-bold text-gray-900">Featured Products</h3>
            <div className="flex gap-3">
              <Link to="/marketplace">
                <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                  Browse All Products
                </Button>
              </Link>
              <Link to="/sell">
                <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Start Selling
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-orange-200 to-amber-200 flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-orange-600 opacity-80" />
                  </div>
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-sm font-semibold rounded">
                      SALE
                    </div>
                  )}
                  <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-900 text-sm leading-tight">{product.name}</h4>
                    <div className="text-right">
                      <div className="font-bold text-orange-600">{product.price}</div>
                      {product.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">{product.originalPrice}</div>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 mb-3">by {product.creator}</p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-500 mr-1" />
                      <span className="text-xs font-semibold">{product.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Eye className="w-3 h-3 mr-1" />
                      1.2k views
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-sm">
                      Add to Cart
                    </Button>
                    <Link to={`/product/${product.id}`} className="flex-1">
                      <Button variant="outline" className="w-full text-sm">
                        Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="p-8 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <TrendingUp className="w-16 h-16 mx-auto mb-4" />
            <h3 className="font-display text-3xl font-bold mb-4">Ready to Start Your Business?</h3>
            <p className="text-xl mb-6 opacity-90">
              Join our community of women entrepreneurs. List your products, reach customers worldwide, and grow your brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/sell">
                <Button className="bg-white text-orange-600 hover:bg-gray-100 px-8">
                  Start Selling Today
                </Button>
              </Link>
              <Link to="/learn-more">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                  Learn How It Works
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default TalentMarketplace;
"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  Star,
  MapPin,
  ChefHat,
  Crown,
  Heart,
  Utensils,
} from "lucide-react"

function RestaurantDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

  const restaurantModel = {
    id: 1,
    name: "Bella's Italian Kitchen",
    description: "Authentic Italian cuisine with fresh ingredients",
    location: "123 Main Street, Downtown",
    phone: "+1 (555) 123-4567",
    email: "contact@bellasitalian.com",
    image:
      "https://media.istockphoto.com/id/667442560/photo/restaurant-chilling-out-classy-lifestyle-reserved-concept.jpg?s=612x612&w=0&k=20&c=YgLQM26TAb3738AS-UyvFDLpVKqj9kJjW5e9Ll6dU-8=",
    owner: "John Doe",
    isActive: true,
    createdAt: "2023-01-01T12:00:00Z",
    updatedAt: "2023-01-01T12:00:00Z",
    reviews: [
      {
        customer: "John Doe",
        rating: 5,
        comment: "Delicious food and great service!",
        date: "2023-01-01T12:00:00Z",
      },
      {
        customer: "Sarah Smith",
        rating: 4,
        comment: "Good food, but a bit slow service.",
        date: "2023-01-02T12:00:00Z",
      },
      {
        customer: "Mike Johnson",
        rating: 5,
        comment: "Absolutely love the tiramisu!",
        date: "2023-01-03T12:00:00Z",
      },
      {
        customer: "Emily Brown",
        rating: 4,
        comment: "The lasagna was amazing!",
        date: "2023-01-04T12:00:00Z",
      },
    ],
  };

  const stats = [
    {
      title: "Today's Orders",
      value: "23",
      icon: ShoppingBag,
      change: "+12%",
      gradient: "from-lime-400 to-yellow-500",
    },
    {
      title: "Revenue",
      value: "$1,247",
      icon: DollarSign,
      change: "+8%",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      title: "Active Items",
      value: "42",
      icon: Utensils,
      change: "+2",
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Rating",
      value: "4.8",
      icon: Star,
      change: "+0.2",
      gradient: "from-red-500 to-red-600",
    },
  ];

  const menuItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      category: "Pizza",
      price: 18.99,
      status: "active",
      orders: 45,
    },
    {
      id: 2,
      name: "Chicken Alfredo",
      category: "Pasta",
      price: 22.5,
      status: "active",
      orders: 32,
    },
    {
      id: 3,
      name: "Caesar Salad",
      category: "Salads",
      price: 12.99,
      status: "active",
      orders: 28,
    },
    {
      id: 4,
      name: "Tiramisu",
      category: "Desserts",
      price: 8.99,
      status: "inactive",
      orders: 15,
    },
    {
      id: 5,
      name: "Lasagna",
      category: "Pasta",
      price: 24.99,
      status: "active",
      orders: 38,
    },
  ];

  const deliveries = [
    {
      id: 1,
      customer: "John Doe",
      order: "Margherita Pizza",
      deliveryPerson: "Mike Johnson",
      status: "pending",
      time: "10 mins ago",
    },
    {
      id: 2,
      customer: "Sarah Smith",
      order: "Chicken Alfredo",
      deliveryPerson: "Emily Brown",
      status: "preparing",
      time: "15 mins ago",
    },
    {
      id: 3,
      customer: "Mike Johnson",
      order: "Caesar Salad",
      deliveryPerson: "John Doe",
      status: "ready",
      time: "20 mins ago",
    },
    {
      id: 4,
      customer: "Emily Brown",
      order: "Lasagna",
      deliveryPerson: "Sarah Smith",
      status: "delivered",
      time: "1 hour ago",
    },
    {
      id: 5,
      customer: "David Wilson",
      order: "Margherita Pizza",
      deliveryPerson: "Mike Johnson",
      status: "cancelled",
      time: "2 hours ago",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-001",
      customer: "John Doe",
      items: "2x Margherita Pizza",
      total: 37.98,
      status: "pending",
      time: "10 mins ago",
    },
    {
      id: "#ORD-002",
      customer: "Sarah Smith",
      items: "1x Chicken Alfredo",
      total: 22.5,
      status: "preparing",
      time: "15 mins ago",
    },
    {
      id: "#ORD-003",
      customer: "Mike Johnson",
      items: "1x Caesar Salad, 1x Tiramisu",
      total: 21.98,
      status: "ready",
      time: "20 mins ago",
    },
    {
      id: "#ORD-004",
      customer: "Emily Brown",
      items: "1x Lasagna",
      total: 24.99,
      status: "delivered",
      time: "1 hour ago",
    },
    {
      id: "#ORD-005",
      customer: "David Wilson",
      items: "3x Margherita Pizza",
      total: 56.97,
      status: "cancelled",
      time: "2 hours ago",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white";
      case "preparing":
        return "bg-gradient-to-r from-orange-500 to-red-500 text-white";
      case "ready":
        return "bg-gradient-to-r from-lime-400 to-green-500 text-white";
      case "delivered":
        return "bg-gradient-to-r from-green-500 to-emerald-600 text-white";
      case "cancelled":
        return "bg-gradient-to-r from-red-500 to-red-600 text-white";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-500 text-white";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "preparing":
        return <Clock className="h-4 w-4" />;
      case "ready":
        return <CheckCircle className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

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
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">Welcome back, Chef!</div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-lime-400 to-yellow-500"></div>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <div className="pt-20 py-6 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="h-20 w-20 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/20 group-hover:scale-105 transition-transform duration-300">
                  <img
                    className="h-full w-full object-cover"
                    src={restaurantModel.image}
                    alt="Restaurant"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-lime-400 to-yellow-500 rounded-full flex items-center justify-center">
                  <Crown className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  {restaurantModel.name}
                </h1>
                <p className="text-gray-300 text-lg mb-3">
                  {restaurantModel.description}
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {restaurantModel.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <span className="text-yellow-400 font-semibold">4.8</span>
                    <span>({restaurantModel.reviews.length} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                View Public Page
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <div className="sticky top-24 z-40 bg-white/80 backdrop-blur-md rounded-2xl p-2 shadow-lg border border-gray-200">
            <TabsList className="grid w-full grid-cols-6 bg-transparent gap-1">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-lime-400 data-[state=active]:to-yellow-500 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="menu"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-orange-500 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                Menu
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="deliveries"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                Deliveries
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-lime-500 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                Reviews
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                      <div
                        className={`text-sm font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${stat.gradient} text-white`}
                      >
                        {stat.change}
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-800 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800">
                  Recent Orders
                </h3>
                <p className="text-gray-600">
                  Latest orders from your restaurant
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Order ID
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Items
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Total
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Time
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.slice(0, 5).map((order, index) => (
                      <tr
                        key={order.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {order.customer}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {order.items}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          ${order.total}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusIcon(order.status)}
                            <span className="capitalize">{order.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {order.time}
                        </td>
                        <td className="px-6 py-4">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Eye className="h-4 w-4 text-gray-600" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Menu Management Tab */}
          <TabsContent value="menu" className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Menu Management
                </h2>
                <p className="text-gray-600 text-lg">
                  Manage your restaurant's culinary offerings
                </p>
              </div>
              <Dialog open={isAddMenuOpen} onOpenChange={setIsAddMenuOpen}>
                <DialogTrigger asChild>
                  <button className="px-6 py-3 bg-gradient-to-r from-lime-400 to-yellow-500 text-white rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add Menu Item
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                      Add New Menu Item
                    </DialogTitle>
                    <DialogDescription>
                      Create a new delicious addition to your menu.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label
                        htmlFor="name"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Item Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter item name"
                        className="rounded-xl border-gray-200"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label
                        htmlFor="category"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Category
                      </Label>
                      <Select>
                        <SelectTrigger className="rounded-xl border-gray-200">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pizza">Pizza</SelectItem>
                          <SelectItem value="pasta">Pasta</SelectItem>
                          <SelectItem value="salads">Salads</SelectItem>
                          <SelectItem value="desserts">Desserts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label
                        htmlFor="price"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Price
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="0.00"
                        className="rounded-xl border-gray-200"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label
                        htmlFor="description"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your menu item"
                        className="rounded-xl border-gray-200"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddMenuOpen(false)}
                      className="rounded-xl"
                    >
                      Cancel
                    </Button>
                    <Button className="bg-gradient-to-r from-lime-400 to-yellow-500 hover:shadow-lg text-white rounded-xl">
                      Add Item
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Item Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Orders
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems.map((item, index) => (
                      <tr
                        key={item.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {item.category}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          ${item.price}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                              item.status === "active"
                                ? "bg-gradient-to-r from-lime-400 to-green-500 text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {item.orders} orders
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Edit className="h-4 w-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Order Management
              </h2>
              <p className="text-gray-600 text-lg">
                View and manage all incoming orders
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Order ID
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Items
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Total
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Time
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => (
                      <tr
                        key={order.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {order.customer}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {order.items}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          ${order.total}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusIcon(order.status)}
                            <span className="capitalize">{order.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {order.time}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Eye className="h-4 w-4 text-gray-600" />
                            </button>
                            {order.status === "pending" && (
                              <>
                                <button className="px-3 py-1 bg-gradient-to-r from-lime-400 to-green-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-medium">
                                  Accept
                                </button>
                                <button className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-medium">
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Deliveries Tab */}
          <TabsContent value="deliveries" className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                Delivery Management
              </h2>
              <p className="text-gray-600 text-lg">
                Track and manage all delivery operations
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Delivery ID
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Order
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Delivery Person
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Time
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveries.map((delivery, index) => (
                      <tr
                        key={delivery.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          #{delivery.id.toString().padStart(3, "0")}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {delivery.customer}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {delivery.order}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {delivery.deliveryPerson}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              delivery.status
                            )}`}
                          >
                            {getStatusIcon(delivery.status)}
                            <span className="capitalize">
                              {delivery.status}
                            </span>
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {delivery.time}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Eye className="h-4 w-4 text-gray-600" />
                            </button>
                            {delivery.status === "pending" && (
                              <>
                                <button className="px-3 py-1 bg-gradient-to-r from-lime-400 to-green-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-medium">
                                  Accept
                                </button>
                                <button className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-medium">
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-lime-500 to-green-500 bg-clip-text text-transparent">
                Customer Reviews
              </h2>
              <p className="text-gray-600 text-lg">
                See what your customers are saying about your food
              </p>
            </div>

            <div className="grid gap-6">
              {restaurantModel.reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-lime-400 to-yellow-500 flex items-center justify-center text-white font-bold text-lg">
                        {review.customer.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">
                          {review.customer}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-400" />
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {review.comment}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                      Reply to review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Analytics Dashboard
              </h2>
              <p className="text-gray-600 text-lg">
                Track your restaurant's performance and growth
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-lime-400 to-green-500 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-sm font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-lime-400 to-green-500 text-white">
                    +15.3%
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  Sales Trend
                </div>
                <p className="text-gray-600">Compared to last month</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-sm font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                    4.8/5
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  Customer Satisfaction
                </div>
                <p className="text-gray-600">Based on 324 reviews</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-sm font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    #1
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-800 mb-1">
                  Margherita Pizza
                </div>
                <p className="text-gray-600">Most popular item - 45 orders</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-sm font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white">
                    +8%
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  1,247
                </div>
                <p className="text-gray-600">Total customers served</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-sm font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    -2min
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  18 min
                </div>
                <p className="text-gray-600">Average preparation time</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-sm font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                    +12%
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  $24.50
                </div>
                <p className="text-gray-600">Average order value</p>
              </div>
            </div>

            {/* Performance Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Weekly Revenue
                </h3>
                <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Revenue chart would go here</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Popular Menu Items
                </h3>
                <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Utensils className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">
                      Menu analytics chart would go here
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default RestaurantDashboard;;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Cart = () => {
  // Sample cart items
  const cartItems = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      image: '/placeholder.svg',
      price: 129.99,
      quantity: 1
    },
    {
      id: '2',
      title: 'Portfolio Template',
      image: '/placeholder.svg',
      price: 79.99,
      quantity: 1
    }
  ];

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8 text-gray-900"
        >
          Your Cart {cartItems.length > 0 && `(${cartItems.length})`}
        </motion.h1>

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            <motion.div 
              className="flex-grow"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {cartItems.map((item) => (
                <motion.div 
                  key={item.id}
                  variants={itemVariants}
                  className="flex items-center p-4 mb-4 bg-white rounded-xl border border-gray-100 shadow-sm"
                >
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                  
                  <div className="ml-4 flex-grow">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-purple-600 font-medium">${item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <Minus className="h-4 w-4 text-gray-500" />
                    </button>
                    <span className="mx-2 w-6 text-center">{item.quantity}</span>
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <Plus className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                  
                  <button className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:w-80 bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-fit"
            >
              <h2 className="text-lg font-bold mb-4 text-gray-900">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between font-medium text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Link to="/checkout">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 mb-3">
                  Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              <Link to="/projects/category/all">
                <Button variant="outline" className="w-full border-gray-200">
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <ShoppingCart className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any projects to your cart yet.</p>
            <Link to="/projects/category/all">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Browse Projects
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cart;

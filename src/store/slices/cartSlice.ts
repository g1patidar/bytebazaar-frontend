import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  isLoading: boolean;
  error: string | null;
}

// Load cart from localStorage
const loadCartState = (): CartState => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) {
      return {
        items: [],
        totalItems: 0,
        totalAmount: 0,
        isLoading: false,
        error: null,
      };
    }
    const parsedCart = JSON.parse(serializedCart);
    return {
      ...parsedCart,
      isLoading: false,
      error: null,
    };
  } catch (err) {
    return {
      items: [],
      totalItems: 0,
      totalAmount: 0,
      isLoading: false,
      error: null,
    };
  }
};

// Save cart to localStorage
const saveCartState = (cart: Pick<CartState, 'items' | 'totalItems' | 'totalAmount'>) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('cart', serializedCart);
  } catch (err) {
    console.error('Could not save cart state', err);
  }
};

const initialState: CartState = loadCartState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
      
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      // Save to localStorage
      saveCartState({
        items: state.items,
        totalItems: state.totalItems,
        totalAmount: state.totalAmount,
      });
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      // Save to localStorage
      saveCartState({
        items: state.items,
        totalItems: state.totalItems,
        totalAmount: state.totalAmount,
      });
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      
      if (item) {
        item.quantity = quantity;
      }
      
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      // Save to localStorage
      saveCartState({
        items: state.items,
        totalItems: state.totalItems,
        totalAmount: state.totalAmount,
      });
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
      
      // Save to localStorage
      localStorage.removeItem('cart');
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalItems = (state: RootState) => state.cart.totalItems;
export const selectCartTotalAmount = (state: RootState) => state.cart.totalAmount;

export default cartSlice.reducer;

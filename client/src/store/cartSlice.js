import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  loading: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload
      state.totalItems = action.payload.reduce((total, item) => total + item.quantity, 0)
      state.totalPrice = action.payload.reduce((total, item) => {
        const price = item.productId?.discount 
          ? item.productId.price - (item.productId.price * item.productId.discount / 100)
          : item.productId?.price || 0
        return total + (price * item.quantity)
      }, 0)
    },
    addCartItem: (state, action) => {
      const existingItem = state.items.find(item => item.productId._id === action.payload.productId._id)
      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
      // Recalculate totals
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalPrice = state.items.reduce((total, item) => {
        const price = item.productId?.discount 
          ? item.productId.price - (item.productId.price * item.productId.discount / 100)
          : item.productId?.price || 0
        return total + (price * item.quantity)
      }, 0)
    },
    updateCartItem: (state, action) => {
      const { cartItemId, quantity } = action.payload
      const item = state.items.find(item => item._id === cartItemId)
      if (item) {
        item.quantity = quantity
      }
      // Recalculate totals
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalPrice = state.items.reduce((total, item) => {
        const price = item.productId?.discount 
          ? item.productId.price - (item.productId.price * item.productId.discount / 100)
          : item.productId?.price || 0
        return total + (price * item.quantity)
      }, 0)
    },
    removeCartItem: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload)
      // Recalculate totals
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalPrice = state.items.reduce((total, item) => {
        const price = item.productId?.discount 
          ? item.productId.price - (item.productId.price * item.productId.discount / 100)
          : item.productId?.price || 0
        return total + (price * item.quantity)
      }, 0)
    },
    clearCart: (state) => {
      state.items = []
      state.totalItems = 0
      state.totalPrice = 0
    },
    setCartLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

export const { 
  setCartItems, 
  addCartItem, 
  updateCartItem, 
  removeCartItem, 
  clearCart, 
  setCartLoading 
} = cartSlice.actions

export default cartSlice.reducer

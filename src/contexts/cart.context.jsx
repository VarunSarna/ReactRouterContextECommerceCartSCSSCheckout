import { createContext, useState, useEffect } from "react";

const addCardItem = (cartItems, productToAdd) => {
  //find if cartItems contains productToAdd
  const existingCarItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  //if found, increment quantity
  if (existingCarItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  //return new array with modified carItems/new cart item..
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  //find the cart item to remove
  const existingCarItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  //check if quantity is equal to 1, if yes, remove the item from the cart
  if (existingCarItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  //else return back cartItems with the reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});
/**
 *product {id,name,price,imageUrl}
 *Cart Item {id, name, price, imageUrl, quantity}
 *
 */

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setCartCount(
      cartItems.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.quantity;
      }, 0)
    );
  }, [cartItems]);

  useEffect(() => {
    setCartTotal(
      cartItems.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.quantity * currentItem.price;
      }, 0)
    );
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCardItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToClear) => {
    setCartItems(removeCartItem(cartItems, cartItemToClear));
  };

  const clearItemFromCart = (cartItemToRemove) => {
    setCartItems(clearCartItem(cartItems, cartItemToRemove));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

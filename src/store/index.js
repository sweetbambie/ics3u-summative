import { ref } from "vue";
import { defineStore } from "pinia";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const useStore = defineStore('store', () => {
  const user = ref(null);
  const cart = ref(new Map());
  const checkoutCompleted = ref(false);

  function addToCart(id, movieData) {
    cart.value.set(id, movieData);
    saveCartToLocalStorage();
  }


  function removeFromCart(id) {
    cart.value.delete(id);
    saveCartToLocalStorage();
  }

  function clearCart() {
    cart.value.clear();  // Clear the cart
    saveCartToLocalStorage();
  
    // Log when the checkout process starts
    console.log("Checkout started:", checkoutCompleted.value);
  
    checkoutCompleted.value = true;
  
    // Log after setting checkoutCompleted to true
    console.log("Checkout completed:", checkoutCompleted.value);
  
    setTimeout(() => {
      checkoutCompleted.value = false;
  
      // Log after resetting checkoutCompleted
      console.log("Checkout reset:", checkoutCompleted.value);
    }, 3000);  // Thank you message stays for 3 seconds
  }  

  function saveCartToLocalStorage() {
    if (user.value && user.value.email) {
      localStorage.setItem(`cart_${user.value.email}`, JSON.stringify(Object.fromEntries(cart.value)));
    }
  }

  return { user, cart, addToCart, removeFromCart, clearCart };
});

export const userAuthorized = new Promise((resolve, reject) => {
  onAuthStateChanged(auth, user => {
    try {
      const store = useStore();
      store.user = user;
      const storedCart = localStorage.getItem(`cart_${store.user.email}`);

      store.cart = storedCart ? new Map(Object.entries(JSON.parse(storedCart))) : new Map();
      resolve();
    } catch (error) {
      reject();
    }
  })
});

import { ref } from "vue"
import { defineStore } from "pinia";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const useStore = defineStore('store', () => {
  const cart = ref(new Map()); 

  function addToCart(id, movieData) {
    cart.value.set(id, movieData);
    localStorage.setItem(`cart`, JSON.stringify([...cart.value])); 
  }

  function removeFromCart(id) {
    cart.value.delete(id);
    localStorage.setItem(`cart`, JSON.stringify([...cart.value])); 
  }

  function loadCart() {
    const storedCart = localStorage.getItem(`cart`);
    cart.value = storedCart ? new Map(Object.entries(JSON.parse(storedCart))) : new Map();
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    loadCart
  };
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
})
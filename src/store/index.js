import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth } from "../firebase";
import { onAuthStateChanged } from 'firebase/auth';

export const useStore = defineStore('store', () => {
  const user = ref(null); // User state
  const cart = ref({}); // Cart state (use an object for reactivity)

  // Set user (update user.ref directly)
  const setUser = (newUser) => {
    user.value = newUser;
  };

  return { user, cart, setUser };
});

export const userAuthorized = new Promise((resolve, reject) => {
  onAuthStateChanged(auth, (user) => {
    try {
      const store = useStore();
      store.setUser(user); // Correctly update user

      // Initialize cart from localStorage
      const storedCart = localStorage.getItem(`cart_${store.user?.email}`);
      store.cart.value = storedCart ? JSON.parse(storedCart) : {}; // Use object instead of Map

      resolve();
    } catch (error) {
      reject(error);
    }
  });
});
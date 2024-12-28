import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth } from "../firebase";
import { onAuthStateChanged } from 'firebase/auth'; // import onAuthStateChanged

export const useStore = defineStore('store', () => {
  const user = ref(null);
  const cart = ref(new Map());

  // Listen for auth state changes
  const setUser = (user) => {
    user.value = user;
  };

  return { user, cart, setUser };
})

export const userAuthorized = new Promise((resolve, reject) => {
  onAuthStateChanged(auth, (user) => {
    try {
      const store = useStore();
      store.setUser(user);
      const storedCart = localStorage.getItem(`cart_${store.user?.email}`);
      store.cart = storedCart ? new Map(Object.entries(JSON.parse(storedCart))) : new Map();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
});
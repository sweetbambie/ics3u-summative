import { ref } from "vue";
import { defineStore } from "pinia";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "vue-router";

export const useStore = defineStore('store', () => {
  const user = ref(null);
  const cart = ref(new Map());
  const router = useRouter(); 

  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      user.value = firebaseUser;
      const storedCart = localStorage.getItem(`cart_${firebaseUser.email}`);
      cart.value = storedCart ? new Map(Object.entries(JSON.parse(storedCart))) : new Map();
    } else {
      user.value = null;
      cart.value = new Map();
    }
  });

  function addToCart(id, movieData) {
    cart.value.set(id, movieData);
    saveCartToLocalStorage();
  }

  function removeFromCart(id) {
    cart.value.delete(id);
    saveCartToLocalStorage();
  }

  function clearCart() {
    cart.value.clear();
    saveCartToLocalStorage();
  }

  function saveCartToLocalStorage() {
    if (user.value && user.value.email) {
      localStorage.setItem(`cart_${user.value.email}`, JSON.stringify(Object.fromEntries(cart.value)));
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);

      localStorage.removeItem(`cart_${user.value?.email}`);

      router.push("/"); 
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const userAuthorized = new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        user.value = firebaseUser;
        const storedCart = localStorage.getItem(`cart_${firebaseUser.email}`);
        cart.value = storedCart ? new Map(Object.entries(JSON.parse(storedCart))) : new Map();
        resolve();
      } else {
        user.value = null;
        cart.value = new Map();
        resolve();
      }
    }, reject);
  });

  return { user, cart, addToCart, removeFromCart, clearCart, logout, userAuthorized};
});

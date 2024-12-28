// import { defineStore } from 'pinia';
// import { ref, onMounted } from 'vue';
// import { auth } from "../firebase";

// export const useStore = defineStore('store', () => {
//   const user = ref(null);
//   const cart = ref(new Map());

//   return { user, cart }
// })

// export const userAuthorized = new Promise((resolve, reject) => {
//   onAuthStateChanged(auth, user => {
//     try {
//       const store = useStore();
//       store.user = user;
//       const storedCart = localStorage.getItem(`cart_${store.user.email}`);

//       store.cart = storedCart ? new Map(Object.entries(JSON.parse(storedCart))) : new Map();
//       resolve();
//     } catch (error) {
//       reject();
//     }
//   })
// })


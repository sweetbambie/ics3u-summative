import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';

export const useRegistrationStore = defineStore('registration', () => {
  const firstName = ref('');
  const lastName = ref('');
  const email = ref('');
  const password = ref('');
  const rePassword = ref('');

  const persistData = () => {
    localStorage.setItem('firstName', firstName.value);
    localStorage.setItem('lastName', lastName.value);
    localStorage.setItem('email', email.value);
    localStorage.setItem('password', password.value);
  };

  const loadData = () => {
    firstName.value = localStorage.getItem('firstName') || '';
    lastName.value = localStorage.getItem('lastName') || '';
    email.value = localStorage.getItem('email') || '';
    password.value = localStorage.getItem('password') || '';
  };

  onMounted(() => {
    loadData();
  });

  const setRegistrationData = (data) => {
    firstName.value = data.firstName;
    lastName.value = data.lastName;
    email.value = data.email;
    password.value = data.password;
    rePassword.value = ''; 
    persistData(); 
  };

  return {
    firstName,
    lastName,
    email,
    password,
    rePassword,
    setRegistrationData,
  };
});

export const useStore = defineStore('store', () => {
  const cart = ref(new Map());

  return { cart }
})
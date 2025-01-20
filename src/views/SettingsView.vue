<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { useRouter } from "vue-router";
import { useStore } from '../store';
import { updatePassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { ref } from 'vue';

const store = useStore();
const router = useRouter();
const name = ref(store.user?.displayName?.split(" ")[0] || '');
const lastName = ref(store.user?.displayName?.split(" ")[1] || '');
const email = ref(store.user?.email || '');
const password = ref('');

const isEmailProvider = store.user?.providerData.some(provider => provider.providerId === 'password');

const changeName = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      await updateProfile(user, { displayName: `${name.value} ${lastName.value}` })
      store.user = { ...store.user, displayName: `${name.value} ${lastName.value}` };
    }
  } catch (error) {
    console.error("Error occurred during name change:", error);
    alert("There was an error updating the name. Please try again.");
  }
};

  const changePassword = async () => {
    if (!isEmailProvider) {
      alert("You can only change your password if you signed in through email.");
      return;
    }
    try {
      const user = auth.currentUser;
      await updatePassword(user, password.value);
      alert("Password updated successfully!");
      password.value = '';
    } catch (error) {
      alert("There was an error updating the password. Please try again.");
    }
  };
</script>

<template>
  <Header />
  <div class="form-container">
    <h1>User Profile</h1>
    <form @submit.prevent="changeName" class="form">
      <div class="input-container">
        <p>{{ `First Name: ${name}` }}</p>
        <input v-model="name" type="text" id="name" class="input-field" />
        <button type="submit" class="changeName">Change</button>
      </div>
    </form>
    <form @submit.prevent="changeName" class="form">
      <div class="input-container">
        <p>{{ `Last Name: ${lastName}` }}</p>
        <input v-model="lastName" type="text" id="lastName" class="input-field" />
        <button type="submit" class="changeName">Change</button>
      </div>
    </form>
    <div class="email">
      <div class="input-container">
        <p>{{ `Email:` }}</p>
        <input v-model="email" type="email" id="email" class="input-field" readonly />
      </div>
    </div>
    <form @submit.prevent="changePassword" class="form">
      <div class="input-container">
        <p>New Password</p>
        <input v-model="password" type="password" id="password" class="input-field" required />
        <button type="submit" class="changeName">Change Password</button>
      </div>
    </form>
  </div>
  <Footer />
</template>

<style scooped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 50px;
} 

.form-container form{
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
} 

.input-field {
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
  transition: border-color 0.3s;
} 

.input-field:focus {
  border-color: hotpink;
  outline: none;
}

.button{
  background-color: hotpink;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.button:hover {
  background-color: rgb(246, 151, 198);
  transform: scale(1.05);
} 
</style>
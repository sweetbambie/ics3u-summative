<script setup>
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useStore } from "../store";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password1 = ref('');
const password2 = ref('');
const router = useRouter();
const store = useStore();


async function registerByEmail() {
  if (password1.value !== password2.value) {
    alert("Passwords do not match!");
    return;
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password1.value);
    const user = userCredential.user;

    await updateProfile(user, { displayName: `${firstName.value} ${lastName.value}` });

    store.user = user;

    router.push("/movies");
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("This email is already in use. Please log in.");
      router.push("/login");
    } else {
      console.error(error);
      alert(error.code);
    }
  }
}


async function registerByGoogle() {
  try {
    if (store.user) {
      router.push("/movies");
      return;
    }

    const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
    const user = userCredential.user;

    if (store.user && store.user.email === user.email) {
      alert("This account is already registered!");
      router.push("/login");
      return;
    }

    store.user = user;

    router.push("/movies");
  } catch (error) {
    console.error(error);
    alert(error.code);
  }
}
</script>

<template>
  <Header />
  <div class="form-container">
    <h2>Create an Account</h2>
    <form @submit.prevent="registerByEmail">
      <input type="text" placeholder="First Name" class="input-field" v-model="firstName" required />
      <input type="text" placeholder="Last Name" class="input-field" v-model="lastName" required />
      <input type="email" placeholder="Email" class="input-field" v-model="email" required />
      <input type="password" placeholder="Password" class="input-field" v-model="password1" required />
      <input type="password" placeholder="Re-Enter Password" class="input-field" v-model="password2" required />
      <button type="submit" class="register">Register</button>
    </form>
  </div>
  <button @click="registerByGoogle" class="button register">Register by Google</button>
  <Footer />
</template>

<style>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 25% !important;
}

.form-container h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.form-container form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
  gap: 15px;
}

.input-field {
  padding: 15px;
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

.register {
  background-color: hotpink;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.register:hover {
  background-color: rgb(246, 151, 198);
  transform: scale(1.05);
}

.logo {
  font-size: 2rem;
  float: left !important;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-style: italic;
  font-weight: bold;
  margin-left: 8px;
  color: hotpink;
}
</style>

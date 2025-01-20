<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';
import { useStore } from "../store"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../firebase"

const store = useStore();
const router = useRouter();
const email = ref('');
const password = ref('');

const loginByEmail = async () => {
  try 
  {
    const registeredEmails = await fetchSignInMethodsForEmail(auth, email.value);
    if (registeredEmails.length === 0) 
    {
      alert("This email is not registered. Please register first.");
      router.push("/register");
      return;
    }

    const user = (await signInWithEmailAndPassword(auth, email.value, password.value)).user;
    store.user = user;
    router.push("/movies");
  } 
  catch (error) 
  {
    if (error.code === 'auth/wrong-password') 
    {
      alert("Invalid password. Please try again.");
    }
    else 
    {
      console.error(error);
      alert("There was an error signing in with email!");
    }
  }
};

const loginByGoogle = async () => {
  try {
    // Step 1: Sign in with Google
    const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
    const user = userCredential.user;

    // Step 2: Check if the user is already registered (i.e., exists in the store or backend)
    if (store.user && store.user.email === user.email) {
      // The user is registered, proceed to login
      store.user = user;
      router.push("/movies");
    } else {
      // If user is not registered, prompt them to register
      alert("This account is not registered. Please register first.");
    }
  } catch (error) {
    console.error(error);
    alert("There was an error signing in with Google!");
  }
};

</script>

<template>
  <Header />
  <div class="hero">
    <div class="overlay">
      <div class="form-container">
        <h2>Login to Your Account</h2>
        <form @submit.prevent="loginByEmail">
          <input v-model="email" type="email" placeholder="Email" class="input-field" required />
          <input v-model="password" type="password" placeholder="Password" class="input-field" required />
          <button type="submit" class="button login">Login</button>
        </form>
      <button @click="loginByGoogle()" type="submit" class="button login">Login by Google</button>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.logo {
  font-size: 2rem;
  float: left !important;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-style: italic;
  font-weight: bold;
  margin-left: 8px;
  color: hotpink;
}

.overlay {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 20px;
}
</style>
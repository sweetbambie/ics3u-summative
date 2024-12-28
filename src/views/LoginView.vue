<!-- <script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useRegistrationStore } from '../store';
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const store = useRegistrationStore();
const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = () => {
  if (email.value === store.email && password.value === store.password) {
    router.push("/movies");
  } else {
    alert('Login incorrect :(');
  }
};
</script>

<template>
  <Header />
  <div class="hero">
    <div class="overlay">
      <div class="form-container">
        <h2>Login to Your Account</h2>
        <form @submit.prevent="handleLogin">
          <input v-model="email" type="email" placeholder="Email" class="input-field" required />
          <input v-model="password" type="password" placeholder="Password" class="input-field" required />
          <button type="submit" class="button login">Login</button>
        </form>
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
</style> -->

<script></script>
<template></template>
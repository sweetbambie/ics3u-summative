<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import Details from "../components/Details.vue";
</script>

<template>
  <Header />
  <Details />
  <Footer />
</template>
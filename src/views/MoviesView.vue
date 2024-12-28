<script setup>
import Header from '../components/Header.vue'
import Genres from '../components/Genres.vue'
import Footer from '../components/Footer.vue'

const genresList = [ 
  { id: 12, genreName: 'Adventure' },
  {id: 16, genreName: 'Animation' },
  {id: 35, genreName: 'Comedy' },
  {id: 10402, genreName: 'Music' },
  {id: 878, genreName: 'Sci-Fi' },
]
</script>

<template>
  <Header />
  <Genres :genres="genresList"/>
  <Footer />
</template>
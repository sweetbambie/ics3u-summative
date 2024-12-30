<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { useStore } from '../store'; // Pinia store

const props = defineProps(["genres"]);
const router = useRouter();
const store = useStore();

const selectedGenre = ref(28);
const response = ref(null);

// Fetch movies by genre
async function getMovieByGenre() {
  response.value = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false&with_genres=${selectedGenre.value}`);
}

// Navigate to movie details page
function getMovieDetails(id) {
  router.push(`/movies/${id}`);
}

// Load movies on component mount
onMounted(async () => {
  response.value = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false&with_genres=${selectedGenre.value}`);
})
</script>

<template>
  <div class="movie-gallery">
    <!-- Genre Selector -->
    <select v-model="selectedGenre" @change="getMovieByGenre">
      <option v-for="genre in props.genres" :value="genre.id" :key="genre.id">{{ genre.genreName }}</option>
    </select>

    <!-- Movie List -->
    <div v-if="response" class="movie-list">
      <div v-for="movie in response.data.results" :key="movie.id" class="movie-card">
        <div @click="getMovieDetails(movie.id)">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster" class="movie-poster" />
          <p class="movie-title">{{ movie.title }}</p>
        </div>
        
        <!-- Buy Button (Add to Cart) -->
        <button v-if="!store.cart.has(movie.id)"
          @click="store.addToCart(movie.id, { title: movie.title, url: movie.poster_path })" class="buy">
          Buy
        </button>
        
        <!-- Added Button (Already in Cart) -->
        <button v-else @click="store.removeFromCart(movie.id)" class="buy">
          Added
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-gallery {
  text-align: center;
}

select {
  padding: 10px;
  border-radius: 5px;
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.movie-card {
  width: 200px;
  margin: 15px;
  cursor: pointer;
}

.movie-title {
  font-size: 1rem;
  font-weight: bold;
  margin-top: 10px;
}

.movie-poster {
  width: 100%;
  border-radius: 5px;
}

.movie-card:hover .movie-poster {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

.movie-card:hover .movie-title {
  color: hotpink;
}

.buy {
  display: block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: rgb(255, 255, 255);
  color:hotpink;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
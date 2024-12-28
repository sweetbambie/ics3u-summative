<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const response = ref(null);
const route = useRoute();

onMounted(async () => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${import.meta.env.VITE_TMDB_KEY}&append_to_response=videos`
    );
    response.value = res.data;
    console.log(response.value);
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
});
</script>

<template>
  <div v-if="response" class="movie-detail">
    <h1 class="movie-title">{{ response.original_title }}</h1>
    <p class="movie-overview">{{ response.overview }}</p>
    <p class="movie-release-date">Release Date: {{ response.release_date }}</p>
    <a class="movie-site" :href="response.homepage" target="_blank">Official Movie Site</a>
    <p class="movie-runtime">Runtime: {{ response.runtime }} minutes</p>
    <p class="movie-rating">Rating: {{ response.vote_average }} / 10</p>
    <p class="movie-language">Language: {{ response.original_language.toUpperCase() }}</p>
    <p class="movie-status">Status: {{ response.status }}</p>    
    <img :src="`https://image.tmdb.org/t/p/w500${response.poster_path}`" alt="Movie Poster" class="movie-poster" />
    <h2 class="trailers-title">Trailers</h2>
    <div class="trailers-container">
      <div v-for="trailer in response.videos.results" :key="trailer.id" class="trailer-tile">
        <a :href="`https://www.youtube.com/watch?v=${trailer.key}`" target="_blank">
          <img :src="`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`" alt="Trailer"
            class="trailer-thumbnail" />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-detail {
  text-align: center;
  margin: 20px;
}

.movie-title {
  font-size: 2rem;
  font-weight: bold;
}

.movie-overview {
  font-size: 1.1rem;
  margin-top: 10px;
}

.movie-release-date {
  font-size: 1.1rem;
  margin-top: 10px;
}

.movie-site {
  margin-top: 10px;
  font-size: 1.1rem;
}

.movie-poster {
  width: 300px;
  margin-top: 20px;
}

.trailers-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.trailer-tile {
  margin: 10px;
}

.trailer-thumbnail {
  width: 200px;
  height: 113px;
}

.trailers-title {
  margin-top: 30px;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
<script setup lang="ts">
import { ref } from "vue";
import { getAssistantResponse } from "./api/index";

const searchQuery = ref("");
const response = ref("");
const isLoading = ref(false);

async function handleSearch() {
  if (searchQuery.value.trim() === "") return;

  try {
    isLoading.value = true;
    response.value = "Loading...";
    const result = await getAssistantResponse(searchQuery.value);
    response.value = result;
  } catch (error) {
    response.value = "An error occurred while fetching the response.";
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <span class="title">Find My Kanji</span>
    </v-app-bar>

    <v-main>
      <v-container>
        <h1>Welcome to Find My Kanji</h1>
        <p>
          Type a description of the Kanji and press Enter or click the button to
          search.
        </p>

        <v-text-field
          v-model="searchQuery"
          label="Search for a Kanji"
          outlined
          @keyup.enter="handleSearch"
        ></v-text-field>

        <v-btn
          color="primary"
          class="mt-3"
          @click="handleSearch"
          :loading="isLoading"
        >
          Search
        </v-btn>

        <div v-if="isLoading || response" class="response">
          <h2>Response:</h2>
          <p>{{ response }}</p>
        </div>
      </v-container>
    </v-main>

    <v-footer app color="primary" dark>
      <v-container>
        <span>&copy; 2025 Find My Kanji</span>
      </v-container>
    </v-footer>
  </v-app>
</template>

<style scoped>
.title {
  font-size: 1.5rem;
  font-weight: bold;
}

.response {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  color: #333;
  font-family: monospace;
}
</style>

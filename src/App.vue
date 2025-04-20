<script setup lang="ts">
import { ref } from "vue";
import { getAssistantResponse } from "./api/index";

const searchQuery = ref("");
const response = ref("");

async function handleSearch() {
  if (searchQuery.value.trim() === "") return;

  try {
    response.value = "Loading...";
    const result = await getAssistantResponse(searchQuery.value);
    response.value = result;
  } catch (error) {
    response.value = "An error occurred while fetching the response.";
    console.error(error);
  }
}
</script>

<template>
  <VApp>
    <VAppBar app color="primary" dark>
      <span class="title">Find My Kanji</span>
    </VAppBar>

    <VMain>
      <VContainer>
        <h1>Welcome to Find My Kanji</h1>
        <p>Type a description of the Kanji and press Enter to search.</p>

        <VTextField
          v-model="searchQuery"
          label="Search for a Kanji"
          outlined
          @keyup.enter="handleSearch"
        ></VTextField>

        <div v-if="response" class="response">
          <h2>Response:</h2>
          <p>{{ response }}</p>
        </div>
      </VContainer>
    </VMain>

    <VFooter app color="primary" dark>
      <VContainer>
        <span>&copy; 2025 Find My Kanji</span>
      </VContainer>
    </VFooter>
  </VApp>
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

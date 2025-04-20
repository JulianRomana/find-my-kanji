<script setup lang="ts">
  import { ref } from 'vue'
  import { getAssistantResponse } from './api/index'
  import KanjiCard from './components/KanjiCard.vue'
  import type { GetKanjiResponse } from './api/types'

  const searchQuery = ref('')
  const response = ref<GetKanjiResponse | null>(null)
  const isLoading = ref(false)

  async function handleSearch() {
    if (searchQuery.value.trim() === '') return

    try {
      isLoading.value = true
      response.value = null
      const result = await getAssistantResponse(searchQuery.value)
      response.value = result
    } catch (error) {
      console.error('An error occurred while fetching the response:', error)
    } finally {
      isLoading.value = false
    }
  }
</script>

<template>
  <v-app>
    <v-main height="100vh">
      <v-container>
        <h1>Find My Kanji</h1>
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
          :disabled="!searchQuery"
          :loading="isLoading"
        >
          Search
        </v-btn>

        <div v-if="response">
          <kanji-card
            :kanji="response.kanji"
            :radicals="response.radicals"
            :examples="response.examples"
            :sentences="response.sentences"
            :explanation="response.explanation"
          />
        </div>
      </v-container>
    </v-main>
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

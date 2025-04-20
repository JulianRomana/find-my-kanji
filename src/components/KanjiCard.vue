<script setup lang="ts">
  import { defineProps } from 'vue'
  import type { GetKanjiResponse } from '../api/types'

  // Define the props for the component
  defineProps<GetKanjiResponse>()
</script>

<template>
  <v-card class="ma-5" outlined max-width="400">
    <v-card-title class="text-h1">{{ kanji }}</v-card-title>
    <v-card-text>
      <div>
        <p>Meaning:</p>
        <p>{{ explanation }}</p>
      </div>
      <div>
        <span>Radicals:</span>
        <v-list :items="radicals"></v-list>
      </div>
      <div>
        <span>Examples:</span>
        <v-list :items="examples"></v-list>
      </div>
      <div>
        <span>Examples:</span>
        <v-list :items="sentences"></v-list>
      </div>
    </v-card-text>
  </v-card>
</template>

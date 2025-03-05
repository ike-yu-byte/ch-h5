<template>
  <div>提币</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
console.log('route', route.query)
</script>

<style scoped lang="scss"></style>

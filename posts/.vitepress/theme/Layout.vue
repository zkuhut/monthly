<template>
<Layout>
  <template #page-bottom>
    <div class="giscus" />
  </template>
</Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
</script>
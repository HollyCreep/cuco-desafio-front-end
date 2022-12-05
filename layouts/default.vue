<template>
  <v-app>
    <Header class="pb-16" />
    <v-main class="background">
      <div class="ch-container fill-height">
        <Nuxt />
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style lang="scss" scoped>
// header {
//   z-index: 1;
// }

// .background {
//   z-index: 1;
// }
.ch-container {
  transform: translateY(-2rem);
  align-content: flex-start;
  z-index: 2;
}
</style>

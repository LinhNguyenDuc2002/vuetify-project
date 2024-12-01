<template>
  <v-app>
    <v-main>
      <Header></Header>

      <router-view style="margin-top: 3%;" />

      <Footer></Footer>
    </v-main>

    <AppFooter class="position-fixed"/>
  </v-app>
</template>

<script setup>
  //
</script>

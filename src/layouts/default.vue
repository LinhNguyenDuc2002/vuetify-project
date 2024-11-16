<template>
  <v-app>
    <v-main>
      <Header></Header>
      <div class="position-fixed h-100 w-100" style="top: 10%; overflow-y: auto;">
        <router-view/>

        <Footer></Footer>
      </div>
    </v-main>
    <AppFooter class="position-fixed"/>
  </v-app>
</template>

<script setup>
  //
</script>

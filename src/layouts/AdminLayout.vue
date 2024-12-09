<template>
  <v-app>
    <v-main>
      <Header></Header>

      <ToolBar></ToolBar>

      <!-- <Breadcrumbs></Breadcrumbs> -->

      <router-view style="margin-top: 1%; margin-left: 20%;" class="pa-10"/>

      <Footer style="margin-left: 20%;"></Footer>
    </v-main>

    <!-- <AppFooter class="position-fixed"/> -->
  </v-app>
</template>

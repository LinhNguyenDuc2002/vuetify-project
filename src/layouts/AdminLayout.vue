<template>
  <v-app>
    <v-main>
      <Header></Header>

      <ToolBar></ToolBar>

      <router-view style="margin-left: 20%;" class="pa-10"/>

      <Footer style="margin-left: 20%;"></Footer>
    </v-main>
  </v-app>
</template>

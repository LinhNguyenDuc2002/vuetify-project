<template>
  <v-app>
    <v-main>
      <Header></Header>

      <ToolBar></ToolBar>

      <router-view style="margin-left: 20%;" class="bg-grey-lighten-3"/>

      <Footer style="margin-left: 20%;"></Footer>
    </v-main>
  </v-app>
</template>

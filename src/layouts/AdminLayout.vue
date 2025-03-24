<template>
  <v-app>
    <v-main>
      <Header></Header>

      <ToolBar :toolBarItems="toolBarItems"></ToolBar>

      <router-view style="margin-left: 20%;" class="bg-grey-lighten-3"/>

      <Footer style="margin-left: 20%;"></Footer>
    </v-main>
  </v-app>
</template>

<script>
import { AdminToolBarItems } from '@/constants/label_constant';

export default {
    data: () => ({
      toolBarItems: AdminToolBarItems
    }),
}
</script>

<template>
    <v-card class="h-100 position-fixed border-e-thin" style="top: 10%; width: 20%; overflow-y: auto;" elevation="0">
        <v-card-text class="h-100 py-0">
            <v-list class="h-100">
                <v-list-item v-for="(item, index) in toolBarItems" class="pa-0">
                    <v-row no-gutters :key="index"
                        @click="index.child ? selectItem(index, item.path, true) : selectItem(index, item.path, false)"
                        class="menu cursor-pointer font-weight-bold w-100 h-100 pa-2"
                        :class="{ 'parent-chosen': activeIndex === index && item.child, 'child-chosen': activeIndex === index && !item.child }">

                        <v-col cols="2">
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-col>

                        <v-col cols="9" class="d-flex align-center">
                            {{ $t(`${item.title}`) }}
                        </v-col>

                        <v-col cols="1">
                            <v-icon v-if="item.child && activeIndex === index">mdi-chevron-up</v-icon>
                            <v-icon v-else-if="item.child">mdi-chevron-down</v-icon>
                        </v-col>
                    </v-row>

                    <ChildToolBar v-if="item.child && activeIndex === index" :items="item.child"></ChildToolBar>
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script>
import '@/styles/common.css';
import { ToolBarItems } from '@/constants/label_constant';
import ChildToolBar from './ChildToolBar.vue';

export default {
    data: () => ({
        toolBarItems: ToolBarItems,
        activeIndex: 0,
    }),

    methods: {
        selectItem(index, path, child) {
            if(this.activeIndex === index) {
                this.activeIndex = null;
            }
            else {
                this.activeIndex = index;
                if(!child) {
                    this.goToWithPath(path);
                }
            }
        },

        goToWithPath(path) {
            this.$router.push({ path: path });
        },
    }
}
</script>
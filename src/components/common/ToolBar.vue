<template>
    <v-card class="h-100 position-fixed border-e-thin" style="top: 10%; width: 20%; overflow-y: auto;" elevation="0">
        <v-expansion-panels v-model="panel" :disabled="disabled" multiple variant="accordion" elevation="0">
            <v-expansion-panel v-for="(item, index) in toolBarItems" elevation="0">
                <v-expansion-panel-title v-if="item.child" class="menu cursor-pointer font-weight-bold" @click="selectItem(index, null, false)"
                    :class="{ 'parent-chosen': activeIndex === index && activeParent }">
                    <v-row no-gutters>
                        <v-col cols="2" class="d-flex align-center">
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-col>

                        <v-col cols="10" class="d-flex align-center">
                            {{ $t(`${item.title}`) }}
                        </v-col>
                    </v-row>
                </v-expansion-panel-title>
                
                <v-expansion-panel-text v-else class="pt-2 menu cursor-pointer font-weight-bold w-100 h-100" @click="selectItem(index, item.path, false)"
                    :class="{ 'parent-chosen': activeIndex === index && activeParent }" >
                    <v-row no-gutters>
                        <v-col cols="2" class="d-flex align-center">
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-col>

                        <v-col cols="10" class="d-flex align-center">
                            {{ $t(`${item.title}`) }}
                        </v-col>
                    </v-row>
                </v-expansion-panel-text>

                <v-expansion-panel-text v-for="(subItem, subIndex) in item.child" class="pa-0 font-weight-bold">
                    <v-row no-gutters class="menu cursor-pointer pa-2" @click="selectItem(subIndex, subItem.path, true)"
                        :class="{ 'child-chosen': activeIndex === subIndex && activeChild }">
                        <v-col cols="2" class="d-flex align-center">
                            <v-icon>{{ subItem.icon }}</v-icon>
                        </v-col>

                        <v-col cols="10" class="d-flex align-center">
                            {{ $t(`${subItem.title}`) }}
                        </v-col>
                    </v-row>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-card>
</template>

<script>
import '@/styles/common.css';
import { ref } from 'vue'
import { ToolBarItems } from '@/constants/label_constant';
import ChildToolBar from './ChildToolBar.vue';

export default {
    data: () => ({
        toolBarItems: ToolBarItems,
        activeIndex: 0,
        activeChild: false,
        activeParent: true,
        panel: ref([0, 1]),
        disabled: ref(false)
    }),

    methods: {
        selectItem(index, path, child) {
            if(child) {
                this.activeIndex = index;
                this.activeChild = true;
                this.goToWithPath(path);
            }
            else {
                this.activeIndex = index;
                this.activeParent = !this.activeParent;
                if(path !== null) {
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
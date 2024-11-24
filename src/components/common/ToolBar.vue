<template>
    <v-card class="h-100 border-thin position-fixed" style="top: 10%; width: 20%; overflow-y: auto;" elevation="0">
        <v-card-text class="h-100 py-0">
            <v-list class="h-100">
                <v-list-item
                    v-for="(item, index) in toolBarItems"
                    :key="index"
                    @click="selectItem(index, item.path)"
                    class="menu cursor-pointer font-weight-bold"
                    :class="{ chosen: activeIndex === index }">
                    <v-row class="w-100 h-100" no-gutters>
                        <v-col cols="2">
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-col>

                        <v-col cols="9" class="d-flex align-center">
                            {{ $t(`${item.title}`) }}
                        </v-col>

                        <v-col cols="1">
                            <v-icon v-if="item.child">mdi-chevron-down</v-icon>
                        </v-col>
                    </v-row>
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script>
import '@/styles/common.css';
import { ToolBarItems } from '@/constants/label_constant';

export default {
    data: () => ({
        toolBarItems: ToolBarItems,
        activeIndex: 0
    }),

    methods: {
        selectItem(index, path) {
            this.activeIndex = index;
            this.goToWithPath(path);
        },

        goToWithPath(path) {
            this.$router.push({ path: path });
        },
    }
}
</script>
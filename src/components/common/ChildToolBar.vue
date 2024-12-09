<template>
    <v-card elevation="0">
        <v-card-text class="h-100 pa-0">
            <v-list class="h-100 py-0">
                <v-list-item class="pa-0" v-for="(item, index) in items">
                    <v-row class="menu cursor-pointer font-weight-bold w-100 h-100 pa-2" no-gutters
                        :key="index" 
                        :class="{ 'parent-chosen': activeIndex === index && item.child, 'child-chosen': activeIndex === index && !item.child }"
                        @click="index.child ? selectItem(index, item.path, true) : selectItem(index, item.path, false)">
                        <v-col cols="2"></v-col>

                        <v-col cols="9" class="d-flex align-center">
                            {{ $t(item.title) }}
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

export default {
    data: () => ({
        activeIndex: null,
    }),

    props: {
        items: {
            type: Array,
            required: false
        }
    },

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
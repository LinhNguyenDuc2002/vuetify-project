<template>
    <v-card elevation="0">
        <v-expansion-panels class="w-100" variant="accordion" elevation="0">
            <v-expansion-panel v-for="(item, index) in items" class="pa-0" style="height: 50px;">
                <template v-slot:default>
                    <v-row no-gutters :key="index"
                        @click="index.child ? selectItem(index, item.path, true) : selectItem(index, item.path, false)"
                        class="menu cursor-pointer font-weight-bold w-100 h-100 pa-2"
                        :class="{ 'parent-chosen': activeIndex === index && item.child, 'child-chosen': activeIndex === index && !item.child }">

                        <v-col cols="2" class="d-flex align-center">
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-col>

                        <v-col cols="9" class="d-flex align-center">
                            {{ $t(`${item.title}`) }}
                        </v-col>

                        <v-col cols="1" class="d-flex align-center">
                            <v-icon v-if="item.child && activeIndex === index">mdi-chevron-up</v-icon>
                            <v-icon v-else-if="item.child">mdi-chevron-down</v-icon>
                        </v-col>
                    </v-row>

                    <ChildToolBar v-if="item.child && activeIndex === index" :items="item.child"></ChildToolBar>
                </template>
            </v-expansion-panel>
        </v-expansion-panels>
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
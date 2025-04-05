<template>
    <v-card class="h-100 position-fixed border-e-thin" style="top: 10%; width: 20%; overflow-y: auto;" elevation="0">
        <v-expansion-panels variant="accordion" elevation="0"> <!-- multiple -->
            <v-expansion-panel v-for="(item, index) in toolBarItems" elevation="0">
                <v-expansion-panel-title v-if="item.child" class="menu cursor-pointer font-weight-bold" @click="selectItem(index, null, false)"
                    :class="{ 'parent-chosen': parentIndex === index}" collapse-icon="mdi-minus" expand-icon="mdi-plus">
                    <v-row no-gutters>
                        <v-col cols="2" class="d-flex align-center">
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-col>

                        <v-col cols="10" class="d-flex align-center">
                            {{ $t(`${item.title}`) }}
                        </v-col>
                    </v-row>

                    <!-- <template v-slot:actions="{ expanded }">
                        <v-icon :color="!expanded ? 'teal' : ''" :icon="expanded ? 'mdi-pencil' : 'mdi-check'"></v-icon>
                    </template> -->
                </v-expansion-panel-title>
                
                <v-expansion-panel-title v-else class="pt-2 menu cursor-pointer font-weight-bold w-100 h-100" @click="selectItem(index, item.path, false)"
                    :class="{ 'parent-chosen': parentIndex === index}" collapse-icon="" expand-icon="">
                    <v-row no-gutters>
                        <v-col cols="2" class="d-flex align-center">
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-col>

                        <v-col cols="10" class="d-flex align-center">
                            {{ $t(`${item.title}`) }}
                        </v-col>
                    </v-row>
                </v-expansion-panel-title>

                <v-expansion-panel-text v-if="item.child" v-for="(subItem, subIndex) in item.child" class="pa-0 font-weight-bold">
                    <v-row no-gutters class="menu cursor-pointer pa-2" @click="selectItem(subIndex, subItem.path, true)"
                        :class="{ 'child-chosen': childIndex === subIndex}">
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

<style>
.no-arrow {
  /* CSS để ẩn mũi tên */
  .v-input__append-inner {
    display: none;
  }
}
</style>

<script>
import '@/styles/common.css';

export default {
    data: () => ({
        parentIndex: 0,
        childIndex: null,
    }),

    props: {
        toolBarItems: {
            type: Array,
            required: true
        }
    },

    methods: {
        selectItem(index, path, child) {
            if(child) {
                this.childIndex = index;
            }
            else {
                this.parentIndex = index;
                this.childIndex = null;
            }

            if(path !== null) {
                this.$router.push({ path: path });
            }
        },

        goToWithPath(path) {
            this.$router.push({ path: path });
        },
    }
}
</script>
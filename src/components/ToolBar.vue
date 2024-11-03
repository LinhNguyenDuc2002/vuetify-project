<template>
    <v-card class="position-fixed h-screen border-thin" style="padding-top: 5%; width: 20%;" elevation="0">
        <!-- <v-card-title>Tool Bar</v-card-title> -->

        <v-card-text class="h-100 py-0">
            <v-list class="h-100">
                <v-list-item
                    v-for="(item, index) in toolBarItems"
                    :key="index"
                    class="cursor-pointer font-weight-bold">
                    <v-row class="w-100 h-100" no-gutters>
                        <v-col cols="2">
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-col>

                        <v-col cols="9">
                            {{ $t(`${item.title}`) }}
                        </v-col>

                        <v-col cols="1">
                            <v-icon>mdi-chevron-down</v-icon>
                        </v-col>
                    </v-row>
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script>
import { ToolBarItems } from '@/constants/label_constant';

export default {
    data: () => ({
        toolBarItems: ToolBarItems
    }),

    methods: {
        goTo(page) {
            this.$router.push({ name: page });
        },
    }
}
</script>
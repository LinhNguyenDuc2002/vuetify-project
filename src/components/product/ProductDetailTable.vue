<template>
    <div class="mt-5">
        <div class="d-flex justify-between align-center">
            <div class="w-25 mr-auto">
                <v-select
                    density="compact"
                    :placeholder="$t('username')"
                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                    variant="outlined">
                </v-select>
            </div>

            <div class="w-25 pb-6 d-flex justify-between align-center">
                <v-btn class="mr-auto" style="width: 45%;" color="blue" @click="changeOpenDialog(true)">
                    <v-icon class="mr-3">mdi-plus</v-icon>Thêm
                </v-btn>

                <v-btn style="width: 45%;" color="blue">
                    <v-icon class="mr-3">mdi-trash-can-outline</v-icon>Xóa
                </v-btn>
            </div>
        </div>

        <div class="border-thin">
            <v-data-table
                v-model="selected"
                :items="items"
                item-value="name"
                elevation="8"
                show-select>
            </v-data-table>
        </div>
    </div>

    <AddProductDetail v-if="openDialog" :openDialog="this.openDialog" @change-open-dialog="changeOpenDialog"></AddProductDetail>
</template>

<script>
import AddProductDetail from './AddProductDetail.vue';

export default {
    data() {
        return {
            openDialog: false,
            selected: [],
            items: [
            {
                name: '🍎 Apple',
                location: 'Washington',
                height: '0.1',
                base: '0.07',
                volume: '0.0001',
            },
            {
                name: '🍌 Banana',
                location: 'Ecuador',
                height: '0.2',
                base: '0.05',
                volume: '0.0002',
            },
            {
                name: '🍇 Grapes',
                location: 'Italy',
                height: '0.02',
                base: '0.02',
                volume: '0.00001',
            },
            {
                name: '🍉 Watermelon',
                location: 'China',
                height: '0.4',
                base: '0.3',
                volume: '0.03',
            },
            {
                name: '🍍 Pineapple',
                location: 'Thailand',
                height: '0.3',
                base: '0.2',
                volume: '0.005',
            },
            {
                name: '🍒 Cherries',
                location: 'Turkey',
                height: '0.02',
                base: '0.02',
                volume: '0.00001',
            },
            {
                name: '🥭 Mango',
                location: 'India',
                height: '0.15',
                base: '0.1',
                volume: '0.0005',
            },
            {
                name: '🍓 Strawberry',
                location: 'USA',
                height: '0.03',
                base: '0.03',
                volume: '0.00002',
            },
            {
                name: '🍑 Peach',
                location: 'China',
                height: '0.09',
                base: '0.08',
                volume: '0.0004',
            },
            {
                name: '🥝 Kiwi',
                location: 'New Zealand',
                height: '0.05',
                base: '0.05',
                volume: '0.0001',
            },
            ],
        }
    },

    methods: {
        changeOpenDialog(value) {
            this.openDialog = value;
        }
    }
}
</script>

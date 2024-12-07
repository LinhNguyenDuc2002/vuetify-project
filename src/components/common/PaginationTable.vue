<template>
    <div class="pt-5 border-t-thin d-flex justify-end w-100">
        <div class="d-flex align-center mx-5" style="width: 20%;">
            <p class="text-center mb-5 mr-3">Items:</p>

            <v-select
                v-model="selected"
                :items="pagination"
                item-value="id"
                item-title="value"
                density="compact"
                variant="outlined">
            </v-select>
        </div>

        <div class="d-flex align-center mb-5 mx-5">
            <p class="text-center">{{ page }} of {{ total }}</p>
        </div>

        <div class="d-flex align-center mb-5 mx-5">
            <v-icon class="cursor-pointer mx-2" :class="page > 0 ? 'selected-arrow' : 'arrow'">mdi-page-first</v-icon>
            <v-icon class="cursor-pointer mx-2" :class="page > 0 ? 'selected-arrow' : 'arrow'">mdi-chevron-left</v-icon>
            <v-icon class="cursor-pointer mx-2" :class="page < total ? 'selected-arrow' : 'arrow'">mdi-chevron-right</v-icon>
            <v-icon class="cursor-pointer mx-2" :class="page < total ? 'selected-arrow' : 'arrow'">mdi-page-last</v-icon>
        </div>
    </div>
</template>

<script>
import { PAGINATION } from '@/constants/variable_constant';

export default {
    data() {
        return {
            selected: 5,
            pagination: PAGINATION,
            page: 0,
            total: 100
        }
    }
}
</script>
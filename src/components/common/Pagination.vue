<template>
    <div class="text-center">
      <v-pagination v-model="pageCurrent" :length="length" :total-visible="totalVisible"></v-pagination>
    </div>
</template>
  
<script>
import { TOTAL_PAGE_VISIBLE } from '@/constants/variable_constant';

export default {
    data() {
        return {
            totalVisible: TOTAL_PAGE_VISIBLE,
            pageCurrent: this.page,
        }
    },

    props: {
        page: {
            type: Number,
            required: true
        },

        length: {
            type: Number,
            required: true
        }
    }
}
</script>
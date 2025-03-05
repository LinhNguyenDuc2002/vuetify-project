<template>
    <v-card class="product-card pa-2 cursor-pointer" style="height: 300px;">
        <div style="height: 65%;">
            <v-img class="h-100" src="/src/assets/logo.png"></v-img>
        </div>

        <div style="height: 35%;">
            <p class="truncate mb-2">{{ product.name }}</p>

            <div class="d-flex justify-space-between">
                <div>
                    <p class="strikethrough price" style="font-size: 12px;">{{ formatVND(125000000) }}</p>
                    <p class="price" style="font-size: 15px;">{{ formatVND(product.price) }}</p>
                </div>
                <p class="d-flex align-end" style="font-size: 10px;">{{ $t('product.sold') }}: {{ product.sold }}</p>
            </div>
        </div>
    </v-card>
</template>

<script>
import { formatVND } from '@/services/util/StringUtil';
export default {
    data: () => ({

    }),

    props: {
        product: {
            type: Object,
            required: true
        }
    },

    methods: {
        formatVND(value) {
            return formatVND(value);
        }
    }
}
</script>

<style>
.truncate {
    display: -webkit-box; /* Sử dụng Flexbox cho các trình duyệt hỗ trợ */
    -webkit-box-orient: vertical; /* Định hướng theo chiều dọc */
    -webkit-line-clamp: 2; /* Giới hạn số dòng hiển thị */
    overflow: hidden; /* Ẩn phần văn bản vượt quá */
    text-overflow: ellipsis; /* Hiển thị dấu "..." */
    line-height: 1.5; /* Điều chỉnh chiều cao dòng nếu cần */
    max-height: 3em; /* Chiều cao tối đa cho 2 dòng */
}
.strikethrough {
  text-decoration: line-through; /* Gạch ngang chữ */
}
.product-card {
  transition: transform 0.3s ease;
}
.product-card:hover {
  transform: scale(1.05); /* Tăng kích thước lên 10% khi hover */
  border: 1px solid #03A9F4;
}
</style>
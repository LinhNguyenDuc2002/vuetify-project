<script setup lang="ts">
import Title from '@/components/common/Title.vue';
import OrderList from '@/components/order/OrderList.vue';
</script>

<template>
    <div class="pa-4" style="margin-top: 70px;">
        <Title title="Đơn hàng của bạn"></Title>

        <OrderList></OrderList>
    </div>
</template>
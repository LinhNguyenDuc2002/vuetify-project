<script setup lang="ts">
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import AddProduct from '@/components/product/AddProduct.vue';
import ProductDetailTable from '@/components/product/ProductDetailTable.vue';
</script>

<template>
    <div style="left: 20%">
        <AddProduct></AddProduct>

        <ProductDetailTable></ProductDetailTable>
    </div>
</template>
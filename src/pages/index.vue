<template>
    <div class="bg-white w-100" style="height: 500px; margin-top: 3%;">
        <div class="h-100 w-100" style="padding: 0px 128px">
            <Carousel></Carousel>
        </div>
    </div>

    <ProductList></ProductList>
</template>

<script setup>
import ProductList from '@/components/ProductList.vue';
import Carousel from '../components/Carousel.vue';


</script>

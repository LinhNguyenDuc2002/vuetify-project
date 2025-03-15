<template>
    <div class="title pa-3 rounded bg-white">
        <p v-if="title">{{ title }}</p>
    </div>
</template>

<script>
import '@/styles/common.css';

export default {
    props: {
        title: {
            type: String,
            required: true
        },
    }
}
</script>
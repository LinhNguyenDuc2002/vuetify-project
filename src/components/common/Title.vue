<template>
    <div class="font-weight-bold text-caption mb-5">
        <h1 v-if="title">{{ title }}</h1>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
    }
}
</script>
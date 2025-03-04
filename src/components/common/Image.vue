<template>
    <v-card elevation="0">
        <v-img max-width="100%" max-height="100%" :src="imageUrl"></v-img>
    </v-card>
</template>

<script>
export default {
    data() {
    },

    props:{
        imageUrl: {
            type: String,
            required: true
        },
    },
}
</script>
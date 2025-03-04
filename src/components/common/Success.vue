<template>
    <v-card class="py-8 px-6 text-center mx-auto" elevation="8" max-width="450" width="100%">
        <v-icon color="green" size="50">mdi-check-circle</v-icon>
    
        <div class="text-body-2 my-3" v-html="message"></div>
    
        <v-btn class="my-4" color="green" height="40" variant="flat" width="50%" :to="{ name: page }">OK</v-btn>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    
    props: {
        message: {
            type: String,
            required: true
        },

        page: {
            type: String,
            required: true
        }
    }
}
</script>
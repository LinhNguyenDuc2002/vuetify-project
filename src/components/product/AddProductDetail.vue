<template>
    <div class="text-center pa-4">
        <!-- <v-btn @click="dialog = true"> Open Dialog </v-btn> -->

        <v-dialog v-model="dialog" width="auto" @click:outside="changeDialog">
            <v-card
                max-width="400"
                prepend-icon="mdi-update"
                text="Your application will relaunch automatically after the update is complete."
                title="Update in progress">
                <!-- <template v-slot:actions>
                    <v-btn class="ms-auto" text="Ok" @click="dialog = false"></v-btn>
                </template> -->
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialog: this.openDialog,
        }
    },

    props:{
        openDialog: {
            type: Boolean,
            required: true
        }
    },

    methods: {
        changeDialog() {
            this.dialog = !this.dialog;
            this.$emit('change-open-dialog', this.dialog);
        }
    }
}
</script>
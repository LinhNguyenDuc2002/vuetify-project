<template>
    <div class="text-center">
        <v-dialog v-model="dialog" class="d-flex justify-center" max-width="30%" max-height="40%" persistent>
            <v-card class="pa-10 h-100 w-100">
                <v-card-title v-if="title" class="title pa-0">{{ title }}</v-card-title>

                <div class="w-100 mb-5">
                    <p>{{ message }}</p>
                </div>

                <div class="d-flex justify-between">
                    <v-btn class="mr-auto" style="width: 25%;" color="blue" @click="changeDialog">No</v-btn>
                    <v-btn style="width: 25%;" color="blue" @click="closeDialog">Yes</v-btn>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import '@/styles/common.css';

export default {
    data() {
        return {
            dialog: this.popUpDialog,
        }
    },

    props:{
        popUpDialog: {
            type: Boolean,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: false
        }
    },

    methods: {
        changeDialog() {
            this.dialog = !this.dialog;
            this.$emit('update-popup-dialog', this.dialog);
        },

        closeDialog() {
            this.changeDialog();
            this.$emit('update-parent-dialog');
        }
    }
}
</script>
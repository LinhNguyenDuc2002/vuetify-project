<script setup lang="ts">

</script>

<template>
    <div>
        <Title title="Thêm sản phẩm mới"></Title>

        <div class="d-flex justify-between align-center w-100">
            <div class="h-100 w-50 mr-16">
                <div class="text-subtitle-1 text-medium-emphasis">{{ $t('username') }}</div>
                <v-text-field density="compact" :placeholder="$t('username')"
                variant="outlined"></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis">{{ $t('username') }}</div>
                <v-select
                    density="compact"
                    :placeholder="$t('username')"
                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                    variant="outlined">
                </v-select>
            </div>

            <div class="w-25">
                <v-file-input
                    accept="image/*"
                    label="File input">
                </v-file-input>
            </div>
        </div>

        <div class="w-100">
            <div class="text-subtitle-1 text-medium-emphasis">{{ $t('username') }}</div>

            <v-col class="pa-0" cols="12" sm="6" style="max-width: 100%;">
                <v-textarea
                    class="w-100"
                    variant="outlined"
                    auto-grow
                    shaped>
                </v-textarea>
            </v-col>
        </div>
    </div>
</template>
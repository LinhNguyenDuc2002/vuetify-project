<template>
    <div class="position-fixed w-100 bg-white" style="top: 10%; left: 20%; z-index: 1; height: 5%">
        <v-breadcrumbs class="h-100" :items="items">
            <template v-slot:divider>
                <v-icon icon="mdi-chevron-right"></v-icon>
            </template>
        </v-breadcrumbs>
    </div>
</template>

<script>
    export default {
    data: () => ({
        items: [
            {
                title: 'Dashboard',
                disabled: false,
                href: 'breadcrumbs_dashboard',
            },
            {
                title: 'Link 1',
                disabled: false,
                href: 'breadcrumbs_link_1',
            },
            {
                title: 'Link 2',
                disabled: true,
                href: 'breadcrumbs_link_2',
            },
        ],
    }),
  }
</script>
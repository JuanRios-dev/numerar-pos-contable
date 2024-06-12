<template>
    <MainLayout>
        <h1>Home Principal - {{ token }}</h1>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue'
import { defineComponent } from 'vue'
import { useAuthStore } from '../store/AuthStore'

export default defineComponent({
    name: 'HomeView',
    components: {
        MainLayout
    },
    setup() {
        const token = useAuthStore().getToken

        return {
            token
        };
    }
});
</script>

<style scoped lang="scss">
h1 {
    color: $primary-color;
}
</style>
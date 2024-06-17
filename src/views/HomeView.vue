<template>
    <MainLayout>
        <h1>Bienvenido {{ user.nombre }}</h1>
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
        const user = useAuthStore().getUser

        return {
            user
        };
    }
});
</script>

<style scoped lang="scss">
h1 {
    color: $primary-color;
    margin: 0;
}
</style>
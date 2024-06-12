<template>
    <MainLayout>
        <h1>Post Details</h1>
        <div class="post-container">
            <div class="post-card">
                <h3>{{ post.title }}</h3>
                <p>{{ post.body }}</p>
            </div>
            <router-link :to="{ name: 'Posts' }">Volver Atras</router-link>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue';
import PostService from '@/services/PostService';
import { useRoute } from 'vue-router';
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
    name: 'PostDetails',
    components: {
        MainLayout
    },
    setup() {
        const service = new PostService();
        const post = service.getPost();
        const postId = useRoute().params.id;

        onMounted(async () => {
            await service.fetchById(postId);
        });

        return {
            post
        };
    }
})
</script>

<style lang="scss" scoped>
.post-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
}
.post-card {
    border: 1px solid $secondary-color;
    padding: 16px;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h3 {
        color: $primary-color;
    }
}
</style>
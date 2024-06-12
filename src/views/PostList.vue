<template>
  <MainLayout>
    <h1>Home Principal - {{ token }}</h1>
    <ul>
      <li v-for="post in posts.slice(0, 30)" :key="post.id">
        <router-link :to="{ name: 'PostDetails', params: { id: post.id } }">
          {{ post.title }}
        </router-link>
      </li>
    </ul>
  </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue'
import PostService from '@/services/PostService'
import { defineComponent, onMounted } from 'vue'
import { useAuthStore } from '../store/AuthStore'

export default defineComponent({
  name: 'PostList',
  components: {
    MainLayout
  },
  setup() {
    const service = new PostService();
    const posts = service.getPosts();
    const token = useAuthStore().getToken

    onMounted(async () => {
      await service.fetchAll();
    });

    return {
      posts,
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

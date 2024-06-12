import { ref } from 'vue'

class PostService {
    constructor() {
        this.posts = ref([])
        this.post = ref({})
    }

    getPosts() {
        return this.posts
    }

    getPost() {
        return this.post
    }

    //Get all Posts
    async fetchAll() {
        try {
            const url = 'https://jsonplaceholder.typicode.com/posts'
            const response = await fetch(url)
            const json = await response.json()
            this.posts.value = json
        } catch (error) {
            console.log(error)
        }
    }

    //Get at Post
    async fetchById(id){
        try {
            const url = `https://jsonplaceholder.typicode.com/posts/${id}`
            const response = await fetch(url)
            const json = await response.json()
            this.post.value = json
        } catch (error) {
            console.log(error)
        }
    }
}

export default PostService

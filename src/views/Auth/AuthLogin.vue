<template>
    <div class="auth-container">
        <div class="auth-form">
            <h1>Iniciar sesión</h1>
            <form>
                <input type="email" placeholder="Correo electrónico" autocomplete="on" v-model="email">
                <input type="password" placeholder="Contraseña" v-model="password">
                <button type="submit" @click.prevent="loginAuth()">Iniciar sesión</button>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { defineComponent } from 'vue'
import { useAuthStore } from '@/store/AuthStore.js'

export default defineComponent({
    name: 'AuthLogin',
    setup() {
        let email = ref('')
        let password = ref('')

        const loginAuth = async () => {
            const auth = new useAuthStore()
            const sucess = await auth.login(email.value, password.value)
            if (sucess) {
                window.location.href = '/'
            } else {
                alert('Login Incorreto')
            }
        }

        return {
            email,
            password,
            loginAuth
        }
    }
})
</script>
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('Auth', {
    state: () => {
        return {
            user: null,
            token: null,
        }
    },
    getters: {
        getToken: (state) => state.token,
        getUser: (state) => state.user,
    },
    actions: {
        async login(email, password) {
            try {
                const res = await fetch('http://numerar_api.local/api/v1/login', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                })

                const response = await res.json()

                if ('error' in response) {
                    console.log('Error de credenciales')
                    return false
                }

                this.user = response.user
                this.token = response.token

                return true
            } catch (error) {
                console.log(error)
            }
        }
    },
    persist: true,
})

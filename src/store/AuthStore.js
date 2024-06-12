import { defineStore } from 'pinia'

export const useAuthStore = defineStore('Auth', {
    state: () => {
        return {
            token: null,
        }
    },
    getters: {
        getToken: (state) => state.token,
    },
    actions: {
        async login(email, password) {
            try {
                const res = await fetch('https://reqres.in/api/login', {
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
                this.token = response.token
                return true
            } catch (error) {
                console.log(error)
            }
        }
    },
    persist: true,
})

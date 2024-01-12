import axios from '@/plugins/axios'
import { defineStore } from 'pinia'

export const taskService = defineStore('taskService', {
    actions: {
        // 👉 Fetch all stores
        fetchTaskList(params) {
          return axios.get('/api/v1/task', { params })
        },

        // 👉 Add User
        addTask(form) {
            return new Promise((resolve, reject) => {
                axios.post('/api/v1/task', form)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

        getTask(id) {
            return new Promise((resolve, reject) => {
                axios.get(`/api/v1/task/${id}`)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

        updateTask(form, id) {
            return new Promise((resolve, reject) => {
                axios.put(`/api/v1/task/${id}`, form)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

        removeTask(id) {
            return new Promise((resolve, reject) => {
                axios.delete(`/api/v1/task/${id}`)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },
    },
})

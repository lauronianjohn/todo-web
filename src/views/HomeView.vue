<script setup>
import { ref, watchEffect } from 'vue'
import TheWelcome from '../components/TheWelcome.vue'
import FormDialog from '@/components/dialogForm.vue'
import { taskService } from '@/stores/task'

const isTaskFormVisible = ref(false)
const apiTask = taskService()
const tasks = ref([])
const errors = ref()
const taskId = ref()
const editMode = ref(false);
const task = ref()

const fetchTasks = () => {
    apiTask.fetchTaskList()
    .then(response => {
        tasks.value = response.data.data
    })
}

const editTask = (id) => {
    isTaskFormVisible.value = true;
    taskId.value = id
    editMode.value = true;
    apiTask.getTask(id)
        .then(response => {
            task.value = response.data.data;
        }).catch(error => {
            alert(error.response.data.errors);
        })
}

const formSubmit = (taskData) => {
    if(!editMode.value) {
        apiTask.addTask(taskData)
            .then(() => {
                isTaskFormVisible.value = false;
                fetchTasks()
            }).catch(error => {
                alert(error.response.data.errors);    
            })
    } else {
        apiTask.updateTask(taskData, taskId.value)
            .then(() => {
                isTaskFormVisible.value = false;
                fetchTasks()
            }).catch(error => {
                alert(error.response.data.errors);    
            })
    }
}

const removeTask = id => {
    apiTask.removeTask(id)
            .then(() => {
                alert('Successfully deleted');
                fetchTasks()
            }).catch(error => {
                alert(error.response.data.errors);
                
            })
}

watchEffect(fetchTasks)
</script>

<template>
    <button 
        class="mb-5 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
        type="button"
        @click="isTaskFormVisible = true"
    >
        Add Task
    </button>
    <table class="min-w-full leading-normal mt-5">
        <thead>
            <tr>
                <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Task
                </th>
                <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Description
                </th>
                <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="task in tasks" :key="task.id">
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">{{ task.name }}</p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">{{ task.description }}</p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                    <button 
                        class="me-5 mb-5 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
                        type="button"
                        @click="editTask(task.id)"
                    >
                        Edit
                    </button>
                    <button 
                        class="mb-5 rounded-md bg-rose-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
                        type="button"
                        @click="removeTask(task.id)"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
    <FormDialog 
        v-model:isDialogVisible="isTaskFormVisible"
        v-model:edit-mode="editMode"
        @taskData="formSubmit"
        :data = task
    />
</template>
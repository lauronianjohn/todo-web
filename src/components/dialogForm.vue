<script setup>
import { ref, watch, toRaw, nextTick  } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const props = defineProps({  
    isDialogVisible: {
        type: Boolean,
        required: true,
    },
    editMode: {
        type: Boolean,
        required: true,
    },
    data: {
        type: Object,
        required: true,
    },
    error: { type: Object, default: () => {} },
})

const open = ref(false)
const isEdit = ref(false)
const taskForm = ref({
    id: '',
    name: '',
    description: '',
})

watch(props, () => {
    open.value = structuredClone(toRaw(props.isDialogVisible))
    isEdit.value = structuredClone(toRaw(props.editMode))
    // errorForm.value = structuredClone(toRaw(props.error))

    if(isEdit.value){
        const data = structuredClone(toRaw(props.data))
        taskForm.value = {
            name: data?.name,
            description: data?.description,
        }
    }
})

const emit = defineEmits([
  'taskData',
  'update:isDialogVisible',
  'update:editMode',
//   'update:error',
])

const onSubmit = () => {
    emit('taskData', {
        task_id: taskForm.value.id,
        name: taskForm.value.name,
        description: taskForm.value.description,
    })
}

const closeDialog = () => {
    emit('update:isDialogVisible', false)
    emit('update:editMode', false)
    emit('update:error', {})
    nextTick(() => {
        taskForm.value = {
            name: '',
            description: '',
        }
    })
}


</script>
<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="closeDialog">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                        <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">{{isEdit ? 'Edit' : 'Add'}} Task</DialogTitle>
                        </div>
                    </div>
                    <form class="sm:mx-4">
                        <div class="mt-5 grid">
                            <div>
                                <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                <div class="mt-2">
                                <input type="text" v-model="taskForm.name" id="street-address" autocomplete="street-address" class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                        </div>
                        <div class="mt-5 grid">
                            <div>
                                <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                <div class="mt-2">
                                <input type="text" v-model="taskForm.description" id="street-address" autocomplete="street-address" class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" @click="onSubmit">Submit</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="closeDialog">Cancel</button>
                </div>
                </DialogPanel>
            </TransitionChild>
            </div>
        </div>
        </Dialog>
    </TransitionRoot>
</template>

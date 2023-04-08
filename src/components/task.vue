<template>
    <div class="flex justify-between align-center p-2 rounded bg-green-500">
        <button @click="$emit('changeStatus')">
            <v-icon name="fa-regular-check-circle" v-if="props.task.isCompleted"/>
            <v-icon name="fa-regular-circle" v-else/>
        </button>

        <p :class="{'line-through' : props.task.isCompleted}"> {{ props.task.description }} </p>

        <button @click="$emit('deleteTask')">
            <v-icon name="oi-trash" />
        </button>
    </div>
</template>

<script setup>
    const props = defineProps(['task'])
</script>
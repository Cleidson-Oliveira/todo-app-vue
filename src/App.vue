<template>
  <div class="max-w-lg p-4 rounded m-auto bg-purple-700">
    <h1 class="w-full text-center font-semibold text-2xl text-white">
      Todo App
    </h1>

    <form 
      @submit.prevent="saveTasks"
      class="flex justify-between w-full pr-2 rounded my-4 bg-gray-100"
    >
      <input
        type="text"
        placeholder="Qual sua nova tarefa?"
        v-model="taskDescription"
        class="w-full p-2 outline-none bg-transparent"
      >
      <button type="submit">
        <v-icon name="io-add-outline" />
      </button>
    </form>

    <div class="flex flex-col gap-2">
      <div>
        <h2
          v-if="tasks[0]"
          class="w-full text-center font-semibold text-lg text-white"
        >
          Suas Tarefas
        </h2>
        <h2
          v-else
          class="w-full text-center font-semibold text-lg text-white"
        >
          Nenhuma tarefa cadastrada
        </h2>
      </div>
      
      <Task 
        v-for="task in tasks"
        :task="task"
        @deleteTask="deleteTask(task.id)"
        @changeStatus="updateTaskStatus(task.id)"
      />      
    </div>
  </div>

</template>

<script>
import Task from "./components/task.vue";
import _ from "lodash";

export default {
  data() {
    return {
      taskDescription: '',
      tasks: [],
    }
  },
  components: {
    Task
  },
  mounted () {
    this.tasks = this.getTasks() || [];
  },
  methods: {
    updateTaskStatus(id) {
      this.tasks = this.tasks.map(task => {
        return task.id === id ? {...task, isCompleted: !task.isCompleted} : task
      })

      localStorage.setItem("@TodoVue", JSON.stringify(this.tasks))
    },
    getTasks () {
      const savedTasks = localStorage.getItem("@TodoVue");
      console.log(this.tasks, savedTasks)
      return JSON.parse(savedTasks)
    },
    saveTasks () {
      if (this.taskDescription == "") { return }
      this.tasks.push({description: this.taskDescription, isCompleted: false, id: _.uniqueId()})
      localStorage.setItem("@TodoVue", JSON.stringify(this.tasks))
      this.taskDescription = ""
    },
    deleteTask (id) {
      this.tasks = this.tasks.filter((task) => {
        return task.id != id
      })
      localStorage.setItem("@TodoVue", JSON.stringify(this.tasks))
    }
  },
}
</script>

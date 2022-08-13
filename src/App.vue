<template>
  <div class="app-conteiner">
    <span>
      <h1>
        Todo App
      </h1>
    </span>
    <form @submit.prevent="saveTasks">
      <input type="text" v-model="taskDescription" placeholder="Qual sua nova tarefa?">
      <button type="submit">
        <v-icon name="io-add-outline" />
      </button>
    </form>
    <div class="tasks">
      <div>
        <h2 v-if="tasks[0]">Suas Tarefas</h2>
        <h2 v-else>Nenhuma tarefa cadastrada</h2>
      </div>
      <div v-for="(task, index) in tasks" class="task">
        <button @click="() => updateTaskStatus(index)">
          <v-icon name="fa-regular-check-circle" v-if="task.isCompleted"/>
          <v-icon name="fa-regular-circle" v-else/>
        </button>
        <p>
          {{task.description}}
        </p>
        <button @click="() => deleteTask(index)">
          <v-icon name="oi-trash" />
        </button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      taskDescription: '',
      tasks: this.getTasks() || [],
    }
  },
  methods: {
    updateTaskStatus(index) {
      this.tasks[index].isCompleted = !this.tasks[index].isCompleted
      localStorage.setItem("@TodoVue", JSON.stringify(this.tasks))
    },
    getTasks () {
      const savedTasks = localStorage.getItem("@TodoVue");
      console.log(this.tasks, savedTasks)
      return JSON.parse(savedTasks)
    },
    saveTasks () {
      if (this.taskDescription == "") { return }
      this.tasks.push({description: this.taskDescription, isCompleted: false})
      localStorage.setItem("@TodoVue", JSON.stringify(this.tasks))
      this.taskDescription = ""
    },
    deleteTask (index) {
      this.tasks = this.tasks.filter((_, i) => {
        return index != i
      })
      localStorage.setItem("@TodoVue", JSON.stringify(this.tasks))
    }
  },
}
</script>

<style scoped>

.app-conteiner {
  min-width: 350px;
  padding: 1rem;
  background-color: #36a1a161;
  border-radius: .8rem;
}

form {
  display: flex;
  width: 100%;
  height: 2.5rem;
  border-radius: .5rem;
  overflow: hidden;
}

form input {
  flex-grow: 10;
  border: none;
  padding-left: 1rem;
  box-sizing: border-box;
  background-color: #0000001f;
}

form input:focus-visible {
  outline: none;
}

form button {
  width: unset;
}

.tasks {
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.5rem;
  border-radius: .5rem;
  overflow: hidden;
  background: #0000001f;
}

.task p {
  flex-grow: 9;
}

.task button {
  height: 100%;
  width: unset;
}

</style>

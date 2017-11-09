<template>
    <Card id="main-card" :class="classSection">
      <p slot="title">{{ title }}</p>
      <boardCard v-for="(task, index) in tasks" :task="task" :key="index" @showDetail="showDetail"></boardCard>
    </Card>
</template>

<script>
import boardCard from './boardCard'
export default {
  props: ['title', 'tasks'],
  components: {
    boardCard
  },
  computed: {
    classSection () {
      switch (this.title) {
        case 'Back Log':
          return 'back-log'
        case 'To-Do':
          return 'to-do'
        case 'Doing':
          return 'doing'
        case 'Done':
          return 'done'
        default:
          return 'back-log'
      }
    },
    tasksSection () {
      return this.tasks
    }
  },
  methods: {
    showDetail (task) {
      this.$emit('showDetail', task)
    }
  }
}
</script>

<style>
.ivu-card-head {
  border-radius: 4px 4px 0px 0px
}
.back-log > .ivu-card-head {
  background-color: #d67e68
}
.back-log > .ivu-card-head p {
  color: #fff
}
.to-do > .ivu-card-head {
  background-color: #ffbb56
}
.to-do > .ivu-card-head p {
    color: #fff
}
.doing > .ivu-card-head {
  background-color: #73a4d6
}
.doing > .ivu-card-head p {
  color: #fff
}
.done > .ivu-card-head {
  background-color: #5ac48f
}
.done > .ivu-card-head p {
  color: #fff
}
.dragArea {
  min-height: 16px;
}
</style>

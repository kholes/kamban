<template>
  <div id="board">
    <Row :xs="24" class="main-menu">
      <Col><h1>{{tasks}}</h1></Col>
      <Col>
        <Button type="primary" @click="taskModal = true">New Task</Button>
        <formTask :show="taskModal" @close="taskModal = false" @submitTask="submitTask"></formTask>
      </Col>
    </Row>
    <Modal v-model="detailTaskModal" cancelText="Close" @on-cancel="detailTaskModal = false">
      <p class="header"><Icon type="information"></Icon></p>
        <span> Detail Task: {{ taskItem.title }} for {{ taskItem.assignedTo }}</span>
      <h3> Task Description : </h3>
      <p> {{ taskItem.desc }} </p>

      <h3> Point : </h3>
      <p> {{ taskItem.point }} </p>
      <h3> Status : </h3>
      <p> {{ taskText }} </h3>

      <div class="main-content">
        <Row>
          <Col>
            <Poptip v-if="taskItem.status != 0" 
            confirm :title="'Mark this task as ' + prevText + '?'" 
            okText="Yes" cancelText="No"
            @on-ok="prev" @on-cancel="closeDetailTaskModal">
              <Button type="warning" size="large"> {{ prevText }} </Button>
            </Poptip>
          </Col>
          <Col>
            <Poptip confirm title="Are you sure want to delete this task?"
            okText="Yes" cancelText="No"
            @on-ok="deleteTask" @on-cancel="closeDetailTaskModal">
              <Button type="error" size="large" long>Delete</Button>
            </Poptip>
          </Col>
          <Col>
            <Poptip v-if="taskItem.status != 3" 
            confirm :title="'Mark this task as ' + nextText + '?'"
            okText="Yes" cancelText="No"
            @on-ok="next" @on-cancel="closeDetailTaskModal">
              <Button type="success" size="large" long>{{ nextText }}</Button>
            </Poptip>
          </Col>
        </Row>
      </div>
    </Modal>

    <Row v-bind:gutter="16">
      <Col :xs="24" :sm="24" :md="24" :lg="24">
        <boardSection title="Back-Log" :tasks="backlog" @showDetail="showDetail"></boardSection>
      </Col>
      <Col :xs="24" :sm="24" :md="24" :lg="24">
        <boardSection title="To-Do" :tasks="todo" @showDetail="showDetail"></boardSection>
      </Col>
      <Col :xs="24" :sm="24" :md="24" :lg="24">
        <boardSection title="Doing" :tasks="doing" @showDetail="showDetail"></boardSection>
      </Col>
      <Col :xs="24" :sm="24" :md="24" :lg="24">
        <boardSection title="Done" :tasks="done" @showDetail="showDetail"></boardSection>
      </Col>
    </Row>
  </div>
</template>

<script>
import boardSection from './boardSection'
import formTask from './formTask'
import * as firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyB_c6iBwjmWA1cGTeY8SshVnufZzHg0CCY',
  authDomain: 'kamvan-cd7fd.firebaseapp.com',
  databaseURL: 'https://kamvan-cd7fd.firebaseio.com',
  projectId: 'kamvan-cd7fd',
  storageBucket: 'kamvan-cd7fd.appspot.com',
  messagingSenderId: '327148213477'
}
const firebaseApp = firebase.initializeApp(config)
const db = firebaseApp.database()
const tasksRef = db.ref('tasks')
export default {
  components: {
    boardSection,
    formTask
  },
  firebase: {
    tasks: tasksRef
  },
  data () {
    return {
      taskModal: false,
      detailTaskModal: false,
      taskItem: {
        title: '',
        desc: '',
        point: '',
        assignedTo: '',
        status: ''
      }
    }
  },
  computed: {
    backlog () {
      return this.tasks.filter((task) => task.status === 0)
    },
    todo () {
      return this.tasks.filter((task) => task.status === 1)
    },
    doing () {
      return this.tasks.filter((task) => task.status === 2)
    },
    done () {
      return this.tasks.filter((task) => task.status === 3)
    },
    taskText () {
      switch (this.taskItem.status) {
        case 0:
          return 'Back Log'
        case 1:
          return 'To Do'
        case 2:
          return 'Doing'
        case 3:
          return 'Done'
        default:
          return 'Back Log'
      }
    },
    prevText () {
      switch (this.taskItem.status) {
        case 1:
          return 'Back Log'
        case 2:
          return 'To Do'
        case 3:
          return 'Doing'
        default:
          return 'Back log'
      }
    },
    nextText () {
      switch (this.taskItem.status) {
        case 0:
          return 'To Do'
        case 1:
          return 'Doing'
        case 2:
          return 'Done'
        default:
          return 'Done'
      }
    }
  },
  methods: {
    submitTask (data) {
      tasksRef.push(data)
      this.$Message.success('New task has been added!')
    },
    showDetail (task) {
      // console.log(task)
      this.taskItem = task
      this.detailTaskModal = true
    }
  }
}
</script>

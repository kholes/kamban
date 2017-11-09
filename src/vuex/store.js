import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    taskModal: false,
    formNewTask: {
      title: '',
      desc: '',
      point: 0,
      assignedTo: '',
      status: ''
    }
  }
})
export default store

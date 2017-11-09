<template>
<Modal v-model="showModal" title="New Task" okText="Save" cancelText="Cancel" @on-ok="handleSubmit('formNewTask')" @on-cancel="handleCancel('formNewTask')">
  <Form ref="formNewTask" :model="formNewTask" :rules="ruleNewTask">
    <Form-item label="Title" prop="title"> 
      <Input v-model="formNewTask.title" type="text" placeholder="Task Title"></Input>
    </Form-item>
    <Form-item label="Description" prop="desc">
      <Input v-model="formNewTask.desc" type="textarea" placeholder="Task Short Description"></Input>
    </Form-item>
    <Form-item label="Point" prop="point">
      <Input v-model="formNewTask.point" type="text" placeholder="Task Point"></Input>
    </Form-item>
    <Form-item label="Assigned To" prop="assignedTo">
      <Input v-model="formNewTask.assignedTo" type="text" placeholder="Assigned To"></Input>
    </Form-item>
  </Form>
</Modal>
</template>
<script>
export default {
  props: ['show'],
  data () {
    const validateTitle = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Title must be provided!'))
      } else {
        callback()
      }
    }
    const validatePoint = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Point must be provided!'))
      } else {
        if (isNaN(value)) {
          callback(new Error('Point must be a number!'))
        } else {
          callback()
        }
      }
    }
    return {
      formNewTask: {
        title: '',
        desc: '',
        point: 0,
        assignedTo: ''
      },
      ruleNewTask: {
        title: [{
          validator: validateTitle,
          trigger: 'blur'
        }],
        point: [{
          validator: validatePoint,
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    showModal () {
      return this.show
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.formNewTask.point = parseInt(this.formNewTask.point)
          this.formNewTask.status = 0
          this.$emit('submitTask', this.formNewTask)
          this.$refs[name].resetFields()
        } else {
          this.$Message.error('Please check your form input!')
        }
      })
      this.emitClose()
    },
    handleCancel (name) {
      this.$refs[name].resetFields()
      this.emitClose()
    },
    emitClose () {
      this.$emit('close')
    }
  }
}
</script>
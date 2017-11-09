<template>
  <div id="main">
    <Button type="primary" @click="newTask = true">Display dialog box</Button>
    <Modal v-model="newTask" ok-text="Save" cancel-text="Cancel" title="Add New Task" :loading="loading" @on-ok="asyncOK">
      <Form :model="formItem" :label-width="80">
        <FormItem label="Title">
            <Input v-model="formItem.title" placeholder="Title..."></Input>
        </FormItem>
        <FormItem label="Description">
            <Input v-model="formItem.desc" type="textarea" placeholder="Description..."></Input>
        </FormItem>
        <FormItem label="Point">
            <Input v-model="formItem.point" placeholder="Point..."></Input>
        </FormItem>
        <FormItem label="Assigned To">
            <Input v-model="formItem.assigned" placeholder="Assigned To..."></Input>
        </FormItem>
      </Form>
    </Modal>
    <Row>
    </Row>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        newTask: false,
        loading: true,
        formItem: {
          title: '',
          desc: '',
          point: '',
          assigned: ''
        }
      }
    },
    methods: {
      asyncOK () {
        setTimeout(() => {
          this.modal6 = false
        }, 2000)
      }
    }
  }
</script>

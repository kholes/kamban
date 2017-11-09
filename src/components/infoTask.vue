<template>
  <div>
    <Modal v-model="showModal" cancelText="Close" @on-cancel="detailTaskModal = false">
      <p class="header"><Icon type="information"></Icon></p>
        <span> Detail Task: {{ currentTask.title }} for {{ currentTask.assignedTo }}</span>
      <h3> Task Description : </h3>
      <p> {{ currentTask.desc }} </p>

      <h3> Point : </h3>
      <p> {{ currentTask.point }} </p>
      <h3> Status : </h3>
      <p> {{ currentStatusText }} </h3>

      <div class="main-content">
        <Row>
          <Col>
            <Poptip v-if="currentTask.status != 0" 
            confirm :title="'Mark this task as ' + prevText + '?'" 
            okText="Yes I'm sure!" cancelText="No, cancel!"
            @on-ok="prev" @on-cancel="closeDetailTaskModal">
              <Button type="warning" size="large" @click="infoTask = true"> {{ prevText }} </Button>
            </Poptip>
          </Col>
          <Col>
            <Poptip confirm title="Are you sure want to delete this task?"
            okText="Yes I'm sure!" cancelText="No, cancel!"
            @on-ok="deleteTask" @on-cancel="closeDetailTaskModal">
              <Button type="error" size="large" long>Delete</Button>
            </Poptip>
          </Col>
          <Col>
            <Poptip v-if="currentTask.status != 3" 
            confirm :title="'Mark this task as ' + nextText + '?'"
            okText="Yes I'm sure!" cancelText="No, cancel!"
            @on-ok="next" @on-cancel="closeDetailTaskModal">
              <Button type="success" size="large" long>{{ nextText }}</Button>
            </Poptip>
          </Col>
        </Row>
      </div>
    <Button type="primary" @click="modal6 = true">Display dialog box</Button>
    <Modal
        v-model="modal6"
        title="Title"
        :loading="loading"
        @on-ok="asyncOK">
        <p>After you click ok, the dialog box will close in 2 seconds.</p>
    </Modal>
    </Modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        modal6: false,
        loading: true
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

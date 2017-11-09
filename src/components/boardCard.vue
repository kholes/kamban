<template>
  <Col :xs="24" :sm="24" :md="6" :lg="6">
    <Card :class="task.status" :md="6">
      <p slot="title"> {{ task.title }} </p>
      <p> Point: {{ task.point }} </p>
      <p> Assigned To: {{ task.assignedTo }} </p>
      <Button type="primary" @click="showDetail"> Show Detail </Button>
    </Card>
  </Col>
</template>

<script>
export default {
  props: ['task'],
  methods: {
    showDetail () {
      this.$emit('showDetail', this.task)
    }
  }
}
</script>

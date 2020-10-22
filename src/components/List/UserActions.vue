<template lang="pug">
  div
    router-link(
      :to="editPath"
    ) Edit

    button(v-on:click="removeUser") Delete
</template>

<script>
export default {
  props: ['userId'],
  data: function () {
    return {
      editPath: {
        name: 'edit-user',
        params: {
          userId: this.userId
        }
      }
    }
  },

  methods: {
    removeUser: function (event) {
      this.$store.commit('removeUser', this.userId)
    }
  }
}
</script>

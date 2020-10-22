<template lang="pug">
  div
    form
      label Name
      input(v-model="formData.name")
      hr
      label Age
      input(v-model="formData.age")
      div(v-show="needSave")
        hr
        button(v-on:click="store") Save
</template>

<script>
export default {
  name: 'Adduser',
  data: function () {
    let formData = {
      name: '',
      age: ''
    }

    if (this.$route.params.userId) {
      const userId = this.$route.params.userId
      if (userId in this.$store.state.users) {
        this.loadedUser = this.$store.state.users[userId]
        formData.name = this.loadedUser.name
        formData.age = this.loadedUser.age
        formData.id = userId
      } else {
        // Here should be error handler
        console.error('No user')
      }
    }

    return {
      formData: formData
    }
  },

  computed: {
    needSave: function () {
      const notEmpty = !!this.formData.name.length && !!this.formData.age.length

      const editMode = 'loadedUser' in this
      const addMode = !editMode

      if (addMode) {
        return notEmpty
      }

      if (editMode) {
        const nameHasChanges = this.formData.name !== this.loadedUser.name
        const ageHasChanges = this.formData.age !== this.loadedUser.age
        const hasChanges = nameHasChanges || ageHasChanges
        return editMode && notEmpty && hasChanges
      }
    }
  },

  methods: {
    store: function (event) {
      if (this.loadedUser) {
        this.$store.commit('updateUser', this.formData)
      } else {
        this.$store.commit('addUser', this.formData)
      }
      this.$router.push({name: 'list'})
    }
  }
}
</script>

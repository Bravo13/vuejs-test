<template lang="pug">
  div
    h1 List
    table
      thead
        tr
          td ID
          td Name
          td Age
          td Actions
      tbody(v-if="!listIsEmpty")
        tr(v-for="item in list")
          td {{ item.id }}
          td {{ item.name }}
          td {{ item.age }}
          td Actions goes here
      tbody(v-else)
        tr
          td(colspan=4) No records
</template>

<script>
export default {
  name: 'List',
  isIndex: true,

  computed: {
    list: (state) => state.$store.state.users,
    listIsEmpty: function () {
      return !Object.keys(this.$store.state.users).length
    }
  }
}
</script>

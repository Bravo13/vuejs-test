<template lang="pug">
  div
    h1 List
    table
      thead
        tr
          td ID
          td Name
          td Age
          td Loves icecream
          td Actions
      tbody(v-if="!listIsEmpty")
        tr(v-for="item in list")
          td {{ item.id }}
          td {{ item.name }}
          td {{ item.age }}
          td {{ item.icecream }}
          td
            UserActions(v-bind:userId="item.id")
      tbody(v-else)
        tr
          td(colspan=4) No records
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import UserActions from '@/components/List/UserActions';

@Component({
  components: {
    UserActions,
  },
})
export default class List extends Vue {
  isIndex = true

  get list() {
    return this.$store.state.users;
  }

  get listIsEmpty() {
    return !Object.keys(this.$store.state.users).length;
  }
}
</script>

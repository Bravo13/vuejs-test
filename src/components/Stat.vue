<template lang="pug">
  ul
    li
      b Average age:
      | {{averageAge.toFixed(2)}}
    li
      b Icecream lovers:
      | {{icecreamLoversPercents.toFixed(2)}}%
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Stat extends Vue {
  get averageAge() {
    const list = Object.values(this.$store.state.users);
    return Math.round(list.reduce((res, user) => res + +user.age, 0) / list.length);
  }

  get icecreamLoversPercents() {
    const list = Object.values(this.$store.state.users);
    return (list.filter((obj) => obj.icecream).length / list.length) * 100;
  }
}
</script>

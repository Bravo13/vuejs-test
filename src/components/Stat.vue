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
export default {
  name: 'Statistics',
  computed: {
    averageAge: (state) => {
      const list = Object.values(state.$store.state.users);
      return Math.round(list.reduce((res, user) => res + +user.age, 0) / list.length);
    },

    icecreamLoversPercents: (state) => {
      const list = Object.values(state.$store.state.users);
      return (list.filter((obj) => obj.icecream).length / list.length) * 100;
    },
  },
};
</script>

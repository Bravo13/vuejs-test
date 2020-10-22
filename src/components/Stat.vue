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
      const list = Object.values(state.$store.state.users)
      return list.map((obj) => parseInt(obj.age)).reduce((acc, curr) => (acc + curr), 0) / (list.length || 1)
    },

    icecreamLoversPercents: (state) => {
      const list = Object.values(state.$store.state.users)
      return list.filter((obj) => obj.icecream).length / list.length * 100
    }
  }
}
</script>

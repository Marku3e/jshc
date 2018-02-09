<template>
    <div>
      <ul v-for='item in list'>
        <li>{{item}}</li>
      </ul>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
      }
    },
    created(){
      this.abc()
    },
    methods: {
      abc() {
        for (var i = 0; i < 50; i++) {
          this.list.push(i)

        }
      }
    }

  }
</script>

<style lang="css">

</style>

<template>
  <h1>admin</h1>
</template>

<script>
  export default {
    data() {
      return {
        username: 'Qian'
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        alert(`${vm.username}, 你尚未登录，不能进入此页`)
      })
    },
    beforeRouteLeave(to, from, next) {
      if (confirm('确定离开？')) {
        next()
      } else {
        next(false)
      }
    }
  }
</script>

<style scoped>

</style>

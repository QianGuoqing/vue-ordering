<template>
  <div>
    <h1>home</h1>
    <button @click="goToMenu" class="btn btn-success">Let's order!</button>
  </div>
</template>

<script>
  export default {
    name: "home",
    methods: {
      goToMenu() {
        // 跳转到上一次浏览的页面
        // this.$router.go(-1)

        // 指定跳转的地址
        // this.$router.replace('/menu')

        // 指定跳转的路由名字下
        // this.$router.replace({ name: 'Menu' })

        // 通过push进行跳转
        // this.$router.push('/menu')
        this.$router.push({ name: 'Menu' })
      }
    },
  }
</script>

<style scoped>

</style>

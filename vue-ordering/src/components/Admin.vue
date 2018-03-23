<template>
  <div class="row">
    <div class="col-sm-12 col-md-8">
      <!--new pizza-->
      <new-pizza></new-pizza>
    </div>
    <div class="col-md-4 col-sm-12">
      <!--品种展示-->
      <h3 class="text-muted my-5">菜单</h3>
      <table class="table">
        <thead class="table table-default">
        <tr>
          <th>品种</th>
          <th>删除</th>
        </tr>
        </thead>
        <tbody v-for="item in getMenuItems" :key="item.name">
        <tr>
          <td>{{ item.name }}</td>
          <td>
            <button @click="deleteData(item)" class="btn btn-outline-danger btn-sm">&times;</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import NewPizza from './NewPizza'

  export default {
    components: {
      NewPizza
    },
    data() {
      return {
        // username: 'Qian'
        // getMenuItems: []
      }
    },
    computed: {
      getMenuItems: {
        // 在vuex中获取数据
        get() {
          // return this.$store.state.menuItems
          return this.$store.getters.getMenuItems
        },
        set() {

        }
      }
    },
    methods: {
      deleteData(item) {
        fetch('https://wd2468178309upkmpi.wilddogio.com/menu/' + item.id + '/.json', {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json'
          }
        }).then(response => response.json())
          // .then(data => this.$router.push('/menu'))
          .then(data => {
            this.$store.commit('removeMenuItems', item)
          })
          .catch(error => console.log(error))
      }
    },
    created() {
      fetch('https://wd2468178309upkmpi.wilddogio.com/menu.json')
        .then(response => {
          return response.json()
        })
        .then(data => {
          let menuArray = []
          for (let key in data) {
            data[key].id = key
            menuArray.push(data[key])
          }
          this.$store.commit('setMenuItems', menuArray)
          // this.getMenuItems = menuArray
        })
        .catch(error => {
          console.log(error)
        })
    }
    // beforeRouteEnter(to, from, next) {
    //   next(vm => {
    //     alert(`${vm.username}, 你尚未登录，不能进入此页`)
    //   })
    // },
    // beforeRouteLeave(to, from, next) {
    //   if (confirm('确定离开？')) {
    //     next()
    //   } else {
    //     next(false)
    //   }
    // }
  }
</script>

<style scoped>

</style>

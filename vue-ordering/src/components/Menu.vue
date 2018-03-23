<template>
  <div class="row">
    <!--菜单-->
    <div class="col-sm-12 col-md-8">
      <table class="table">
        <thead class="thead-default">
          <tr>
            <th>尺寸</th>
            <th>价格</th>
            <th>加入</th>
          </tr>
        </thead>
        <tbody v-for="item in getMenuItems" :key="item.name">
          <tr>
            <td><strong>{{ item.name }}</strong></td>
          </tr>
          <tr v-for="option in item.options" :key="option.size">
            <td>{{ option.size }}</td>
            <td>{{ option.price }}</td>
            <td><button
                  class="btn btn-sm btn-outline-success"
                  @click="addToBasket(item, option)">+</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!--购物车-->
    <div class="col-md-4">
      <div v-if="baskets.length > 0">
        <table class="table">
          <thead class="thead-default">
          <tr>
            <th>数量</th>
            <td>品种</td>
            <td>价格</td>
          </tr>
          </thead>
          <tbody v-for="item in baskets" :key="item.name">
          <tr>
            <td>
              <button @click="decreaseQuantity(item)" class="btn btn-sm">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)" class="btn btn-sm">+</button>
            </td>
            <td>{{ item.name }}{{ item.size }}</td>
            <td>{{ item.price * item.quantity }}</td>
          </tr>
          </tbody>
        </table>
        <p>总价：{{ total + 'RMB'}}</p>
        <button class="btn btn-success btn-block">提交</button>
      </div>
      <div v-else>
        {{ basketsText }}
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        baskets: [],
        basketsText: '购物车没有任何商品',
        // getMenuItems: {}
      }
    },
    created() {
      this._fetchData()
    },
    computed: {
      total() {
        let totalCost = 0
        for (let index in this.baskets) {
          let individualItem = this.baskets[index]
          totalCost += individualItem.quantity * individualItem.price
        }
        return totalCost
      },
      getMenuItems() {
        // 在vuex中获取数据
        // return this.$store.state.menuItems
        return this.$store.getters.getMenuItems
      }
    },
    methods: {
      _fetchData() {
        // fetch('https://wd2468178309upkmpi.wilddogio.com/menu.json')
        //   .then(response => {
        //     return response.json()
        //   })
        //   .then(data => {
        //     this.getMenuItems = data
        //   })
        // axios.get('menu.json')
        //   .then(response => this.getMenuItems = response.data)
        //   .catch(error => console.log(error))
        this.$http.get('menu.json')
          .then(response => this.$store.commit('setMenuItems', response.data))
          .catch(error => console.log(error))
      },
      addToBasket(item, option) {
        let basket = {
          name: item.name,
          size: option.size,
          price: option.price,
          quantity: 1
        }

        if (this.baskets.length > 0) {
          let result = this.baskets.filter(basket => {
            return basket.name === item.name && basket.price === option.price
          })

          if (result && result.length > 0) {
            result[0].quantity++
          } else {
            this.baskets.push(basket)
          }
        } else {
          this.baskets.push(basket)
        }
      },
      decreaseQuantity(item) {
        item.quantity = item.quantity - 1
        if (item.quantity <= 0) {
          this._removeFromBasket(item)
        }
      },
      increaseQuantity(item) {
        item.quantity = item.quantity + 1
      },
      _removeFromBasket(item) {
        this.baskets.splice(this.baskets.indexOf(item), 1)
      }
    },
  }
</script>

<style scoped>

</style>

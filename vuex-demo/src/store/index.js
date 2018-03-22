import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    products: [
      {
        name: '张三',
        price: 200
      },
      {
        name: '李四',
        price: 140
      },
      {
        name: '王五',
        price: 20
      },
      {
        name: '赵六',
        price: 10
      }
    ]
  },
  mutations: {
    reducePrice(state, payload) {
      return state.products.forEach(product => {
        product.price -= payload
      })
    }
  },
  actions: {
    reducePriceAsync(context, payload) {
      setTimeout(function () {
        context.commit('reducePrice', payload)
      }, 2000)
    }
  },
  getters: {
    saleProducts(state) {
      let saleProducts = state.products.map(product => {
        return {
          name: `**${product.name}**`,
          price: product.price * 0.5
        }
      })
      return saleProducts
    }
  }
})

export default store

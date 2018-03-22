## vue-ording

通过一个Vue案例，了解开发中`vue-router`、`axios`、`vuex`的知识点和应用。

### 新建项目
- `vue init webpack vue-ordering`
- 安装`vue-router`选项时选择`y`
- `cd vue-ordering`
- `npm run dev`

**添加几个组件如下：**

![](https://raw.githubusercontent.com/QianGuoqing/markdown-images-repo/master/%E7%BB%84%E4%BB%B6%E7%9B%AE%E5%BD%95.jpeg)

---

## vue-router

Vue使用`vue-router`做单页应用的路由跳转。

首先在`router/index.js`中配置路由。

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Menu from '../components/Menu'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu
    },
    // ...
    // 继续配置多个路由
  ]
})

```

这是配置路由的一个基本形式，首先要导入`vue`和`vue-router`，并且使用`Vue.use(Router)`使用路由。其次，在路由对象中配置路由，目前主要的两个属性是`mode`和`routes`。

`mode`的默认值是`hash`，当为`hash`的时候，页面上的链接时这样的: `http://localhost:8080/#/`；当使用`history`时，页面的上的链接就会变成这样：`http://localhost:8080/`。所以开发的时候一般讲`mode`的值取为`history`。

`routes`它是一个数组，主要的就是多个配置路由了，主要是决定路径和组件的映射，也就是说，当跳转到哪个路径的时候，显示出哪个组件。每个配置项都是一个对象，由上句话可以知道，这个对象的主要两个属性就是`path`和`component`了。`path`对应跳转路径，`component`对应显示的组件。当然组件是要先导入的(`import .... `)。这个对象还有一个`name`属性来设置路由的名字，在后面中会讲到，很有用。

当配置好了路由以后，就可以使用路由了。当点击一个链接后，执行路由跳转。`vue-router`提供了`router-link`用于点击跳转，它本质其实还是一个`a`标签，但是它的功能更多。
使用如下：

```javascript
<ul class="navbar-nav">
  <li><router-link to="/" class="nav-link">主页</router-link></li>
  <li><router-link to="/menu" class="nav-link">菜单</router-link></li>
</ul>
```

当设置好了跳转链接后，就要决定组件在哪里显示了，这个就要使用`vue-router`提供的`router-view`了。

```javascript
<div class="container">
  <app-header></app-header>
  <router-view></router-view>
</div>
```

这样，就能在设置`router-view`的地方展示路由跳转的实际内容了。

路由可以设置的`path`是有限的，但是用户输入的`path`却是无限的，比如当前只有`/`和`/menu`两个路径，但是用户会在浏览器中输入`/asdfasdf/`这样的路径，一般情况下会之间显示404，用户体验不好。所以需要进行容错处理，这样就可以在`routes`配置一个特定的路由。使用`redirect`

```javascript
    {
      path: '*',
      redirect: '/home'
    }
```

`*`表示能匹配到所有，`redirect`表示跳转，意思就是匹配到任何路径都会跳转到`/home`这个路径，记住，这个路由配置一定要在最后，否则如果放在第一个或者前面几个，正常的路由也会匹配这个规则，从而直接重定向了。

现在说说刚刚遗漏的`name`属性。`name`就是帮一个路由起一个名字，这样在要找到这个路由的时候，可以直接找它的`name`值就行了。比如对刚刚的路由链接，使用`name`的方法来跳转：

```javascript
<li>
  <router-link :to="{ name: 'Menu' }" class="nav-link">菜单</router-link>
</li>
```

### 编程式导航
不仅仅可以使用`router-link`进行路由跳转，也可以通过编程的方式进行路由跳转，这就要用到`$router`了。

对一个`button`绑定一个事件，点击这个`button`可以路由跳转。

`<button @click="goToMenu"">路由跳转</button>`

然后在`vue`实例中的`method`实现这个这个方法

```javascript
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
    }
```

### 路由嵌套（二级路由、三级路由）

路由嵌套，其实很简单，就是在一个路由组件中在配置一些路由，然后使用`router-view`在这个组件中显示子路由的内容就行了。

在配置路由的时候，只要在这个组件的路有对象下面再使用一个`children`的属性，它的值是一个数组，数组里面放的认识配置路由的信息。

```javascript
    {
      path: '/about',
      name: 'About',
      component: About,
      children: [
        {
          path: 'contact',
          name: 'Contact',
          component: Contact
        },
        // ... 更多子路由配置
      ]
    },
```

需要注意的是，子路由配置的时候，在`path`这里，不要加上`/contact`，这样会直接跳转到根路径下的`contact`路径，而不是需求中的`/about/contact`这样的路径。

三级路由的实现，其实就是在二级路由的组件中在配置如上操作就行了。只要有需求，配置N级路由都可以，方法是一样的。


### 路由守卫

路由守卫的作用就是，当进行路由跳转的时候，在跳转前，或者跳转后所要执行的事情。比如，如果一个用户没有登录的情况下，想跳转到比如菜单管理页（`path: /menu, component: Menu`）。通过路由守卫，在跳转到菜单管理页之前会执行一个事件，该事件可以是“由于没有登录的情况下，阻止跳转到菜单管理页”。这样，用户在未登录的情况下就不能跳转到菜单管理页，页面上仍然停留在登录页面。如果用户登录了，那么在跳转路由前，仍然会执行一个事件，可以是“用户已登录，可以进行菜单页的跳转”。这两个事件可以放在一个函数里面，通过条件判断来决定执行哪一个事件。而这个函数的实现就需要**路由守卫**了。

#### 全局守卫

全局守卫（对每个路由都生效）内容可以再`router/index.js`中编写：


```javascript
// 全局守卫
// 在点击任何一个路由之前，都会执行
router.beforeEach((to, from, next) => {
  /**
   * to: 进入到哪个路由
   * from: 从哪个路由跳转的
   * next: 决定是否要继续进行下去，是一个函数，如果执行next()，则跳转到下一个路由
   *       否则不跳转，所以按照刚刚说的，在未登录的情况下，如果当前页面不是登录页，则
   *       不执行next()或者执行next('/login')，如果是登录状态，路由跳转的执行执行next()
   * */
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    alert('尚未登录，请登录或注册')
    next('/login')
  }
})
```


#### 路由独享守卫

在单个路由（仅对配置的路由生效）的配置中使用的： 

```javascript
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      beforeEnter(to, next, from) {
        alert('非登录状态不能此页面')
      }
    }
```

配置了以后，每当要跳转到`/admin`的时候，非登录状态下是不能进入的。

#### 组件内路由守卫

在组件内配置（仅对配置过的组件有效）：

```javascript
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

```


### 复用`router-view`

一般情况下，`router-view`的使用是展现一个容器组件`container component`，当时有时候的需求是：在首页的时候能通过`router-view`展现多个容器组件，比如能在首页展现订单详情页、首页等。
做法：首先用多个`router-view`来展现所需要的组件，并给每个`router-view`上添加一个`name="xxxxx"`的属性和值。然后在配置路由的子项中，使用`components`而不是`component`，`components`的值是一个对象，给对象中的键值对就是刚刚`router-view`中的`name`值，和要展现的组件。形如`{ router-view-name: componentName }`。当然对象中有个属性是`default`，用于默认展现的组件。

```javascript
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-4">
          <router-view name="orderingGuide"></router-view>
        </div>
        <div class="col-sm-12 col-md-4">
          <router-view name="delivery"></router-view>
        </div>
        <div class="col-sm-12 col-md-4">
          <router-view name="history"></router-view>
        </div>
      </div>
    </div>
    ---
    {
      path: '/home',
      name: 'Home',
      // component: Home
      components: {
        default: Home, // 默认显示Home组件
        'orderingGuide': OrderingGuide,
        'delivery': Delivery,
        'history': History
      }
    },
```

--- 


## axios

`axios`是一种基于`Promise`的HTTP库，可以用于ajax数据请求。在项目中安装`axios`: 

`npm install --save axios` 

在组件中如果要使用`axios`，则需要引入：

`import axios from 'axios`

全局导入`axios`，在`main.js`中：

```javascript
// 配置Vue原型（在任何组件中都可以正常使用axios，而不需要另外导入axios了）
Vue.prototype.$http = axios
```

在任何组件中，只需要使用`this.$http`就指代了`axios`，可以使用`axios`所有功能。

使用`axios`的两种方式：`GET`, `POST`，现在分别看看如何使用。

在`Register.vue`组件中：

```javascript
      onSubmit() {
        if (this.password === this.confirmPassword) {
          const formData = {
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword
          }

          axios.post('/users.json', formData).then(response => {
            this.$router.push({ name: 'Login' })
          }).catch(error => {
            console.log(error)
          })
        } else {
          alert('两次密码不一致')
        }
      }
```

在`Login.vue`组件中：

```javascript
      onSubmit() {
        axios.get('/users.json').then(response => {
          const data = response.data
          const users = []
          for (let key in data) {
            const user = data[key]
            users.push(user)
          }
        }).catch(error => {
          console.log(error)
        })
      }
```


## 番外

### `vuex`一览

先学习这个`vuex-demo`，了解什么是`vuex`，如何使用`vuex`，再在项目中使用`vuex`。[代码地址](https://github.com/QianGuoqing/vue-ordering/tree/master/vuex-demo)

在没有`vuex`的情况下，组件数据通信还是依靠`prop`和事件回调。如果组件层级过多，而底层组件想要获取顶层组件，就会很麻烦。其次，兄弟组件之间的数据通信也很麻烦。

![](https://raw.githubusercontent.com/QianGuoqing/vue-ordering/master/images/%E6%B2%A1%E6%9C%89vuex%E7%9A%84%E6%95%B0%E6%8D%AE%E9%80%9A%E4%BF%A1.jpeg)

`vuex`是集中管理数据状态的一种方式，解决了组件间复杂相互通信的问题。`vuex`通过一个集中的数据存储，让程序的各个组件可以访问到这些数据。

一张来自官方文档的`vuex`流程图：

![](https://vuex.vuejs.org/zh-cn/images/vuex.png)

我们会在后面通过代码的形式来理解这张图的流程。


### `vuex`

#### 安装和引入

使用`npm`安装`vuex`，`npm install --save vuex`。
在`src`文件夹下，新建一个文件夹，名为`store`，在该文件夹下新建一个文件`index.js`。在`index.js`中编写如下代码来进行初始化：

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters: {

  }
})

export default store

```

在`main.js`中引入`store`

```javascript
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
```

这样，`vuex`的初始化工作就完成了。

#### `state`
可以将数据存储在`state`这个对象中，别的组件就可以通过某写方式访问到这个`state`中的数据。

```javascript
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
```

那么如何在组件中获取`state`中的数据呢？可以在组件中使用`computed`和`$store`，`$store`是`vuex`自带的。

```javascript
    computed: {
      products() {
        return this.$store.state.products;
      }
    }
```

通过`$store`可以获取到`state`，从而就能获取到`state`中的数据了。


#### `getters`
`vuex`中的`getters`的作用，和`vue`中的`computed`作用很相似。

如果说有很多组件都需要一个改变的属性（如价格变为原来的一半的函数），有一种做法就是将这个函数复制粘贴到各个有这个需求的组件，这就不符合“复用”的概念了。

这时候就可以使用`vuex`中的`getters`了，它可以被认为是`store` 的计算属性（正如前面所说）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

```javascript
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
```

```javascript
saleProducts() {
   return this.$store.getters.saleProducts
}
```

#### `mutations`

**只用通过提交(`commit`) `mutations` 才能修改`state`的数据**

```javascript
  mutations: {
    reducePrice(state) {
      return state.products.forEach(product => {
        product.price -= 10
      })
    }
  },
```

```javascript
    methods: {
      reducePrice() {
        this.$store.commit('reducePrice')
      }
    }
```

如果要给`mutations`中的事件传递参数，可以使`payload`（通常以对象方式传递）。

```javascript
  mutations: {
    reducePrice(state, payload) {
      return state.products.forEach(product => {
        product.price -= payload.steps
      })
    }
  },
```

```javascript
    methods: {
      reducePrice() {
        this.$store.commit('reducePrice', { steps: 20 })
      }
    }
```


#### `actions`

现在我们已经知道`mutations`可以改变`state`的数据。但是`mutations`只能处理同步的情况，如果遇到异步(`setTimeout`, `ajax`获取数据等)，就需要使用`actions`了。在异步情况下，将状态改变的函数写在`actions`中，也就是说，如果遇到异步的情况，就在`actions`中的异步中调用`mutations`。要触发`actions`则需要使用`dispatch`。

```javascript
  actions: {
    reducePriceAsync(context, payload) {
      setTimeout(function () {
        context.commit('reducePrice', payload)
      }, 2000)
    }
  },
```

```javascript
    methods: {
      reducePrice(amount) {
        this.$store.dispatch('reducePriceAsync', amount)
      }
    },
```





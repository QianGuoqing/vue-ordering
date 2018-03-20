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
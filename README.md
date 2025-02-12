# 玩偶大麦[通用架构]

> wildfireon

### 1. 项目目录与说明




* 一级目录


<pre>
	├── Notes.md
	├── README.md   
	├── Standard.md		eslint标准   
	├── build    Webpack配置
	├── config   
	├── element-variables.css  ElementUI 变量
	├── index.html
	├── node_modules
	├── package.json
	├── src  
	├── static   
	└── theme   ElementUI 主题
</pre>


* src目录

<pre>
	├── App.vue
	├── api		该目录用来统一管理 ajax 请求
	│   └── config.js	  axios配置以及fetch/getmap方法的定义
	├── i18n		该目录用来统一管理 ajax 请求
	│   ├── message.js		暴露国际化文字原始json, 在 index.js 中二次构造
	│	  └── index.js	  国际化
	├── assets		该项目为项目使用资源的目录
	│   ├── css
	│   │   ├── common.scss		项目公共样式
	│   │   └── variables.scss		项目变量[赶时间, 未使用]
	│   ├── font
	│   │   └── iconfont		图标字体来自 alimama图标库
	│   ├── images
	│   │   ├── ccb_logo.png
	│   │   ├── home_sprite.png
	│   │   ├── login_earth.png
	│   │   ├── login_everisk.png
	│   │   └── login_star_light.jpg
	│   ├── js
	│   │   ├── bmap.js				bmap依赖
	│   │   ├── echarts_config.js	各类echarts配置
	│   │   ├── geocoord.js			地理坐标点
	│   │   ├── mapstyle.js			在线地图的style配置文件
	│   │   ├── particles.js		粒子插件
	│   │   ├── scatter.js			首页地图配置项
	│   │   └── tool.js				项目公共方法 valid 和正则表达式对象rules
	│   └── json
	│       └── particle_config.json	粒子插件配置文件
	├── components		组件
	│   ├── Common		放置页面公共组件
	│   ├── Layout		页面的布局
	│   │   ├── Layout_1.vue	最常用的
	│   │   ├── Layout_2.vue	首页地图使用
	│   │   └── Layout_3.vue	登陆使用
	│   ├── NavBar
	│   │   ├── globalfilter.vue	全局搜索弹窗
	│   │   ├── navbar.vue			头部BANNER
	│   │   ├── navbar_login.vue	头部BANNER——LOGIN专用
	│   │   └── navlink.vue			头部导航
	│   └── SideBar
	│       ├── analyrisk.vue		仿真市场侧导航
	│       ├── config.vue			配置管理侧导航
	│       └── everisk.vue			卡通感知侧导航[一期不实现]
	├── main.js
	├── router
	│   └── router.js		router暂不进行拆分，一个文件进行集中管理router
	├── store			vuex部分
	│   ├── modules
	│   │   ├── analyrisk
	│   │   │   ├── calculate.js
	│   │   │   └── realtime.js
	│   │   ├── common
	│   │   │   └── userconfig.js
	│   │   ├── config
	│   │   │   ├── events.js
	│   │   │   └── stratery.js
	│   │   ├── everisk
	│   │   │   └── everisk.js
	│   │   └── home
	│   │       └── home.js
	│   ├── mutation-types.js
	│   └── store.js
	└── views			从component目录中抽离出来, 单独进行管理
	    ├── analyrisk
	    │   ├── calculate.vue
	    │   ├── collect.vue
	    │   └── realtime.vue
	    ├── config
	    │   └── upstream_manage
	    │       ├── events
	    │       │   └── events_create.vue
	    │       ├── events.vue
	    │       ├── stratery
	    │       │   ├── strate_data.vue
	    │       │   ├── strate_data_rule_new.vue
	    │       │   ├── strate_device.vue
	    │       │   ├── strate_new.vue
	    │       │   ├── strate_rule.vue
	    │       │   ├── strates_chg.vue
	    │       │   ├── strates_details.vue
	    │       │   ├── strates_edit.vue
	    │       │   └── strates_new.vue
	    │       └── stratery.vue
	    ├── everisk
	    │   └── index.vue
	    ├── home
	    │   ├── index.vue
	    │   └── modules
	    │       ├── baidumap.vue
	    │       └── sideboard.vue
	    └── login.vue		登陆页面
</pre>


### 2. 项目开发


#### 2.1  技术选型


1. `VUE`: MVVM框架
2. `VUE-Router`: 路由系统
3. `Vuex`: 状态管理
4. `Axios`: Ajax库，jQuery提供了更便捷的操作DOM的方案，数据驱动的项目不太需要这部分的功能，所以需要一个更专业的 Ajax库
5. `Echarts`: 图表类继续沿用echarts3.0
6. `ElementUI`: 饿了么前端团队推出的基于VUE2.0的UI组件库
7. `es2016`: 项目javascript版本
8. `normalize.css`: 样式重置方案
9. `vue-i18n`: 国际化[在3.5版本引入]
10. `babel-preset-env`: 取代之前使用`babel-preset-es2015`做兼容



#### 2.2  开发说明

* 路由分发

	使用命名视图的方式渲染三级路由，在 `Layout_1.vue` 中 , 提供了 `dashboard` 和 `sidebar` 两个视图的出口， `dashboard` 是 `content` 的出口， `sidebar` 是侧边栏 的出口， 侧边栏的高亮通过控制侧边栏组件的 `default_active` 实现,  目前采用的是 注册制， 将对应的当前路由 和  高亮对应项 储存在组件的 `SIGNS` 对象中

* 拦截请求 拦截返回
	api 的请求借助了 axios , 通过 `api/config.js` 对 ajax 进行配置，接口调用的时候 使用 `form-data`, 不使用`request-payload`, 在拦截请求时调用 qs 模块做传参序列化， 在拦截返回时 , 做权限控制, 为返回项的  `data.datalist` 这一 json 数组 增加 `_order` 属性， 供列表渲染使用

* vuex 的结构
	vuex 全部使用模块化， 项目公共的 vuex 放在 `userconfig` 模块下, 其他的 module 和 view 目录的结构一致, 在每个 `module` 中, `state` 提供数据,  `getter` 提供数据经过筛选或者处理之后的结果供 `computed`, `action` 访问 api, 在 成功的回调 中使用 `mutation` 中的方法 对 state 中的数据进行赋值, `mutation-types` 对 `mutation` 进行统一管理

* 数据层和逻辑层的分离

	为了降低页面中数据层和逻辑层的耦合，项目的数据层统一使用 `vuex` 进行api 的请求,并处理回调， 在组件的内部使用数据的时候， 需要通过 `mapState` 或者 `mapGetters` 获得数据， 并在 `mounted` 的时候 `dispatch` 对应的 `action`, 这样做的好处在于页面结构更加清晰, 在渲染视图的时候不需要关注数据层的逻辑， 或者尽可能少的关注

* 国际化
	国际化使用了`vue-i18n`, 注册到了vue的实例中, 在组件中通过`this.$t('国际化')`调用, 在组件的模版中需要使用`<div>{{$t('国际化')}}</div>` 在`js`文件中通过`import i18n from i18n`引入, 通过`i18n.t('国际化')`调用, 新增加的字段需要维护`src/i18n/message.js`

#### 2.3 接口文档

* [接口文档] 是由后端基于`swagger`提供的
* [接口模拟] 基于 `rap`前端自己mock

### 3  开发规范


#### 3.1  代码规范

* 项目使用`eslint` 的 `standard` 标准进行代码规范,  但对于变量的命名, 由于项目中有很多变量采用的是 下划线命名, 下划线命名 和 驼峰命名法并行使用.
具体的配置参考项目的`.eslintrc`配置
* javascript [standard](https://standardjs.com/rules-zhcn.html#javascript-standard-style) 代码规范的全文， 项目中的 `Standard.md` 仅提供一些简单的中文帮助开发定位错误, 在进行本项目开发之前需要熟悉这一规范, 并对编辑器进行配置使支持eslint校验。

#### 3.2  git规范

[项目git仓库]
常见命令:
```
git add
git commit
git pull --rebase     git rebase --continue   git add -u
git push
```
### 4  项目架构变动

* 目录 `api` 的调整

	项目写一个组件需要维护的地方太多了, API目录的抽离出来虽然便于统一管理, 然而无疑写项目变得更加的麻烦, 所以做了 一点改动: API 目录下 只存在 axios 的配置文件, 暴露出 `fetch` 方法 和 `axios`, 在 vuex 对应的 `module` 里面调用 `fetch` 方法来获取数据

* 目录 `static` 的删除

	在写项目的过程中发现， static 目录仅是提供了 font 素材, 因而这里删除了 static目录, 内容并入 `assets` 下


* 目录 `i18n` 的增加

	基于国际化的需求, 引入了插件 `vue-i18n` 进行国际化翻译

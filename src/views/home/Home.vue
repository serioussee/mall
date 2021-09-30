<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">首页</div>
    </nav-bar>
    <tab-control class="tab-control" :titles="['流行','新款','精选']"
                 @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll"
            @pullingUp="loadMore">
      <home-swiper :banners="banner" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommend"></recommend-view>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isshowBackUp"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import BackTop from 'components/content/backTop/BackTop.vue'

  import {getHomeMultidata, getHomeGoods} from "network/home.js"
  import {debounce} from 'common/utils.js'

  export default {
    name: "Home",
    data() {
      return {
        banner: [],
        recommend: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isshowBackUp: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      BackTop
    },
    created() {
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {
      //1、图片加载完成的事件监听
      const refresh = debounce(this.$refs.refresh, 500);
      this.$bus.$on('itemImageLoad', () => {
        refresh;
      })
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
      console.log(this.saveY);
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    methods: {
      /*
      * 事件监听相关方法
      * */
      tabClick(index) {
        console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        //1、判断BackTop是否显示
        this.isshowBackUp = (-position.y) > 1000
        //2、决定tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType);
      },
      //2、获取tabControl的offsetTop
      //所有的组件都有一个属性$el,用于获取组件中的元素
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },

      /*
      *  网络请求相关方法
      * */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banner = res.data.banner.list;
          this.recommend = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          // 完成加载更多数据
          this.$refs.scroll.finishPullUp();
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: #ff8198;
    /*background-color: var(--color-tint);*/
    color: #fff;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>

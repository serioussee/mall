<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">首页</div>
    </nav-bar>
    <home-swiper :banners="banner"></home-swiper>
    <recommend-view :recommends="recommend"></recommend-view>
    <feature-view/>
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar.vue'
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'

  import {getHomeMultidata, getHomeGoods} from "network/home.js"


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
        currentType: 'pop'
      }
    },
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList
    },
    created() {
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
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
        })
      }

    }
  }
</script>

<style scoped>
  #home {
    padding-bottom: 44px;
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 0px;
  }

  .home-nav {
    background-color: #ff8198;
    /*background-color: var(--color-tint);*/
    color: #fff;
    position: relative;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 0px;
  }
</style>

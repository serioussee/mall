<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">首页</div></nav-bar>
    <home-swiper :banners="banner"></home-swiper>
    <recommend-view :recommends="recommend"></recommend-view>
    <feature-view/>
    <tab-control class="tab-control" :titles="['流行','新款','精选']"></tab-control>
    <ul>
      <li>标签1</li>
      <li>标签2</li>
      <li>标签3</li>
      <li>标签4</li>
      <li>标签5</li>
      <li>标签6</li>
      <li>标签7</li>
      <li>标签8</li>
      <li>标签9</li>
      <li>标签10</li>
      <li>标签11</li>
      <li>标签12</li>
      <li>标签13</li>
      <li>标签14</li>
      <li>标签15</li>
      <li>标签16</li>
      <li>标签17</li>
      <li>标签18</li>
      <li>标签19</li>
      <li>标签20</li>
      <li>标签21</li>
      <li>标签22</li>
      <li>标签23</li>
      <li>标签24</li>
      <li>标签25</li>
      <li>标签26</li>
      <li>标签27</li>
      <li>标签28</li>
      <li>标签29</li>
      <li>标签30</li>
      <li>标签31</li>
      <li>标签32</li>
      <li>标签33</li>
      <li>标签34</li>
      <li>标签35</li>
      <li>标签36</li>
      <li>标签37</li>
      <li>标签38</li>
      <li>标签39</li>
      <li>标签40</li>
      <li>标签41</li>
      <li>标签42</li>
      <li>标签43</li>
      <li>标签44</li>
      <li>标签45</li>
      <li>标签46</li>
      <li>标签47</li>
      <li>标签48</li>
      <li>标签49</li>
      <li>标签50</li>
      <li>标签51</li>
      <li>标签52</li>
      <li>标签53</li>
      <li>标签54</li>
      <li>标签55</li>
      <li>标签56</li>
      <li>标签57</li>
      <li>标签58</li>
      <li>标签59</li>
      <li>标签60</li>
      <li>标签61</li>
      <li>标签62</li>
      <li>标签63</li>
      <li>标签64</li>
      <li>标签65</li>
      <li>标签66</li>
      <li>标签67</li>
      <li>标签68</li>
      <li>标签69</li>
      <li>标签70</li>
      <li>标签71</li>
      <li>标签72</li>
      <li>标签73</li>
      <li>标签74</li>
      <li>标签75</li>
      <li>标签76</li>
      <li>标签77</li>
      <li>标签78</li>
      <li>标签79</li>
      <li>标签80</li>
      <li>标签81</li>
      <li>标签82</li>
      <li>标签83</li>
      <li>标签84</li>
      <li>标签85</li>
      <li>标签86</li>
      <li>标签87</li>
      <li>标签88</li>
      <li>标签89</li>
      <li>标签90</li>
      <li>标签91</li>
      <li>标签92</li>
      <li>标签93</li>
      <li>标签94</li>
      <li>标签95</li>
      <li>标签96</li>
      <li>标签97</li>
      <li>标签98</li>
      <li>标签99</li>
      <li>标签100</li>
    </ul>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar.vue'
  import TabControl from 'components/content/tabControl/TabControl.vue'

  import {getHomeMultidata} from "network/home.js"


  export default {
    name: "Home",
    data(){
      return{
        banner: [],
        recommend: [],

      }
    },
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
    },
    created() {
      getHomeMultidata().then(res => {
        console.log(res);
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })
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
    position: relative;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
  }
</style>

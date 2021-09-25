<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles"
         class="tab-control-item" :class="{active: index === currentIndex}"
         @click="tabclick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    data() {
      return {
        currentIndex: 0
      }
    },
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      tabclick(index) {
        this.currentIndex = index;
        this.$emit('tabClick',index);
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
  }

  .tab-control-item {
    flex: 1;
    height: 44px;
    line-height: 44px;
    background-color: #ffffff;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: #ff5777;
  }

  .active span {
    border-bottom: 3px solid #ff5777;
  }
</style>

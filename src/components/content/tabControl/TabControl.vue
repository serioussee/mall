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
    line-height: 40px;
    font-size: 15px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
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
  .tab-control-item.active span {
    border-bottom: 2px solid #ff5777;
  }
</style>

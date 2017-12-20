<template>
  <div class="as">
    <div class="asied">
      <div class="asied-Customer asied-C">统计管理</div>
      <router-link to="/Statistics/Statistics-1" active-class="asied-ccc" class="asied-C asied-Cc">借款人列表</router-link>
    </div>
    <div class="asied-c"></div>
    <div class="content">
      <router-view/> 
    </div>
  </div>
</template>


<script>
export default {
  name: 'Statistics',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

<template>
  <div class="as">
    <div class="asied">
      <div class="asied-Customer asied-C">交易管理</div>
      <router-link to="/transaction/transaction-1" active-class="asied-ccc" class="asied-C asied-Cc">交易时间</router-link>
      <router-link to="/transaction/transaction-2" active-class="asied-ccc" class="asied-C asied-Cc">交易货物</router-link>
      <router-link to="/transaction/transaction-3" active-class="asied-ccc" class="asied-C asied-Cc">交易清单</router-link>
    </div>
    <div class="asied-c"></div>
    <div class="content">
      <router-view/> 
    </div>
  </div>
</template>


<script>
export default {
  name: 'transaction',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

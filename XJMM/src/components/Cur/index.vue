<template>
  <div  class="as">
    <div class="asied">
      <div class="asied-Customer asied-C">客户管理</div>
      <router-link to="/Cur/Customer-1" active-class="asied-ccc" class="asied-C asied-Cc">客户1</router-link>
      <router-link to="/Cur/Customer-2" active-class="asied-ccc" class="asied-C asied-Cc">客户2</router-link>
    </div>
    <div class="asied-c"></div>
    <div class="content">
    <router-view/> 
    </div>
   
  </div>
</template>


<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

<template>
  <div class="as">
    <div class="asied">
      <div class="asied-Customer asied-C" @click="guandiao()" :class="{'class-a':shoudiao,'class-b':!shoudiao} ">风控管理
        <Icon type="chevron-down"></Icon>
      </div>
      <div v-if="shoudiao">
          <router-link to="/Risk/risk-rgxs" active-class="asied-ccc" class="asied-C asied-Cc">人工信审</router-link>
          <router-link to="/Risk/risk-lsxs" active-class="asied-ccc" class="asied-C asied-Cc">历史信审单查询</router-link>
      </div>
      
    </div>
    <div class="asied-c"></div>
    <div class="content">
    <router-view/> 
    </div>
  </div>
</template>


<script>
export default {
  name: 'Risk',
  data () {
    return {
      shoudiao:true
    }
  },methods:{
    guandiao(){
      this.shoudiao = !this.shoudiao
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>

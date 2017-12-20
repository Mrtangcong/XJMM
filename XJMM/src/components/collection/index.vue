<template>
  <div class="as">
    <div class="asied">
      <div class="asied-Customer asied-C"  @click="guandiao()" :class="{'class-a':shoudiao,'class-b':!shoudiao} ">货后跟踪
          <Icon type="chevron-down"></Icon>
      </div>
      <div  v-if="shoudiao">
          <router-link to="/collection/Tranl" active-class="asied-ccc" class="asied-C asied-Cc">跟踪列表</router-link>
      </div>
      <div class="asied-Customer asied-C" @click="guandiao1()" :class="{'class-a':shoudiao1,'class-b':!shoudiao1} ">逾期催收
          <Icon type="chevron-down"></Icon>
      </div>
      <div v-if="shoudiao1">
          <router-link to="/collection/distribution" active-class="asied-ccc" class="asied-C asied-Cc">案件分配</router-link>
          <router-link to="/collection/list" active-class="asied-ccc" class="asied-C asied-Cc">催收列表</router-link>
          <router-link to="/collection/Record" active-class="asied-ccc" class="asied-C asied-Cc">催收记录</router-link>
          
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
  name: 'collection',
  data () {
    return {
      shoudiao:true,
      shoudiao1:true
    }
  },created(){
    this.$router.push('/collection/Tranl')
  },methods:{
    guandiao(){
      this.shoudiao = !this.shoudiao
    },
    guandiao1(){
      this.shoudiao1 = !this.shoudiao1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

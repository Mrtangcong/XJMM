<template>
  <div class="as">
    <div class= 'asied' >
      <div class="asied-Customer asied-C"  @click="guandiao()" :class="{'class-a':shoudiao,'class-b':!shoudiao} ">放款管理
          <Icon type="chevron-down"></Icon>
      </div>
      <div v-if="shoudiao">
           <router-link to="/Finance/confirm" active-class="asied-ccc" class="asied-C asied-Cc">确认打款</router-link>
          <router-link to="/Finance/History" active-class="asied-ccc" class="asied-C asied-Cc">历史打款记录</router-link>
          <router-link to="/Finance/Success" active-class="asied-ccc" class="asied-C asied-Cc">成功放款明细</router-link>
      </div>
     
      <div class="asied-Customer asied-C" @click="guandiao1()" :class="{'class-a':shoudiao1,'class-b':!shoudiao1} ">收款管理
          <Icon type="chevron-down"></Icon>
      </div>
      <div v-if="shoudiao1">
          <router-link to="/Finance/dsklb" active-class="asied-ccc" class="asied-C asied-Cc">待收款列表</router-link>
          <router-link to="/Finance/yqlb" active-class="asied-ccc" class="asied-C asied-Cc">逾期列表</router-link>
          <router-link to="/Finance/ysklb" active-class="asied-ccc" class="asied-C asied-Cc">已收款列表</router-link>
          <router-link to="/Finance/sdxzjl" active-class="asied-ccc" class="asied-C asied-Cc">手动销账记录</router-link>
          <router-link to="/Finance/dwyh" active-class="asied-ccc" class="asied-C asied-Cc">定位用户</router-link>
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
  name: 'Finance',
  data () {
    return {
      shoudiao:true,
      shoudiao1:true
    }
  },methods:{
    guandiao(){
      this.shoudiao = !this.shoudiao
    },
    guandiao1(){
      this.shoudiao1 = !this.shoudiao1
    }
  },created(){
    this.$router.push('/Finance/confirm/Workb')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

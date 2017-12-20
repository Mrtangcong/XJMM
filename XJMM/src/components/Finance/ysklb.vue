<template>
  <div>
    <div class="tage">
      <Tag class="rengong" v-if="show" closable @on-close="handleClose" >已收款列表</Tag>
    </div>
    
    <div class="risk">
      <router-link to="/Finance/ysklb/Allloan" active-class="work-ac"  class="work-c">全部</router-link>
      <router-link to="/Finance/ysklb/fullpay" active-class="work-ac"  class="work-c">已全额还款</router-link>
       <router-link to="/Finance/ysklb/partpay" active-class="work-ac"  class="work-c">部分还款</router-link>
    </div>
    <div class="cont">
    <router-view/> 
    </div>
  </div>
</template>


<script>
export default {
  name: 'ysklb',
  data () {
    return {
      show:true
    }
  },created(){
    this.$router.push('/Finance/ysklb/Allloan')
  },
  methods: {
        handleClose () {
            this.show = false;
            this.$router.push('/Finance')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

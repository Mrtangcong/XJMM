<template>
  <div>
    <div class="tage">
      <Tag class="rengong" v-if="show" closable @on-close="handleClose" >确认打款</Tag>
    </div>
    
    <div class="risk">
      <router-link to="/Finance/confirm/Workb" active-class="work-ac"  class="work-c">我的工作台</router-link>
      <router-link to="/Finance/confirm/Admini" active-class="work-ac"  class="work-c">任务管理</router-link>
    </div>
    <div class="cont">
    <router-view/> 
    </div>
  </div>
</template>


<script>
export default {
  name: 'confirm',
  data () {
    return {
      show:true
    }
  },created(){
    this.$router.push('/Finance/confirm/Workb')
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

<template>
  <div>
    <div class="tage">
        <Tag class="rengong" v-if="show" closable @on-close="handleClose" >人工信审</Tag>
    </div>
    
    <div class="risk">
      <router-link :to="{path:'Workbench'}"  active-class="work-ac"  class="work-c">我的工作台</router-link>
      <router-link :to="{path:'Administration'}" active-class="work-ac" class="work-c">任务管理</router-link>
    </div>
    <div class="cont">
    <router-view/> 
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Risk',
  data () {
    return {
      show:true
    }
  },
  methods: {
        handleClose () {
            this.show = false;
            this.$router.push('/Risk')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>

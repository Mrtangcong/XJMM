<template>
  <div>
    <div class="tage">
      <Tag class="rengong" v-if="show" closable @on-close="handleClose" >逾期列表</Tag>
    </div>
    
    <div class="risk">
      <router-link to="/Finance/yqlb/A1" active-class="work-ac"  class="work-c">全部</router-link>
      <router-link to="/Finance/yqlb/D0" active-class="work-ac"  class="work-c">D0[0-1]</router-link>
      <router-link to="/Finance/yqlb/D1" active-class="work-ac"  class="work-c">D1[2-7]</router-link>
      <router-link to="/Finance/yqlb/D2" active-class="work-ac"  class="work-c">D2[8-20]</router-link>
      <router-link to="/Finance/yqlb/D3" active-class="work-ac"  class="work-c">D3[21及以上]</router-link>
      
    </div>
    <div class="cont">
    <router-view/> 
    </div>
  </div>
</template>


<script>
export default {
  name: 'yqlb',
  data () {
    return {
      show:true
    }
  },created(){
    this.$router.push('/Finance/yqlb/A1')
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

<template>
  <div>
    <div class="tage">
      <Tag class="rengong" v-if="show" closable @on-close="handleClose" >定位用户</Tag>
    </div>
    
    <div class="risk">
      <router-link to="/Finance/dwyh/oneself" active-class="work-ac"  class="work-c">用户本人</router-link>
      <router-link to="/Finance/dwyh/contact" active-class="work-ac"  class="work-c">联系人</router-link>
    </div>
    <div class="cont">
    <router-view/> 
    </div>
  </div>
</template>


<script>
export default {
  name: 'dwyh',
  data () {
    return {
      show:true
    }
  },created(){
    this.$router.push('/Finance/dwyh/oneself')
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

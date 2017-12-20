<template>
  <div>
    <div class="tage">
      <Tag class="rengong"  v-if="showTag" closable @on-close="handleClose" >案件分配</Tag>
    </div>
    <div class="risk">
      <router-link to="/collection/distribution/jtwf" active-class="work-ac"  class="work-c">今天到期未分配</router-link>
      <router-link to="/collection/distribution/jtyf" active-class="work-ac"  class="work-c">今天到期已分配</router-link>
      <router-link to="/collection/distribution/yqwf" active-class="work-ac"  class="work-c">逾期未分配</router-link>
      <router-link to="/collection/distribution/yqyf" active-class="work-ac"  class="work-c">逾期已分配</router-link>
    </div>
    <div class="cont">
    <router-view/> 
    </div>
  </div>
</template>


<script>
export default {
  name: 'Risk',
  data () {
    return {
      showTag:true,
    }
  },
  mounted(){
    this.$router.push('/collection/distribution/jtwf')
  },
  methods:{
     handleClose() {
      this.showTag = false;
      this.$router.push('/collection')
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

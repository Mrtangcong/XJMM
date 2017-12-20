<template>
  <div>
    <div class="tage">
      <Tag class="rengong"  v-if="showTag" closable @on-close="handleClose" >催回记录</Tag>
    </div>
    <div class="risk">
      <router-link to="/collection/Record/All" active-class="work-ac" class="work-c">全额还款</router-link>
      <router-link to="/collection/Record/Partial" active-class="work-ac" class="work-c">部分还款</router-link>
    </div>
    <div class="cont">
    <router-view/>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Record',
   data() {
    return {
      showTag: true
    }
  },
  mounted(){
    this.$router.push('/collection/Record/All')
  },
  methods: {
    handleClose() {
      this.show = false;
      this.$router.push('/collection')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

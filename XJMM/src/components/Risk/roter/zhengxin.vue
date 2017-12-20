<template>
	<div>
		<div class="height100"></div>
		<div class="nva">
			<router-link to="/Risk/dapan/zhengxin/zhima" active-class="blue">芝麻信用</router-link>
			<router-link to="/Risk/dapan/zhengxin/disanfang" active-class="blue">第三方网袋信息</router-link>
			<router-link to="/Risk/dapan/zhengxin/jianxun" active-class="blue">简讯分</router-link>
			<router-link to="/Risk/dapan/zhengxin/yunying" active-class="blue">运营商</router-link>	
		</div>

		<hr>
		<router-view/>
		<div class="huitou" @click="huitou()" v-if="showL"></div>
	</div>
</template>
<script>
	export default{
		name:'zhengxin',
		data(){
			return{
				showL:false
			}
		},
		created(){
			this.$router.push('/Risk/dapan/zhengxin/zhima')
			var that = this;
            window.addEventListener('scroll',winScroll);
            function winScroll(e){
                
                var t = document.body.scrollTop||document.documentElement.scrollTop;  
                if(t>249){
                    that.showL = true;
                }else{
                    that.showL = false
                }
            }
		},
        methods: {
        	huitou(){
        		document.body.scrollTop = 0;
        		document.documentElement.scrollTop = 0; 
        	}
        }
	}
</script>
<style>
	.nva{
		width: 700px;
		border: 1px solid #ccc;
		height: 50px;
		line-height: 50px;
		border-radius: 5px;
	}
	.nva a{
		display: inline-block;
		padding:0 25px;
	}
	.blue{
		background: #1d7be2;
		color: #fff;
	}
</style>
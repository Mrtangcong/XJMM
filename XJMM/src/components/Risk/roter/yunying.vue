<template>
	<div>
		<div class="height100"></div>
        <div class="height100"></div>
        <div class="rela">
            <Table :columns="columns1" :data="geren"></Table>
            <div class="xingxing">
                <img src="../../../../static/11.png">
                个人资料
            </div>            
        </div>
        <div class="height100"></div>
        <div class="rela" style="width:600px">
            <Table :columns="columns2" :data="geren"></Table>
            <div class="xingxing">
                <img src="../../../../static/11.png">
                账户信息
            </div>            
        </div>
        <div class="height100"></div>
        <div class="rela" style="width:600px">
            <Table :columns="columns3"></Table>
            <div class="xingxing">
                <img src="../../../../static/11.png">
                通话详情
            </div>            
        </div>
        <div class="height100"></div>
         <div class="lssq">
            <p>历史授权情况</p>
            <div class="lssq-d">
                <span class="liesss">序号</span>
                <span class="liesss">授权时间</span>
                <span class="liesss">报告生成时间</span>
            </div>
            <div class="lssq-d">
                <span class="liesss">1</span>
                <span class="liesss">2017年12月7日11:18:33</span>
                <span class="liesss">900</span>
            </div>
        </div>
        <div class="touxiang"></div>
	</div>
</template>
<script>
import  axios from 'axios'
	export default{
		name:'zhengxin',
		data(){
			return{
                geren:[],
                columns1: [
                    {
                        title: '手机号码',
                        key: 'mobile'
                    },
                    {
                        title: '客户名称',
                        key: 'channelSrc'
                    },
                    {
                        title: '入网时间',
                        key: 'address'
                    },
                    {
                        title: '网龄',
                        key: 'netAge'
                    },
                    {
                        title: '客户等级',
                        key: 'creditPoint'
                    },
                    {
                        title: '可用积分',
                        key: 'silenceDay0Call3Month'
                    }
                ],
                columns2: [
                    {
                        title: '当前余额',
                        key: 'accountBalance'
                    },
                    {
                        title: '累计消费',
                        key: 'age'
                    }
                ],
                columns3: [
                    {
                        title: '序号',
                        key: 'name'
                    },
                    {
                        title: '对方号码',
                        key: 'age'
                    },
                    {
                        title: '通话时长',
                        key: 'age1'
                    },
                    {
                        title: '通话频次',
                        key: 'age2'
                    }
                ]
		      }
	    },mounted(){
            var that = this;
            // 个人资料
            // 账户信息
            // accountBalance：账户余额

             axios.post('http://192.168.0.164:8081/thirdparty/getAuthByUserId',{"length":20,"page":1,"uid":104})
            .then(function(res){
                console.log(res)
                that.geren = res.data.data              
            })
            // 有问题
            axios.post('http://192.168.0.164:8081/thirdparty/getOperatorManagerByUid',{"length":20,"page":1,"uid":102})
            .then(function(res){
                          
            })

            // 历史授权
             axios.post('http://192.168.0.164:8081/thirdparty/getUserAuthHistory',{"uid":"104"})
            .then(function(res){
                console.log(res)
            })
        }
    }
</script>
<style>
.liesss{

}
</style>
<template>
	<div>
		<div class="height100"></div>
		<div class="rela">
            <div class="xingxing">
                <img src="../../../../static/11.png">
                芝麻分
            </div>            
        </div>
        <div class="pspan">
        	<div>
        		<span class="lie lies ">芝麻信用分</span>
        		<span>{{zhima}}</span>
        	</div>
        	<div class="co-j">
        		<span class="lie lies">用户当前最新芝麻信用分</span>
        		<span>{{zhima1}}</span>
        	</div>
        </div>
        <div class="height100"></div>
        <div class="lssq">
        	<p>历史授权信用分</p>
            <div v-for="(item,index) in list">
                <div class="lssq-d">
                    <span class="liesss">序号</span>
                    <span class="liesss">授权时间</span>
                    <span class="liesss">信用分</span>
                </div>
                <div class="lssq-d">
                    <span class="liesss">{{(index + 1)}}</span>
                    <span class="liesss">{{item.authTimeStr}}</span>
                    <span class="liesss">{{item.zmScore}}</span>
                </div>
            </div>

        </div>
        <div class="height100"></div>
        <div class="rela">
            <Table :columns="columns1" :data="data1"></Table>
            <div class="xingxing">
                <img src="../../../../static/11.png">
                行业关注黑名单
            </div>            
        </div>
        <div class="touxiang"></div>
	</div>
</template>
<script>
    import axios from 'axios'
	export default{
		name:'zhengxin',
		data(){
			return{
                zhima:'',
                zhima1:'',
                list:[],
				columns1: [
                    {
                        title: '序号',
                        key: 'name',
                        width:'100px'
                    },
                    {
                        title: '行业编码',
                        key: 'age',
                        width:'250px'
                    },
                    {
                        title: '风险等级',
                        key: 'address'
                    },
                    {
                        title: '风险类型',
                        key: 'address1',
                        width:'300px'
                    },
                    {
                        title: '结清状态',
                        key: 'address2'
                    },
                    {
                        title: '数据刷新时间',
                        key: 'address3'
                    },
                    {
                        title: '描述',
                        key: 'address4',
                        width:'300px'
                    }
                ],
                 data1: [
                    {
                        name: '1',
                        age: '2017年12月7日11:25:53',
                        address: 'A',
                        address1:'0001',
                        address2:'900',
                        address3:'2017年12月7日11:26:14',
                        address4:'逾期100天'
                    }
                ],
			}
		},mounted(){
            var that = this;
            // 芝麻分
            // creditAduitZmScore 芝麻信用分
            // newestZmScore 最新
            // list 历史授权信用分
             axios.post('http://192.168.0.164:8081/thirdparty/queryZhimaCredit',{"createDate":"2017-12-9 15:19:44","uid":104})
            .then(function(res){
                console.log(res)
                that.zhima = res.data.data.creditAduitZmScore
                that.zhima1 = res.data.data.newestZmScore
                that.list = res.data.data.list
            })
        }
	}
</script>
<style>
.pspan{
	display: flex;
	justify-content: space-around;
	height: 20px;
}
.lies{
	width: auto;
}
.co-j{
	color: #ff8000
}
.lssq{
	width: 500px;
	min-height: 200px;
	background: #ccc
}
.lssq p{
	text-indent: 30px;
	font-weight: bold;
	font-size: 18px;
}
.lssq-d{
	margin-top:20px;
	display: flex;
	justify-content: space-around;
	width: 100%;
	height: 20px;
}
.lssq-d span:nth-of-type(1){
	width: 90px;
	text-align: center;
}
.lssq-d span:nth-of-type(2){
	width: 160px;
	text-align: center;
	padding: 0;
}
.lssq-d:nth-of-type(2) span{
	background: #fff;
}
.liesss{
	display: inline-block;
	padding: 0 30px;
	background: #eee;
        width: 200px;
    text-align: center;
}
</style>
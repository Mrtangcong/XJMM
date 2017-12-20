<template>
	<div>

		<div class="height100"></div>
		<hr>
		<div class="rela">
            <div class="xingxing">
                <img src="../../../../static/11.png">
                命中规则
            </div>            
        </div>
		<div class="top">
			<div>
				<span class="lie top-l">当前命中规则总数量：</span>
				<span class="top-2">{{list.length + list1.length}}条</span>
			</div>
			<div>
				<span class="lie top-l">分值：</span>
				<span class="top-2">80分</span>
			</div>
		</div>
		<p class="juti">	具体明细</p>
		<div class="mingxi">
			<p>【准入条件】规则包	<span>{{list.length}}</span>条</p>
			<div class="tite">
				<span class="lie">命中规则</span><span class="lie">累计次数</span>
			</div>
			<div class="tite-1" v-for="item in list">
				<span>{{item.name}}</span><span>{{item.age}}</span>
			</div>
		</div>
		<div class="mingxi">
			<p>【黑名单】规则包	<span>{{list1.length}}</span>条</p>
			<div class="tite">
				<span class="lie">命中规则</span><span class="lie">累计次数</span>
			</div>
			<div class="tite-1" v-for="item1 in list1">
				<span>{{item1.name}}</span><span>{{item1.age}}</span>
			</div>
		</div>
		<div class="touxiang"></div>
		<div class="xuxian-1"></div>
		<Table :columns="columns1" :data="data1"></Table>
		<Modal v-model="orderModal" title="命中规则详情" width="1000px">
          <div class="top">
			<div>
				<span class="lie top-l">当前命中规则总数量：</span>
				<span class="top-2">{{list.length + list1.length}}条</span>
			</div>
			<div>
				<span class="lie top-l">分值：</span>
				<span class="top-2">80分</span>
			</div>
			</div>
			<p class="juti">	具体明细</p>
			<div class="mingxi">
				<p>【准入条件】规则包	<span>{{list.length}}</span>条</p>
				<div class="tite">
					<span class="lie">命中规则</span><span class="lie">累计次数</span>
				</div>
				<div class="tite-1" v-for="item in list">
					<span>{{item.name}}</span><span>{{item.age}}</span>
				</div>
			</div>
			<div class="mingxi">
				<p>【黑名单】规则包	<span>{{list1.length}}</span>条</p>
				<div class="tite">
					<span class="lie">命中规则</span><span class="lie">累计次数</span>
				</div>
				<div class="tite-1" v-for="item1 in list1">
					<span>{{item1.name}}</span><span>{{item1.age}}</span>
				</div>
			</div>
        </Modal>
        <div class="touxiang"></div>
        <div class="huitou" @click="huitou()" v-if="showL"></div>
	</div>
</template>
<script>
	import axios from 'axios'
	export default{
		name:'mingzhong',
		data(){
			return{
				orderModal:false,
				showL:false,
				list:[
				{name:'姓名不一致',age:'1'},
				{name:'姓名不一致',age:'5'},
				{name:'姓名不一致',age:'12'}
				],
				list1:[
				{name:'姓名不一致',age:'1'}
				],columns1: [
                    {
                        title: '序号',
                        key: 'name',
                        width:'100px'
                    },
                    {
                        title: '订单申请时间',
                        key: 'age',
                        width:'250px'
                    },
                    {
                        title: '申请金额',
                        key: 'address'
                    },
                    {
                        title: '期限',
                        key: 'address1'
                    },
                    {
                        title: '审核结果',
                        key: 'address2'
                    },
                    {
                        title: '命中规则(条)',
                        key: 'address3'
                    },
                    {
                        title: ' ',
                        key: 'address4',
                       render: (h, data1) => {
				            return h('div', [
				              h('Button', {
				                props: {
				                  type: 'text',
				                  size:'small'
				                },
				                 on: {
				                  click: () => {
				                    this.showOrder(data1.row.name)
				                  }
				                }
				              },'查看详情'),
				            ]);
				          }
                    }
                ],data1: [
                    {
                        name: '1',
                        age: '2017年12月6日10:40:03',
                        address: '800',
                        address1:'14天',
                        address2:'通过',
                        address3:'16',
                        address4:'查看详情',
                        cellClassName: {
                            address4: 'chakan'
                        }
                    },{
                        name: '2',
                        age: '2017年12月6日10:40:03',
                        address: '800',
                        address1:'14天',
                        address2:'通过',
                        address3:'16',
                        address4:'查看详情',
                        cellClassName: {
                            address4: 'chakan'
                        }
                    }
                ]
			}
		},created(){
			var that = this;
            window.addEventListener('scroll',winScroll);
            function winScroll(e){
                
                var t = document.body.scrollTop||document.documentElement.scrollTop;  
                if(t>309){
                    that.showL = true;
                }else{
                    that.showL = false
                }
            }
		},methods:{
			showOrder(index){
				this.orderModal=true;
				alert(index)
			},
			huitou(){
        		document.body.scrollTop = 0;
        		document.documentElement.scrollTop = 0; 

        	}
		},mounted(){
            var that = this;
            axios.post('http://192.168.0.164:8081/getRuleLogByOrderId',{"orderNo":'DD5125304476303896',"uid":104})
            .then(function(res){
                console.log(res)
            })
  			
        }
	}
</script>
<style>
.top{
	margin: 0 auto;
	width: 500px;
	height: 50px;
	line-height: 50px;
	background:#ccc;
}
.top div{
	display: inline-block;
	width: 49%;
}
.top-l{
	width: 170px;
	text-align: center;
	height: 30px;
	line-height: 30px;
	margin: 0;
	font-weight: bold;
}
.top-2{
	font-size: 26px;
	font-weight: bold;
	vertical-align: middle;
}
.juti{
	height: 50px;
	line-height: 50px;
	font-size: 18px;
	font-weight: bold;
	margin-left:100px;
}
.mingxi{
	margin-left:200px;
}
.mingxi>p{
	font-size: 18px;
	font-weight: bold;
}
.mingxi>p>span{
	font-size: 30px;
	font-weight: bold;
	display: inline-block;
	margin: 5px;
	vertical-align: middle;
}
.tite,.tite-1{
	font-size: 16px;
	font-weight: bold;
}
.tite .lie:nth-of-type(1){
	width: 300px;
	text-align: center;
}
.tite .lie:nth-of-type(2){
	width: 150px;
	text-align: center;
}
.tite-1 span:nth-of-type(1){
	width: 300px;
	display: inline-block;
	text-align: center;
}
.tite-1 span:nth-of-type(2){
	width: 150px;
	display: inline-block;
	text-align: center;
}
.xuxian-1{
	height: 0;
	border-top: 1px dashed #000;
	position: relative;
}
.xuxian-1:after{
	content: '历史命中记录';
	display: inline-block;
	position: absolute;
	left: 43%;
	top:-30px;
	font-size: 26px;
	font-weight: bold;
}
.chakan{
	color: #0ff;
}
</style>
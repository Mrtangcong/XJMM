<template>
	<div>
        <div class="height100">
            {{this.$route.params.user}}
        </div>
        <hr>
        <div class="rela">
            <Table :columns="columns1" :data="huoti" ></Table>
            <div class="xingxing">
                <img src="../../../../static/11.png">
                活体检测信息
            </div>            
        </div>

		<div class="touxiang">
            <img v-for="(itme,index) in zhaopian" :src="itme" class="zhaopian" v-if="index < 3">      
        </div>
		<div class="rela">
            <Table :columns="columns2" :data="lianxiren"></Table>
            <div class="xingxing">
                <img src="../../../../static/11.png">
                联系人信息
            </div>            
        </div>
		<div class="lishi">历史联系人</div>
		<div class="rela">
            <Table :columns="columns3" :data="juzhu"></Table>
            <div class="xingxing">
                <img src="../../../../static/11.png">
                在职&居住信息
            </div>            
        </div>
		<div class="touxiang"></div>
		<div class="rela">
            <Table :columns="columns4" :data="yinhangka"></Table>
            <div class="xingxing">
                <img src="../../../../static/11.png">
                银行卡信息
            </div>            
        </div>
		<div class="height100"></div>
		<div class="rela">
            <Table :columns="columns5" :data="zhanghao"></Table>
            <div class="xingxing">
                <img src="../../../../static/11.png">
                账号信息
            </div>            
        </div>
		<div class="height100"></div>
		<div class="rela">
            <Table :columns="columns6" :data="rizhi"></Table>
            <div class="xingxing">
                <img src="../../../../static/11.png">
                用户登录日志
            </div>            
        </div>
		<div class="height100"></div>
		<div class="rela">
            <div class="xingxing">
                <img src="../../../../static/11.png">
                用户登录设备
            </div>
            <div class="shebeixiang">
                <span>
                    {{shebei}}
                </span>
                <span @click="xiangq">
                    查看详情
                </span>
            </div>          
        </div>
		<div class="height100"></div>
		<div class="huitou" @click="huitou()" v-if="showL"></div>
               <Modal v-model="userModal" title="登陆设备详情" width='700px'>
                <div class="spanpa">
                    <span class="spanpa-s">使用设备数量</span>
                    <span>6</span>
                    <span class="spanpa-s">总登陆次数</span>
                    <span>100</span>
                    <span class="spanpa-s">总登录时长</span>
                    <span>200分钟</span>
                </div>
                <Table :columns="columns10" :data="shebei1" ></Table>
                    <div class="xingxing">
                        <img src="../../../../static/11.png">
                        借款申请处理记录
                    </div>     
                </Modal>
	</div>
</template>
<script>
    import axios from 'axios'

	export default{
		name:'jiben',
		data(){
			return{
                userModal:false,
                showL:false,

                yinhangka:[],
                lianxiren:[],
                zhanghao:[],
                rizhi:[],
                huoti:[],
                zhaopian:[],
                juzhu:[],
                shebei:'',
                shebei1:[],

				columns1: [
                    {
                        title: '客户账户号',
                        key: 'name'
                    },
                    {
                        title: '姓名',
                        key: 'userName'
                    },
                    {
                        title: '认证类型',
                        key: 'address'
                    },
                    {
                        title: '证件号',
                        key: 'idCard',
                        width:'300px'
                    },
                    {
                        title: '状态',
                        key: 'status'
                    },
                    {
                        title: '置信度',
                        key: 'verifyScore'
                    },
                    {
                        title: '检测时间',
                        key: 'createDate',
                        width:'300px'
                    }
                ],
                columns2:[
                	{
                        type: 'index',
                        title:'联系人顺序',
                        key: 'index'
                    },
                    {
                        title: '联系人姓名',
                        key: 'userName'
                    },
                    {
                        title: '手机号',
                        key: 'mobile'
                    },
                    {
                        title: '关系',
                        key: 'contactTypeName'
                    },
                    {
                        title: '录入时间',
                        key: 'createDateStr'
                    }
                ],columns3:[
                	{
                        title: '工作状态',
                        key: 'workTypeName'
                    },
                    {
                        title: '单位地址',
                        key: 'unitAddress'
                    },
                    {
                        title: '公司名称',
                        key: 'unitName'
                    },
                    {
                        title: '居住类型',
                        key: 'houseSituationName'
                    },
                    {
                        title: '居住地址',
                        key: 'nowAddress'
                    }
                ],columns4:[
                	{
                        title: '银行卡信息',
                        key: 'accountNumber'
                    },
                    {
                        title: '归属银行',
                        key: ''
                    },
                    {
                        title: '卡类型',
                        key: 'bankType'
                    },
                    {
                        title: '卡有效期',
                        key: 'address1'
                    },
                    {
                        title: '预留手机号',
                        key: 'mobile'
                    },
                    {
                        title: '绑定时间',
                        key: 'createDateStr'
                    },
                    {
                        title: '状态',
                        key: 'useTypeName'
                    }
                ],columns5:[
                	{
                        title: '注册时间',
                        key: 'createDateStr'
                    },
                    {
                        title: '首次登录时间',
                        key: 'age'
                        // 没有
                    },
                    {
                        title: '登录账号名',
                        key: 'mobile'
                    },
                    {
                        title: '设备终端号',
                        key: 'deviceId'
                    },
                    {
                        title: '注册来源',
                        key: 'registerWayTypeName'
                    }
                ],columns6:[
                	{
                        title: '首次登陆时间',
                        key: ''
                    },
                    {
                        title: '首次登录IP',
                        key: ''
                    },
                    {
                        title: '上次登录时间',
                        key: ''
                    },
                    {
                        title: '上次登录IP',
                        key: 'loginIp'
                    },
                    {
                        title: '设备终端号',
                        key: 'deviceType'
                    },
                    {
                        title: '上次登陆来源',
                        key: 'osType'
                    }
                ],
                columns7:[
                	{
                		title:'设备数量',
                		key:'name',
                        width:'200px'
                	},
                	{
                		title:' ',
                		key:'age',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text'
                                    },
                                    on: {
                                        click: () => {
                                            this.showUser()
                                        }
                                    }
                                },params.row.age)
                            ]);
                        }
                	}
                ],
                columns10:[
                    {
                        title: '首次登陆时间',
                        key: 'name'
                    },
                    {
                        title: '终端设备',
                        key: 'deviceType',
                        width:'160px'

                    },
                    {
                        title: '登录次数',
                        key: 'id',
                        width:'100px'
                    },
                    {
                        title: '总登录时长',
                        key: 'address1',
                        width:'120px'

                    },
                    {
                        title: '地点',
                        key: 'location',
                        width:'80px'

                    }
                ]
			}
		},created(){
            var that = this;
            window.addEventListener('scroll',winScroll);
            function winScroll(e){
                var t = document.body.scrollTop||document.documentElement.scrollTop;  
                if(t>949){
                    that.showL = true;
                }else{
                    that.showL = false
                }
            }

        },
        mounted(){
            axios.defaults.withCredentials=true
            var that = this;
                // 活体检测信息
            axios.post('http://192.168.0.164:8081/linkface/getCheckResult',{"uid":106})
            .then(function(res){
                 
                that.huoti = res.data.data
            })

            // 活体检测信息 下面的照片
            axios.post('http://192.168.0.164:8081/linkface/getAttaBymodels',{"uid":106})
            .then(function(res){
                that.zhaopian =res.data.data
            })

            //居住信息
            axios.post('http://192.168.0.164:8081/userinfo/getUserExtendInfo',{"uid":104})
            .then(function(res){
                console.log(res.data.data)
                that.juzhu =res.data.data
                console.log(that.juzhu)
            })


            // 联系人
            axios.post('http://192.168.0.164:8081/userinfo/getContactById',{"uid":104})
            .then(function(res){
                that.lianxiren = res.data.data
            })
           // 用户信息
           axios.post('http://192.168.0.164:8081/userinfo/getById',{"uid":104})
            .then(function(res){
                that.zhanghao = res.data.data
            })
            // 银行卡信息
           axios.post('http://192.168.0.164:8081/userinfo/getBankInfoByOrderNo',{"orderNo":"DD5127151044291635"})
            .then(function(res){

                that.yinhangka = res.data.data
                console.log(that.yinhangka)

            })

             //账号信息
            axios.post('http://192.168.0.164:8081/userinfo/getById',{"uid":104})
            .then(function(res){
                console.log(res)
            })
             //用户登录日志
            axios.post('http://192.168.0.164:8081/userinfo/getThreeDaysUserLoginByUid',{"uid":106})
            .then(function(res){
                that.rizhi = res.data.data
            })
            // 用户设备

            axios.post('http://192.168.0.164:8081/userinfo/getUserDeviceCount',{"uid":98})
            .then(function(res){
                console.log(res)
                that.shebei = res.data.data
            })
        },
        methods: {
        	huitou(){
        		document.body.scrollTop = 0;
        		document.documentElement.scrollTop = 0; 
        	},
            showUser(){
                this.userModal = true;
            },
            xiangq(){
                var that = this;
                axios.post('http://192.168.0.164:8081/userinfo/selectUserDeviceById',{"uid":98})
                .then(function(res){
                    console.log(res)
                    that.shebei1= res.data.data.userDeviceOutputBOS
                    console.log(that.shebei1)
                    that.userModal = true;
                })
                
            }
        }
	}
</script>
<style>
.touxiang{
	height: 300px;
}
.height100{
    height: 50px;
}
.lishi{
	height: 100px;
}
.spanpa{
    background: #999;
    color: #fff;
    margin-bottom: 20px;
}
.spanpa span{
    padding: 0 20px;
    display: inline-block;
}
.spanpa-s{
    background: #eee;
     color: #000;
}
.zhaopian{
    width: 25%;
    margin-right: 20px;
}
.touxiang{
    line-height: 300px;
}
.shebeixiang{
    height: 100px;
    line-height: 100px;
    display: flex;
    justify-content: space-around;
    width: 400px;
}
</style>
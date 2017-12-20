<template>
	<div>

		<div class="height100">
       {{this.$route.params.user}}      
        </div>
        <hr>
		<div class="rela">
            <Table :columns="columns1" :data="data1"></Table>
            <div class="xingxing">
                <img src="../../../../static/11.png">
                当前申请信息
            </div>            
        </div>
		<div class="height100"></div>
		<div class="rela">
            <Table :columns="columns2" :data="data2"></Table>
            <div class="xingxing">
                <img src="../../../../static/11.png">
                审批记录
            </div>            
        </div>	
		<div class="height100"></div>
		<div>
			<div class="shebeiyou">
				<div>
					<p>设备指纹</p>
					<p>操作系统</p>
					<p>网络类型</p>
					<p>运营商</p>
				</div>
				<div>
					<p>{{huizong.deviceFingermark}}</p>
					<p>{{huizong.osVersion}}</p>
					<p>{{huizong.netType}}</p>
					<p>{{huizong.MNO}}</p>
				</div>
			</div>
			<div class="shebeizuo">
				<div>
					<p>IP地址</p>
					<p>IP归属地</p>
					<p>Gps地址</p>	
				</div>
                <div>
					<p>{{huizong.ip}}</p>
					<p>{{huizong.ipArea}}</p>
					<p>{{huizong.GPSAddress}}</p>	
				</div>
			</div>
		</div>
		<div class="touxiang"></div>
		<div class="xuxian"></div>
		<div class="touxiang"></div>
		<div class="rela">
            <Table :columns="columns3" :data="lishi"></Table>
            <div class="xingxing">
                <img src="../../../../static/11.png">
                汇总信息
            </div>            
        </div>
		<div class="height100"></div>
		<div class="rela">
            <Table :columns="columns4" :data="jiluxiang"></Table>
            <div class="xingxing">
                <img src="../../../../static/11.png">
                记录详情
            </div>            
        </div>
        <Modal v-model="orderModal"  title="订单详情" width="780px">
          <div>订单详情</div>
          <div class="box">

          <div style="width: 230px;display:inline-block;vertical-align:top">
            <span class="lie">订单号</span>
            <span class="biao w150">{{Onumber.hao}}</span> 
            <span class="lie">借款时间</span>
            <span class="biao w150">{{Onumber.jie}}</span>
            <span class="lie">到期日期</span>
            <span class="biao w150">{{Onumber.daoqi}}</span>
          </div>

          <div style="width:  180px;display:inline-block;vertical-align:top">
            <span class="lie">产品号</span>
            <span class="biao">{{Onumber.chanpin}}</span>
            <span class="lie">申请金额</span>
            <span class="biao">{{Onumber.shen}}</span>
            <span class="lie">发起渠道</span>
            <span class="biao">{{Onumber.faqi}}</span>
          </div>

          <div class="w150" >
            <span class="lie">产品名称</span>
            <span class="biao">{{Onumber.chanpin1}}</span>
            <span class="lie">所属机构</span>
            <span class="biao">{{Onumber.suo}}</span>
          </div>

          <div class="w150">
            <span class="lie">期限</span>
            <span class="biao">{{Onumber.qixian}}</span>
            <span class="lie">服务费</span>
            <span class="biao">{{Onumber.fuwu}}</span>
          </div>
          
          <div style="margin-top:20px;">
            <span class="lie" style="width:70px">审核时间</span>
            <span class="w150">{{Onumber.shenhe}}</span>
            <span class="lie" style="width:70px">放款时间</span>
            <span class="w150">{{Onumber.fangkuan}}</span>
            <span class="lie" style="width:70px">到帐时间</span>
            <span class="w150">{{Onumber.daozhang}}</span>
          </div>

          <hr style="margin:20px 0">

          <div>银行卡信息</div>
            <span class="lie" style="width:70px">卡号后4位</span>
            <span class="w150">{{Onumber.kahao}}</span>
            <span class="lie" style="width:70px">所属银行</span>
            <span class="w150">{{Onumber.yinhang}}</span>
            <span class="lie" style="width:70px">创建时间</span>
            <span class="w150">{{Onumber.chuangjian}}</span>
          </div>
          <div class="ppppp">
                <div>还款进度</div>
                <p>
                    <span>状态</span>
                    <span>还款日期</span>
                    <span>应还金额</span>
                    <span>实收金额</span>
                    <span>剩余应还</span>
                    <span>申请时间</span>
                    <span>放款时间</span>
                </p>
                <p>
                    <span>已换</span>
                    <span>2017年12月7日</span>
                    <span>100</span>
                    <span>70</span>
                    <span>110</span>
                    <span>2017年12月7日10:04:51</span>
                    <span>2017年12月7日10:04:54</span>
                </p>
          </div>
          
        </Modal>
		<div class="huitou" @click="huitou()" v-if="showL"></div>
	</div>
</template>
<script>
    import axios from 'axios'
    import expandRow from './jiedai1.vue';
	export default{
		name:'jiedai',
		data(){
			return{
                orderModal:false,
                showL:false,
                huizong:{},
                Onumber:{},
                lishi:[],
                jiluxiang:[],
				columns1: [
                    {
                        title: '订单号',
                        key: 'name'
                    },
                    {
                        title: '申请时间',
                        key: 'age'
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
                        title: '实际应还',
                        key: 'address2'
                    },
                    {
                        title: '每期应还',
                        key: 'address3'
                    }
                ],columns2: [
                    {
                        title: '序号',
                        key: 'name',
                        width:"100px"
                    },
                    {
                        title: '处理时间',
                        key: 'age'
                    },
                    {
                        title: '受理人',
                        key: 'address'
                    },
                    {
                        title: '审核结果',
                        key: 'address1'
                    },
                    {
                        title: '审核意见',
                        key: 'address2'
                    }
                ],columns3: [
                    {
                        title: '客户最早来源',
                        key: 'orderOriginate',
                        width:'150px'
                    },
                    {
                        title: '最早申请时间',
                        key: 'earliestApply',
                        width:'200px'
                    },
                    {
                        title: '最近一次申请时间',
                        key: 'lastApply',
                        width:'200px'
                    },
                    {
                        title: '申请总订单量',
                        key: 'totalOrder'
                    },
                    {
                        title: '申请金额',
                        key: 'applicationAmount'
                    },
                    {
                        title: '放款总额',
                        key: 'loanAmount'
                    },
                    {
                        title: '拒绝总订单量',
                        key: 'refuseOrder'
                    },{
                        title: '拒绝总额',
                        key: 'refuseAmount'
                    },
                    {
                        title: '逾期次数',
                        key: 'overdueDayMax'
                    },
                    {
                        title: '最大逾期天数',
                        key: 'address7'
                    }
                ],columns4: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: '序号',
                        type:'index',
                        key: 'name'
                    },
                    {
                        title: '最早申请时间',
                        key: 'applyDate'
                    },
                    {
                        title: '订单号',
                        key: 'orderNo'
                    },
                    {
                        title: '订单状态',
                        key: 'orderStatus'
                    },
                    {
                        title: '申请金额',
                        key: 'applyAmount'
                    },
                    {
                        title: '期限',
                        key: 'loanDayNumber'
                    },
                    {
                        title: '实际应还',
                        key: 'totalShouldRepay'
                    },
                    {
                        title: '路由策略',
                        key: 'address8',
                        render: (h, params) => {
                            return h('div', [
                              h('Button', {
                                props: {
                                  type: 'text',
                                  size:'small'
                                },
                                 on: {
                                  click: () => {
                                    this.showOrder()
                                  }
                                }
                              },'人工')
                            ])
                        }
                    },
                    {
                        title: '审核结果',
                        key: 'auditorResult'
                    },
                    {
                        title: '拒绝原因',
                        key: 'address10'
                    },
                    {
                        title: '放款金额',
                        key: 'loanAmount'
                    },
                    {
                        title: '放款时间',
                        key: 'loanDate'
                    },
                    {
                        title: '最长逾期天数',
                        key: 'dueDayNumber'
                    },
                    {
                        title: '备注',
                        key: 'remarks'
                    },
                    {
                        title: ' ',
                        key: 'address15',
                         render: (h, params) => {
                            return h('div', [
                              h('Button', {
                                props: {
                                  type: 'text',
                                  size:'small'
                                },
                                 on: {
                                  click: () => {
                                    this.showOrder()
                                  }
                                }
                              },'更多'),
                            ]);
                          }
                    }

                ],columns5: [
                    {
                        title: '序号',
                        key: 'name'
                    },
                    {
                        title: '处理时间',
                        key: 'age'
                    },
                    {
                        title: '处理人',
                        key: 'address'
                    },
                    {
                        title: '审核结果',
                        key: 'address1'
                    },
                    {
                        title: '审核意见',
                        key: 'address2'
                    }
                ],data1: [
                    {
                        name: '31444555',
                        age: '2017年12月6日10:40:03',
                        address: '800.00',
                        address1:'14天',
                        address2:'820.00',
                        address3:'205.00'
                    }
                ],data2: [
                    {
                        name: '1',
                        age: '2017年12月6日10:40:03',
                        address: '信审人员 张三01',
                        address1:'正常用户-通过',
                        address2:'信用良好，可放款'
                    }
                ],data3: [
                    {
                        name: 'APP',
                        age: '2017年12月6日10:40:03',
                        address: ' 2017年12月6日11:11:32',
                        address1:'50',
                        address2:'3000.00',
                        address3:'1000.00',
                        address4:'40',
                        address5:'2000.00',
                        address6:'12',
                        address7:'40'
                    }
                ],data4: [
                    {
                        name: '1',
                        age: '2017年12月6日10:40:03',
                        address: 'D109',
                        address1:'已结清',
                        address2:'200.00',
                        address3:'14天',
                        address4:'230.00',
                        address5:'46.00',
                        address6:'10000',
                        address7:'5000.00',
                        address8:'人工',
                        address9:'通过',
                        address11:'4000',
                        address12:'2017年12月6日14:39:22',
                        address13:'15',
                        address15:'更多',
                        cellClassName: {
                            address15: 'demo-address15'
                        }
                    }
                ],data5: [
                    {
                        name: '1',
                        age: '2017年12月6日10:40:03',
                        address: '信审人员',
                        address1:'正常人员 通过',
                        address2:'信用良好，可放款'
                    }
                ]
			}
		},created(){
            var that = this;
            window.addEventListener('scroll',winScroll);
            function winScroll(e){                
                var t = document.body.scrollTop||document.documentElement.scrollTop;  
                if(t>1149){
                    that.showL = true;
                }else{
                    that.showL = false
                }
            }
        },methods: {
        	huitou(){
        		document.body.scrollTop = 0;
        		document.documentElement.scrollTop = 0; 

        	},
            showOrder(){
                this.orderModal = true;
            }
        },mounted(){
            var that = this;
            // 当前申请信息   暂无数据
            axios.post('http://192.168.0.164:8081/order/gatherInfoByUid',{"uids":[104]})
            .then(function(res){
            console.log(res)

            })
            // 审批记录   暂无数据
            axios.post('http://192.168.0.164:8081/order/gatherInfoByUid',{"uids":[104]})
            .then(function(res){
                

            })

            // 设备信息
            axios.post('http://192.168.0.164:8081/order/getDeviceInfoByOrderNo',{"orderNo":"DD5125304476303896"})
            .then(function(res){
                 that.huizong = res.data.data[0]

            })
            // 历史汇总信息
            axios.post('http://192.168.0.164:8081/order/gatherInfoByUid',{"uids":[104]})
            .then(function(res){
            that.lishi = res.data.data
            })
            // 历史记录详情
            axios.post('http://192.168.0.164:8081/order/getAllFinishedOrderInfoByUid',{"uids":[104]})
            .then(function(res){
            that.jiluxiang = res.data.data
            })
            
            // 已完结
            axios.post('http://192.168.0.164:8081/order/getAllFinishedOrderInfoByUid',{"orderNo":"123"})
            .then(function(res){  
                                   
            })
        }
	}
</script>
<style>
	.shebeiyou{
		width: 45%;
		display: inline-block;
		height: 300px;
		background:#f2f4f6;
		margin-right: 80px;
	}
	.shebeiyou div,.shebeizuo div{
		display: inline-block;
		line-height: 70px;
		vertical-align: top;
		text-align: center;
	}
	.shebeiyou div:nth-of-type(1),.shebeizuo div:nth-of-type(1){
		width: 120px;
		font-weight: 900;
	}
	.shebeizuo{
		width: 45%;
		display: inline-block;
		height: 300px;
		background:#f2f4f6;
	}
	.xuxian{
		height: 0;
		border-top: 1px dashed #000;
		position: relative;
	}
	.xuxian:after{
		content: '历史申请记录';
		display: inline-block;
		position: absolute;
		left: 43%;
		top:-30px;
		font-size: 26px;
		font-weight: bold;
	}
    .ppppp p:nth-of-type(1){
        background: #aaa;
    }
    .ppppp p span{
        width: 100px;
        display: inline-block;
        text-align: center;
    }
    .ivu-table .demo-address15{
        
        padding: 5px;
        background: #3083e3;
    }
</style>
<template>
  <div>
    <div class="work">
      <div id="option">
        <Row :gutter="16">
          <Col span="2">
            <div class="equal">
                <Button type="primary" icon="ios-color-filter">筛选</Button>
            </div>
          </Col>
          <Col span="21">

            <div class="equal">
	          <div style="margin-top:20px">
	              <Button type="ghost" style="margin-right:-5px" >姓名&#12288;</Button>
		          <Input v-model="name" size="large" style="width: 170px"></Input>
		          <Button type="ghost" class="btn-sta">还款金额&#12288;</Button>
		          <Input v-model="orderNum" size="large" style="width: 170px"></Input>
		          <div style="margin-top:20px">
		          <Button type="ghost" class="btn-sta">手机号码&#12288;</Button>
		          <Button type="ghost" class="btn-sta">前三</Button>
		          <Input v-model="tel1" size="large" style="width: 170px"></Input>
		          <Button type="ghost" class="btn-sta">后四</Button>
		          <Input v-model="tel2" size="large" style="width: 170px"></Input>
		          </div>         	
              </div>



            </div>
          </Col>
        </Row>
      </div>
      <div class="equal">
        <Button type="primary" icon="ios-search" @click="searchTable">查询</Button>
        <Button type="primary" icon="ios-loop" @click="resetData" >重置</Button>
        <Button type="primary" icon="ios-loop" @click="resetData" >确认线下打款</Button>
      </div>

      <div id="rdate">
        <Table  :columns="worker" stripe size="default"></Table>
      </div>
      <div id="rpage">
        <Page :total="100" size="small" show-elevator show-sizer></Page>
      </div>
    </div>
    <!-- modal -->
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
      </Modal>
      <Modal v-model="xiangqing" title="" width="1000px">
      	<h3 style="text-align:center">关联用户基本信息</h3>
      	<div class="c">
      		<div class="guanl">
      			<p>注册来源</p>
      			<p>H5</p>
      		</div>
      		<div class="guanl">
      			<p>注册时间</p>
      			<p>2017年12月12日14:16:05</p>
      		</div>	
      		<div class="guanl">
      			<p>用户姓名</p>
      			<p>张三</p>
      		</div>	
      		<div class="guanl">
      			<p>手机号码</p>
      			<p>1884282661</p>
      		</div>		
      		<div class="guanl">
      			<p>身份证号</p>
      			<p>210282199602112110</p>
      		</div>	
      		<div class="guanl">
      			<p>当前剩余应还</p>
      			<p>560.00</p>
      		</div>	
      		<div class="guanl">
      			<p>逾期天数</p>
      			<p>70</p>
      		</div>	
      		<div class="guanl">
      			<p>逾期类型</p>
      			<p>D3</p>
      		</div>	
      	</div>
      	<div class="lianjsid">
      		<div class="lianxix">
      		<span>第一联系人</span>
      		<span>配偶</span>
      		<span>王小</span>
      		<span>1300000</span>
      	</div>
      	<div  class="lianxix">
      		<span>第二联系人</span>
      		<span>朋友</span>
      		<span>李四</span>
      		<span>1300000</span>
      	</div> 
      	</div>
      	<h3 style="text-align:center">订单详情</h3>
      	<div>
      		<span class="lie">订单号</span>
            <span class="biao w90"></span>
            <span class="lie">创建时间</span>
            <span class="biao w90"></span>
            <span class="lie">账单状态</span>
            <span class="biao w90"></span>
            <span class="lie">实际应还</span>
            <span class="biao w90"></span>
            <span class="lie">实际以还</span>
            <span class="biao w90"></span>
            <span class="lie">借款本金</span>
            <span class="biao w90"></span>
            <span class="lie">期限</span>
            <span class="biao w90"></span>
            <span class="lie">利息</span>
            <span class="biao w90"></span>
      	</div>
      	<div>
      		<span class="lie">利息</span>
            <span class="biao w90"></span>
            <span class="lie lieeee">快速审核费</span>
            <span class="biao w90"></span>
            <span class="lie lieeee">账户管理费</span>
            <span class="biao w90"></span>
            <span class="lie">滞纳金</span>
            <span class="biao w90"></span>
            <span class="lie lieeee">逾期管理费</span>
            <span class="biao w90"></span>
      	</div>
      	<div>
      		<span class="lie">审核时间</span>
      		<span class="biao w150"></span>
      	</div>
      	<div>
      		<span class="lie">放款时间</span>
      		<span class="biao w150"></span>
      	</div>
      	<div>
      		<span class="lie">到账时间</span>
      		<span class="biao w150"></span>
      	</div>
      </Modal>

  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'sdxzjl',
  data() {
    return {
      orderModal:false,
      xiangqing:true,
      name:'',
      orderNum:'',
      tel:'',
      tel1:'',
      tel2:'',
      Onumber:{},
      Snumber:{},
      worker:[
        {
          type: 'index',
          width:30,
          align: 'center'
        },
        {
          title: '平台用户姓名',
          key: 'product'
        },
        {
          title: '手机号码',
          key: 'idCard',
        },
        {
          title: '身份证号',
          key: 'orderNum',
          width:300,
        },
        {
          title: '订单号',
          key: 'applyTime'
        },
        {
          title: '剩余应还',
          key: 'applyMoney'
        },
        {
          title: '逾期天数',
          key: 'serviceMoney'
        },
        {
          title: '逾期类型',
          key: 'payMoney'
        }
      ],
	};
  },
  mounted(){
    var url = common.apidomain //188:8088
   this.urls = url

   var url0 = common.apifeng  //105:8081
   this.urla = url0

   var url1 = common.apiweng
   this.urlb  = url1
  },
  methods: {

    resetData(){//我的工作台 重置
      this.orderNum=''
      this.name=''
      this.tel=''
      this.tel1=''
      this.tel2=''

    },
    handleClose() {
      this.showTag = false;
      // this.$router.push('/collection')
    },
    showOrder(index){ //查看订单
      this.orderModal=true;
    },
    showRepayment(index){//还款明细
      this.repaymentModal=true;
    },
    showRecord(){ //处理记录
      this.recordModal=true;
    },

    searchTable(){  //我的工作台查询

    }


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lieeee{
	width: 85px;
}
 .btn-time{
  padding-left: 0;

}
.btn-sta{
  margin-right: -5px;
  margin-left:40px;
}
 .btn-end{
   margin-left:40px;
}
.equal{
  margin-top:30px;
}
.zi{
  color:#ccc72a;
  font-size: 24px;
}
.icon{
  color:#ccc72a;
  size:20px;
}
.lable{
  background-color: #495060;

}
.w100{
	width: 80px;
	text-align: center;
}
.guanl{
	display: inline-block;
	float: left;
	text-align: center;
	padding:15px;
}
.guanl p:nth-of-type(1){
	margin:20px 0;
	font-size: 16px;
	color: #1335dd;
}
.lianjsid{
	display: flex;
	justify-content: space-around;
	margin-top: 20px;
}
.w90{
	width: 100px;
	display: inline-block;
}

</style>

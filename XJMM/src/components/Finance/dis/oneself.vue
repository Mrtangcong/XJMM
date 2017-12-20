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
	              <Button type="ghost" style="margin-right:-5px" >名字&#12288;</Button>
		          <Input v-model="name" size="large" style="width: 170px"></Input>
		          <Button type="ghost" class="btn-sta">还款金额&#12288;</Button>
		          <Input v-model="orderNum" size="large" style="width: 170px"></Input>
		          <div style="margin-top:20px">
		          <Button type="ghost" class="btn-sta">手机号码&#12288;</Button>
		          <Button type="ghost" class="btn-sta">前三</Button>
		          <Input v-model="tel1" size="large" style="width: 170px"></Input>
		          <Button type="ghost" class="btn-sta">后二</Button>
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
        <Table  :columns="columns10" :data="list1" stripe size="default"></Table>
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
  </div>
</template>


<script>
import axios from 'axios';
 import expandRow from './table-expand.vue';
export default {
  name: 'sdxzjl',
  components: { expandRow },
  data() {
    return {
      orderModal:false,
      xiangqing:true,
      list1:[],
      name:'',
      orderNum:'',
      tel:'',
      tel1:'',
      tel2:'',
      Onumber:{},
      Snumber:{},
      columns10: [
        
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
          type: 'index',
          title:'序号',
          width:80,
          align: 'center'
        },
        {
          type: 'selection',
          width:60,
          align: 'center'
        },
        {
            title: '平台用户姓名',
            key: 'userName'
        },
        {
            title: '手机号码',
            key: 'telNum'
        },
        {
            title: '身份证号码',
            key: 'idCardNo'
        },
        {
            title: '订单号',
            key: 'orderNo'
        },
        {
            title: '剩余应还',
            key: 'leftRepayAmount'
        },
        {
            title: '逾期天数',
            key: 'dueDays'
        },
        {
            title: '逾期类型',
            key: 'dueType'
        }
      ]
	};
  },
  mounted(){
    var that = this
    axios.post('http://192.168.0.105:8081/payment/getLocateUsers',{})
            .then(function(res){
                console.log(res)
                that.list1=  res.data.data
            })
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
      var that = this
      axios.post('http://192.168.0.105:8081/payment/getLocateUsers',{"repayAmount":that.orderNum,"telNumBehind2":that.tel2,"telNumFront3":that.tel1,"userName":that.name})
            .then(function(res){
                console.log(res)
                that.list1=  res.data.data
            })
    }


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>

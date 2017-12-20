<template>
  <div>
    <div class="tage">
      <Tag  class="rengong"  v-if="show" closable @on-close="handleClose">成功放款明细</Tag>
    </div>
    
    <div class="risk">
      <div id="option">  
        <Row :gutter="16">        
          <Col span="2">
            <div class="equal">
                <Button type="primary" icon="ios-color-filter">筛选</Button>
            </div>
          </Col>
          <Col span="21">
            <div class="equal">   
              <Button type="text" class="btn-time">申请时间</Button>
              <Date-picker v-model="staData" type="date" placeholder="选择日期" style="width: 170px"></Date-picker>
              -----
              <Date-picker v-model="endData" type="date" placeholder="选择日期" style="width: 170px"></Date-picker>      
            </div> 
            <div class="equal">
              <Button type="ghost" style="margin-right:-5px">受理人&#12288;</Button>
               <Input v-model="orderNum" size="large" style="width: 170px"></Input>
            </div>
          </Col>
        </Row>
      </div>
      <div class="equal">
        <Button type="primary" icon="ios-search" @click="searchTable">查询</Button>
        <Button type="primary" @click="resetData" icon="ios-loop">重置</Button>
        <!-- <Button type="primary" @click="handleTagsAdd" slot="extra">审核</Button> -->
      </div>
      <div id="rdate">
        <Table  :columns="worker" :data="lishi" stripe size="default"></Table>
      </div>
      <div id="rpage">
        <Page :total="100" size="small" show-elevator show-sizer @on-change="fenye"></Page>
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
      <Modal v-model="recordModal" title="处理记录">
          <div v-for="item in list" class="chuli">
              <p>
                <span>{{item.sj}}</span>由
                <span> {{item.prean}} </span> 
                <span> {{item.name}} </span>
                <span> {{item.tijiao}} </span>
              </p>

          </div>
        </Modal>
      <Modal v-model="userModal" title="用户基本信息" width='700px'>
          <div class="h1">基本信息</div>
          <div class="box1">
            <div class="vero">
              <span class="lie">婚姻状况</span>
              <span class="biao w70" >{{Snumber.hao}}</span> 
              <span class="lie">学历</span>
              <span class="biao w70" >{{Snumber.jie}}</span>
              <span class="lie">单位所在地</span>
              <span class="biao w70" >{{Snumber.daoqi}}</span>
            </div>
            <div class="vero">
              <span class="lie" style="width:90px">客户账户信息</span>
              <span class="biao" style="width:80px;display:inline-block">{{Snumber.hao}}</span> 
              <span class="lie" style="width:90px">子女状态</span>
              <span class="biao" style="width:80px;display:inline-block">{{Snumber.jie}}</span>
              <span class="lie" style="width:90px">职业状态</span>
              <span class="biao" style="width:80px;display:inline-block">{{Snumber.daoqi}}</span>
              <span class="lie" style="width:90px">居住类型</span>
              <span class="biao" style="width:80px;display:inline-block">{{Snumber.daoqi}}</span>
            </div>
            <div style="width: 170px;display:inline-block;vertical-align:top">
              <span class="lie">性别</span>
              <span class="biao w70" >{{Snumber.hao}}</span> 
              <span class="lie">出生日期</span>
              <span class="biao w70" >{{Snumber.jie}}</span>
              <span class="lie">单位名称</span>
              <span class="biao w70" >{{Snumber.daoqi}}</span>
            </div>
            <div class="h1" style="margin:20px 0">证件信息</div>
            <div>
              <span class="lie">证件名称</span>
              <span class="biao" style="width:100px;display:inline-block">{{Snumber.hao}}</span> 
              <span class="lie">证件类型</span>
              <span class="biao" style="width:100px;display:inline-block">{{Snumber.jie}}</span>
              <span class="lie">证件号</span>
              <span class="biao" style="width:100px;display:inline-block">{{Snumber.daoqi}}</span>
            </div>
            <div class="h1" style="margin:20px 0">联系人信息</div>
            <div>
                <span class="lie" style="width:130px;text-align:center">顺序</span>
                <span class="lie" style="width:130px;text-align:center">关系</span>
                <span class="lie" style="width:130px;text-align:center">姓名</span>
                <span class="lie" style="width:130px;text-align:center">手机号</span>
            </div>
            <div>
                <span class="lianxi">第一联系人</span>
                <span class="lianxi">父母</span>
                <span class="lianxi">朝气</span>
                <span class="lianxi">18842872661</span>
            </div>
            <div>
                <span class="lianxi">第一联系人</span>
                <span class="lianxi">父母</span>
                <span class="lianxi">朝气</span>
                <span class="lianxi">18842872661</span>
            </div>
            <div class="h1" style="margin:20px 0">登录信息</div>
            <div>
              <span class="lie">注册渠道</span>
              <span class="biao">APP</span>
              <span class="lie">登录号</span>
              <span class="biao">1344848512</span>
              <span class="lie" style="width:90px;">首次登录时间</span>
              <span class="biao biaoa">2017年12月1日 11:28:40</span>
              <span class="lie" style="width:90px;">首次登录设备</span>
              <span class="biao">小米12351243</span>
              <span class="lie" style="width:90px;">上次登录时间</span>
              <span class="biao biaoa">2017年12月1日 11:28:40</span>
              <span class="lie" style="width:90px;">上次登录设备</span>
              <span class="biao biaoa">小米12351243</span>
            </div>
          </div>
        </Modal>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'Success',
  data() {
    return {
      show:true,
      self: this,
      show:true,
      orderModal:false,
      orderNum:'',
      recordModal:false,
      userModal:false,
      shouli:'',
      Onumber:{},
      Snumber:{},
      list:[
        {sj:'2017-11-15 10:00:00',prean:'财务人员',name:'何四',tijiao:'确认打款',xinxi:'djkasojdgksdklfj'},
        {sj:'2017-11-15 10:00:00',prean:'信审人员',name:'李二',tijiao:'确认打款',xinxi:'dasidjnsdklfmsdf'},
        {sj:'2017-11-15 10:00:00',prean:'财务人员',name:'吴老',tijiao:'确认打款',xinxi:'sadasdasdasdasd'},
        {sj:'2017-11-15 10:00:00',prean:'财务人员',name:'七八',tijiao:'确认打款'}
      ],

      repaymentStatus:[
        {value:1,label:'已结清'},
        {value:0,label:'未结清'}
      ],
      accepter:[],
      dispatcher:[],
      worker:[
        {
          type: 'index',
          width:30,
          align: 'center'
        },
        {
          type: 'selection',
          width:30,
          align: 'center'
        },
        {
          title: '操作',
          width:120,
          key: 'action',
          render: (h, params) => {
            return h('Select', [
              h('Button', {
                props: {
                  type: 'text',
                  size:'small'
                },
                on: {
                  click: () => {
                    this.showOrder(params.row.orderNum)
                  }
                }
              },'查看订单'),
              h('Button', {
                props: {
                  type: 'text',
                  size:'small'
                },
                on: {
                  click: () => {
                    this.showRecord(params.row.orderNum)
                  }
                }
              },'处理记录')
            ]);
          }
        },
        {
          title: '产品',
          key: 'production'
        },{
          title: "姓名",
          key: 'production'
        },
        {
          title: '身份证号',
          key: 'idCard',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size:'small'
                },
                on: {
                  click: () => {
                    this.showUser(params.row.idCardNum)
                  }
                }
              },params.row.idCardNum)
            ]);
          }
        },
        {
          title: '订单号',
          key: 'orderNum',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size:'small'
                },
                 on: {
                  click: () => {
                    this.showOrder(params.row.orderNo)
                  }
                }
              },params.row.orderNo),
            ]);
          }
        },
        {
          title: '打款时间',
          key: 'submitDate',
          sortable: true
        },
        {
          title: '申请金额',
          key: 'applyAmount'
        },
        {
          title: '期限',
          key: 'limitTime'
        },
        {
          title: '利息',
          key: 'accrual'
        },
        {
          title: '滞纳金',
          key: 'lateFee'
        },
        {
          title: '约定还款日',
          key: 'repayPlanDate'
        },
        {
          title: '受理人',
          key: 'operator'
        },
        {
          title: '续借',
          key: 'renew'
        },
        {
          title: '是否已还',
          key: 'repay'
        },
        {
          title: '账单状态',
          key: 'repayStatus'
        },
        {
          title: '剩余应还',
          key: 'leftRepayAmount'
        }
      ],
      workerdata:[],
      lishi:[],
      staData:'',
      endData:'',
      mrepaymentStatus:'',
      mdispatcher:'',
      maccepter:''
   
    };
  },
  mounted(){
    var that = this
     axios.post('http://192.168.0.105:8081/payment/getPayDetailInfo',{})
            .then(function(res){
                console.log(res)
                that.lishi =res.data.data 
            })
  },
  methods: {
    handleClose () {
            this.show = false;
            this.$router.push('/Finance')
        },
    resetData(){// 重置
      this.staData='',
      this.endData='',
      this.mrepaymentStatus='',
      this.mdispatcher='',
      this.maccepter=''
    },
     
    showOrder(index){ //查看订单
      this.orderModal=true;
    },
    showRecord(){ //处理记录
      this.recordModal=true;
    },
    showUser(){//用户基本信息
       this.userModal=true;
    },
    fenye(index){
      var that = this
      console.log(index)
      axios.post('http://192.168.0.105:8081/payment/getPayDetailInfo',{"pageNum":index})
            .then(function(res){
                console.log(res)
                that.lishi =res.data.data 
            })
    },
    searchTable(){  //我的工作台查询
      var that = this
      
      if(this.staData != ''){
          var sta = this.staData
          var full = sta.getFullYear()
          var month = sta.getMonth() + 1
          var data  = sta.getDate()
          if(data<10){
            data = '0' +data
          }
          var ac  = full +'-' + month +'-' + data

          var sta = this.endData
          var full1 = sta.getFullYear()
          var month1 = sta.getMonth() + 1
          var data1  = sta.getDate()
          if(data1<10){
            data1 = '0' +data1
          }
          var ac1  = full1 +'-' + month1 +'-' + data1
      }
     

      axios.post('http://192.168.0.105:8081/payment/getAllPayRecords',{"startTime":ac,"endTime":ac1,"operator":that.orderNum})
            .then(function(res){
                console.log(res)
                that.lishi =res.data.data
                // 页数=res.data.totalPage
            })
    },
    // handleTagsAdd(){//审核

    // },
   
   
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
.equal{
  margin-top:30px;
}

</style>

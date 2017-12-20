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
              <Button type="text" class="btn-time">实际还款日期</Button>
              <Date-picker v-model="actualSta" type="date" placeholder="起" style="width: 130px"></Date-picker>
              -----
              <Date-picker v-model="actualEnd" type="date" placeholder="止" style="width: 130px"></Date-picker>
            </div>
            <div class="equal">
              <Button type="ghost" style="margin-right:-5px">还款渠道</Button>
              <Select clearable v-model="mcaseStatus" style="width:170px" size="large">
              	<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Button type="ghost" style="margin-right:-5px">还款标识</Button>
              <Select clearable v-model="mcaseStatus1" style="width:170px" size="large">
              	<Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Button type="ghost" style="margin-right:-5px">销账人员</Button>
              <Select clearable v-model="mcaseStatus2" style="width:170px" size="large">
              	<Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
	          <div style="margin-top:20px">
	              <Button type="ghost" style="margin-right:-5px" >订单号&#12288;</Button>
		          <Input v-model="orderNum" size="large" style="width: 170px"></Input>
		          <Button type="ghost" class="btn-sta">&#12288;姓名&#12288;</Button>
		          <Input v-model="name" size="large" style="width: 170px"></Input>
		          <Button type="ghost" class="btn-sta">手机号&#12288;</Button>
		          <Input v-model="tel" size="large" style="width: 170px"></Input>            	
              </div>



            </div>
          </Col>
        </Row>
      </div>
      <div class="equal">
        <Button type="primary" icon="ios-search" @click="searchTable">查询</Button>
        <Button type="primary" icon="ios-loop" @click="resetData" >重置</Button>
      </div>

      <div id="rdate">
        <Table  :columns="worker"  :data="workerdata" stripe size="default"></Table>
      </div>
      <div id="rpage">
        <Page :total="100" size="small" show-elevator show-sizer></Page>
      </div>
    </div>
    <!-- modal -->
      <Modal v-model="userModal" title="用户基本信息" width='700px':mask-closable="false">
          <div class="h1">基本信息</div>
          <div class="box1">
            <div class="vero">
              <span class="lie">客户名称</span>
              <span class="biao w70" >{{Snumber.userName}}</span> 
              <span class="lie">婚姻状态</span>
              <span class="biao w70" >{{Snumber.marriageName}}</span>
              <span class="lie">学历</span>
              <span class="biao w70" >{{Snumber.educationName}}</span>
              <span class="lie">单位名称</span>
              <span class="biao w70" >{{Snumber.unitName}}</span>
            </div>
            <div class="vero">
              <span class="lie" style="width:90px">性别</span>
              <span class="biao" style="width:80px;display:inline-block">{{Snumber.hao}}</span> 
              <span class="lie" style="width:90px">子女状况</span>
              <span class="biao" style="width:80px;display:inline-block">{{Snumber.childrenConditionName}}</span>
              <span class="lie" style="width:90px">职业状态</span>
              <span class="biao" style="width:80px;display:inline-block">{{Snumber.daoqi}}</span>
              <span class="lie" style="width:90px">居住类型</span>
              <span class="biao" style="width:80px;display:inline-block">{{Snumber.daoqi}}</span>
            </div>
            <div style="width: 170px;display:inline-block;vertical-align:top">
              
              <span class="lie">出生日期</span>
              <span class="biao w70" >{{Snumber.birthdayStr}}</span>
              <span class="lie">单位所在地</span>
              <span class="biao w70" >{{Snumber.unitAddress}}</span>
            </div>
            <div class="h1" style="margin:20px 0">证件信息</div>
            <div>
              <span class="lie">客户名称</span>
              <span class="biao" style="width:100px;display:inline-block">{{Snumber.userName}}</span> 
              <span class="lie">证件类型</span>
              <span class="biao" style="width:100px;display:inline-block">{{Snumber.idCardName}}</span>
              <span class="lie">证件号</span>
              <span class="biao" style="width:100px;display:inline-block">{{Snumber.idCard}}</span>
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
      <Modal v-model="orderModal"  title="订单详情":mask-closable="false" width="980px">
        <div>订单详情</div>
        <div class="box1">

          <div style="width: 230px;display:inline-block;vertical-align:top">
            <span class="lie">订单号</span>
            <span class="biao w150">{{Onumber.orderNo}}</span> 
            <span class="lie">剩余应还</span>
            <span class="biao w150">{{Onumber.applyDate}}</span>
            <span class="lie">创建时间</span>
            <span class="biao w150">{{Onumber.applyDate}}</span>
            <span class="lie">到期日期</span>
            <span class="biao w150">{{Onumber.dueDay}}</span>
          </div>

          <div style="width:  180px;display:inline-block;vertical-align:top">
            <span class="lie">发起渠道</span>
            <span class="biao">{{Onumber.applyWay}}</span>
            <span class="lie">实际已还</span>
            <span class="biao">{{Onumber.chanpin}}</span>
            <span class="lie">快速审核费</span>
            <span class="biao">{{Onumber.applyAmount}}</span>
            <span class="lie">逾期天数</span>
            <span class="biao">{{Onumber.applyAmount}}</span>           
          </div>
          <div class="w150">
            <span class="lie">利息</span>
            <span class="biao">{{Onumber.qixian}}</span>
            <span class="lie">免减总额</span>
            <span class="biao">{{Onumber.suo}}</span>
            <span class="lie">账户管理费</span>
            <span class="biao">{{Onumber.suo}}</span>
            <span class="lie">逾期类型</span>
            <span class="biao">{{Onumber.suo}}</span>
          </div>
          <div class="w150">
            <span class="lie">申请金额</span>
            <span class="biao">{{Onumber.qixian}}</span>
            <span class="lie">滞纳金</span>
            <span class="biao">{{Onumber.fuwu}}</span>
          </div>
          <div class="w150">
            <span class="lie">期限</span>
            <span class="biao">{{Onumber.qixian}}</span>
            <span class="lie">逾期管理费</span>
            <span class="biao">{{Onumber.fuwu}}</span>
          </div>
          
          <div style="margin-top:20px;">
            <span class="lie" style="width:70px">审核时间</span>
            <span class="w150">{{Onumber.auditDate}}</span>
            <span class="lie" style="width:70px">放款时间</span>
            <span class="w150">{{Onumber.loanDate}}</span>
            <span class="lie" style="width:70px">到帐时间</span>
            <span class="w150">{{Onumber.daozhang}}</span>
          </div>
          <hr style="margin:20px 0">
          <div>
             <Table :columns="mianjian" :data="mianjiandata"></Table>
          </div>
          <hr style="margin:20px 0">

          <div>银行卡信息</div>
            <span class="lie" style="width:70px">卡号后4位</span>
            <span class="w150">{{Anumber.bankCard}}</span>
            <span class="lie" style="width:70px">所属银行</span>
            <span class="w150">{{Anumber.belongBank}}</span>
            <span class="lie" style="width:70px">创建时间</span>
            <span class="w150">{{Anumber.createDate}}</span>
        </div>
      </Modal>
      <Modal v-model="recordModal" title="处理记录">
          <div v-for="item in list" :key="item.index" class="chuli">
              <p>
                <span>{{item.sj}}</span>由
                <span> {{item.prean}} </span> 
                <span> {{item.name}} </span>
                <span> {{item.tijiao}} </span>
              </p>

          </div>
      </Modal>

      <Modal v-model="repaymentModal" title="还款明细" width="1000px":mask-closable="false">
        <div class="box1">
          <div class="vero">
              <span class="lie">贷款金额</span>
              <span class="biao w70" >{{Hnumber.loanAmount}}</span> 
              <span class="lie">放款金额</span>
              <span class="biao w70" >{{Hnumber.giveAmount}}</span>
              <span class="lie">逾期类型</span>
              <span class="biao w70" >{{Hnumber.dueType}}</span>
          </div>
          <div class="vero">
              <span class="lie">期限</span>
              <span class="biao w70" >{{Hnumber.loanDayNumber}}</span> 
              <span class="lie">最后还款日</span>
              <span class="biao w70" >{{Hnumber.endDate}}</span>
          </div>
          <div class="vero">
              <span class="lie">借款日期</span>
              <span class="biao w70" >{{Hnumber.applyDate}}</span> 
              <span class="lie">应还金额</span>
              <span class="biao w70" >{{Hnumber.totalShouldPay}}</span>
          </div>
          <div class="vero">
              <span class="lie">放款日期</span>
              <span class="biao w70" >{{Hnumber.loanDate}}</span> 
              <span class="lie">剩余应还金额</span>
              <span class="biao w70" >{{Hnumber.lastAmount}}</span>
          </div>
          <div>
            <Table :columns="repayDetail" :data="repayDetaildata"></Table>
          </div>
        </div>
      </Modal>

  </div>
</template>


<script>
import axios from 'axios';
import common from '../../../router/common.js'

export default {
  name: 'sdxzjl',
  data() {
    return {
      userModal:false,
      orderModal:false,
      recordModal:false,
      repaymentModal:false,//还款明细

      
      Onumber:{},
      Anumber:{},
      Snumber:{},
      Hnumber:{},
      list:[
        {sj:'2017-11-15 10:00:00',prean:'财务人员',name:'何四',tijiao:'确认打款',xinxi:'djkasojdgksdklfj'},
        {sj:'2017-11-15 10:00:00',prean:'信审人员',name:'李二',tijiao:'确认打款',xinxi:'dasidjnsdklfmsdf'},
        {sj:'2017-11-15 10:00:00',prean:'财务人员',name:'吴老',tijiao:'确认打款',xinxi:'sadasdasdasdasd'},
        {sj:'2017-11-15 10:00:00',prean:'财务人员',name:'七八',tijiao:'确认打款'}
      ],
      repayDetail:[//还款明细
        {
          type: 'index',
          width:45,
          align: 'center'
        },
        {
          title: '实际还款日期',
          width:120,
          key: 'actualRepayDate'
        },
        {
          title: '应还金额',
          width:100,
          key: 'shouldRepay'
        },
        {
          title: '本次实收金额',
           width:120,
          key: 'actualReceive'
        },
        {
          title: '剩余应还',
          width:100,
          key: 'lastAmount'
        },
        {
          title: '提交时间',
          width:100,
          key: 'submitDate'
        },
        {
          title: '还款渠道',
          width:100,
          key: 'repayWay'
        },
        {
          title: '还款方式',
          width:100,
          key: 'repayMethod'
        },
        {
          title: '销账人员',
          width:100,
          key: 'eraseMan'
        },
        {
          title: '状态',
          width:80,
          key: 'repayStatus'
        }
      ],
      repayDetaildata:[],
      mianjian:[//免减明细
        {
          type: 'index',
          align: 'center',
          title:' '
        },
        {
          title: '免减时间',
          key: 'reduceDate'
        },
        {
          title: '免减科目',
          key: 'reduceItem'
        },
        {
          title: '免减金额',
          key: 'reduceAmount'
        },
        {
          title: '操作人',
          key: 'reduceOperator'
        }
      ],
      mianjiandata:[],
      worker:[
        {
          title:' ',
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
                    this.showOrder(params.row.orderNo)
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
                    this.showRecord(params.row.orderNo)
                  }
                }
              },'处理记录'),
              h('Button', {
                props: {
                  type: 'text',
                  size:'small'
                },
                on: {
                  click: () => {
                    this.showRepayment(params.row.orderNo)
                  }
                }
              },'还款明细')
            ]);
          }
        },
        {
          title: '姓名',
          key: 'userName'
        },
        {
          title: '手机号码',
          key: 'mobile',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size:'small'
                },
                 on: {
                  click: () => {
                    this.showUser(params.row.orderNo)
                  }
                }
              },params.row.orderNo),
            ]);
          }
        },
        {
          title: '订单号',
          key: 'orderNo',
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
          title: '借款本金',
          key: 'loanAmount',
          sortable: true
        },
        {
          title: '账户管理费',
          key: 'accountManageFee'
        },
        {
          title: '利息',
          key: 'accrualFee'
        },
        {
          title: '逾期管理费',
          key: 'delayManageFee'
        },
        {
          title: '快速审核费',
          key: 'fastAuditFee'
        },
        {
          title: '放款金额',
          key: 'loanAmount'
        },
        {
          title: '应还金额',
          key: 'shouldPay '
        },
        {
          title: '实际已还',
          key: 'alreadyPay'
        },
        {
          title: '剩余应还',
          key: 'residuePay'
        },
        {
          title: '帐单状态？？',
          key: 'payMoney3'
        },
        {
          title: '约定还款日',
          key: 'endDate '
        },
        {
          title: '实际还款日期',
          key: 'actualRepayDate'
        },
        {
          title: '逾期类型',
          key: 'dueType'
        },
        {
          title: '期限',
          key: 'loanDayNumber'
        },
        {
          title: '逾期天数',
          key: 'dueDayNumber'
        },
        {
          title: '滞纳金',
          key: 'delayFee'
        },
        {
          title: '还款渠道',
          key: 'repayWay'
        },
        {
          title: '还款标识',
          key: 'repayLogo'
        },
        {
          title: '销账人员',
          key: 'operator'
        },
        {
          title: '备注',
          key: 'notes'
        }
      ],

      workerdata:[],

      caseStatus:[],
      overType:[],
      accepter:[],
      cityList:[
      	{
	        value: '0',
	        label: 'App-连连支付'
	      },
	      {
	        value: '1',
	        label: '支付宝'
        },
        {
	        value: '2',
	        label: '微信'
	      }
      ],
      cityList1:[
        {
	        value: 0,
	        label: '部分还款'
	      },
      	{
	        value: 1,
	        label: '全部还款'
	      }
	      
      ],
      cityList2:[
      	{
	        value: '01-财务人员',
	        label: '01-财务人员'
	      },
	      {
	        value: '02-财务人员',
	        label: '02-财务人员'
	      }
      ],


      actualSta:'',
      actualEnd:'',
      mcaseStatus:'',
      mcaseStatus1:'',
      mcaseStatus2:'',
      orderNum:'',
      name:'',
      tel:'',
      urls:'',
      urla:'',
      urlb:''


    };
  },
  mounted(){

   var url = common.apidomain //188:8088
   this.urls = url

   var url0 = common.apifeng  //105:8081
   this.urla = url0

   var url1 = common.apiweng
   this.urlb  = url1
  //数据展示
   var that = this;
      axios.post(this.urls+'/payment/alreadyPay/all',{})
         .then(function(res) {
          //  console.log(res);
            that.workerdata=res.data.data;
         });


  },
  methods: {

    resetData(){//我的工作台 重置

      this.actualSta=''
      this.actualEnd=''
      this.mcaseStatus=''
      this.mcaseStatus1=''
      this.mcaseStatus2=''
      this.orderNum=""
      this.name=""
      this.tel=""

    },
    handleClose() {
      this.showTag = false;
      // this.$router.push('/collection')
    },
    showUser(){//用户基本信息
       this.userModal=true;
        console.log(1);
       var that = this;
      axios.post(this.urls+'/userinfo/getUserExtendInfo', {
        // "orderNo": that.orderNum,
      })
        .then(function(res) {
          console.log(res);
          console.log(1);
          //  that.workerdata=res.data.data;
        })

    },
    showOrder(index){ //查看订单

      this.orderModal=true;
      var that = this;
      axios.get(this.urls+'/loanfollow/followlist/orderDetail_01/DD5125304476303896')
         .then(function(res) {
           console.log(res);
            that.Onumber=res.data.data;
         });
      axios.get(this.urls+'/loanfollow/followlist/orderDetail_02/DD5125304476303896')
        .then(function(res) {
          // console.log(res);
           that.Anumber=res.data.data;
        });
        axios.get(this.urls+'/loanfollow/followlist/orderDetail_03/DD5127151044291635')
        .then(function(res) {
          // console.log(res);
           that.mianjiandata=res.data.data;
        })
    },
    
    showRepayment(index){//还款明细
      this.repaymentModal=true;
      var that = this;
      axios.get(this.urls+'/loanfollow/followlist/repayDetail_01/'+'DD5125304476303896')
        .then(function(res) {
          // console.log(res);
          that.Hnumber = res.data.data;
        });
         axios.post(this.urls+'/loanfollow/followlist/repayDetail_02', {
        "orderNo": "DD5125304476303896",
        "page": {
          "currentPage": 6,
          "pageNumber": 123
        }
      })
        .then(function(res) {
          // console.log(res);
          that.repayDetaildata = res.data.data;
        })

    },
    showRecord(){ //处理记录
      this.recordModal=true;
    },

    searchTable(){  //我的工作台查询
      console.log(this.urls);
      var that = this;
     
    
      axios.post(this.urls+'/payment/alreadyPay/all', {
        // "actualRepayDateMax": this.actualSta,
        // "actualRepayDateMin": this.actualEnd,
        // "mobile": this.tel,
        // "operator": this.mcaseStatus2,
        // "orderNo": this.orderNum,
        // "repayLogo":this.mcaseStatus1,
        // "repayWay": this.mcaseStatus,
        // "userName": this.name,
        // "page": {
        //   "currentPage": 0,
        //   "pageNumber": 10
        // }
       
      })
         .then(function(res) {
          //  console.log(res);
            that.workerdata=res.data.data;
         });

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
</style>

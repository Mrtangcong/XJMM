<template>
  <div>
    <div class="work">
      <div class="lable">
        <p class="zi"><Icon type="ios-paper-outline"class="icon" ></Icon>待办工作</p>
      </div>
      <div id="option">
        <Row :gutter="16">
          <Col span="2">
            <div class="equal">
                <Button type="primary" icon="ios-color-filter">筛选</Button>
            </div>
          </Col>
          <Col span="21">
            <div class="equal">
              <Button type="ghost" style="margin-right:-5px">案件状态</Button>
              <Select clearable v-model="mcaseStatus" style="width:170px" size="large">
                <Option v-for="item in caseStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Button type="ghost" class="btn-sta">受理人员</Button>
              <Select clearable v-model="maccepter" style="width:170px" size="large">
                <Option v-for="item in accepter" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
               <Button type="text" class="btn-time">申请时间</Button>
              <Date-picker v-model="staData" type="date" placeholder="选择日期" style="width: 170px"></Date-picker>
              -----
              <Date-picker v-model="endData" type="date" placeholder="选择日期" style="width: 170px"></Date-picker>
            </div>
            <div class="equal">
              <Button type="ghost" style="margin-right:-5px" >订单号&#12288;</Button>
              <Input v-model="orderNum" size="large" style="width: 170px"></Input>
              <Button type="ghost" class="btn-sta">&#12288;姓名&#12288;</Button>
              <Input v-model="name" size="large" style="width: 170px"></Input>
              <Button type="ghost" class="btn-sta">手机号&#12288;</Button>
              <Input v-model="tel" size="large" style="width: 170px"></Input>


            </div>
          </Col>
        </Row>
      </div>
      <div class="equal">
        <Button type="primary" icon="ios-search" @click="searchTable">查询</Button>
        <Button type="primary" @click="resetData" icon="ios-loop">重置</Button>
        <Button type="primary" slot="extra">重新分配案件</Button>
      </div>

      <div id="rdate">
        <Table  :columns="worker" :data="workerdata" stripe size="default"></Table>
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
            <span class="biao w150">{{Onumber.orderNo}}</span> 
            <span class="lie">借款时间</span>
            <span class="biao w150">{{Onumber.applyDate}}</span>
            <span class="lie">到期日期</span>
            <span class="biao w150">{{Onumber.dueDay}}</span>
          </div>

          <div style="width:  180px;display:inline-block;vertical-align:top">
            <span class="lie">产品号</span>
            <span class="biao">{{Onumber.chanpin}}</span>
            <span class="lie">申请金额</span>
            <span class="biao">{{Onumber.applyAmount}}</span>
            <span class="lie">发起渠道</span>
            <span class="biao">{{Onumber.applyWay}}</span>
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
            <span class="w150">{{Onumber.auditDate}}</span>
            <span class="lie" style="width:70px">放款时间</span>
            <span class="w150">{{Onumber.loanDate}}</span>
            <span class="lie" style="width:70px">到帐时间</span>
            <span class="w150">{{Onumber.daozhang}}</span>
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
      <!-- <Modal v-model="requireModal" title="获取">
        <p>获取</p>
      </Modal> -->
      <Modal v-model="repaymentModal" title="还款明细" width="1000px">
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
      <Modal v-model="reassigncaseModal" title="重新分配">
        <div class="box1">
          <div>
            <Button type="text" >选择催收人员</Button>
            <Select clearable v-model="mcuiPerson" style="width:200px" size="large">
              <Option v-for="item in cuiPerson" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <div class="h1" style="margin:20px 0">分配概览</div>
         <div>
            <Table :columns=" distribute" :data="distributeData"></Table>
          </div>
        </div>
      </Modal>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'jtyf',
  data() {
    return {
      self: this,
      show:true,
      orderModal:false,
      recordModal:false,
      userModal:false,
      repaymentModal:false,//还款明细
      reassigncaseModal:false,//重新分配案件
      // requireModal:false,//获取
      // paymentModal:false,
      // refuseModal:false,
      Onumber:{},
      Anumber:{},
      Snumber:{},
     
      list:[
        {sj:'2017-11-15 10:00:00',prean:'财务人员',name:'何四',tijiao:'确认打款',xinxi:'djkasojdgksdklfj'},
        {sj:'2017-11-15 10:00:00',prean:'信审人员',name:'李二',tijiao:'确认打款',xinxi:'dasidjnsdklfmsdf'},
        {sj:'2017-11-15 10:00:00',prean:'财务人员',name:'吴老',tijiao:'确认打款',xinxi:'sadasdasdasdasd'},
        {sj:'2017-11-15 10:00:00',prean:'财务人员',name:'七八',tijiao:'确认打款'}
      ],
      Hnumber:{},
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
      distribute:[//重新分配
        {
          type: 'index',
          width:30,
          align: 'center'
        },
        {
          title: '催收人员',
          width:100,
          key: 'actualDate'
        },
        {
          title: '案件处理中(件)',
          width:130,
          key: 'address'
        },
        {
          title: '案件已结束(件)',
          width:130,
          key: 'actualDate'
        },
        {
          title: '现预排(件)',
          width:130,
          key: 'address'
        }
      ],
      distributeData:[],

      mcuiPerson:'',
      cuiPerson:[],
      
      
      worker:[//页面数据
        {
          type: 'index',
          width:45,
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
                    this.showReassigncase(params.row.orderNo)
                  }
                }
              },'重新分配'),
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
          title: '案件状态',
          width:100,
          key: 'caseStatus'
        },
        {
          title: '受理人员',
          width:100,
          key: 'operator'
        },
        {
          title: '到期时间',
          key: 'dueDate',
          width:110,
          sortable: true
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '手机号',
          key: 'phoneNo',
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
              },params.row.phoneNo)
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
          title: '剩余应还',
          key: 'lastShouldPay',
          width:110,
          sortable: true
        },
        {
          title: '实际已还',
          key: 'alreadyPay',
          width:110,
          sortable: true
        },
        {
          title: '借款本金',
          key: 'loanAmount',
          width:110,
          sortable: true
        },
        {
          title: '账户管理费',
          width:120,
          key: 'accountManageFee'
        },
        {
          title: '利息',
          width:90,
          key: 'accrualFee'
        },
        {
          title: '快速审核费',
          width:120,
          key: 'fastAuditFee'
        },
        {
          title: '滞纳金',
          width:100,
          key: 'delayFee'
        },
        {
          title: '逾期管理费',
          width:110,
          key: 'delayManageFee'
        },
        {
          title: '逾期类型',
          width:100,
          key: 'dueType'
        },
        {
          title: '期限',
          key: 'loanDayNumber'
        },
        {
          title: '逾期天数',
          key: 'payMoney',
          width:110,
          sortable: true
        },
         {
          title: '分配日期',
          key: 'payMoney',
          width:110,
          sortable: true
        },
        {
          title: '备注',
          key: 'notes'
        }
      ],
      workerdata:[],

      caseStatus:[
        {
          value: 1,
          label: '待联系'
        },
        {
          value: 2,
          label: '失联'
        },
        {
          value: 3,
          label: '承诺还款'
        },
        {
          value: 4,
          label: '亲友转告'
        },
        {
          value: 5,
          label: '谈判中'
        },
        {
          value: 6,
          label: '拒绝还款'
        },
        {
          value: 7,
          label: '欺诈'
        },
        {
          value: 8,
          label: '已停止'
        }
      ],
      accepter:[
        {
          value: 1,
          label: '01催收人员'
        },
        {
          value: 2,
          label: '02催收人员'
        },
        {
          value: 3,
          label: '03催收人员'
        }
      ],
      mcaseStatus:'',
      maccepter:'',
      orderNum:'',
      staData:'',
      endData:'',
      name:'',
      tel:'',


    };
  },
  mounted(){
    this.getdata();

  },
  methods: {

    resetData(){//我的工作台 重置
      this.mcaseStatus="",
      this.maccepter="",
      this.staData="",
      this.endData="",
      this.orderNum="",
      this.name="",
      this.tel=""

    },

    showOrder(index){ //查看订单
      this.orderModal=true;
       var that = this;
      axios.get('http://192.168.0.188:8088/loanfollow/followlist/orderDetail_01/DD5125304476303896')
         .then(function(res) {
           console.log(res.data.data);
            that.Onumber=res.data.data;
         });
      axios.get('http://192.168.0.188:8088/loanfollow/followlist/orderDetail_02/DD5125304476303896')
        .then(function(res) {
          console.log(res.data.data);
           that.Anumber=res.data.data;
        })
    },
    // showRequire(index){//获取
    //    this.requireModal=true;
    // },
    showReassigncase(index){//重新分配案件
      this.reassigncaseModal=true;
    },
    showRepayment(index){//还款明细
      this.repaymentModal=true;
      var that = this;
      axios.get('http://192.168.0.188:8088/loanfollow/followlist/repayDetail_01/DD5125304476303896')
        .then(function(res) {
          console.log(res);
          that.Hnumber = res.data.data;
        });
         axios.post('http://192.168.0.188:8088/loanfollow/followlist/repayDetail_02', {
        "orderNo": "DD5125304476303896",
        "page": {
          "currentPage": 6,
          "pageNumber": 123
        }
      })
        .then(function(res) {
          console.log(res);
          that.repayDetaildata = res.data.data;
        })

    },
    showRecord(){ //处理记录
      this.recordModal=true;
    },
    showUser(){//用户基本信息
       this.userModal=true;
    },

    searchTable(){  //我的工作台查询

    },
    handleTagsAdd(){//审核

    },
    getdata(){//我的工作台的静态数据
       var that = this;
      axios.post('http://192.168.0.188:8088/due/casedivide/todayDivide', {

      })
        .then(function(res) {
          console.log(res);
          that.workerdata = res.data.data;
        })
    }


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .btn-time{
  padding-left: 0;
  margin-left:40px;
}
.btn-sta{
  margin-right: -5px;
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

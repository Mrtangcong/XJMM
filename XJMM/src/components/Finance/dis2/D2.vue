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
              <Button type="text" class="btn-time">到期日期</Button>
              <Date-picker v-model="dueSta" type="date" placeholder="起" style="width: 170px"></Date-picker>
              ----
              <Date-picker v-model="dueEnd" type="date" placeholder="止" style="width: 170px"></Date-picker>
              
              <Button type="ghost" class="btn-sta">逾期类型</Button>
              <Select clearable v-model="mtype" style="width:170px" size="large">
                <Option v-for="item in type" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div class="equal">
              <Button type="text" class="btn-time">审核时间</Button>
              <Date-picker v-model="auditSta" type="date" placeholder="起" style="width: 170px"></Date-picker>
              ----
              <Date-picker v-model="auditEnd" type="date" placeholder="止" style="width: 170px"></Date-picker>
            </div>
            <div class="equal">
              <Button type="ghost" style="margin-right:-5px">手机号</Button>
              <Input v-model="tel" size="large" style="width: 170px"></Input>
              <Button type="ghost" style="margin-right:-5px">姓名</Button>
              <Input v-model="name" size="large" style="width: 170px"></Input>
            </div>
          </Col>
        </Row>
      </div>
      <div class="equal">
        <Button type="primary" icon="ios-search" @click="searchTable">查询</Button>
        <Button type="primary" @click="resetData" icon="ios-loop">重置</Button>
        <div class="fright">
          <div>
            <span>逾期总额：   </span>
            <span>{{Znumber.data}}</span>
          </div>  
        </div>
      </div>

      <div id="rdate">

        <Table  :columns="worker" :data="workerdata" ></Table>
      </div>
      <div id="rpage">
        <Page :total="100" size="small" show-elevator show-sizer></Page>
      </div>
    </div>
    <!-- modal -->
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
  </div>
</template>


<script>
import axios from 'axios';
 import expandRow from './expand-row.vue';
 import common from '../../../router/common.js'

export default {
    components: { expandRow },
  name: 'D2',
  data() {
    return {
      self: this,
      showTag:true,
      // show:true,
      orderModal:false,
      Onumber:{},
      Anumber:{},
      Znumber:{},
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
          type: 'index',
          width:30,
          align: 'center'
        },
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
          title: '姓名',
          width:100,
          key: 'userName'
        },
        {
          title: '手机号',
          width:100,
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
              },params.row.mobile)
            ]);
          }
        },
        {
          title: '订单号',
          width:100,
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
          title: '订单创建时间',
          width:120,
          key: 'loanDate'
        },
        {
          title: '借款本金',
          width:110,
          key: 'loanAmount'
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
          title: '账户管理费',
          width:120,
          key: 'accountManageFee'
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
          title: '免减金额',
          width:110,
          key: 'reduceAmount'
        },
        {
          title: '期限？？',
          width:110,
          key: 'delayManageFee'
        },
        {
          title: '到期日期',
          width:110,
          key: 'dueDate'
        },
        {
          title: '逾期天数',
          width:110,
          key: 'DueDayNumber'
        },
        {
          title: '是否续借？',
          width:110,
          key: 'residuePay'
        },
        {
          title: '审核时间',
          width:100,
          key: 'auditDate'
        },       
        {
          title: '审核人',
           width:110,
          key: 'auditPerson'
        },
        {
          title: '备注',
          key: 'remarks'
        }
      ],
      workerdata:[
        // {
        //       name: 'John Brown',
        //       age: 18,
        //       address: 'New York No. 1 Lake Park',
        //       job: 'Data engineer',
        //       interest: 'badminton',
        //       birthday: '1991-05-14',
        //       book: 'Steve Jobs',
        //       movie: 'The Prestige',
        //       music: 'I Cry'
        //   },
        //   {
        //       name: 'Jim Green',
        //       age: 25,
        //       address: 'London No. 1 Lake Park',
        //       job: 'Data Scientist',
        //       interest: 'volleyball',
        //       birthday: '1989-03-18',
        //       book: 'My Struggle',
        //       movie: 'Roman Holiday',
        //       music: 'My Heart Will Go On'
        //   },
        //   {
        //       name: 'Joe Black',
        //       age: 30,
        //       address: 'Sydney No. 1 Lake Park',
        //       job: 'Data Product Manager',
        //       interest: 'tennis',
        //       birthday: '1992-01-31',
        //       book: 'Win',
        //       movie: 'Jobs',
        //       music: 'Don’t Cry'
        //   },
        //   {
        //       name: 'Jon Snow',
        //       age: 26,
        //       address: 'Ottawa No. 2 Lake Park',
        //       job: 'Data Analyst',
        //       interest: 'snooker',
        //       birthday: '1988-7-25',
        //       book: 'A Dream in Red Mansions',
        //       movie: 'A Chinese Ghost Story',
        //       music: 'actor'
        //   }
      ],

      type:[],

      dueSta:'',
      dueEnd:'',
      auditSta:'',
      auditEnd:'',
      mtype:'',
      tel:'',
      name:''
    };
  },
  mounted(){
     var url = common.apidomain //188:8088
     this.urls = url

    this.getdata();
    this.getSum();

  },
  methods: {

    resetData(){//我的工作台 重置
      this.backSta="",
      this.backEnd="",
      this.mbacker="",
      this.xinPerson="",
      this.mreport=""
    },
    handleClose() {
      this.show = false;
      this.$router.push('/Finance')
    },

   showOrder(index){ //查看订单
      this.orderModal=true;
      var that = this;
      axios.get(this.urls+'/loanfollow/followlist/orderDetail_01/DD5125304476303896')
         .then(function(res) {
          //  console.log(res);
            that.Onumber=res.data.data;
         });
      axios.get(this.urls+'/loanfollow/followlist/orderDetail_02/DD5125304476303896')
        .then(function(res) {
          // console.log(res);
           that.Anumber=res.data.data;
        });
        axios.get(this.urls+'/loanfollow/followlist/orderDetail_03/DD5127151044291635')
        .then(function(res) {
          console.log(res);
           that.mianjiandata=res.data.data;
        })
    },
    searchTable(){  //我的工作台查询
      var that = this;
      axios.post(this.urls+'/payment/duelist/D2',{

      })
      .then((res)=>{
        console.log(res);
         that.workerdata=res.data.data;
      })

    },
    getdata(){//我的工作台的静态数据
      var that = this;
      axios.post(this.urls+'/payment/duelist/D2',{})
      .then((res)=>{
        console.log(res);
         that.workerdata=res.data.data;
      })
    },
     getSum(){
    var that = this;
      axios.get(this.urls+'/payment/duelist/all-dueAmount',{})
      .then((res)=>{
        // console.log(res.data.data);
         that.Znumber=res.data;
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
   margin-left:130px;
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
.fright{
    float: right;
    margin-right: 25px;
    overflow: hidden;
}
#rdate{
     margin-top:25px;
}
</style>

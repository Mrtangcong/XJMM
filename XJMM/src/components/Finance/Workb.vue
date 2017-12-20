<template>
  <div>
    <div class="left">
      <div class="work c">
        <div class="lable">
          <p class="zi"><Icon type="ios-paper-outline"class="icon" ></Icon>待办工作</p>
        </div>
        <!-- <div class="zhux">
            <div class="zhuxing c">
            <div class="jrycl"><p>今日已处理</p> <p><span class="jrycl-1">{{sr}}</span>笔</p> </div>
            <div class="daidk"><p>待打款</p> <p>共<span class="jrycl-1">{{srr}}</span>笔</p> </div>
            
          </div>
          <div class="tiaoxing" style="width:350px;">
                <div class="le" :style="'width:' + (sr/srr)*100 + '%'"></div>
                <div class="ri" :style="'width:' + (100-(sr/srr)*100) + '%'"></div>
          </div>
        </div> -->
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
                <Date-picker v-model="staData" type="date" placeholder="选择日期" style="width: 150px"></Date-picker>
                -----
                <Date-picker v-model="endData" type="date" placeholder="选择日期" style="width: 150px"></Date-picker>      
              </div>
              <div class="equal">
                <Button type="ghost" style="margin-right:-5px" >订单号</Button>
                <Input v-model="orderNum" size="large" style="width: 150px"></Input>
                <Button type="ghost" class="btn-sta">用户姓名</Button>
                <Input v-model="tel" size="large" style="width: 150px"></Input>
                <Button type="ghost" class="btn-sta">身份证号</Button>
                <Input v-model="idCard" size="large" style="width: 150px"></Input>
                <Button type="ghost" class="btn-sta">信审人</Button>
                <Input v-model="mperson" size="large" style="width: 150px"></Input>
                <div style="margin-top:20px">
                  <Button type="ghost" class="btn-sta" style="margin-left:0">工单类型</Button>
                  <Select clearable v-model="mloan" style="width:200px" size="large">
                <Option v-for="item in loanStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div class="equal">
          <Button type="primary" icon="ios-search" @click="searchTable">查询</Button>
          <Button type="primary" @click="resetData" icon="ios-loop">重置</Button>
          <Button type="primary" slot="extra" @click="showPayment">确认打款</Button>
          <Button type="primary" slot="extra" @click="showRefuse">拒绝打款</Button>
          <Button type="primary" slot="extra" @click="yjqr">一键确认打款</Button>
          <Button type="primary" slot="extra" @click="yjjj">一键拒绝打款</Button>
        </div>

        <div id="rdate">
          <Table  ref="selection" :columns="worker" :data="lisht" stripe size="default" @on-selection-change="char"></Table>
        </div>
        <div id="rpage">
          <Page :total="{ye}" size="small"  show-sizer @on-change="fenye"></Page>
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
        <Modal v-model="recordModal" title="处理记录">
        </Modal>
        <Modal v-model="userModal" title="用户基本信息" width='700px':mask-closable="false">
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
        <Modal v-model="paymentModal" title="确认打款" width="700px" ok-text="确认打款" @on-ok="ctha">
          <p class="jiacu">&nbsp;<Icon type="alert" style="font-size:20px"></Icon> &nbsp;警告，确认打款后系统将发起放款操作，不可撤销</p>
          <div>
              <span class="lie">借款时间</span>
              <span class="biao" style="width:170px"></span> 
              <span class="lie">申请金额</span>
              <span class="biao" style="width:100px">{{Snumber.jie}}</span>
              <span class="lie">期限</span>
              <span class="biao" style="width:100px">{{Snumber.daoqi}}</span>
              <span class="lie">服务费</span>
              <span class="biao" style="width:170px">{{Snumber.daoqi}}</span>
              <span class="lie">还款日</span>
              <span class="biao" style="width:270px">{{Snumber.daoqi}}</span>
              <span class="lie">发起渠道</span>
              <span class="biao" style="width:170px">{{Snumber.daoqi}}</span>
              <span class="lie">审核时间</span>
              <span class="biao" style="width:270px">{{Snumber.daoqi}}</span>
              <span class="lie">备注</span>
              <span class="biao" style="width:140px">{{Snumber.daoqi}}</span>
          </div>
        </Modal>
        <Modal v-model="refuseModal" title="拒绝打款" width="700px" ok-text="确认拒绝" @on-ok="cctha">
          <p class="jiacu">警告，拒绝打款后系统将通知用户放款失败</p>
          <div>
            <span class="lie">借款时间</span>
            <span class="biao" style="width:140px">{{Snumber.hao}}</span> 
            <span class="lie">申请金额</span>
            <span class="biao" style="width:140px">{{Snumber.jie}}</span>
            <span class="lie">期限</span>
            <span class="biao" style="width:140px">{{Snumber.daoqi}}</span>
            <span class="lie">服务费</span>
            <span class="biao" style="width:140px">{{Snumber.daoqi}}</span>
            <span class="lie">还款日</span>
            <span class="biao" style="width:140px">{{Snumber.daoqi}}</span>
            <span class="lie">发起渠道</span>
            <span class="biao" style="width:140px">{{Snumber.daoqi}}</span>
            <span class="lie">审核时间</span>
            <span class="biao" style="width:140px">{{Snumber.daoqi}}</span>
            <span class="lie">备注</span>
            <span class="biao" style="width:140px">{{Snumber.daoqi}}</span>
            <div style="margin:30px 10px;vertical-align:top"><span>拒绝原因:</span>
              <input type="text" style="border-radius:5px;border:1px solid #ccc;outline: none;">
            </div>
              
          </div>
        </Modal>

        <Modal v-model="yjqrM" title="一键确认付款" ok-text="确定付款" @on-ok="tha">
            <div class="yjqrMM">你确定要一键确认所有订单？</div>
        </Modal>
        <Modal v-model="yjjjM" title="一键拒绝付款" ok-text="拒绝付款" @on-ok="tat">
          <div class="yjjjMM">你确定要一键拒绝所有订单？</div>
          备注:<input type="text" v-model="beizhu">
        </Modal>
    </div>
    <!-- <div class="right" >
      <div class="lable you">
          <p class="zi"><Icon type="ios-paper-outline"class="icon" ></Icon>打款概况</p>
          <div class="pai">this week</div>
      </div>
      <div class="jiyu">
        <div>基于受理额</div>
        <div>基于受理量</div>
      </div>
    </div> -->
  </div>
</template>


<script>
import axios from 'axios';
import common from '../../router/common.js'

export default {
  name: 'Workb',
  data() {
    return {
      sr:30,
      srr:60,
      self: this,
      show:true,
      orderModal:false,
      recordModal:false,
      userModal:false,
      paymentModal:false,
      refuseModal:false,
      yjqrM:false,
      yjjjM:false,
      Onumber:{},
      Snumber:{},


      xinPerson:[],
      worker:[
        {
          type: 'index',
          width:80,
          align: 'center',
          fixed: 'left',
          title:'序号',
        },
        {
          type: 'selection',
          fixed: 'left',
          width:60,
          align: 'center'
        },
        {
          title: '操作',
          fixed: 'left',
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
                    this.showPayment(params.id)
                  }
                }
              },'确认付款'),
              h('Button', {
                props: {
                  type: 'text',
                  size:'small'
                },
                on: {
                  click: () => {
                    this.showRefuse(params.id)
                  }
                }
              },'拒绝付款'),
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
          key: 'producation',
          width:100
        },
        {
          title: '姓名',
          key: 'userName',
          width:100
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
          width:180,
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
          title: '申请时间',
          key: 'applyTime',
          width:200,
          sortable: true
        },
        {
          title: '申请金额',
          key: 'applyAmount',
          width:110,
        },
        {
          title: '服务费',
          key: 'coverCharge',
          width:120,
        },
        {
          title: '期限',
          key: 'limitTime',
          width:80,
        },
        {
          title: '续借',
          key: 'renew',
          width:80,
        },
        {
          title: '最后审核时间',
          key: 'lastReviewTime',
          width:200,
        },
        {
          title: '信审人',
          width:80,
          key: 'viewer'
        }
      ],
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
      workerdata:[],
      Anumber:'',
      staData:'',
      endData:'',
      orderNum:'',
      tel:'',
      idCard:'',
      mperson:'',
      lisht:[],
      mloan:'',
      beizhu:'',
      xuanzhong:[],
      ye:'',
      loanStatus:[
        {value:10,label:'普通财务工单'},
        {value:11,label:'非用户打款失败财务工单'},
        {value:12,label:'疑似重复财务工'}
      ]
      
     
    };
  },
  mounted(){
    this.getdata()
    
  },
  methods: {
   
    resetData(){//我的工作台 重置
      this.staData="",
      this.endData="",
      this.orderData="",
      this.tel="",
      this.idCard="",
      this.mperson="",
      this.orderNum="",
      this.mloan=""
    },
     
    showOrder(index){ //查看订单
      this.orderModal=true;
    },
    showPayment(index){//确认付款
      this.paymentModal=true;
    },
    showRefuse(index){//拒绝打款
      this.refuseModal=true;
    },
    showRecord(){ //处理记录
      this.recordModal=true;
    },
    showUser(){//用户基本信息
       this.userModal=true;

    },
    yjqr(){
      this.yjqrM =true;
    },
    yjjj(){
      this.yjjjM = true;
    },
    getdata(){
      var that = this
      axios.post('http://192.168.0.105:8081/payment/getToDoWorks',{})
            .then(function(res){
                console.log(res)
                that.ye = res.data.totalPage *10
                that.lisht =res.data.data
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

      axios.post('http://192.168.0.105:8081/payment/getToDoWorks',{"startTime":ac,"endTime":ac1,"orderNo":that.orderNum,"userName":that.tel,"idCardNum":that.idCard,"viewer":that.mperson,"workOrderType":that.mloan})
            .then(function(res){
                console.log(res)
                that.lisht =res.data.data
            })
    },
  //一键确认 
    tha(){
      var that = this
      this.$refs.selection.selectAll(true)
       axios.post('http://192.168.0.105:8081/payment/confirmPay',{"workOrders":that.xuanzhong})
            .then(function(res){
                console.log(res)
                that.$Message.info('成功：' + res.data.data.succCount + ' ' + '失败：' + res.data.data.failCount);
                that.getdata()
            })
    },
    //一键拒绝 
    tat(){
      this.$refs.selection.selectAll(true)
      var that = this
       axios.post('http://192.168.0.105:8081/payment/refuseWorkOrder',{"workOrders":that.xuanzhong,"remark":that.beizhu})
            .then(function(res){
                console.log(res)
                that.$Message.info('成功：' + res.data.data.succCount + ' ' + '失败：' + res.data.data.failCount);
                that.getdata()
            })
    },
    ctha(){//确认打款
      var that = this
       axios.post('http://192.168.0.105:8081/payment/confirmPay',{"workOrders":that.xuanzhong})
            .then(function(res){
                console.log(res)
                that.$Message.info('成功：' + res.data.data.succCount + ' ' + '失败：' + res.data.data.failCount);
                that.getdata()
            })
    },
    cctha(){//拒绝打款

      var that = this
       axios.post('http://192.168.0.105:8081/payment/confirmPay',{"workOrders":["20171213171904739000013"]})
            .then(function(res){
                console.log(res)
                that.$Message.info('成功：' + res.data.data.succCount + ' ' + '失败：' + res.data.data.failCount);
                that.getdata()

            })
    },
    char(ac){ //选中
      console.log(ac)
      var acc = []
      for(var i=0;i<ac.length;i++){
        acc.push(ac[i].workOrder) 
      }
      
      this.xuanzhong = acc;
      console.log(this.xuanzhong)
    },
    fenye(index){//分页
      var that = this
      console.log(index)
      axios.post('http://192.168.0.105:8081/payment/getToDoWorks',{"pageNum":index})
            .then(function(res){
                console.log(res)
                that.lishi =res.data.data 
            })
    },
    showOrder(index){ //查看订单
      var url = common.apidomain+'/loanfollow/followlist/orderDetail_01/DD5125304476303896';
      this.orderModal=true;
      var that = this;
      axios.get(url)
         .then(function(res) {
          //  console.log(res);
            that.Onumber=res.data.data;
         });
      axios.get('http://192.168.0.188:8088/loanfollow/followlist/orderDetail_02/DD5125304476303896')
        .then(function(res) {
          // console.log(res);
           that.Anumber=res.data.data;
        });
        axios.get('http://192.168.0.188:8088/loanfollow/followlist/orderDetail_03/DD5127151044291635')
        .then(function(res) {
          console.log(res);
           that.mianjiandata=res.data.data;
        })
    },
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.right{
  display: inline-block;
  float: left;
  margin-left:30px;
}
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
.zi{
  color:#ccc72a;
  font-size: 24px;
  display: inline-block;
}
.icon{
  color:#ccc72a;
  size:20px;
}
.lable{
  background-color: #495060;
}
.lable.you{
  width: 500px;
}
.pai{
  display: inline-block;
  color:#ccc72a;
  float: right;
}
.jiyu div{
  float: right;
  display: inline-block;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.zhuxing{
  width: 350px;
  height: 60px;
  float: right;
}
.jrycl{
  float: left;
  width: 100px;
  text-align: center;
}
.jrycl-1{
  display: inline-block;
  padding: 0 5px;
  font-size: 18px;
  color: #c0f1f6;
}
.daidk{
  float: right;
  width: 100px;
  text-align: center;
}
.zhux{
  float: right;
}
.tiaoxing div{
  display: inline-block;
  height: 25px;
  background: #000;
  width: 33%;
}
.tiaoxing .le{
  margin-right: -4px;
  background: #c0f1f6;
}
.le:before{
  content: '';
  float: left;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #c0f1f6;
  margin-left: -10px;
}
.ri{
  margin-left: -4px;
}
.ri:after{
  content: '';
  float: right;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #000;
  margin-right: -12px;
}
.box{

  height: 260px;
}
.box1{
  height: auto;
}

.lie{
  background: #f2f3f7;
  text-indent: 5px;
  width: 70px;
  display: inline-block;
  margin-right:5px;
  margin-top:15px;
}
.h1{
  font-weight:900;
  font-size:16px;
}

.jiacu{
  font-size: 16px;
  font-weight: 900;
}
.jinzhi{
  width: 200px;
  height: 100px;
  max-width: 200px;
  max-height: 100px;
}
.yjqrMM,.yjjjMM{
  font-size: 20px;
  font-weight: bold;
  margin: 20px 0 40px 0;
  text-align: center;
}

</style>

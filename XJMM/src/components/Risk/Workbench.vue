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
              <Button type="text" class="btn-time">申请时间</Button>
              <Date-picker v-model="staData" type="date" placeholder="选择日期" style="width: 170px"></Date-picker>
              -----
              <Date-picker v-model="endData" type="date" placeholder="选择日期" style="width: 170px"></Date-picker>      
            </div>
            <div class="equal">
              <Button type="ghost" style="margin-right:-5px" >订单号</Button>
              <Input v-model="orderNum" size="large" style="width: 170px"></Input>
              <Button type="ghost" class="btn-sta">手机号</Button>
              <Input v-model="tel" size="large" style="width: 170px"></Input>
              <Button type="ghost" class="btn-sta">身份证号</Button>
              <Input v-model="idCard" size="large" style="width: 170px"></Input>
            </div>
          </Col>
        </Row>
      </div>
      <div class="equal">
        <Button type="primary" icon="ios-search" @click="searchTable">查询</Button>
        <Button type="primary" @click="resetData" icon="ios-loop">重置</Button>
        <Button type="primary" @click="handleTagsAdd" slot="extra">审核</Button>
      </div>

      <div id="rdate">
        <Table  :columns="worker" ref="selection" :data="chushi" stripe size="default" @on-selection-change="char"></Table>
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
      <Modal v-model="recordModal" title="处理记录" width="800px">
          <div v-for="item in chuli" class="chuli">
              <p>
                <span style="font-size:16px">{{item}}</span>
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
  name: 'Work',
  data() {
    return {
      self: this,
      show:true,
      orderModal:false,
      recordModal:false,
      userModal:false,
      Onumber:{},
      Snumber:{},
      list:[],
      worker:[
        {
          type: 'index',
          title:'序号',
          width:70,
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
                on:{
                  click:()=>{
                    this.handleTagsAdd('123')
                  }
                }
              },'开始审核'),
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
          key: 'product'
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
                    this.showUser(params.row.idCard)
                  }
                }
              },params.row.idCard)
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
                    this.showOrder(params.row.workOrder)
                  }
                }
              },params.row.workOrder),
            ]);
          }
        },
        {
          title: '申请时间',
          key: 'applyDateStr',
          sortable: true
        },
        {
          title: '申请金额',
          key: 'applyAmount'
        },
        {
          title: '服务费',
          key: 'serverFee'
        },
        {
          title: '期限',
          key: 'loanDayNumber'
        },
        {
          title: '应还金额',
          key: 'totalShouldRepay'
        }
      ],
      workerdata:[],
     
      staData:'',
      endData:'',
      orderNum:'',
      tel:'',
      idCard:'',
      chuli:[],
      chushi:[],
      xuanzhong:[],
     
    };
  },
  mounted(){
    var that = this;
    this.getdata();
    axios.post('http://192.168.0.164:8081/workorder/queryWorkordersByCondition',{
      "operator":"huyu",
      "status":[1],
      "types":[0]
    })
    .then(function(res){
      console.log(res)
      that.chushi = res.data.data
    })
   
  },
  methods: {
   
    resetData(){//我的工作台 重置
      this.staData="",
      this.endData="",
      this.orderData="",
      this.tel="",
      this.idCard=""
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
    
    searchTable(){  //我的工作台查询
   
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
    handleTagsAdd(state){//审核
      if(this.xuanzhong.length> 0){
        this.$router.push({name:'jiben',params:{user:this.xuanzhong}})
      }
      
    },
    getdata(){//我的工作台的静态数据
      axios.get('https://mock.mmcai.cn/mock/5a1a645c120678403b0d991f/preson/myworker1')
      .then((res)=>{
        console.log(res);
         this.workerdata=res.data.list;
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

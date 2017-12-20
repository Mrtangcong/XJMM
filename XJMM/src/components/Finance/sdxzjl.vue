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
              <Button type="text" class="btn-time">销账时间</Button>
              <Date-picker v-model="actualSta" type="date" placeholder="起" style="width: 130px"></Date-picker>
              -----
              <Date-picker v-model="actualEnd" type="date" placeholder="止" style="width: 130px"></Date-picker>
            </div>
            <div class="equal">
              <Button type="ghost" style="margin-left:0px;margin-right:-5px">销账人员</Button>
              <Input v-model="mcaseStatus2" size="large" style="width: 170px"></Input>
            <div style="margin-top:20px">
                <Button type="ghost" style="margin-right:-5px" >手机号码&#12288;</Button>
              <Input v-model="orderNum" size="large" style="width: 170px"></Input>
              <Button type="ghost" class="btn-sta">&#12288;证件号码&#12288;</Button>
              <Input v-model="name" size="large" style="width: 170px"></Input>
              <Button type="ghost" class="btn-sta">姓名&#12288;</Button>
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
        <Table  :columns="worker" :data="list1" stripe size="default"></Table>
      </div>
      <div id="rpage">
        <Page :total="100" size="small" show-elevator show-sizer></Page>
      </div>
    </div>

  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'sdxzjl',
  data() {
    return {
      orderNum:'',
      name:'',
      list1:[],
      tel:'',
      mcaseStatus:'',
      mcaseStatus1:'',
      mcaseStatus2:'',
      Onumber:{},
      Snumber:{},
      worker:[
        {
          type: 'index',
          title:'序号',
          width:80,
          align: 'center'
        },
        {
          title: '销账时间',
          key: 'removeDate',
          width:200,
        },
        {
          title: '实销金额',
          key: 'realRemoveAmount',
          width:120,
        },
        {
          title: '预销金额',
          key: 'preRemoveAmount',
          width:120,
        },
        {
          title: '订单号',
          key: 'orderNo',
          width:200,
        },
        {
          title: '姓名',
          key: 'userName',
          width:80,
        },
        {
          title: '手机号码',
          key: 'telNum',
          width:200,
        },
        {
          title: '销账人员',
          key: 'operator',
          width:100,
        },
        {
          title: '免检金额',
          key: 'freeAmount',
          width:120,
        },
        {
          title: '当前剩余应还',
          key: 'leftShouldRepay',
          width:120,
        },
        {
          title: '帐单状态',
          key: 'accountStatus'
        },
        {
          title: '状态',
          key: 'removeStatus',
          width:80,
        }
      ],
      workerdata:[],
      actualEnd:'',
      actualSta:'',
      caseStatus:[],
      overType:[],
      accepter:[],
      cityList2:[
        {
          value: '01-财务人员',
          label: '01-财务人员'
      },
      {
          value: '02-财务人员',
          label: '02-财务人员'
      },
      ]


    };
  },
  mounted(){
    var that = this
    axios.post('http://192.168.0.105:8081/payment/getRemoveRecord',{})
            .then(function(res){
                console.log(res)
                that.list1=  res.data.data[0].data.removeAccountVos
            })
  },
  methods: {

    resetData(){//我的工作台 重置

      this.orderNum=""
      this.name=""
      this.tel=""
      this.mcaseStatus2=''
      this.actualSta=''
      this.actualEnd=''

    },
    searchTable(){  //我的工作台查询
      var that = this
      if(this.staData != ''){
          var sta = this.actualSta
          var full = sta.getFullYear()
          var month = sta.getMonth() + 1
          var data  = sta.getDate()
          if(data<10){
            data = '0' +data
          }
          var ac  = full +'-' + month +'-' + data

          var sta = this.actualEnd
          var full1 = sta.getFullYear()
          var month1 = sta.getMonth() + 1
          var data1  = sta.getDate()
          if(data1<10){
            data1 = '0' +data1
          }
          var ac1  = full1 +'-' + month1 +'-' + data1
      }

      axios.post('http://192.168.0.105:8081/payment/getRemoveRecord',{"idCardNo":that.name,"operator":that.mcaseStatus2,"removeDateStart":ac,"removeDateEnd":ac1,"telNum":that.orderNum,"userName":that.tel})
            .then(function(res){
                console.log(res)
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
</style>

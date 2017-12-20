<template>
  <div class="dapan c">
    <div class="tage">
        <tag class="rengong" v-if="show" closable @on-close="handleClose" >人工信审</tag>
        <tag class="rengong" v-if="show" closable @on-close="handleClose" >审核</tag> 
    </div>
    <div class="flex">
      <div>待处理任务数：</div>
      <div>当前工作台处理时长</div>
      <div>当前任务处理时长</div>
      <div class="shenheyijian" @click="shehe">审核意见</div>   
    </div>

    <div id="dapan">
      <div id="myChart">
        <router-link to="/Risk/dapan/jiben" class="rou-1 routee" active-class="rou-1-c">
          <img src="../../../static/6.png">
          <span>基本信息</span>
          <a class="s1" href="#lianxiren">联系人</a>
          <a class="s2" href="#zhanghao">账户信息</a>
          <a class="s3" href="#huoti">帐号信息</a>
          <a class="s4" href="#zaizhi">居住信息</a>
          <a class="s5" href="#yinhang">银行卡信息</a>
          <a class="s6" href="#denglu">用户登录日志</a>
        </router-link>
        <router-link to="/Risk/dapan/mingzhong" class="rou-3 routee" active-class="rou-3-c">
          <img src="../../../static/8.png">
          <span>命中规则</span>
          
        </router-link>
        <router-link to="/Risk/dapan/xinyong" class="rou-2 routee" active-class="rou-2-c" >
          <img src="../../../static/7.png">
          <span>信用审核</span>
          <a href="">借款申请处理记录</a>
        </router-link>
        <router-link to="/Risk/dapan/zhengxin" class="rou-4 routee" active-class="rou-4-c">
          <img src="../../../static/9.png">
          <span>征信数据</span>
        </router-link>
        <router-link to="/Risk/dapan/jiedai" class="rou-5 routee" active-class="rou-5-c">
          <img src="../../../static/10.png">
          <span>借贷记录</span>
          <a href="">借款申请基本信息</a>
          <a href="">历史申请记录</a>
        </router-link>
      </div>
      <div id="myname" class="c">
        <div>
          <div class="ico"><img src="../../../static/6.png"></div>
          <p class="zuoname">{{huoti.userName}}</p>
          <p class="youxinxi">
            <div class="shenfenzheng">{{huoti.idCard}}</div>
            <span class="youP"></span>
            <span class="youP"></span>
            <span class="youP">{{jibenxinxi.educationName}}</span>
            <span class="youP">{{jibenxinxi.marriageName}}</span>
            <span class="youP">{{jibenxinxi.childrenConditionName}}</span>
          </p>
        </div>
        <div>
          <div class="ico"><img src="../../../static/7.png"></div>
          <div class="hengtiao-111">
            <p>
              <span>较差</span>
              <span>中等</span>
              <span>良好</span>
              <span>优秀</span>
              <span>很好</span>
            </p>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <nav>!风险等级略高 存在一定风险</nav>
          </div>
        </div>
        <div class="zuojie">
          <div class="ico"> <img src="../../../static/10.png"></div>
          <div class="zuojie-zuo">
            <p>￥3000.00</p>
            <p>实际应还 ￥<span>3100.00</span></p>
          </div>
          <div class="zuojie-you">
            <p>借于2017年12月5日 11:42:00</p>
            <p>14天</p>
          </div>
        </div>
      </div>
    </div>    
    <Modal v-model="mode" title="审核意见" width="550px">
          <div>
            <span>上次审核&nbsp;&nbsp;&nbsp;</span>
            <span>{{yonghuxi.auditorResultString}}</span>
          </div>
          <div>
            <span>审核结果&nbsp;&nbsp;&nbsp;</span>
            <Select clearable v-model="mcaseStatus1" style="width:200px" size="large">
                <Option v-for="item in cityList1" :value="item.value" :key="item.value" >{{ item.label }}</Option>
            </Select>
          </div>
          <div style="margin-top:20px;">
            <span style="vertical-align:top"> &nbsp;&nbsp;&nbsp;备注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <input type="text" style="width:200px;height:120px;">
          </div>
           <div slot="footer">
            <Button type="primary" >保存</Button>
            <Button type="primary" >受理完结并推出</Button>
            <Button type="primary" >受理完结并继续</Button>
            <Button type="primary" >复审</Button>
            <Button type="primary" >关闭</Button>
        </div>
    </Modal>
    <router-view/> 
  </div>
</template>

<script>
    import axios from 'axios'
    
export default {
  name: 'dapan',
  data () {
    return {
      show:true,
      mode:true,
      mcaseStatus1:'',
      huoti:{},
      jibenxinxi:{},
      yonghuxi:{},
      cityList1:[
        {
          value: '1',
          label: '正常用户（通过）'
      },
      {
          value: '2',
          label: '灰色用户（禁审30天）'
      },
      {
          value: '3',
          label: '黑名单用户（禁审180天）'
      },

      ]
    }
  },mounted(){
      var that = this; 
     // 基本信息
      axios.post('http://192.168.0.164:8081/userinfo/getUserExtendInfo',{"uid":104})
      .then(function(res){
        that.jibenxinxi = res.data.data[0]
      })
      axios.post('http://192.168.0.164:8081/linkface/getCheckResult',{"uid":106})
            .then(function(res){
                
                that.huoti = res.data.data[0]
            })
      axios.post('http://192.168.0.164:8081/workorder/getOrderLastAuditorInfo',{"uid":104,'type':0})
      .then(function(res){
        that.yonghuxi = res.data.data[0]
      })
      axios.post('http://192.168.0.164:8081/workorder/getWorkOrdersInfoByOrderno',{"orderNo":"DD5125304476303896"})
      .then(function(res){
        console.log(res)
      })
},methods: {
    handleClose(){
      this.$router.push('/Risk/risk-rgxs/Workbench')
    },
    shehe(){
      this.mountedde = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hengtiao-111{
  width: 400px;
  display: inline-block;
  height: 80px;
  vertical-align: middle;
}
.hengtiao-111 nav{
  line-height: 30px;
  text-align: center;
  font-size: 18px;
  color: #800000;
}
.hengtiao-111 div{
  width: 20%;
  height: 10px;
  background:#fff;
  display: inline-block;
  float: left;
  margin-top:10px;
}
.hengtiao-111 div:nth-of-type(1){
  background: #ff0000;
}
.hengtiao-111 div:nth-of-type(2){
  background: #ff8000;
}
.hengtiao-111 div:nth-of-type(3){
  background: #00ff00;
}
.hengtiao-111 div:nth-of-type(4){
  background: #0000ff;
}
.hengtiao-111 div:nth-of-type(5){
  background: #00ffff;
}

.hengtiao-111 p{
  font-size: 8px;
}
.hengtiao-111 p span{
  display: inline-block;
  width: 19%;
  text-align: center;
}
.flex{
  display: flex;
  justify-content: space-around;
  background: #edf0f3;
  font-size: 20px;
  line-height: 30px;
  position:relative;
}
.flex div{
  font-weight: 900;
  color: #2e6ea7;
}
.flex .shenheyijian{
  position:absolute;
  top:50px;
  right:150px;
  padding: 8px 20px;
  background: #2e6ea7;
  color: #fff;
  border-radius: 10px;
}

#dapan{
  height: 320px;
}
#myChart{
  width: 500px;
  height: 200px;
  display: inline-block;
  position: relative;
  margin-top:60px;
}
#myname{
  width: 500px;
  height: 270px;
  float: right;
  margin-top: 100px
}
#myname>div{
  height: 33%;
}
.zuoname{
  display: inline-block;
  float: left;
  width: 90px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size:26px;
}
.youxinxi{
  display: inline-block;
  float: right;
}
.youP{
  display: inline-block;
  padding-right: 15px;
  line-height: 30px;
}
.shenfenzheng{
  text-indent: 20px;
  font-size: 18px;
}
.zuojie{
  line-height: 30px;
}
.zuojie-zuo{
  display: inline-block;
}
.zuojie-you{
  display: inline-block;
}
.ico{
  float: left;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  margin-right:20px;
}

.rou-1.routee{
  background:url('../../../static/1.png') no-repeat 20px 0;
  top:10px;
  left: 300px;
  background-size: 68%;
  font-size: 12px;
  color: #99312a;
}
.rou-1 img{
  width: 15%;
  position: absolute;
  top:25px;
  left: 45px;
}
.rou-1 span{
  position: absolute;
  top:55px;
  left: 30px;
}
.rou-1 a{
display: none;
}
.rou-1-c.routee{
  top:-15px;
  left: 300px;
  background-size: 85%;
}
.rou-1-c.routee img{
  width: 10%;
  position: absolute;
  top:15px;
  left: 50px;
}
.rou-1-c.routee span{
  position: absolute;
  top:30px;
  left: 30px;
  color: #99312a;
}
.rou-1-c.routee a{
  font-size: 8px;
  position: absolute;
  display: inline-block;
}
.rou-1-c.routee .s1{
  top:50px;
  left: 22px;
}
.rou-1-c.routee .s2{
  top:65px;
  left: 22px;
}
.rou-1-c.routee .s3{
  top:82px;
  left: 22px;
}
.rou-1-c.routee .s4{
  top:50px;
  left: 72px;
}
.rou-1-c.routee .s5{
  top:65px;
  left: 72px;
}
.rou-1-c.routee .s6{
  top:82px;
  left: 72px;
}
.rou-2.routee{
  background:url('../../../static/2.png') no-repeat 20px 0;
  background-size: 70%;
  top:14px;
  left: 183px;
  height: 110px;
}
.rou-2.routee a{
  display: none;
}
.rou-2 img{
  width: 20%;
  position: absolute;
  top:17px;
  left: 72px;
}
.rou-2 span{
  position: absolute;
  top:55px;
  left: 55px;
  color:#aaa41e;
}
.rou-2-c.routee{
  top:-20px;
  left: 153px;
  background-size: 90%;
  height: 130px;
}
.rou-2-c.routee img{
  width: 10%;
  position: absolute;
  top: 10px;
  left: 125px;
}
.rou-2-c.routee span{
  top:35px;
  left: 90px;
  color:#aaa41e;
}
.rou-2-c.routee a{
  display: inline-block;
  position: absolute;
  top:70px;
  left: 55px;
  font-size: 10px;
}
.rou-3.routee{
  background:url('../../../static/3.png') no-repeat 20px 0;
  background-size: 75%;
  top:98px;
  left: 172px;
  width: 115px;
}
.rou-3 img{
  width: 15%;
  position: absolute;
  top:30px;
  left: 45px;
}
.rou-3 span{
  position: absolute;
  top:60px;
  left: 30px;
  color: #4790b1;
}
.rou-3-c.routee{
  top:96px;
  left:150px;
  background-size: 82%;
  height: 190px;
}
.rou-4.routee{
  background:url('../../../static/4.png') no-repeat 20px 0;
  top:176px;
  left: 230px;
  background-size: 85%;
}
.rou-4 img{
  width: 20%;
  position: absolute;
  top:15px;
  left: 65px;
}
.rou-4 span{
  position: absolute;
  top:45px;
  left: 52px;
  color: #533c93;
}
.rou-4-c.routee{
  top:190px;
  left:212px;
  background-size: 80%;
  width: 200px;
}
.rou-4-c.routee span{
  top:65px;
  left: 68px;
}
.rou-4-c.routee img{
  left: 75px;
  top:20px;
}
.rou-5.routee{
  background:url('../../../static/5.png') no-repeat ;
  top:94px;
  left: 343px;
  background-size: 60%
}
.rou-5.routee a{
  display: none;
}
.rou-5 img{
  width: 20%;
  position: absolute;
  top:30px;
  left: 35px;
}
.rou-5 span{
  position: absolute;
  top:68px;
  left: 20px;
  color: #668b2a;
}
.rou-5-c.routee{
  top:84px;
  left:343px;
  background-size: 72%;
  height: 160px;
}
.rou-5-c.routee img{
  width: 12%;
  top:18px;
  left: 75px;
}
.rou-5-c.routee span{
  top:40px;
  left: 30px;
}
.rou-5-c.routee a{
  display: inline-block;
  position: absolute;
  top:70px;
  left: 20px;
  font-size: 10px;
}
.rou-5-c.routee a:nth-of-type(2){
  top:100px;
}
.routee{
  display: block;
  width: 150px;
  height: 150px;
  position: relative;
  background-size: 70%;
  position: absolute;
  
}
</style>

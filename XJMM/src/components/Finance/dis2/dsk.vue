<template>
  <div>
    <div class="tage">
         <Tag class="rengong" v-if="showTag" closable >待收款列表</Tag>
         <Tag class="rengong" v-if="showTag" closable @on-close="handleClose">线下还款</Tag>
    </div>
    <div class="height50"></div>
    <div class="yonghuxinxi">张小 <span>&nbsp;&nbsp; | &nbsp;&nbsp;</span> 210282199602112110 <span>&nbsp;&nbsp; | &nbsp;&nbsp;</span> 黑名单用户</div>
    <div class="height50"></div>
    <div class="rela">
            <div class="xingxing">
                <img src="../../../../static/11.png">
                个人信息
            </div>
            <div class="divv">
              <span class="liessss">用户来源</span>
              <span class="biaoooo">App</span>
              <span class="liessss">手机号</span>
              <span class="biaoooo">18842872661</span>
              <span class="liessss">性别</span>
              <span class="biaoooo">男</span>
            </div>
            <div class="divv">
              <span class="liessss">最近登陆</span>
              <span class="biaoo">App</span>
              <span class="liessss">注册时间</span>
              <span class="biao0o">2017年12月17日 15:03:13</span>
              <span class="liessss">注册设备</span>
              <span class="biaoooo">小米 X6 H738358</span>
            </div>
            <div class="divv">
              <span class="liessss">最新经纬</span>
              <span class="biao0o">浙江杭州</span>
            </div>
        </div>
        <div class="height50"></div>
        <div class="height50"></div>
        <div class="rela" style="width:1000px">
            <div style="position:absolute;right:20px;top:-20px;">
              通话频次 Top 20
            </div>
            <div class="xingxing">
                <img src="../../../../static/11.png">
                人脉圈
            </div>
            <Table :columns="columns2" ></Table>
        </div>
        <div class="height50"></div>
        <div class="height50"></div>
        <div class="rela" style="width:1200px">
            <div class="xingxing">
                <img src="../../../../static/11.png">
                银行卡信息
            </div>
            <Table :columns="columns3"></Table>
        </div>
        <div class="height50"></div>
        <div class="height50"></div>
        <div class="rela">
        <div class="xingxing">
            <img src="../../../../static/11.png">
            借款信息
        </div>
        <div class="divv">
          <span class="liessss">订单创建时间</span>
          <span class="biao0o">2017年12月17日 15:43:50</span>
          <span class="liessss">借款本金</span>
          <span class="biaoooo">1884元</span>
          <span class="liessss">期限</span>
          <span class="biaoooo">14天</span>
          <span class="liessss">服务费</span>
          <span class="biaoooo">50元</span>
          <span class="liessss">滞纳金</span>
          <span class="biaoooo">14元</span>
        </div>
        <div class="divv">
          <span class="liessss">到账日期</span>
          <span class="biao0o">App</span>
          <span class="liessss">剩余应还</span>
          <span class="biaoooo">13元</span>
          <span class="liessss">实际已还</span>
          <span class="biaoooo">1000元</span>
        </div>
        <div class="divv">
          <span class="liessss">审核时间</span>
          <span class="biao0o">2017年12月17日 15:50:59</span>
          <span class="liessss">放宽日期</span>
          <span class="biaoooo">2017年12月17</span>
          <span class="liessss">到账时间</span>
          <span class="biao0o">2017年12月17日 15:50:59</span>
        </div>
        <div class="divv">
          <span class="liessss">自动扣款账户</span>
          <span class="biadsd">2017年12月17日 15:50:59</span>
        </div>
        <div class="divv">
          <span class="liessss">客户合同</span>
          <span class="biaoooo">《》</span>
          <span class="biaoooo">《》</span>
          <span class="biaoooo">《》</span>
        </div>
        <Table :columns="columns4" ></Table>
    </div>
    <div class="height50"></div><div class="height50"></div>
    <div class="rela">
        <div class="xingxing">
            <img src="../../../../static/11.png">
            还款明细
        </div>
        <div class="height50"></div>
        <div class="mingxxxx">
            <div class="mingxixxxxx"><span>应还金额*</span><span>560.00</span><span>[本金：600；利息：1；快速审核费：30；账户管理费：10]</span> </div>
            <div class="mingxixxxxx"><span>实际已还*</span><span>560.00</span><span>[本金，]</span> </div>
            <div class="mingxixxxxx"><span>已减免金额*</span><span>560.00</span><span>[本金，]</span>  </div>
            <div class="mingxixxxxx"><span>剩余应还*</span><span>560.00</span><span>[本金，]</span> </div>
            <div class="height50"></div>
            <div class="mingxixxxxx">
              <span style="margin-right:20px">此处还款金额*</span>
              <input type="text" placeholder="请输入本次所还金额">
            </div>
            <div class="mingxixxxxx">
              <span style="margin-right:20px">累计已还金额</span>
              <span>100.00</span>
            </div>
            <div class="mingxixxxxx">
              <span style="margin-right:30px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;还款渠道*</span>
              <input type="text">
            </div>
            <div class="mingxixxxxx">
              <span style="margin-right:30px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;描述</span>
              <textarea style="vertical-align:top;max-width:200px;max-height:80px;width:200px;height:80px"></textarea>
            </div>
            <div class="height50"></div>
            <div class="tanxing">
              <Button type="error">取消</Button>
              <Button type="info">确认线下还款</Button>
            </div>
        </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'dsk',
  data() {
    return {
      showTag:true,
      columns2: [
        {
            title: '联系人姓名',
            key: 'mobile',
            width:110
        },
        {
            title: '手机号',
            key: 'channelSrc',
            width:180
        },
        {
            title: '关系',
            key: 'address',
            width:80
        },
        {
            title: '亲密度',
            key: 'netAge',
            width:90
        },
        {
            title: '是否为紧急联系人',
            key: 'creditPoint',
            width:132
        },
        {
            title: '顺序',
            key: 'silenceDay0Call3Month',
            width:80
        },
        {
            title: '是否为当前紧急联系人',
            key: 'silenceDay0Call3Month'
        }
      ],
      columns3: [
        {
            title: '归属银行',
            key: 'mobile',
            width:110
        },
        {
            title: '卡号',
            key: 'channelSrc',
            width:200
        },
        {
            title: '预留手机号',
            key: 'address',
            width:80
        },
        {
            title: '证件类型',
            key: 'netAge',
            width:100
        },
        {
            title: '身份证号码',
            key: 'creditPoint'
        },
        {
            title: '当前状态',
            key: 'silenceDay0Call3Month',
            width:120
        }
      ],
      columns4: [
        {
            title: '序号',
            type: 'index',
            width:80
        },
        {
            title: '订单创建时间',
            key: 'channelSrc',
            width:200
        },
        {
            title: '订单号',
            key: 'address',
            width:80
        },
        {
            title: '订单状态',
            key: 'netAge',
            width:100
        },
        {
            title: '申请金额',
            key: 'creditPoint'
        },
        {
            title: '期限',
            key: '123'
        },
        {
            title: '实际应还',
            key: '123'
        },
        {
            title: '审核结果',
            key: '123'
        },
        {
            title: '拒绝原因',
            key: '123'
        },
        {
            title: '放款金额',
            key: '123'
        },
        {
            title: '放款日期',
            key: '123'
        },
        {
            title: '最长逾期天数',
            key: '123'
        },
        {
            title: '剩余应还',
            key: '123'
        }
      ]
    }
  },
  mounted(){

  },
  methods: {
    handleClose(){
      alert(1)
      this.$router.push('/Risk/risk-rgxs/Workbench')
    }
  }
}
</script>

<style scoped>
.height50{
  height: 50px
}
.yonghuxinxi{
  text-align: center;
  font-size: 24px;
}
.yonghuxinxi span{
  font-size: 24px;
  vertical-align: top;
}
.divv{
  padding-left: 80px;
  padding-top: 30px;
}
.liessss{
  display: inline-block;
  background: #f2f3f7;
  width: 100px;
  text-align: center;
}
.biaoooo{
  display: inline-block;
  width: 140px;

  text-indent: 20px;
}
.biaoo{
  display: inline-block;
  width: 390px;
  text-indent: 20px;
}
.biao0o{
  display: inline-block;
  width: 200px;
  text-indent: 20px;
}
.biao0o0{
  width: 228px;
}
.biadsd{
  display: inline-block;
  text-indent: 20px;
}
.mingxxxx{
  width: 800px;
  margin:0 auto;
  border: 1px solid #ccc;
  padding-left: 80px;
  padding-top: 40px;
}
.mingxixxxxx{
  padding: 10px 0;
}
.mingxixxxxx span:nth-of-type(1){
  font-size: 24px;
}
.mingxixxxxx span:nth-of-type(2){
  font-size: 24px;
  display: inline-block;
  padding: 0 40px;
}
.tanxing{
  width: 300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
</style>

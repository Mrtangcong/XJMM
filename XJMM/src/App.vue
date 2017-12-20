<template>
  <div id="app">
    <div class="logo">

    </div>
    <div class="logo-c"></div>
    <div class="rout" >
        <router-link to="/Cur" active-class="lv">客户</router-link>
        <router-link to="/transaction" active-class="lv">交易</router-link>
        <router-link to="/Finance" active-class="lv">财务</router-link>
        <router-link to="/Risk" active-class="lv">风控</router-link>
        <router-link to="/collection" active-class="lv">催收</router-link>
        <router-link to="/Statistics" active-class="lv">统计</router-link>
        <div style="float:right">
          <span>
              <a>
                {{lock}}
              </a>
          </span>
          <router-link to="/login" style="padding:18px 8px 18px"><Icon type="person-stalker" size="25"></Icon></router-link>
          <a  style="padding:18px 8px 18px" @click="dengchu"><Icon type="log-out" size="25"></Icon></a>

        </div>
    </div>
      <router-view/>
       <Modal
        v-model="modal1"
        title=""
        @on-ok="ok" :mask-closable="false">
        <p style="height:50px;text-align:center;line-height:50px">你确定登出么？</p>
    </Modal>
  </div>
</template>

<script>

export default {
  name: 'app',
  data(){
    return{
      lock:'1',
      modal1:false,
    }
  },updated(){
    this.lock = JSON.parse(localStorage.mydata)
    
  },methods:{
    dengchu(){
      this.modal1 = true;
      
    },
    ok(){
      this.lock = '1'
      this.$router.push('/login')
      localStorage.setItem('mydata',JSON.stringify('1'))
    }
  },mounted(){
    this.lock = JSON.parse(localStorage.mydata)
    console.log(this.lock)
    if(this.lock == 1){
      this.$router.push('/login')
    }else{
      // this.$router.push('/Risk/risk-rgxs/Workbench')
    }
    
  }
  }
</script>

<style>
  *{
    margin:0;
    padding: 0;
    box-sizing: border-box;
    font-size: 14px;
  }
  a{
    text-decoration: none;
  }
  html,body,#app,.as{
    height: 100%;
  }
  .c:after{
    content: '';
    display: block;
    clear: both;
    overflow: hidden;

  }
  .logo{
    width: 17%;
    height: 60px;
    border-right:1px solid #000;
    display: inline-block;
    background: url('../static/logo.jpg') no-repeat 10px 6px ;
    background-size:80%;
    vertical-align: top;
    position: fixed;
    top:0;
    left: 0;
  }
  .logo-c{
    width: 17%;
    height: 60px;
    display: inline-block;
    vertical-align: middle;
  }
  .shou{
    position: absolute;
    top:15px;
    left:15px;
  }
  .rout{
    position: relative;
    padding-left:40px;
    width: 79%;
    display: inline-block;
  }
  .shous{
    width:4.5%;
    overflow: hidden; 
  }
  .rout a{
    display: inline-block;
    padding: 18px 20px 18px;
    text-decoration: none;
    color: #495060;
  }
  .lv{
    color: #2d8cf0;
    border-bottom: 2px solid #2d8cf0;
  }
  .asied{
    background: #495060;
    width: 17%;
    height: 100%;
    display: inline-block;
    vertical-align: top;
    position: fixed;
    top:60px;
    left: 0;
  }
  .asied-c{
    width: 17%;
    height: 100%;
    display: inline-block;
    float: left;
  }
  .asiedd{
    width: 4.5%;
    background: #495060;
    height: 100%;
    display: inline-block;
    vertical-align: top;
  }
  .asied .asied-Customer{
    background: #495060;
    color: #fff;
  }
  .asied-C{
    color: hsla(0,0%,100%,.7);
    padding: 14px 24px;
    padding-left: 43px;
    position: relative;
  }
  .asied-Cc{
    display: block;
    background: #363e4f;
  }
  .asied-ccc{
    color: #fff;
    background: #2d8cf0;
  }
  .content{
    display: inline-block;
    width: 82%
  }
  .tage{
  background: #dee3ea;
}
.work-c{
  color: #000;
  padding: 10px;
  display: inline-block;
  border-radius: 0 5px 5px 0;
}
.work-ac{
  background: #1d7be2;
  color: #fff;
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
.biao{
  width: 70px;
  display: inline-block;
}
.biaoa{
  width: auto;
}
.w70{
  width:70px;
  display:inline-block
}
.w150{
  width: 150px;
  display: inline-block;
}
.lianxi{
  display:inline-block;
  width:130px;
  text-align:center;
  margin-top:10px;
}
.chuli{
  padding: 15px 10px;
  color: #6b99c1;
}
.vero{
  width: 180px;
  display:inline-block;
  vertical-align:top;
}
.huitou{
  width: 70px;
  height: 70px;
  background: url('../static/11.jpg') no-repeat;
  background-size: 100%;
  position: fixed;
  right:10px;
  bottom: 10px;
  z-index: 100;
}
.rela{
    position: relative;
}
.xingxing{
    width: 230px;
    height: 30px;
    position: absolute;
    top:-25px;
    left: -10px;
    vertical-align: top;
    font-size: 20px;
    font-weight: bold;
}
.class-a,.class-b{
  border-bottom: 1px solid #666;
}
.class-a i{
  display: inline-block;
  position: absolute;
  right: 20px;
  top:20px;
  transition: all .5s;  
}
.class-b i{
  display: inline-block;
  position: absolute;
  right: 20px;
  top:20px;
  transform: rotate(180deg);
  transition: all .5s;  
}
.logo span{
  text-indent: 80px;
  line-height: 60px;
  display: inline-block;
  font-size: 24px;
  color: #3399ff;
}
.ivu-table td,.ivu-table th{
  width: 150px;
  text-align: center;
}
</style>

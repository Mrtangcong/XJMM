<template>
    <div id="bodt">
        <div class="login">
            <p class="login-logo"></p>
            <div class="yonghuming">
              <span>用户名:</span>
              <input type="text" placeholder="请输入用户名" v-model="username">
            </div>
            <div class="yonghuming">
              <span>密码:</span>
              <input type="password" placeholder="请输入密码" v-model="password">
            </div>
            <div class="yonghuming denglu" @click="login">
              登录
            </div>
        </div>
        <Modal v-model="modal1" title="" :mask-closable="false">
          <p style="height:50px;text-align:center;line-height:50px">用户名密码错误</p>
        </Modal>
        <Modal v-model="modal2" title="" :mask-closable="false">
          <p style="height:50px;text-align:center;line-height:50px">请输入用户名</p>
        </Modal>
        <Modal v-model="modal3" title="" :mask-closable="false">
          <p style="height:50px;text-align:center;line-height:50px">请输入密码</p>
        </Modal>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  data(){
    return{
      username : '',
      password : '',
      modal1:false,
      modal2:false,
      modal3:false

    }
  },methods:{
      login() {
            var that=this;
            if(that.username == '' ){
                that.modal2 = true;
            }else if(that.password == ''){
              that.modal3 = true;
            }else{
              axios.defaults.withCredentials=true
              axios.post(`http://192.168.0.164:8081/user/login?loginName=`+that.username+'&password='+that.password)
              .then(function(res){
                var sr = document.cookies()
                console.log(sr)
                if(res.data.code == '0'){
                  localStorage.setItem('mydata',JSON.stringify(res.data.dataModel.realName))
                  that.$router.push('/')
                }else{
                  that.modal1 = true;
                  that.username = ''
                  that.password = ''
                } 
              })
            }
              
            

           }      
      }
  }
</script>

<style>
#bodt{
  height:100%;
  width: 100%;
  background: url('../../static/bg_img.png') 0 -30px;
  background-size: contain;
  position: fixed;
  top:0;
  left: 0;
}
.login{
  margin: auto;
  width: 350px;
  height: 300px;
  background:#fff;
  margin: 230px auto;  
  padding: 0 30px;
}
.login-logo{
  height: 90px;

  background: url('../../static/logo_img.png') no-repeat 95px 30px ;
  background-size:40%;
    vertical-align: top;
}
.yonghuming{
  height: 30px;
  line-height: 30px;
  margin-bottom: 30px;
}
.yonghuming input{
  display: inline-block;
  height: 100%;
  width: 80%;
  text-indent: 10px;
}
.yonghuming span{
  display: inline-block;
  width: 18.5%;
}
.denglu{
  vertical-align: middle;
  text-align: center;
  background: #6296ea;
  height: 40px;
  line-height: 40px;
}
</style>

<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
		<div class="rela" style="width:1000px;margin-top:20px">
            <Table :columns="columns5"></Table>
            <div class="xingxing">
                <img src="../../../../static/11.png">
                处理记录
            </div>            
        </div>
		<div  style="width:1000px;margin-top:20px">
			<div class="shebeiyou">
				<div>
					<p>设备指纹</p>
					<p>操作系统</p>
					<p>网络类型</p>
					<p>运营商</p>
				</div>
				<div>
					<p>{{huizong.deviceFingermark}}</p>
					<p>{{huizong.osVersion}}</p>
					<p>{{huizong.netType}}</p>
					<p>{{huizong.MNO}}</p>
				</div>
			</div>
			<div class="shebeizuo">
				<div>
					<p>IP地址</p>
					<p>IP归属地</p>
					<p>Gps地址</p>	
				</div>
                <div>
					<p>{{huizong.ip}}</p>
					<p>{{huizong.ipArea}}</p>
					<p>{{huizong.GPSAddress}}</p>	
				</div>
			</div>
		</div>
    </div>
</template>
<script>
import axios from 'axios'
    export default {
        props: {
            row: Object
        },data(){
            return{
                huizong:{},
                columns5: [
                    {
                        title: '序号',
                        key: 'name'
                    },
                    {
                        title: '处理时间',
                        key: 'age'
                    },
                    {
                        title: '处理人',
                        key: 'address'
                    },
                    {
                        title: '审核结果',
                        key: 'address1'
                    },
                    {
                        title: '审核意见',
                        key: 'address2'
                    }
                ]
            }
        },mounted(){
            var that = this
           // 处理记录
            axios.post('http://192.168.0.164:8081/workorder/getWorkOrdersInfoByOrderno',{"orderNo":"DD5127151044291635"})
            .then(function(res){
            console.log(res)
            })
            // 设备信息
            axios.post('http://192.168.0.164:8081/order/getDeviceInfoByOrderNo',{"orderNo":"DD5125304476303896"})
            .then(function(res){
                 that.huizong = res.data.data[0]

            })
        }
    };
</script>
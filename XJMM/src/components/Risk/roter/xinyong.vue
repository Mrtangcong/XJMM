<template>
	<div>

		<div class="height100"></div>
		<div class="rela">
            <Table :columns="columns1" :data="jilu"></Table>
            <div class="xingxing">
                <img src="../../../../static/11.png">
                借款申请处理记录
            </div>            
        </div>
		<div class="height100"></div>
	</div>
</template>

<script>
    import src from '../../../../static/js/js.js'
    import  axios from 'axios'
	export default{
		name:'xinyong',
		data(){
			return{
                jilu:[],
				columns1: [
                    {
                        type:"index",
                        title: '序号',
                        key: 'name',
                        width:'100px'
                    },
                    {
                        title: '申请时间',
                        key: 'loanDate',
                        width:'300px'
                    },
                    {
                        title: '申请金额',
                        key: 'amount'
                    },
                    {
                        title: '期限',
                        key: 'loanDayNumber'
                    },
                    {
                        title: '路由策略',
                        key: 'orderStatus'
                    },
                    {
                        title: '授信结果',
                        key: 'auditorResult'
                    },
                    {
                        title: '放款金额',
                        key: 'amount'
                    },
                    {
                        title: '描述',
                        key: 'orderStatus   '
                    }
                ]
			}
		},methods: {
        	huitou(){
        		document.body.scrollTop = 0;
        		document.documentElement.scrollTop = 0; 

        	}
        },mounted(){
            // 借款申请处理记录  无数据
            var that = this
            console.log(src)
            axios.post('http://192.168.0.164:8081/order/getAllFinishedOrderInfoByUid',{ "uids":[104]})
            .then(function(res){
                console.log(res)
                that.jilu = res.data.data              
            })
        }
	}
</script>
<style>
	
</style>
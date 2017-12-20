<template>
  <div>
    <div class="tage">
      <Tag class="rengong"  v-if="showTag" closable @on-close="handleClose" >跟踪列表</Tag>
    </div>
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
              <Button type="ghost" style="margin-right:-5px">订单状态</Button>
              <Select clearable v-model="morderStatus" style="width:170px" size="large">
                <Option v-for="item in orderStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
               <Button type="text" class="btn-time">到期时间</Button>
              <Date-picker v-model="dueSta" type="date" placeholder="选择日期" style="width: 170px"></Date-picker>
              -----
              <Date-picker v-model="dueEnd" type="date" placeholder="选择日期" style="width: 170px"></Date-picker>       
            </div>
            <div class="equal">
              <Button type="ghost" style="margin-right:-5px" >订单号&#12288;</Button>
              <Input v-model="orderNum" size="large" style="width: 170px"></Input>
              <Button type="ghost" class="btn-sta">&#12288;姓名&#12288;</Button>
              <Input v-model="name" size="large" style="width: 170px"></Input>
              <Button type="ghost" class="btn-sta">手机号&#12288;  </Button>
              <Input v-model="tel" size="large" style="width: 170px"></Input>


            </div>
          </Col>
        </Row>
      </div>
      <div class="equal">
        <Button type="primary" icon="ios-search" @click="searchTable">查询</Button>
        <Button type="primary" @click="resetData" icon="ios-loop">重置</Button>
        <Button type="primary" slot="extra" @click="showRollin">选择转入</Button>
        <Button type="warning" class="fright" @click="plan">回款计划</Button>
        <Button type="error" class="fright" @click="nowShou">今日应收</Button>
      </div>

      <div id="rdate">
        <Table  :columns="worker" :data="workerdata" stripe size="default"></Table>
      </div>
      <div class="operate">
        <Select v-model="mlots" clearable style="width:100px" placeholder="批量选择" @on-change="option">
          <Option v-for="item in lots" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
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
      <Modal v-model="recordModal" title="处理记录":mask-closable="false">
          <div v-for="item in list" class="chuli">
              <p>
                <span>{{item.sj}}</span>由
                <span> {{item.prean}} </span> 
                <span> {{item.name}} </span>
                <span> {{item.tijiao}} </span>
              </p>

          </div>
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
      <Modal v-model="planModal" title="回款计划" width="1300px":mask-closable="false">
        <div class="box1">
          <div class="fright">
             <div>
              <span>预计应收总额：   </span>
              <span class="biao w70" >{{Pnumber.planAmount}}元</span>
              <span>已收总额：   </span>
              <span class="biao w70" >{{Pnumber.alreadyAmount}}元</span>
             </div> 
             <div>
              <span>预计应收：</span>
              <span class="biao w70" >{{Pnumber.planNumber}}笔</span>
              <span>已收笔数：</span>
              <span class="biao w70" >{{Pnumber.alreadyNumber}}笔</span>
             </div> 
          </div> 
          <div>
            <Button type="text" >到期日期</Button>
            <Date-picker v-model="staData" type="date" placeholder="起" style="width: 80px"></Date-picker>
              -----
            <Date-picker v-model="endData" type="date" placeholder="止" style="width: 80px"></Date-picker> 
            <Button type="primary" icon="ios-search" @click="search">查询</Button>       
          </div>
           <div class="table">
            <Table :columns="moneyPlan" :data="moneyPlandata"></Table>
          </div>
          <div id="rpage">
            <Page :total="100" size="small" show-elevator show-sizer></Page>
          </div>
        </div>
      </Modal>
      <Modal v-model="shouModal" title="今日应收" width="1300px":mask-closable="false">
        <div class="box1">
          <div class="father">
            <div class="fright">
             <div>
              <span>预计应收总额：   </span>
              <span class="biao w70" >{{Tnumber.planAmount}}元</span>
              <span>已收总额：   </span>
              <span class="biao w70" >{{Tnumber.alreadyAmount}}元</span>
             </div> 
             <div>
              <span>预计应收：</span>
              <span class="biao w70" >{{Tnumber.planNumber}}笔</span>
              <span>已收笔数：</span>
              <span class="biao w70" >{{Tnumber.alreadyNumber}}笔</span>
             </div> 
            </div>
          </div> 
           <div class="table">
            <Table :columns="shouMoney" :data="shouMoneydata"></Table>
          </div>
          <div id="rpage">
            <Page :total="100" size="small" show-elevator show-sizer></Page>
          </div>
        </div>
      </Modal> 
      <Modal v-model="repaymentModal" title="还款明细" width="1000px":mask-closable="false">
        <div class="box1">
          <div class="vero">
              <span class="lie">贷款金额</span>
              <span class="biao w70" >{{Hnumber.loanAmount}}</span> 
              <span class="lie">放款金额</span>
              <span class="biao w70" >{{Hnumber.giveAmount}}</span>
              <span class="lie">逾期类型</span>
              <span class="biao w70" >{{Hnumber.dueType}}</span>
          </div>
          <div class="vero">
              <span class="lie">期限</span>
              <span class="biao w70" >{{Hnumber.loanDayNumber}}</span> 
              <span class="lie">最后还款日</span>
              <span class="biao w70" >{{Hnumber.endDate}}</span>
          </div>
          <div class="vero">
              <span class="lie">借款日期</span>
              <span class="biao w70" >{{Hnumber.applyDate}}</span> 
              <span class="lie">应还金额</span>
              <span class="biao w70" >{{Hnumber.totalShouldPay}}</span>
          </div>
          <div class="vero">
              <span class="lie">放款日期</span>
              <span class="biao w70" >{{Hnumber.loanDate}}</span> 
              <span class="lie">剩余应还金额</span>
              <span class="biao w70" >{{Hnumber.lastAmount}}</span>
          </div>
          <div>
            <Table :columns="repayDetail" :data="repayDetaildata"></Table>
          </div>
        </div>
      </Modal>
      <Modal v-model="rollinModal" title="选择转入" :mask-closable="false">
        <div class="warm"><Icon type="alert-circled" color="#ff9900" size="36"></Icon>你确定将<span class="w150">{{Znumber.orderNo}}</span>转入以下其中一项吗？</div>
        <div class="warm">
          <span style="display:block">转入方式</span>
          <span style="display:block">备注</span>
          <textarea id="notes"  cols="50" rows="5"></textarea>
        </div>
        <div slot="footer">
          <Button type="warning" @click="cancel">取消</Button>
          <Button type="primary" @click="yes">确认转入</Button>
        </div>
      </Modal>
      <Modal v-model="optionModal" title="一键全部转入" :mask-closable="false" width="780px">
        <div class="warm"><Icon type="alert-circled" color="#ff9900" size="36"></Icon>你确定将所有【待还款-尚未到期】订单转入以下其中一项吗？</div>
        <div class="warm">
          <span style="display:block">转入方式</span>
          <span style="display:block">备注</span>
          <textarea id="notes" cols="50" rows="5"></textarea>
        </div>
        <div slot="footer">
            <Button type="warning" @click="cancel">取消</Button>
            <Button type="primary" @click="yes">确认转入</Button>
        </div>
      </Modal>
  </div>
</template>


<script>
import axios from 'axios';
import common from '../../router/common.js'

export default {
  name: 'Tranl',
  data() {
    return {
      self: this,
      showTag:true,
      orderModal:false,
      recordModal:false,
      userModal:false,
      repaymentModal:false,//还款明细
      rollinModal:false,//选择转入
      optionModal:false,//一键转入
      planModal:false,//回款计划
      shouModal:false,//今日应收
      // requireModal:false,//获取
      // paymentModal:false,
      // refuseModal:false,
      Onumber:{},
      Anumber:{},
      Snumber:{},
      Pnumber:{},
      Tnumber:{},
      Hnumber:{},
      Znumber:{},
      list:[
        {sj:'2017-11-15 10:00:00',prean:'财务人员',name:'何四',tijiao:'确认打款',xinxi:'djkasojdgksdklfj'},
        {sj:'2017-11-15 10:00:00',prean:'信审人员',name:'李二',tijiao:'确认打款',xinxi:'dasidjnsdklfmsdf'},
        {sj:'2017-11-15 10:00:00',prean:'财务人员',name:'吴老',tijiao:'确认打款',xinxi:'sadasdasdasdasd'},
        {sj:'2017-11-15 10:00:00',prean:'财务人员',name:'七八',tijiao:'确认打款'}
      ],
      mlots:'',
      lots: [
        {
          value: 1,
          label: '一键全部转入'
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
      repayDetail:[//还款明细
        {
          type: 'index',
          width:45,
          align: 'center'
        },
        {
          title: '实际还款日期',
          width:120,
          key: 'actualRepayDate'
        },
        {
          title: '应还金额',
          width:100,
          key: 'shouldRepay'
        },
        {
          title: '本次实收金额',
           width:120,
          key: 'actualReceive'
        },
        {
          title: '剩余应还',
          width:100,
          key: 'lastAmount'
        },
        {
          title: '提交时间',
          width:100,
          key: 'submitDate'
        },
        {
          title: '还款渠道',
          width:100,
          key: 'repayWay'
        },
        {
          title: '还款方式',
          width:100,
          key: 'repayMethod'
        },
        {
          title: '销账人员',
          width:100,
          key: 'eraseMan'
        },
        {
          title: '状态',
          width:80,
          key: 'repayStatus'
        }
      ],
      repayDetaildata:[],
      moneyPlan:[//回款计划
        {
          type: 'index',
          width:30,
          align: 'center'
        },
        {
          title: '到期日期',
          width:110,
          sortable: true,
          key: 'end'
        },
        {
          title: '姓名',
          width:80,
          key: 'userName'
        },
        {
          title: '手机号',
          width:90,
          key: 'mobile'
        },
        {
          title: '订单号',
          width:90,
          key: 'orderNo'
        },
        {
          title: '实际应还',
          width:110,
          sortable: true,
          key: 'alreadyPay'
        },
        {
          title: '借款本金',
          width:110,
          sortable: true,
          key: 'loanAmount'
        },
        {
          title: '账户管理费',
          width:110,
          key: 'accountManageFee'
        },
        {
          title: '利息',
          width:80,
          key: 'accrualFee'
        },
        {
          title: '快速审核费',
          width:110,
          key: 'fastAuditFee'
        },
        {
          title: '滞纳金',
          width:90,
          key: 'delayFee'
        },
        {
          title: '逾期管理费',
          width:110,
          key: 'delayManageFee'
        },
        {
          title: '放款日期',
          width:110,
          sortable: true,
          key: 'loan'
        }
      ],
      moneyPlandata:[],
      staData:'',
      endData:'',
      shouMoney:[//今日应收
        {
          type: 'index',
          width:30,
          align: 'center'
        },
        {
          title: '到期日期',
          width:110,
          sortable: true,
          key: 'end'
        },
        {
          title: '姓名',
          width:80,
          key: 'userName'
        },
        {
          title: '手机号',
          width:90,
          key: 'mobile'
        },
        {
          title: '订单号',
          width:90,
          key: 'orderNo'
        },
        {
          title: '实际应还',
          width:110,
          sortable: true,
          key: 'alreadyPay'
        },
        {
          title: '借款本金',
          width:110,
          sortable: true,
          key: 'loanAmount'
        },
        {
          title: '账户管理费',
          width:110,
          key: 'accountManageFee'
        },
        {
          title: '利息',
          width:80,
          key: 'accrualFee'
        },
        {
          title: '快速审核费',
          width:110,
          key: 'fastAuditFee'
        },
        {
          title: '滞纳金',
          width:90,
          key: 'delayFee'
        },
        {
          title: '逾期管理费',
          width:110,
          key: 'delayManageFee'
        },
        {
          title: '放款日期',
          width:110,
          sortable: true,
          key: 'loan'
        }
      ],
      shouMoneydata:[],
      
      worker:[
        {
          type: 'index',
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
                    this.showOrder(params.row.orderNo)
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
                    this.showRollin(params.row.orderNo)
                  }
                }
              },'选择转入'),
              h('Button', {
                props: {
                  type: 'text',
                  size:'small'
                },
                on: {
                  click: () => {
                    this.showRecord(params.row.orderNo)
                  }
                }
              },'处理记录'),
              h('Button', {
                props: {
                  type: 'text',
                  size:'small'
                },
                on: {
                  click: () => {
                    this.showRepayment(params.row.orderNo)
                  }
                }
              },'还款明细')
            ]);
          }
        },
        {
          title: '姓名',
          width:100,
          key: 'userName'
        },
        {
          title: '手机号',
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
          title: '订单状态',
          width:100,
          key: 'orderStatus'
        },
        {
          title: '到期日期',
          width:110,
          sortable: true,
          key: 'end'
        },
        {
          title: '剩余应还',
          width:110,
          sortable: true,
          key: 'residuePay'
        },
        {
          title: '实际还款',
          width:100,
          key: 'alreadyPay'
        },
        {
          title: '借款本金',
          width:110,
          sortable: true,
          key: 'loanAmount'
        },
        {
          title: '账户管理费',
          width:120,
          key: 'accountManageFee'
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
          title: '逾期天数',
          width:110,
          sortable: true,
          key: 'dueDayNumber'
        },
        {
          title: '放款日期',
           width:110,
          sortable: true,
          key: 'loanDate'
        },
        {
          title: '备注',
          key: 'remarks'
        }
      ],
      workerdata:[],

      orderStatus:[
       {
          value: 1,
          label: '待付款'
        },
        {
          value: 2,
          label: '已逾期'
        },
        {
          value: 3,
          label: '已结清'
        }
      ],
      morderStatus:'',
      dueSta:'',
      dueEnd:'',
      orderNum:'',
      name:'',
      tel:''


    };
  },
  mounted(){
    var url = common.apidomain //188:8088
    this.urls = url

    var url0 = common.apifeng  //105:8081
    this.urla = url0

    var url1 = common.apiweng
    this.urlb  = url1

    this.getdata();

  },
  methods: {

    resetData(){//我的工作台 重置
      this.morderStatus="",
      this.dueSta="",
      this.dueEnd="",
      this.orderNum="",
      this.name="",
      this.tel=""
    },
    handleClose() {
      this.showTag = false;
      this.$router.push('/collection')
    },
    plan(){//回款计划
      this.planModal=true;
      var that = this;
      axios.post(this.urls+'/loanfollow/followlist/receivePlan',{})
        .then(function(res) {
          console.log(res);
           that.moneyPlandata=res.data.data;
        });
        axios.post(this.urls+'/loanfollow/followlist/receivePlanGather',{})
        .then(function(res) {
          console.log(res);
           that.Pnumber=res.data.data;
        })
      
    },
    search(){//回款计划中的查询
          var that = this;
          axios.post(this.urls+'/loanfollow/followlist/receivePlan',{
            "dueDateMin":that.staData,
            "dueDateMax":that.endData,
            "page": {
              "currentPage": "",
              "pageNumber": "1"
            }
          })
        .then(function(res) {
          console.log(1);
         
           that.moneyPlandata=res.data.data;
        })
    },
    nowShou(){//今日应收
      this.shouModal=true;
      var that = this;
      axios.post(this.urls+'/loanfollow/followlist/todayOughtToReceive', {})
        .then(function(res) {
          console.log(res);
          //  that.shouMoneydata=res.data.data;
        });
         axios.post(this.urls+'/loanfollow/followlist/todayOughtToReceiveGather',{})
        .then(function(res) {
          // console.log(res);
           that.Tnumber=res.data.data;
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
   
    showRepayment(index){//还款明细
      this.repaymentModal=true;
      var that = this;
      axios.get(this.urls+'/loanfollow/followlist/repayDetail_01/'+'DD5125304476303896')
        .then(function(res) {
          console.log(res);
          that.Hnumber = res.data.data;
        });
         axios.post(this.urls+'/loanfollow/followlist/repayDetail_02', {
        "orderNo": "DD5125304476303896",
        "page": {
          "currentPage": 6,
          "pageNumber": 123
        }
      })
        .then(function(res) {
          console.log(res);
          that.repayDetaildata = res.data.data;
        })

    },
    showRecord(){ //处理记录
      this.recordModal=true;
    },
    showUser(){//用户基本信息
       this.userModal=true;
       var that = this;
      axios.post(this.urls+'/userinfo/getUserExtendInfo', {
        // "orderNo": that.orderNum,
      })
        .then(function(res) {
          console.log(res);
          //  that.workerdata=res.data.data;
        })

    },

    searchTable(){  //我的工作台查询  
      var that = this;
      axios.post(this.urls+'/loanfollow/followlist/orderList', {
        "caseStatus": "",
        "orderNo": '',
        "name":that.name,
        "phoneNo": "",
        "page": {
          "currentPage": "",
          "pageNumber": "1"
        }
      })
        .then(function(res) {
          console.log(res);
          //  that.workerdata=res.data.data;
        })
    },
    showRollin(index){//选择转入
      this.rollinModal=true;
      var that = this;
      axios.post(this.urls+'/loanfollow/followlist/remindReceive/DD5125304476303896')
        .then(function(res) {
          console.log(res);
          //  that.workerdata=res.data.data;
        })
    },
    option(value){//批量操作
    
    if(value == 1){
        this.optionModal=true;
        var that = this;
        axios.post(this.urls+'8/loanfollow/followlist/remindReceive/DD5125304476303896')
        .then(function(res) {
            console.log(res);
          //  that.workerdata=res.data.data;
        })

    }
     

    },
    yes(){//批量操作的确认
    this.optionModal=false; 
     this.mlots=""
    },
    cancel(){//批量操作的取消
    this.optionModal=false;     
      this.mlots = ""
       
    },
    getdata(index){//我的工作台的静态数据
      var that = this;
      axios.post(this.urls+'/loanfollow/followlist/orderList', {
        "orderStatus": "",
        "orderNo": "",
        "name": "",
        "message": "",
        "phoneNumber": "",
        "page": {
          "currentPage": "",
          "pageNumber": "1"
        }
      })
        .then(function(res) {
          console.log(res);
           that.workerdata=res.data.data;
        })
    }


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-time{
  padding-left: 0;
  margin-left:40px;
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
.father{
  position: relative;
  height: 50px;
}
.fright{
    float: right;
    margin-right: 15px;
    overflow: hidden;
}
.table{
  margin-top:25px;
}
.operate{
  margin-left:60px;
  /* margin-top:25px; */
  margin-bottom: 30px;
}
.warm{
  margin-left:80px;
}
#notes{
  resize: none;
}

</style>

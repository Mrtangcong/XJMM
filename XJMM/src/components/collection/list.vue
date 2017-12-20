<template>
  <div>
    <div class="tage">
      <Tag v-if="showTag" closable @on-close="handleClose" >催收列表</Tag>
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
              <Button type="ghost" style="margin-right:-5px">案件状态</Button>
              <Select clearable v-model="mcaseStatus" style="width:170px" size="large">
                <Option v-for="item in caseStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Button type="ghost" class="btn-sta">逾期类型</Button>
              <Select clearable v-model="moverType" style="width:170px" size="large">
                <Option v-for="item in overType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Button type="ghost" class="btn-sta">受理人员</Button>
              <Select clearable v-model="maccepter" style="width:170px" size="large">
                <Option v-for="item in accepter" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>

            </div>
            <div class="equal">
              <Button type="text" class="btn-time">到期日期</Button>
              <Date-picker v-model="dueSta" type="date" placeholder="起" style="width: 170px"></Date-picker>
              -----
              <Date-picker v-model="dueEnd" type="date" placeholder="止" style="width: 170px"></Date-picker>
              <Button type="text" class="btn-end">分配日期</Button>
              <Date-picker v-model="assignSta" type="date" placeholder="起" style="width: 170px"></Date-picker>
              -----
              <Date-picker v-model="assignEnd" type="date" placeholder="止" style="width: 170px"></Date-picker>
            </div>
            <div class="equal">
              <Button type="ghost" style="margin-right:-5px" >订单号&#12288;</Button>
              <Input v-model="orderNum" size="large" style="width: 170px"></Input>
              <Button type="ghost" class="btn-sta">&#12288;姓名&#12288;</Button>
              <Input v-model="name" size="large" style="width: 170px"></Input>
              <Button type="ghost" class="btn-sta">手机号&#12288;</Button>
              <Input v-model="tel" size="large" style="width: 170px"></Input>


            </div>
          </Col>
        </Row>
      </div>
      <div class="equal">
        <Button type="primary" icon="ios-search" @click="searchTable">查询</Button>
        <Button type="primary" icon="ios-loop" @click="resetData" >重置</Button>
        <Button type="primary" slot="extra">发起收款</Button>
        <Button type="primary" slot="extra">新增催收记录</Button>
        <Button type="primary" slot="extra">申请保留</Button>
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
      <Modal v-model="casedetailModal" title="查看案件详情">
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

      <Modal v-model="addrecordModal" title="新增催收">
        <div class="box1">
          <Button type="text" >联系号码</Button>
          <Input v-model="orderNum" size="large" style="width: 200px"></Input>
          <div class="h1" style="margin:20px 0"></div>
          <Button type="text" >案件状态</Button>
          <Select clearable v-model="mcaseStatus" style="width:200px" size="large">
            <Option v-for="item in caseStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <div class="h1" style="margin:20px 0"></div>
          <Button type="text" >催收备注</Button><br>
           <textarea id="notes" cols="50" rows="5"></textarea>
        </div>
        <div slot="footer">
            <Button type="warning" >取消</Button>
            <Button type="primary" @click="xzcs">新增</Button>
        </div>
      </Modal>

      <Modal v-model="receiveModal" title="发起收款">
        <div class="box1">
            <Button type="text" >收款金额</Button>
             <Input v-model="orderNum" size="large" style="width: 200px"></Input>

          <div class="h1" style="margin:20px 0"></div>
          <Button type="text" >减免科目</Button>
          <Select clearable v-model="mcuiPerson" style="width:200px" size="large">
            <Option v-for="item in cuiPerson" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <div class="h1" style="margin:20px 0"></div>
          <Button type="text" >减免金额</Button>
          <Input v-model="orderNum" size="large" style="width: 200px"></Input>
          <div class="h1" style="margin:20px 0"></div>
          <Button type="text" >收款备注</Button><br>
           <textarea id="notes" cols="50" rows="5"></textarea>
        </div>
        <div slot="footer">
            <Button type="warning" @click="cancel2">取消</Button>
            <Button type="primary" @click="yes2">发起收款</Button>
        </div>
      </Modal> 

      <Modal v-model="retainModal" title="申请保留">
        <div ><Icon type="alert-circled" color="#ff9900" size="36"></Icon>你确定要对该案件申请保留？</div>
        <div slot="footer">
          <Button type="warning" @click="cancel">取消</Button>
          <Button type="primary" @click="yes">确定保留</Button>
        </div>
      </Modal>

      <Modal v-model="AreceiveModal" title="一键确认收款" ok-text="确认首款" @on-ok="yjqrsk">
        <div ><Icon type="alert-circled" color="#ff9900" size="36"></Icon>你确定要一键对所有的案件发起收款通知？</div>
      </Modal>

      <Modal v-model="AretainModal" title="一键申请保留" ok-text="确定保留" @on-ok="yjsqbl">
        <div ><Icon type="alert-circled" color="#ff9900" size="36"></Icon>你确定要保留所有案件？</div>
      </Modal>

      <Modal v-model="recordModal" title="处理记录">
          <div v-for="item in list" class="chuli">
              <p>
                <span>{{item.sj}}</span>由
                <span> {{item.prean}} </span> 
                <span> {{item.name}} </span>
                <span> {{item.tijiao}} </span>
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
      <Modal v-model="repaymentModal" title="还款明细" width="1000px">
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

  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'list',
  data() {
    return {
      self: this,
      showTag:true,
      orderModal:false,
      recordModal:false,
      userModal:false,

      casedetailModal:false,//查看订单详情      
      repaymentModal:false,//还款明细
      reassigncaseModal:false,//分配案件
      addrecordModal:false,//新增催收记录
      receiveModal:false,//发起收款
      retainModal:false,//申请保留
      // paymentModal:false,
      // refuseModal:false,
      Onumber:{},
      Anumber:{},
      Snumber:{},
      Hnumber:{},
      list:[
        {sj:'2017-11-15 10:00:00',prean:'财务人员',name:'何四',tijiao:'确认打款',xinxi:'djkasojdgksdklfj'},
        {sj:'2017-11-15 10:00:00',prean:'信审人员',name:'李二',tijiao:'确认打款',xinxi:'dasidjnsdklfmsdf'},
        {sj:'2017-11-15 10:00:00',prean:'财务人员',name:'吴老',tijiao:'确认打款',xinxi:'sadasdasdasdasd'},
        {sj:'2017-11-15 10:00:00',prean:'财务人员',name:'七八',tijiao:'确认打款'}
      ],
      mlots:'',
      lots:[
        {
          value: 1,
          label: '一键发起收款'
        },
        {
          value: 2,
          label: '一键申请保留'
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
      worker:[
        {
          type: 'index',
          width:30,
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
                    this.showCasedetail(params.row.orderNum)
                  }
                }
              },'案件详情'),
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
                    this.showReceive(params.row.orderNum)
                  }
                }
              },'发起收款'),
              h('Button', {
                props: {
                  type: 'text',
                  size:'small'
                },
                on: {
                  click: () => {
                    this.showAddrecord(params.row.orderNum)
                  }
                }
              },'新增催收记录'),
              h('Button', {
                props: {
                  type: 'text',
                  size:'small'
                },
                on: {
                  click: () => {
                    this.showRetain(params.row.orderNum)
                  }
                }
              },'申请保留'),
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
              },'处理记录'),
              h('Button', {
                props: {
                  type: 'text',
                  size:'small'
                },
                on: {
                  click: () => {
                    this.showRepayment(params.row.orderNum)
                  }
                }
              },'还款明细')
            ]);
          }
        },
        {
          title: '案件状态',
          width:100,
          key: 'product'
        },
        {
          title: '受理人员',
          width:100,
          key: 'product'
        },
        {
          title: '是否已保留',
          width:100,
          key: 'key'
        },
        {
          title: '到期时间',
          key: 'applyTime',
          width:110,
          sortable: true
        },
        {
          title: '姓名',
          key: 'product'
        },
        {
          title: '手机号',
          key: 'tel',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size:'small'
                },
                on: {
                  click: () => {
                    this.showUser(params.row.orderNum)
                  }
                }
              },params.row.tel)
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
                    this.showOrder(params.row.orderNum)
                  }
                }
              },params.row.orderNum),
            ]);
          }
        },
        {
          title: '剩余应还',
          key: 'applyTime',
          width:110,
          sortable: true
        },
        {
          title: '实际已还',
          key: 'applyMoney',
          width:110,
          sortable: true
        },
        {
          title: '借款本金',
          key: 'serviceMoney',
          width:110,
          sortable: true
        },
        {
          title: '服务费',
          key: 'deadLine'
        },
        {
          title: '逾期类型',
          width:100,
          key: 'payMoney'
        },
        {
          title: '期限',
          key: 'payMoney'
        },
        {
          title: '逾期天数',
          key: 'payMoney',
          width:110,
          sortable: true
        },
        {
          title: '滞纳金',
          key: 'payMoney',
          // width:110,
          sortable: true
        },
        {
          title: '分配日期',
          key: 'payMoney',
          // width:110,
          sortable: true
        },
        {
          title: '备注',
          key: 'payMoney'
        }
      ],
      workerdata:[],

      caseStatus:[
        {
          value: 1,
          label: '待联系'
        },
        {
          value: 2,
          label: '失联'
        },
        {
          value: 3,
          label: '承诺还款'
        },
        {
          value: 4,
          label: '亲友转告'
        },
        {
          value: 5,
          label: '谈判中'
        },
        {
          value: 6,
          label: '拒绝还款'
        },
        {
          value: 7,
          label: '欺诈'
        },
        {
          value: 8,
          label: '已停止'
        }
      ],
      overType:[],
      accepter:[],
      mcaseStatus:'',
      moverType:'',
      maccepter:'',
      dueSta:'',
      dueEnd:'',
      assignSta:'',
      assignEnd:'',
      orderNum:'',
      name:'',
      tel:'',


    };
  },
  mounted(){
    this.getdata();

  },
  methods: {

    resetData(){//我的工作台 重置
      this.mcaseStatus="",
      this.moverType="",
      this.maccepter="",
      this.dueSta="",
      this.dueEnd="",
      this.assignSta="",
      this.assignEnd="",
      this.orderNum="",
      this.name="",
      this.tel=""

    },
    handleClose() {
      this.show = false;
      this.$router.push('/collection')
    },
    showOrder(index){ //查看订单
      this.orderModal=true;
       var that = this;
      axios.get('http://192.168.0.188:8088/loanfollow/followlist/orderDetail_01/DD5125304476303896')
         .then(function(res) {
           console.log(res.data.data);
            that.Onumber=res.data.data;
         });
      axios.get('http://192.168.0.188:8088/loanfollow/followlist/orderDetail_02/DD5125304476303896')
        .then(function(res) {
          console.log(res.data.data);
           that.Anumber=res.data.data;
        });
        axios.get('http://192.168.0.188:8088/loanfollow/followlist/orderDetail_03/DD5127151044291635')
        .then(function(res) {
          console.log(res);
           that.mianjiandata=res.data.data;
        })
    },
    showCasedetail(index){//查看案件详情
       this.casedetailModal=true;
    },
    showReceive(index){//发起收款
      this.receiveModal=true;
    },
    showRetain(index){//申请保留
      this.retainModal=true;
    },
     option(value){//批量操作 一键发起收款 一键保留
      if(value == 1){
        this.AreceiveModal=true;        
      }else if(value==2){
        this.AretainModal=true;
      }
    },
    cancel2(){
       this.assigncaseModal2=false;
       this.mlots=""
    }, 
    yes2(){
       this.assigncaseModal2=false;
       alert("分配成功! 您已将所有按键分给所选的催收人员" );
       this.mlots=""
    },
   
    showAddrecord(index){//新增催收记录
      this.addrecordModal=true;
    },
    xzcs(){//新增催收的确定
     this.addrecordModal=false;
    },
    
    
    showRepayment(index){//还款明细
      this.repaymentModal=true;
      var that = this;
      axios.get('http://192.168.0.188:8088/loanfollow/followlist/repayDetail_01/DD5125304476303896')
        .then(function(res) {
          console.log(res);
          that.Hnumber = res.data.data;
        });
         axios.post('http://192.168.0.188:8088/loanfollow/followlist/repayDetail_02', {
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
    },

    searchTable(){  //我的工作台查询

    },
    handleTagsAdd(){//审核

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
 .btn-end{
   margin-left:130px;
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
  margin-left:30px;
}
</style>

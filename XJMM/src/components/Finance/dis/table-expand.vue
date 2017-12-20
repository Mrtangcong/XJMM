<style scoped>
    .expand-row{
        text-align: left;
    }
</style>
<template>
    <div>
        <Row class="expand-row">
            <Col span="8">
                <span class="expand-key">订单号: </span>
                <span class="expand-value">{{ row.orderNo  }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">订单创建时间: </span>
                <span class="expand-value">{{ row.orderCreateDate  }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">借款本金: </span>
                <span class="expand-value">{{ row.loanCapital  }}</span>
            </Col>
        </Row>
        <Row class="expand-row">
            <Col span="8">
                <span class="expand-key">期限: </span>
                <span class="expand-value">{{ row.limitDays  }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">服务费: </span>
                <span class="expand-value">{{ row.serviceCharge  }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">滞纳金: </span>
                <span class="expand-value">{{ row.delayMoney  }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">实际以还: </span>
                <span class="expand-value">{{ row.actualRepayAmount  }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">剩余应还: </span>
                <span class="expand-value">{{ row.leftRepayAmount }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">到期日期: </span>
                <span class="expand-value">{{ row.expireDate  }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">逾期类型: </span>
                <span class="expand-value">{{ row.dueType  }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">逾期天数: </span>
                <span class="expand-value">{{ row.dueDays  }}</span>
            </Col>

            <Col span="8">
                <span class="expand-key">审核时间: </span>
                <span class="expand-value">{{ row.viewDate }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">放款时间: </span>
                <span class="expand-value">{{ row.loanDate  }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">到账时间: </span>
                <span class="expand-value">{{ row.transferDate  }}</span>
            </Col>

        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>
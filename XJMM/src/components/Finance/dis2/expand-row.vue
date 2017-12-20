<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Row class="expand-row">
            <Col span="4">
                <span class="expand-key">手工免减明细: </span>
                <span class="expand-value">{{ row.job }}</span>
            </Col>
            <Col span="4">
                <span class="expand-key">快速审核费: </span>
                <span class="expand-value">{{ row.interest }}</span>
            </Col>
            <Col span="4">
                <span class="expand-key">账户管理费: </span>
                <span class="expand-value">{{ row.birthday }}</span>
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
<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <!--<el-row style="background:#fff;padding:16px 16px 30px">
      <pack-search v-model="queryList" :search-type-data="searchTypeList" @search="onSearch" @resetSearch="onResetSearch" />
      <pack-table
        :data="list"
        :column="column"
        :pagination="pagination"
        :total="total"
        :loading="listLoading"
        @change="onTableChange"
        @selectionChange="onSelectionChange"
      />
    </el-row>-->
    <!--    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>-->
    <!--<el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>-->

  </div>
</template>

<script>
import PanelGroup from './dashboard/PanelGroup'
import LineChart from './dashboard/LineChart'
import RaddarChart from './dashboard/RaddarChart'
import PieChart from './dashboard/PieChart'
import BarChart from './dashboard/BarChart'
import { action } from '../api'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
const column = [
  { label: '日期', prop: 'date' },
  /*
  { label: '视频点击数', prop: 'title' },
*/
  { label: '动态要闻阅读数', prop: 'newsClickNum' },
  { label: '通知公告阅读数', prop: 'notionClickNum' }
]
export default {
  name: 'Index',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart
  },
  data() {
    return {
      queryList: {
        endDate: null
      },
      lineChartData: lineChartData.newVisitis,
      column,
      url: {
        list: '/article/access-statistic/statistic'
      }
    }
  },
  mounted() {
    this.searchTypeList = [
      { type: 'datePickerRange', value: '', label: '日期', attr: 'date' }
    ]
  },
  methods: {
    getList(arg = 1) {
      if (!this.url.list) {
        this.$message({
          message: '请设置url.list属性!',
          type: 'warning'
        })
        return false
      }
      if (arg === 1) {
        this.pagination.pageNum = 1
      }
      this.listLoading = true
      const param = {}
      Object.keys(this.queryList).forEach((key) => {
        if (Object.prototype.toString.call(this.queryList[key]) === '[object Array]') {
          param.startDate = this.queryList[key][0]
          param.endDate = this.queryList[key][1]
        }
      })

      action(this.url.list, Object.assign({}, param, this.pagination)).then((response) => {
        const { result } = response
        if (result.records) {
          this.list = result.records
        } else {
          this.list = result
        }
        this.total = response.result.total || this.list.length || 10
      }).catch(() => { this.list = [] }).finally(() => { this.listLoading = false })
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>

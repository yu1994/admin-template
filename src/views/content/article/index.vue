<template>
  <div class="app-container">
    <base-search :params="queryParams" :items="queryItems" @search="onSearch" />
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:dict:add']"
          type="primary"
          icon="el-icon-plus"
          size="mini"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:dict:edit']"
          type="success"
          icon="el-icon-edit"
          size="mini"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:dict:remove']"
          type="danger"
          icon="el-icon-delete"
          size="mini"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:dict:export']"
          type="warning"
          icon="el-icon-download"
          size="mini"
        >导出
        </el-button>
      </el-col>
    </el-row>
    <base-table
      :loading="listLoading"
      :data="list"
      :columns="columns"
    >
      <template slot="operation" slot-scope="scope">
        <el-button
          size="mini"
          type="text"
          icon="el-icon-edit"
          @click="onEdit({id: scope.row.id})"
        >编辑
        </el-button>
        <el-button
          v-hasPermi="['system:role:remove']"
          size="mini"
          type="text"
          icon="el-icon-delete"
          @click="onDelete({articleId: scope.row.id})"
        >删除
        </el-button>
      </template>
    </base-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <base-dialog
      :visible.sync="visible"
      :loading="loading"
      title="添加"
      @cancel="visible = false"
      @ok="handleOk"
    >
      <base-form ref="baseForm" :params="form" :items="formItem">
        <template slot="custom">
          <p>custom 自定义</p>
        </template>
      </base-form>
    </base-dialog>
  </div>
</template>

<script>
import { postAction, putAction, getAction, action } from '@/api'

const columns = [
  { label: '标题', prop: 'title' },
  { label: '发布时间', prop: 'publishDate' },
  { label: '修改时间', prop: 'lastUpdateTime' },
  {
    prop: 'operation', width: '220', label: '操作'
  }
]
const queryItems = [
  { type: 'input', label: '标题', prop: 'title' }
]
export default {
  name: 'Article',
  data() {
    return {
      // 搜索条件
      queryItems,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: null
      },
      columns,
      list: [],
      listLoading: false,
      total: 0,
      visible: false,
      loading: false,
      form: {
        text: ''
      },
      formItem: [],
      url: {
        list: '/article/article/list',
        add: '/article/article/add',
        delete: '/article/article/delete',
        edit: '/article/article/info',
        update: '/article/article/update',
        type: '/article/tag/list'
      },
      options: {
        type: []
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.getList()
      await getAction(this.url.type).then((res) => {
        const { result } = res
        // this.formItem[0].option = result.slice(1, result.length)
        this.options.type = result.slice(1, result.length)
      })
      this.formItem = [
        {
          type: 'select',
          label: '类型',
          prop: 'type',
          config: {
            valueKey: 'id',
            labelKey: 'title',
            props: {
              multiple: true
            },
            on: {
              change: this.onChange
            }
          },
          option: this.options.type
        },
        { label: '自定义', prop: 'custom' },
        { label: '自定义2', prop: 'custom2', render: () => <div onClick={this.onChange}>自定义2</div> },
        { type: 'input', label: '标题', prop: 'title', rules: [{ required: true, message: '请输入标题' }] },
        {
          type: 'datePicker', label: '发布时间', prop: 'publishDate',
          config: {
            type: 'date',
            format: 'yyyy-MM-dd'
          }
        },
        {
          type: 'checkbox', label: '资源2', prop: 'checkbox1',
          option: [
            { label: '1', text: 'checkbox' },
            { label: '2', text: 'checkbox2' }
          ]
        },
        {
          label: '资源', prop: 'resource', type: 'radio',
          config: {},
          option: [{ label: '1', text: '线上品牌商赞助' }, { label: '2', text: '线下场地免费' }]
        },
        { type: 'pic', label: '文章封面', prop: 'coverImgUrl' },
        { type: 'ueditor', label: '发布内容', prop: 'text' }
      ]
    },
    getList() {
      this.listLoading = true
      action(this.url.list, this.queryParams)
        .then((response) => {
          const { result } = response
          this.list = result.records
          this.total = result.total
        })
        .catch(() => {
          this.list = []
        })
        .finally(() => (this.listLoading = false))
    },
    onChange() {
      console.log('1')
    },
    onSearch() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    onDelete() {
      this.$confirm('是否要进行该删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      })
    },
    onEdit(params) {
      getAction(`${this.url.edit}/${params.id}`, params).then((res) => {
        res.result.checkbox1 = ['1']
        res.result.resource = '1'
        this.form = res.result
        this.form.type = this.form.type ? this.form.type.split(',') : []
        for (let i = 0, len = this.form.type.length; i < len; i += 1) {
          this.form.type[i] = Number(this.form.type[i])
        }
        this.visible = true
      })
    },
    handleOk() {
      this.$refs.baseForm.validate((valid) => {
        if (valid) {
          this.loading = true
          const params = JSON.parse(JSON.stringify(this.form))
          params.type = params.type.join(',')
          if (this.form.id !== undefined) { // 修改
            putAction(this.url.update, params).then(() => {
              this.msgSuccess('修改成功!')
              this.getList()
              this.visible = false
            }).finally(() => (this.loading = false))
          } else { // 添加
            postAction(this.url.add, params).then(() => {
              this.msgSuccess('添加成功!')
              this.getList()
              this.visible = false
            }).finally(() => (this.loading = false))
          }
        } else {
          return false
        }
      })
    },
    handleCancel() {
      this.visible = false
    }
  }
}
</script>

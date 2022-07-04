
<script>
import createForm from '../createForm'
export default {
  name: 'BaseSearch',
  mixins: [createForm],
  props: {
    params: {
      type: Object,
      default() {
        return {}
      }
    },
    items: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      defaultParams: {}
    }
  },
  mounted() {
    this.defaultParams = JSON.parse(JSON.stringify(this.params))
  },
  methods: {
    handleReset() {
      for (const key in this.defaultParams) {
        this.params[key] = this.defaultParams[key]
      }
      this.$listeners.search()
    }
  },
  render(h) {
    const { form, $listeners } = this
    this.$attrs.inline = true
    return <el-card class={['filter-container']}>

      {form(h)}
      <el-row type='flex' justify='space-between' { ...{ style: { marginBottom: '10px' }} }>
        <el-col {...{ style: { textAlign: 'right' }}}>
          <el-button {...{
            props: {
              type: 'primary',
              size: 'mini',
              icon: 'el-icon-search' },
            on: { click: $listeners.search }
          }}>
            搜索
          </el-button>
          <el-button {...{
            props: { size: 'mini', icon: 'el-icon-refresh' },
            on: { click: this.handleReset }
          }}>
            重置
          </el-button>
        </el-col>
      </el-row>
    </el-card>
  }
}
</script>

<style scoped>
.filter-container{
  margin-bottom: 10px;
}
</style>

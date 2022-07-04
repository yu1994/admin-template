
<script>
export default {
  name: 'BaseDialog',
  data() {
    return {
      loading: false
    }
  },
  render(h) {
    const { $attrs, $listeners, $slots } = this
    const attrs = {
      props: { ...$attrs },
      on: { ...$listeners },
      scopedSlots: {
        default: scope => {
          return $slots.default
        },
        title: scope => {
          return $slots.title
        },
        footer: scope => {
          const defaultFooter = (<span slot='footer' className={'dialog-footer'}>
            <el-button {...{ on: { click: $listeners.cancel }}}>取消</el-button>
            <el-button type='primary' {...{ props: { loading: $attrs.loading }, on: { click: $listeners.ok }}}>
          确定
            </el-button>
          </span>)
          return $slots.footer || defaultFooter
        }
      }
    }

    return <el-dialog {...attrs}>
      <div slot='footer'/>
    </el-dialog>
  }
}
</script>

<style scoped>

</style>

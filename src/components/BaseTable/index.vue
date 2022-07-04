
<script>
export default {
  name: 'BaseTable',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    }
  },
  render(h) {
    const { data, columns, $attrs, $listeners, $scopedSlots } = this
    const { loading } = $attrs
    const tableAttrs = {
      props: { ...$attrs },
      on: { ...$listeners }
    }
    const table = <el-table
      v-loading={loading}
      {...tableAttrs}
      data={data}>
      {
        columns.map((col) => {
          const colAttrs = {
            props: { align: 'center', ...col },
            scopedSlots: {
              default: scope => {
                const hasRender = col.hasOwnProperty('render')
                if (hasRender) {
                  return col.render(h, scope)
                }
                const customRender = $scopedSlots[col.prop]
                if (customRender) {
                  return customRender(scope)
                }
                return scope.row[col.prop] ? scope.row[col.prop] : '---'
              }
            }
          }
          return <el-table-column {...colAttrs}/>
        })
      }
    </el-table>
    return <div>
      {table}
    </div>
  }
}
</script>

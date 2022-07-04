export default {
  name: 'packButton',
    data() {
    return {
      types: {
        add: {
          icon: 'el-icon-plus',
          type: 'primary'
        },
        confirm: {
          icon: 'el-icon-check',
          type: 'primary'
        },
        edit: {
          icon: 'el-icon-edit',
          type: 'success'
        },
        delete: {
          icon: 'el-icon-delete',
          type: 'danger'
        },
        import: {
          icon: 'el-icon-upload2',
          type: 'info'
        },
        export: {
          icon: 'el-icon-download',
          type: 'warning'
        }
      }
    }
  },
  render() {
    return (<el-button
      size="mini"
      icon={this.types[this.$attrs.type === 'text'? this.$attrs.icon : this.$attrs.type].icon}
      onClick={this.$listeners.click}
      disabled={ this.$attrs.diabled }
      loading={this.$attrs.loading}
      type={this.$attrs.type === 'text' ? 'text': this.types[this.$attrs.type].type}>
      {this.$slots.default}</el-button>)
  },
  methods: {}
}

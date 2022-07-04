
<script>
import createForm from '../createForm'

export default {
  name: 'BaseForm',
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
  methods: {
    validate(callback) {
      this.$refs.form.validate(callback)
    }
  },
  render(h) {
    const { form } = this
    const { labelWidth, labelPosition } = this.$attrs
    this.$attrs.labelWidth = labelWidth || '100px'
    this.$attrs.labelPosition = labelPosition || 'left'
    return <div class={'form-container'}>
      {form(h)}
    </div>
  }
}
</script>
<style scoped>
/*.form-container{*/
/*  max-width: 460px;*/
/*}*/
</style>

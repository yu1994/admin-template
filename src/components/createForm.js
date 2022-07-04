import SingleUpload from '@/components/Upload/singleUpload'
import VueUeditorWrap from 'vue-ueditor-wrap'

export default {
  components: { SingleUpload, VueUeditorWrap },
  data() {
    return {
      editorConfig: {
        // 访问 UEditor 静态资源的根路径，可参考 https://hc199421.gitee.io/vue-ueditor-wrap/#/faq
        UEDITOR_HOME_URL: '/UEditor/',
        // 服务端接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        // serverUrl: '//ueditor.szcloudplus.com/cos',
        // serverUrl: process.env.VUE_APP_BASE_API + '/common/upload',
        // serverUrl: 'http://192.168.101.145:7070/yjs/config',
        serverUrl: '/dev-api/config',
        // serverUrl: '/dev-api/common/upload',
        initialFrameHeight: 600,
        toolbars: [[
          'fullscreen', 'source', '|', 'undo', 'redo', '|',
          'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
          'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
          'directionalityltr', 'directionalityrtl', 'indent', '|',
          'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
          'link', 'unlink', '|',
          'simpleupload', 'insertimage', 'insertvideo', 'attachment', 'pagebreak', 'template', '|',
          'horizontal', 'spechars', 'wordimage', '|',
          'preview', 'searchreplace'
        ]],
        section: ['class', 'style'],
        zIndex: 9000
      },
      editorDependencies: [
        'ueditor.config.js',
        'ueditor.all.min.js',
        // 添加秀米相关的资源
        'xiumi/xiumi-ue-dialog-v5.js',
        'xiumi/xiumi-ue-v5.css'
      ]
    }
  },
  methods: {
    renderType(row) {
      const { params } = this
      const { config = { valueKey: 'id', labelKey: 'label' }} = row
      const defaultAttrs = {
        props: {
          value: params[row.prop],
          ...config.props
        },
        attrs: {
          ...config.attrs
        },
        on: {
          input(value) {
            params[row.prop] = value
          },
          ...config.on
        }
      }
      const types = {
        input: () => {
          const { props, attrs } = defaultAttrs
          const { clearable } = props
          const { placeholder } = attrs
          props.clearable = clearable === undefined ? true : clearable
          attrs.placeholder = placeholder === undefined ? `请输入${row.label}` : placeholder
          return <el-input {...defaultAttrs}/>
        },
        select: () => {
          const { attrs, on } = defaultAttrs
          const { placeholder } = attrs
          attrs.placeholder = placeholder === undefined ? '请选择' : placeholder
          if (!on.change) {
            on.change = function(value) {
              params[row.prop] = value
            }
          }
          return <el-select {...defaultAttrs}>
            {row.option && row.option.map((item, index) => {
              return <el-option
                key={index}
                value={item[config.valueKey]}
                label={item[config.labelKey]}
                disabled={item.disabled}/>
            })}
          </el-select>
        },
        datePicker: () => {
          /*
          * type 类型 year/month/date/week/ datetime/datetimerange/daterange
          * 默认 date
          * 日期格式 format: yyyy-MM-dd HH:mm:ss
          * */
          const { attrs } = defaultAttrs
          const { startPlaceholder, endPlaceholder } = attrs
          attrs.startPlaceholder = startPlaceholder === undefined ? '开始日期' : startPlaceholder
          attrs.endPlaceholder = endPlaceholder === undefined ? '结束日期' : endPlaceholder
          return <el-date-picker {...defaultAttrs}/>
        },
        radio: () => {
          return <el-radio-group {...defaultAttrs}>
            {row.option && row.option.map((item, index) => {
              return <el-radio key={index} {...{ props: { ...item }, attrs: { ...item }, on: { ...item }}}>
                {item.text}
              </el-radio>
            })}
          </el-radio-group>
        },
        checkbox: () => {
          return <el-checkbox-group {...defaultAttrs}>
            {row.option && row.option.map((item, index) => {
              return <el-checkbox key={item.label} {...{ props: { ...item }, attrs: { ...item }, on: { ...item }}}>
                {item.text}
              </el-checkbox >
            })}
          </el-checkbox-group>
        },
        pic: () => {
          const onInput = (value) => {
            params[row.prop] = value
          }
          return <SingleUpload value={params[row.prop]} onInput={onInput}/>
        },
        ueditor: () => {
          const onInput = (value) => {
            params[row.prop] = value
          }
          return <vue-ueditor-wrap
            value={params[row.prop]}
            onInput={onInput}
            config={this.editorConfig}
            editor-dependencies={this.editorDependencies}
            editor-id='editor-demo-01'
          />
        }
      }
      return types[row.type]()
    },
    form(h) {
      const { items, params,
        $listeners, $attrs, $slots } = this
      const attrs = {
        props: {
          model: params,
          ...$attrs
        },
        ref: 'form',
        on: { ...$listeners }
      }
      return <el-form {...attrs}>
        {
          items.map((item, index) => {
            const obj = {
              props: {
                ...item
              },
              scopedSlots: {
                default: scope => {
                  const hasRender = item.hasOwnProperty('render')
                  if (hasRender) {
                    return item.render(h, scope)
                  }
                  const customRender = $slots[item.prop]
                  return customRender || this.renderType(item)
                }
              }
            }
            return <el-form-item key={index} {...obj}/>
          })
        }
      </el-form>
    }
  }
}

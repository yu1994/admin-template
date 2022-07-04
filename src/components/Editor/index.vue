<template>
  <div>
    <!-- 图片上传组件辅助 -->
    <el-upload
      class="avatar-uploader quill-img"
      :action="uploadImgUrl"
      name="file"
      :headers="headers"
      :show-file-list="false"
      :on-success="quillImgSuccess"
      :on-error="uploadError"
      :before-upload="quillImgBefore"
      accept=".jpg,.jpeg,.png,.gif"
    />

    <!-- 富文本组件 -->
    <quill-editor
      ref="quillEditor"
      v-model="content"
      class="editor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    />
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
  ['blockquote', 'code-block'], // 引用  代码块
  // [
  //   { table: 'TD' },
  //   { 'table-insert-row': 'TIR' },
  //   { 'table-insert-column': 'TIC' },
  //   { 'table-delete-row': 'TDR' },
  //   { 'table-delete-column': 'TDC' }
  // ],
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
  [{ indent: '-1' }, { indent: '+1' }], // 缩进
  [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ align: [] }], // 对齐方式
  ['clean'], // 清除文本格式
  ['link', 'image', 'video'] // 链接、图片、视频
]

import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: 'Edit',
  components: { quillEditor },
  props: {
    /* 编辑器的内容 */
    value: {

    },
    /* 图片大小 */
    maxSize: {
      type: Number,
      default: 4000 // kb
    }
  },
  data() {
    return {
      content: this.value,
      editorOption: {
        theme: 'snow', // or 'bubble'
        placeholder: '请输入内容',
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: function(value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector('.quill-img input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
              // table: function (val) {
              //   this.quill.getModule('table').insertTable(2, 3)
              // },
              // 'table-insert-row': function () {
              //   this.quill.getModule('table').insertRowBelow()
              // },
              // 'table-insert-column': function () {
              //   this.quill.getModule('table').insertColumnRight()
              // },
              // 'table-delete-row': function () {
              //   this.quill.getModule('table').deleteRow()
              // },
              // 'table-delete-column': function () {
              //   this.quill.getModule('table').deleteColumn()
              // }
            }
          }
          // table: true
        }
      },
      uploadImgUrl: process.env.VUE_APP_BASE_API + '/common/upload', // 上传的图片服务器地址
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    }
  },
  watch: {
    value: function() {
      this.content = this.value
    }
  },
  // mounted() {
  //   this.$el.querySelector(
  //     '.ql-table-insert-row'
  //   ).innerHTML = `<svg t="1591862376726" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6306" width="18" height="200"><path d="M500.8 604.779L267.307 371.392l-45.227 45.27 278.741 278.613L779.307 416.66l-45.248-45.248z" p-id="6307"></path></svg>`
  //   this.$el.querySelector(
  //     '.ql-table-insert-column'
  //   ).innerHTML = `<svg t="1591862238963" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6509" width="18" height="200"><path d="M593.450667 512.128L360.064 278.613333l45.290667-45.226666 278.613333 278.762666L405.333333 790.613333l-45.226666-45.269333z" p-id="6510"></path></svg>`
  //   this.$el.querySelector(
  //     '.ql-table-delete-row'
  //   ).innerHTML = `<svg t="1591862253524" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6632" width="18" height="200"><path d="M500.8 461.909333L267.306667 695.296l-45.226667-45.269333 278.741333-278.613334L779.306667 650.026667l-45.248 45.226666z" p-id="6633"></path></svg>`
  //   this.$el.querySelector(
  //     '.ql-table-delete-column'
  //   ).innerHTML = `<svg t="1591862261059" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6755" width="18" height="200"><path d="M641.28 278.613333l-45.226667-45.226666-278.634666 278.762666 278.613333 278.485334 45.248-45.269334-233.365333-233.237333z" p-id="6756"></path></svg>`
  // },
  methods: {
    onEditorBlur() {
      // 失去焦点事件
    },
    onEditorFocus() {
      // 获得焦点事件
    },
    onEditorChange() {
      // 内容改变事件
      this.$emit('input', this.content)
    },

    // 富文本图片上传前
    quillImgBefore(file) {
      const fileType = file.type
      if (fileType === 'image/jpeg' || fileType === 'image/png') {
        return true
      } else {
        this.$message.error('请插入图片类型文件(jpg/jpeg/png)')
        return false
      }
    },

    quillImgSuccess(res, file) {
      console.log(res)
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      const quill = this.$refs.quillEditor.quill
      console.log(quill)
      // 如果上传成功
      if (res.code === 200) {
        console.log(quill.getSelection())
        // 获取光标所在位置
        const length = quill.getSelection().index
        // 插入图片  res.url为服务器返回的图片地址
        const hostname = location.hostname
        const env = process.env.NODE_ENV === 'production'
        const url = env ? `${location.protocol}//${hostname}/yjs${res.result.route}` : res.result.url
        quill.insertEmbed(length, 'image', url)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        this.$message.error('图片插入失败')
      }
    },
    // 富文本图片上传失败
    uploadError() {
      // loading动画消失
      this.$message.error('图片插入失败')
    }
  }
}
</script>

<style>
.editor {
  line-height: normal !important;
  min-height: 192px;
}
.ql-editor{
  min-height: 192px;
}
.quill-img {
  display: none;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
.ql-editor .ql-indent-1:not(.ql-direction-rtl) {
  padding-left: 0;
  text-indent: 2em;
}
</style>

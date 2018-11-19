<template lang="pug">
.example-simple
  .upload
    ul
      li(v-for='(file, index) in files', :key='file.id')
        span {{file.name}}
        |  -
        span {{file.size | formatSize}}
        |  -
        span(v-if='file.error') {{file.error}}
        span(v-else-if='file.success') success
        span(v-else-if='file.active') active
        span(v-else-if='file.active') active
        span(v-else='')
    .example-btn
      file-upload.btn.btn-primary(:custom-action="uploadImages", :extensions="config.extensions", :accept="config.accept", :multiple="config.multiple", :size="config.size", v-model='files', @input-filter='inputFilter', @input-file='inputFile', ref='upload')
        i.fa.fa-plus
        |           Select files
      button.btn.btn-success(type='button', v-if='!$refs.upload || !$refs.upload.active', @click.prevent='$refs.upload.active = true')
        i.fa.fa-arrow-up(aria-hidden='true')
        |           Start Upload
      button.btn.btn-danger(type='button', v-else='', @click.prevent='$refs.upload.active = false')
        i.fa.fa-stop(aria-hidden='true')
        |           Stop Upload
</template>
<script>
import FileUpload from 'vue-upload-component'
import * as constants from '@/constants'
import auth from '@/auth/helpers'

export default {
  name: 'Pictures',
  components: {
    FileUpload
  },
  data () {
    return {
      files: [],
      config: {
        postAction: constants.API_BASE_URL + '/upload/images',
        extensions: 'gif,jpg,jpeg,png,webp',
        accept: 'image/png,image/gif,image/jpeg,image/webp',
        multiple: true,
        size: '1024 * 1024 * 10'
      }
    }
  },
  methods: {
    inputFilter (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Before adding a file
        // Filter system files or hide files
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent()
        }
        // Filter php html js file
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent()
        }
      }
    },
    inputFile (newFile, oldFile) {
      if (newFile && !oldFile) {
        // add
        console.log('add', newFile)
      }
      if (newFile && oldFile) {
        // update
        console.log('update', newFile)
      }
      if (!newFile && oldFile) {
        // remove
        console.log('remove', oldFile)
      }
    },
    uploadImages (file, component) {
      let formData = new FormData()
      console.log(this.files)
      formData.append('file', file.file)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      auth.post('/upload/images', formData, config)
        .then((data) => {
          alert('here')
        })
    }
  }
}
</script>

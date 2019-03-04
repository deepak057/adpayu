import Service from './service'

export default {
  service: new Service(),
  data () {
    return {
      uploadPercentage: 0,
      getAcceptedVideoFormats: ['video/ogg', 'video/mp4', 'video/webm', 'video/webm', 'application/x-mpegURL', 'video/x-flv', 'video/3gp', 'video/3gpp', 'video/x-matroska', 'video/*']
    }
  },
  methods: {
    validateVideo (files) {
      let valid = true
      if (this.getAcceptedVideoFormats.indexOf(files[0]['type']) === -1) {
        valid = false
      }
      return valid
    },
    videoAcceptString () {
      let v = this.getAcceptedVideoFormats
      // v.push('video/*')
      return v.join(',')
    },
    triggerVideoSelect () {
      document.getElementById(this.elementId).click()
    },
    filesChange (event, files) {
      if (files.length && this.validateVideo(files)) {
        this.uploadVideo(files)
      } else {
        alert('Please choose a valid video file')
      }
    },
    uploadVideo (files) {
      let formData = new FormData()
      formData.append('video', files[0])
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: function (progressEvent) {
          this.uploadPercentage = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
        }.bind(this)
      }
      this.$options.service.uploadVideo(formData, config)
        .then((data) => {
          this.path = data.path
          this.$emit('videoUploaded', this.path)
        })
        .catch((errVideo) => {
          alert('Something went wrong while uploading the video')
        })
    },
    getFileUploadProgressText () {
      if (this.uploadPercentage < 100) {
        return 'Uploading video...' + this.uploadPercentage + '%'
      } else {
        return 'Video uploaded'
      }
    },
    reset () {
      this.uploadPercentage = 0
    }
  }
}

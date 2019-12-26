import auth from '@/auth/helpers'
export default {
  methods: {
    getVideoSrcURL (videoObj) {
      if ('pickLocalVideoSrc' in videoObj && videoObj.pickLocalVideoSrc && auth.getLocalVideoURL()) {
        return auth.getLocalVideoURL()
      }
      return this.getVideoURL(videoObj)
    }
  }
}

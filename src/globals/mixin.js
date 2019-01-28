import * as constants from '@/constants'

export default {
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    date: function (MySqlDate) {
      let date = new Date(MySqlDate)
      let strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return date.getDate() + ' ' + strArray[date.getMonth()] + ' ' + date.getFullYear()
    }
  },
  methods: {
    getMedia (path) {
      return path && path !== 'null' ? constants.SERVER_STATIC_CONTENT_URL + '/' + path : 'static/img/no-profile-pic.png'
    },
    userProfileLink (uid) {
      return '/profile/' + (uid || '')
    },
    userName (user) {
      return this.titleCase(user.first + ' ' + user.last)
    },
    titleCase (str) {
      let splitStr = str.toLowerCase().split(' ')
      for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
      }
      return splitStr.join(' ')
    },
    validImageFile (file) {
      let validImageTypes = ['image/gif', 'image/jpeg', 'image/png']
      return validImageTypes.indexOf(file['type']) !== -1
    },
    getPostLink (postId) {
      return '/p/' + postId
    },
    leavePage () {
      this.$emit('closeModal')
    },
    getPostTypeLabel (postType) {
      return postType === 'text' ? 'status' : postType
    },
    setDocumentTitle (title_) {
      var t_ = title_ || this.getTitle()
      document.title = t_.charAt(0).toUpperCase() + t_.slice(1)
    },
    getTagLink (tag) {
      return '/tag/' + tag
    },
    scrollToTop () {
      window.scrollTo(0, 0)
    },
    getUniqueId () {
      return (new Date()).getTime()
    },
    getDomainName () {
      return window.location.hostname
    },
    isEmptyObject (obj) {
      return Object.keys(obj).length === 0 && obj.constructor === Object
    }
  }
}

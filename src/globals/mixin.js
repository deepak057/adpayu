import * as constants from '@/constants'

export default {
  data () {
    return {
      siteName: constants.SITE_NAME
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    date: function (MySqlDate) {
      let date = new Date(MySqlDate)
      let strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return date.getDate() + ' ' + strArray[date.getMonth()] + ', ' + date.getFullYear()
    }
  },
  methods: {
    capitalizeString (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
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
      if (obj === null || typeof obj !== 'object') {
        return true
      }
      return Object.keys(obj).length === 0 && obj.constructor === Object
    },
    ValidURL (str) {
      /* eslint-disable */
      let pattern = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g

      return pattern.test(str)
      /* eslint-enable */
    },
    getLink (url) {
      if (!/^https?:\/\//i.test(url)) {
        url = 'http://' + url
      }
      return url
    },
    isNumber (evt) {
      evt = evt || window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    getRandomNumber (min = 1000, max = 999999) {
      return Math.round(Math.random() * (+max - +min) + +min)
    },
    getBaseURL () {
      return window.location.origin
    },
    showNotification (content, classType, duration = 3000) {
      this.$notify({
        group: 'appNotifications',
        clean: true
      })
      this.$notify({
        group: 'appNotifications',
        title: '',
        text: content,
        type: classType,
        duration: duration
      })
    },
    roundToDecimalPlaces (number) {
      return Math.round(number * 100) / 100
    },
    closeAllModals () {
      // A hackw way that uses jQuery directly to
      // close all the Bootstrap modals
      /* eslint-disable */
      $('.modal').modal('hide')
      /* eslint-enable */
    },
    videoPlayerOptions (path) {
      return {
        sources: this.getVideoSources(path),
        responsive: true,
        dataSetup: {'fluid': true},
        aspectRatio: '16:9'

      }
    },
    getVideoSources (path) {
      let that = this
      return [
        {
          src: that.getMedia(path)
        }
      ]
    },
    getCommentLink (commentId) {
      return '/c/' + commentId
    },
    getPostTitle (postObj) {
      if ('Question' in postObj && postObj.Question) {
        return postObj.Question.question
      }
      if ('Video' in postObj && postObj.Video) {
        return postObj.Video.title
      }
      if ('content' in postObj && postObj.content) {
        if (postObj.content.length > 100) {
          return postObj.content.substring(0, 100) + '...'
        } else {
          return postObj.content
        }
      }
      return ''
    },
    checkIfScriptExists (scriptSrc) {
      let scripts = document.getElementsByTagName('script')
      for (var i = scripts.length; i--;) {
        if (scripts[i].src === scriptSrc) {
          return true
        }
      }
      return false
    },
    loadScript (scriptSrc) {
      if (!this.checkIfScriptExists(scriptSrc)) {
        const plugin = document.createElement('script')
        plugin.setAttribute('src', scriptSrc)
        plugin.async = false
        document.head.appendChild(plugin)
      }
    },
    getCurrentYear () {
      return (new Date()).getFullYear()
    },
    getPageURL (page) {
      return '/pages/' + page
    }
  }
}

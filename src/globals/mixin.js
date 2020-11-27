import * as constants from '@/constants'
import auth from '@/auth/helpers'
import store from '@/store'
import { router } from '@/http'

export default {
  data () {
    return {
      siteName: constants.SITE_NAME,
      defaultCurrency: 'USD'
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
  created () {
    /*
    * A work-around to prevent user from accessing the
    * pages that are not supposed to be accessd after login
    * This temporary solution is used as the standard way of
    * protecting the routes through router.js didn't seem to be working
    */
    this.toHome()
  },
  methods: {
    isLoggedIn () {
      return store.state.auth.isLoggedIn
    },
    getElementPosition (elem) {
      let return_ = {
        left: 0,
        top: 0
      }
      if (elem) {
        let rect = elem.getBoundingClientRect()
        // let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
        // let scrollTop = window.pageYOffset || document.documentElement.scrollTop
        return_.top = rect.top
        return_.left = rect.left
      }
      return return_
    },
    getUserCurrency (user = false) {
      user = user || auth.getUser()
      return user.location && user.location === 'IN' ? 'INR' : this.defaultCurrency
    },
    getUserCurrencySymbol () {
      return this.getCurrencySymbol(this.getUserCurrency())
    },
    getCurrencySymbol (currency) {
      return currency === 'INR' ? '&#x20B9;' : '$'
    },
    showAmount (USDAmount, user = false, spacing = false, round = false) {
      user = user || auth.getUser()
      let defaultCurrency = this.getUserCurrency(user)
      let space = spacing ? ' ' : ''
      return defaultCurrency === 'INR' ? this.getCurrencySymbol('INR') + space + this.formatNumber(USDAmount * auth.getForex(), round) : this.getCurrencySymbol('USD') + space + (spacing ? USDAmount : this.formatNumber(USDAmount, round))
    },
    formatNumber (labelValue, round = false) {
      if (!labelValue) {
        return 0
      }
      if (round) {
        labelValue = Math.round(labelValue)
      }
      // Nine Zeroes for Billions
      return Math.abs(Number(labelValue)) >= 1.0e+9
        ? this.roundToDecimalPlaces(Math.abs(Number(labelValue)) / 1.0e+9) + 'B'
        // Six Zeroes for Millions
        : Math.abs(Number(labelValue)) >= 1.0e+6
          ? this.roundToDecimalPlaces(Math.abs(Number(labelValue)) / 1.0e+6) + 'M'
          // Three Zeroes for Thousands
          : Math.abs(Number(labelValue)) >= 1.0e+3
            ? this.roundToDecimalPlaces(Math.abs(Number(labelValue)) / 1.0e+3) + 'K'
            : this.roundToDecimalPlaces(Math.abs(Number(labelValue)))
    },
    isVisible (elem) {
      return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length)
    },
    getLastComment (f) {
      // return f.Comments && f.Comments.length ? f.Comments[f.Comments.length - 1] : false
      return f && 'defaultComment' in f ? f.defaultComment : false
    },
    isAdmin () {
      return store.state.auth.user.isAdmin
    },
    postAnswerPageLink () {
      return '/search/questions?k=&uncommented=true'
    },
    capitalizeString (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    getStaticContentURL (cdn = true) {
      return cdn ? constants.SERVER_STATIC_CONTENT_URL : constants.SERVER_STATIC_CONTENT_URL_NO_CDN
    },
    copyObject (obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    getMedia (path, mediaType = false) {
      if (path && path !== 'null') {
        let base = this.getStaticContentURL() + '/'
        if (mediaType && mediaType === 'videoPoster') {
          // replace the extension of given video file with ".png"
          return base + 'thumbs/' + path.substr(0, path.lastIndexOf('.')) + '.png'
        } else {
          return base + path
        }
      } else {
        return 'static/img/no-profile-pic.png'
      }
    },
    getUserProfileImage (path = false, defaultPic = 'white') {
      let staticPath = 'static/img/'
      return path ? this.getMedia(path) : staticPath + (defaultPic === 'white' ? 'no-profile-pic-white-thumb.png' : 'no-profile-pic.png')
    },
    userProfileLink (uid) {
      return '/profile/' + (uid || '')
    },
    userName (user, trim = true) {
      let n = this.titleCase(user.first + ' ' + user.last)
      return trim && n.length > 17 ? n.substring(0, 14) + '...' : n
    },
    titleCase (str) {
      let splitStr = str.toLowerCase().split(' ')
      for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
      }
      return splitStr.join(' ')
    },
    validImageFile (file) {
      let validImageTypes = this.getValidImageTypes()
      return validImageTypes.indexOf(file['type']) !== -1
    },
    getPublicContentBaseURL () {
      return this.getDomainName() + '/content'
    },
    getPostLink (postId, publicLink = false) {
      return !publicLink ? '/p/' + postId : this.getPublicContentBaseURL() + '/post/' + postId
    },
    leavePage () {
      this.$emit('closeModal')
    },
    getPostTypeLabel (postType) {
      return postType === 'text' ? 'status' : postType
    },
    setDocumentTitle (title_) {
      var t_ = title_ || constants.SITE_NAME
      document.title = this.capitalizeString(t_)
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
      // return window.location.hostname
      let url = window.location.href
      let arr = url.split('/')
      return arr[0] + '//' + arr[2]
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
    toHome () {
      if (store.state.auth.isLoggedIn) {
        let restrictedPages = ['login', 'signup', 'passwordReset', 'changePassword']
        let toName = 'dashboard'
        if (restrictedPages.indexOf(this.$route.name) !== -1 && this.getRedirectPath() === toName) {
          router.push({name: toName})
        }
      }
    },
    showNotification (content, classType, duration = 3000, options = {}, group = 'appNotifications') {
      this.$notify({
        group: group,
        clean: true
      })
      let config = {
        group: group,
        text: content,
        type: classType,
        duration: duration
      }
      this.$notify(Object.assign(config, options))
    },
    roundToDecimalPlaces (number) {
      return Math.round(number * 100) / 100
    },
    closeAllModals () {
      // A hacky way that uses jQuery directly to
      // close all the Bootstrap modals
      /* eslint-disable */
      $('.modal').modal('hide')
      $('.modal-backdrop').remove()
      this.closeReactions()
      
      /* eslint-enable */
    },
    closeReactions () {
      // A hacky way that uses jQuery directly to
      // close all the Reactions popups
      /* eslint-disable */
      if ($('.reaction-popup').length) {
        $('.reaction-popup').remove()
      }
      /* eslint-enable */
    },
    audioURL (trackObj) {
      return this.getStaticContentURL() + '/audio/' + trackObj.path
    },
    getVideoPoster (videoObj) {
      let path = this.getVideoPath(videoObj)
      return this.getMedia(path, 'videoPoster')
    },
    videoPlayerOptions (videoObj) {
      let r = {
        sources: this.getVideoSources(videoObj),
        responsive: true,
        poster: this.getVideoPoster(videoObj),
        dataSetup: {'fluid': true},
        aspectRatio: '16:9',
        preload: 'none'
      }
      /* eslint-disable*/
      /*
      let agent = navigator.userAgent
      let isIphone = ((agent.indexOf('iPhone') != -1) || (agent.indexOf('iPad') != -1) || (agent.indexOf('iPod') != -1) || (agent.indexOf('Mac') != -1))
      if (isIphone) {
        r.autoplay = true
        //r.preload = 'auto'
      }
      /* eslint-enable */
      return r
    },
    getVideoPath (videoObj) {
      return 'videoPath' in videoObj ? videoObj.videoPath : videoObj.path
    },
    isVideoComment (commentObj) {
      return commentObj.videoPath || false
    },
    hasQueryString (path) {
      return path.indexOf('?') > -1
    },
    getIds (arr) {
      if (arr.length) {
        let returnArr =[]
        for (let i in arr) {
          returnArr.push(arr[i].id)
        }
        return returnArr
      }
      return arr
    },
    removeDuplicates (originalArr, newArr) {
      if (originalArr.length) {
        let uniquePosts = []
        let ids = this.getIds(originalArr)
        for (let i in newArr) {
          if (ids.indexOf(newArr[i].id) === -1) {
            uniquePosts.push(newArr[i])
          }
        }
        return uniquePosts
      }
      return newArr
    },
    getVideoURL (videoObj) {
      let path = this.getVideoPath(videoObj)
      let optimzed = 'optimized' in videoObj ? videoObj.optimized : videoObj.videoOptimized
      let baseURL = this.getStaticContentURL(!this.hasQueryString(path))
      let subDir = false
      if (optimzed) {
        if (this.isMobile()) {
          subDir = '360'
        } else {
          subDir = '480'
        }
      }
      return baseURL + '/' + (subDir ? subDir + '/' : '') + path
    },
    getCommentVideoPlayerClass (c) {
      return 'video-comment-' + c.id
    },
    getPostVideoPlayerClass (p) {
      return 'post-video-' + p.id
    },
    getVideoSources (videoObj) {
      let src = this.getVideoURL(videoObj)
      return [
        {
          src: src
        }
      ]
    },
    /* eslint-disable */
    pauseAllOtherVideos (currentPlayer = false) {
      if($(".video-js").length) {
        $(".video-js").each(function (index) {
          if (!currentPlayer || this.player.poster() !== currentPlayer.poster()) {
            // this.player.dispose()
            this.player.pause()
            /* reset the src of the video 
            * to stop the buffering in all
            * the previous videos
            */
            // this.player.src(this.player.currentSrc());
          }
        })
      }
    },
    /* eslint-disable */
    getCommentLink (commentId, publicLink = false) {
      return !publicLink ? '/c/' + commentId : this.getPublicContentBaseURL() + '/response/' + commentId
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
    isMobile () {
      return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
                    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))
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
    },
    getRedirectPath () {
      return this.$route.query.redirect || 'dashboard'
    },
    redirectURLs (action) {
      let base = '/' + action
      let path = this.getRedirectPath()
      if (path !== 'dashboard') {
        return base + '?redirect=' + path
      } else {
        return base
      }
    },
    adminURL (page) {
      return '/Pooja1957/' + page
    },
    /*
    * function to return the Page title for
    * public pages. It just ads the Site name
    * as prefix to the given page title
    */
    getPageTitle (title) {
      return constants.SITE_NAME + ' - ' + title
    },
    handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      let formData = new FormData()
      formData.append('image', file)
      auth.uploadImage(formData)
        .then((d) => {
          let url = this.getMedia(d.path)
          Editor.insertEmbed(cursorLocation, 'image', url)
          resetUploader()
        })
        .catch((iErr) => {
          this.showNotification('Something went wrong while trying to upload image. Please try again later')
        })
    },
    loadGoogleMapScript () {
      this.loadScript('https://maps.googleapis.com/maps/api/js?key=' + constants.GOOGLE_MAP_KEY + '&callback=initMap')
    },
    staticImageUrl (img) {
      return '/static/images/' + img
    },
    getAsset(path) {
      return '/static/assets/' + path
    },
    getValidImageTypes () {
      return ['image/gif', 'image/jpeg', 'image/png']
    },
    gimmick(expire = 4000, el = 'body', ) {
      let canvasId = 'gimmick'
      var exists = document.getElementById(canvasId)
      if (exists) {
          exists.parentNode.removeChild(exists);
          return false;
      }

      var element = document.querySelector(el);
      var canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d'),
          focused = false;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.id = canvasId

      var coin = new Image();
      coin.src = this.staticImageUrl('coins.png')
      // 440 wide, 40 high, 10 states

      let removeCanvas = () => {
        let can = document.getElementById(canvasId)
        if (can) {
          can.parentNode.removeChild(can)
          //can.remove()
        }
      }

      coin.onload = function () {
          element.appendChild(canvas)
          focused = true
          drawloop()
          setTimeout(() => {
            removeCanvas()
            focused = false
            //ctx = null
          }, expire)
      }
      /*let audio = document.createElement('AUDIO')
      audio.id = 'audiod'
      audio.loop = true
      audio.src = this.getAsset('audio/coins.mp3')
      element.appendChild(audio)
      document.getElementById('audiod').play()
      audio.onload = () => {

        //audio.play()
      }*/
      var coins = []
      var animationId = false
      function drawloop() {
          if (focused) {
              animationId = requestAnimationFrame(drawloop);
          } else {
            cancelAnimationFrame(animationId)
            removeCanvas()
          }
          ctx.beginPath()
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          if (Math.random() < .3) {
              coins.push({
                  x: Math.random() * canvas.width | 0,
                  y: -50,
                  dy: 3,
                  s: 0.5 + Math.random(),
                  state: Math.random() * 10 | 0
              })
          }
          var i = coins.length
          while (i--) {
              var x = coins[i].x
              var y = coins[i].y
              var s = coins[i].s
              var state = coins[i].state
              coins[i].state = (state > 9) ? 0 : state + 0.1
              coins[i].dy += 0.3
              coins[i].y += coins[i].dy
              ctx.drawImage(coin, 44 * Math.floor(state), 0, 44, 40, x, y, 44 * s, 40 * s)
              if (y > canvas.height) {
                  coins.splice(i, 1);
              }
          }
    }

}

  }
}

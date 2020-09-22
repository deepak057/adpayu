<template lang="pug">
div(v-if="triggered")
  span(:id="triggerButtonId" data-toggle="modal" data-backdrop="static" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-labelledby='AdStatsModalLabel', aria-hidden='true')
    .modal-dialog(:class="{'modal-lg': steps.step3.enable && steps.step3.ad.feed.length}")
      .modal-content
        .modal-header
          h4.modal-title
            | {{steps.modalTitle}}
            br
            small.text-muted
              | {{steps.modalSubTitle}}
          button.close(@click="closePopup" type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          <template v-if ="steps.step1.enable">
          <template v-if ="!steps.step1.loader">
          .text-center
            h3.bold.all-caps
              span(v-if="steps.step1.text1")
                | {{steps.step1.text1}}
              span(v-if="steps.step1.text2" v-html="showAmount(steps.step1.totalMoney)")
              | {{steps.step1.text2}}
            .m-t-5(v-if="steps.step1.enableImage")
              img.w-100.fadeIn(:src="staticImageUrl('money-banner.jpg')")
            h4.m-t-10.all-caps(v-if="steps.step1.text3")
              | {{steps.step1.text3}}
          </template>
            <template v-if ="steps.step1.loader">
            .text-center
              <preloader class="m-t-10"/>
            </template>
          </template>
          <template v-if ="steps.step2.enable">
          .text-center
            h3.bold.all-caps
              | {{steps.step2.text1}}
            .m-t-5(v-if="steps.step2.enableImage")
              img.w-100.fadeIn(:src="staticImageUrl('money-banner-3.jpg')")
            h4.m-t-10.all-caps(v-if="steps.step2.text2")
              | {{steps.step2.text2}}
          </template>
          .celebration-wrap(:class="{'fade-out': steps.celebration.fadeOut}" v-if="steps.celebration.enable")
            .text-wrap.text-center
              h2.text-danger.all-caps(:class="{'zoom-in shining-text': steps.celebration.text1}")
                | {{steps.celebration.text1}}
              h2.text-danger.all-caps(:class="{'zoom-in shining-text': steps.celebration.text1}" v-if="steps.celebration.text2")
                | {{steps.celebration.text2}}
                span.m-l-5(v-html="showAmount(steps.celebration.price)")
                span.m-l-5(v-if = "steps.celebration.text3")
                  | {{steps.celebration.text3}}
            .pyro
              .before
              .after
          <template v-if ="steps.step3.enable">
          h3.text-center
            | {{steps.step3.text1}}
          <template v-if="steps.step3.ad.tour.steps.step1.enable">
          .ad-tutorial-step-2(:class="{'none': !steps.step3.ad.tour.steps.step1.showArrow}")
            .text-center.ad-tutorial-step2-description.all-caps(:style = "steps.step3.ad.tour.steps.step1.descriptionPos" :id="steps.step3.ad.tour.steps.step1.descriptionWrapId" :class="{'none': !steps.step3.ad.tour.steps.step1.enable}")
              h2.text-danger.shining-text.ad-tutorial-pointer-text
                <template v-if="!steps.step3.ad.tour.steps.step1.adVideoPlayedText">
                | {{steps.step3.ad.tour.steps.step1.text1}}
                span.m-r-5.m-l-5(v-html="showAmount(steps.step3.ad.tour.steps.step1.price)")
                | {{steps.step3.ad.tour.steps.step1.text2}}
                </template>
                <template v-if="steps.step3.ad.tour.steps.step1.adVideoPlayedText">
                  | {{steps.step3.ad.tour.steps.step1.adVideoPlayedText}}
                </template>
            .ad-tutorial-arrow-pointer-wrap(:class = "{'none': steps.step3.ad.tour.steps.step1.adVideoPlayedText}" :id="steps.step3.ad.tour.steps.step1.arrowId" :style="steps.step3.ad.tour.steps.step1.arrowPos")
              i.mdi.mdi-arrow-down-bold.text-warning
          </template>
          .text-center.m-t-20(v-if="steps.step3.loader")
            <preloader />
          .m-t-20.ad-tutorial-feed-wrap(v-if="!steps.step3.loader && steps.step3.ad.feed && steps.step3.ad.feed.length")
            <feed @FeedVideoPlayed = "adVideoPlayed" @adConsumed="adConsumed" :feed = "steps.step3.ad.feed" :config="steps.step3.ad.feedConfig" :userFeed = "true"/>
          </template>
          <template v-if ="steps.step4.enable">
            .text-center
              h3.bold.all-caps(v-if="steps.step4.text1")
                | {{steps.step4.text1}}
                span.m-l-5(v-html="showAmount(getTotalMoney())")
              .m-t-20(:class="{'v-hidden': steps.celebration.enable}")
                img.h-150(:src="staticImageUrl('success.png')")
              p.m-t-10.all-caps.bold.text-warning(v-if="steps.step4.text2")
                | {{steps.step4.text2}}
              .m-t-20.m-b-20(v-if="steps.step4.enableButton")
                button.btn.btn-success.all-caps(data-dismiss='modal' @click = "triggerRevenueTutorial()")
                  | Withdraw your money
                span.badge.badge-warning.p-a.d-inline.m-l-5.pointer(v-if="steps.step1.cashBack && steps.step1.cashBack.KYC.enable" data-container="body" title="Win Cashback" data-toggle="popover" data-placement="right" data-html="true" :data-content="getCashBackInfoContent(steps.step1.cashBack.KYC.priceUSD)")
                  | +
                  span.m-l-5.m-r-5(v-html="showAmount(steps.step1.cashBack.KYC.priceUSD, false, true)")
                  i.mdi.mdi-information.m-l-4
                // button.btn.btn-secondary
                  | Close
          </template>
        .modal-footer(v-if="!steps.step3.enable && !steps.step4.enable")
          button.btn.btn-secondary(@click="closePopup" data-dismiss='modal' :id="closeButtonId")
            | No
          button.btn.btn-danger(type='button' @click="enableNextStep()")
            | Yes
</template>
<script>
import mixin from '../../../../globals/mixin'
import Preloader from '../../../../components/preloader'
import Service from './service'
import Feed from './../../../../components/feed/feed'
// import auth from '@/auth/helpers'
import auth from '@/auth/helpers'

function adSystemInitialState () {
  return {
    modalTitle: 'Make Money',
    modalSubTitle: '',
    celebration: {
      price: 0,
      enable: false,
      text1: '',
      text2: '',
      text3: '',
      fadeOut: false
    },
    step1: {
      enable: true,
      totalUsers: 0,
      totalMoney: 0,
      cashBack: false,
      loader: true,
      text1: '',
      text2: '',
      text3: '',
      enableImage: false
    },
    step2: {
      enable: false,
      text1: 'Watch beautiful ads in your feed and collect money everyday',
      text2: '',
      enableImage: false
    },
    step3: {
      enable: false,
      text1: 'You are watching your first ad now',
      loader: true,
      ad: {
        loader: true,
        feed: [],
        tour: {
          celebration: {
            price: 0,
            enable: false,
            text1: '',
            text2: '',
            text3: '',
            fadeOut: false
          },
          steps: {
            step1: {
              text1: 'Play video to make',
              text2: 'more',
              enable: false,
              arrowPos: {
                left: 0,
                top: 0
              },
              price: '',
              showArrow: false,
              arrowId: '',
              descriptionWrapId: '',
              styletagId: '',
              descriptionPos: '',
              adVideoPlayedText: ''
            }
          }
        },
        adSeen: false,
        feedConfig: {
          colWidth: 9
        }
      }
    },
    step4: {
      enable: false,
      text1: '',
      text2: '',
      enableButton: false
    }
  }
}

export default {
  name: 'AdPopup',
  service: new Service(),
  components: {
    Preloader,
    Feed
  },
  mixins: [mixin],
  data () {
    return {
      pageLoader: true,
      id: this.getUniqueId() + '-ad-system-popup-',
      currentUser: auth.getUser(),
      triggered: false,
      steps: adSystemInitialState()
    }
  },
  computed: {
    modalIdHash: {
      get () {
        return '#' + this.modalId
      }
    },
    triggerButtonId: {
      get () {
        return this.id + '-ad-system-popup-modal-trigger'
      }
    },
    modalId: {
      get () {
        return this.id + '-ad-system-popup-modal'
      }
    },
    closeButtonId: {
      get () {
        return this.id + '-ad-system-popup-buton-close'
      }
    },
    canvasAnimationId: {
      get () {
        return this.id + 'ad-system-popup-canvas'
      }
    }
  },
  mounted () {
  },
  methods: {
    getCashBackInfoContent (price) {
      return 'Before being able to withdraw money, you will be asked to complete your KYC. You wiil get ' + this.showAmount(price) + ' cashback for completing your KYC.'
    },
    enableStep1 () {
      let showAnimationText = () => {
        this.steps.step1.text1 = this.steps.step1.totalUsers + ' people have made '
        this.textAnimationEffect('text1')
          .then((d) => {
            this.steps.step1.text2 = ' so far !!'
            this.textAnimationEffect('text2')
              .then((d1) => {
                this.steps.step1.text3 = 'Would you also like to make some real quick money?'
                this.textAnimationEffect('text3')
                  .then((d2) => {
                    setTimeout(() => {
                      this.steps.step1.enableImage = true
                    }, 1000)
                  })
              })
          })
      }
      this.steps.step1.enable = true
      if (this.steps.step1.loader) {
        auth.getWithdrawlStats()
          .then((d) => {
            this.steps.step1.loader = false
            this.steps.step1.totalUsers = this.formatNumber(d.stats.totalUsers)
            this.steps.step1.totalMoney = d.stats.totalMoneyMadeUSD
            this.steps.step1.cashBack = d.stats.cashBack
            showAnimationText()
          })
          .catch((sErr) => {
            this.showNotification('Something went wrong while getting withdrawal stats', 'error')
          })
      }
    },
    enableStep2 () {
      this.steps.step2.enable = true
      this.textAnimationEffect('text1', 'step2')
        .then((d) => {
          this.steps.step2.enableImage = true
          setTimeout(() => {
            this.steps.step2.text2 = 'So do you want to watch your first ad and make money now?'
            this.textAnimationEffect('text2', 'step2')
              .then((d1) => {
              })
          }, 2000)
        })
    },
    enableStep3 () {
      let fetchAd = () => {
        this.$options.service.getAds()
          .then((d) => {
            this.steps.step3.loader = false
            if (d.ads && d.ads.length) {
              this.steps.step3.ad.feed = [d.ads[0]]
            } else {
              this.showNotification('Sorry, there is currently no ad for you, please try again later ', 'error')
              this.closePopup()
            }
          })
          .catch((e) => {
            this.showNotification('Something went wrong', 'error')
          })
      }
      this.steps.step3.enable = true
      this.steps.modalTitle = 'Ad Tutorial'
      this.textAnimationEffect('text1', 'step3')
        .then((a) => {
          fetchAd()
        })
    },
    enableStep4 () {
      this.steps.step4.enable = true
      this.steps.step4.text1 = 'Wow !! You have made'
      this.steps.modalTitle = 'You are making money'
      this.steps.modalSubTitle = ''
      let setUserCashback = () => {
        this.$options.service.setCashback(this.currentUser.id, this.steps.step1.cashBack.FirstAd.id, this.steps.step3.ad.feed[0].id)
          .then((d) => {})
          .catch((cErr) => {
            this.showNotification('Something went wrong while giving you the cashback', 'error')
          })
      }
      this.textAnimationEffect('text1', 'step4')
        .then((d) => {
          this.steps.step4.text2 = 'There will be limited ads in your feed everyday so come back everyday, watch videos and unlock more ads'
          this.textAnimationEffect('text2', 'step4')
            .then((d1) => {
              this.disableAdTutorial(true)
              if (this.steps.step1.cashBack.FirstAd.enable) {
                setUserCashback()
                let temp = this.steps.step4.text1
                this.steps.step4.text1 = ''
                this.celebrate(this.steps.step1.cashBack.FirstAd.priceUSD, ' ', 'Bonus !! you have got', ' for watching your first ad', 10000)
                  .then((d2) => {
                    this.steps.step4.text1 = temp
                    this.steps.step4.enableButton = true
                  })
              } else {
                this.steps.step4.enableButton = true
              }
            })
        })
    },
    disableAdTutorial (enableAds = false) {
      let user = auth.getUser()
      user.adTutorialTaken = true
      if (enableAds) {
        user.adsEnabled = true
      }
      auth.updateCurrentUser(user)
    },
    resetSteps () {
      this.steps.step1.enable = false
      this.steps.step2.enable = false
      this.steps.step3.enable = false
      this.steps.step4.enable = false
    },
    cleanDOM () {
      let arrowElm = document.getElementById(this.steps.step3.ad.tour.steps.step1.arrowId)
      if (arrowElm) {
        arrowElm.remove()
      }
      let descriptionWrapElm = document.getElementById(this.steps.step3.ad.tour.steps.step1.descriptionWrapId)
      if (descriptionWrapElm) {
        descriptionWrapElm.remove()
      }
      let styletagElm = document.getElementById(this.steps.step3.ad.tour.steps.step1.styletagId)
      if (styletagElm) {
        styletagElm.remove()
      }
    },
    enableStep (step) {
      this.resetSteps()
      if (step === 1) {
        this.enableStep1()
      }
      if (step === 2) {
        this.enableStep2()
      }
      if (step === 3) {
        this.enableStep3()
      }
      if (step === 4) {
        this.enableStep4()
      }
    },
    enableNextStep () {
      if (this.steps.step1.enable) {
        this.enableStep(2)
      } else if (this.steps.step2.enable) {
        this.enableStep(3)
      } else if (this.steps.step3.enable) {
        this.enableStep(4)
      }
    },
    adConsumed (obj) {
      let arrowAnimationSpace = {
        up: 90,
        down: 180
      }
      let setArrowStyle = (top) => {
        this.steps.step3.ad.tour.steps.step1.styletagId = this.id + 'tour-step2-animation-arrow-style'
        let styleTag = document.getElementById(this.steps.step3.ad.tour.steps.step1.styletagId)
        if (styleTag) {
          styleTag.parentNode.removeChild(styleTag)
        }
        let css = document.createElement('style')
        css.id = this.steps.step3.ad.tour.steps.step1.styletagId
        css.type = 'text/css'
        let text = '@keyframes MoveUpDownForArrowUp1{0%,100%{top :' + (top - arrowAnimationSpace.up) + 'px}50%{top: ' + (top - arrowAnimationSpace.down) + 'px}}'
        if (css.styleSheet) {
          css.styleSheet.cssText = text
        } else {
          css.appendChild(document.createTextNode(text))
        }
        document.getElementsByTagName('head')[0].appendChild(css)
      }
      let setDescriptionStyle = (top, left = false) => {
        this.steps.step3.ad.tour.steps.step1.descriptionWrapId = this.id + '-ad-tutorial-text-description-wrap'
        this.steps.step3.ad.tour.steps.step1.descriptionPos = {
          top: ((top - arrowAnimationSpace.up) - 90) + 'px',
          left: !left ? '' : left + 'px'
        }
      }
      let enableFirstStep = () => {
        let getPlayButton = () => {
          let wrap = document.getElementsByClassName('ad-tutorial-feed-wrap')[0]
          let playBtn = wrap.getElementsByClassName('vjs-big-play-button')[0]
          return this.getElementPosition(playBtn)
        }
        let pos = getPlayButton()
        let obj = {
          left: (pos.left - (this.isMobile() ? 15 : 0)) + 'px',
          top: pos.top + 'px'
        }
        this.steps.step3.ad.tour.steps.step1.arrowId = this.id + 'ad-tutorial-step-2-arrow'
        setArrowStyle(pos.top)
        setDescriptionStyle(pos.top)
        this.steps.step3.ad.tour.steps.step1.price = this.steps.step3.ad.feed[0]['AdOption'].cpv
        this.steps.step3.ad.tour.steps.step1.arrowPos = obj
        this.steps.step3.ad.tour.steps.step1.enable = true
        setTimeout(() => {
          document.body.appendChild(document.getElementById(this.steps.step3.ad.tour.steps.step1.arrowId))
          document.body.appendChild(document.getElementById(this.steps.step3.ad.tour.steps.step1.descriptionWrapId))
          this.steps.step3.ad.tour.steps.step1.showArrow = true
        }, 1800)
      }
      let enableSecondStep = () => {
        let getLinkPos = () => {
          let wrap = document.getElementsByClassName('ad-tutorial-feed-wrap')[0]
          let link = wrap.getElementsByClassName('post-ad-link')[0]
          return this.getElementPosition(link)
        }
        let pos = getLinkPos()
        let obj = {
          top: pos.top + 'px',
          left: (pos.left - 20) + 'px'
        }
        setArrowStyle(pos.top)
        setDescriptionStyle(pos.top, (pos.left - 20))
        this.steps.step3.ad.tour.steps.step1.text1 = 'Click this link to make'
        this.steps.step3.ad.tour.steps.step1.price = this.steps.step3.ad.feed[0]['AdOption'].cpc
        this.steps.step3.ad.tour.steps.step1.adVideoPlayedText = ''
        this.steps.step3.ad.tour.steps.step1.arrowPos = obj
        document.getElementById(this.steps.step3.ad.tour.steps.step1.descriptionWrapId).classList.remove('none', 'text-center')
      }
      if (obj.action === 'impression') {
        this.steps.step3.text1 = ''
        this.steps.modalSubTitle = 'You are watching your first ad'
        this.celebrate(this.steps.step3.ad.feed[0]['AdOption'].cpi, 'You just made')
          .then(() => {
            enableFirstStep()
          })
      }
      if (obj.action === 'view') {
        document.getElementById(this.steps.step3.ad.tour.steps.step1.descriptionWrapId).classList.add('none', 'text-left')
        this.celebrate(this.steps.step3.ad.feed[0]['AdOption'].cpv, 'You made', false, 'more')
          .then(() => {
            setTimeout(() => {
              enableSecondStep()
            }, 2000)
          })
      }
      if (obj.action === 'click') {
        let init = () => {
          document.getElementById(this.steps.step3.ad.tour.steps.step1.descriptionWrapId).classList.add('none')
          document.getElementById(this.steps.step3.ad.tour.steps.step1.arrowId).classList.add('none')
          this.gimmick(5000)
          this.celebrate(this.steps.step3.ad.feed[0]['AdOption'].cpc, 'You made', false, 'more')
            .then(() => {
              this.celebrate(this.getTotalMoney(), ' ', 'All done !! you made total', ' through this ad', 7000)
                .then(() => {
                  setTimeout(() => {
                    this.enableStep(4)
                  }, 2000)
                })
            })
        }
        let checkFocus = () => {
          let FocusInt = setInterval(() => {
            if (document.hasFocus()) {
              clearInterval(FocusInt)
              init()
            }
          }, 200)
        }
        checkFocus()
      }
    },
    getTotalMoney () {
      return this.steps.step3.ad.feed[0]['AdOption'].cpi + this.steps.step3.ad.feed[0]['AdOption'].cpc + this.steps.step3.ad.feed[0]['AdOption'].cpv + (this.steps.step4.enableButton && this.steps.step1.cashBack.FirstAd.enable ? this.steps.step1.cashBack.FirstAd.priceUSD : 0)
    },
    celebrate (price, priceText = false, mainHeading = false, extra = false, timeout = 5000) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.steps.celebration.enable = true
          this.steps.celebration.text2 = ''
          this.steps.celebration.fadeOut = false
          this.steps.celebration.text1 = mainHeading || 'Congratulations !!'
          setTimeout(() => {
            this.steps.celebration.price = price
            this.steps.celebration.text2 = priceText
            this.steps.celebration.text3 = extra || ''
            setTimeout(() => {
              this.steps.celebration.fadeOut = true
              setTimeout(() => {
                this.steps.celebration.enable = false
              }, 2000)
              resolve()
            }, timeout)
          }, 3000)
        }, 2000)
      })
    },
    adVideoPlayed (f) {
      let wrapper = document.getElementsByClassName('ad-tutorial-feed-wrap')[0]
      let player = wrapper.getElementsByClassName('video-container')[0]
      let playerPos = this.getElementPosition(player)
      this.steps.step3.ad.tour.steps.step1.descriptionPos = {
        top: (playerPos.top - 50) + 'px'
      }
      this.steps.step3.ad.tour.steps.step1.adVideoPlayedText = 'Watch the full video'
    },
    triggerPopup () {
      /*eslint-disable*/
      this.pauseAllOtherVideos()
      this.triggered = true
      this.gimmick(5000)
      let d = document.getElementById(this.triggerButtonId)
      if (!d) {
          let interval = setInterval(()=> {
          d = document.getElementById(this.triggerButtonId)
          if (d) {
            d.click()
            clearInterval(interval)
            this.enableStep(1)
          }
        }, 100)
      } else {
        d.click()
        this.enableStep(1)
      }
    },
    textAnimationEffect (text, step = 'step1', speed_ = 50) {
      return new Promise((resolve, reject) => {
        let i = 0
        let txt = this.steps[step][text]
        let speed = speed_
        this.steps[step][text] = ''
        let main  = () => {
          if (i < txt.length) {
            this.steps[step][text] += txt.charAt(i)
            i++
            setTimeout(main, speed)
          } else {
            resolve(this.steps[step][text])
          }
        }
        main()
      })
    },
    closePopup () {
      this.disableAdTutorial()
      let closeBtn = document.getElementById(this.closeButtonId)
      if (closeBtn) {
        closeBtn.click()
      }
      this.cleanDOM()
      this.triggered = false
    },
    triggerRevenueTutorial () {
      this.closeAllModals()
      this.closePopup()
      this.$emit('TriggerRevenueTour')
    }
  }
}
</script>

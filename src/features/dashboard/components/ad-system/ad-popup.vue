<template lang="pug">
div(v-if="triggered")
  span(:id="triggerButtonId" data-toggle="modal" data-backdrop="static" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-labelledby='AdStatsModalLabel', aria-hidden='true')
    .modal-dialog(:class="{'modal-lg': steps.step3.enable && steps.step3.ad.feed.length}")
      .modal-content
        .modal-header
          h4.modal-title Make Money
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          <template v-if ="steps.step1.enable">
          <template v-if ="!steps.step1.loader">
          .text-center
            h3.bold
              span(v-if="steps.step1.text1")
                | {{steps.step1.text1}}
              span(v-if="steps.step1.text2" v-html="showAmount(steps.step1.totalMoney)")
              | {{steps.step1.text2}}
            .m-t-5(v-if="steps.step1.enableImage")
              img.w-100.fadeIn(:src="staticImageUrl('money-banner.jpg')")
            h4.m-t-10(v-if="steps.step1.text3")
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
          <template v-if ="steps.step3.enable">
          h3.text-center
            | {{steps.step3.text1}}
          .first-ad-seen-wrap(:class="{'fade-out': steps.step3.ad.tour.celebration.fadeOut}" v-if="steps.step3.ad.tour.celebration.enable")
            .text-wrap.text-center
              h2.text-danger.all-caps(:class="{'zoom-in': steps.step3.ad.tour.celebration.text1}")
                | {{steps.step3.ad.tour.celebration.text1}}
              h2.text-danger.all-caps(:class="{'zoom-in': steps.step3.ad.tour.celebration.text1}" v-if="steps.step3.ad.tour.celebration.text2")
                | {{steps.step3.ad.tour.celebration.text2}}
                span.m-l-5(v-html="showAmount(steps.step3.ad.tour.celebration.price)")
            .pyro
              .before
              .after
          <template v-if="steps.step3.ad.tour.steps.step2.enable">
          .ad-tutorial-step-2(:class="{'none': !steps.step3.ad.tour.steps.step2.showArrow}")
            .text-center.ad-tutorial-step2-description.all-caps(:style = "steps.step3.ad.tour.steps.step2.descriptionPos" :id="steps.step3.ad.tour.steps.step2.descriptionWrapId" :class="{'none': !steps.step3.ad.tour.steps.step2.enable}")
              h2.text-danger.shining-text.ad-tutorial-pointer-text
                <template v-if="!steps.step3.ad.tour.steps.step2.adVideoPlayedText">
                | Play Video to make
                span.m-r-5.m-l-5(v-html="showAmount(steps.step3.ad.feed[0]['AdOption'].cpv)")
                | More
                </template>
                <template v-if="steps.step3.ad.tour.steps.step2.adVideoPlayedText">
                  | {{steps.step3.ad.tour.steps.step2.adVideoPlayedText}}
                </template>
            .ad-tutorial-arrow-pointer-wrap(v-if="!steps.step3.ad.tour.steps.step2.adVideoPlayedText && steps.step3.ad.tour.steps.step2.enable" :id="steps.step3.ad.tour.steps.step2.arrowId" :style="steps.step3.ad.tour.steps.step2.arrowPos")
              i.mdi.mdi-arrow-down-bold.text-warning
          </template>
          .text-center.m-t-20(v-if="steps.step3.loader")
            <preloader />
          .m-t-20.ad-tutorial-feed-wrap(v-if="!steps.step3.loader && steps.step3.ad.feed && steps.step3.ad.feed.length")
            <feed @FeedVideoPlayed = "adVideoPlayed" @adConsumed="adConsumed" :feed = "steps.step3.ad.feed" :config="steps.step3.ad.feedConfig" :userFeed = "true"/>
          </template>
        .modal-footer
          button.btn.btn-secondary(data-dismiss='modal' :id="closeButtonId")
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

function adSystemInitialState () {
  return {
    step1: {
      enable: true,
      totalUsers: 0,
      totalMoney: 0,
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
            fadeOut: false
          },
          steps: {
            step1: {
              text1: '',
              text2: '',
              enable: true
            },
            step2: {
              text1: '',
              text2: '',
              enable: false,
              arrowPos: {
                left: 0,
                top: 0
              },
              showArrow: false,
              arrowId: '',
              descriptionWrapId: '',
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
        this.$options.service.getStats()
          .then((d) => {
            this.steps.step1.loader = false
            this.steps.step1.totalUsers = this.formatNumber(d.stats.totalUsers)
            this.steps.step1.totalMoney = d.stats.totalMoneyMadeUSD
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
      this.textAnimationEffect('text1', 'step3')
        .then((a) => {
          fetchAd()
        })
    },
    resetSteps () {
      this.steps.step1.enable = false
      this.steps.step2.enable = false
      this.steps.step3.enable = false
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
    },
    enableNextStep () {
      if (this.steps.step1.enable) {
        this.enableStep(2)
      } else if (this.steps.step2.enable) {
        this.enableStep(3)
      }
    },
    adConsumed (obj) {
      let arrowAnimationSpace = {
        up: 90,
        down: 180
      }
      let enableSecondStep = () => {
        let getPlayButton = () => {
          let wrap = document.getElementsByClassName('ad-tutorial-feed-wrap')[0]
          let playBtn = wrap.getElementsByClassName('vjs-big-play-button')[0]
          return this.getElementPosition(playBtn)
        }
        let setDescriptionStyle = (top) => {
          this.steps.step3.ad.tour.steps.step2.descriptionWrapId = this.id + '-ad-tutorial-step-2-description-text'
          this.steps.step3.ad.tour.steps.step2.descriptionPos = {
            top: ((top - arrowAnimationSpace.up) - 90) + 'px'
          }
        }
        let setArrowStyle = (top) => {
          let styletagId = this.id + 'tour-step2-animation-arrow-style'
          let styleTag = document.getElementById(styletagId)
          if (styleTag) {
            styleTag.parentNode.removeChild(styleTag)
          }
          let css = document.createElement('style')
          css.id = styletagId
          css.type = 'text/css'
          let text = '@keyframes MoveUpDownForArrowUp1{0%,100%{top :' + (top - arrowAnimationSpace.up) + 'px}50%{top: ' + (top - arrowAnimationSpace.down) + 'px}}'
          if (css.styleSheet) {
            css.styleSheet.cssText = text
          } else {
            css.appendChild(document.createTextNode(text))
          }
          document.getElementsByTagName('head')[0].appendChild(css)
        }
        let pos = getPlayButton()
        let obj = {
          left: pos.left + 'px',
          top: pos.top + 'px'
        }
        this.steps.step3.ad.tour.steps.step2.arrowId = this.id + 'ad-tutorial-step-2-arrow'
        setArrowStyle(pos.top)
        setDescriptionStyle(pos.top)
        this.steps.step3.ad.tour.steps.step2.arrowPos = obj
        this.steps.step3.ad.tour.steps.step2.enable = true
        setTimeout(() => {
          document.body.appendChild(document.getElementById(this.steps.step3.ad.tour.steps.step2.arrowId))
          document.body.appendChild(document.getElementById(this.steps.step3.ad.tour.steps.step2.descriptionWrapId))
          this.steps.step3.ad.tour.steps.step2.showArrow = true
        }, 1800)
      }
      if (obj.action === 'impression') {
        this.celebrate(this.steps.step3.ad.feed[0]['AdOption'].cpi)
          .then(() => {
            enableSecondStep()
          })
      }
      if (obj.action === 'view') {
        this.steps.step3.ad.tour.steps.step2.enable = false
        document.getElementById(this.steps.step3.ad.tour.steps.step2.descriptionWrapId).remove()
        // this.steps.step3.ad.tour.steps.step2.adVideoPlayedText = ''
        // alert(this.steps.step3.ad.tour.steps.step2.enable)
        this.celebrate(this.steps.step3.ad.feed[0]['AdOption'].cpv)
          .then(() => {
          })
      }
    },
    celebrate (price, priceText = false, mainHeading = false) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.steps.step3.ad.tour.celebration.enable = true
          this.steps.step3.ad.tour.celebration.text2 = ''
          this.steps.step3.ad.tour.celebration.fadeOut = false
          this.steps.step3.ad.tour.celebration.text1 = mainHeading || 'Congratulations !!'
          setTimeout(() => {
            this.steps.step3.ad.tour.celebration.price = price
            this.steps.step3.ad.tour.celebration.text2 = priceText || 'You just made'
            setTimeout(() => {
              this.steps.step3.ad.tour.celebration.fadeOut = true
              setTimeout(() => {
                this.steps.step3.ad.tour.celebration.enable = false
              }, 2000)
              resolve()
            }, 5000)
          }, 3000)
        }, 2000)
      })
    },
    adVideoPlayed (f) {
      let wrapper = document.getElementsByClassName('ad-tutorial-feed-wrap')[0]
      let player = wrapper.getElementsByClassName('video-container')[0]
      let playerPos = this.getElementPosition(player)
      this.steps.step3.ad.tour.steps.step2.descriptionPos = {
        top: (playerPos.top - 50) + 'px'
      }
      this.steps.step3.ad.tour.steps.step2.adVideoPlayedText = 'Watch the full video'
    },
    triggerPopup () {
      /*eslint-disable*/
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
      document.getElementById(this.closeButtonId).click()
    }
  }
}
</script>

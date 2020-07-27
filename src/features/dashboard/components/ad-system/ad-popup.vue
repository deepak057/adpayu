<template lang="pug">
div(v-if="triggered")
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-keyboard="false")
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
            h3.bold
              | {{steps.step2.text1}}
            .m-t-5(v-if="steps.step2.enableImage")
              img.w-100.fadeIn(:src="staticImageUrl('money-banner-3.jpg')")
            h4.m-t-10(v-if="steps.step2.text2")
              | {{steps.step2.text2}}
          </template>
          <template v-if ="steps.step3.enable">
          h3.text-center
            | {{steps.step3.text1}}
          .text-center.m-t-20(v-if="steps.step3.loader")
            <preloader />
          .m-t-20(v-if="!steps.step3.loader && steps.step3.ad.feed && steps.step3.ad.feed.length")
            <feed :feed = "steps.step3.ad.feed" :config="steps.step3.ad.feedConfig" :userFeed = "true"/>
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
            if (d.ads && d.ads.length) {
              this.steps.step3.loader = false
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
    triggerPopup () {
      /*eslint-disable*/
      this.triggered = true
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
    textAnimationEffect (text, step = 'step1', speed_ = 70) {
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

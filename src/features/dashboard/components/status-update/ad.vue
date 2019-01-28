<template lang="pug">
div
  <post-privacy v-if = "showPrivacyOption" @PrivacyUpdated="privacyUpdated" :postPublic = "postPublic" ref="postPrivacy"></post-privacy>
  span
    | Is this an Ad?
  <toggle-button v-model="adOptions.postIsAd" color="#009efb" :width="35" :heigh="20" class="m-t-5 m-l-5"></toggle-button>
  .postAdOptions(v-show="adOptions.postIsAd")
    .row.m-t-10.ad-crteation-wrap
      .form
        table.table
          thead
            tr
              th Ad Type
              th Cost per action
              th Cost
          tbody
            tr
              td.max-w-180px
                .form-group.m-0(:class="{'has-danger': impressionTargetError}")
                  | Impressions*
                  i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="Ad Impressions" data-toggle="popover" data-placement="right" :data-content="helpContent('cpiTarget')")
                  br
                  input.form-control.form-control-sm(placeholder="How many impressions?" v-model="adOptions.impressionTarget")
                  small.form-control-feedback(v-if="impressionTargetError")
                    | {{impressionTargetError}}
              td
                .form-group.m-0(:class="{'has-danger': perImpressionCostError}")
                  | Cost per impression
                  i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="Cost per impression" data-toggle="popover" data-placement="right" :data-content="helpContent('cpi')")
                  .input-group
                    span.input-group-addon.h-27 $
                    input.form-control.form-control-sm(type='text' v-model="adOptions.cpi")
                  small.form-control-feedback(v-if="perImpressionCostError")
                    | {{perImpressionCostError}}
              td.align-middle.w-100px $ {{CPITotalCost}}
            tr
              td
                | Clicks (optional)
                i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="Ad Clicks" data-toggle="popover" data-placement="right" data-content='Specify how many clicks you want for this ad.')
                br
                input.form-control.form-control-sm(placeholder="How many clicks?" v-model="adOptions.clickTarget")
              td
                | Cost per click
                i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="Cost per click" data-toggle="popover" data-placement="right" :data-content="helpContent('cpc')")
                .input-group
                  span.input-group-addon.h-27 $
                  input.form-control.form-control-sm(type='text' v-model="adOptions.cpc")
              td.w-100px(:class="{'align-middle': !adOptions.cpc, 'align-bottom': adOptions.cpc}") {{CPCTotalCost}}
            tr(v-if="adOptions.clickTarget")
              td.no-border
                | Enter the link
                i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="Ad link" data-toggle="popover" data-placement="right" data-content='Enter the link/URL where clicking your ad will take users to.')
                br
                input.form-control.form-control-sm
              td.no-border
                | Link label
                i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="Link label" data-toggle="popover" data-placement="right" data-content="Specify the label for your ad link")
                .input-group
                  input.form-control.form-control-sm(type='text' value="")
              td.align-middle.no-border
            tr
              td
                b Total
              td
              td.w-100px
                b ${{totalCost}}
</template>

<script>
import PostPrivacy from './post-privacy'
import mixin from '../../../../globals/mixin'

let defaultCPI = 0.0071
let defaultCPC = 0.028
let defaultImpressionTarget = 500

function defaultAdValues () {
  return {
    postIsAd: false,
    cpi: defaultCPI,
    cpc: defaultCPC,
    impressionTarget: defaultImpressionTarget,
    clickTarget: 0,
    CPITotalCost: 0,
    isValidated: false
  }
}

export default {
  name: 'Ad',
  components: {
    PostPrivacy
  },
  mixins: [mixin],
  props: {
    adOptions: {
      type: Object,
      default () {
        return defaultAdValues()
      }
    }
  },
  data () {
    return {
      showPrivacyOption: false,
      postPublic: false,
      defaultCPI: defaultCPI,
      defaultCPC: defaultCPC,
      defaultImpressionTarget: defaultImpressionTarget,
      impressionTargetError: false,
      perImpressionCostError: false
    }
  },
  computed: {
    CPITotalCost: {
      get () {
        return this.formatFigure(this.adOptions.impressionTarget * this.adOptions.cpi)
      }
    },
    CPCTotalCost: {
      get () {
        return this.formatFigure(this.adOptions.clickTarget * this.adOptions.cpc)
      }
    },
    totalCost: {
      get () {
        return this.formatFigure(this.CPITotalCost + this.CPCTotalCost)
      }
    }
  },
  watch: {
    adOptions: {
      handler: function (after, before) {
        if (this.isEmptyObject(after)) {
          this.adOptions = defaultAdValues()
        } else {
          if (this.validateAd()) {
            after.isValidated = true
          } else {
            after.isValidated = false
          }
          this.$emit('adOptionsUpdated', after)
        }
      },
      deep: true
    }
  },
  mounted () {
    this.$set(this.adOptions, 'cpi', this.defaultCPI)
  },
  methods: {
    privacyUpdated (newV) {
      this.$emit('PrivacyUpdated', newV)
    },
    setDefaultPrivacy (privacy) {
      this.postPublic = Boolean(privacy)
      this.showPrivacyOption = true
    },
    reset () {
      this.showPrivacyOption = false
    },
    formatFigure (num) {
      return Math.round(num * 100) / 100
    },
    helpContent (adType = 'cpi') {
      switch (adType) {
        case 'cpi':
          return "Specify how much you'd like to pay for every single ad impression. Minimum price for per impression is $ " + this.defaultCPI
        case 'cpc':
          return "Specify how much you'd like to pay for every single click on your ad. Minimum price for per click is $ " + this.defaultCPC
        case 'cpiTarget':
          return 'Specify how many impressions you want for this ad. Minimum accepted value is ' + this.defaultImpressionTarget
      }
    },
    validateAd () {
      if (this.adOptions.postIsAd) {
        if (this.validateAdImpressionConfig()) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    },
    validateAdImpressionConfig () {
      return this.validateImpressionTarget() && this.validatePerImpressionCost()
    },
    validateImpressionTarget () {
      if (this.adOptions.impressionTarget < this.defaultImpressionTarget) {
        this.impressionTargetError = 'Min allowed value is ' + this.defaultImpressionTarget
        return false
      } else {
        this.impressionTargetError = false
        return true
      }
    },
    validatePerImpressionCost () {
      if (this.adOptions.cpi < this.defaultCPI) {
        this.perImpressionCostError = 'Min allowed value is $' + this.defaultCPI
        return false
      } else {
        this.perImpressionCostError = false
        return true
      }
    }
  }
}
</script>

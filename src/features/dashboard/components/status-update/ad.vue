<template lang="pug">
div
  <post-privacy v-if = "showPrivacyOption" @PrivacyUpdated="privacyUpdated" :postPublic = "postPublic" ref="postPrivacy"></post-privacy>
  span.mobile-fs-13px
    | Is this an Ad?
    i.mdi.mdi-information-outline.cursor-hand.m-l-2.text-muted(data-container="body" title="Make an ad" data-toggle="popover" data-placement="right" data-content='You can turn this post into an Ad post by using this option.')
  <toggle-button v-model="adOptions.postIsAd" color="#009efb" :width="35" :heigh="20" class="m-t-5 m-l-5"></toggle-button>
  .m-t-20.text-center(v-if="adOptions.postIsAd && !defaultOptionsLoaded")
    <preloader/>
  .postAdOptions(v-if="adOptions.postIsAd && defaultOptionsLoaded")
    .row.m-t-10.ad-crteation-wrap.p-t-10
      .form
        .form-group.p-l-10.p-r-10.m-b-15.post-ad-location-wrap
          h6
            | Location
            i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="Ad Target Location" data-toggle="popover" data-placement="right" data-content="Choose where your ad will be shown in the world. By default, it shows up globally.")
          .m-t-5
            input.m-r-5.with-gap(v-model="locationType" value="global" type="radio" name="adLocationRadio" id="post-ad-world-wide")
            label.small.m-r-5(for="post-ad-world-wide")
              | World Wide
            input.m-r-5.with-gap(v-model="locationType" value="countries" type="radio" name="adLocationRadio" id="post-ad-countries")
            label.small.m-r-5(for="post-ad-countries")
              | Countries
            input.m-r-5.with-gap(v-model="locationType" value="local" type="radio" name="adLocationRadio" id="post-local-area")
            label.small.m-r-5(for="post-local-area")
              | Local Area
        .form-group.p-l-10.p-r-10.m-b-15(v-if="locationType=='countries'")
          label
            | Add target countries
            i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="Target Countries" data-toggle="popover" data-placement="right" data-content="Choose which countries this ad should be served in. By default, your ad will appear globally.")
          <vue-tags-input placeholder="Type country name" v-model="country" :tags="adOptions.adCountries" :autocomplete-items="filteredItems()" @tags-changed="countriesUpdated"/>
        table.table
          thead
            tr
              th Ad Type
              th Cost per action
              th.text-center Cost
          tbody
            tr
              td.max-w-180px
                .form-group.m-0(:class="{'has-danger': impressionTargetError}")
                  label
                    | Impressions*
                    i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="Ad Impressions" data-toggle="popover" data-placement="right" :data-content="helpContent('cpiTarget')")
                  input.form-control.form-control-sm(type="number" @keypress="isNumber(event)" placeholder="How many impressions?" v-model="adOptions.impressionTarget")
                  small.form-control-feedback(v-if="impressionTargetError")
                    | {{impressionTargetError}}
              td
                .form-group.m-0(:class="{'has-danger': perImpressionCostError}")
                  label
                    | Per impression
                    i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="Cost per impression" data-toggle="popover" data-placement="right" :data-content="helpContent('cpi')")
                  .input-group
                    span.input-group-addon.h-27 $
                    input.form-control.form-control-sm(type='number' @keypress="isNumber(event)" v-model="adOptions.cpi")
                  small.form-control-feedback(v-if="perImpressionCostError")
                    | {{perImpressionCostError}}
              td.align-middle.w-100px.text-center $ {{CPITotalCost}}
            tr
              td
                label
                  | Clicks (optional)
                  i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="Ad Clicks" data-toggle="popover" data-placement="right" data-content='Specify how many clicks you want for this ad.')
                input.form-control.form-control-sm(type="number" @keypress="isNumber(event)" placeholder="How many clicks?" v-model="adOptions.clickTarget")
              td
                .form-group.m-0(:class="{'has-danger': perClickCostError}")
                  label
                    | Cost per click
                    i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="Cost per click" data-toggle="popover" data-placement="right" :data-content="helpContent('cpc')")
                  .input-group
                    span.input-group-addon.h-27 $
                    input.form-control.form-control-sm(type='number' @keypress="isNumber(event)" v-model="adOptions.cpc")
                  small.form-control-feedback(v-if="perClickCostError")
                    | {{perClickCostError}}
              td.w-100px.text-center(:class="{'align-middle': !adOptions.cpc, 'align-bottom': adOptions.cpc}") $ {{CPCTotalCost}}
            tr(v-if="adOptions.clickTarget > 0")
              td.no-border
                .form-group.m-0(:class="{'has-danger': adLinkError}")
                  label
                    | Enter the link *
                    i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="Ad link" data-toggle="popover" data-placement="right" data-content='Enter the link/URL where clicking your ad will take users to. For example- https://www.yourdomain.com/anypage')
                  input.form-control.form-control-sm(type='text' v-model.trim="adOptions.adLink")
                  small.form-control-feedback(v-if="adLinkError")
                    | {{adLinkError}}
              td.no-border
                .form-group.m-0(:class="{'has-danger': adLinkLabelError}")
                  label
                    | Link label *
                    i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="Link label" data-toggle="popover" data-placement="right" data-content="Specify the label for your ad link. Such as 'Get the product now' or 'Visit the store now' etc.")
                  .input-group
                    input.form-control.form-control-sm(type='text' v-model.trim="adOptions.adLinkLabel")
                  small.form-control-feedback(v-if="adLinkLabelError")
                    | {{adLinkLabelError}}
              td.align-middle.no-border
            tr(v-if="adType==='video'")
              td
                label
                  | Views (Optional)
                  i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="Cost Per video view" data-toggle="popover" data-placement="right" data-content='Specify how many video viewes you want for this video ad.')
                input.form-control.form-control-sm(type="number" @keypress="isNumber(event)" v-model="adOptions.viewTarget")
              td
                .form-group.m-0(:class="{'has-danger': perVideoViewCostError}")
                  label
                    | Cost per view
                    i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="Cost Per View" data-toggle="popover" data-placement="right" :data-content="helpContent('cpv')")
                  .input-group
                    span.input-group-addon.h-27 $
                    input.form-control.form-control-sm(type='number' @keypress="isNumber(event)" v-model="adOptions.cpv")
                  small.form-control-feedback(v-if="perVideoViewCostError")
                    | {{perVideoViewCostError}}
              td.align-middle.text-center
                | $ {{CPVTotalCost}}
            tr
              td
              td.text-right
                b Total
              td.align-middle.w-100px.text-center
                b ${{totalCost}}
  <select-map-area ref="SelectMapAreaComponent" @MapAreaUpdated="updateAdArea"/>
</template>

<script>
import PostPrivacy from './post-privacy'
import mixin from '../../../../globals/mixin'
import countryList from '../../../../globals/countries'
import VueTagsInput from '@johmun/vue-tags-input'
import Preloader from './../../../../components/preloader'
import Service from './service'
import SelectMapArea from './../../../../components/location/select_area'

function defaultAdValues () {
  return {
    postIsAd: false,
    cpi: '',
    cpc: '',
    cpv: '',
    impressionTarget: '',
    clickTarget: 0,
    viewTarget: 0,
    isValidated: false,
    adLink: '',
    adLinkLabel: '',
    adCountries: [],
    totalAmount: 0,
    adArea: ''
  }
}

function initialState () {
  return {
    showPrivacyOption: false,
    postPublic: false,
    defaultCPI: '',
    defaultCPC: '',
    defaultCPV: '',
    defaultImpressionTarget: '',
    impressionTargetError: false,
    perImpressionCostError: false,
    perClickCostError: false,
    perVideoViewCostError: false,
    adLinkError: false,
    adLinkLabelError: false,
    country: '',
    adOptions: defaultAdValues(),
    defaultOptionsLoaded: false,
    locationType: 'global'
  }
}

export default {
  name: 'Ad',
  service: new Service(),
  components: {
    PostPrivacy,
    VueTagsInput,
    Preloader,
    SelectMapArea
  },
  mixins: [mixin, countryList],
  props: {
    /* adOptions: {
      type: Object,
      default () {
        return defaultAdValues()
      }
    }, */
    adType: {
      type: String,
      default () {
        return 'text'
      }
    }
  },
  data () {
    return initialState()
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
    CPVTotalCost: {
      get () {
        return this.formatFigure(this.adOptions.viewTarget * this.adOptions.cpv)
      }
    },
    totalCost: {
      get () {
        return this.formatFigure(this.CPITotalCost + this.CPCTotalCost + this.CPVTotalCost)
      }
    }
  },
  watch: {
    adOptions: {
      handler: function (after, before) {
        if (after.postIsAd && !this.defaultOptionsLoaded) {
          // fetch ad's default pricing options
          // from server
          this.fetchDefaultOptions()
        } else if (this.isEmptyObject(after)) {
          this.adOptions = defaultAdValues()
        } else {
          if (this.validateAd()) {
            after.isValidated = true
            // also, update the totalAmount property in AdOptions
            after.totalAmount = this.totalCost
          } else {
            after.isValidated = false
          }
          this.$emit('adOptionsUpdated', after)
        }
      },
      deep: true
    },
    locationType (newV) {
      if (newV === 'local') {
        this.adOptions.adCountries = []
        this.$refs.SelectMapAreaComponent.triggerPopup()
      }
      if (newV === 'countries') {
        this.adOptions.adArea = ''
      }
      if (newV === 'global') {
        this.adOptions.adArea = ''
        this.adOptions.adCountries = []
      }
    }
  },
  mounted () {
  },
  methods: {
    updateAdArea (areaCords) {
      this.adOptions.adArea = JSON.stringify(areaCords)
    },
    fetchDefaultOptions () {
      this.$options.service.fetchAdOptions()
        .then((data) => {
          let options = data.options
          this.defaultCPI = options.defaultCPI
          this.defaultCPC = options.defaultCPC
          this.defaultCPV = options.defaultCPV
          this.defaultImpressionTarget = options.defaultImpressionTarget
          this.adOptions.cpi = options.defaultCPI
          this.adOptions.cpc = options.defaultCPC
          this.adOptions.cpv = options.defaultCPV
          this.adOptions.impressionTarget = options.defaultImpressionTarget
          this.defaultOptionsLoaded = true
        })
        .catch((pErr) => {
          this.showNotification('Something went wrong while fetching the ad pricing options.', 'error')
        })
    },
    privacyUpdated (newV) {
      this.$emit('PrivacyUpdated', newV)
    },
    setDefaultPrivacy (privacy) {
      this.postPublic = Boolean(privacy)
      this.showPrivacyOption = true
    },
    reset () {
      // this.adOptions = defaultAdValues()
      Object.assign(this.$data, initialState())
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
        case 'cpv':
          return "Specify how much you'd like to pay for every single video view. Minimum accepted value is $ " + this.defaultCPV
      }
    },
    validateAd () {
      if (this.adOptions.postIsAd) {
        if (this.validateAdImpressionConfig() && this.validateAdClickConfig() && this.validateAdVideoViewsConfig()) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    },
    validateAdVideoViewsConfig () {
      return this.validatePerVideoViewCost()
    },
    validatePerVideoViewCost () {
      if (this.adOptions.viewTarget && this.adOptions.cpv < this.defaultCPV) {
        this.perVideoViewCostError = 'Min allowed value is ' + this.defaultCPV
        return false
      } else {
        this.perVideoViewCostError = false
        return true
      }
    },
    validateAdClickConfig () {
      if (this.adOptions.clickTarget) {
        if (this.validatePerClickCost()) {
          return this.validateClickAdLinkAndLabel()
        } else {
          return false
        }
      } else {
        return true
      }
    },
    validateClickAdLinkAndLabel () {
      /*
      * Check the label only after
      * a valid link has been entered
      * to avoid the Label error
      * right from the beginning
      */
      if (this.adOptions.adLink && this.validateClickAdLink()) {
        return this.validateClickAdLinkLabel()
      } else {
        return false
      }
      // return this.validateClickAdLink() && this.validateClickAdLinkLabel()
    },
    validateClickAdLinkLabel () {
      if (!this.adOptions.adLinkLabel) {
        this.adLinkLabelError = 'Enter a link label'
        return false
      } else {
        this.adLinkLabelError = false
        return true
      }
    },
    validateClickAdLink () {
      if (this.adOptions.adLink && !this.ValidURL(this.adOptions.adLink)) {
        this.adLinkError = 'Enter a valid URL'
        return false
      } else {
        this.adLinkError = false
        return true
      }
    },
    validateClickTarget () {
      return this.adOptions.clickTarget > 0
    },
    validatePerClickCost () {
      if (this.adOptions.cpc < this.defaultCPC) {
        this.perClickCostError = 'Min allowed value is ' + this.defaultCPC
        return false
      } else {
        this.perClickCostError = false
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
    },
    filteredItems () {
      return this.countryList.filter(i => {
        return i.text.toLowerCase().indexOf(this.country.toLowerCase()) !== -1
      })
    },
    countriesUpdated (newCountries) {
      this.adOptions.adCountries = newCountries
    }
  }
}
</script>

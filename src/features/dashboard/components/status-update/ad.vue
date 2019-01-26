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
              td
                | Impressions*
                i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="Ad Impressions" data-toggle="popover" data-placement="right" data-content='Specify how many impressions you want for this ad.')
                br
                input.form-control.form-control-sm(placeholder="How many impressions?")
              td
                | Cost per impression
                i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="Cost per impression" data-toggle="popover" data-placement="right" data-content="Specify how much you'd like to pay for every single ad impression. Minimum price for per impression is $ 0.0071")
                .input-group
                  span.input-group-addon.h-27 $
                  input.form-control.form-control-sm(type='text' value="0.0071")
              td.align-middle $40
            tr
              td
                | Clicks (optional)
                i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="Ad Clicks" data-toggle="popover" data-placement="right" data-content='Specify how many clicks you want for this ad.')
                br
                input.form-control.form-control-sm(v-model="adOptions.cpc" placeholder="How many clicks?")
              td
                | Cost per click
                i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="Cost per click" data-toggle="popover" data-placement="right" data-content="Specify how much you'd like to pay for every single ad click. Minimum price for per click is $ 0.028")
                .input-group
                  span.input-group-addon.h-27 $
                  input.form-control.form-control-sm(type='text' value="0.028")
              td.align-middle $40
            tr(v-if="adOptions.cpc")
              td
                | Enter the link
                i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="Ad link" data-toggle="popover" data-placement="right" data-content='Enter the link/URL where clicking your ad will take users to.')
                br
                input.form-control.form-control-sm
              td
                | Link label
                i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="Link label" data-toggle="popover" data-placement="right" data-content="Specify the label for your ad link")
                .input-group
                  span.input-group-addon.h-27 $
                  input.form-control.form-control-sm(type='text' value="0.028")
              td.align-middle $40
            tr
              td
                b Total
              td
              td
                b $80
</template>

<script>
import PostPrivacy from './post-privacy'

export default {
  name: 'Ad',
  components: {
    PostPrivacy
  },
  props: {
    adOptions: {
      type: Object,
      default () {
        return {
          postIsAd: false,
          cpv: '',
          cpc: ''
        }
      }
    }
  },
  data () {
    return {
      showPrivacyOption: false,
      postPublic: false
    }
  },
  watch: {
    adOptions: {
      handler: function (after, before) {
        this.$emit('adOptionsUpdated', after)
      },
      deep: true
    }
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
    }
  }
}
</script>

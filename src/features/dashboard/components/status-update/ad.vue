<template lang="pug">
div
  span
    | Is this an Ad?
  <toggle-button v-model="adOptions.postIsAd" color="#009efb" :width="35" :heigh="20" class="m-t-5 m-l-5"></toggle-button>
  .postAdOptions(v-show="adOptions.postIsAd")
    form.m-t-10
      .row
        .col-md-6
          .form-group
            label.control-label CPV
            i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="Cost Per View" data-toggle="popover" data-placement="right" data-content='This is the amount that viewers will get for watching this in their feed. Min suggested CPV is $.2')
            input.form-control.w-100(type="number" v-model="adOptions.cpv")
            small.form-control-feedback Set Cost Per View
        .col-md-6
          .form-group
            label.control-label CPC
            i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="Cost Per Click" data-toggle="popover" data-placement="right" data-content='This is the amount that viewers will get for clicking the target link in your ad. Min suggested CPV is $.8')
            input.form-control.w-100(type="number" v-model="adOptions.cpc")
            small.form-control-feedback Set Cost Per Click
        .col-md-12(v-show="adOptions.cpc")
          .form-group
            label.control-label Target URL
            i.mdi.mdi-information.cursor-hand.m-l-2.text-muted(data-container="body" title="The Target URL" data-toggle="popover" data-placement="right" data-content='This is the URL where users will be taken when they click your ad.')
            input.form-control
            small.form-control-feedback Enter the Target URL
</template>

<script>
export default {
  name: 'Ad',
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
  watch: {
    adOptions: {
      handler: function (after, before) {
        this.$emit('adOptionsUpdated', after)
      },
      deep: true
    }
  }
}
</script>

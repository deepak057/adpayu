<template lang="pug">
div
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-backdrop="static" data-keyboard="false")
  .modal.fade.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-labelledby='AdStatsModalLabel', aria-hidden='true')
    .modal-dialog
      .modal-content
        .modal-header
          h4.modal-title Ad Stats
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          div.adstats-container
            .text-center.m-t-20(v-if="pageLoader")
              <preloader/>
            <template v-if="!pageLoader && adStats.length">
            p
              <router-link :to="getPostLink(post.id)" @click.native="closePopup()">
                | This Ad
              </router-link>
              |  has been running since {{post.createdAt | date}}
            .table-responsive
              table.table.table-hover
                thead
                  tr
                    th.text-left
                      | Action
                      i.mdi.mdi-information-outline.m-l-5.cursor-hand(data-container="body" title="Ad Action" data-toggle="popover" data-placement="right" data-content="This field indicates the type of ad.")
                    th.text-center
                      | Cost per action
                      i.mdi.mdi-information-outline.m-l-5.cursor-hand(data-container="body" title="Cost Per Action" data-toggle="popover" data-placement="right" data-content="This field indicates the cost for per ad action. Such as cost per click, cost per impression or cost per video view.")
                    th.text-center
                      | Target
                      i.mdi.mdi-information-outline.m-l-5.cursor-hand(data-container="body" title="Ad Targets" data-toggle="popover" data-placement="right" data-content="This field indicates maximum number of ad actions that this ad can acheive. Indicates maximum number of impressions, clicks or views.")
                    th.text-center
                      | Acheived
                      i.mdi.mdi-information-outline.m-l-5.cursor-hand(data-container="body" title="Ad Consumption" data-toggle="popover" data-placement="right" data-content="This field indicates number of ad actions that have been acheived so far. Indicates number of times this ad has been seen, clicked or viewed (video ad).")
                tbody
                  tr(v-for="stat in adStats")
                    td.text-left {{stat.action}}
                    td.text-center $ {{stat.costPerAction}}
                    td.text-center {{stat.targetCount}}
                    td.text-center {{stat.countAcheived}}
                  tr
                    td.text-left(colspan='2')
                      h5.m-t-10 Total Cost
                    td.text-center
                      h5.m-t-10.text-success $ {{totalRow.totalTargetCost}}
                    td.text-center
                      h5.m-t-10.text-danger $ {{totalRow.totalAcheivedCost}}
            </template>
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Close
</template>
<script>
import mixin from '../../globals/mixin'
import AdMixin from './ad-mixin.js'
import Preloader from '../preloader'
import Service from './service'
import auth from '@/auth/helpers'
// import { router } from '@/http'

export default {
  name: 'AdStats',
  service: new Service(),
  components: {
    Preloader
  },
  mixins: [mixin, AdMixin],
  data () {
    return {
      pageLoader: true,
      id: this.getUniqueId() + '-ad-stats-modal-',
      currentUser: auth.getUser(),
      adStats: [],
      totalRow: false,
      post: false
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
        return this.id + '-trigger-ad-stats-modal'
      }
    },
    modalId: {
      get () {
        return this.id + '-ad-stats-modal'
      }
    },
    closeButtonId: {
      get () {
        return this.id + '-ad-stat-modal-buton-close'
      }
    }
  },
  mounted () {
  },
  methods: {
    triggerPopup (postId) {
      this.pageLoader = true
      this.adStats = []
      this.totalRow = false
      document.getElementById(this.triggerButtonId).click()
      auth.getPost(postId)
        .then((postData) => {
          this.pageLoader = false
          this.post = postData
          this.populateStatsTable(postData)
        })
        .catch((pErr) => {
          this.showNotification('Something went wrong while getting the stats.', 'error')
          this.closePopup()
        })
    },
    populateStatsTable (post) {
      let adConfig = this.getAdConfig(post)
      let adStats = adConfig.AdStat
      if (adConfig.impressionTarget) {
        this.adStats.push({
          action: 'Impression',
          costPerAction: adConfig.cpi,
          targetCount: adConfig.impressionTarget,
          countAcheived: adStats ? adStats.impressions : 0
        })
      }
      if (adConfig.clickTarget) {
        this.adStats.push({
          action: 'Click',
          costPerAction: adConfig.cpc,
          targetCount: adConfig.clickTarget,
          countAcheived: adStats ? adStats.clicks : 0
        })
      }
      if (adConfig.viewTarget) {
        this.adStats.push({
          action: 'View',
          costPerAction: adConfig.cpv,
          targetCount: adConfig.viewTarget,
          countAcheived: adStats ? adStats.views : 0
        })
      }
      if (this.adStats.length) {
        let totalTargetCost = 0
        let totalAcheivedCost = 0
        for (let i in this.adStats) {
          totalTargetCost += this.adStats[i].targetCount * this.adStats[i].costPerAction
          totalAcheivedCost += this.adStats[i].countAcheived * this.adStats[i].costPerAction
        }
        this.totalRow = {
          totalTargetCost: this.roundToDecimalPlaces(totalTargetCost),
          totalAcheivedCost: this.roundToDecimalPlaces(totalAcheivedCost)
        }
      }
    },
    closePopup () {
      document.getElementById(this.closeButtonId).click()
    }
  }
}
</script>

<template lang="pug">
div
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-labelledby='AdStatsModalLabel', aria-hidden='true')
    .modal-dialog
      .modal-content
        .modal-header
          h4.modal-title Withdraw Money
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          .text-center.m-t-20(v-if="pageLoader")
            <preloader/>
          .text-center(v-if="!pageLoader")
            .table-responsive
              table.table.table-hover
                thead
                  tr
                    th Remarks
                    th Amount in USD
                    th Amount in INR
                  tr
                    td
                      | Money Accumulated
                      i.mdi.mdi-information-outline.m-l-5.cursor-hand
                    td ${{data.transactionDetails.amountAccumulatedUSD}}
                    td {{data.transactionDetails.amountAccumulatedINR}} INR
                  tr
                    td
                      | {{data.transactionDetails.siteFeePercentage}}% Site Fee
                      i.mdi.mdi-information-outline.m-l-5.cursor-hand
                    td.text-danger ${{data.transactionDetails.siteFeeUSD}}
                    td.text-danger {{data.transactionDetails.siteFeeINR}} INR
                  tr
                    td
                      h4
                        | Total Payable
                        i.mdi.mdi-information-outline.m-l-5.cursor-hand
                    td
                      h4.text-success ${{data.transactionDetails.totalUSD}}
                    td
                      h4.text-success {{data.transactionDetails.totalINR}} INR
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Close
          button.btn.btn-danger.waves-effect(type='button', data-dismiss='modal') Proceed
</template>
<script>
import mixin from '../globals/mixin'
import Preloader from './preloader'
import Service from './service'
// import auth from '@/auth/helpers'

function getWithdrawInitialState () {
  return {
    transactionDetails: false
  }
}

export default {
  name: 'WithdrawMoney',
  service: new Service(),
  components: {
    Preloader
  },
  mixins: [mixin],
  data () {
    return {
      pageLoader: true,
      id: this.getUniqueId() + '-withdraw-money-modal-',
      data: getWithdrawInitialState()
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
        return this.id + '-trigger-withdraw-money-modal'
      }
    },
    modalId: {
      get () {
        return this.id + '-withdraw-money-modal'
      }
    },
    closeButtonId: {
      get () {
        return this.id + '-withdraw-money-modal-buton-close'
      }
    }
  },
  mounted () {
  },
  methods: {
    triggerPopup () {
      document.getElementById(this.triggerButtonId).click()
      this.pageLoader = true
      this.data = getWithdrawInitialState()
      this.$options.service.getWithdrawOverview()
        .then((data) => {
          this.pageLoader = false
          this.data.transactionDetails = data.transaction
        })
        .catch((tErr) => {
          this.showNotification('Something went wrong while getting transaction details, please try again later.', 'error')
        })
    },
    closePopup () {
      document.getElementById(this.closeButtonId).click()
    }
  }
}
</script>

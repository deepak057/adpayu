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
          <template v-if="!data.overviewGone">
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
                      i.mdi.mdi-information-outline.m-l-5.cursor-hand(data-container="body" title="Money Accumulated" data-toggle="popover" data-placement="right" data-content="Total amount of money that you have made by seeing and watching the ads.")
                    td ${{data.transactionDetails.amountAccumulatedUSD}}
                    td {{data.transactionDetails.amountAccumulatedINR}} INR
                  tr
                    td
                      | {{data.transactionDetails.siteFeePercentage}}% Site Fee
                      i.mdi.mdi-information-outline.m-l-5.cursor-hand(data-container="body" title="Site Fee" data-toggle="popover" data-placement="right" :data-content="getSiteFeeText()")
                    td.text-danger ${{data.transactionDetails.siteFeeUSD}}
                    td.text-danger {{data.transactionDetails.siteFeeINR}} INR
                  tr
                    td
                      h4
                        | Total Payable
                        i.mdi.mdi-information-outline.m-l-5.cursor-hand(data-container="body" title="Total Payable Money" data-toggle="popover" data-placement="right" data-content="This is the amount of money that is payable to you after deducting the Site Fee from the total accumulated amount.")
                    td
                      h4.text-success ${{data.transactionDetails.totalUSD}}
                    td
                      h4.text-success {{data.transactionDetails.totalINR}} INR
          </template>
          <template v-if="data.overviewGone">
          .payment-withdrawl-options-wrap(v-if="!pageLoader")
            h4 Transfer money to your?
            .m-t-20
              input.m-r-5.with-gap(v-model="data.transfermodeDetails.mode" name="group4" value="bank" type="radio" id="pwo-rd-bank-account")
              label.m-r-5(for="pwo-rd-bank-account")
                | Bank Account
              input.m-r-5.with-gap(v-model="data.transfermodeDetails.mode" name="group4" type="radio" value="paytm" id="pwo-rd-paytm")
              label(for="pwo-rd-paytm")
                | Paytm
              .pwo-selected-option-wrap.m-t-20
                <template v-if="data.transfermodeDetails.mode === 'bank'">
                  form
                    .form-group
                      label Account Number*
                      input.form-control(type="text" placeholder="Enter Bank Account Number")
                    .form-group
                      label IFSC*
                      input.form-control(type="text" placeholder="Enter IFSC code")
                    .form-group
                      label Phone Number*
                      input.form-control(type="text" placeholder="Enter Your Phone Number")
                    .form-group
                      label Address*
                      input.form-control(type="text" placeholder="Enter Your Address")
                </template>
                <template v-if="data.transfermodeDetails.mode === 'paytm'">
                  form
                    .form-group
                      label Paytm mobile number*
                      input.form-control(type="text" placeholder="Registered Paytm mobile number")
                    .form-group
                      label Address*
                      input.form-control(type="text" placeholder="Enter Your Address")
                </template>
          </template>
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Close
          button.btn.btn-danger.waves-effect(type='button', @click="proceedToPaymentOptionScreen()") Proceed
</template>
<script>
import mixin from '../globals/mixin'
import Preloader from './preloader'
import Service from './service'
// import auth from '@/auth/helpers'

function getWithdrawInitialState () {
  return {
    transactionDetails: false,
    overviewGone: false,
    transfermodeDetails: {
      mode: 'bank',
      accountNumber: 2121111,
      IFSC: 'Ne3'
    }
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
    },
    getSiteFeeText () {
      return 'We will keep ' + this.data.transactionDetails.siteFeePercentage + '% of the money you have made as part of our service fee. This money will help us continue to run and suport this platform.'
    },
    proceedToPaymentOptionScreen () {
      this.data.overviewGone = true
      // this.pageLoader = true
    }
  }
}
</script>

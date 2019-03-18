<template lang="pug">
div
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog
      .modal-content
        .modal-header
          h4.modal-title Withdraw Money
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          .payment-withdrawl-options-wrap.m-b-20(v-if="!data.error && !overviewGone")
            h4 Transfer money to your?
            .m-t-20
              input.m-r-5.with-gap(v-model.trim="data.transfermodeDetails.mode" name="group4" value="bank" type="radio" id="pwo-rd-bank-account")
              label.small.m-r-5(for="pwo-rd-bank-account")
                | Bank Account
              input.m-r-5.with-gap(v-model.trim="data.transfermodeDetails.mode" name="group4" type="radio" value="paytm" id="pwo-rd-paytm")
              label.small.m-r-5(for="pwo-rd-paytm")
                | Paytm
              input.m-r-5.with-gap(v-model.trim="data.transfermodeDetails.mode" name="group4" type="radio" value="manual" id="pwo-rd-manual")
              label.small(for="pwo-rd-manual")
                | Manual
          .text-center.m-t-20(v-if="pageLoader")
            <preloader/>
          <template v-if="!pageLoader">
          <template v-if="data.success">
          .text-center.m-t-20
            .alert.alert-success
              i.mdi.mdi-check
              | {{data.success}}
          </template>
          <template v-if="data.error">
          .text-center.m-t-20
            h4.text-danger
              i.mdi.mdi-alert.m-r-5
              | {{data.error}}
          </template>
          <template v-if="!data.error && !data.success">
          #accordion-revenue-breakdown.nav-accordion(role='tablist', aria-multiselectable='true')
           .card
             #headingOne-revenue-breakdown.card-header(role='tab')
               h5.mb-0
                 a.d-block(data-toggle='collapse', data-parent='#accordion-revenue-breakdown', href='#collapseOne-revenue-breakdown', aria-expanded='false', aria-controls='collapseOne-revenue-breakdown')
                   | Total Payable: ${{data.transactionDetails.totalUSD}} ({{data.transactionDetails.totalINR}} INR)
                   i.mdi.mdi-information-outline.m-l-5
             #collapseOne-revenue-breakdown.collapse(role='tabpanel', aria-label.smallledby='headingOne-revenue-breakdown', style='')
               .card-body
                 .text-center.small
                   .table-responsive
                     table.table.table-hover
                       thead
                         tr
                           th.text-left Remarks
                           th Amount in USD
                           th Amount in INR
                       tr
                         td.text-left
                           | Money Accumulated
                           i.mdi.mdi-information-outline.m-l-5.cursor-hand(data-container="body" title="Money Accumulated" data-toggle="popover" data-placement="right" data-content="Total amount of money that you have made by seeing and watching the ads.")
                         td ${{data.transactionDetails.amountAccumulatedUSD}}
                         td {{data.transactionDetails.amountAccumulatedINR}} INR
                       tr
                         td.text-left
                           | {{data.transactionDetails.siteFeePercentage}}% Site Fee
                           i.mdi.mdi-information-outline.m-l-5.cursor-hand(data-container="body" title="Site Fee" data-toggle="popover" data-placement="right" :data-content="getSiteFeeText()")
                         td.text-danger ${{data.transactionDetails.siteFeeUSD}}
                         td.text-danger {{data.transactionDetails.siteFeeINR}} INR
                       tr
                         td.text-left
                           | {{data.transfermodeDetails.mode | capitalize}} Transfer Fee
                           i.mdi.mdi-information-outline.m-l-5.cursor-hand(data-container="body" title="Payment Transfer Charges" data-toggle="popover" data-placement="right" data-content="This amount of money is charged by our Payment Gateway partner in order to transfer money to your account instantly. You can choose manual transfer mode which will charge less but money will be transferred to your account within 24 hours.")
                         td.text-danger $ {{data.transactionDetails.paymentGatewayChargeUSD}}
                         td.text-danger {{data.transactionDetails.paymentGatewayChargeINR}} INR
                       tr
                         td.text-left
                           h6
                             | Total Payable
                             i.mdi.mdi-information-outline.m-l-5.cursor-hand(data-container="body" title="Total Payable Money" data-toggle="popover" data-placement="right" data-content="This is the amount of money that is payable to you after deducting the Site Fee and money transfer charges from the total accumulated amount.")
                         td
                           h6.text-success ${{data.transactionDetails.totalUSD}}
                         td
                           h6.text-success {{data.transactionDetails.totalINR}} INR
          .payment-withdrawl-details-form-wrap
            .pwo-selected-option-wrap.m-t-20
              form
                .alert.alert-danger.small(v-if="data.serverError")
                  | {{data.serverError}}
                .form-group(:class="{'has-danger': data.accountNumberError}" v-if="!ifMode('paytm')")
                  label.small Account Number*
                  input.form-control.form-control-sm(v-model.trim="data.transfermodeDetails.accountNumber" type="text" placeholder="Enter Bank Account Number")
                  small.form-control-feedback(v-if="data.accountNumberError")
                    | {{data.accountNumberError}}
                .form-group(:class="{'has-danger': data.IFSCError}" v-if="!ifMode('paytm')")
                  label.small IFSC*
                  input.form-control.form-control-sm(v-model.trim="data.transfermodeDetails.IFSC" type="text" placeholder="Enter IFSC code")
                  small.form-control-feedback(v-if="data.IFSCError")
                    | {{data.IFSCError}}
                .form-group(:class="{'has-danger': data.phoneError}")
                  label.small Phone Number*
                  input.form-control.form-control-sm(v-model.trim="data.transfermodeDetails.phone" type="text" placeholder="Enter Your Phone Number" @keypress="isNumber(event)")
                  small.form-control-feedback(v-if="data.phoneError")
                    | {{data.phoneError}}
                .form-group(:class="{'has-danger': data.addressError}")
                  label.small Address*
                  input.form-control.form-control-sm(v-model.trim="data.transfermodeDetails.address" type="text" placeholder="Enter Your Address")
                  small.form-control-feedback(v-if="data.addressError")
                    | {{data.addressError}}
          </template>
          </template>
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Close
          button.btn.btn-danger.waves-effect(type='button' v-if="!pageLoader && !data.error && !data.success" @click="triggerWithdrawl()") Proceed
</template>
<script>
import mixin from '../../globals/mixin'
import UserRegister from '../../globals/user-register'
import localMixin from './mixin'
import Preloader from '../preloader'
import Service from './service'
import auth from '@/auth/helpers'

function getWithdrawInitialState () {
  return {
    transactionDetails: false,
    error: false,
    transfermodeDetails: {
      mode: 'bank',
      accountNumber: '',
      IFSC: '',
      address: '',
      phone: ''
    },
    accountNumberError: false,
    IFSCError: false,
    phoneError: false,
    addressError: false,
    serverError: false,
    success: false
  }
}

export default {
  name: 'WithdrawMoney',
  service: new Service(),
  components: {
    Preloader
  },
  mixins: [mixin, UserRegister, localMixin],
  data () {
    return {
      pageLoader: true,
      id: this.getUniqueId() + '-withdraw-money-modal-',
      data: getWithdrawInitialState(),
      overviewGone: false
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
  watch: {
    'data.transfermodeDetails.mode' (newV, oldV) {
      if (newV !== oldV) {
        this.fetchOverview()
      }
    },
    'data.transfermodeDetails.accountNumber' () {
      this.validateAccountNumber()
    },
    'data.transfermodeDetails.IFSC' () {
      this.validateIFSC()
    },
    'data.transfermodeDetails.phone' () {
      this.validatePhone()
    },
    'data.transfermodeDetails.address' () {
      this.validateAddress()
    }
  },
  methods: {
    triggerPopup () {
      this.data = getWithdrawInitialState()
      document.getElementById(this.triggerButtonId).click()
      this.fetchOverview()
    },
    fetchOverview () {
      this.pageLoader = true
      this.$options.service.getWithdrawOverview(this.data.transfermodeDetails.mode)
        .then((data) => {
          this.pageLoader = false
          if (data.transaction.success) {
            this.data.transactionDetails = data.transaction
          } else {
            this.data.error = data.transaction.message
          }
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
    triggerWithdrawl () {
      if (this.validateDetails()) {
        this.overviewGone = true
        this.pageLoader = true
        this.$options.service.triggerWithdrawl(this.data.transfermodeDetails)
          .then((data) => {
            if ('ben' in data && data.ben.status === 'ERROR') {
              this.resetOverview()
              this.data.serverError = data.ben.message
            } else if (data.data.status === 'SUCCESS') {
              this.pageLoader = false
              this.serverError = false
              this.data.success = data.data.message
              auth.saveLocalRevenue(0)
            } else {
              this.resetOverview()
              this.data.serverError = 'data' in data ? data.data.message : 'Something went wrong, please try again later'
            }
          })
          .catch((tErr) => {
            this.showNotification('Something went wrong while attempting to withdraw. Please try again later.', 'error')
            this.resetOverview()
          })
      }
    },
    resetOverview () {
      this.overviewGone = false
      this.pageLoader = false
    }
  }
}
</script>

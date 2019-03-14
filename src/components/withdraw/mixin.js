export default {
  methods: {
    validateDetails () {
      return this.validateAccountNumber() && this.validateIFSC() && this.validatePhone() && this.validateAddress()
    },
    validateAccountNumber () {
      if (this.ifMode('paytm') || (this.data.transfermodeDetails.accountNumber && this.data.transfermodeDetails.accountNumber.length)) {
        this.data.accountNumberError = false
        return true
      } else {
        this.data.accountNumberError = 'Please enter a valid bank account number'
        return false
      }
    },
    validateIFSC () {
      if (this.ifMode('paytm') || (this.data.transfermodeDetails.IFSC && this.data.transfermodeDetails.IFSC.length)) {
        this.data.IFSCError = false
        return true
      } else {
        this.data.IFSCError = 'Please enter a valid IFSC'
        return false
      }
    },
    validatePhone () {
      if (this.validatePhoneNumber(this.data.transfermodeDetails.phone)) {
        this.data.phoneError = false
        return true
      } else {
        this.data.phoneError = 'Please enter a valid 10 digit phone number'
        return false
      }
    },
    validateAddress () {
      if (this.data.transfermodeDetails.address && this.data.transfermodeDetails.address.length) {
        this.data.addressError = false
        return true
      } else {
        this.data.addressError = 'Please enter a valid address'
        return false
      }
    },
    ifMode (mode) {
      return this.data.transfermodeDetails.mode === mode
    }
  }
}

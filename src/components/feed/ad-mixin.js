export default {
  methods: {
    adConsumed (post, action) {
      if (post.ConsumedAds && post.ConsumedAds.length) {
        for (let i in post.ConsumedAds) {
          if (post.ConsumedAds[i].action === action) {
            return post.ConsumedAds[i]
          }
        }
      }
      return false
    },
    getText (post, action) {
      let adConfig = this.getAdConfig(post)
      switch (action) {
        case 'impression':
          return this.getDynamicText(post, action, adConfig.cpi, 'seeing')
        case 'click':
          return this.getDynamicText(post, action, adConfig.cpc, 'clicking')
        case 'view':
          return this.getDynamicText(post, action, adConfig.cpv, 'viewing')
      }
    },
    getDynamicText (post, action, price, actionText) {
      let dynamic = 'You will get'
      if (this.isPostOwner(post)) {
        dynamic = 'You are giving'
      } else {
        if (this.adConsumed(post, action)) {
          dynamic = 'You have got'
        }
      }
      return dynamic + ' $ ' + price + ' for ' + actionText + ' this ad'
    },
    getAdConfig (post) {
      return post.AdOption
    },
    consumeAd (postObj, action) {
      this.$options.service.consumeAd(postObj.id, action)
        .then((data) => {
          if (data.ConsumedAds && data.ConsumedAds.length) {
            postObj.ConsumedAds = data.ConsumedAds
            this.updateUserTotal(data.amountAdded)
          }
        })
        .catch((aErr) => {
        })
    },
    triggerAdConsumption (postObj, action) {
      if (this.canProceedToAdConsumption(postObj, action)) {
        this.consumeAd(postObj, action)
      }
    },
    canProceedToAdConsumption (postObj, action) {
      return this.isAd(postObj) && !this.isPostOwner(postObj) && !this.adConsumed(postObj, action) && this.enableAdConsumptionOption(postObj, action)
    },
    isAd (postObj) {
      return postObj.AdOption
    },
    isPostOwner (postObj) {
      return postObj.User && postObj.User.id === this.currentUser.id
    },
    enableAdConsumptionOption (postObj, action) {
      if (this.adTargetsAcheived(postObj, action)) {
        if (!this.adConsumed(postObj, action)) {
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    },
    adTargetsAcheived (postObj, action) {
      let adConfig = this.getAdConfig(postObj)
      let adStats = adConfig.AdStat
      if (!adStats) {
        return false
      }
      switch (action) {
        case 'impression':
          return adStats.impressions >= adConfig.impressionTarget
        case 'click':
          return adStats.clicks >= adConfig.clickTarget
        case 'view':
          return adStats.views >= adConfig.viewTarget
      }
    }
  }
}

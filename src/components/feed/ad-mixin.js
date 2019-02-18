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
      if (this.adConsumed(post, action)) {
        dynamic = 'You have got'
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
          }
        })
        .catch((aErr) => {
        })
    },
    adLinkclicked (postObj) {
      if (postObj.UserId && postObj.UserId !== this.currentUser.id) {
        this.consumeAd(postObj, 'click')
      }
    },
    showAdConsumptionOption (postObj, action) {
      let adConfig = this.getAdConfig(postObj)
      let adStats = adConfig.AdStat
      switch (action) {
        case 'impression':
          return adStats.impressions < adConfig.impressionTarget
        case 'click':
          return adStats.clicks < adConfig.clickTarget
        case 'view':
          return adStats.views < adConfig.viewTarget
      }
    }
  }
}

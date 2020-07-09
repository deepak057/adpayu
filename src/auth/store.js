const defaults = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  user: {
    name: '',
    id: ''
  },
  guestId: false,
  userTags: [],
  post: {},
  options: {},
  totalRevenue: 0,
  orderId: false,
  localVideoURL: false,
  refCode: false,
  forex: false
}

const auth = {
  namespaced: true,

  state: Object.assign({}, defaults),

  mutations: {
    update (state, data) {
      state = Object.assign({}, defaults, data)
    },
    clear (state) {
      state = Object.assign(state, defaults)
    }
  },

  actions: {
    clear ({ state, commit, rootState, dispatch }) {
      commit('clear')
    },
    update ({ state, commit, rootState }, data) {
      commit('update', data)
    }
  }
}

export default auth

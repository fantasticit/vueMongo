const state = {
  theme: window.localStorage.getItem('theme') || '',
  fontSize: window.localStorage.getItem('fontSize') || 14,
}

const mutations = {
  CHANGE_FONT_SIZE(state, num) {
    window.localStorage.setItem('fontSize', num);
    state.fontSize = num;
  },

  DARK_THEME(state) {
    state.theme = 'theme-dark';
    window.localStorage.setItem('theme', 'theme-dark');
  },

  LIGHT_THEME(state) {
    state.theme = '';
    window.localStorage.setItem('theme', '');
  }
}

const actions = {
  changeFontSize({ commit }, num) {
    commit('CHANGE_FONT_SIZE', num);
  },

  darkTheme({ commit }) {
    commit('DARK_THEME');
  },

  lightTheme({ commit }) {
    commit('LIGHT_THEME');
  },
}

export default {
  state,
  mutations,
  actions
}

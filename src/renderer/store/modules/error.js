import Connect from '../../api/connect';

const state = {
  errors: [],
}

const mutations = {
  ADD_ERROR(state, err) {
    state.errors.push({...err});
  },
}

const actions = {
  addError({ commit }, err) {
    commit('ADD_ERROR', err);
  },
}

export default {
  state,
  mutations,
  actions
}

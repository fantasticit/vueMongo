import Connect from '../../api/connect';

const state = {
  errors: [],
}

const mutations = {
  ADD_ERROR(state, err) {
    console.log(state.errors);
    state.errors.push({...err});
  },
}

const actions = {
  addError({ commit }, err) {
    console.log(435343);
    commit('ADD_ERROR', err);
  },
}

export default {
  state,
  mutations,
  actions
}

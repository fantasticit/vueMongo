import Connect from '../../api/connect';

const state = {
  connections: [],
}

const mutations = {
  ADD_CONNECT(state, connect) {
    state.connections.push({...connect});
  }
}

const actions = {
  async addConnect({ commit }, connect) {
    const data = await Connect.getConnect(connect.name, connect.url);
    connect.children = data.map(collection => ({
      parent: connect.name,
      name: collection,
      url: collection
    }));
    commit('ADD_CONNECT', connect);
  }
}

export default {
  state,
  mutations,
  actions
}

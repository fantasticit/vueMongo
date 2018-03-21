import Connect from '../../api/connect';

const state = {
  connections: [],
}

const mutations = {
  ADD_CONNECT(state, connect) {
    state.connections.push({...connect});
  },

  DELETE_CONNECT(state, index) {
    state.connections.splice(index, 1)
  }
}

const actions = {
  async addConnect({ commit }, { connect, isReconnect = false }) {
    const index = state.connections.indexOf(
      state.connections.find(item => {
        return item.url === connect.url && item.name === connect.name
      })
    )

    if (index > -1 && !isReconnect) {
      // 已存在，且不是重连
      throw new Error('连接已存在')
    } else if (index > -1 && isReconnect) {
      // 已存在，但是是重连
      commit('DELETE_CONNECT', index);
    }

    const data = await Connect.getConnect(connect.name, connect.url);
    connect.children = data.map(collection => ({
      parent: connect.name,
      name: collection,
      url: collection
    }));
    commit('ADD_CONNECT', connect);
  },

  deleteConnect(connect, index = null) {
    if (!index) {
      index = state.connections.indexOf(
        state.connections.find(item => {
          return item.url === connect.url && item.name === connect.name;
        })
      );
    }
    
    commit('DELETE_CONNECT', index);
  },
}

export default {
  state,
  mutations,
  actions
}

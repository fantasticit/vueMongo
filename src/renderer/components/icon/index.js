import Vue from 'vue';
import Icon from './icon.vue';

Vue.component('icon', Icon);

// 导入所有的svg（参照webpack文档: http://webpack.github.io/docs/context.html#dynamic-requires ）
~function (requireContext) {
  return requireContext.keys().map(requireContext)
}(require.context('./svg', false, /\.svg$/))

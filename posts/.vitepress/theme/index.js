import DefaultTheme from 'vitepress/theme'
import { watch } from 'vue'

import Layout from './Layout.vue'
import '../style';
import './main.scss';

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ router }) {
    watch(
			() => router.route.path,
			(path) => {
        try {
          const _path = localStorage.getItem('pathname');
          if (_path !== router.route.path) {
            localStorage.setItem('pathname', router.route.path);
            location.reload();
          }
          const username = path?.split('/')?.[1]
          const userRoot = `${username}-app`
          if (document) {
            const rootEl = document?.querySelector('#app')
            rootEl.classList = [userRoot]
          }
        } catch(e) {}
			}
		)
  }
}

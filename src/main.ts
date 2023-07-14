import { createSSRApp } from 'vue';
import App from './App.vue';
import uviewPlus from 'uview-plus';
// import { createPinia } from 'Pinia';

export function createApp() {
  const app = createSSRApp(App);
  app.use(uviewPlus);

  // const pinia = createPinia();
  // app.use(pinia);

  return {
    app,
  };
}

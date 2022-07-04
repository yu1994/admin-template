
import packButton from '@/components/PackButton'

const install = Vue => {
  Vue.component(packButton.name, packButton);
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install
};

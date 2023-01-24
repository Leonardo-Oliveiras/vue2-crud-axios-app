import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'https://vue2-crud-axios-default-rtdb.firebaseio.com/'

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios
    }
})
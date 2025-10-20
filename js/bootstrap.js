import axios from 'axios';
window.axios = axios;
import { ALRT_ERR } from "@/comcom/ALert";

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.timeout = 9000;
axios.defaults.validateStatus = function (status) {
    if (status != 200) {
        ALRT_ERR("خطایی در سرور رخ داده است. لطفا مجددا تلاش کنید");
        return false;
    }
    return true;
};
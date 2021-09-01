import axios from "axios";

const GASKETKEY = "api=188be8f898e74a295d635c5db9c3e867865e19ea1e94899df3b0fd1e91e89dfc";
const FRONTKEY = "api=2222cb8d8bcf502e61188fc855b5b901";
const PROFFIT_FRONT_KEY = "api=ddccec580491ba0b1cfd5aed5a79d983041d2214b8f45aed5a79d98304152dca9";
// pre-relase: https://pre-relas
// dev: https://dev.dev.com

const availableDATA = axios.create({
    baseURL: `https://dev.dev.com`,
});
const instanceNew = axios.create({
    baseURL: `https://dev.dev.com/api/`,
});

export const searchAPI = {

    async getLangs() {
        return await availableDATA.get(`language/all?${FRONTKEY}`);
    },

    async getReques(params, farHub) {
        params.url = `http://${farHub.address}/api/search/find?api=${farHub.api_key}`;
        const instanceFarHub = axios.create({
            baseURL: `https://dev.dev/`,
        });
        return await instanceFarHub.post(`proxy/search/find?${GASKETKEY}`, params);
    },

    async getAuth(params) {
        return await instanceNew.post(`/customer/login?${PROFFIT_FRONT_KEY}`, params);
    },

    async getRegistration(params) {
        return await instanceNew.post(`/customer?${PROFFIT_FRONT_KEY}`, params);
    },

    async getUser(params) {
        return await instanceNew.get(`/customer/login?${PROFFIT_FRONT_KEY}`, params);
    },

    async getSendEmail(params) {
        return await instanceNew.post(`/customer/email?${PROFFIT_FRONT_KEY}`, {
            email: params,
            url: "https://test/verify/",
        });
    },

    async getVerifyEmail(token) {
        return await instanceNew.put(`/customer/email?${PROFFIT_FRONT_KEY}`, {
            token: token,
        });
    },


};

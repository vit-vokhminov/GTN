import axios from "axios";
//const ENV = process.env.REACT_APP_BASEURL;
//import {FilterType} from "../redux/reducers/aggregate";

const GASKETKEY = "api=99df3b0fd1e9b9c3e8188bed635c5d8f898e74a295e94867865e19ea11e89dfc";
//const FRONTKEY = "api=225cb8d8b02e61188fc855b5b22cf901";
const PROFFIT_FRONT_KEY = "api=ddcc2d2214b8f45aed5a79d615544dec580491ba0b1c79fd198304152dca9";
// pre-relase: https://light-search.com:8080
// dev: https://dev.light-search.com:8080

//const availableDATA = axios.create({
//    // baseURL: `https://dev.light-search.com:5555/`,
//    baseURL: `https://light-search.com:5555/`,
//});
const instanceNew = axios.create({
    baseURL: `https://dev.light-search.com:8080/api/`,
});

export const searchAPI = {
    // Локализация
    //async getLocalization(lang):Promise<FilterType> {
    async getLocalization(lang) {
        return await axios.get(`/locales/${lang}/translation.json`);
    },
    // Доступные страны
    async getCountries() {              // ! getCountries.json
       // return await availableDATA.get(`country/all?${FRONTKEY}`);
        return await axios.get(`/json/getCountries.json`);
    },
    // Доступные поисковики в выбранной стране
    async getAggregators(country) {     // ! getAggregators.json
       // return await availableDATA.post(`country/select?${FRONTKEY}`, {
       //     country,
       // });
        return await axios.get(`/json/getAggregators.json`);
    },
    // Доступные языки
    async getLangs() {                  // ! getLangs.json
        // return await availableDATA.get(`language/all?${FRONTKEY}`);
        return await axios.get(`/json/getLangs.json`);
    },
    // Поисковой запрос
    async getReques(params, farHub) {
        params.url = `http://${farHub.address}/api/search/find?api=${farHub.api_key}`;
        const instanceFarHub = axios.create({
            baseURL: `https://dev.light-search.com:8010/`,
        });
        return await instanceFarHub.post(`proxy/search/find?${GASKETKEY}`, params);
    },

    // IP
    async getIp() {
        return await instanceNew.get(`main/ip?${PROFFIT_FRONT_KEY}`);
    },
    // Попапы
    // Попап Авторизации
    async getAuth(params) {             // TODO getAuth
        return await instanceNew.post(`/customer/login?${PROFFIT_FRONT_KEY}`, params);
    },
    // Попап Регистрации
    async getRegistration(params) {     // TODO getRegistration
        return await instanceNew.post(`/customer?${PROFFIT_FRONT_KEY}`, params);
    },
    // Проверка авторизации, при входе в личный кабинет
    async getUser(params) {              // TODO getUser
        return await instanceNew.get(`/customer/login?${PROFFIT_FRONT_KEY}`, params);
    },
    // Запрос отправления подтверждения почты
    async getSendEmail(params) {        // TODO getSendEmail
        return await instanceNew.post(`/customer/email?${PROFFIT_FRONT_KEY}`, {
            email: params,
            //url: "http://localhost:3000/verify/",
            url: "https://{Вставь ссылку из env переменной, она будет менятся от сервера к серверу, host=dev.light-search.com}:8080/verify/",
        });
    },
    // Запрос подтверждения почты пользователя
    async getVerifyEmail(token) {       // TODO getVerifyEmail
        return await instanceNew.put(`/customer/email?${PROFFIT_FRONT_KEY}`, {
            token: token,
            ip: "127.0.0.1",
        });
    },
    // Запрос отправки письма смены пароля
    //async getRecoveryPassword(email) {
    //    return await instanceNew.post(`/auth/send_reset_pwd_email?${PROFFIT_FRONT_KEY}`, {
    //        email,
    //        url: "http://136.243.111.3:3000/reset_pwd_email/",
    //    });
    //},
    // Запрос подтверждения смены пароля
    //async getResetPassword({ reset_token, new_pwd, user_data }) {
    //    return await instanceNew.post(`/auth/reset_pwd?${PROFFIT_FRONT_KEY}`, {
    //        reset_token,
    //        new_pwd,
    //        user_data,
    //    });
    //},

};

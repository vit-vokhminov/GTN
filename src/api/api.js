import axios from "axios";
const baseaaaa = process.env.REACT_APP_BASEURL;
const api = "api=d9a164e49039301bbe37a4b21501b8b5";
const api2 = "api=225cb8d8b02e61188fc855b5b22cf901";
const PROFFIT_FRONT_KEY = "api=ddcc2d2214b8f45aed5a79d615544dec580491ba0b1c79fd198304152dca9";

const availableDATA = axios.create({
    baseURL: `https://thepharos.net:5555/`,
});
const instanceNew = axios.create({
    baseURL: `https://thepharos.net:8080/api/`,
});

export const searchAPI = {
    // Доступные страны
    async getCountries() {
        return await availableDATA.get(`country/all?${api2}`);
    },
    // Доступные поисковики в выбранной стране
    async getAggregators(country) {
        return await availableDATA.post(`country/select?${api2}`, {
            country,
        });
    },
    // Поисковой запрос
    async getReques(params, farHub) {console.log('!!!!!!!!!!!!!!!!!', baseaaaa)
        params.url = `http://${farHub.address}/api/search/find?api=${farHub.api_key}`;
        //params.key = `search/find?api=${farHub.api_key}`;
        const searchKey = "99df3b0fd1e9b9c3e8188bed635c5d8f898e74a295e94867865e19ea11e89dfc";
        const instanceFarHub = axios.create({
            baseURL: baseaaaa,
        });
        return await instanceFarHub.post(`proxy/search/find?api=${searchKey}`, params);
    },

    // IP
    async getIp() {
        return await instanceNew.post(`main/ip?${PROFFIT_FRONT_KEY}`);
    },
    // Попапы
    // Попап Авторизации
    async getAuth(params) {
        return await instanceNew.post(`/auth/login?${api}`, params);
    },
    // Попап Регистрации
    async getRegistration(params) {
        return await instanceNew.post(`/customer/register?${PROFFIT_FRONT_KEY}`, params);
    },
    // Проверка авторизации, при входе в личный кабинет
    async getUser(params) {
        return await instanceNew.post(`/customer/verify_email?${PROFFIT_FRONT_KEY}`, params);
    },
    // Запрос отправления подтверждения почты
    async getSendEmail(params) {
        return await instanceNew.post(`/customer/send_verify_email?${PROFFIT_FRONT_KEY}`, {
            email: params,
            url: "http://localhost:3000/verify/",
        });
    },
    // Запрос подтверждения почты пользователя
    async getVerifyEmail(token) {
        return await instanceNew.post(`/auth/verify_email?${api}`, {
            email_token: token,
        });
    },
    // Запрос отправки письма смены пароля
    async getRecoveryPassword(email) {
        return await instanceNew.post(`/auth/send_reset_pwd_email?${api}`, {
            email,
            url: "http://136.243.111.3:3000/reset_pwd_email/",
        });
    },
    // Запрос подтверждения смены пароля
    async getResetPassword({ reset_token, new_pwd, user_data }) {
        return await instanceNew.post(`/auth/reset_pwd?${api}`, {
            reset_token,
            new_pwd,
            user_data,
        });
    },
    // Доступные языки
    async getLangs() {
        return await availableDATA.get(`language/all?${api2}`);
    },
};

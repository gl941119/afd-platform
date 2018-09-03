import axios from 'axios';
import qs from 'qs';
import store from '../store';
import Cache from './cache';
import { Indicator, Toast } from 'mint-ui';
import ajaxURL from '../config';
import config from './config';
import Utils from './util.js';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? config.url.localTestUrl : config.url.productUrl;

const utils = new Utils();

axios.interceptors.request.use(config => {
    Indicator.open({
        text: 'Loading...',
        spinnerType: 'fading-circle',
    });
    return config;
}, err => {
    Indicator.close();
    return Promise.reject(err);
});

axios.interceptors.response.use(data => {
    Indicator.close();
    return data;
}, err => {
    Indicator.close();
    return Promise.reject(err);
});

async function ajaxRequest(url = '', data = {}, type = 'POST', isJson = false) {
    type = type.toUpperCase();
    url = ajaxURL[url];
    const token = store.state.token || Cache.getSession('bier_token');
    let lang = store.state.slangChange;
    if (lang === 'en') {
        lang = lang.toUpperCase();
    }
    if (type === 'GET') {
        return token ? axios.get(url, {
            params: data,
            headers: {
                token,
                lang,
            },
        })
            : axios.get(url, {
                params: data,
                headers: {
                    token,
                    lang,
                },
            });
    } else if (type === 'POST') {
        if (isJson) {
            return token ? axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                    token,
                    lang,
                },
            })
                : axios.post(url, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        lang,
                    },
                });
        }
        return token ? axios.post(url, qs.stringify(data), {
            headers: { token, lang },
        }) : axios.post(url, qs.stringify(data), {
            headers: { lang },
        });
    } else if (type === 'PUT') {
        return token ? axios.put(url, data, {
            headers: { token, lang },
        })
            : axios.put(url, data, {
                headers: { token, lang },
            });
    } else if (type === 'DELETE') {
        return token ? axios.delete(url, {
            params: data,
            headers: { token },
        })
            : axios.delete(url, { headers: { token }, params: data });
    }
}

/**
 * require
 * @param {Object} params -> (url: String, [data: Object, type: 'POST'(default)/'GET', flag: Boolean])
 * @param params.url -> config define String, required
 * @param params.data -> require data object
 * @param params.type -> require method, default 'POST'
 * @param params.flag -> json require, default false
 */
function requestHandle(params) {
    const { url, data, type, flag, feedback = true } = params;
    return new Promise((resolve, reject) => {
        ajaxRequest(url, data, type, flag).then(
            res => {
                const { data, success, message } = res.data;

                // console.log('requestHandle-[%s]->', url, res.data);
                if (success === 1) {
                    resolve(res.data);
                } else {
                    if (data && data.islogin) {
                        store.commit('setUserId', undefined);
                        store.commit('setUserName', undefined);
                        store.commit('setUserNickName', undefined);
                        store.commit('setToken', undefined);
                        Cache.removeSession('bier_username');
                        Cache.removeSession('bier_token');
                        Cache.removeSession('bier_userid');
                        Cache.getSession('bier_usernickname') && Cache.removeSession('bier_usernickname');
                        // location.href = "/index";
                    }
                    reject(res.data);
                    if (feedback) {
                        Toast(utils.judgeLanguage(utils.getCurrLanguage(store), message));
                    }
                }
            },
            rej => {
                console.error('[%s] error', url, rej);
                reject(rej);
            }
        );
    });
}

export default requestHandle;

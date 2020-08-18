import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://sportstats-ru.firebaseio.com/'
});

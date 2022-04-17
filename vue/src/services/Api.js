import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL

console.log(
    process.env.VUE_APP_API_BASE_URL
)

const axiosClient = axios.create({
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

class REST {
    constructor(PATH) {
        this.path = PATH
    }

    all(query = {}) {
        return axiosClient.get(`/${this.path}`, query)
    }

    find(id) {
        return axiosClient.get(`/${this.path}/${id}`)
    }

    create(data) {
        return axiosClient.post(`/${this.path}`, data)
    }

    update(id, data) {
        return axiosClient.patch(`/${this.path}/${id}`, data)
    }

    delete(id) {
        return axiosClient.delete(`/${this.path}/${id}`)
    }
}

export default {
    banks: new REST('banks')
}
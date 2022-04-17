import Vue from 'vue'
import Vuex from 'vuex'
import Api from "../services/Api";

Vue.use(Vuex)

export const MUTATIONS = {
    SET_BANKS: 'set_banks',
    ADD_BANK: 'add_bank',
    UPDATE_BANK: 'update_bank',
    DELETE_BANK: 'delete_bank',
    SET_BANKS_LOADING: 'set_banks_loading',
}

export const ACTIONS = {
    LOAD_BANKS: 'load_banks',
    ADD_BANK: 'add_bank',
    UPDATE_BANK: 'update_bank',
    DELETE_BANK: 'delete_bank',
}

export default new Vuex.Store({
    state: {
        banks: [],
        banksLoading: false,
    },
    mutations: {
        [MUTATIONS.SET_BANKS](state, payload) {
            state.banks = payload ? payload : []
        },
        [MUTATIONS.ADD_BANK](state, payload) {
            state.banks.push(payload)
        },
        [MUTATIONS.UPDATE_BANK](state, payload) {
            const idx = state.banks.findIndex(i => i.id === payload.id)

            if (idx !== -1) {
                state.banks[idx] = payload
            }
        },
        [MUTATIONS.DELETE_BANK](state, payload) {
            const idx = state.banks.findIndex(i => i.id === payload)

            if (idx !== -1) {
                state.banks.splice(idx, 1)
            }
        },
        [MUTATIONS.SET_BANKS_LOADING](state, payload) {
            state.banksLoading = payload
        },
    },
    actions: {
        [ACTIONS.LOAD_BANKS](context) {
            context.commit(MUTATIONS.SET_BANKS_LOADING, true)

            Api.banks.all().then(res => {
                context.commit(MUTATIONS.SET_BANKS, res.data)
                context.commit(MUTATIONS.SET_BANKS_LOADING, false)
            })
        },
        [ACTIONS.ADD_BANK](context, payload) {
            return createUpdate(context, () => Api.banks.create(payload), MUTATIONS.ADD_BANK)
        },
        [ACTIONS.UPDATE_BANK](context, payload) {
            return createUpdate(context, () => Api.banks.update(payload.id, payload.data), MUTATIONS.UPDATE_BANK)
        },
        [ACTIONS.DELETE_BANK](context, payload) {
            return new Promise((resolve, reject) => {
                Api.banks
                    .delete(payload)
                    .then(() => {
                        context.commit(MUTATIONS.DELETE_BANK, payload)
                        resolve(payload)
                    })
                    .catch(error => {
                        reject(error.response)
                    })
            })
        },
    },
    modules: {}
})

const createUpdate = (context, apiAction, mutation) => {
    return new Promise((resolve, reject) => {
        apiAction()
            .then(res => {
                context.commit(mutation, res.data)
                resolve(res)
            })
            .catch(error => {
                reject(error.response)
            })
    })
}

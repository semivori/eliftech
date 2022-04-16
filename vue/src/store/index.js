import Vue from 'vue'
import Vuex from 'vuex'
import Api from "../services/Api";

Vue.use(Vuex)

export const MUTATIONS = {
    SET_BANKS: 'set_banks',
    ADD_BANK: 'add_bank',
    UPDATE_BANK: 'update_bank',
    DELETE_BANK: 'delete_bank',
}

export const ACTIONS = {
    LOAD_BANKS: 'load_banks',
    ADD_BANK: 'add_bank',
    UPDATE_BANK: 'update_bank',
    DELETE_BANK: 'delete_bank',
}

export default new Vuex.Store({
    state: {
        banks: []
    },
    mutations: {
        [MUTATIONS.SET_BANKS](state, payload) {
            state.banks = payload ? payload : []
            console.log(
                state.banks
            )
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
    },
    actions: {
        [ACTIONS.LOAD_BANKS](context) {
            Api.banks.all().then(res => context.commit(MUTATIONS.SET_BANKS, res.data))
        },
        [ACTIONS.ADD_BANK](context, payload) {
            return new Promise((resolve, reject) => {
                Api.banks.create(payload)
                    .then(res => {
                        context.commit(MUTATIONS.ADD_BANK, res.data)
                        resolve(res)
                    })
                    .catch(error => {
                        reject(error.response)
                    })
            })
        },
        [ACTIONS.UPDATE_BANK](context, payload) {
            Api.banks.update(payload.id, payload.data).then(res => context.commit(MUTATIONS.UPDATE_BANK, res.data.model))
        },
        [ACTIONS.DELETE_BANK](context, payload) {
            Api.banks.update(payload).then(res => context.commit(MUTATIONS.DELETE_BANK, res.data.id))
        },
    },
    modules: {}
})

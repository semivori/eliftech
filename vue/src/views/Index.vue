<template>
  <div>
    <div class="row mb-2">
      <div class="col-12 col-sm-4">
        <h4>Banks Management</h4>
      </div>
      <div class="col-12 col-sm-8 text-right">
        <button class="btn btn-primary" @click="showAddForm = true">
          <i class="bi bi-plus"></i>
          Add Bank
        </button>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-sm table-striped">
        <thead class="bg-primary text-white">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Interest Rate</th>
          <th>Maximum Loan</th>
          <th>Minimum Down Payment</th>
          <th>Loan Term</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <template v-if="banks && banks.length">
          <tr v-for="(bank, idx) in banks" :key="bank.id">
            <td>{{ idx + 1 }}</td>
            <td>{{ bank.name }}</td>
            <td>{{ bank.interest_rate }}</td>
            <td>{{ bank.max_loan }}</td>
            <td>{{ bank.down_payment }}</td>
            <td>{{ bank.loan_term }}</td>
            <td>
              <button class="btn btn-sm btn-dark mr-1" @click="uBank = bank">
                <i class="bi bi-pen"></i>
              </button>
              <button class="btn btn-sm btn-danger" @click="deleteBank(bank.id)">
                <i class="bi bi-trash3"></i>
              </button>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="100%">
            <template v-if="banksLoading">Loading...</template>
            <template v-else>No banks yet.</template>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <Modal v-if="showAddForm" @close="showAddForm = false" :loading="addLoading">
      <template v-slot:header>
        Add Bank
      </template>
      <Form @submit="addBank" ref="addForm"/>
      <template v-slot:footer>
        <button type="button" class="btn btn-secondary btn-block" @click="showAddForm = false">
          Cancel
        </button>
      </template>
    </Modal>

    <Modal v-if="uBank" @close="uBank = null">
      <template v-slot:header>
        Update Bank
      </template>
      <Form :item="uBank" @submit="updateBank"/>
      <template v-slot:footer>
        <button type="button" class="btn btn-secondary btn-block" @click="uBank = null">
          Cancel
        </button>
      </template>
    </Modal>

    <div class="notifications">
      <div v-for="n in notifications" :key="n.id" :class="`alert-${n.type}`" class="alert" role="alert">
        {{ n.text }}
      </div>
    </div>

  </div>
</template>

<script>
import {ACTIONS} from "../store";
import Modal from "../components/Modal";
import Form from "../components/bank/Form";

export default {
  name: "Index",
  components: {Form, Modal},
  data() {
    return {
      showAddForm: false,
      uBank: null,
      formErrors: {},
      addLoading: false,
      updateLoading: false,
      notifications: [],
    }
  },
  computed: {
    banks() {
      return this.$store.state.banks
    },
    banksLoading() {
      return this.$store.state.banksLoading
    },
  },
  methods: {
    addBank(payload) {
      this.addLoading = true
      this.$store
          .dispatch(ACTIONS.ADD_BANK, payload.data)
          .then(() => {
            this.showAddForm = false
            this.notify('success', 'Success!')
          })
          .catch(r => {
            this.handleError(r, this.$refs.addForm)
          })
          .finally(() => {
            this.addLoading = false
          })
    },
    updateBank(payload) {
      this.updateLoading = true
      this.$store
          .dispatch(ACTIONS.UPDATE_BANK, {id: payload.id, data: payload.data})
          .then(() => {
            this.uBank = null
            this.notify('success', 'Success!')
          })
          .catch(r => {
            this.handleError(r, this.$refs.addForm)
          })
          .finally(() => {
            this.updateLoading = false
          })
    },
    deleteBank(id) {
      const c = confirm('Are you sure?')
      if (c) {
        this.$store
            .dispatch(ACTIONS.DELETE_BANK, id)
            .then(() => {
              this.notify('success', 'Success!')
            })
            .catch(r => {
              let error = 'Oops! Something went wrong :('
              if (r?.data?.message) {
                error = r.data.message
              }
              this.notify('danger', error)
            })
      }
    },
    notify(type, text) {
      const id = Date.now() + type

      this.notifications.push({
        id: id,
        type: type,
        text: text,
      })

      setTimeout(() => {
        const idx = this.notifications.findIndex(i => i.id === id)

        if (idx !== -1) {
          this.notifications.splice(idx, 1)
        }
      }, 2000)
    },
    handleError(r, form) {
      if (r.status === 422) {
        if (r.data && r.data.length) {
          const errors = {}
          r.data.forEach(e => {
            if (!errors[e.field]) {
              errors[e.field] = []
            }

            errors[e.field].push(e.message)
          })

          if (form) {
            form.setErrors(errors);
          }
        }
      }
    }
  },
  mounted() {
    this.$store.dispatch(ACTIONS.LOAD_BANKS)
  },
}
</script>

<style scoped>
.notifications {
  position: absolute;
  top: 10px;
  right: 10px;
}
.alert {
  min-width: 120px;
}
</style>

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
              <button class="btn btn-sm btn-dark" @click="uBank = bank">
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
            No banks yet.
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <Modal v-if="showAddForm" @close="showAddForm = false">
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

  </div>
</template>

<script>
import {ACTIONS} from "../../store";
import Modal from "../../components/Modal";
import Form from "../../components/bank/Form";

export default {
  name: "Index",
  components: {Form, Modal},
  data() {
    return {
      showAddForm: false,
      uBank: null,
      formErrors: {},
    }
  },
  computed: {
    banks() {
      return this.$store.state.banks
    },
  },
  methods: {
    addBank(payload) {
      this.$store.dispatch(ACTIONS.ADD_BANK, payload.data)
          .then(r => {
            this.handleResponse(r)
          })
          .catch(r => {
            this.handleResponse(r, this.$refs.addForm)
          })
    },
    updateBank(payload) {
      this.$store.dispatch(ACTIONS.UPDATE_BANK, {id: payload.id, data: payload.data})
    },
    deleteBank(id) {
      const c = confirm('Are you sure?')
      if (c) {
        this.$store.dispatch(ACTIONS.DELETE_BANK, id)
      }
    },
    handleResponse(r, form) {
      console.log(
          r.status
      )
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

</style>

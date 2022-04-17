<template>
  <ValidationObserver ref="form" v-slot="{ valid, touched }">
    <div class="row">
      <div class="col-sm-6">

        <form action="">
          <Field v-model="initialLoan" label="Initial Loan" type="number" :rules="initialLoanRules"/>
          <Field v-model="downPayment" label="Down Payment" type="number" :rules="downPaymentRules"/>
        </form>

        <div class="row form-group required">
          <label class="col-form-label col-sm-4">
            <b>Bank</b>
          </label>
          <div class="col-sm-8">
            <select v-model="bankId" class="form-control">
              <option value=""></option>
              <option v-for="b in banks" :key="b.id" :value="b.id">
                {{ b.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div v-if="bank" class="bg-light px-2 border border-dark border-bottom-0">
          <div class="mb-1">
            <b>Bank:</b> {{ bank.name }}
          </div>
          <div class="mb-1">
            <b>Interest Rate:</b> {{ bank.interest_rate }}
          </div>
          <div class="mb-1">
            <b>Max Loan:</b> {{ bank.max_loan }}
          </div>
          <div class="mb-1">
            <b>Min Down Payment:</b> {{ bank.down_payment }}
          </div>
          <div>
            <b>Loan Term:</b> {{ bank.loan_term }}
          </div>
        </div>
        <template v-if="valid">
          <div v-if="monthlyPayment !== null" class="bg-secondary text-white p-2">
            <b>Monthly Payment: {{ monthlyPayment }}</b>
          </div>
        </template>
        <template v-if="touched && !valid && initialLoan > 0">
          <div class="bg-warning p-2">
            <b>Invalid Data</b>
          </div>
        </template>
      </div>
    </div>
  </ValidationObserver>
</template>

<script>
import Field from "../components/form/Field";
import {ACTIONS} from "../store";

export default {
  name: "Calculator",
  components: {Field},
  data: () => ({
    initialLoan: null,
    downPayment: null,
    bankId: null,
  }),
  computed: {
    banks() {
      return this.$store.state.banks
    },
    banksLoading() {
      return this.$store.state.banksLoading
    },
    bank() {
      if (this.bankId) {
        return this.banks.find(i => i.id === this.bankId)
      }

      return null
    },
    downPaymentRules() {
      let r = 'integer'
      let min = 0

      if (this.initialLoan) {
        r += '|max_value:' + (this.initialLoan - 1)
      }

      if (this?.bank?.down_payment) {
        r += '|required'
        min = this.bank.down_payment
      }

      r += `|min_value:${min}`

      return r
    },
    initialLoanRules() {
      let r = 'required|integer'
      let min = 0

      if (this?.bank?.max_loan) {
        r += '|max_value:' + this.bank.max_loan
      }

      if (this?.bank?.down_payment) {
        r += '|required'
        min = this.bank.down_payment + 1
      }

      r += `|min_value:${min}`

      return r
    },
    monthlyPayment() {
      if (this.initialLoan && this.bank) {
        let downPayment = this.downPayment ? this.downPayment : 0
        let amountBorrowed = this.initialLoan - downPayment
        let rate = this.bank.interest_rate / 100
        let coef = Math.pow(1 + (rate / 12), this.bank.loan_term)
        let payment = (amountBorrowed * (rate / 12) * coef) / (coef - 1)

        return Math.round((payment + Number.EPSILON) * 100) / 100
      }

      return null
    },
  },
  mounted() {
    this.$store.dispatch(ACTIONS.LOAD_BANKS)
  },
  watch: {
    bankId(val) {
      if (val !== null) {
        this.$refs.form.validate({silent: false})
      }
    }
  }
}
</script>

<style scoped>

</style>

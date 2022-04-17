<template>
  <ValidationObserver ref="form" v-slot="{ invalid }">
    <form @submit.prevent="submit">
      <Field v-model="name" vid="name" label="Name" rules="required|min:2|max:128"/>
      <Field
          v-model="interest_rate"
          vid="interest_rate"
          label="Interest Rate"
          type="number"
          rules="required|double|min_value:0.01|max_value:100"
      />
      <Field
          v-model="max_loan"
          vid="max_loan"
          label="Max Loan"
          type="number"
          rules="required|integer|min_value:1"
      />
      <Field
          v-model="down_payment"
          vid="down_payment"
          label="Min Down Payment"
          type="number"
          :rules="downPaymentRules"
      />
      <Field
          v-model="loan_term"
          vid="loan_term"
          label="Loan Term"
          type="number"
          rules="required|integer|min_value:1|max_value:360"
      />
      <button class="btn btn-primary btn-block" :disabled="invalid">
        Save
      </button>
    </form>
  </ValidationObserver>
</template>

<script>
import Field from "../form/Field";

export default {
  name: "Form",
  components: {Field},
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      name: this?.item?.name ?? 'Test Bank',
      interest_rate: this?.item?.interest_rate ?? 4,
      max_loan: this?.item?.max_loan ?? 100000,
      down_payment: this?.item?.down_payment ?? 1000,
      loan_term: this?.item?.loan_term ?? 120,
    }
  },
  computed: {
    downPaymentRules() {
      let r = 'required|integer|min_value:0'
      if (this.max_loan) {
        r += '|max_value:' + (this.max_loan - 1)
      }

      return r
    },
  },
  methods: {
    submit() {
      this.$emit('submit', {
        data: {
          name: this.name,
          interest_rate: this.interest_rate,
          max_loan: this.max_loan,
          down_payment: this.down_payment,
          loan_term: this.loan_term,
        },
        id: this?.item?.id,
      })
    },
    setErrors(v) {
      console.log(
          v, this.$refs.form
      )
      this.$refs.form.setErrors(v);
    },
  }
}
</script>

<style scoped>

</style>
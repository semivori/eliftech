<template>
  <div class="table-responsive">
    <table class="table-sm table-striped">
      <thead>
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

      </tbody>
    </table>
  </div>
</template>

<script>
import {ACTIONS} from "../../store";

export default {
  name: "List",
  computed: {
    items() {
      return this.$store.state.banks
    }
  },
  mounted() {
    this.$store.dispatch(ACTIONS.LOAD_BANKS)
  }
}
</script>

<style scoped>

</style>

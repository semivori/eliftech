<template>
  <div>
    <div class="modal" tabindex="-1" @click.self="close()">
      <div class="modal-dialog" :class="cssClass">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <slot name="header"></slot>
            </h5>
            <button v-show="!loading" type="button" class="close" @click="close()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot v-show="!loading"></slot>
            <div v-show="loading" class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
          <div v-show="!loading" class="modal-footer">
            <slot name="footer"/>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    size: {
      type: String,
      default: () => 'lg',
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    cssClass() {
      return [`modal-${this.size}`]
    }
  },
  methods: {
    close() {
      if (!this.loading) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style scoped>
.modal {
  display: block;
}
</style>

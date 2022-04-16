<template>
  <div>
    <div class="modal" tabindex="-1" @click.self="$emit('close')">
      <div class="modal-dialog" :class="cssClass">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <slot name="header"></slot>
            </h5>
            <button type="button" class="close" @click="$emit('close')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
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
      default: () => ('lg'),
    }
  },
  computed: {
    cssClass() {
      return [`modal-${this.size}`]
    }
  },
}
</script>

<style scoped>
.modal {
  display: block;
}
</style>

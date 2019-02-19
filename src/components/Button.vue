<template>
  <button @click="handleClick" :class="classes">{{label}}</button>
</template>

<script>
export default {
  props: { value: Number, active: Boolean, onClick: Function, label: String },
  computed: {
    classes: ({ active }) => active && 'active'
    // label: ({ value }) => `${value / 60} min`
  },
  methods: {
    handleClick: function({ value }) {
      this.$emit('onClick', this.value);
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  box-sizing: border-box;
  width: 7rem;
  width: 30%;
  height: 2rem;
  margin: 0.3rem;

  background: none;
  border-radius: 0.5rem;
  color: var(--light);
  border: 1px solid var(--light);
  outline: none;

  cursor: pointer;

  &.active,
  &:hover {
    // border-bottom-width: 5px;
    color: var(--primary);
    border-color: var(--primary);
  }
}
</style>


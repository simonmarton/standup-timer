<template>
  <div @click="handleClick" :class="classes">{{label}}</div>
</template>

<script>
export default {
  props: { value: Number, active: Boolean, onClick: Function, label: String },
  computed: {
    classes: ({ active }) => active && 'active'
    // label: ({ value }) => `${value / 60} min`
  },
  methods: {
    handleClick: function() {
      this.$emit('onClick', this.value);
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 30%;
  height: 1.6rem;
  margin: 0.1rem 0.3rem;

  border-radius: 0.5rem;
  color: var(--light);
  border: 1px solid var(--light);
  outline: none;
  font-family: sans-serif;
  font-size: 0.8rem;

  cursor: pointer;

  &.active,
  &:hover {
    // border-bottom-width: 5px;
    color: var(--primary);
    border-color: var(--primary);
  }
}
</style>


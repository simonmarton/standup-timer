<template>
  <div @click="handleClick" :class="classes">{{label}}</div>
</template>

<script>
import cx from 'classnames';

export default {
  props: {
    value: Number,
    active: Boolean,
    onClick: Function,
    label: String,
    overtime: Boolean
  },
  computed: {
    classes: ({ active, overtime }) => cx({ active, overtime })
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
    --color: var(--primary);

    &.overtime {
      --color: var(--warning);
    }

    color: var(--color);
    border-color: var(--color);
  }
}
</style>


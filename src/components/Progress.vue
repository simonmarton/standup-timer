<template>
  <div :class="classnames" :style="{ width }"></div>
</template>

<script>
import cx from 'classnames';

export default {
  props: { value: Number, compact: Boolean, overtime: Boolean },
  computed: {
    width: ({ value }) => `${Math.min(value, 100)}%`,
    classnames: ({ compact, overtime }) => cx('progress', { compact, overtime })
  }
};
</script>

<style lang="scss" scoped>
.progress {
  // position: absolute;
  width: 0;
  height: 0.4rem;
  background: var(--primary);
  transition: all 0.25s;

  &.compact {
    height: 0.2rem;
  }

  &.overtime {
    background: var(--warning);
  }
}
</style>

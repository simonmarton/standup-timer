<template>
  <div class="container">
    <h3 :class="classes">{{ time }}</h3>
  </div>
</template>

<script>
import cx from 'classnames';

export default {
  props: { totalSeconds: Number, overtime: Boolean, big: Boolean },
  computed: {
    time: function() {
      const minutes = `${Math.floor(
        Math.abs(this.totalSeconds) / 60
      )}`.padStart(2, '0');
      const seconds = `${Math.abs(this.totalSeconds) - minutes * 60}`.padStart(
        2,
        '0'
      );

      return `${minutes}:${seconds}`;
    },
    classes: ({ overtime, big }) => cx({ overtime, big })
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
}

h3 {
  font-size: 22vw;
  font-weight: normal;
  color: var(--primary);
  transition: all 0.25s;

  pointer-events: none;
  user-select: none;

  &.done,
  &.overtime {
    color: var(--warning);
  }

  &.big {
    font-size: 32vw;
  }
}
</style>


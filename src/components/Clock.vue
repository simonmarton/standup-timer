<template>
  <h3 :class="classes">{{ time }}</h3>
</template>

<script>
export default {
  props: { totalSeconds: Number },
  computed: {
    time: function() {
      const minutes = `${Math.floor(this.totalSeconds / 60)}`.padStart(2, '0');
      const seconds = `${this.totalSeconds - minutes * 60}`.padStart(2, '0');

      return `${minutes}:${seconds}`;
    },
    classes: ({ totalSeconds }) => totalSeconds <= 2 && 'done'
  }
};
</script>

<style lang="scss">
h3 {
  font-size: 25vw;
  font-weight: normal;
  color: var(--primary);
  transition: color 2s;

  &.done {
    color: var(--warning);
  }
}
</style>


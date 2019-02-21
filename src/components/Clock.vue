<template>
  <div class="container">
    <h3 :class="classes">{{ time }}</h3>
  </div>
</template>

<script>
export default {
  props: { totalSeconds: Number },
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
    // classes: ({ totalSeconds }) => totalSeconds <= 2 && 'done'
    classes: ({ totalSeconds }) => totalSeconds <= 0 && 'overtime'
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
  font-size: 30vw;
  font-weight: normal;
  color: var(--primary);
  transition: color 1s;

  pointer-events: none;
  user-select: none;

  &.done,
  &.overtime {
    color: var(--warning);
  }
}
</style>


<template>
  <div id="app" style="-webkit-app-region: drag">
    <Progress :value="progressValue" :compact="hideUI" :overtime="overtime"/>
    <Clock :totalSeconds="value" :big="hideUI" :overtime="overtime"/>
    <div :class="buttonGroupClassnames">
      <Button
        @onClick="reset"
        :active="isActive(60)"
        :value="60"
        label="1 min"
        :overtime="overtime"
      />
      <Button
        @onClick="reset"
        :active="isActive(300)"
        :value="300"
        label="5 min"
        :overtime="overtime"
      />
      <Button
        @onClick="reset"
        :active="isActive(600)"
        :value="600"
        label="10 min"
        :overtime="overtime"
      />
    </div>
  </div>
</template>

<script>
import cx from 'classnames';

import Clock from './components/Clock.vue';
import Button from './components/Button.vue';
import Progress from './components/Progress.vue';

import sound from './assets/timer-ring.mp3';

const ONE_SECOND = 1000;
const HIDE_UI_DEPLAY = ONE_SECOND * 2;

export default {
  components: {
    Clock,
    Button,
    Progress
  },
  name: 'app',
  data: () => ({
    audio: null,
    value: null,
    originalValue: 60, // TODO: read from localStorage
    hideUI: false,
    progressValue: 0,
    startedAt: 0
  }),
  computed: {
    buttonGroupClassnames: ({ hideUI }) => cx('buttons', { hidden: hideUI }),
    overtime: ({ value }) => value <= 0
  },
  methods: {
    ended: function() {
      // clearInterval(this.counter);
      this.audio.play();
    },
    reset: function(value) {
      this.value = value;
      this.originalValue = value;
      this.startedAt = Date.now();

      clearInterval(this.counter);
      this.counter = setInterval(() => {
        this.$data.value--;
        if (this.$data.value === 0) {
          this.ended();
        }
      }, ONE_SECOND);
    },
    isActive: function(value) {
      return value === this.originalValue;
    },
    update: function() {
      const now = Date.now();
      this.$data.hideUI = now - this.$data.lastMouseEvtTime > HIDE_UI_DEPLAY;

      this.progressValue = (now - this.startedAt) / this.originalValue / 10;

      requestAnimationFrame(this.update);
    }
  },
  mounted: function() {
    this.$data.audio = new Audio(sound);
    this.$data.lastMouseEvtTime = Date.now();

    document.onmousemove = () => {
      this.$data.lastMouseEvtTime = Date.now();
    };

    this.update();

    this.reset(this.$data.originalValue);
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono');

:root {
  --primary: #492f5c;
  --primary: #760fc3;
  --light: #acacac;
  --warning: #ff2158;
}

* {
  padding: 0;
  margin: 0;
  user-select: none;
}

body {
  overflow: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;

  font-family: 'Roboto Mono', monospace;

  font-weight: 200;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.6rem;
  opacity: 1;

  transition: all 0.25s;

  &.hidden {
    height: 0;
    opacity: 0;
  }

  &:hover {
    height: 2.6rem;
    opacity: 1;
  }
}
</style>

<template>
  <div id="app" style="-webkit-app-region: drag">
    <Clock :totalSeconds="value"/>
    <div :class="buttonGroupClassnames">
      <!-- <Button @onClick="reset" :active="isActive(5)" :value="5" label="5 sec"/> -->
      <Button @onClick="reset" :active="isActive(60)" :value="60" label="1 min"/>
      <Button @onClick="reset" :active="isActive(240)" :value="240" label="4 min"/>
      <Button @onClick="reset" :active="isActive(900)" :value="900" label="15 min"/>
    </div>
  </div>
</template>

<script>
import cx from 'classnames';

import Clock from './components/Clock.vue';
import Button from './components/Button.vue';
import sound from './assets/timer-ring.mp3';

const ONE_SECOND = 1000;
const HIDE_UI_DEPLAY = ONE_SECOND * 2;

export default {
  name: 'app',
  data: () => ({
    audio: null,
    value: null,
    originalValue: 60, // TODO: read from localStorage
    hideUI: false
  }),
  computed: {
    buttonGroupClassnames: ({ hideUI }) => cx('buttons', { hidden: hideUI })
  },
  methods: {
    ended: function() {
      // clearInterval(this.counter);
      this.audio.play();
    },
    reset: function(value) {
      this.value = value;
      this.originalValue = value;

      clearInterval(this.counter);
      this.counter = setInterval(() => {
        this.$data.value--;
        if (this.$data.value === 0) {
          this.ended();
        }
      }, ONE_SECOND);
    },
    isActive: function(value) {
      // console.log('isActive', value, this.originalValue, this.value);

      return value === this.originalValue;
    },
    update: function() {
      this.$data.hideUI =
        Date.now() - this.$data.lastMouseEvtTime > HIDE_UI_DEPLAY;

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
  },
  components: {
    Clock,
    Button
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono');

:root {
  --primary: #683d87;
  --light: #acacac;
  --warning: #ff2158;
}

* {
  padding: 0;
  margin: 0;
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

  transition: 0.25s all;

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

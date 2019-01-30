<template>
  <div id="app">
    <Clock :totalSeconds="value"/>
    <div class="buttons">
      <Button @onClick="reset" :active="isActive(5)" :value="5" label="5 sec"/>
      <Button @onClick="reset" :active="isActive(60)" :value="60" label="1 min"/>
      <Button @onClick="reset" :active="isActive(300)" :value="300" label="5 min"/>
      <Button @onClick="reset" :active="isActive(900)" :value="900" label="15 min"/>
    </div>
  </div>
</template>

<script>
import Clock from './components/Clock.vue';
import Button from './components/Button.vue';

const ONE_SECOND = 1000;

export default {
  name: 'app',
  data: () => ({
    value: null,
    originalValue: 5 // TODO: read from localStorage
  }),
  methods: {
    ended: function() {
      clearInterval(this.counter);
    },
    reset: function(value) {
      this.value = value;
      this.originalValue = value;
    },
    isActive: function(value) {
      // console.log('isActive', value, this.originalValue, this.value);

      return value === this.originalValue;
    }
  },
  mounted: function() {
    this.$data.value = this.$data.originalValue;

    this.counter = setInterval(() => {
      this.$data.value--;
      if (this.$data.value === 0) {
        this.ended();
      }
    }, ONE_SECOND);
  },
  components: {
    Clock,
    Button
  }
};
</script>

<style>
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
}
</style>

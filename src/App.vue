<template>
  <div id="app">
    <Clock :totalSeconds="seconds"/>
    <div class="buttons">
      <Button @click="reset" active label="1m"/>
      <Button label="4m"/>
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
    seconds: 60
  }),
  methods: {
    ended: function() {
      clearInterval(this.counter);
    },
    reset: () => {
      console.log('asdasd');
    }
  },
  mounted: function() {
    this.counter = setInterval(() => {
      this.$data.seconds--;
      if (this.$data.seconds === 0) {
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

* {
  padding: 0;
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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

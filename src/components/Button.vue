<template>
  <button @click="click" :class="classes">{{label}}</button>
</template>

<script>
export default {
  props: { label: String, active: Boolean, click: Function },
  computed: {
    classes: ({ active }) => active && 'active'
  },
  methods: {
    click: vm => {
      console.log(vm);
    }
  }
};
</script>

<style>
button {
  /* padding: 1rem 2rem; */
  height: 2rem;
  width: 3rem;
  margin: 0.3rem;
  box-sizing: border-box;
}

button.active {
  border-bottom-width: 5px;
}
</style>


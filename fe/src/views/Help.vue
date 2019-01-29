<template>
  <div class="about">
    <h1> {{title}} </h1>
    <button @click="test"> test </button>
    <v-btn :color="btnColor" @click="test"> test </v-btn>
    <v-chip close color="primary"> example chip </v-chip>
    <v-chip v-for="chip in chips" :color="chip.cl"> {{chip.name}} </v-chip>
  </div>
</template>

<script>
export default {
  name: 'help',
  data () {
    return {
      title: 'Vuetify.js',
      btnColor: 'success',
      chips: [
        {
          cl: 'primary',
          name: 'a'
        },
        {
          cl: 'secondary',
          name: 'b'
        },
        {
          cl: 'green',
          name: 'c'
        },
        {
          cl: 'warning',
          name: 'd'
        }
      ]
    }
  },
  methods: {
    test () {
      this.title = 'test'
      this.btnColor = 'warning'
      console.log('test button is clicked')
    }
  }
}
</script>
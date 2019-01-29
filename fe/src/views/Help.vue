<template>
  <div class="about">
    <h1> {{title}} </h1>
    <v-btn :color="btnColor" @click="test"> create </v-btn>
    <v-btn color="primary" @click="rm"> remove </v-btn>
    <v-chip close color="primary"> example chip </v-chip>
    <v-chip v-for="chip in chips" :key="chip.name" :color="chip.cl"> {{chip.name}} </v-chip>
    <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3 v-for="card in cards" :key="card.name">
      <v-card>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
          aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{card.name}}</h3>
            <div>{{card.age}}</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
export default {
  name: 'help',
  data () {
    return {
      cards: [
      /*
        {
          name: 'test1',
          age: 33
        },
        {
          name: 'test2',
          age: 31
        }
      */
      ],
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
      this.title = 'HELP PAGE'
      this.btnColor = 'warning'
      console.log('test button is clicked')
      const card = {
        name: `CY + ${Math.random()}`
      }
      card.age = Math.random()
      this.cards.push(card)
    },
    rm () {
      this.cards.shift()
    }
  }
}
</script>

/* eslint-disable */
<template>
  <v-container grid-list-md text-xs-center>
    <v-textarea
          outline
          name="input-7-4"
          label="Outline textarea"
          v-model="ta"
        ></v-textarea>
    <v-layout row wrap>
      <v-flex xs12 sm6 md3 v-for="x in 4" :key="x">
        <v-card height="100%">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
        >
        </v-img>

        <v-card-title primary-title>
          <div>
            <v-chip v-if="x < 4"> {{x}}</v-chip>
            <div class="headline">Top western road trips</div>
            <span class="grey--text">1,000 miles of wonder</span>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat>Share</v-btn>
          <v-btn flat color="purple">Explore</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-slide-y-transition>
          <v-card-text v-show="show">
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      ta: 'debug',
      show: false
    }
  },
  mounted () {
    this.ta = this.$vuetify.breakpoint
    // console.log(this.$vuetify.breakpoint)
  }
}
</script>

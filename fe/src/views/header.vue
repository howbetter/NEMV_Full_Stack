<template>
  <v-container>
    <v-btn @click="headerSend">헤더 전송 </v-btn>
    <v-btn @click="headerSend2">헤더 전송2 </v-btn>
  </v-container>
</template>

<script type="text/javascript">
import axios from 'axios'

export default {
  methods: {
    headerSend () {
      axios.get(`${this.$apiRootPath}test`, { headers: { xxx: 1234, yyy: 'string??' } })
        .then(r => console.log(r))
        .catch(e => console.error(e))
    },
    headerSend2 () {
      axios.get(`${this.$apiRootPath}test`, { headers: { Authorization: 'fake token' } })
        .then(r => console.log(r))
        .catch(e => console.error(e))
    }
  }
}
</script>

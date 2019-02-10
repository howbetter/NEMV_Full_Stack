<template>
  <v-container>
    <v-btn @click="headerSend">헤더 전송 </v-btn>
    <v-btn @click="headerSend2">헤더 전송2 </v-btn>
    <v-btn @click="lsWrite">로컬 스토리지 쓰기 </v-btn>
    <v-btn @click="lsRead">로컬 스토리지 읽기 </v-btn>
    <v-btn @click="lsRemove">로컬 스토리지 삭제 </v-btn>
    <v-btn @click="lsClear">로컬 스토리지 전체 삭제 </v-btn>
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
    },
    lsWrite () {
      localStorage.setItem('token', 123)
    },
    lsRead () {
      console.log(localStorage.getItem('token'))
    },
    lsRemove () {
      localStorage.removeItem('token')
    },
    lsClear () {
      localStorage.clear()
    }
  }
}
</script>

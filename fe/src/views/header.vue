<template>
  <v-container>
    <v-btn @click="headerSend">(테스트)헤더 전송 </v-btn>
    <v-btn @click="headerSend2">(테스트)헤더 전송2 </v-btn>
    <v-btn @click="lsWrite">(테스트)로컬 스토리지 쓰기 </v-btn>
    <v-btn @click="lsRead">(테스트)로컬 스토리지 읽기 </v-btn>
    <v-btn @click="lsRemove">(테스트)로컬 스토리지 삭제 </v-btn>
    <v-btn @click="lsClear">(테스트)로컬 스토리지 전체 삭제 </v-btn>
    <v-btn @click="apiWithToken">토큰과 함께 전송 </v-btn>
    <v-btn @click="apiWithTrash">이상한 문자와 함께 전송 </v-btn>
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
    },
    apiWithToken () {
      const token = localStorage.getItem('token')
      console.log(token)
      axios.get(`${this.$apiRootPath}test`, { headers: { Authorization: token } })
        .then(r => console.log(r.data))
        .catch(e => console.error(e.message))
    },
    apiWithTrash () {
      axios.get(`${this.$apiRootPath}test`, { headers: { Authorization: 'this is trash' } })
        .then(r => console.log(r.data))
        .catch(e => console.error(e.message))
    }
  }
}
</script>

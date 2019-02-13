<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4>
        <v-btn color="primary" @click="pop('clicked')">버튼</v-btn>
      </v-flex>
      <v-flex xs12 sm6 md4 v-for="user in users" :key="user._id">
        <user-card :user="user" @sbOpen="pop"></user-card>
      </v-flex>
    </v-layout>
      <v-snackbar
        v-model="sb.act"
      >
        {{ sb.msg }}
        <v-btn
          color="pink"
          flat
          @click="snackbar = false"
        >
          Close
        </v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
import userCard from '@/components/user'
// @는 src/ 아래 경로를 의미함

export default {
  components: { userCard },
  data () {
    return {
      users: [],
      sb: {
        act: false,
        msg: 'test'
      }
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    getUsers () {
      this.$axios.get('manage/user')
        .then((r) => {
          this.users = r.data.users
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    pop (m) {
      this.sb.act = true
      this.sb.msg = m
    }
  }
}
</script>

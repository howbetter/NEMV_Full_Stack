<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" v-model="form.id" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" v-model="form.pwd" name="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="signIn">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      form: {
        id: '',
        pwd: ''
      }
    }
  },
  methods: {
    signIn () {
      axios.post(`${this.$apiRootPath}sign/in`, this.form)
        .then(r => {
          if (!r.data.success) return console.error(r.data.msg)
          localStorage.setItem('token', r.data.token) // 로그인이 정상으로 통과하여 토큰을 받으면 아래로
          this.$router.push('/header') // header 페이지로 이동
          // location.href = '/header' // 위와 같은 의미.
        })
        .catch(e => console.error(e.message))
    }
  }
}
</script>

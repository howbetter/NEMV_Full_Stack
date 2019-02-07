<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <!--
      <v-flex xs12 sm3>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">GET</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <v-textarea v-model="getMd">
            </v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="orange" @click="getReq">SUBMIT</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm3>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">POST</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <v-textarea v-model="postMd">
            </v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="orange" @click="postReq">SUBMIT</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm3>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">PUT</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <v-textarea v-model="putMd">
            </v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="orange" @click="putReq">SUBMIT</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm3>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">DELETE</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <v-textarea v-model="delMd">
            </v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="orange" @click="delReq">SUBMIT</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    -->
      <v-flex xs12 sm6 offset-sm4 v-for="u in users" :key="u._id">
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ u.name }}</h3>
              <div>{{ u.age }}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange" @click="putDialog(u)">수정</v-btn>
            <v-btn flat color="error" @click="delUser(u._id)">삭제</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-btn
              absolute
              dark
              fab
              bottom
              right
              color="pink"
              @click=mdUp
            >
              <v-icon>add</v-icon>
            </v-btn>
    </v-layout>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                  v-model="userName"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="userAges"
                  label="Age*"
                  required
                  v-model="userAge"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="putUser">수정</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">닫기</v-btn>
          <v-btn color="blue darken-1" flat @click="postUser">저장</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar">
      {{ sbMsg }}
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
import axios from 'axios'
export default {
  data () {
    return {
      users: [],
      getMd: '',
      postMd: '',
      putMd: '',
      delMd: '',
      dialog: false,
      userAges: [],
      userAge: 0,
      userName: '',
      snackbar: false,
      sbMsg: '',
      putId: ''
    }
  },
  mounted () {
    for (let i = 10; i < 40; i++) this.userAges.push(i)
    this.getUsers()
  },
  methods: {
    // 조회용도
    getReq () {
      axios.get('http://localhost:3000/api/user', {
        user: 'getMan'
      })
        .then((r) => {
          this.getMd = JSON.stringify(r.data)
          console.log(r)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    // 입력 용도
    postReq () {
      axios.post('http://localhost:3000/api/user', {
        name: '가정', age: 40
      })
        .then((r) => {
          this.postMd = JSON.stringify(r.data)
          console.log(r)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    putReq () {
      axios.put('http://localhost:3000/api/user', {
        user: 'putMan'
      })
        .then((r) => {
          this.putMd = JSON.stringify(r.data.msg)
          console.log(r)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    delReq () {
      axios.delete('http://localhost:3000/api/user', {
        user: 'delMan'
      })
        .then((r) => {
          this.delMd = JSON.stringify(r.data)
          console.log(r)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    mdUp () {
      console.log('mdUp')
      this.userName = ''
      this.age = 0
      this.dialog = true
    },
    postUser () {
      console.log(this.userName, this.userAge)
      this.dialog = false
      this.pop(this.userName)
      axios.post('http://localhost:3000/api/user', {
        name: this.userName, age: this.userAge
      })
        .then((r) => {
          // this.postMd = JSON.stringify(r.data)
          // console.log(r)
          this.pop('사용자 등록 완료')
          this.getUsers()
        })
        .catch((e) => {
          // console.error(e.message)
          this.pop(e.message)
        })
    },
    getUsers () {
      axios.get('http://localhost:3000/api/user')
        .then((r) => {
          // this.getMd = JSON.stringify(r.data)
          // console.log(r)
          this.users = r.data.user
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    putDialog (user) {
      this.putId = user._id
      this.dialog = true
      console.log(this.putId)
      this.userName = user.name
      this.userAge = user.age
    },
    putUser () {
      this.dialog = false
      axios.put(`http://localhost:3000/api/user/${this.putId}`, {
        name: this.userName, age: this.userAge
      })
        .then((r) => {
          // this.putMd = JSON.stringify(r.data.msg)
          // console.log(r)
          this.pop('사용자 수정 완료')
          this.getUsers()
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    delUser (id) {
      axios.delete(`http://localhost:3000/api/user/${id}`, {
        name: this.userName, age: this.userAge
      })
        .then((r) => {
          // this.delMd = JSON.stringify(r.data)
          // console.log(r)
          this.pop('사용자 삭제 완료')
          this.getUsers()
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    pop (msg) {
      this.snackbar = true
      this.sbMsg = msg
    }
  }
}
</script>

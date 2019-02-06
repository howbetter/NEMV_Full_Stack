<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
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
    </v-layout>
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
      delMd: ''
    }
  },
  mounted () {
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
    }
  }
}
</script>

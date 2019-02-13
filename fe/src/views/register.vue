<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>sign up form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <form>
                  <v-text-field
                    v-model="form.id"
                    v-validate="'required|min:4|max:20'"
                    :counter="20"
                    :error-messages="errors.collect('id')"
                    label="ID"
                    data-vv-name="id"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.pwd"
                    v-validate="'required|min:8|max:40'"
                    :counter="40"
                    :error-messages="errors.collect('pwd')"
                    label="PASSWORD"
                    data-vv-name="pwd"
                    required
                    type="password"
                  ></v-text-field>
                  <v-text-field
                    v-model="form.name"
                    v-validate="'required|min:1|max:40'"
                    :counter="40"
                    :error-messages="errors.collect('name')"
                    label="NAME"
                    data-vv-name="name"
                    required
                  ></v-text-field>
                  <v-checkbox
                    v-model="agree"
                    v-validate="'required'"
                    :error-messages="errors.collect('checkbox')"
                    value="1"
                    label="주의 : 패스워드가 평문으로 저장됩니다.."
                    data-vv-name="checkbox"
                    type="checkbox"
                    required
                  ></v-checkbox>

                  <v-btn color="primary" @click="submit">SIGN UP</v-btn>
                  <v-btn color="secondary" @click="clear">CLEAR</v-btn>
                </form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-snackbar
          v-model="sb.act"
        >
          {{ sb.msg }}
          <v-btn
            :color="sb.color"
            flat
            @click="sb.act = false"
          >
          Close
          </v-btn>
        </v-snackbar>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import ko from 'vee-validate/dist/locale/ko'

export default {
  $_veeValidate: {
    validator: 'new'
  },

  data: () => ({
    form: {
      id: '',
      name: '',
      pwd: ''
    },
    sb: {
      act: false,
      color: 'warning',
      msg: ''
    },
    agree: null,
    dictionary: {
      attributes: {
        message: ko.messages,
        // custom attributes
        name: '이름'
      },
      custom: {
        // name: {
        //   required: () => 'Name can not be empty',
        //   max: 'The name field may not be greater than 30 characters'
        //   // custom messages
        // },
        // select: {
        //   required: 'Select field is required'
        // }
      }
    }
  }),

  mounted () {
    this.$validator.localize('ko', this.dictionary)
  },

  methods: {
    submit () {
      this.$validator.validateAll()
        .then(r => {
          console.log(r)
          if (!r) throw new Error('필수 항목을 다 채워주세요.')
          return this.$axios.post('register', this.form)
        })
        .then(r => {
          if (!r.data.success) this.pop(r.data.msg, 'warning')
          else {
            this.pop('회원 가입 성공', 'success')
            // set timer 필요할 듯.
            this.$router.push('/sign')
          }
        })
        .catch(e => {
          console.error(e.message)
          this.pop(e.message, 'error')
        })
    },
    clear () {
      this.form.id = ''
      this.form.pwd = ''
      this.form.name = ''
      this.agree = null
      this.$validator.reset()
    },
    pop (msg, cl) {
      this.sb.act = true
      this.sb.msg = msg
      this.sb.color = cl
    }
  }
}
</script>

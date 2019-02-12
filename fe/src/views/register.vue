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
                    v-model="name"
                    v-validate="'required|min:3|max:30'"
                    :counter="30"
                    :error-messages="errors.collect('name')"
                    label="Name"
                    data-vv-name="name"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="email"
                    v-validate="'required|email'"
                    :error-messages="errors.collect('email')"
                    label="E-mail"
                    data-vv-name="email"
                    required
                  ></v-text-field>
                  <v-select
                    v-model="select"
                    v-validate="'required'"
                    :items="items"
                    :error-messages="errors.collect('select')"
                    label="Select"
                    data-vv-name="select"
                    required
                  ></v-select>
                  <v-checkbox
                    v-model="checkbox"
                    v-validate="'required'"
                    :error-messages="errors.collect('checkbox')"
                    value="1"
                    label="Option"
                    data-vv-name="checkbox"
                    type="checkbox"
                    required
                  ></v-checkbox>

                  <v-btn color="primary" @click="submit">submit</v-btn>
                  <v-btn color="secondary" @click="clear">clear</v-btn>
                </form>
              </v-card-text>
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
  $_veeValidate: {
    validator: 'new'
  },

  data: () => ({
    name: '',
    email: '',
    select: null,
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4'
    ],
    checkbox: null,
    dictionary: {
      attributes: {
        email: 'E-mail Address',
        // custom attributes
        name: '이름입니다'
      },
      custom: {
        name: {
          required: () => 'Name can not be empty',
          max: 'The name field may not be greater than 30 characters'
          // custom messages
        },
        select: {
          required: 'Select field is required'
        }
      }
    }
  }),

  mounted () {
    this.$validator.localize('en', this.dictionary)
  },

  methods: {
    submit () {
      this.$validator.validateAll()
    },
    clear () {
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = null
      this.$validator.reset()
    }
  }
}
</script>

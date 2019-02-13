<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{user.id}}</h3>
      </div>
    </v-card-title>
    <v-divider light></v-divider>
    <v-card-text>
      <div>
        <div>이름: {{user.name}}</div>
        <div>권한: {{user.lv}}</div>
        <div>나이: {{user.age}}</div>
        <div>로그인 횟수: {{user.inCnt}}</div>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="red" @click="parent">부모로 전달</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  // 뷰로 부터 받은 것
  props: [ 'user' ],
  // 컴포넌트에서 주는 것
  methods: {
    parent () {
      this.$emit('sbOpen', 'to paret')
    }
  }
}
</script>

<template>
  <v-container>
    <v-alert type="info" :value="true">
      레벨 3 손님
    </v-alert>
  </v-container>
</template>

<script>
import moment from 'moment'

export default {
  mounted () {
    moment.locale('ko')
    console.log(moment().format())
    console.log(moment().format('YY-MM-DD'))
    console.log(moment().minutes())
    console.log(moment().fromNow())
    const a = moment()
    const b = moment().add(1, 'seconds')
    console.log(a.diff(b)) // -1000
    console.log(b.diff(a)) // 1000
  }
}

</script>

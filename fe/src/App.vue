<template>
  <v-app :dark="siteTheme">
    <v-navigation-drawer
      persistent
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="siteTitle"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-menu bottom left>
          <v-btn icon slot="activator">
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <template>
              <v-list-tile v-if="!$store.state.token" @click="$router.push('/sign')">
                <v-list-tile-title>로그인</v-list-tile-title>
              </v-list-tile>
              <v-list-tile v-else @click="signOut">
                <v-list-tile-title>로그아웃</v-list-tile-title>
              </v-list-tile>
              <v-list-tile v-if="!$store.state.token" @click="$router.push('/register')">
                <v-list-tile-title>회원가입</v-list-tile-title>
              </v-list-tile>
            </template>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer fixed app>
      <span>{{ siteCopyright }} // token test : {{ $store.state.token }} </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      // clipped: false,
      drawer: true,
      // fixed: false,
      siteTitle: 'not yet',
      siteCopyright: '© 2019 SK Telecom',
      siteTheme: true,
      items: [
        {
          icon: 'home',
          title: '홈',
          to: {
            path: '/'
          }
        },
        {
          icon: 'face',
          title: 'lv0 관리자',
          to: {
            path: '/lv0'
          }
        },
        {
          icon: 'face',
          title: 'lv1 중간 관리자',
          to: {
            path: '/lv1'
          }
        },
        {
          icon: 'face',
          title: 'lv2 일반 사용자',
          to: {
            path: '/lv2'
          }
        },
        {
          icon: 'face',
          title: 'lv3 손님',
          to: {
            path: '/lv3'
          }
        },
        {
          icon: 'face',
          title: '사용자 관리',
          to: {
            path: '/users'
          }
        },
        {
          icon: 'home',
          title: '페이지',
          to: {
            path: '/page'
          }
        },
        {
          icon: 'face',
          title: '사이트 관리',
          to: {
            path: '/site'
          }
        },
        {
          icon: 'face',
          title: 'Header',
          to: {
            path: '/header'
          }
        },
        {
          icon: 'home',
          title: 'About',
          to: {
            path: '/about'
          }
        },
        {
          icon: 'help',
          title: 'Help',
          to: {
            path: '/help'
          }
        }],
      // miniVariant: false,
      // right: true,
      // rightDrawer: false,
      title: this.$apiRootPath // 추후에 모니터링하는 노드 주소로 변경 예정
    }
  },
  mounted () {
    this.getSite()
  },
  methods: {
    getSite () {
    // this.siteTitle = 'get site'
      this.$axios.get('site')
        .then(r => {
          this.siteTitle = r.data.d.title
          this.siteCopyright = r.data.d.copyright
          this.siteTheme = r.data.d.theme
        })
    },
    signOut () {
      // localStorage.removeItem('token')
      this.$store.commit('delToken')
      this.$router.push('/')
    }
  }
}
</script>

<template>
  <v-app :dark="siteDark">
    <v-navigation-drawer
      persistent
      v-model="drawer"
      :mini-variant.sync="mini"
      enable-resize-watcher
      fixed
      app
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
              <!-- <v-badge
                overlap
                color="orange"
              >
                <v-icon
                  slot="badge"
                  dark
                  small
                >notifications</v-icon>
                <v-icon
                  large
                  color="grey darken-1"
                >
                  account_box
                </v-icon>
              </v-badge> -->
            </v-list-tile-avatar>
            <v-list-tile-content>
              <!-- <v-list-tile-title>{{ `${$user.name} 님 (${$user.job})` }}</v-list-tile-title> -->
              <v-list-tile-title>관리자</v-list-tile-title>

            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list>
        <v-list-group
          v-for="(item, i) in items"
          v-model="item.act"
          :prepend-icon="item.icon"
          :key="i"
          no-action
        >
          <v-list-tile slot="activator">
            <!-- <v-list-tile-title>{{item.title}}</v-list-tile-title> -->
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-for="subItem in item.subItems"
            :key="subItem.title"
            :to="subItem.to"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
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
            <template v-if="!$store.state.token">
              <v-list-tile  @click="$router.push('/sign')">
                <v-list-tile-title>로그인</v-list-tile-title>
              </v-list-tile>
              <v-list-tile  @click="$router.push('/register')">
                <v-list-tile-title>회원가입</v-list-tile-title>
              </v-list-tile>
            </template>
            <v-list-tile v-else @click="signOut">
              <v-list-tile-title>로그아웃</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer fixed app>
      <span>{{siteCopyright}}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      drawer: null,
      mini: false,
      siteTitle: '로딩중',
      siteCopyright: '로딩중',
      siteDark: false,
      items: [
        {
          icon: 'home',
          title: '게시판 모음',
          act: true,
          subItems: [
            {
              title: '테스트',
              to: {
                path: '/'
              }
            }
          ]
        },
        {
          icon: 'pan_tool',
          title: '레벨테스트',
          subItems: [
            {
              title: '손님용 페이지',
              to: {
                path: '/lv3'
              }
            },
            {
              title: '일반유저용 페이지',
              to: {
                path: '/lv2'
              }
            },
            {
              title: '슈퍼유저용 페이지',
              to: {
                path: '/lv1'
              }
            },
            {
              title: '관리자용 페이지',
              to: {
                path: '/lv0'
              }
            }
          ]
        },
        {
          icon: 'settings',
          title: '관리메뉴',
          subItems: [
            {
              title: '사용자관리',
              to: {
                path: '/User'
              }
            },
            {
              title: '페이지관리',
              to: {
                path: '/page'
              }
            },
            {
              title: '사이트관리',
              to: {
                path: '/site'
              }
            },
            {
              title: '게시판관리',
              to: {
                path: '/manage/boards'
              }
            }
          ]
        }
      ],
      title: this.$apiRootPath
    }
  },
  mounted () {
    this.getSite()
  },
  methods: {
    signOut () {
      // localStorage.removeItem('token')
      this.$store.commit('delToken')
      this.$router.push('/')
    },
    getSite () {
      this.$axios.get('/site')
        .then(r => {
          this.siteTitle = r.data.d.title
          this.siteCopyright = r.data.d.copyright
          this.siteDark = r.data.d.theme
        })
        .catch(e => console.error(e.message))
    }
  }
}
</script>

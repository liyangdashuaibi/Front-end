<template>
  <div class="song-info">
    <div class="song-container">
      <div class="album-cover" v-if="showSongInfo">
        <img :src="song.album.picUrl">
      </div>
    </div>
    <div class="lyric-container">
      <h2 class="song-name" v-if="showSongInfo">{{song.name}}</h2>
      <p class="singer" v-if="showSongInfo">{{song.artists[0].name}}</p>
      <div class="lyric-box" v-if="showLyric">
        <ul class="lyric">
          <li v-for="(lyric, index) in lyricArray">{{lyric.m}}:{{lyric.s}} {{lyric.content}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui';
  import { mapState, mapGetters } from 'vuex';
  export default {
    data() {
      return {
        showSongInfo: false,
        showLyric: false,
      }
    },
    computed: {
      ...mapState({
        song: state => state.playingSong,
        lyric: state => state.playingLyric,
        lyricRow: state => state.lyricRow
      }),
      ...mapGetters({
        lyricArray: 'parseLyric',
        scrollToTop: 'topOffset'
      }),
    },
    methods: {
      hideComponents () {
        this.$store.commit( 'toggleSearch', false );
        this.$store.commit( 'toggleBadges', false );
      },
      fetchSongInfo (id) {
        this.$store.dispatch( 'getSong', {
          id
        }).then( () => {
          this.showSongInfo = true;
        })
        this.$store.dispatch('getLyric', {
          id
        }).then(() => {
          this.showLyric = true;
        });
      }
    },
    created () {
      this.hideComponents();
      this.fetchSongInfo(this.$route.params.id);
    }
  }
</script>

<style lang="scss">
  .song-info {
    text-align: center;
    .song-container {
      .album-cover {
        display: inline-block;
        border-radius: 4em;
        overflow: hidden;
        img {
          width: 8em;
          height: 8em;
          vertical-align: middle;
        }
      }
    }
    .lyric-container {
    margin-top: 2em;
    .lyric-box {
      padding-left: 2em;
      height: 10em;
      overflow-y: scroll;
      .lyric {
        list-style: none;
        padding: 0;
        margin: 0;
        text-align: left;
        li {
          margin: 0.5em 0;
          line-height: 1.5em;
        }
      }
    }
  }
  }
</style>

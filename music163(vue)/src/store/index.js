import Vue from 'vue';
import Vuex from 'vuex';
import { fetchSongsList, fetchSong, fetchLyric } from '../api';

Vue.use(Vuex);

function updateLocalStorage (data) {
  localStorage.setItem( 'keywordList', data );
}

export default new Vuex.Store({
  state: {
    searchValue: '',
    showWelcome: true,
    showHeader: false,
    showSearch: true,
    showBadges: true,
    headerInfo: {
      title: '',
      link: ''
    },
    songs: [],
    searchList: [],
    playingSong: null,
    playingLyric: null,
    lyric: null,
  },
  getters: {
    parseLyric: (state) => {
      let lyricArray = [];
      if (state.lyric) {
        lyricArray = state.lyric.split('\n');
        if (lyricArray[0].indexOf('by') !== -1) {
          lyricArray.shift();
        }
        lyricArray = lyricArray.filter( item => item !== '' );
        lyricArray = lyricArray.map( item => {
          const reg = /^\[(\d+):(\d+)\.(\d+)]\s*(.*)/;
          const data = item.match(reg);
          return { m: data[1], s: data[2], ms: data[3], content: data[4] };
        })
      }
      return lyricArray;
    },
    topOffset: (state, getters) => {

    }
  },
  mutations: {
    updateSearch ( state, payload ) {
      state.searchValue = payload;
    },
    toggleWelcome ( state, payload ) {
      state.showWelcome = payload;
    },
    updateSearch( state, payload ) {
      state.searchValue = payload;
    },
    changeHeaderInfo( state, payload ) {
      state.headerInfo = payload;
    },
    toggleHeader( state, payload ) {
      state.showHeader = payload;
    },
    loadSongsList( state, payload ) {
      state.songs = payload.songs;
    },
    addSearch ( state, payload ) {
      if ( Array.isArray(payload) ) {
        state.searchList = state.searchList.concat(payload);
      } else {
        if ( !state.searchList.length || state.searchList.indexOf(payload) === -1 ) {
          state.searchList.push(payload);
        }
        if ( state.searchList.length > 10 ) {
           state.searchList.shift();
        }
      }
      updateLocalStorage(JSON.stringify(state.searchList));
    },
    loadSong(state, payload) {
      state.playingSong = payload;
    },
    toggleSearch( state, payload  ) {
      state.showSearch = payload;
    },
    toggleBadges( state, payload ) {
      state.showBadges = payload;
    },
    loadLyric( state, payload ) {
      state.playingLyric = payload;
      state.lyric = payload.lrc.lyric;
    },
  },
  actions: {
    getSongsList ( { commit }, options ) {
      const req = fetchSongsList(options);
      req.then( resp => {
        commit( 'loadSongsList', {
          songs: resp.data.result.songs
        })
        if ( resp.data.result.songCount ) {
          commit( 'addSearch', options.s );
        }
      })
    },
    getSong( { commit }, options ) {
      const req = fetchSong(options.id);
      req.then( (resp) => {
        commit( 'loadSong', resp.data.songs[0] );
      })
      return req;
    },
    getLyric({ commit }, options) {
      const req = fetchLyric(options.id);
      req.then( (resp) => {
        commit( 'loadLyric', resp.data );
      })
      return req;
    }
  }
})

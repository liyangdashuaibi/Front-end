import Vue from 'vue';
import axios from 'axios';

axios.defaults.baseURL = '/api';

function objDewei ( obj, ...options ) {
  for ( let i = 0, le = options.length; i < le; i ++ ) {
    for ( let key in options[i] ) {
      obj[key] = options[i][key]
    }
  }
  return obj;
}

function fetchSongsList (options) {
  let p = new URLSearchParams();
  const otherParams = {
    csrf_token: '',
    type: 1,
    offset: 0,
    limit: 10,
    total: true
  };
  options = objDewei( options, otherParams );
  for ( let i in options ) {
    p.append( i, options[i] );
  }
  return axios.post( 'search/get/web', p );
}

function fetchSong (id) {
  return axios( '/song/detail?id=' + id + '&ids=%5B' + id + '%5D' );
}

function fetchLyric(id) {
  return axios( '/song/lyric?os=pc&id=' + id + '&lv=-1&kv=-1&tv=-1' );
}

export { fetchSongsList, fetchSong, fetchLyric }

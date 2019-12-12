!function(e, t) {
  if ('object' == typeof exports && 'object' == typeof module) module.exports = t(); else if ('function' == typeof define && define.amd) define([], t); else {
      var r = t();
      for (var i in r) ('object' == typeof exports ? exports : e)[i] = r[i];
  }
}('undefined' != typeof self ? self : this, function() {
  return function(e) {
      var t = {};

      function r(i) {
          if (t[i]) return t[i].exports;
          var o = t[i] = { i: i, l: !1, exports: {} };
          return e[i].call(o.exports, o, o.exports, r), o.l = !0, o.exports;
      }

      return r.m = e, r.c = t, r.d = function(e, t, i) {
          r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
      }, r.r = function(e) {
          'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }), Object.defineProperty(e, '__esModule', { value: !0 });
      }, r.t = function(e, t) {
          if (1 & t && (e = r(e)), 8 & t) return e;
          if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
          var i = Object.create(null);
          if (r.r(i), Object.defineProperty(i, 'default', {
              enumerable: !0,
              value: e,
          }), 2 & t && 'string' != typeof e) for (var o in e) r.d(i, o, function(t) {
              return e[t];
          }.bind(null, o));
          return i;
      }, r.n = function(e) {
          var t = e && e.__esModule ? function() {
              return e.default;
          } : function() {
              return e;
          };
          return r.d(t, 'a', t), t;
      }, r.o = function(e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
      }, r.p = '', r(r.s = 5);
  }([function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }), t.PROTO_VERSION = '1.2.2', t.ROOMVERSION = 'V1', function(e) {
          e[e.debug = 0] = 'debug', e[e.info = 1] = 'info', e[e.warn = 2] = 'warn', e[e.error = 3] = 'error', e[e.report = 99] = 'report', e[e.disable = 100] = 'disable';
      }(t.ENUM_LOG_LEVEL || (t.ENUM_LOG_LEVEL = {})), function(e) {
          e[e.disable = 0] = 'disable', e[e.websocket = 1] = 'websocket', e[e.https = 2] = 'https';
      }(t.ENUM_REMOTE_TYPE || (t.ENUM_REMOTE_TYPE = {}));
      var i = function() {
          function e(e, t) {
              void 0 === e && (e = null), void 0 === t && (t = null), this._id = null, this.next = null, this.prev = null, this._id = e, this._data = t;
          }

          return Object.defineProperty(e.prototype, 'id', {
              get: function() {
                  return this._id;
              }, set: function(e) {
                  this._id = e;
              }, enumerable: !0, configurable: !0,
          }), Object.defineProperty(e.prototype, 'data', {
              get: function() {
                  return this._data;
              }, set: function(e) {
                  this._data = e;
              }, enumerable: !0, configurable: !0,
          }), e.prototype.hasNext = function() {
              return this.next && this.next.id;
          }, e.prototype.hasPrev = function() {
              return this.prev && this.prev.id;
          }, e;
      }();
      t.ListNode = i;
      var o = function() {
          function e() {
              this.start = new i, this.end = new i, this._idCounter = 0, this._numNodes = 0, this.start.next = this.end, this.start.prev = null, this.end.prev = this.start, this.end.next = null;
          }

          return e.prototype.insertBefore = function(e, t) {
              var r = new i(this._idCounter, t);
              return r.next = e, r.prev = e.prev, e.prev.next = r, e.prev = r, ++this._idCounter, ++this._numNodes, r;
          }, e.prototype.addLast = function(e) {
              return this.insertBefore(this.end, e);
          }, e.prototype.add = function(e) {
              return this.addLast(e);
          }, e.prototype.getFirst = function() {
              return 0 === this._numNodes ? null : this.start.next;
          }, e.prototype.getLast = function() {
              return 0 === this._numNodes ? null : this.end.prev;
          }, e.prototype.size = function() {
              return this._numNodes;
          }, e.prototype.getFromFirst = function(e) {
              var t = 0, r = this.start.next;
              if (e >= 0) for (; t < e && null !== r;) r = r.next, ++t; else r = null;
              if (null === r) throw'Index out of bounds.';
              return r;
          }, e.prototype.get = function(e) {
              return 0 === e ? this.getFirst() : e === this._numNodes - 1 ? this.getLast() : this.getFromFirst(e);
          }, e.prototype.remove = function(e) {
              return e.prev.next = e.next, e.next.prev = e.prev, --this._numNodes, e;
          }, e.prototype.removeFirst = function() {
              var e = null;
              return this._numNodes > 0 && (e = this.remove(this.start.next)), e;
          }, e.prototype.removeLast = function() {
              var e = null;
              return this._numNodes > 0 && (e = this.remove(this.end.prev)), e;
          }, e.prototype.removeAll = function() {
              this.start.next = this.end, this.end.prev = this.start, this._numNodes = 0, this._idCounter = 0;
          }, e.prototype.each = function(e) {
              for (var t = this.start; t.hasNext();) e(t = t.next);
          }, e.prototype.find = function(e) {
              for (var t = this.start, r = !1, i = null; t.hasNext() && !r;) e(t = t.next) && (i = t, r = !0);
              return i;
          }, e.prototype.map = function(e) {
              for (var t = this.start, r = []; t.hasNext();) e(t = t.next) && r.push(t);
              return r;
          }, e.prototype.push = function(e) {
              return this.addLast(e);
          }, e.prototype.unshift = function(e) {
              this._numNodes > 0 ? this.insertBefore(this.start.next, e) : this.insertBefore(this.end, e);
          }, e.prototype.pop = function() {
              return this.removeLast();
          }, e.prototype.shift = function() {
              return this.removeFirst();
          }, e;
      }();
      t.LinkedList = o, t.sdkErrorList = {
          SUCCESS: { code: 'ZegoClient.Success', msg: 'success.' },
          PARAM: { code: 'ZegoClient.Error.Param', msg: 'input error.' },
          HEARTBEAT_TIMEOUT: { code: 'ZegoClient.Error.Timeout', msg: 'heartbeat timeout.' },
          LOGIN_TIMEOUT: { code: 'ZegoClient.Error.Timeout', msg: 'login timeout.' },
          SEND_MSG_TIMEOUT: { code: 'ZegoClient.Error.Timeout', msg: 'send customsg timeout.' },
          RESET_QUEUE: { code: 'ZegoClient.Error.Timeout', msg: 'msg waiting ack is clear when reset.' },
          LOGIN_DISCONNECT: { code: 'ZegoClient.Error.Network', msg: 'network is broken and login fail.' },
          KICK_OUT: { code: 'ZegoClient.Error.Kickout', msg: 'kickout reason=' },
          UNKNOWN: { code: 'ZegoClient.Error.Unknown', msg: 'unknown error.' },
          FREQ_LIMITED: { code: 'ZegoClient.Error.requencyLimited', msg: 'Frequency Limited.' },
      }, function(e) {
          e[e.disconnected = 0] = 'disconnected', e[e.connecting = 1] = 'connecting', e[e.connected = 2] = 'connected';
      }(t.ENUM_SIGNAL_STATE || (t.ENUM_SIGNAL_STATE = {})), t.ENUM_RESOLUTION_TYPE = {
          LOW: {
              width: 240,
              height: 320,
              frameRate: 15,
              bitRate: 300,
          },
          MEDIUM: { width: 480, height: 640, frameRate: 15, bitRate: 800 },
          HIGH: { width: 720, height: 1280, frameRate: 20, bitRate: 1500 },
      }, t.ENUM_RETRY_STATE = { didNotStart: 0, retrying: 1, finished: 2 }, t.ENUM_PUBLISH_STATE = {
          start: 0,
          waitingSessionRsp: 1,
          waitingOffserRsp: 2,
          waitingServerAnswer: 3,
          waitingServerICE: 4,
          connecting: 5,
          publishing: 6,
          stop: 7,
          didNotStart: 8,
      }, t.ENUM_PLAY_STATE = {
          start: 0,
          waitingSessionRsp: 1,
          waitingOffserRsp: 2,
          waitingServerAnswer: 3,
          waitingServerICE: 4,
          connecting: 5,
          playing: 6,
          stop: 7,
          didNotStart: 8,
      }, t.ENUM_CONNECT_STATE = {
          disconnect: 0,
          connecting: 1,
          connected: 2,
      }, t.MAX_TRY_CONNECT_COUNT = 3, t.SEND_MSG_RESET = 2, t.SEND_MSG_TIMEOUT = 1, t.MAX_TRY_HEARTBEAT_COUNT = 5, t.ENUM_PUBLISH_STREAM_STATE = {
          waiting_url: 1,
          tryPublish: 2,
          update_info: 3,
          publishing: 4,
          stop: 5,
      }, t.ENUM_STREAM_SUB_CMD = {
          liveNone: 0,
          liveBegin: 2001,
          liveEnd: 2002,
          liveUpdate: 2003,
      }, t.ENUM_STREAM_UPDATE_TYPE = { added: 0, deleted: 1 }, function(e) {
          e[e.logout = 0] = 'logout', e[e.trylogin = 1] = 'trylogin', e[e.login = 2] = 'login';
      }(t.ENUM_RUN_STATE || (t.ENUM_RUN_STATE = {})), t.ENUM_PUBLISH_STATE_UPDATE = {
          start: 0,
          error: 1,
          retry: 2,
      }, t.ENUM_PLAY_STATE_UPDATE = {
          start: 0,
          error: 1,
          retry: 2,
      }, t.MAX_TRY_LOGIN_COUNT = 5, t.TRY_LOGIN_INTERVAL = [2e3, 2e3, 3e3, 3e3, 4e3], t.MINIUM_HEARTBEAT_INTERVAL = 3e3, t.ENUM_STREAM_UPDATE_CMD = {
          added: 12001,
          updated: 12002,
          deleted: 12003,
      }, t.SERVER_ERROR_CODE = 1e4, t.MIXSTREAM_ERROR_CODE = 1e4, function(e) {
          e[e.low = 1] = 'low', e[e.stantard = 2] = 'stantard', e[e.hight = 3] = 'hight', e[e.custome = 4] = 'custome';
      }(t.QUALITYLEVEL || (t.QUALITYLEVEL = {})), t.ENUM_SIGNAL_SUB_CMD = {
          none: 0,
          joinLiveRequest: 1001,
          joinLiveResult: 1002,
          joinLiveInvite: 1003,
          joinLiveStop: 1004,
      }, t.ENUM_PUSH_SIGNAL_SUB_CMD = {
          none: 0,
          pushJoinLiveRequest: 11001,
          pushJoinLiveResult: 11002,
          pushJoinLiveInvite: 11003,
          pushJoinLiveStop: 11004,
      }, function(e) {
          e[e.auto = 0] = 'auto', e[e.ultra = 1] = 'ultra';
      }(t.ENUM_PLAY_SOURCE_TYPE || (t.ENUM_PLAY_SOURCE_TYPE = {})), function(e) {
          e[e.cdn = 0] = 'cdn', e[e.ultra = 1] = 'ultra', e[e.customUrl = 2] = 'customUrl';
      }(t.ENUM_DISPATCH_TYPE || (t.ENUM_DISPATCH_TYPE = {})), function(e) {
          e[e.ClientType_None = 0] = 'ClientType_None', e[e.ClientType_H5 = 1] = 'ClientType_H5', e[e.ClientType_SmallPragram = 2] = 'ClientType_SmallPragram', e[e.ClientType_Webrtc = 3] = 'ClientType_Webrtc';
      }(t.E_CLIENT_TYPE || (t.E_CLIENT_TYPE = {}));
  }, function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var i = function() {
          function e() {
          }

          return e.checkConfigParam = function(e, t) {
              return e.appid && 'number' == typeof e.appid ? e.deviceId && 'string' == typeof e.deviceId ? 'number' != typeof e.anType ? (t.error('ccp.0 an type must be number'), !1) : e.dispatchSever && 'string' == typeof e.dispatchSever ? !(!e.idName || 'string' != typeof e.idName) || (t.error('ccp.0 idName must be string and not empty'), !1) : (t.error('ccp.0 dispathServer must be string and not empty'), !1) : (t.error('ccp.0 deviceid must be string'), !1) : (t.error('ccp.0 appid must be number'), !1);
          }, e.checkLoginParam = function(e, t) {
              return !0;
          }, e.registerCallback = function(e, t, r) {
              var i, o;
              t.success && (i = t.success), t.error && (o = t.error), r[e + 'SuccessCallback'] = i, r[e + 'ErrorCallback'] = o;
          }, e.actionErrorCallback = function(e, t) {
              return t[e + 'ErrorCallback'];
          }, e.actionSuccessCallback = function(e, t) {
              return t[e + 'SuccessCallback'];
          }, e.getServerError = function(e) {
              var t = {
                  1: 'parse json error.',
                  1001: 'login is processing.',
                  1002: 'liveroom request error.',
                  1003: 'zpush connect fail.',
                  1004: 'zpush handshake fail.',
                  1005: 'zpush login fail.',
                  1006: 'user login state is wrong.',
                  1007: 'got no zpush addr',
                  1008: 'token error',
                  1009: 'dispatch error',
                  2002: 'biz channel error',
                  1000000000: 'liveroom cmd error, result=',
              };
              if (0 === e) return { code: 'ZegoClient.Success', msg: 'success' };
              var r = { code: 'ZegoClient.Error.Server', msg: '' };
              return r.msg = e > 1e9 ? t[1e9] + e : t[e] ? 'unknown error code:' + e : t[e], r;
          }, e.isKeepTryLogin = function(e) {
              switch (e) {
                  case 1002:
                  case 1003:
                      return !0;
                  default:
                      return !1;
              }
          }, e.mergeStreamList = function(e, t, r, i, o) {
              e.debug('msl.0 call');
              var n, s = [], a = [], c = [];
              i || (i = []);
              for (var d = 0; d < i.length; d++) if (i[d].anchor_id_name != t) {
                  n = !1;
                  for (var l = 0; l < r.length; l++) if (i[d].stream_id === r[l].stream_id) {
                      i[d].extra_info !== r[l].extra_info && c.push(i[d]), n = !0;
                      break;
                  }
                  n || s.push(i[d]);
              } else e.debug('msl.0 have self stream added');
              for (var p = 0; p < r.length; p++) {
                  n = !1;
                  for (var h = 0; h < i.length; h++) if (r[p].stream_id === i[h].stream_id) {
                      n = !0;
                      break;
                  }
                  n || a.push(r[p]);
              }
              r.splice(0);
              for (d = 0; d < i.length; d++) r.push(i[d]);
              o(s, a, c), e.debug('msl.0 call success');
          }, e.checkCustomCommandParam = function(e) {
              return !0;
          }, e.generateRandumNumber = function(e) {
              return parseInt(Math.random() * (e + 1) + '', 10);
          }, e.uuid = function(e, t) {
              var r, i = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''), o = [];
              if (t = t || i.length, e) for (r = 0; r < e; r++) o[r] = i[0 | Math.random() * t]; else {
                  var n = void 0;
                  for (o[8] = o[13] = o[18] = o[23] = '-', o[14] = '4', r = 0; r < 36; r++) o[r] || (n = 0 | 16 * Math.random(), o[r] = i[19 == r ? 3 & n | 8 : n]);
              }
              return o.join('');
          }, e.isSupportWebrtc = function() {
              var e = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection,
                  t = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia || navigator.mediaDevices && navigator.mediaDevices.getUserMedia,
                  r = window.WebSocket;
              return !!e && !!t && !!r;
          }, e.isSupportH264 = function(e, t) {
              var r = !1;
              new RTCPeerConnection(null).createOffer({
                  offerToReceiveAudio: 1,
                  offerToReceiveVideo: 1,
              }).then(function(t) {
                  if (t && t.sdp) {
                      r = !0, clearTimeout(i);
                      var o = t.sdp.split('\r\n').some(function(e) {
                          return e.startsWith('a=rtpmap:') && e.indexOf('H264/') > -1;
                      });
                      e && e(o);
                  }
              }, function(e) {
                  r = !0, clearTimeout(i), t && t(e);
              });
              var i = setTimeout(function() {
                  0 == r && t(!1);
              }, 200);
          }, e.supportDetection = function(e, t, r) {
              var i = { webRtc: !1, capture: !1, videoDecodeType: { H264: !1, VP8: !1 }, screenSharing: e };
              (window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection) && (i.webRtc = !0), navigator && (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia || navigator.mediaDevices && navigator.mediaDevices.getUserMedia) && (i.capture = !0), this.supportVideoCodeType(function(e) {
                  i.videoDecodeType.H264 = e.H264, i.videoDecodeType.VP8 = e.VP8, t && t(i);
              }, function(e) {
                  r && r(e);
              });
          }, e.supportVideoCodeType = function(e, t) {
              var r = !1;
              new RTCPeerConnection(null).createOffer({
                  offerToReceiveAudio: 1,
                  offerToReceiveVideo: 1,
              }).then(function(t) {
                  if (t && t.sdp) {
                      r = !0, clearTimeout(i);
                      var o = t.sdp.split('\r\n'), n = o.some(function(e) {
                          return e.startsWith('a=rtpmap:') && e.indexOf('H264/') > -1;
                      }), s = o.some(function(e) {
                          return e.startsWith('a=rtpmap:') && e.indexOf('VP8/') > -1;
                      }), a = o.some(function(e) {
                          return e.startsWith('a=rtpmap:') && e.indexOf('VP9/') > -1;
                      }), c = o.some(function(e) {
                          return e.startsWith('a=rtpmap:') && e.indexOf('H264/') > -1;
                      });
                      e && e({ H264: n, VP8: s, Vp9: a, H265: c });
                  }
              }, function(e) {
                  r = !0, clearTimeout(i), t && t(e);
              });
              var i = setTimeout(function() {
                  0 == r && t(!1);
              }, 200);
          }, e.inlineWorker = function(e) {
              if (Worker) {
                  var t = e.toString().trim().match(/^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/)[1],
                      r = URL.createObjectURL(new window.Blob([t], { type: 'text/javascript' }));
                  return new Worker(r);
              }
              return null;
          }, e.getBrowser = function() {
              var e = window.navigator.userAgent, t = null != window.ActiveXObject && -1 != e.indexOf('MSIE'),
                  r = -1 != e.indexOf('Firefox'), i = null != window.opr, o = e.indexOf('Chrome') && window.chrome,
                  n = -1 != e.indexOf('Safari') && -1 != e.indexOf('Version');
              return t ? 'IE' : r ? 'Firefox' : i ? 'Opera' : o ? 'Chrome' : n ? 'Safari' : 'Unkown';
          }, e.IsPC = function() {
              for (var e = navigator.userAgent, t = new Array('Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'), r = !0, i = 0; i < t.length; i++) if (e.indexOf(t[i]) > 0) {
                  r = !1;
                  break;
              }
              return r;
          }, e.getOS = function() {
              var e = navigator.userAgent,
                  t = (navigator.appVersion, e.indexOf('Android') > -1 || e.indexOf('Linux') > -1),
                  r = !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
              return t ? 1 : r ? 2 : 10;
          }, e;
      }();
      t.ClientUtil = i;
  }, function(e, t, r) {
      'use strict';
      var i;
      Object.defineProperty(t, '__esModule', { value: !0 }), t.playErrorList = {
          DISPATCH_ERROR: { code: 'ZegoPlayWeb.Error.Dispatch', msg: 'dispatch request error' },
          DISPATCH_TIMEOUT: { code: 'ZegoPlayWeb.Timeout.Dispatch', msg: 'dispatch request timeout' },
          TOKEN_ERROR: { code: 'ZegoPlayWeb.Error.Token', msg: 'login token error' },
          SEND_SESSION_TIMEOUT: { code: 'ZegoPlayWeb.Timeout.Session', msg: 'send session request timeout' },
          CREATE_SESSION_ERROR: { code: 'ZegoPlayWeb.Error.Session', msg: 'create session error' },
          CREATE_OFFER_ERROR: { code: 'ZegoPublish.Error.CreateOffer', msg: 'create offer error' },
          SERVER_MEDIA_DESC_TIMEOUT: {
              code: 'ZegoPlayWeb.Timeout.RemoteOffer',
              msg: 'wating server mediaDesc timeout',
          },
          SET_REMOTE_DESC_ERROR: { code: 'ZegoPlayWeb.Error.RemoteOffer', msg: 'other side offer error' },
          CREATE_ANSWER_ERROR: { code: 'ZegoPlayWeb.Error.CreateAnswer', msg: 'create offer error' },
          SET_LOCAL_DESC_ERROR: { code: 'ZegoPlayWeb.Error.LocalDesc', msg: 'setLocalDescription error' },
          SEND_MEDIA_DESC_TIMEOUT: { code: 'ZegoPlayWeb.Timeout.Desc', msg: 'send mediaDesc timeout' },
          SEND_CANDIDATE_ERROR: { code: 'ZegoPlayWeb.Error.Candidate', msg: 'send candidate error' },
          SEND_CANDIDATE_TIMEOUT: { code: 'ZegoPlayWeb.Timeout.Candidate', msg: 'send candidate timeout' },
          SERVER_CANDIDATE_TIMEOUT: { code: 'ZegoPlayWeb.Timeout.ServerCandidate', msg: 'waiting candidate timeout' },
          SERVER_CANDIDATE_ERROR: { code: 'ZegoPlayWeb.Error.ServerCandidate', msg: 'recv candidate error' },
          MEDIA_CONNECTION_FAILED: { code: 'ZegoPlayWeb.Error.ConnectionFailed', msg: 'ice Connection state failed' },
          MEDIA_CONNECTION_CLOSED: { code: 'ZegoPlayWeb.Error.ConnectionClosed', msg: 'ice connection state closed' },
          SESSION_CLOSED: { code: 'ZegoPlayWeb.Error.SessionClosed', msg: 'server session closed' },
          WEBSOCKET_ERROR: { code: 'ZegoPlayWeb.Error.SocketError', msg: 'network error' },
      }, t.publishErrorList = {
          DISPATCH_ERROR: { code: 'ZegoPublish.Error.Dispatch', msg: 'dispatch request error' },
          DISPATCH_TIMEOUT: { code: 'ZegoPublish.Timeout.Dispatch', msg: 'dispatch request timeout' },
          TOKEN_ERROR: { code: 'ZegoPublish.Error.Token', msg: 'login token error' },
          SEND_SESSION_TIMEOUT: { code: 'ZegoPublish.Timeout.Session', msg: 'send session request timeout' },
          CREATE_SESSION_ERROR: { code: 'ZegoPublish.Error.Session', msg: 'create session error' },
          CREATE_OFFER_ERROR: { code: 'ZegoPublish.Error.CreateOffer', msg: 'create offer error' },
          SET_LOCAL_DESC_ERROR: { code: 'ZegoPublish.Error.LocalDesc', msg: 'setLocalDescription error' },
          SEND_MEDIA_DESC_TIMEOUT: { code: 'ZegoPublish.Timeout.Desc', msg: 'send mediaDesc timeout' },
          SERVER_MEDIA_DESC_TIMEOUT: {
              code: 'ZegoPublish.Timeout.ServerAnswer',
              msg: 'waiting server mediaDesc timeout',
          },
          SERVER_MEDIA_DESC_ERROR: { code: 'ZegoPublish.Error.ServerAnswer', msg: 'server mediaDesc type error' },
          SET_REMOTE_DESC_ERROR: { code: 'ZegoPublish.Error.RemoteDesc', msg: 'other side offer error' },
          SEND_CANDIDATE_TIMEOUT: { code: 'ZegoPublish.Timeout.Candidate', msg: 'sendIceCandidate error' },
          SERVER_CANDIDATE_TIMEOUT: { code: 'ZegoPublish.Timeout.ServerCandidate', msg: 'waiting candidate timeout' },
          SERVER_CANDIDATE_ERROR: { code: 'ZegoPublish.Error.ServerCandidate', msg: 'recv candidate error' },
          SESSION_CLOSED: { code: 'ZegoPublish.Error.SessionClosed', msg: 'server session closed' },
          MEDIA_CONNECTION_FAILED: {
              code: 'ZegoPublish.Error.IConnectionFailed',
              msg: 'Iice Connection state failed',
          },
          MEDIA_CONNECTION_CLOSED: { code: 'ZegoPublish.Error.ConnectionClosed', msg: 'ice connection state closed' },
          WEBSOCKET_ERROR: { code: 'ZegoPublish.Error.SocketError', msg: 'network error' },
      }, t.ENUM_PUBLISH_STATE_UPDATE = { start: 0, error: 1, retry: 2 }, t.ENUM_PLAY_STATE_UPDATE = {
          start: 0,
          error: 1,
          retry: 2,
          stop: 3,
      }, t.ENUM_RETRY_STATE = { didNotStart: 0, retrying: 1, finished: 2 }, t.getSeq = (i = 1, function() {
          return i++;
      });
  }, function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var i = function() {
          function e(e) {
              this.loop = !1, this.replace = !1, this.effectEndedCallBack = null, this.effectEndedListener = null, this.startTimes = 0, this.startOffset = 0, this.pauseTimes = 0, this.resumeOffset = 0, this.isMixAudio = !1, this.logger = e;
          }

          return e.prototype.preloadEffect = function(e, t) {
              var r = this;
              this.logger.info('amu.pe.0 start preload effect');
              var i = new ('undefined' != typeof webkitAudioContext ? webkitAudioContext : AudioContext),
                  o = new XMLHttpRequest;
              o.open('GET', e, !0), o.responseType = 'arraybuffer', o.onload = function() {
                  if (200 == o.status || 304 == o.status) {
                      var e = o.response;
                      i.decodeAudioData(e, function(e) {
                          r.logger.info('amu.pe.0 effect preload success'), t('', e);
                      }, function(e) {
                          t(e);
                      });
                  } else {
                      var n = o.statusText;
                      t(n);
                  }
              }, o.send();
          }, e.prototype.playEffect = function(e, t, r, i, o) {
              var n = this;
              !0 !== this.isMixAudio ? this.audioBuffer ? (this.startOffset = e || 0, this.loop = t || !1, this.replace = r || !1, this.effectEndedCallBack = o, this.mixEffect(this.audioBuffer, function() {
                  n.buffSource.loop = !!t, e ? n.buffSource.start(0, e / 1e3) : n.buffSource.start(0), n.startTimes = Date.now(), n.effectEndedListener = n.effectEndedHandler.bind(n), n.buffSource.addEventListener('ended', n.effectEndedListener), i && i();
              })) : this.logger.error('amu.pe.1 no audio buffer found') : this.logger.error('amu.pe.1 audio is mixing');
          }, e.prototype.pauseEffect = function() {
              this.stopMixingAudio(), this.resumeOffset = (this.pauseTimes - this.startTimes + this.startOffset) % (1e3 * this.audioBuffer.duration);
          }, e.prototype.resumeEffect = function() {
              this.playEffect(this.resumeOffset, this.loop, this.replace, null, this.effectEndedCallBack), this.startOffset = this.resumeOffset;
          }, e.prototype.mixEffect = function(e, t) {
              this.localStream ? (this.ac = new ('undefined' != typeof webkitAudioContext ? webkitAudioContext : AudioContext), this.gainNode = this.ac.createGain(), this.buffSource = this.ac.createBufferSource(), this.buffSource.buffer = e, this.buffSource.connect(this.gainNode), this.replaceTrack() && t()) : this.logger.error('amu.me.0 localStream can not be found');
          }, e.prototype.startMixingAudio = function(e, t) {
              return this.replace = t || !1, this.isMixAudio ? (this.logger.error('amu.sma.0 audio is mixing'), !1) : this.localStream ? (e.captureStream = e.captureStream || e.mozCaptureStream || e.webkitCaptureStream, this.ac = new ('undefined' != typeof webkitAudioContext ? webkitAudioContext : AudioContext), this.gainNode = this.ac.createGain(), this.mixAudio = this.ac.createMediaStreamSource(e.captureStream()), this.mixAudio.connect(this.gainNode), this.replaceTrack()) : (this.logger.error('amu.sma.0 localStream can not be found'), !1);
          }, e.prototype.replaceTrack = function() {
              this.streamSource = this.ac.createMediaStreamSource(this.localStream.clone()), this.destination = this.ac.createMediaStreamDestination(), !this.replace && this.streamSource.connect(this.destination), this.gainNode.connect(this.destination);
              var e = this.destination.stream.getAudioTracks()[0],
                  t = this.peerConnection.getSenders().find(function(t) {
                      return t.track.kind === e.kind;
                  });
              return t ? (this.micTrack = this.localStream.getAudioTracks()[0], t.replaceTrack(e), this.localStream.removeTrack(this.micTrack), this.localStream.addTrack(e), this.isMixAudio = !0, !0) : (this.logger.error('amu.rt.0 no sender'), !1);
          }, e.prototype.stopMixingAudio = function() {
              var e = this;
              return this.isMixAudio ? this.localStream ? (this.peerConnection.getSenders().find(function(t) {
                  return t.track.kind === e.micTrack.kind;
              }).replaceTrack(this.micTrack), this.localStream.removeTrack(this.localStream.getAudioTracks()[0]), this.localStream.addTrack(this.micTrack), this.mixAudio ? (this.mixAudio.disconnect(this.gainNode), this.mixAudio = null) : this.buffSource && (this.buffSource.removeEventListener('ended', this.effectEndedListener), this.buffSource.stop(), this.pauseTimes = Date.now(), this.buffSource.disconnect(this.gainNode), this.buffSource = null), this.gainNode.disconnect(this.destination), this.micTrack = null, this.ac = null, this.isMixAudio = !1, !0) : (this.logger.error('amu.sma.1 localStream can not be found'), !1) : (this.logger.error('amu.sma.1 no mixing audio found'), !1);
          }, e.prototype.setMixingAudioVolume = function(e) {
              if (!this.gainNode) return this.logger.error('amu.sma.2 no mixing audio found'), !1;
              this.gainNode.gain.value = e;
          }, e.prototype.effectEndedHandler = function() {
              this.stopMixingAudio(), this.effectEndedCallBack && this.effectEndedCallBack();
          }, e;
      }();
      t.audioMixUtil = i;
  }, function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var i = function() {
          function e() {
          }

          return e.zegoSdp = function(e) {
              var t = e.split('\r\n'), r = [], i = [];
              t.forEach(function(e) {
                  var t = e.match(/a=rtpmap:(\d+)\s+((H264\/90000)|(opus\/48000\/2))/);
                  t && t[1] && t[2] && ('H264/90000' === t[2] && r.push(t[1]), 'opus/48000/2' === t[2] && i.push(t[1]));
              });
              var o = [];
              return t.map(function(e) {
                  var t = !0, n = e.match(/((a=rtcp-fb:)|(a=rtpmap:)|(a=fmtp:))(\d+)/);
                  if (n && n[5] && (r.concat(i).some(function(e) {
                      return e == n[5];
                  }) || (t = !1)), e.indexOf('m=video') > -1) {
                      var s = e.split(' ');
                      e = [s[0], s[1], s[2]].concat(r).join(' ');
                  } else if (e.indexOf('m=audio') > -1) {
                      s = e.split(' ');
                      e = [s[0], s[1], s[2]].concat(i).join(' ');
                  }
                  t && o.push(e);
              }), o.join('\r\n');
          }, e.getSDPByVideDecodeType = function(e, t) {
              var r = { str: '', arr: [], obj: { H264: [], H265: [], VP8: [], VP9: [], OHTER: [] } };
              if (!e.includes('m=video')) return e;
              var i = /m=video.+/.exec(e)[0];
              i = i.match(/[\s|\d]+/g)[1].replace(' ', ''), r.str = i, r.arr = r.str.split(' '), r.arr.forEach(function(t) {
                  var i = new RegExp('a=rtpmap:' + t + '.+').exec(e)[0];
                  i.includes('H264') ? r.obj.H264.push(t) : i.includes('H265') ? r.obj.H265.push(t) : i.includes('VP8') ? r.obj.VP8.push(t) : i.includes('VP9') ? r.obj.VP9.push(t) : r.obj.OHTER.push(t);
              }), r.obj.OHTER.forEach(function(t) {
                  var i = new RegExp('a=fmtp:' + t + '.+apt=(\\d+)').exec(e), o = i && i[1];
                  o && (r.obj.H264.includes(o) ? r.obj.H264.push(t) : r.obj.H265.includes(o) ? r.obj.H265.push(t) : r.obj.VP8.includes(o) ? r.obj.VP8.push(t) : r.obj.VP9.includes(o) && r.obj.VP9.push(t));
              });
              var o = [];
              return 'VP9' === t ? o = r.obj.H265.concat(r.obj.H264, r.obj.VP8) : 'VP8' === t ? o = r.obj.H265.concat(r.obj.H264, r.obj.VP9) : 'H264' === t ? o = r.obj.H265.concat(r.obj.VP8, r.obj.VP9) : 'H265' === t && (o = r.obj.VP8.concat(r.obj.H264, r.obj.VP9)), o.forEach(function(t) {
                  var i = r.arr.indexOf(t);
                  r.arr.splice(i, 1);
                  var o = new RegExp('a=rtpmap:' + t + '.+\\s\\n', 'g'),
                      n = new RegExp('a=rtcp-fb:' + t + '.+\\s\\n', 'g'),
                      s = new RegExp('a=fmtp:' + t + '.+\\s\\n', 'g');
                  e = (e = (e = e.replace(o, '')).replace(n, '')).replace(s, '');
              }), e = e.replace(i, r.arr.join(' '));
          }, e;
      }();
      t.sdpUtil = i;
  }, function(e, t, r) {
      'use strict';
      var i,
          o = this && this.__extends || (i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
              e.__proto__ = t;
          } || function(e, t) {
              for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
          }, function(e, t) {
              function r() {
                  this.constructor = e;
              }

              i(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r);
          }), n = this && this.__assign || Object.assign || function(e) {
              for (var t, r = 1, i = arguments.length; r < i; r++) for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
              return e;
          };
      Object.defineProperty(t, '__esModule', { value: !0 });
      var s = r(0), a = r(2), c = r(6), d = r(8), l = r(1), p = r(3), h = r(16), u = r(24), f = r(25),
          g = function(e) {
              function t() {
                  var t = this, r = new c.LoggerWeb, i = new u.StateCenter, o = new d.ZegoStreamCenterWeb(r, i);
                  return (t = e.call(this) || this).streamCenter = o, t.logger = r, t.stateCenter = i, t.audioMixing = new p.audioMixUtil(r), t.init(), t.bindWindowListener(), t;
              }

              return o(t, e), t.prototype.getSocket = function(e) {
                  return new WebSocket(e);
              }, t.prototype.enableCamera = function(e, t) {
                  return this.logger.debug('zc.p.ec.0 call'), 'boolean' != typeof t ? (this.logger.error('zc.p.ec.0 argument is not bool'), !1) : this.streamCenter.enableCamera(e, t);
              }, t.prototype.enableMicrophone = function(e, t) {
                  return this.logger.debug('zc.p.em.0 call'), 'boolean' != typeof t ? (this.logger.error('zc.p.em.0 argument is not bool'), !1) : this.streamCenter.enableMicrophone(e, t);
              }, t.prototype.setLocalAudioOutput = function(e, t) {
                  return this.logger.debug('zc.p.slao call'), 'string' != typeof t ? (console.error('audiooutput is not string'), !1) : this.streamCenter.setStreamAudioOutput(e, t);
              }, t.prototype.setPlayAudioOutput = function(e, t) {
                  return this.logger.debug('zc.p.spao call'), 'string' != typeof t ? (console.error('audiooutput is not string'), !1) : this.streamCenter.setPlayStreamAudioOutput(e, t);
              }, t.prototype.setCustomSignalUrl = function(e) {
                  return this.logger.debug('zc.p.scs.0 call: ' + e), e && 0 != e.length ? 0 != e.indexOf('wss://') ? (this.logger.error('zc.p.scs.0 url is not correct'), !1) : void (this.stateCenter.customUrl = e) : (this.logger.error('zc.p.scs.0 param error'), !1);
              }, t.prototype.setQualityMonitorCycle = function(e) {
                  'number' == typeof e && e >= 1e3 && this.streamCenter.setQualityMonitorCycle(e);
              }, t.prototype.startPlayingStream = function(e, t, r, i) {
                  var o = this;
                  if (this.logger.debug('zc.p.sps.0 call'), !e || '' === e) return this.logger.error('zc.p.sps.0 param error'), !1;
                  if (!t) return this.logger.error('zc.p.sps.0 don\'t have remoteVideo'), !1;
                  if (this.stateCenter.customUrl) return this.streamCenter.setPlayStateStart(e, t, r, i) ? this.streamCenter.startPlayingStream(e, [this.stateCenter.customUrl]) : (this.logger.error('zc.p.sps.0 cannot start play'), !1);
                  if (!this.stateCenter.isLogin()) return this.logger.error('zc.p.sps.0 not login'), !1;
                  for (var n = !1, c = 0; c < this.stateCenter.streamList.length; c++) if (this.stateCenter.streamList[c].stream_id === e) {
                      n = !0;
                      break;
                  }
                  if (0 == n && this.logger.info('zc.p.sps.0 cannot find stream'), this.stateCenter.pullLimited || (e = NaN + e), !this.streamCenter.setPlayStateStart(e, t, r, i)) return this.logger.info('zc.p.sps.0 cannot start play'), !1;
                  var d = { stream_id: e, dispatch_type: 2, stream_type: 3, an_type: this.stateCenter.anType };
                  this.socketCenter.registerRouter('zegochat_js.stream_dispatch_rsp', function(e) {
                      o.handleFetchWebRtcUrlRsp(e);
                  });
                  var l = this.socketCenter.sendMessage('zegochat_js.stream_dispatch_req', d, void 0, function(t, r) {
                      t == s.sdkErrorList.SEND_MSG_TIMEOUT ? o.onPlayStateUpdate(s.ENUM_PLAY_STATE_UPDATE.error, e, a.playErrorList.DISPATCH_TIMEOUT) : o.onPlayStateUpdate(s.ENUM_PLAY_STATE_UPDATE.error, e, a.playErrorList.DISPATCH_ERROR), o.streamCenter.stopPlayingStream(e);
                  });
                  return this.stateCenter.playSeq.push(l), !0;
              }, t.prototype.stopPlayingStream = function(e) {
                  if (this.logger.debug('zc.p.sps.1.0 call'), !e || '' === e) return this.logger.info('zc.p.sps.1.0 param error'), !1;
                  for (var t in this.streamCenter.stopPlayingStream(e), this.stateCenter.streamUrlMap) if (this.stateCenter.streamUrlMap[t] === e) {
                      delete this.stateCenter.streamUrlMap[t];
                      break;
                  }
                  return this.logger.debug('zc.p.sps.1.0 call success'), !0;
              }, t.prototype.startPreview = function(e, t, r, i) {
                  if (this.logger.debug('zc.p.sp.0 call'), !e) return this.logger.error('zc.p.sp.0 no localVideo'), !1;
                  if (t.audioBitRate) {
                      if ('number' != typeof t.audioBitRate) return void this.logger.error('zc.p.sp.0 audioBitRate must be number');
                      if (t.audioBitRate < 48e3) return void this.logger.error('zc.p.sp.0 audioBitRate cannot less 48000');
                      this.stateCenter.audioBitRate = t.audioBitRate;
                  }
                  return this.streamCenter.startPreview(e, t, r, i);
              }, t.prototype.stopPreview = function(e) {
                  return this.logger.debug('zc.p.sp.1 call'), e ? this.streamCenter.stopPreview(e) : (this.logger.info('zc.p.sp.1 param error'), !1);
              }, t.prototype.startPublishingStream = function(e, t, r, i) {
                  var o = this;
                  if (this.logger.debug('zc.p.sps.1 call'), !e || 'string' != typeof e) return this.logger.error('zc.p.sps.1 param error'), !1;
                  if (i || (i = {}), i.audioBitRate = this.stateCenter.audioBitRate, this.stateCenter.customUrl && 0 != this.stateCenter.customUrl.length) return this.stateCenter.publishStreamList[e] = {
                      state: s.ENUM_PUBLISH_STREAM_STATE.tryPublish,
                      extra_info: r,
                  }, this.streamCenter.setPublishStateStart(e, t, i) ? this.streamCenter.startPublishingStream(e, [this.stateCenter.customUrl]) : (this.logger.info('zc.p.sps.1 cannot start publish'), !1);
                  if (!this.stateCenter.isLogin()) return this.logger.error('zc.p.sps.1 not login'), !1;
                  if (this.stateCenter.publishStreamList[e] = {
                      state: s.ENUM_PUBLISH_STREAM_STATE.tryPublish,
                      extra_info: r,
                  }, !this.streamCenter.setPublishStateStart(e, t, i)) return this.logger.error('zc.p.sps.1 cannot start publish'), !1;
                  this.logger.info('zc.p.sps.1 start publish');
                  var n = { stream_id: e, dispatch_type: 1, stream_type: 3, an_type: this.stateCenter.anType };
                  this.socketCenter.registerRouter('zegochat_js.stream_dispatch_rsp', function(e) {
                      o.handleFetchWebRtcUrlRsp(e);
                  });
                  var c = this.socketCenter.sendMessage('zegochat_js.stream_dispatch_req', n, void 0, function(t, r) {
                      t == s.sdkErrorList.SEND_MSG_TIMEOUT ? o.onPublishStateUpdate(s.ENUM_PUBLISH_STATE_UPDATE.error, e, a.publishErrorList.DISPATCH_TIMEOUT) : o.onPublishStateUpdate(s.ENUM_PUBLISH_STATE_UPDATE.error, e, a.publishErrorList.DISPATCH_ERROR), o.streamCenter.stopPublishingStream(e);
                  });
                  return this.stateCenter.publishSeq.push(c), !0;
              }, t.prototype.stopPublishingStream = function(e) {
                  return this.logger.debug('zc.p.sps.1.1 call'), e ? (this.streamCenter.stopPublishingStream(e), this.stateCenter.publishStreamList[e] && (this.stateCenter.publishStreamList[e].state >= s.ENUM_PUBLISH_STREAM_STATE.update_info && this.streamHandler.updateStreamDeleted(e), delete this.stateCenter.publishStreamList[e]), !0) : (this.logger.info('zc.p.sps.1.1 param error'), !1);
              }, t.prototype.preloadEffect = function(e, t, r) {
                  var i = this;
                  e && 'number' == typeof e && t && 'string' == typeof t ? this.stateCenter.audioEffectBuffer[e] ? this.logger.error('zc.pe.0 audio buffer already exists') : this.audioMixing.preloadEffect(t, function(t, o) {
                      if (t) return i.logger.error('zc.pe.0 effect preload fail ' + t), void (r && r(t));
                      o && (i.stateCenter.audioEffectBuffer[e] = o, r && r());
                  }) : this.logger.error('zc.pe.0 params error');
              }, t.prototype.playEffect = function(e, t, r) {
                  if (e.streamId && 'string' == typeof e.streamId && e.effectId && 'number' == typeof e.effectId) if (this.stateCenter.audioEffectBuffer[e.effectId]) {
                      var i = this.stateCenter.audioEffectBuffer[e.effectId], o = this.getPublisher(e.streamId);
                      o ? i ? o.playEffect(e, i, t, r) : this.logger.error('zc.pe.1 no audio buffer found') : this.logger.error('zc.pe.1 publisher doesn\'t exist');
                  } else this.logger.error('zc,pe.1 audio buffer dosesn\'t exists'); else this.logger.error('zc.pe.1 params error');
              }, t.prototype.pauseEffect = function(e) {
                  if (e && 'string' == typeof e) {
                      var t = this.getPublisher(e);
                      t ? t.pauseEffect() : this.logger.error('zc.pe.2 publisher doesn\'t exist');
                  } else this.logger.error('zc.pe.2 streamid format error');
              }, t.prototype.resumeEffect = function(e) {
                  if (e && 'string' == typeof e) {
                      var t = this.getPublisher(e);
                      t ? t.resumeEffect() : this.logger.error('zc.re.0 publisher doesn\'t exist');
                  } else this.logger.error('zc.re.0 streamid format error');
              }, t.prototype.unloadEffect = function(e) {
                  return e && 'number' == typeof e ? (delete this.stateCenter.audioEffectBuffer[e], !0) : (this.logger.error('zc.ue.0 params error'), !1);
              }, t.prototype.startMixingAudio = function(e, t, r) {
                  if (this.logger.debug('zc.sma.0 call'), !e || 'string' != typeof e) return this.logger.error('zc.sma.0 stream id error'), !1;
                  if (!t) return this.logger.error('zc.sma.0 no audio'), !1;
                  var i = this.getPublisher(e);
                  return i ? i.startMixingAudio(t, r) : (this.logger.error('zc.sma.0 publisher doesn\'t exist'), !1);
              }, t.prototype.stopMixingAudio = function(e) {
                  if (!e || 'string' != typeof e) return this.logger.error('zc.sma.1 param streamid format error'), !1;
                  var t = this.getPublisher(e);
                  return t ? t.stopMixingAudio() : (this.logger.error('zc.sma.1 publisher doesn\'t exist'), !1);
              }, t.prototype.setMixingAudioVolume = function(e, t) {
                  if (this.logger.debug('zc.sma.2 call'), !e || 'string' != typeof e || 'number' != typeof t || t < 0 || t > 100) return this.logger.error('zc.sma.2 param error'), !1;
                  var r = this.getPublisher(e);
                  return r ? r.audioMixing.setMixingAudioVolume(t / 100) : (this.logger.error('zc.sma.2 publisher doesn\'t exist'), !1);
              }, t.prototype.getPublisher = function(e) {
                  var t = null, r = this.streamCenter.getTotalStreamId(e);
                  return this.streamCenter.publisherList[r] && this.streamCenter.publisherList[r].publisher && (t = this.streamCenter.publisherList[r].publisher), t;
              }, t.prototype.startScreenShotChrome = function(e) {
                  if (!t.screenShotReady) return this.logger.error('zc.b.ss Please install the extension:1. Go to chrome://extensions  2. Check: "Enable Developer mode   3. Click: "Load the unpacked extension... 4. Choose "extension" folder from the repository 5. Reload this page'), !1;
                  window.postMessage({
                      type: 'SS_UI_REQUEST',
                      text: 'start',
                  }, '*'), l.ClientUtil.registerCallback('screenShare', { success: e }, this.stateCenter.callbackList);
              }, t.prototype.startScreenSharing = function(e, t) {
                  var r = this;
                  'getDisplayMedia' in navigator.mediaDevices ? navigator.mediaDevices.getDisplayMedia({ audio: e }).then(function(e) {
                      r.stateCenter.screenShotStream = e, t(!0, e);
                  }).catch(function(e) {
                      r.logger.error('zc.b.sss ' + e), t(!1, null, e);
                  }) : this.logger.error('zc.b.sss brower does not support getDisplayMedia');
              }, t.prototype.startScreenShotFirFox = function(e, t, r) {
                  var i = this, o = { video: {}, audio: t };
                  o.video.mediaSource = e, navigator.mediaDevices.getUserMedia(o).then(function(e) {
                      i.stateCenter.screenShotStream = e, r(!0, e);
                  }).catch(function(e) {
                      i.logger.error('zc.b.ssf ' + e), r(!1, null);
                  });
              }, t.prototype.stopScreenShot = function() {
                  this.stateCenter.screenShotStream.getTracks().forEach(function(e) {
                      e.stop();
                  }), window.postMessage({ type: 'SS_UI_CANCEL', text: 'start' }, '*');
              }, t.prototype.WebrtcOnPublishStateUpdateHandle = function(e, t, r) {
                  this.stateCenter.publishStreamList[t].state == s.ENUM_PUBLISH_STREAM_STATE.publishing && this.onPublishStateUpdate(e, t, r);
              }, t.prototype.setCDNInfo = function(e, t) {
                  e.urls_flv = t.urls_flv, e.urls_hls = t.urls_m3u8, e.urls_https_flv = t.urls_https_flv, e.urls_https_hls = t.urls_https_m3u8, e.urls_rtmp = t.urls_rtmp;
              }, t.prototype.loginBodyData = function() {
                  return {
                      room_header: {
                          room_id: this.stateCenter.roomid,
                          room_sid: this.stateCenter.roomSid || '0',
                          room_user_session_id: this.stateCenter.roomSessionId || '0',
                      }, room_name: '', role: this.stateCenter.role, room_flag: this.stateCenter.roomFlag,
                  };
              }, t.prototype.loginHallBodyData = function() {
                  return {
                      user_id: this.stateCenter.idName,
                      device_id: this.stateCenter.deviceId,
                      session_expire: this.stateCenter.sessionExpire,
                      user_name: this.stateCenter.nickName,
                      device_type: this.stateCenter.deviceType,
                      net_type: this.stateCenter.netType,
                      token: this.stateCenter.token,
                  };
              }, t.prototype.dispatchBodyData = function() {
                  return {
                      seq: 1,
                      timestamp: (new Date).getTime,
                      app_id: this.stateCenter.appid,
                      user_id: this.stateCenter.idName,
                      user_name: this.stateCenter.nickName,
                      net_type: this.stateCenter.netType,
                      device_id: this.stateCenter.deviceId,
                      login_token: this.stateCenter.token,
                      an_type: this.stateCenter.anType,
                  };
              }, t.prototype.screenStreamFrom = function(e, t, r) {
                  var i = this, o = {};
                  o.audio = {
                      mandatory: {
                          chromeMediaSource: 'desktop',
                          chromeMediaSourceId: e,
                      },
                  }, o.video = {
                      mandatory: {
                          chromeMediaSource: 'desktop',
                          chromeMediaSourceId: e,
                          maxWidth: window.screen.width,
                          maxHeight: window.screen.height,
                      },
                  }, !t && (o.audio = !1), navigator.mediaDevices.getUserMedia(o).then(function(e) {
                      i.stateCenter.screenShotStream = e, r(!0, e);
                  }).catch(function(e) {
                      i.logger.error('zc.b.ssf ' + e), r(!1, null, e);
                  });
              }, t.prototype.queueCmdHandler = function(e, t, r, i) {
                  var o = this;
                  t && 'string' == typeof t ? this.stateCenter.hallState === s.ENUM_RUN_STATE.login ? (this.socketCenter.registerRouter(t, function(e) {
                      if (e.body.code && 0 !== e.body.code) return o.logger.error('zc.qh.0 server error=', e.body.code), void i(e);
                      i(e), o.logger.info('zc.qh.0 call success.');
                  }), e && r && 'string' == typeof e && 0 !== e.length && this.socketCenter.sendMessage(e, r)) : this.logger.error('zc.qh.0 hallState is not login') : this.logger.error('zc.qh.0 rspCmd error');
              }, t.prototype.getQueueSimpleList = function(e) {
                  var t = this;
                  this.queueCmdHandler('zegochat_js.queue_list_req', 'zegochat_js.queue_list_rsp', {}, function(r) {
                      r.body.code && 0 !== r.body.code ? (t.logger.error('zc.gqs.0 get list error, code = ' + r.body.code), e(r.body.message, null)) : e('', r.body.queues);
                  });
              }, t.isSupportWebrtc = function() {
                  return l.ClientUtil.isSupportWebrtc();
              }, t.isSupportH264 = function(e, t) {
                  l.ClientUtil.isSupportH264(e, t);
              }, t.supportDetection = function(e, t) {
                  navigator && navigator.mediaDevices && (this.screenShotReady || 'getDisplayMedia' in navigator.mediaDevices) ? l.ClientUtil.supportDetection(!0, e, t) : l.ClientUtil.supportDetection(!1, e, t);
              }, t.supportVideoCodeType = function(e, t) {
                  l.ClientUtil.supportVideoCodeType(e, t);
              }, t.prototype.enumDevices = function(e, r) {
                  t.enumDevices(e, r);
              }, t.enumDevices = function(e, t) {
                  void 0 !== navigator.mediaDevices && void 0 !== navigator.mediaDevices.enumerateDevices ? navigator.mediaDevices.enumerateDevices().then(function(t) {
                      for (var r = [], i = [], o = [], n = 0; n < t.length; n++) {
                          var s = t[n];
                          'audioinput' === s.kind && r.push({
                              label: s.label,
                              deviceId: s.deviceId,
                          }), 'audiooutput' === s.kind && i.push({
                              label: s.label,
                              deviceId: s.deviceId,
                          }), 'videoinput' === s.kind && o.push({ label: s.label, deviceId: s.deviceId });
                      }
                      e && e({ microphones: r, speakers: i, cameras: o });
                  }).catch(function(e) {
                      t && t(e);
                  }) : t && t('browser don\'t support enumerate devices');
              }, t.getAudioInfo = function(e, t, r) {
                  if (!e.srcObject) return console.error('srcObject is empty!'), !1;
                  var i = n({}, r);
                  return new f.MediaUtil(i).connectToSource(e.srcObject, function(e) {
                      t(e);
                  });
              }, t.handleDataAvailable = function(e) {
                  e.data && e.data.size > 0 && t.recordedBlobs.push(e.data);
              }, t.startRecord = function(e) {
                  var r = e.captureStream();
                  t.recordedBlobs = [];
                  var i = { mimeType: 'video/webm;codecs=vp9' };
                  MediaRecorder.isTypeSupported(i.mimeType) || (i = { mimeType: 'video/webm;codecs=vp8' }, MediaRecorder.isTypeSupported(i.mimeType) || (i = { mimeType: 'video/webm' }, MediaRecorder.isTypeSupported(i.mimeType) || (i = { mimeType: '' })));
                  try {
                      t.mediaRecorder = new MediaRecorder(r, i);
                  } catch (e) {
                      return void console.error('Exception while creating MediaRecorder:', e);
                  }
                  t.mediaRecorder.onstop = function(e) {
                      console.log('Recorder stopped: ', e);
                  }, t.mediaRecorder.ondataavailable = t.handleDataAvailable, t.mediaRecorder.start(10);
              }, t.stopRecord = function() {
                  t.mediaRecorder ? t.mediaRecorder.stop() : console.warn('please invoke startRecord first');
              }, t.resumeRecord = function() {
                  t.mediaRecorder ? t.mediaRecorder.resume() : console.warn('please invoke startRecord first');
              }, t.pauseRecord = function() {
                  t.mediaRecorder ? t.mediaRecorder.pause() : console.warn('please invoke startRecord first');
              }, t.saveRecord = function(e) {
                  if (t.mediaRecorder && t.recordedBlobs) {
                      var r = new Blob(t.recordedBlobs, { type: 'video/webm' }), i = window.URL.createObjectURL(r),
                          o = document.createElement('a');
                      o.style.display = 'none', o.href = i, o.download = e + '.webm', document.body.appendChild(o), o.click(), setTimeout(function() {
                          document.body.removeChild(o), window.URL.revokeObjectURL(i);
                      }, 100);
                  } else console.warn('please invoke startRecord first');
              }, t.takeSnapShot = function(e, t) {
                  if (e && 0 !== e.videoHeight) {
                      var r = document.createElement('canvas');
                      r.width = e.videoWidth, r.height = e.videoHeight, r.getContext('2d').drawImage(e, 0, 0, r.width, r.height), t.src = r.toDataURL('image/jpeg');
                  } else console.error('video can not empty');
              }, t.saveSnapShot = function(e, t) {
                  if (e && 0 !== e.videoHeight) {
                      var r = document.createElement('canvas');
                      r.width = e.videoWidth, r.height = e.videoHeight, r.getContext('2d').drawImage(e, 0, 0, r.width, r.height), r.toBlob(function(e) {
                          var r = window.URL.createObjectURL(e), i = document.createElement('a');
                          i.style.display = 'none', i.href = r, i.download = t + '.jpeg', document.body.appendChild(i), i.click(), setTimeout(function() {
                              document.body.removeChild(i), window.URL.revokeObjectURL(r);
                          }, 100);
                      });
                  } else console.error('video can not empty');
              }, t.prototype.bindWindowListener = function() {
                  var e = this,
                      t = navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) ? 'pagehide' : 'beforeunload';
                  window.addEventListener(t, function(t) {
                      for (var r in window.event.cancelBubble = !0, e.streamCenter.publisherList) e.stopPublishingStream(r);
                      for (var r in e.streamCenter.playerList) e.stopPublishingStream(r);
                      console.log(e.streamCenter.playerList), console.log(e.streamCenter.publisherList), e.leaveRoom();
                  }), window.addEventListener('message', function(t) {
                      var r = t.data, i = r.type, o = r.streamId, n = r.canRequestAudioTrack;
                      t.origin;
                      'SS_DIALOG_SUCCESS' === i && e.screenStreamFrom(o, n, l.ClientUtil.actionSuccessCallback('screenShare', e.stateCenter.callbackList)), 'SS_DIALOG_CANCEL' === i && (e.logger.error('zc.b.ss ' + i), l.ClientUtil.actionSuccessCallback('screenShare', e.stateCenter.callbackList)(!1, null, i));
                  });
              }, t.prototype.startVideoTalk = function(e, t) {
                  var r = this, i = e.role, o = (e.streamList, e.previewConfig), n = e.localVideo, s = e.remoteVide,
                      a = e.streamId, c = 0;
                  1 === i ? !this.streamCenter.checkPreview(n) && this.startPreview(n, o, function() {
                      if (r.stateCenter.streamList && r.stateCenter.streamList.length > 0) {
                          var e = r.stateCenter.streamList[0], t = e.stream_id, i = e.extra_info,
                              o = i ? JSON.parse(i).videoCodeType : 'H264';
                          r.startPlayingStream(t, s, '', { videoDecodeType: o || 'H264' }), r.startPublishingStream(a, n, i, { videoDecodeType: o || 'H264' });
                      }
                      r.onStreamUpdatedCustomer = function(e, t) {
                          var i = t[0], o = i.stream_id, c = i.extra_info,
                              d = c ? JSON.parse(c).videoCodeType : 'H264';
                          0 == e ? (r.startPlayingStream(o, s, '', { videoDecodeType: d || 'H264' }), r.startPublishingStream(a, n, c, { videoDecodeType: d || 'H264' })) : (r.stopPlayingStream(o), r.onKickOut({
                              code: 'VideoTalkOut',
                              msg: 'ClientOut',
                          }));
                      };
                  }, function(e) {
                      t({ code: 'PreViewFailed', msg: e }), console.error('棰勮澶辫触', e);
                  }) : 0 === i ? l.ClientUtil.supportVideoCodeType(function(e) {
                      var i = e.H264, d = e.VP8;
                      e.Vp9, e.H265;
                      !r.streamCenter.checkPreview(n) && r.startPreview(n, o, function() {
                          var e = d ? 'VP8' : i ? 'H264' : null;
                          if (e) {
                              var o = { videoCodeType: e };
                              r.startPublishingStream(a, n, JSON.stringify(o), { videoDecodeType: e });
                          } else console.error('娌℃湁鍙敤瑙嗛缂栫爜绫诲瀷'), t({ code: 'VideoCodeNotSupport', msg: null });
                      }, function(e) {
                          t({ code: 'PreViewFailed', msg: e }), console.error('棰勮澶辫触', e);
                      }), r.onStreamUpdatedCustomer = function(e, t) {
                          if (0 == e) {
                              var i = t[0], o = i.stream_id, n = i.extra_info,
                                  a = n ? JSON.parse(n).videoCodeType : 'H264';
                              r.startPlayingStream(o, s, '', { videoDecodeType: a });
                          } else r.onKickOut({ code: 'VideoTalkOut', msg: '鍧愬腑绔€€鍑�' });
                      }, r.onPublishStateUpdateCustomer = function(e, o, s) {
                          if (1 === e && 0 === c) {
                              c++;
                              var l = i ? 'H264' : d ? 'VP8' : null;
                              if (l) {
                                  r.stopPublishingStream(o);
                                  var p = { videCodeType: l };
                                  r.startPublishingStream(a, n, JSON.stringify(p), { videoDecodeType: l });
                              } else t({ code: 'VideoCodeNotSupport', msg: null }), console.error('娌℃湁鍙敤瑙嗛缂栫爜绫诲瀷');
                          }
                      };
                  }, function() {
                      console.error('鑾峰彇 sdp 澶辫触');
                  }) : console.error('鍦烘櫙涓嶉€傜敤');
              }, t.screenShotReady = !1, t;
          }(h.BaseCenter);
      t.ZegoClient = g, window.addEventListener('message', function(e) {
          var t = e.data, r = t.type, i = (t.streamId, e.origin);
          i !== window.location.origin && console.warn('ScreenStream: you should discard foreign event from origin:', i), 'SS_PING' === r && (g.screenShotReady = !0);
      });
  }, function(e, t, r) {
      'use strict';
      var i,
          o = this && this.__extends || (i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
              e.__proto__ = t;
          } || function(e, t) {
              for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
          }, function(e, t) {
              function r() {
                  this.constructor = e;
              }

              i(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r);
          });
      Object.defineProperty(t, '__esModule', { value: !0 });
      var n = r(7), s = function(e) {
          function t() {
              return null !== e && e.apply(this, arguments) || this;
          }

          return o(t, e), t.prototype.openWebSocketLogServer = function(e) {
              if (this.url != e) {
                  if (this.url = e, !e) return;
                  if (null != this.websocket && 2 != this.websocket.readyState && 3 != this.websocket.readyState) return;
                  this.stopWebSocketServer(), this.websocket = new WebSocket(e), this.websocket.onopen = function(e) {
                  }, this.websocket.onclose = function(e) {
                      console.error('onclose   websocket error:', e);
                  }, this.websocket.onmessage = function(e) {
                  }, this.websocket.onerror = function(e) {
                      console.error('open log websocket error:' + e);
                  };
              }
          }, t.prototype.SendHttpsLog = function() {
              var e = this;
              if (0 != this.logCacheSend.length) {
                  var t = this.logCacheSend.join('\n'), r = new XMLHttpRequest;
                  r.onreadystatechange = function() {
                      if (4 == r.readyState) if (200 == r.status) {
                          if (0 == r.responseText.length) return;
                          try {
                              var t = JSON.parse(r.responseText).interval;
                              'number' == typeof t && e.logUploadInterval !== t && (e.timeInterval = t, e.openHttpsLogServer(e.url));
                          } catch (e) {
                              console.log('send result failed ' + e);
                          }
                      } else console.log('send failed ' + r.status);
                  }, r.open('POST', this.url, !0), r.send(t), this.logCacheSend = [];
              }
          }, t.prototype.logReportParamList = function(e, t) {
              var r = new Date, i = r.getFullYear() + '/';
              return i += (n.D[r.getMonth() + 1] || r.getMonth() + 1) + '/', i += (n.D[r.getDate()] || r.getDate()) + ' ', i += (n.D[r.getHours()] || r.getHours()) + ':', i += (n.D[r.getMinutes()] || r.getMinutes()) + ':', i += n.D[r.getSeconds()] || r.getSeconds(), i += '.' + r.getTime() % 1e3, t.time = i, t.level = e, t.console = 'rtc', t.appid = this.appid, t.roomid = this.roomid, t.userid = this.userid, t.id_name = this.userid, t.userName = this.userName, t.sessionid = this.sessionid, t.version = this.version, [JSON.stringify(t)];
          }, t;
      }(n.Logger);
      t.LoggerWeb = s;
  }, function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var i = r(0);
      t.D = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
      var o = function() {
          function e() {
              this.logUploadTimer = null, this.logUploadInterval = 1e4, this.logCache = [], this.logCacheSend = [], this.logCacheMax = 100;
          }

          return e.prototype.setLogLevel = function(e) {
              this.logLevel < i.ENUM_LOG_LEVEL.debug || this.logLevel > i.ENUM_LOG_LEVEL.report ? this.logLevel = i.ENUM_LOG_LEVEL.disable : this.logLevel = e;
          }, e.prototype.setRemoteLogLevel = function(e) {
              this.logRemoteLevel < i.ENUM_LOG_LEVEL.debug || this.logRemoteLevel > i.ENUM_LOG_LEVEL.report ? this.logRemoteLevel = i.ENUM_LOG_LEVEL.disable : this.logRemoteLevel = e;
          }, e.prototype.setSessionInfo = function(e, t, r, i, o, n, s) {
              this.appid = e, this.deviceid = s, this.roomid = t, this.sessionid = r, this.userid = i, this.userName = o, this.version = n;
          }, e.prototype.openLogServer = function(e) {
              try {
                  e.startsWith('wss:') || e.startsWith('ws:') ? (this.logType = i.ENUM_REMOTE_TYPE.websocket, this.openWebSocketLogServer(e)) : e.startsWith('https:') ? (this.logType = i.ENUM_REMOTE_TYPE.https, this.openHttpsLogServer(e)) : this.logType = i.ENUM_REMOTE_TYPE.disable;
              } catch (e) {
                  this.error(JSON.stringify(e));
              }
          }, e.prototype.stopLogServer = function() {
              this.logType == i.ENUM_REMOTE_TYPE.websocket ? this.stopWebSocketServer() : this.logType == i.ENUM_REMOTE_TYPE.https && (this.SendHttpsLog(), this.stopHttpsServer()), this.logType = i.ENUM_REMOTE_TYPE.disable;
          }, e.prototype.stopWebSocketServer = function() {
              this.websocket && (this.websocket.onclose = null, this.websocket.onerror = null, this.websocket.close(), this.websocket = null);
          }, e.prototype.openHttpsLogServer = function(e) {
              var t = this;
              this.url = e, e && (this.stopHttpsServer(), this.logUploadTimer || (this.logUploadTimer = setInterval(function() {
                  t.SendHttpsLog();
              }, this.logUploadInterval)));
          }, e.prototype.stopHttpsServer = function() {
              this.logUploadTimer && (clearInterval(this.logUploadTimer), this.logUploadTimer = null);
          }, e.prototype.report = function(e) {
              var t = this.logReportParamList(i.ENUM_LOG_LEVEL.report, e);
              this.logLevel !== i.ENUM_LOG_LEVEL.disable && this.logLevel <= i.ENUM_LOG_LEVEL.report && console.debug.apply(console, t), this.RemoteLog(i.ENUM_LOG_LEVEL.report, t, !0);
          }, e.prototype.debug = function() {
              for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
              var r = this.logParamList(i.ENUM_LOG_LEVEL.debug, e.join(''));
              this.logLevel !== i.ENUM_LOG_LEVEL.disable && this.logLevel <= i.ENUM_LOG_LEVEL.debug && console.debug.apply(console, r), this.log(i.ENUM_LOG_LEVEL.debug, r);
          }, e.prototype.info = function() {
              for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
              var r = this.logParamList(i.ENUM_LOG_LEVEL.info, e.join(''));
              this.logLevel !== i.ENUM_LOG_LEVEL.disable && this.logLevel <= i.ENUM_LOG_LEVEL.info && console.info.apply(console, r), this.log(i.ENUM_LOG_LEVEL.info, r);
          }, e.prototype.warn = function() {
              for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
              var r = this.logParamList(i.ENUM_LOG_LEVEL.warn, e.join(''));
              this.logLevel !== i.ENUM_LOG_LEVEL.disable && this.logLevel <= i.ENUM_LOG_LEVEL.warn && console.warn.apply(console, r), this.log(i.ENUM_LOG_LEVEL.warn, r);
          }, e.prototype.error = function() {
              for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
              var r = this.logParamList(i.ENUM_LOG_LEVEL.error, e.join(''));
              this.logLevel !== i.ENUM_LOG_LEVEL.disable && this.logLevel <= i.ENUM_LOG_LEVEL.error && console.error.apply(console, r), this.log(i.ENUM_LOG_LEVEL.error, r);
          }, e.prototype.log = function(e, t) {
              this.logRemoteLevel !== i.ENUM_LOG_LEVEL.disable && this.logRemoteLevel <= e && this.RemoteLog(e, t);
          }, e.prototype.RemoteLog = function(e, t, r) {
              if (void 0 === r && (r = !1), '' != this.url) if (this.logType == i.ENUM_REMOTE_TYPE.websocket) this.RemoteWebSocketLog(e, t); else if (this.logType == i.ENUM_REMOTE_TYPE.https) this.RemoteHttpsLog(e, t, r); else if (this.logLevel !== i.ENUM_LOG_LEVEL.disable && this.logLevel <= e) for (this.logCacheSend.push(t); this.logCacheSend.length > this.logCacheMax;) this.logCacheSend.shift();
          }, e.prototype.RemoteWebSocketLog = function(e, t) {
              if (null == this.websocket || 2 == this.websocket.readyState || 3 == this.websocket.readyState) {
                  var r = this.url;
                  this.url = '', this.openLogServer(r), this.logCacheSend.length < this.logCacheMax && this.logCacheSend.push(t);
              } else if (0 == this.websocket.readyState) this.logCacheSend.length < this.logCacheMax && this.logCacheSend.push(t); else if (1 == this.websocket.readyState) if (this.logCacheSend.length > 0) {
                  for (var i = '', o = 0; o < this.logCacheSend.length; o++) (i + this.logCacheSend[o]).length > 4e3 && (this.websocket.send(i), i = ''), i = i + this.logCacheSend[o] + '\n';
                  t = i + t, this.logCacheSend = [], this.websocket.send(t);
              } else this.websocket.send(t); else console.warn('wrong socket state:' + this.websocket.readyState), this.logCacheSend.length < this.logCacheMax && this.logCacheSend.push(t);
          }, e.prototype.RemoteHttpsLog = function(e, t, r) {
              this.logCacheSend.push(t), (this.logCacheSend.length >= this.logCacheMax || !0 === r) && this.SendHttpsLog();
          }, e.prototype.logParamList = function(e, r) {
              var i = new Date, o = i.getFullYear() + '/';
              o += (t.D[i.getMonth() + 1] || i.getMonth() + 1) + '/', o += (t.D[i.getDate()] || i.getDate()) + ' ', o += (t.D[i.getHours()] || i.getHours()) + ':', o += (t.D[i.getMinutes()] || i.getMinutes()) + ':', o += t.D[i.getSeconds()] || i.getSeconds(), o += '.' + i.getTime() % 1e3;
              var n = r.substr(0, r.indexOf(' '));
              0 == n.length && (n = r);
              var s = r.substr(r.indexOf(' ') + 1, 4500);
              0 == s.length && (s = '');
              var a = {
                  time: o,
                  level: e,
                  action: n,
                  content: s,
                  appid: this.appid,
                  deviceid: this.deviceid,
                  roomid: this.roomid,
                  userid: this.userid,
                  userName: this.userName,
                  sessionid: this.sessionid,
              };
              return [JSON.stringify(a)];
          }, e;
      }();
      t.Logger = o;
  }, function(e, t, r) {
      'use strict';
      var i,
          o = this && this.__extends || (i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
              e.__proto__ = t;
          } || function(e, t) {
              for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
          }, function(e, t) {
              function r() {
                  this.constructor = e;
              }

              i(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r);
          });
      Object.defineProperty(t, '__esModule', { value: !0 });
      var n = r(9), s = r(10), a = r(11), c = r(2), d = r(0), l = r(13), p = r(14), h = function(e) {
          function t(t, r) {
              var i = e.call(this, t, r) || this;
              return i.testEnvironment = !1, i.heartbeatTimer = null, i.heartbeatInterval = 1e4, i.qualityTimerInterval = 3e3, i.maxRetryCount = 5, i.previewVideoList = [], i.signalList = {}, i.checkMessageTimeout = function() {
                  for (var e in i.signalList) i.signalList[e].signal && i.signalList[e].signal.checkMessageTimeout();
              }, i.getAllInUseUrl = function() {
                  var e = [];
                  for (var t in i.signalList) e.push(t);
                  return e;
              }, i.onDisconnectHandle = function(e) {
                  if (i.logger.info('zsc.od.0 call'), i.signalList[e]) {
                      for (var t = i.signalList[e], r = 0; r < t.publishConnectedList.length; r++) {
                          var o = i.publisherList[t.publishConnectedList[r]];
                          o && o.publisher && o.publisher.onDisconnect();
                      }
                      for (r = 0; r < t.playConnectedList.length; r++) {
                          var n = i.playerList[t.playConnectedList[r]];
                          n && n.player && n.player.onDisconnect();
                      }
                      delete i.signalList[e], i.stopSignalHeartbeat();
                  }
              }, i.logger = t, i.stateCenter = r, i.dataReport = new n.ZegoDataReport(i.logger), i;
          }

          return o(t, e), t.prototype.onSignalDisconnected = function(e) {
          }, t.prototype.setQualityMonitorCycle = function(e) {
              this.logger.debug('zsc.qmc.0 timeInterval ' + e), this.qualityTimerInterval = e;
          }, t.prototype.setSessionInfo = function(e, t, r, i) {
              this.logger.debug('zsc.ssi.0 called'), this.appid = e, this.userid = t, this.token = r, this.testEnvironment = i;
          }, t.prototype.onPlayStateUpdate = function(e, t, r) {
          }, t.prototype.onPlayQualityUpdate = function(e, t) {
          }, t.prototype.onPublishStateUpdate = function(e, t, r) {
          }, t.prototype.onPublishQualityUpdate = function(e, t) {
          }, t.prototype.onUpdateHeartBeartIntervalHandle = function(e) {
              e != this.heartbeatInterval && (this.logger.debug('zsc.uhb.0 update ' + e), this.heartbeatTimer && (clearTimeout(this.heartbeatTimer), this.heartbeatTimer = null), this.heartbeatInterval = e, this.startSignalHeartbeat());
          }, t.prototype.enableMicrophone = function(e, t) {
              var r = this.checkPreview(e);
              return r ? r.enableMicrophone(t) : (this.logger.info('zsc.em.0 no preview'), !1);
          }, t.prototype.enableCamera = function(e, t) {
              var r = this.checkPreview(e);
              return r ? r.enableCamera(t) : (this.logger.error('zsc.ec.0 no preview'), !1);
          }, t.prototype.startPreview = function(e, t, r, i) {
              if (!e) return this.logger.error('zsc.sp.0 localVideo null'), !1;
              var o = this.checkPreview(e);
              return o ? (this.logger.warn('zsc.sp.0 localvideo already exist'), !0) : (o = new s.ZegoPreview(this.logger), this.previewVideoList.push(o), o.startPreview(e, t, r, i), this.logger.debug('zsc.sp.0 call success'), !0);
          }, t.prototype.stopPreview = function(e) {
              if (!e) return this.logger.warn('zsc.sp.0 localVideo null'), !1;
              for (var t in this.publisherList) this.publisherList[t].localVideo === e && (this.publisherList[t].localVideo = null);
              var r = this.checkPreview(e);
              return r ? (r.previewSuc && (r.stopPreview(), this.removePreview(r)), !0) : (this.logger.warn('zsc.sp.0 no preview'), !1);
          }, t.prototype.setPublishStateStart = function(e, t, r) {
              var i = this, o = this.getTotalStreamId(e);
              if (this.publisherList[o]) return this.logger.error('zsc.pss.0 publisher already exist'), !1;
              var n = new a.ZegoPublish(this.logger, null, this.dataReport, this.qualityTimerInterval);
              return n.onPublishStateUpdate = function(t, r, o) {
                  var n = i.publisherList[r];
                  n ? i.onPublishStateUpdate(t, n.streamId, o) : i.logger.error('zsc.psuh.0 cannot find publish ' + e);
              }, n.onPublishQualityUpdate = function(t, r) {
                  var o = i.publisherList[t];
                  o ? i.onPublishQualityUpdate(o.streamId, r) : i.logger.error('zsc.psuh.0 cannot find publish ' + e);
              }, this.publisherList[o] = {
                  localVideo: t,
                  publisher: n,
                  serverUrls: [],
                  retryCount: 0,
                  streamId: e,
                  playOption: r,
              }, this.dataReport.eventStart(n.reportSeq, 'GetSignalUrl'), !0;
          }, t.prototype.getTotalStreamId = function(e) {
              if (this.testEnvironment) {
                  var t = 'zegotest-' + this.appid + '-' + e;
                  return this.logger.info('zsc.gts.0 test streamid ' + t), t;
              }
              return e;
          }, t.prototype.startPublishingStream = function(e, t, r) {
              this.logger.info('zsc.sps.0 call');
              var i = this.getTotalStreamId(e), o = this.publisherList[i];
              if (!o) return this.logger.error('zsc.sps.0 publisher don\'t exist'), !1;
              var n = o.publisher;
              if (this.dataReport.eventEndWithMsg(n.reportSeq, 'GetSignalUrl', { urls: t }), !t || 0 === t.length) return this.onPublishStateUpdate(c.ENUM_PUBLISH_STATE_UPDATE.error, e, c.publishErrorList.DISPATCH_ERROR), this.logger.info('zsc.sps.0 server don\'t have signal url'), !1;
              var s = t[0];
              return o.serverUrls = o.serverUrls.concat(t), this.connectPublishServer(i, s);
          }, t.prototype.updateWaitingList = function(e, t, r, i, o) {
              t ? e.publishWaitingList.push({
                  streamId: r,
                  success: i,
                  error: o,
              }) : e.playWaitingList.push({ streamId: r, success: i, error: o });
          }, t.prototype.publishStream = function(e) {
              var t = this.publisherList[e].publisher;
              if (t) {
                  var r = null, i = null, o = this.publisherList[e].playOption,
                      n = this.checkPreview(this.publisherList[e].localVideo);
                  n && (r = n.localStream, i = n.videoInfo), r || this.logger.info('zsc.ps.0 no localStream'), this.logger.debug('zsc.ps.0 call success'), t.startPublish(e, r, i, o);
              } else this.logger.info('zsc.ps.0 publisher don\'t exist');
          }, t.prototype.connectPublishServer = function(e, t) {
              var r = this, i = this.publisherList[e];
              return i ? (this.dataReport.eventStart(i.publisher.reportSeq, 'ConnectServer'), this.connetWithReuseSignalServer(e, !0, t, function(e, i) {
                  var o = r.publisherList[e];
                  if (o) {
                      var n = o.publisher;
                      if (n) {
                          r.dataReport.eventEndWithMsg(n.reportSeq, 'ConnectServer', { result: 0, server: t });
                          var s = i.tokenInfo;
                          r.logger.info('zsc.cps.0 update token success'), s && s.report && (n.qualityUpload = s.report, n.qualityUploadInterval = s.report_interval), n.signal = i.signal, o.retryCount = 0, r.publishStream(e), r.getTokenSuccess();
                      } else r.logger.info('zsc.cps.1 check publisher don\'t exist');
                  } else r.logger.info('zsc.cps.0 after connect publisher don\'t exist');
              }, function(e, t) {
                  r.logger.error('zsc.cps.0 update token failed ' + t);
                  var i = r.publisherList[e];
                  if (i) if (r.shouldRetry(i, t)) {
                      r.logger.info('zsc.cps.1 retry connect');
                      var o = i.serverUrls[0];
                      i.serverUrls.splice(0, 1), i.retryCount += 1, r.connectPublishServer(e, o);
                  } else r.onPublishStateUpdate(c.ENUM_PUBLISH_STATE_UPDATE.error, e, c.publishErrorList.TOKEN_ERROR); else r.logger.info('zsc.cps.0 after connect publisher don\'t exist');
              }), !0) : (this.logger.error('zsc.cps.0 publisher don\'t exist'), !1);
          }, t.prototype.shouldRetry = function(e, t) {
              return 0 != e.serverUrls.length && (!(e.retryCount >= this.maxRetryCount) && 3 == t);
          }, t.prototype.getTokenSuccess = function() {
              this.logger.debug('zsc.gts.0 call');
          }, t.prototype.stopPublishingStream = function(e) {
              var t = this.getTotalStreamId(e), r = this.publisherList[t];
              r ? (r.publisher && (r.publisher.stopPublish(), delete r.publisher), this.removeStreamFromSignal(!0, t), this.stopSignalHeartbeat(), delete this.publisherList[t], this.logger.debug('zsc.sps.0.1 call success')) : this.logger.warn('zsc.sps.0.1 publisher don\'t exist');
          }, t.prototype.setPlayStreamAudioOutput = function(e, t) {
              var r = this.getTotalStreamId(e);
              if (null != t && 0 != t.length) {
                  this.logger.debug('zsc.psao.1 device ' + t);
                  var i = this.playerList[r];
                  return i ? i.player ? i.player.setAudioDestination(t) : (this.logger.info('zsc.psao.1 player don\'t exist'), !1) : (this.logger.info('zsc.psao.1 play don\'t exist'), !1);
              }
              return !1;
          }, t.prototype.setStreamAudioOutput = function(e, t) {
              var r = this;
              return !(null == t || 0 == t.length || !e) && (this.logger.debug('zsc.ssao.0 device ' + t), e ? 'undefined' !== e.sinkId ? (e.setSinkId(t).then(function() {
                  r.logger.info('zsc.ssao.0 success device: ' + t);
              }).catch(function(e) {
                  r.logger.info('zsc.ssao.0 ' + e.name);
              }), !0) : (this.logger.error('zsc.ssao.0 browser does not suppport'), !1) : (this.logger.error('zsc.ssao.0 no localVideo'), !1));
          }, t.prototype.connetWithReuseSignalServer = function(e, t, r, i, o) {
              var n = this;
              this.logger.info('zsc.crss.0 begin ' + r);
              var s = null;
              if (this.signalList[r]) (s = this.signalList[r]).state == d.ENUM_SIGNAL_STATE.connected ? (this.logger.info('zsc.crss.0 already connected ' + r + ' streamId: ' + e), t ? s.publishConnectedList.push(e) : s.playConnectedList.push(e), i(e, s)) : s.state == d.ENUM_SIGNAL_STATE.connecting && (this.logger.debug('zsc.crss.0 signal is connecting ' + r + ' streamId: ' + e), this.updateWaitingList(s, t, e, i, o)); else {
                  this.logger.info('zsc.crss.0 new signal ' + r + ' streamId: ' + e);
                  var a = new l.ZegoSignal(this.logger, this.stateCenter);
                  a.setSessionInfo(this.appid, this.userid), a.onUpdateHeartBeartInterval = this.onUpdateHeartBeartIntervalHandle, a.onDisconnect = this.onDisconnectHandle, this.signalList[r] = {
                      signal: a,
                      state: d.ENUM_SIGNAL_STATE.connecting,
                      publishWaitingList: [],
                      playWaitingList: [],
                      publishConnectedList: [],
                      playConnectedList: [],
                      tokenInfo: null,
                  }, this.updateWaitingList(this.signalList[r], t, e, i, o), a.connectServer(this.token, r, function(e, t, i) {
                      s = n.signalList[r];
                      var o, a, c = 0;
                      if (0 != e) {
                          for (n.logger.debug('zsc.crss.0 connect failed ' + t), c = 0; c < s.publishWaitingList.length; c++) (o = s.publishWaitingList[c]).error && o.error(o.streamId, e);
                          for (c = 0; c < s.playWaitingList.length; c++) (a = s.playWaitingList[c]).error && a.error(a.streamId, e);
                          delete n.signalList[r];
                      } else {
                          for (n.logger.debug('zsc.crss.0 connected success ' + t), s.state = d.ENUM_SIGNAL_STATE.connected, s.tokenInfo = i, c = 0; c < s.publishWaitingList.length; c++) (o = s.publishWaitingList[c]).success && o.success(o.streamId, s), s.publishConnectedList.push(o.streamId);
                          for (c = 0; c < s.playWaitingList.length; c++) (a = s.playWaitingList[c]).success && a.success(a.streamId, s), s.playConnectedList.push(a.streamId);
                          s.publishWaitingList = [], s.playWaitingList = [], null == n.heartbeatTimer && n.startSignalHeartbeat();
                      }
                  });
              }
          }, t.prototype.setPlayStateStart = function(e, t, r, i) {
              var o = this.getTotalStreamId(e);
              if (this.playerList[o]) return this.logger.warn('zsc.pss.1 player already exist'), !1;
              var n = new p.ZegoPlayWeb(this.logger, null, this.dataReport, this.qualityTimerInterval);
              return n.onPlayStateUpdate = this.onPlayStateUpdate, n.onPlayQualityUpdate = this.onPlayQualityUpdate, n.onVideoSizeChanged = this.onVideoSizeChanged, this.playerList[o] = {
                  player: n,
                  remoteVideo: t,
                  audioOutput: r,
                  signal: null,
                  serverUrls: [],
                  retryCount: 0,
                  playOption: i,
              }, this.dataReport.eventStart(n.reportSeq, 'GetSignalUrl'), !0;
          }, t.prototype.startPlayingStream = function(e, t, r) {
              this.logger.info('zsc.sps.1 start play called');
              var i = this.getTotalStreamId(e), o = this.playerList[i];
              if (!o) return this.logger.error('zsc.sps.1 player don\'t exist'), !1;
              var n = o.player;
              return this.dataReport.eventEndWithMsg(n.reportSeq, 'GetSignalUrl', { urls: t }), 0 == t.length ? (this.onPlayStateUpdate(c.ENUM_PLAY_STATE_UPDATE.error, e, c.playErrorList.DISPATCH_ERROR), this.logger.info('zsc.sps.1 server don\'t have signal url'), !1) : (o.serverUrls = o.serverUrls.concat(t), this.connectPlayServer(i, t[0]));
          }, t.prototype.connectPlayServer = function(e, t) {
              var r = this, i = this.playerList[e];
              return i ? (this.dataReport.eventStart(i.player.reportSeq, 'ConnectServer'), this.connetWithReuseSignalServer(e, !1, t, function(e, i) {
                  var o = r.playerList[e];
                  if (o) {
                      var n = o.player;
                      if (n) {
                          r.dataReport.eventEndWithMsg(n.reportSeq, 'ConnectServer', { result: 0, server: t });
                          var s = i.tokenInfo;
                          r.logger.info('zsc.cps.1 update token success'), s && s.report && (n.qualityUpload = s.report, n.qualityUploadInterval = s.report_interval), n.signal = i.signal, o.retryCount = 0, r.playStream(e), r.getTokenSuccess();
                      } else r.logger.error('zsc.cps.1 checkplayer don\'t exist');
                  } else r.logger.error('zsc.cps.1 after connect player don\'t exist');
              }, function(e, t) {
                  var i = r.playerList[e];
                  if (i) if (r.shouldRetry(i, t)) {
                      r.logger.info('zsc.cps.1 retry connect');
                      var o = i.serverUrls[0];
                      i.serverUrls.splice(0, 1), i.retryCount += 1, r.connectPlayServer(e, o);
                  } else r.onPlayStateUpdate(c.ENUM_PLAY_STATE_UPDATE.error, e, c.playErrorList.TOKEN_ERROR); else r.logger.error('zsc.cps.1 after connect player don\'t exist');
              }), !0) : (this.logger.error('zsc.cps.1 player don\'t exist'), !1);
          }, t.prototype.playStream = function(e) {
              var t = this.playerList[e].player;
              t ? (this.logger.info('zsc.ps.1 call success'), t.startPlay(e, this.playerList[e].remoteVideo, this.playerList[e].audioOutput, this.playerList[e].playOption)) : this.logger.warn('zsc.ps.1 player don\'t exist');
          }, t.prototype.removeStreamFromSignal = function(e, t) {
              var r = [];
              for (var i in this.signalList) {
                  var o = this.signalList[i];
                  if (e) {
                      for (var n = 0; n < o.publishConnectedList.length; n++) if (o.publishConnectedList[n] === t) {
                          this.logger.debug('zsc.rsfs.0 found from publish'), o.publishConnectedList.splice(n, 1);
                          break;
                      }
                  } else for (var s = 0; s < o.playConnectedList.length; s++) if (o.playConnectedList[s] === t) {
                      this.logger.debug('zsc.rsfs.0 found from play'), o.playConnectedList.splice(s, 1);
                      break;
                  }
                  0 == o.publishConnectedList.length && 0 == o.playConnectedList.length && (o.signal.disconnectServer(), r.push(i));
              }
              for (var a = 0; a < r.length; a++) delete this.signalList[r[a]];
          }, t.prototype.stopSignalHeartbeat = function() {
              this.logger.debug('zsc.ssh.1 call');
              var e = 0;
              for (var t in this.signalList) e += 1;
              this.heartbeatTimer && 0 == e && (this.logger.info('zsc.ssh.1 stop'), clearTimeout(this.heartbeatTimer), this.heartbeatTimer = null);
          }, t.prototype.stopPlayingStream = function(e) {
              var t = this.getTotalStreamId(e), r = this.playerList[t];
              r ? (r.player && (r.player.stopPlay(), delete r.player), this.removeStreamFromSignal(!1, t), this.stopSignalHeartbeat(), delete this.playerList[t], this.logger.debug('zsc.sps.1.1 call success')) : this.logger.info('zsc.sps.1.1 player don\'t exist');
          }, t.prototype.reset = function() {
              for (var e in this.publisherList) this.publisherList[e].publisher && this.publisherList[e].publisher.stopPublish();
              for (var t in this.playerList) this.playerList[t].player && this.playerList[t].player.stopPlay();
              for (var r in this.signalList) this.signalList[r].signal && this.signalList[r].signal.disconnectServer();
              this.playerList = {}, this.publisherList = {}, this.signalList = {}, this.heartbeatTimer && (clearTimeout(this.heartbeatTimer), this.heartbeatTimer = null);
          }, t.prototype.startSignalHeartbeat = function() {
              var e = this;
              this.logger.debug('zsc.ssh.0 call'), this.heartbeatTimer && (clearTimeout(this.heartbeatTimer), this.heartbeatTimer = null), this.heartbeatTimer = setTimeout(function() {
                  e.checkSignalHeartbeat();
              }, this.heartbeatInterval);
          }, t.prototype.checkSignalHeartbeat = function() {
              for (var e in this.logger.debug('zsc.csh.0 call'), this.signalList) this.signalList[e].signal && this.signalList[e].signal.sendHeartbeat();
              this.heartbeatTimer && this.startSignalHeartbeat();
          }, t.prototype.checkPreview = function(e) {
              for (var t = 0; t < this.previewVideoList.length; t++) if (this.previewVideoList[t].localVideo === e) return this.previewVideoList[t];
              return null;
          }, t.prototype.removePreview = function(e) {
              for (var t = 0; t < this.previewVideoList.length; t++) if (this.previewVideoList[t] === e) {
                  this.previewVideoList.splice(t, 1);
                  break;
              }
          }, t.prototype.onPlayerStreamUrlUpdate = function(e, t, r) {
          }, t.prototype.onVideoSizeChanged = function(e, t, r) {
          }, t;
      }(r(15).ZegoStreamCenter);
      t.ZegoStreamCenterWeb = h;
  }, function(e, t, r) {
      'use strict';
      var i = this && this.__assign || Object.assign || function(e) {
          for (var t, r = 1, i = arguments.length; r < i; r++) for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
          return e;
      };
      Object.defineProperty(t, '__esModule', { value: !0 });
      var o = function() {
          function e(e) {
              this.log = e, this.dataStatistics = {}, this.logger = e;
          }

          return e.prototype.newReport = function(e) {
              this.dataStatistics[e] = { abs_time: Date.now(), time_consumed: 0, error: 0, events: [] };
          }, e.prototype.addMsgExt = function(e, t) {
              this.dataStatistics[e] ? this.dataStatistics[e].msg_ext = t : console.warn(e + ' not exist');
          }, e.prototype.eventStart = function(e, t) {
              this.dataStatistics[e] ? null != this.dataStatistics[e].events ? this.dataStatistics[e].events.push({
                  event: t,
                  abs_time: Date.now(),
                  time_consumed: 0,
              }) : this.logger.warn('zd.es.0 no events') : this.logger.warn('zd.es.0 no seq match');
          }, e.prototype.eventEnd = function(e, t, r) {
              if (this.dataStatistics[e]) {
                  var i = this.dataStatistics[e].events;
                  if (i && 0 !== i.length) {
                      for (var o = i.length - 1; o >= 0; o--) if (i[o].event == t && i[o].time_consumed) {
                          i[o].time_consumed = Date.now() - i[o].abs_time;
                          break;
                      }
                  } else this.logger.info('zd.ee.0 no events');
              } else this.logger.info('zd.ee.0 no seq match');
          }, e.prototype.eventEndWithMsg = function(e, t, r) {
              if (this.dataStatistics[e]) {
                  var o = this.dataStatistics[e].events;
                  if (o) {
                      for (var n = o.length - 1; n >= 0; n--) if (o[n].event == t && o[n].time_consumed) {
                          o[n].time_consumed = Date.now() - o[n].abs_time, null == o[n].msg_ext && (o[n].msg_ext = {}), o[n].msg_ext = i({}, r);
                          break;
                      }
                  } else this.logger.warn('zd.ee.0 no events');
              } else this.logger.warn('zd.ee.0 no seq match');
          }, e.prototype.addEventInfo = function(e, t, r, i) {
              if (this.dataStatistics[e]) {
                  var o = this.dataStatistics[e].events;
                  if (null != o) {
                      for (var n = o.length - 1; n >= 0; n--) if (o[n].event == t && null != o[n].time_consumed && o[n].event == t && null != o[n].time_consumed) {
                          null == o[n].msg_ext && (o[n].msg_ext = {}), o[n].msg_ext[r] = i;
                          break;
                      }
                  } else this.logger.warn('zd.aei.0 no events');
              } else this.logger.warn('zd.aei.0 no seq match');
          }, e.prototype.addEvent = function(e, t, r) {
              this.dataStatistics[e] ? this.dataStatistics[e].events && (r ? this.dataStatistics[e].events.push({
                  event: t,
                  abs_time: Date.now(),
                  msg_ext: r,
              }) : this.dataStatistics[e].events.push({
                  event: t,
                  abs_time: Date.now(),
              })) : this.logger.warn('zd.ae.0 no seq match');
          }, e.prototype.uploadReport = function(e, t) {
              var r = this.dataStatistics[e];
              null != r && (r.itemtype = t, r.time_consumed = Date.now() - r.abs_time, this.logger.report(r), delete this.dataStatistics[e]);
          }, e;
      }();
      t.ZegoDataReport = o;
  }, function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var i = r(0), o = function() {
          function e(e) {
              var t = this;
              this.log = e, this.localVideo = null, this.localStream = null, this.videoInfo = {}, this.previewSuc = !1, this.enableMicrophone = function(e) {
                  return t.localStream ? (t.localStream.getAudioTracks().forEach(function(t) {
                      t.enabled = e;
                  }), t.logger.debug('zp.em.2 call success'), !0) : (t.logger.error('zp.em.2 no localStream'), !1);
              }, this.enableCamera = function(e) {
                  return t.localStream ? (t.localStream.getVideoTracks().forEach(function(t) {
                      t.enabled = e;
                  }), t.logger.debug('zp.ec.2 call success'), !0) : (t.logger.error('zp.ec.2 no localStream'), !1);
              }, this.setAudioDestination = function(e) {
                  return t.localVideo ? 'undefined' !== t.localVideo.sinkId ? (t.localVideo.setSinkId(e).then(function() {
                      t.logger.info('zp.sad.2 success device: ' + e);
                  }).catch(function(e) {
                      t.logger.info('zp.sad.2 ' + e.name);
                  }), !0) : (t.logger.error('zp.sad.2 browser does not suppport'), !1) : (t.logger.error('zp.sad.2 no localVideo'), !1);
              }, this.logger = e;
          }

          return e.prototype.getMediaStreamConstraints = function(e) {
              var t = { audio: null, video: null };
              if (t.audio = !1, t.video = !1, e.audio && (void 0 === e.audioInput && void 0 === e.noiseSuppression && void 0 === e.autoGainControl && void 0 === e.echoCancellation ? (t.audio = {}, t.audio.noiseSuppression = !0, t.audio.autoGainControl = !0, t.audio.echoCancellation = !0) : (t.audio = {}, void 0 !== e.audioInput && null !== e.audioInput && (t.audio.deviceId = e.audioInput), void 0 !== e.noiseSuppression && (t.audio.noiseSuppression = e.noiseSuppression), void 0 !== e.autoGainControl && (t.audio.autoGainControl = e.autoGainControl), void 0 !== e.echoCancellation && (t.audio.echoCancellation = e.echoCancellation))), e.video) {
                  var r = 640, o = 480, n = 15, s = 800;
                  if (1 === e.videoQuality ? (r = i.ENUM_RESOLUTION_TYPE.LOW.width, o = i.ENUM_RESOLUTION_TYPE.LOW.height, n = i.ENUM_RESOLUTION_TYPE.LOW.frameRate, s = i.ENUM_RESOLUTION_TYPE.LOW.bitRate) : 2 === e.videoQuality ? (r = i.ENUM_RESOLUTION_TYPE.MEDIUM.width, o = i.ENUM_RESOLUTION_TYPE.MEDIUM.height, n = i.ENUM_RESOLUTION_TYPE.MEDIUM.frameRate, s = i.ENUM_RESOLUTION_TYPE.MEDIUM.bitRate) : 3 === e.videoQuality ? (r = i.ENUM_RESOLUTION_TYPE.HIGH.width, o = i.ENUM_RESOLUTION_TYPE.HIGH.height, n = i.ENUM_RESOLUTION_TYPE.HIGH.frameRate, s = i.ENUM_RESOLUTION_TYPE.HIGH.bitRate) : 4 === e.videoQuality ? (r = e.width, o = e.height, n = e.frameRate, s = e.bitRate || 800) : this.logger.info('zp.gmsc.2 user default'), !0 === e.horizontal) {
                      var a = o;
                      o = r, r = a;
                  }
                  t.video = {
                      width: r,
                      height: o,
                      frameRate: n,
                      bitRate: s,
                  }, null != e.facingMode ? t.video.facingMode = e.facingMode : null != e.videoInput && null != e.videoInput && (t.video.deviceId = { exact: e.videoInput }), this.logger.info('zp.gmsc.2 width: ' + r + ' height: ' + o + ' rate: ' + n);
              }
              return t;
          }, e.prototype.startPreview = function(e, t, r, i) {
              var o = this;
              if (this.logger.debug('zp.sv.2 called'), this.localVideo = e, void 0 !== navigator.mediaDevices && null != navigator.mediaDevices.getUserMedia) {
                  if (t.externalMediaStream instanceof MediaStream) return this.logger.debug('zp.sv.2 use external media stream'), this.previewSuc = !0, this.localStream = t.externalMediaStream, this.videoInfo = {
                      width: t.width,
                      height: t.height,
                      frameRate: t.frameRate,
                      bitRate: t.bitRate,
                  }, void (r && r());
                  if (t.externalCapture) this.captureStream(e) ? (this.previewSuc = !0, r && r()) : i && i('browser don\'t support'); else {
                      var n = this.getMediaStreamConstraints(t);
                      this.videoInfo = n.video, this.logger.info('zp.sv.2 ', JSON.stringify(n)), navigator.mediaDevices.getUserMedia(n).then(function(e) {
                          if (o.logger.info('zp.sv.2 success'), !o.localVideo) return o.logger.info('zp.sv.2 no localVideo'), void (i && i('no localVideo'));
                          o.localVideo.srcObject = e, o.localStream = e, o.previewSuc = !0, r && r();
                      }, function(e) {
                          o.logger.info('zp.sv.2 failed'), i && i(e.name);
                      });
                  }
              } else i && i('browser don\'t support');
          }, e.prototype.captureStream = function(e) {
              if (!e) return this.logger.info('zp.cs.2 no local video'), !1;
              if (e.captureStream) this.localStream = e.captureStream(), this.logger.debug('zp.cs.2 captureStream'); else {
                  if (!e.mozCaptureStream) return this.logger.info('zp.cs.2 don\'t support'), !1;
                  this.localStream = e.mozCaptureStream(), this.logger.debug('zp.cs.2 mozCaptureStream');
              }
              return this.videoInfo = {
                  width: e.videoWidth,
                  height: e.videoHeight,
                  frameRate: 0,
                  bitRate: 0,
              }, this.logger.debug('zp.cs.2 called success'), !0;
          }, e.prototype.stopPreview = function() {
              if (this.logger.info('zp.sv.2.1 called'), this.localStream) {
                  var e = this.localStream.getTracks();
                  e.reverse(), e.forEach(function(e) {
                      e.stop();
                  }), this.localStream = null, this.localVideo.srcObject = null, this.localVideo = null, this.videoInfo = {};
              }
          }, e;
      }();
      t.ZegoPreview = o;
  }, function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var i = r(0), o = r(2), n = r(12), s = r(3), a = r(4), c = function() {
          function e(e, t, r, n) {
              this.state = i.ENUM_PUBLISH_STATE.stop, this.sessionId = 0, this.waitingICETimeInterval = 5e3, this.waitingAnswerTimeInterval = 5e3, this.candidateInfo = [], this.waitingICETimer = null, this.waitingAnswerTimer = null, this.qualityTimer = null, this.publishQualityList = [], this.maxQualityListCount = 10, this.lastPublishStats = {}, this.reportSeq = o.getSeq(), this.qualityUpload = !1, this.qualityUploadInterval = 3e4, this.qualityUploadLastTime = 0, this.qualitySeq = 0, this.maxRetryCount = 3, this.currentRetryCount = 0, this.retryState = i.ENUM_RETRY_STATE.didNotStart, this.waitingServerTimerInterval = 3e3, this.waitingServerTimer = null, this.videoInfo = {
                  width: 0,
                  height: 0,
                  frameRate: 0,
                  bitRate: 0,
              }, this.offerSeq = 0, this.qualityCount = 0, this.closeSessionSignal = !1, this.audioBitRate = 48e3, this.localSdpRevert = !1, this.videoDecodeType = 'H264', this.logger = e, this.signal = t, this.dataReport = r, this.qualityTimeInterval = n, this.audioMixing = new s.audioMixUtil(e), r.newReport(this.reportSeq);
          }

          return e.prototype.publishStateUpdateError = function(e) {
              0 != this.sessionId && this.shouldSendCloseSession(e) && (this.signal.sendCloseSession(o.getSeq(), this.sessionId, 1), this.closeSessionSignal = !0), this.state = i.ENUM_PUBLISH_STATE.stop, this.onPublishStateUpdate(o.ENUM_PUBLISH_STATE_UPDATE.error, this.streamId, e), this.resetPublish();
          }, e.prototype.resetPublish = function() {
              this.logger.info('zp.rp.0 call'), this.streamId = null, this.state = i.ENUM_PUBLISH_STATE.stop, null == this.peerConnection && null == this.peerConnection || (this.peerConnection.close(), this.peerConnection = null), null != this.waitingAnswerTimer && (clearTimeout(this.waitingAnswerTimer), this.waitingAnswerTimer = null), null != this.waitingICETimer && (clearTimeout(this.waitingICETimer), this.waitingICETimer = null), this.clearPublishQualityTimer(), this.signal && (this.signal.unregisterPushCallback('CandidateInfoPush', this.sessionId), this.signal.unregisterPushCallback('MediaDescPush', this.sessionId), this.signal.unregisterPushCallback('CloseSessionPush', this.sessionId)), this.sessionSeq = 0, this.offerSeq = 0, this.candidateInfo = [], this.publishQualityList = [], this.qualityUploadLastTime = 0, this.currentRetryCount = 0, this.retryState = i.ENUM_RETRY_STATE.didNotStart, this.clearTryPublishTimer();
          }, e.prototype.clearTryPublishTimer = function() {
              null != this.waitingServerTimer && (clearTimeout(this.waitingServerTimer), this.waitingServerTimer = null);
          }, e.prototype.clearPublishQualityTimer = function() {
              null != this.qualityTimer && (clearInterval(this.qualityTimer), this.qualityTimer = null), this.lastPublishStats = {}, this.qualityCount = 0;
          }, e.prototype.shouldSendCloseSession = function(e) {
              return this.state != i.ENUM_PUBLISH_STATE.stop && this.state != i.ENUM_PUBLISH_STATE.waitingSessionRsp;
          }, e.prototype.startPublish = function(e, t, r, n) {
              var s = this;
              this.logger.info('zp.sp.0 called'), e ? (this.streamId = e, this.localStream = t, r && (this.videoInfo = r), n && n.audioBitRate && (this.audioBitRate = n.audioBitRate), n && n.videoDecodeType && (this.videoDecodeType = n.videoDecodeType), this.sessionSeq = o.getSeq(), this.dataReport.eventStart(this.reportSeq, 'CreateSession'), this.signal.createSession(this.sessionSeq, 0, 0, e, n && n.streamParams, function(e, t, r) {
                  s.dataReport.eventEndWithMsg(s.reportSeq, 'CreateSession', { sessionId: r.session_id }), s.logger.info('zp.sp.0 sessionId:' + r.session_id), s.sessionSeq == e ? 0 !== r.result ? (s.logger.error('zp.sp.0 create session failed ' + r.result), s.publishStateUpdateError(o.publishErrorList.CREATE_SESSION_ERROR)) : (s.sessionId = r.session_id, s.logger.debug('zp.sp.0 create session success ' + s.sessionId), s.onCreatePublishSessionSuccess(r)) : s.logger.error('zp.sp.0 seq is not match.');
              }, function(e, t) {
                  s.dataReport.eventEndWithMsg(s.reportSeq, 'CreateSession', { error: e }), s.publishStateUpdateError(o.publishErrorList.SEND_SESSION_TIMEOUT);
              }), this.state = i.ENUM_PUBLISH_STATE.waitingSessionRsp, this.logger.debug('zp.sp.0 called success')) : this.logger.error('zp.sp.0 streamId is null');
          }, e.prototype.onCreatePublishSessionSuccess = function(e) {
              var t = this;
              this.logger.info('zp.ops.0 called');
              var r = [];
              e.turn_server && r.push(e.turn_server), e.stun_server && r.push(e.stun_server);
              var i = {
                  iceTransportPolicy: 'relay',
                  iceServers: [{ urls: r, username: e.turn_username, credential: e.turn_auth_key }],
              };
              this.logger.info('zp.ops.0 username: ' + e.turn_username), this.logger.info('zp.ops.0 credential: ' + e.turn_auth_key), this.peerConnection = new RTCPeerConnection(i), this.peerConnection.onicecandidate = function(e) {
                  t.onIceCandidate(e);
              }, this.peerConnection.onsignalingstatechange = function(e) {
                  t.onConnectionStateChange(e);
              }, this.peerConnection.oniceconnectionstatechange = function(e) {
                  t.onIceConnectionStateChange(e);
              };
              var n = [], s = [];
              this.localStream && (this.localStream.getTracks().forEach(function(e) {
                  t.peerConnection.addTrack(e, t.localStream);
              }), n = this.localStream.getVideoTracks(), s = this.localStream.getAudioTracks(), console.warn('getConstraints', s && s[0] && s[0].getConstraints && s[0].getConstraints()), n.length > 0 && this.logger.info('zp.ops.0 video device: ' + n[0].label), s.length > 0 && this.logger.info('zp.ops.0 audio device: ' + s[0].label));
              var a = { offerToReceiveAudio: s.length > 0 ? 1 : 0, offerToReceiveVideo: n.length > 0 ? 1 : 0 };
              this.logger.info('zp.ops.0 createOffer: ' + a), this.dataReport.eventStart(this.reportSeq, 'CreateOffer'), this.peerConnection.createOffer(a).then(function(e) {
                  t.dataReport.eventEnd(t.reportSeq, 'CreateOffer'), t.onCreateOfferSuccess(e);
              }, function(e) {
                  t.dataReport.eventEndWithMsg(t.reportSeq, 'CreateOffer', { error: e.toString() }), t.logger.error('zp.ops.0 create offer error ' + e.toString()), t.publishStateUpdateError(o.publishErrorList.CREATE_OFFER_ERROR);
              }), this.signal.registerPushCallback('CandidateInfoPush', this.sessionId, function(e, r, i) {
                  t.onRecvCandidateInfo(e, r, i);
              }), this.signal.registerPushCallback('CloseSessionPush', this.sessionId, function(e, r, i) {
                  t.onRecvCloseSession(e, r, i);
              }), this.signal.registerPushCallback('MediaDescPush', this.sessionId, function(e, r, i) {
                  t.onRecvMediaDescription(e, r, i);
              }), this.signal.registerPushCallback('SessionResetPush', this.sessionId, function(e, r, i) {
                  t.onRecvResetSession(e, r, i);
              }), this.logger.debug('zp.ops.0 call success');
          }, e.prototype.onCreateOfferSuccess = function(e) {
              var t = this;
              0 != this.videoInfo.bitRate && (e.sdp = this.updateBandwidthRestriction(e.sdp, this.videoInfo.bitRate)), e.sdp = e.sdp.replace(/sendrecv/g, 'sendonly'), e.sdp = e.sdp.replace(/useinbandfec=\d+/, 'maxaveragebitrate=' + this.audioBitRate), /m=video[\s\S]*m=audio/.test(e.sdp) && (this.localSdpRevert = !0), e.sdp = a.sdpUtil.getSDPByVideDecodeType(e.sdp, this.videoDecodeType), this.logger.info('zp.oco.0 localSdp1 ' + e.sdp.substr(0, e.sdp.length / 2)), this.logger.info('zp.oco.0 localSdp2 ' + e.sdp.substr(e.sdp.length / 2)), this.dataReport.eventStart(this.reportSeq, 'SetLocalDescription'), this.peerConnection.setLocalDescription(e).then(function() {
                  t.dataReport.eventEnd(t.reportSeq, 'SetLocalDescription'), t.onSetLocalDescriptionSuccess(e);
              }, function(e) {
                  t.dataReport.eventEndWithMsg(t.reportSeq, 'SetLocalDescription', { error: e.toString() }), t.logger.error('zp.oco.0 error ' + e.toString()), t.publishStateUpdateError(o.publishErrorList.SET_LOCAL_DESC_ERROR);
              });
          }, e.prototype.updateBandwidthRestriction = function(e, t) {
              var r = 'AS';
              return 'firefox' === n.browserDetails.browser && (t = 1e3 * (t >>> 0), r = 'TIAS'), e = -1 === e.indexOf('b=' + r + ':') ? (e = e.replace(/c=IN (.*)\r\n/g, 'c=IN $1\r\nb=' + r + ':' + t + '\r\n')).replace('b=' + r + ':' + t + '\r\n', '') : (e = e.replace(new RegExp('b=' + r + ':.*\r\n', 'g'), 'b=' + r + ':' + t + '\r\n')).replace('b=' + r + ':' + t + '\r\n', '');
          }, e.prototype.onSetLocalDescriptionSuccess = function(e) {
              var t = this;
              this.logger.info('zp.osd.0 success');
              var r = {
                  sdp: e.sdp,
                  width: this.videoInfo.width,
                  height: this.videoInfo.height,
                  frameRate: this.videoInfo.frameRate,
                  video_min_kpbs: this.videoInfo.bitRate,
                  video_max_kpbs: this.videoInfo.bitRate,
                  audio_kpbs: 48,
              };
              this.offerSeq = o.getSeq(), this.dataReport.eventStart(this.reportSeq, 'SendMediaDesc'), this.signal.sendMediaDesc(this.offerSeq, this.sessionId, 0, r, function(e, r, n) {
                  t.offerSeq == e && t.sessionId == r ? (t.logger.info('zp.osd.0 send success'), t.dataReport.eventEnd(t.reportSeq, 'SendMediaDesc'), t.waitingAnswerTimer = setTimeout(function() {
                      t.state == i.ENUM_PUBLISH_STATE.waitingServerAnswer && (t.logger.error('zp.osd.0 waiting timeout'), t.publishStateUpdateError(o.publishErrorList.SERVER_MEDIA_DESC_TIMEOUT));
                  }, t.waitingAnswerTimeInterval), t.state = i.ENUM_PUBLISH_STATE.waitingServerAnswer) : t.logger.error('zp.osd.0 seq or sessionId is not equal');
              }, function(e, r) {
                  t.dataReport.eventEndWithMsg(t.reportSeq, 'SendMediaDesc', { error: e }), t.publishStateUpdateError(o.publishErrorList.SEND_MEDIA_DESC_TIMEOUT);
              }), this.state = i.ENUM_PUBLISH_STATE.waitingOffserRsp, this.logger.debug('zp.osd.0 call success');
          }, e.prototype.onRecvMediaDescription = function(e, t, r) {
              this.logger.info('zp.ormd.0 received'), this.state == i.ENUM_PUBLISH_STATE.waitingServerAnswer ? (null != this.waitingAnswerTimer && (clearTimeout(this.waitingAnswerTimer), this.waitingAnswerTimer = null), this.dataReport.addEvent(this.reportSeq, 'RecvMediaDesc'), this.signal.sendMediaDescAck(e, this.sessionId, 0), 1 == r.type ? this.onGetRemoteOfferSucceses(r.sdp) : this.publishStateUpdateError(o.publishErrorList.SERVER_MEDIA_DESC_ERROR)) : this.logger.info('zp.ormd.0 current state ' + this.state + ' not allowed');
          }, e.prototype.onGetRemoteOfferSucceses = function(e) {
              var t = this;
              if (48e3 !== this.audioBitRate && (e = e.replace(/maxaveragebitrate=(\d+)/, 'maxaveragebitrate=' + this.audioBitRate)), this.localSdpRevert) {
                  var r = [/[\s\S]*m=audio/.exec(e)[0].replace('m=audio', ''), /m=video[\s\S]*/.exec(e)[0], /m=audio[\s\S]*m=video/.exec(e)[0].replace('m=video', '')],
                      n = r[0], s = r[1], a = r[2], c = /a=group:BUNDLE\s+(\w+)\s+(\w+)/.exec(n);
                  e = (n = n.replace(/a=group:BUNDLE\s+(\w+)\s+(\w+)/, 'a=group:BUNDLE ' + c[2] + ' ' + c[1])) + s + a;
              }
              this.logger.info('zp.oro.0 remoteSdp:', e);
              var d = {
                  type: 'answer', sdp: e, toJSON: function() {
                  },
              };
              this.dataReport.eventStart(this.reportSeq, 'SetRemoteDescription'), this.peerConnection.setRemoteDescription(new RTCSessionDescription(d)).then(function() {
                  t.logger.info('zp.oro.0 set success'), t.dataReport.eventEnd(t.reportSeq, 'SetRemoteDescription');
              }, function(e) {
                  t.logger.error('zp.oro.0 failed: ' + e.toString()), t.dataReport.eventEndWithMsg(t.reportSeq, 'SetRemoteDescription', { error: e.toString() }), t.publishStateUpdateError(o.publishErrorList.SET_REMOTE_DESC_ERROR);
              }), this.sendCandidateInfo(this.candidateInfo), this.candidateInfo = [], this.state = i.ENUM_PUBLISH_STATE.waitingServerICE, this.waitingICETimer = setTimeout(function() {
                  t.state == i.ENUM_PUBLISH_STATE.waitingServerICE && (t.logger.error('zp.orod.0 waiting server timeout'), t.publishStateUpdateError(o.publishErrorList.SERVER_CANDIDATE_TIMEOUT));
              }, this.waitingICETimeInterval), this.logger.debug('zp.oro.0 call success');
          }, e.prototype.onIceConnectionStateChange = function(e) {
              this.state != i.ENUM_PUBLISH_STATE.stop && null != this.peerConnection && (this.logger.info('zp.oics.0 stateChanged ' + this.peerConnection.iceConnectionState), 'connected' === this.peerConnection.iceConnectionState ? (this.logger.info('zp.oics.0 connected state ' + this.state), this.dataReport.eventEnd(this.reportSeq, 'IceConnected'), this.state != i.ENUM_PUBLISH_STATE.publishing && this.onPublishStateUpdate(o.ENUM_PUBLISH_STATE_UPDATE.start, this.streamId), this.state = i.ENUM_PUBLISH_STATE.publishing, this.retryState != i.ENUM_RETRY_STATE.didNotStart && (this.retryState = i.ENUM_RETRY_STATE.finished, this.currentRetryCount = 0), this.dataReport.eventStart(this.reportSeq, 'PublishState'), this.setPublishQualityTimer()) : 'closed' === this.peerConnection.iceConnectionState ? (this.dataReport.addEvent(this.reportSeq, 'IceClosed'), this.checkPublishConnectionFailedState(this.peerConnection.iceConnectionState)) : 'failed' === this.peerConnection.iceConnectionState && (this.dataReport.addEvent(this.reportSeq, 'IceFailed'), this.checkPublishConnectionFailedState(this.peerConnection.iceConnectionState)));
          }, e.prototype.onIceCandidate = function(e) {
              if (this.logger.info('zp.oic.0 candidate' + e.candidate), e.candidate) if (this.logger.info('zp.oic.0 candidate' + e.candidate.candidate), this.state < i.ENUM_PUBLISH_STATE.waitingServerICE || this.state == i.ENUM_PUBLISH_STATE.stop) this.candidateInfo.push({
                  candidate: e.candidate.candidate,
                  sdpMid: e.candidate.sdpMid,
                  sdpMLineIndex: e.candidate.sdpMLineIndex,
              }); else {
                  var t = {
                      candidate: e.candidate.candidate,
                      sdpMid: e.candidate.sdpMid,
                      sdpMLineIndex: e.candidate.sdpMLineIndex,
                  };
                  this.sendCandidateInfo([t]);
              }
          }, e.prototype.sendCandidateInfo = function(e) {
              var t = this;
              this.logger.info('zp.sci.0 called'), !(e = e.filter(function(e) {
                  return e.candidate.indexOf('relay') > 0;
              })) || e.length < 1 ? this.logger.info('zp.sci.0 cancelled') : (this.dataReport.eventStart(this.reportSeq, 'SendIceCandidate'), this.signal.sendCandidateInfo(o.getSeq(), this.sessionId, e, function(e, r, i) {
                  t.logger.debug('zp.sci.0 send success'), t.dataReport.eventEnd(t.reportSeq, 'SendIceCandidate');
              }, function(e, r) {
                  t.logger.error('zp.sci.0 failed to send: ' + e.toString()), t.dataReport.eventEndWithMsg(t.reportSeq, 'SendIceCandidate', { error: e }), t.publishStateUpdateError(o.publishErrorList.SEND_CANDIDATE_TIMEOUT);
              }));
          }, e.prototype.onConnectionStateChange = function(e) {
              this.logger.info('zp.ocs.0 called ' + e.target.signalingState);
          }, e.prototype.onRecvCandidateInfo = function(e, t, r) {
              var n = this;
              if (this.logger.debug('zp.oci.0 received ' + r.infos.length), this.state == i.ENUM_PUBLISH_STATE.waitingServerICE) {
                  null != this.waitingICETimer && (clearTimeout(this.waitingICETimer), this.waitingICETimer = null), this.dataReport.addEvent(this.reportSeq, 'RecvIceCandidate'), this.signal.sendCandidateInfoAck(e, this.sessionId, 0);
                  for (var s = 0; s < r.infos.length; s++) {
                      var a = {
                          sdpMid: r.infos[s].sdpMid,
                          sdpMLineIndex: r.infos[s].sdpMLineIndex,
                          candidate: r.infos[s].candidate,
                      };
                      this.logger.debug('zp.orci.0 candidate ' + a.candidate), this.peerConnection.addIceCandidate(new RTCIceCandidate(a)).then(function() {
                          n.logger.debug('zp.oci.0 add success');
                      }, function(e) {
                          n.logger.error('zp.oci.0 add error ' + e.toString()), n.publishStateUpdateError(o.publishErrorList.SERVER_CANDIDATE_ERROR);
                      });
                  }
                  this.state = i.ENUM_PUBLISH_STATE.connecting, this.dataReport.eventStart(this.reportSeq, 'IceConnected');
              } else this.logger.info('zp.oci.0 current state ' + this.state + ' not allowed');
          }, e.prototype.onRecvCloseSession = function(e, t, r) {
              this.logger.info('zp.orcs.0 reason: ' + r.reason), this.dataReport.addEvent(this.reportSeq, 'RecvCloseSession'), this.signal.sendCloseSessionAck(e, this.sessionId, 0);
              var i = JSON.parse(JSON.stringify(o.publishErrorList.SESSION_CLOSED));
              i.msg += r.reason, this.publishStateUpdateError(i);
          }, e.prototype.onRecvResetSession = function(e, t, r) {
              this.logger.info('zp.orrs.0 received '), t == this.sessionId ? (this.dataReport.addEvent(this.reportSeq, 'RecvResetSession'), this.shouldRetryPublish() && this.startRetryPublish()) : this.logger.error('zp.orrs.0 cannot find session');
          }, e.prototype.shouldRetryPublish = function() {
              return this.retryState == i.ENUM_RETRY_STATE.didNotStart && this.state != i.ENUM_PUBLISH_STATE.publishing ? (this.logger.info('zp.srp.0.0 connection didn\'t success'), !1) : this.retryState == i.ENUM_RETRY_STATE.retrying ? (this.logger.info('zp.srp.0.0 already retrying'), !1) : this.currentRetryCount > this.maxRetryCount ? (this.logger.info('zp.srp.0.0 beyond max'), !1) : (this.logger.info('zp.srp.1.0 call success'), !0);
          }, e.prototype.startRetryPublish = function() {
              this.logger.info('zp.srp.0 call');
              var e = this.streamId;
              e ? (this.resetPublish(), this.tryStartPublish(e)) : this.logger.info('zp.srp.0 no streamid');
          }, e.prototype.tryStartPublish = function(e) {
              var t = this;
              if (this.logger.info('zp.tsp.0 call'), this.clearTryPublishTimer(), this.streamId = e, this.currentRetryCount > this.maxRetryCount) return this.logger.info('zp.tsp.0 beyond max limit'), void this.publishStateUpdateError(o.publishErrorList.WEBSOCKET_ERROR);
              this.retryState = i.ENUM_RETRY_STATE.retrying, this.currentRetryCount += 1, this.signal.isServerConnected() ? (this.logger.debug('zp.tsp.0 signal connected'), this.startPublish(e, this.localStream, this.videoInfo)) : (this.logger.debug('zp.tsp.0 signal server not connected'), this.waitingAnswerTimer = setTimeout(function() {
                  t.tryStartPublish(e);
              }, this.waitingAnswerTimeInterval));
          }, e.prototype.checkPublishConnectionFailedState = function(e) {
              var t = null;
              'failed' == e ? t = o.publishErrorList.MEDIA_CONNECTION_FAILED : 'closed' == e && (t = o.publishErrorList.MEDIA_CONNECTION_CLOSED), null != t && (this.state != i.ENUM_PUBLISH_STATE.publishing && this.retryState == i.ENUM_PUBLISH_STATE.didNotStart ? (this.logger.info('zp.oics.0  state ' + this.state + ' retryState ' + this.retryState + ' connectionState ' + e), this.publishStateUpdateError(t)) : this.shouldRetryPublish() ? (this.onPublishStateUpdate(o.ENUM_PUBLISH_STATE_UPDATE.retry, this.streamId), this.startRetryPublish()) : this.publishStateUpdateError(t));
          }, e.prototype.setPublishQualityTimer = function() {
              var e = this;
              null == this.qualityTimer && (this.logger.debug('zp.spq.0 called'), this.clearPublishQualityTimer(), this.qualityTimer = setInterval(function() {
                  e.peerConnection && e.peerConnection.getStats(null).then(function(t) {
                      e.getPublishStats(t);
                  }, function(t) {
                      e.logger.info('zp.spq.0 getStats error ' + t.toString());
                  });
              }, this.qualityTimeInterval), this.lastPublishStats = {
                  time: 0,
                  audioBytesSent: 0,
                  videoBytesSent: 0,
                  framesEncoded: 0,
                  framesSent: 0,
              }, this.qualitySeq = o.getSeq(), this.qualityCount = 0, this.dataReport.newReport(this.qualitySeq));
          }, e.prototype.getPublishStats = function(e) {
              var t = this;
              if (e) {
                  var r = {
                      audioBitrate: 0,
                      videoBitrate: 0,
                      videoFPS: 0,
                      nackCount: 0,
                      pliCount: 0,
                      sliCount: 0,
                      frameHeight: 0,
                      frameWidth: 0,
                      videoTransferFPS: 0,
                      totalRoundTripTime: 0,
                      currentRoundTripTime: 0,
                  }, i = this.lastPublishStats.time;
                  e.forEach(function(e) {
                      ('outbound-rtp' == e.type || 'ssrc' == e.type && null != e.bytesSent) && 'audio' == e.mediaType ? (0 != i && (r.audioBitrate = 8 * (e.bytesSent - t.lastPublishStats.audioBytesSent) / (e.timestamp - i)), r.audioBitrate < 0 && (r.audioBitrate = 0), t.lastPublishStats.audioBytesSent = e.bytesSent, t.lastPublishStats.time = e.timestamp) : ('outbound-rtp' == e.type || 'ssrc' == e.type && null != e.bytesSent) && 'video' == e.mediaType ? (0 != i && (r.videoBitrate = 8 * (e.bytesSent - t.lastPublishStats.videoBytesSent) / (e.timestamp - i), r.videoFPS = 1e3 * (e.framesEncoded - t.lastPublishStats.framesEncoded) / (e.timestamp - i)), r.videoBitrate < 0 && (r.videoBitrate = 0), r.videoFPS < 0 && (r.videoFPS = 0), r.nackCount = e.nackCount, r.pliCount = e.pliCount, r.sliCount = e.sliCount, t.lastPublishStats.videoBytesSent = e.bytesSent, t.lastPublishStats.framesEncoded = e.framesEncoded, t.lastPublishStats.time = e.timestamp) : 'track' == e.type && ('video' == e.kind || e.id.indexOf('video') >= 0) ? (r.frameHeight = e.frameHeight, r.frameWidth = e.frameWidth, 0 != i && (r.videoTransferFPS = 1e3 * (e.framesSent - t.lastPublishStats.framesSent) / (e.timestamp - i)), r.videoTransferFPS < 0 && (r.videoTransferFPS = 0), t.lastPublishStats.framesSent = e.framesSent) : 'candidate-pair' == e.type && (null != e.totalRoundTripTime && (r.totalRoundTripTime = e.totalRoundTripTime), null != e.currentRoundTripTime && (r.currentRoundTripTime = e.currentRoundTripTime));
                  }), this.uploadPublishQuality(r), 0 != i && this.onPublishQualityUpdate(this.streamId, r);
              }
          }, e.prototype.uploadPublishQuality = function(e) {
              var t = this;
              if (this.qualityUpload) {
                  var r = Date.parse(new Date + '');
                  (0 == this.qualityUploadLastTime || r - this.qualityUploadLastTime >= this.qualityUploadInterval) && (this.logger.debug('zp.upq.0 upload'), e.stream_type = 'publish', e.stream_id = this.streamId, e.timeStamp = r / 1e3, this.signal.QualityReport(o.getSeq(), this.sessionId, e, function(e, r, i) {
                      void 0 !== i.report && (t.qualityUpload = i.report, t.qualityUploadInterval = i.report_interval_ms);
                  }, function(e, r) {
                      t.logger.info('zp.upq.0 upload failed ' + e);
                  }), this.qualityUploadLastTime = r);
              }
          }, e.prototype.stopPublish = function() {
              this.logger.debug('zp.sp.0.1 called'), this.sessionId && !this.closeSessionSignal && this.signal.sendCloseSession(o.getSeq(), this.sessionId, 0), this.dataReport.eventEndWithMsg(this.reportSeq, 'PublishState', { state: this.state + '' }), this.dataReport.addEvent(this.reportSeq, 'StopPublish'), this.dataReport.addMsgExt(this.reportSeq, {
                  stream: this.streamId,
                  sessionId: this.sessionId,
              }), this.dataReport.uploadReport(this.reportSeq, 'RTCPublishStream'), this.resetPublish();
          }, e.prototype.onPublishStateUpdate = function(e, t, r) {
          }, e.prototype.onPublishQualityUpdate = function(e, t) {
          }, e.prototype.onDisconnect = function() {
              this.logger.info('zp.od.0 call'), this.logger.info('zp.od.0 websocket disconnect'), this.dataReport.addEvent(this.reportSeq, 'OnDisconnect'), this.publishStateUpdateError(o.publishErrorList.WEBSOCKET_ERROR);
          }, e.prototype.playEffect = function(e, t, r, i) {
              this.audioMixing.localStream = this.localStream, this.audioMixing.peerConnection = this.peerConnection, this.audioMixing.audioBuffer = t, this.audioMixing.playEffect(e.playTime, e.loop, e.replace, r, i);
          }, e.prototype.pauseEffect = function() {
              this.audioMixing.pauseEffect();
          }, e.prototype.resumeEffect = function() {
              this.audioMixing.resumeEffect();
          }, e.prototype.startMixingAudio = function(e, t) {
              return this.audioMixing.localStream = this.localStream, this.audioMixing.peerConnection = this.peerConnection, this.audioMixing.startMixingAudio(e, t);
          }, e.prototype.stopMixingAudio = function() {
              return this.audioMixing.stopMixingAudio();
          }, e;
      }();
      t.ZegoPublish = c;
  }, function(e, t, r) {
      var i;
      e.exports = function e(t, r, o) {
          function n(a, c) {
              if (!r[a]) {
                  if (!t[a]) {
                      var d = 'function' == typeof i && i;
                      if (!c && d) return i(a, !0);
                      if (s) return s(a, !0);
                      var l = new Error('Cannot find module \'' + a + '\'');
                      throw l.code = 'MODULE_NOT_FOUND', l;
                  }
                  var p = r[a] = { exports: {} };
                  t[a][0].call(p.exports, function(e) {
                      var r = t[a][1][e];
                      return n(r || e);
                  }, p, p.exports, e, t, r, o);
              }
              return r[a].exports;
          }

          for (var s = 'function' == typeof i && i, a = 0; a < o.length; a++) n(o[a]);
          return n;
      }({
          1: [function(e, t, r) {
              'use strict';
              var i = e('./adapter_factory.js'), o = (0, i.adapterFactory)({ window: window });
              t.exports = o;
          }, { './adapter_factory.js': 2 }], 2: [function(e, t, r) {
              'use strict';
              Object.defineProperty(r, '__esModule', { value: !0 }), r.adapterFactory = function() {
                  var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).window,
                      t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                          shimChrome: !0,
                          shimFirefox: !0,
                          shimEdge: !0,
                          shimSafari: !0,
                      }, r = o.log, i = o.detectBrowser(e), n = {
                          browserDetails: i,
                          commonShim: f,
                          extractVersion: o.extractVersion,
                          disableLog: o.disableLog,
                          disableWarnings: o.disableWarnings,
                      };
                  switch (i.browser) {
                      case'chrome':
                          if (!s || !s.shimPeerConnection || !t.shimChrome) return r('Chrome shim is not included in this adapter release.'), n;
                          r('adapter.js shimming chrome.'), n.browserShim = s, s.shimGetUserMedia(e), s.shimMediaStream(e), s.shimPeerConnection(e), s.shimOnTrack(e), s.shimAddTrackRemoveTrack(e), s.shimGetSendersWithDtmf(e), s.shimGetStats(e), s.shimSenderReceiverGetStats(e), s.fixNegotiationNeeded(e), f.shimRTCIceCandidate(e), f.shimConnectionState(e), f.shimMaxMessageSize(e), f.shimSendThrowTypeError(e), f.removeAllowExtmapMixed(e);
                          break;
                      case'firefox':
                          if (!l || !l.shimPeerConnection || !t.shimFirefox) return r('Firefox shim is not included in this adapter release.'), n;
                          r('adapter.js shimming firefox.'), n.browserShim = l, l.shimGetUserMedia(e), l.shimPeerConnection(e), l.shimOnTrack(e), l.shimRemoveStream(e), l.shimSenderGetStats(e), l.shimReceiverGetStats(e), l.shimRTCDataChannel(e), f.shimRTCIceCandidate(e), f.shimConnectionState(e), f.shimMaxMessageSize(e), f.shimSendThrowTypeError(e);
                          break;
                      case'edge':
                          if (!c || !c.shimPeerConnection || !t.shimEdge) return r('MS edge shim is not included in this adapter release.'), n;
                          r('adapter.js shimming edge.'), n.browserShim = c, c.shimGetUserMedia(e), c.shimGetDisplayMedia(e), c.shimPeerConnection(e), c.shimReplaceTrack(e), f.shimMaxMessageSize(e), f.shimSendThrowTypeError(e);
                          break;
                      case'safari':
                          if (!h || !t.shimSafari) return r('Safari shim is not included in this adapter release.'), n;
                          r('adapter.js shimming safari.'), n.browserShim = h, h.shimRTCIceServerUrls(e), h.shimCreateOfferLegacy(e), h.shimCallbacksAPI(e), h.shimLocalStreamsAPI(e), h.shimRemoteStreamsAPI(e), h.shimTrackEventTransceiver(e), h.shimGetUserMedia(e), f.shimRTCIceCandidate(e), f.shimMaxMessageSize(e), f.shimSendThrowTypeError(e), f.removeAllowExtmapMixed(e);
                          break;
                      default:
                          r('Unsupported browser!');
                  }
                  return n;
              };
              var i = e('./utils'), o = g(i), n = e('./chrome/chrome_shim'), s = g(n), a = e('./edge/edge_shim'),
                  c = g(a), d = e('./firefox/firefox_shim'), l = g(d), p = e('./safari/safari_shim'), h = g(p),
                  u = e('./common_shim'), f = g(u);

              function g(e) {
                  if (e && e.__esModule) return e;
                  var t = {};
                  if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                  return t.default = e, t;
              }
          }, {
              './chrome/chrome_shim': 3,
              './common_shim': 6,
              './edge/edge_shim': 7,
              './firefox/firefox_shim': 11,
              './safari/safari_shim': 14,
              './utils': 15,
          }], 3: [function(e, t, r) {
              'use strict';
              Object.defineProperty(r, '__esModule', { value: !0 }), r.shimGetDisplayMedia = r.shimGetUserMedia = void 0;
              var i = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function(e) {
                  return typeof e;
              } : function(e) {
                  return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
              }, o = e('./getusermedia');
              Object.defineProperty(r, 'shimGetUserMedia', {
                  enumerable: !0, get: function() {
                      return o.shimGetUserMedia;
                  },
              });
              var n = e('./getdisplaymedia');
              Object.defineProperty(r, 'shimGetDisplayMedia', {
                  enumerable: !0, get: function() {
                      return n.shimGetDisplayMedia;
                  },
              }), r.shimMediaStream = function(e) {
                  e.MediaStream = e.MediaStream || e.webkitMediaStream;
              }, r.shimOnTrack = function(e) {
                  if ('object' !== (void 0 === e ? 'undefined' : i(e)) || !e.RTCPeerConnection || 'ontrack' in e.RTCPeerConnection.prototype) a.wrapPeerConnectionEvent(e, 'track', function(e) {
                      return e.transceiver || Object.defineProperty(e, 'transceiver', { value: { receiver: e.receiver } }), e;
                  }); else {
                      Object.defineProperty(e.RTCPeerConnection.prototype, 'ontrack', {
                          get: function() {
                              return this._ontrack;
                          }, set: function(e) {
                              this._ontrack && this.removeEventListener('track', this._ontrack), this.addEventListener('track', this._ontrack = e);
                          }, enumerable: !0, configurable: !0,
                      });
                      var t = e.RTCPeerConnection.prototype.setRemoteDescription;
                      e.RTCPeerConnection.prototype.setRemoteDescription = function() {
                          var r = this;
                          return this._ontrackpoly || (this._ontrackpoly = function(t) {
                              t.stream.addEventListener('addtrack', function(i) {
                                  var o = void 0;
                                  o = e.RTCPeerConnection.prototype.getReceivers ? r.getReceivers().find(function(e) {
                                      return e.track && e.track.id === i.track.id;
                                  }) : { track: i.track };
                                  var n = new Event('track');
                                  n.track = i.track, n.receiver = o, n.transceiver = { receiver: o }, n.streams = [t.stream], r.dispatchEvent(n);
                              }), t.stream.getTracks().forEach(function(i) {
                                  var o = void 0;
                                  o = e.RTCPeerConnection.prototype.getReceivers ? r.getReceivers().find(function(e) {
                                      return e.track && e.track.id === i.id;
                                  }) : { track: i };
                                  var n = new Event('track');
                                  n.track = i, n.receiver = o, n.transceiver = { receiver: o }, n.streams = [t.stream], r.dispatchEvent(n);
                              });
                          }, this.addEventListener('addstream', this._ontrackpoly)), t.apply(this, arguments);
                      };
                  }
              }, r.shimGetSendersWithDtmf = function(e) {
                  if ('object' === (void 0 === e ? 'undefined' : i(e)) && e.RTCPeerConnection && !('getSenders' in e.RTCPeerConnection.prototype) && 'createDTMFSender' in e.RTCPeerConnection.prototype) {
                      var t = function(e, t) {
                          return {
                              track: t, get dtmf() {
                                  return void 0 === this._dtmf && ('audio' === t.kind ? this._dtmf = e.createDTMFSender(t) : this._dtmf = null), this._dtmf;
                              }, _pc: e,
                          };
                      };
                      if (!e.RTCPeerConnection.prototype.getSenders) {
                          e.RTCPeerConnection.prototype.getSenders = function() {
                              return this._senders = this._senders || [], this._senders.slice();
                          };
                          var r = e.RTCPeerConnection.prototype.addTrack;
                          e.RTCPeerConnection.prototype.addTrack = function(e, i) {
                              var o = r.apply(this, arguments);
                              return o || (o = t(this, e), this._senders.push(o)), o;
                          };
                          var o = e.RTCPeerConnection.prototype.removeTrack;
                          e.RTCPeerConnection.prototype.removeTrack = function(e) {
                              o.apply(this, arguments);
                              var t = this._senders.indexOf(e);
                              -1 !== t && this._senders.splice(t, 1);
                          };
                      }
                      var n = e.RTCPeerConnection.prototype.addStream;
                      e.RTCPeerConnection.prototype.addStream = function(e) {
                          var r = this;
                          this._senders = this._senders || [], n.apply(this, [e]), e.getTracks().forEach(function(e) {
                              r._senders.push(t(r, e));
                          });
                      };
                      var s = e.RTCPeerConnection.prototype.removeStream;
                      e.RTCPeerConnection.prototype.removeStream = function(e) {
                          var t = this;
                          this._senders = this._senders || [], s.apply(this, [e]), e.getTracks().forEach(function(e) {
                              var r = t._senders.find(function(t) {
                                  return t.track === e;
                              });
                              r && t._senders.splice(t._senders.indexOf(r), 1);
                          });
                      };
                  } else if ('object' === (void 0 === e ? 'undefined' : i(e)) && e.RTCPeerConnection && 'getSenders' in e.RTCPeerConnection.prototype && 'createDTMFSender' in e.RTCPeerConnection.prototype && e.RTCRtpSender && !('dtmf' in e.RTCRtpSender.prototype)) {
                      var a = e.RTCPeerConnection.prototype.getSenders;
                      e.RTCPeerConnection.prototype.getSenders = function() {
                          var e = this, t = a.apply(this, []);
                          return t.forEach(function(t) {
                              return t._pc = e;
                          }), t;
                      }, Object.defineProperty(e.RTCRtpSender.prototype, 'dtmf', {
                          get: function() {
                              return void 0 === this._dtmf && ('audio' === this.track.kind ? this._dtmf = this._pc.createDTMFSender(this.track) : this._dtmf = null), this._dtmf;
                          },
                      });
                  }
              }, r.shimGetStats = function(e) {
                  if (e.RTCPeerConnection) {
                      var t = e.RTCPeerConnection.prototype.getStats;
                      e.RTCPeerConnection.prototype.getStats = function(e, r, i) {
                          var o = this, n = arguments;
                          if (arguments.length > 0 && 'function' == typeof e) return t.apply(this, arguments);
                          if (0 === t.length && (0 === arguments.length || 'function' != typeof arguments[0])) return t.apply(this, []);
                          var s = function(e) {
                              var t = {}, r = e.result();
                              return r.forEach(function(e) {
                                  var r = {
                                      id: e.id,
                                      timestamp: e.timestamp,
                                      type: {
                                          localcandidate: 'local-candidate',
                                          remotecandidate: 'remote-candidate',
                                      }[e.type] || e.type,
                                  };
                                  e.names().forEach(function(t) {
                                      r[t] = e.stat(t);
                                  }), t[r.id] = r;
                              }), t;
                          }, a = function(e) {
                              return new Map(Object.keys(e).map(function(t) {
                                  return [t, e[t]];
                              }));
                          };
                          return arguments.length >= 2 ? t.apply(this, [function(e) {
                              n[1](a(s(e)));
                          }, arguments[0]]) : new Promise(function(e, r) {
                              t.apply(o, [function(t) {
                                  e(a(s(t)));
                              }, r]);
                          }).then(r, i);
                      };
                  }
              }, r.shimSenderReceiverGetStats = function(e) {
                  if ('object' === (void 0 === e ? 'undefined' : i(e)) && e.RTCPeerConnection && e.RTCRtpSender && e.RTCRtpReceiver) {
                      if (!('getStats' in e.RTCRtpSender.prototype)) {
                          var t = e.RTCPeerConnection.prototype.getSenders;
                          t && (e.RTCPeerConnection.prototype.getSenders = function() {
                              var e = this, r = t.apply(this, []);
                              return r.forEach(function(t) {
                                  return t._pc = e;
                              }), r;
                          });
                          var r = e.RTCPeerConnection.prototype.addTrack;
                          r && (e.RTCPeerConnection.prototype.addTrack = function() {
                              var e = r.apply(this, arguments);
                              return e._pc = this, e;
                          }), e.RTCRtpSender.prototype.getStats = function() {
                              var e = this;
                              return this._pc.getStats().then(function(t) {
                                  return a.filterStats(t, e.track, !0);
                              });
                          };
                      }
                      if (!('getStats' in e.RTCRtpReceiver.prototype)) {
                          var o = e.RTCPeerConnection.prototype.getReceivers;
                          o && (e.RTCPeerConnection.prototype.getReceivers = function() {
                              var e = this, t = o.apply(this, []);
                              return t.forEach(function(t) {
                                  return t._pc = e;
                              }), t;
                          }), a.wrapPeerConnectionEvent(e, 'track', function(e) {
                              return e.receiver._pc = e.srcElement, e;
                          }), e.RTCRtpReceiver.prototype.getStats = function() {
                              var e = this;
                              return this._pc.getStats().then(function(t) {
                                  return a.filterStats(t, e.track, !1);
                              });
                          };
                      }
                      if ('getStats' in e.RTCRtpSender.prototype && 'getStats' in e.RTCRtpReceiver.prototype) {
                          var n = e.RTCPeerConnection.prototype.getStats;
                          e.RTCPeerConnection.prototype.getStats = function() {
                              if (arguments.length > 0 && arguments[0] instanceof e.MediaStreamTrack) {
                                  var t = arguments[0], r = void 0, i = void 0, o = void 0;
                                  return this.getSenders().forEach(function(e) {
                                      e.track === t && (r ? o = !0 : r = e);
                                  }), this.getReceivers().forEach(function(e) {
                                      return e.track === t && (i ? o = !0 : i = e), e.track === t;
                                  }), o || r && i ? Promise.reject(new DOMException('There are more than one sender or receiver for the track.', 'InvalidAccessError')) : r ? r.getStats() : i ? i.getStats() : Promise.reject(new DOMException('There is no sender or receiver for the track.', 'InvalidAccessError'));
                              }
                              return n.apply(this, arguments);
                          };
                      }
                  }
              }, r.shimAddTrackRemoveTrackWithNative = c, r.shimAddTrackRemoveTrack = function(e) {
                  if (e.RTCPeerConnection) {
                      var t = a.detectBrowser(e);
                      if (e.RTCPeerConnection.prototype.addTrack && t.version >= 65) return c(e);
                      var r = e.RTCPeerConnection.prototype.getLocalStreams;
                      e.RTCPeerConnection.prototype.getLocalStreams = function() {
                          var e = this, t = r.apply(this);
                          return this._reverseStreams = this._reverseStreams || {}, t.map(function(t) {
                              return e._reverseStreams[t.id];
                          });
                      };
                      var i = e.RTCPeerConnection.prototype.addStream;
                      e.RTCPeerConnection.prototype.addStream = function(t) {
                          var r = this;
                          if (this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}, t.getTracks().forEach(function(e) {
                              var t = r.getSenders().find(function(t) {
                                  return t.track === e;
                              });
                              if (t) throw new DOMException('Track already exists.', 'InvalidAccessError');
                          }), !this._reverseStreams[t.id]) {
                              var o = new e.MediaStream(t.getTracks());
                              this._streams[t.id] = o, this._reverseStreams[o.id] = t, t = o;
                          }
                          i.apply(this, [t]);
                      };
                      var o = e.RTCPeerConnection.prototype.removeStream;
                      e.RTCPeerConnection.prototype.removeStream = function(e) {
                          this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}, o.apply(this, [this._streams[e.id] || e]), delete this._reverseStreams[this._streams[e.id] ? this._streams[e.id].id : e.id], delete this._streams[e.id];
                      }, e.RTCPeerConnection.prototype.addTrack = function(t, r) {
                          var i = this;
                          if ('closed' === this.signalingState) throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
                          var o = [].slice.call(arguments, 1);
                          if (1 !== o.length || !o[0].getTracks().find(function(e) {
                              return e === t;
                          })) throw new DOMException('The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.', 'NotSupportedError');
                          var n = this.getSenders().find(function(e) {
                              return e.track === t;
                          });
                          if (n) throw new DOMException('Track already exists.', 'InvalidAccessError');
                          this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {};
                          var s = this._streams[r.id];
                          if (s) s.addTrack(t), Promise.resolve().then(function() {
                              i.dispatchEvent(new Event('negotiationneeded'));
                          }); else {
                              var a = new e.MediaStream([t]);
                              this._streams[r.id] = a, this._reverseStreams[a.id] = r, this.addStream(a);
                          }
                          return this.getSenders().find(function(e) {
                              return e.track === t;
                          });
                      }, ['createOffer', 'createAnswer'].forEach(function(t) {
                          var r = e.RTCPeerConnection.prototype[t];
                          e.RTCPeerConnection.prototype[t] = function() {
                              var e = this, t = arguments, i = arguments.length && 'function' == typeof arguments[0];
                              return i ? r.apply(this, [function(r) {
                                  var i = d(e, r);
                                  t[0].apply(null, [i]);
                              }, function(e) {
                                  t[1] && t[1].apply(null, e);
                              }, arguments[2]]) : r.apply(this, arguments).then(function(t) {
                                  return d(e, t);
                              });
                          };
                      });
                      var n = e.RTCPeerConnection.prototype.setLocalDescription;
                      e.RTCPeerConnection.prototype.setLocalDescription = function() {
                          return arguments.length && arguments[0].type ? (arguments[0] = (e = this, t = arguments[0], r = t.sdp, Object.keys(e._reverseStreams || []).forEach(function(t) {
                              var i = e._reverseStreams[t], o = e._streams[i.id];
                              r = r.replace(new RegExp(i.id, 'g'), o.id);
                          }), new RTCSessionDescription({
                              type: t.type,
                              sdp: r,
                          })), n.apply(this, arguments)) : n.apply(this, arguments);
                          var e, t, r;
                      };
                      var s = Object.getOwnPropertyDescriptor(e.RTCPeerConnection.prototype, 'localDescription');
                      Object.defineProperty(e.RTCPeerConnection.prototype, 'localDescription', {
                          get: function() {
                              var e = s.get.apply(this);
                              return '' === e.type ? e : d(this, e);
                          },
                      }), e.RTCPeerConnection.prototype.removeTrack = function(e) {
                          var t = this;
                          if ('closed' === this.signalingState) throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
                          if (!e._pc) throw new DOMException('Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.', 'TypeError');
                          var r = e._pc === this;
                          if (!r) throw new DOMException('Sender was not created by this connection.', 'InvalidAccessError');
                          this._streams = this._streams || {};
                          var i = void 0;
                          Object.keys(this._streams).forEach(function(r) {
                              var o = t._streams[r].getTracks().find(function(t) {
                                  return e.track === t;
                              });
                              o && (i = t._streams[r]);
                          }), i && (1 === i.getTracks().length ? this.removeStream(this._reverseStreams[i.id]) : i.removeTrack(e.track), this.dispatchEvent(new Event('negotiationneeded')));
                      };
                  }

                  function d(e, t) {
                      var r = t.sdp;
                      return Object.keys(e._reverseStreams || []).forEach(function(t) {
                          var i = e._reverseStreams[t], o = e._streams[i.id];
                          r = r.replace(new RegExp(o.id, 'g'), i.id);
                      }), new RTCSessionDescription({ type: t.type, sdp: r });
                  }
              }, r.shimPeerConnection = function(e) {
                  if (!e.RTCPeerConnection && e.webkitRTCPeerConnection && (e.RTCPeerConnection = e.webkitRTCPeerConnection), e.RTCPeerConnection) {
                      ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function(t) {
                          var r = e.RTCPeerConnection.prototype[t];
                          e.RTCPeerConnection.prototype[t] = function() {
                              return arguments[0] = new ('addIceCandidate' === t ? e.RTCIceCandidate : e.RTCSessionDescription)(arguments[0]), r.apply(this, arguments);
                          };
                      });
                      var t = e.RTCPeerConnection.prototype.addIceCandidate;
                      e.RTCPeerConnection.prototype.addIceCandidate = function() {
                          return arguments[0] ? t.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve());
                      };
                  }
              }, r.fixNegotiationNeeded = function(e) {
                  a.wrapPeerConnectionEvent(e, 'negotiationneeded', function(e) {
                      var t = e.target;
                      if ('stable' === t.signalingState) return e;
                  });
              };
              var s = e('../utils.js'), a = function(e) {
                  if (e && e.__esModule) return e;
                  var t = {};
                  if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                  return t.default = e, t;
              }(s);

              function c(e) {
                  e.RTCPeerConnection.prototype.getLocalStreams = function() {
                      var e = this;
                      return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, Object.keys(this._shimmedLocalStreams).map(function(t) {
                          return e._shimmedLocalStreams[t][0];
                      });
                  };
                  var t = e.RTCPeerConnection.prototype.addTrack;
                  e.RTCPeerConnection.prototype.addTrack = function(e, r) {
                      if (!r) return t.apply(this, arguments);
                      this._shimmedLocalStreams = this._shimmedLocalStreams || {};
                      var i = t.apply(this, arguments);
                      return this._shimmedLocalStreams[r.id] ? -1 === this._shimmedLocalStreams[r.id].indexOf(i) && this._shimmedLocalStreams[r.id].push(i) : this._shimmedLocalStreams[r.id] = [r, i], i;
                  };
                  var r = e.RTCPeerConnection.prototype.addStream;
                  e.RTCPeerConnection.prototype.addStream = function(e) {
                      var t = this;
                      this._shimmedLocalStreams = this._shimmedLocalStreams || {}, e.getTracks().forEach(function(e) {
                          var r = t.getSenders().find(function(t) {
                              return t.track === e;
                          });
                          if (r) throw new DOMException('Track already exists.', 'InvalidAccessError');
                      });
                      var i = this.getSenders();
                      r.apply(this, arguments);
                      var o = this.getSenders().filter(function(e) {
                          return -1 === i.indexOf(e);
                      });
                      this._shimmedLocalStreams[e.id] = [e].concat(o);
                  };
                  var i = e.RTCPeerConnection.prototype.removeStream;
                  e.RTCPeerConnection.prototype.removeStream = function(e) {
                      return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, delete this._shimmedLocalStreams[e.id], i.apply(this, arguments);
                  };
                  var o = e.RTCPeerConnection.prototype.removeTrack;
                  e.RTCPeerConnection.prototype.removeTrack = function(e) {
                      var t = this;
                      return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, e && Object.keys(this._shimmedLocalStreams).forEach(function(r) {
                          var i = t._shimmedLocalStreams[r].indexOf(e);
                          -1 !== i && t._shimmedLocalStreams[r].splice(i, 1), 1 === t._shimmedLocalStreams[r].length && delete t._shimmedLocalStreams[r];
                      }), o.apply(this, arguments);
                  };
              }
          }, { '../utils.js': 15, './getdisplaymedia': 4, './getusermedia': 5 }], 4: [function(e, t, r) {
              'use strict';
              Object.defineProperty(r, '__esModule', { value: !0 }), r.shimGetDisplayMedia = function(e, t) {
                  e.navigator.mediaDevices && 'getDisplayMedia' in e.navigator.mediaDevices || e.navigator.mediaDevices && ('function' == typeof t ? e.navigator.mediaDevices.getDisplayMedia = function(r) {
                      return t(r).then(function(t) {
                          var i = r.video && r.video.width, o = r.video && r.video.height,
                              n = r.video && r.video.frameRate;
                          return r.video = {
                              mandatory: {
                                  chromeMediaSource: 'desktop',
                                  chromeMediaSourceId: t,
                                  maxFrameRate: n || 3,
                              },
                          }, i && (r.video.mandatory.maxWidth = i), o && (r.video.mandatory.maxHeight = o), e.navigator.mediaDevices.getUserMedia(r);
                      });
                  } : console.error('shimGetDisplayMedia: getSourceId argument is not a function'));
              };
          }, {}], 5: [function(e, t, r) {
              'use strict';
              Object.defineProperty(r, '__esModule', { value: !0 });
              var i = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function(e) {
                  return typeof e;
              } : function(e) {
                  return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
              };
              r.shimGetUserMedia = function(e) {
                  var t = e && e.navigator;
                  if (t.mediaDevices) {
                      var r = n.detectBrowser(e), o = function(e) {
                          if ('object' !== (void 0 === e ? 'undefined' : i(e)) || e.mandatory || e.optional) return e;
                          var t = {};
                          return Object.keys(e).forEach(function(r) {
                              if ('require' !== r && 'advanced' !== r && 'mediaSource' !== r) {
                                  var o = 'object' === i(e[r]) ? e[r] : { ideal: e[r] };
                                  void 0 !== o.exact && 'number' == typeof o.exact && (o.min = o.max = o.exact);
                                  var n = function(e, t) {
                                      return e ? e + t.charAt(0).toUpperCase() + t.slice(1) : 'deviceId' === t ? 'sourceId' : t;
                                  };
                                  if (void 0 !== o.ideal) {
                                      t.optional = t.optional || [];
                                      var s = {};
                                      'number' == typeof o.ideal ? (s[n('min', r)] = o.ideal, t.optional.push(s), (s = {})[n('max', r)] = o.ideal, t.optional.push(s)) : (s[n('', r)] = o.ideal, t.optional.push(s));
                                  }
                                  void 0 !== o.exact && 'number' != typeof o.exact ? (t.mandatory = t.mandatory || {}, t.mandatory[n('', r)] = o.exact) : ['min', 'max'].forEach(function(e) {
                                      void 0 !== o[e] && (t.mandatory = t.mandatory || {}, t.mandatory[n(e, r)] = o[e]);
                                  });
                              }
                          }), e.advanced && (t.optional = (t.optional || []).concat(e.advanced)), t;
                      }, a = function(e, n) {
                          if (r.version >= 61) return n(e);
                          if ((e = JSON.parse(JSON.stringify(e))) && 'object' === i(e.audio)) {
                              var a = function(e, t, r) {
                                  t in e && !(r in e) && (e[r] = e[t], delete e[t]);
                              };
                              e = JSON.parse(JSON.stringify(e)), a(e.audio, 'autoGainControl', 'googAutoGainControl'), a(e.audio, 'noiseSuppression', 'googNoiseSuppression'), e.audio = o(e.audio);
                          }
                          if (e && 'object' === i(e.video)) {
                              var c = e.video.facingMode;
                              c = c && ('object' === (void 0 === c ? 'undefined' : i(c)) ? c : { ideal: c });
                              var d = r.version < 66;
                              if (c && ('user' === c.exact || 'environment' === c.exact || 'user' === c.ideal || 'environment' === c.ideal) && (!t.mediaDevices.getSupportedConstraints || !t.mediaDevices.getSupportedConstraints().facingMode || d)) {
                                  delete e.video.facingMode;
                                  var l = void 0;
                                  if ('environment' === c.exact || 'environment' === c.ideal ? l = ['back', 'rear'] : 'user' !== c.exact && 'user' !== c.ideal || (l = ['front']), l) return t.mediaDevices.enumerateDevices().then(function(t) {
                                      var r = (t = t.filter(function(e) {
                                          return 'videoinput' === e.kind;
                                      })).find(function(e) {
                                          return l.some(function(t) {
                                              return e.label.toLowerCase().includes(t);
                                          });
                                      });
                                      return !r && t.length && l.includes('back') && (r = t[t.length - 1]), r && (e.video.deviceId = c.exact ? { exact: r.deviceId } : { ideal: r.deviceId }), e.video = o(e.video), s('chrome: ' + JSON.stringify(e)), n(e);
                                  });
                              }
                              e.video = o(e.video);
                          }
                          return s('chrome: ' + JSON.stringify(e)), n(e);
                      }, c = function(e) {
                          return r.version >= 64 ? e : {
                              name: {
                                  PermissionDeniedError: 'NotAllowedError',
                                  PermissionDismissedError: 'NotAllowedError',
                                  InvalidStateError: 'NotAllowedError',
                                  DevicesNotFoundError: 'NotFoundError',
                                  ConstraintNotSatisfiedError: 'OverconstrainedError',
                                  TrackStartError: 'NotReadableError',
                                  MediaDeviceFailedDueToShutdown: 'NotAllowedError',
                                  MediaDeviceKillSwitchOn: 'NotAllowedError',
                                  TabCaptureError: 'AbortError',
                                  ScreenCaptureError: 'AbortError',
                                  DeviceCaptureError: 'AbortError',
                              }[e.name] || e.name,
                              message: e.message,
                              constraint: e.constraint || e.constraintName,
                              toString: function() {
                                  return this.name + (this.message && ': ') + this.message;
                              },
                          };
                      };
                      if (t.getUserMedia = function(e, r, i) {
                          a(e, function(e) {
                              t.webkitGetUserMedia(e, r, function(e) {
                                  i && i(c(e));
                              });
                          });
                      }.bind(t), t.mediaDevices.getUserMedia) {
                          var d = t.mediaDevices.getUserMedia.bind(t.mediaDevices);
                          t.mediaDevices.getUserMedia = function(e) {
                              return a(e, function(e) {
                                  return d(e).then(function(t) {
                                      if (e.audio && !t.getAudioTracks().length || e.video && !t.getVideoTracks().length) throw t.getTracks().forEach(function(e) {
                                          e.stop();
                                      }), new DOMException('', 'NotFoundError');
                                      return t;
                                  }, function(e) {
                                      return Promise.reject(c(e));
                                  });
                              });
                          };
                      }
                  }
              };
              var o = e('../utils.js'), n = function(e) {
                  if (e && e.__esModule) return e;
                  var t = {};
                  if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                  return t.default = e, t;
              }(o), s = n.log;
          }, { '../utils.js': 15 }], 6: [function(e, t, r) {
              'use strict';
              Object.defineProperty(r, '__esModule', { value: !0 });
              var i = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function(e) {
                  return typeof e;
              } : function(e) {
                  return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
              };
              r.shimRTCIceCandidate = function(e) {
                  if (e.RTCIceCandidate && !(e.RTCIceCandidate && 'foundation' in e.RTCIceCandidate.prototype)) {
                      var t = e.RTCIceCandidate;
                      e.RTCIceCandidate = function(e) {
                          if ('object' === (void 0 === e ? 'undefined' : i(e)) && e.candidate && 0 === e.candidate.indexOf('a=') && ((e = JSON.parse(JSON.stringify(e))).candidate = e.candidate.substr(2)), e.candidate && e.candidate.length) {
                              var r = new t(e), o = s.default.parseCandidate(e.candidate), n = Object.assign(r, o);
                              return n.toJSON = function() {
                                  return {
                                      candidate: n.candidate,
                                      sdpMid: n.sdpMid,
                                      sdpMLineIndex: n.sdpMLineIndex,
                                      usernameFragment: n.usernameFragment,
                                  };
                              }, n;
                          }
                          return new t(e);
                      }, e.RTCIceCandidate.prototype = t.prototype, c.wrapPeerConnectionEvent(e, 'icecandidate', function(t) {
                          return t.candidate && Object.defineProperty(t, 'candidate', {
                              value: new e.RTCIceCandidate(t.candidate),
                              writable: 'false',
                          }), t;
                      });
                  }
              }, r.shimMaxMessageSize = function(e) {
                  if (!e.RTCSctpTransport && e.RTCPeerConnection) {
                      var t = c.detectBrowser(e);
                      'sctp' in e.RTCPeerConnection.prototype || Object.defineProperty(e.RTCPeerConnection.prototype, 'sctp', {
                          get: function() {
                              return void 0 === this._sctp ? null : this._sctp;
                          },
                      });
                      var r = e.RTCPeerConnection.prototype.setRemoteDescription;
                      e.RTCPeerConnection.prototype.setRemoteDescription = function() {
                          if (this._sctp = null, function(e) {
                              if (!e || !e.sdp) return !1;
                              var t = s.default.splitSections(e.sdp);
                              return t.shift(), t.some(function(e) {
                                  var t = s.default.parseMLine(e);
                                  return t && 'application' === t.kind && -1 !== t.protocol.indexOf('SCTP');
                              });
                          }(arguments[0])) {
                              var e = function(e) {
                                      var t = e.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
                                      if (null === t || t.length < 2) return -1;
                                      var r = parseInt(t[1], 10);
                                      return r != r ? -1 : r;
                                  }(arguments[0]),
                                  i = (c = e, d = 65536, 'firefox' === t.browser && (d = t.version < 57 ? -1 === c ? 16384 : 2147483637 : t.version < 60 ? 57 === t.version ? 65535 : 65536 : 2147483637), d),
                                  o = function(e, r) {
                                      var i = 65536;
                                      'firefox' === t.browser && 57 === t.version && (i = 65535);
                                      var o = s.default.matchPrefix(e.sdp, 'a=max-message-size:');
                                      return o.length > 0 ? i = parseInt(o[0].substr(19), 10) : 'firefox' === t.browser && -1 !== r && (i = 2147483637), i;
                                  }(arguments[0], e), n = void 0;
                              n = 0 === i && 0 === o ? Number.POSITIVE_INFINITY : 0 === i || 0 === o ? Math.max(i, o) : Math.min(i, o);
                              var a = {};
                              Object.defineProperty(a, 'maxMessageSize', {
                                  get: function() {
                                      return n;
                                  },
                              }), this._sctp = a;
                          }
                          var c, d;
                          return r.apply(this, arguments);
                      };
                  }
              }, r.shimSendThrowTypeError = function(e) {
                  if (e.RTCPeerConnection && 'createDataChannel' in e.RTCPeerConnection.prototype) {
                      var t = e.RTCPeerConnection.prototype.createDataChannel;
                      e.RTCPeerConnection.prototype.createDataChannel = function() {
                          var e = t.apply(this, arguments);
                          return r(e, this), e;
                      }, c.wrapPeerConnectionEvent(e, 'datachannel', function(e) {
                          return r(e.channel, e.target), e;
                      });
                  }

                  function r(e, t) {
                      var r = e.send;
                      e.send = function() {
                          var i = arguments[0], o = i.length || i.size || i.byteLength;
                          if ('open' === e.readyState && t.sctp && o > t.sctp.maxMessageSize) throw new TypeError('Message too large (can send a maximum of ' + t.sctp.maxMessageSize + ' bytes)');
                          return r.apply(e, arguments);
                      };
                  }
              }, r.shimConnectionState = function(e) {
                  if (e.RTCPeerConnection && !('connectionState' in e.RTCPeerConnection.prototype)) {
                      var t = e.RTCPeerConnection.prototype;
                      Object.defineProperty(t, 'connectionState', {
                          get: function() {
                              return {
                                  completed: 'connected',
                                  checking: 'connecting',
                              }[this.iceConnectionState] || this.iceConnectionState;
                          }, enumerable: !0, configurable: !0,
                      }), Object.defineProperty(t, 'onconnectionstatechange', {
                          get: function() {
                              return this._onconnectionstatechange || null;
                          }, set: function(e) {
                              this._onconnectionstatechange && (this.removeEventListener('connectionstatechange', this._onconnectionstatechange), delete this._onconnectionstatechange), e && this.addEventListener('connectionstatechange', this._onconnectionstatechange = e);
                          }, enumerable: !0, configurable: !0,
                      }), ['setLocalDescription', 'setRemoteDescription'].forEach(function(e) {
                          var r = t[e];
                          t[e] = function() {
                              return this._connectionstatechangepoly || (this._connectionstatechangepoly = function(e) {
                                  var t = e.target;
                                  if (t._lastConnectionState !== t.connectionState) {
                                      t._lastConnectionState = t.connectionState;
                                      var r = new Event('connectionstatechange', e);
                                      t.dispatchEvent(r);
                                  }
                                  return e;
                              }, this.addEventListener('iceconnectionstatechange', this._connectionstatechangepoly)), r.apply(this, arguments);
                          };
                      });
                  }
              }, r.removeAllowExtmapMixed = function(e) {
                  if (e.RTCPeerConnection) {
                      var t = c.detectBrowser(e);
                      if (!('chrome' === t.browser && t.version >= 71)) {
                          var r = e.RTCPeerConnection.prototype.setRemoteDescription;
                          e.RTCPeerConnection.prototype.setRemoteDescription = function(e) {
                              return e && e.sdp && -1 !== e.sdp.indexOf('\na=extmap-allow-mixed') && (e.sdp = e.sdp.split('\n').filter(function(e) {
                                  return 'a=extmap-allow-mixed' !== e.trim();
                              }).join('\n')), r.apply(this, arguments);
                          };
                      }
                  }
              };
              var o, n = e('sdp'), s = (o = n) && o.__esModule ? o : { default: o }, a = e('./utils'),
                  c = function(e) {
                      if (e && e.__esModule) return e;
                      var t = {};
                      if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                      return t.default = e, t;
                  }(a);
          }, { './utils': 15, sdp: 17 }], 7: [function(e, t, r) {
              'use strict';
              Object.defineProperty(r, '__esModule', { value: !0 }), r.shimGetDisplayMedia = r.shimGetUserMedia = void 0;
              var i = e('./getusermedia');
              Object.defineProperty(r, 'shimGetUserMedia', {
                  enumerable: !0, get: function() {
                      return i.shimGetUserMedia;
                  },
              });
              var o = e('./getdisplaymedia');
              Object.defineProperty(r, 'shimGetDisplayMedia', {
                  enumerable: !0, get: function() {
                      return o.shimGetDisplayMedia;
                  },
              }), r.shimPeerConnection = function(e) {
                  var t = a.detectBrowser(e);
                  if (e.RTCIceGatherer && (e.RTCIceCandidate || (e.RTCIceCandidate = function(e) {
                      return e;
                  }), e.RTCSessionDescription || (e.RTCSessionDescription = function(e) {
                      return e;
                  }), t.version < 15025)) {
                      var r = Object.getOwnPropertyDescriptor(e.MediaStreamTrack.prototype, 'enabled');
                      Object.defineProperty(e.MediaStreamTrack.prototype, 'enabled', {
                          set: function(e) {
                              r.set.call(this, e);
                              var t = new Event('enabled');
                              t.enabled = e, this.dispatchEvent(t);
                          },
                      });
                  }
                  !e.RTCRtpSender || 'dtmf' in e.RTCRtpSender.prototype || Object.defineProperty(e.RTCRtpSender.prototype, 'dtmf', {
                      get: function() {
                          return void 0 === this._dtmf && ('audio' === this.track.kind ? this._dtmf = new e.RTCDtmfSender(this) : 'video' === this.track.kind && (this._dtmf = null)), this._dtmf;
                      },
                  }), e.RTCDtmfSender && !e.RTCDTMFSender && (e.RTCDTMFSender = e.RTCDtmfSender);
                  var i = (0, l.default)(e, t.version);
                  e.RTCPeerConnection = function(e) {
                      return e && e.iceServers && (e.iceServers = (0, c.filterIceServers)(e.iceServers, t.version), a.log('ICE servers after filtering:', e.iceServers)), new i(e);
                  }, e.RTCPeerConnection.prototype = i.prototype;
              }, r.shimReplaceTrack = function(e) {
                  !e.RTCRtpSender || 'replaceTrack' in e.RTCRtpSender.prototype || (e.RTCRtpSender.prototype.replaceTrack = e.RTCRtpSender.prototype.setTrack);
              };
              var n, s = e('../utils'), a = function(e) {
                      if (e && e.__esModule) return e;
                      var t = {};
                      if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                      return t.default = e, t;
                  }(s), c = e('./filtericeservers'), d = e('rtcpeerconnection-shim'),
                  l = (n = d) && n.__esModule ? n : { default: n };
          }, {
              '../utils': 15,
              './filtericeservers': 8,
              './getdisplaymedia': 9,
              './getusermedia': 10,
              'rtcpeerconnection-shim': 16,
          }], 8: [function(e, t, r) {
              'use strict';
              Object.defineProperty(r, '__esModule', { value: !0 }), r.filterIceServers = function(e, t) {
                  var r = !1;
                  return (e = JSON.parse(JSON.stringify(e))).filter(function(e) {
                      if (e && (e.urls || e.url)) {
                          var t = e.urls || e.url;
                          e.url && !e.urls && o.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
                          var i = 'string' == typeof t;
                          return i && (t = [t]), t = t.filter(function(e) {
                              if (0 === e.indexOf('stun:')) return !1;
                              var t = e.startsWith('turn') && !e.startsWith('turn:[') && e.includes('transport=udp');
                              return t && !r ? (r = !0, !0) : t && !r;
                          }), delete e.url, e.urls = i ? t[0] : t, !!t.length;
                      }
                  });
              };
              var i = e('../utils'), o = function(e) {
                  if (e && e.__esModule) return e;
                  var t = {};
                  if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                  return t.default = e, t;
              }(i);
          }, { '../utils': 15 }], 9: [function(e, t, r) {
              'use strict';
              Object.defineProperty(r, '__esModule', { value: !0 }), r.shimGetDisplayMedia = function(e) {
                  'getDisplayMedia' in e.navigator && e.navigator.mediaDevices && (e.navigator.mediaDevices && 'getDisplayMedia' in e.navigator.mediaDevices || (e.navigator.mediaDevices.getDisplayMedia = e.navigator.getDisplayMedia.bind(e.navigator)));
              };
          }, {}], 10: [function(e, t, r) {
              'use strict';
              Object.defineProperty(r, '__esModule', { value: !0 }), r.shimGetUserMedia = function(e) {
                  var t = e && e.navigator, r = t.mediaDevices.getUserMedia.bind(t.mediaDevices);
                  t.mediaDevices.getUserMedia = function(e) {
                      return r(e).catch(function(e) {
                          return Promise.reject(function(e) {
                              return {
                                  name: { PermissionDeniedError: 'NotAllowedError' }[e.name] || e.name,
                                  message: e.message,
                                  constraint: e.constraint,
                                  toString: function() {
                                      return this.name;
                                  },
                              };
                          }(e));
                      });
                  };
              };
          }, {}], 11: [function(e, t, r) {
              'use strict';
              Object.defineProperty(r, '__esModule', { value: !0 }), r.shimGetDisplayMedia = r.shimGetUserMedia = void 0;
              var i = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function(e) {
                  return typeof e;
              } : function(e) {
                  return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
              }, o = e('./getusermedia');
              Object.defineProperty(r, 'shimGetUserMedia', {
                  enumerable: !0, get: function() {
                      return o.shimGetUserMedia;
                  },
              });
              var n = e('./getdisplaymedia');
              Object.defineProperty(r, 'shimGetDisplayMedia', {
                  enumerable: !0, get: function() {
                      return n.shimGetDisplayMedia;
                  },
              }), r.shimOnTrack = function(e) {
                  'object' === (void 0 === e ? 'undefined' : i(e)) && e.RTCTrackEvent && 'receiver' in e.RTCTrackEvent.prototype && !('transceiver' in e.RTCTrackEvent.prototype) && Object.defineProperty(e.RTCTrackEvent.prototype, 'transceiver', {
                      get: function() {
                          return { receiver: this.receiver };
                      },
                  });
              }, r.shimPeerConnection = function(e) {
                  var t = a.detectBrowser(e);
                  if ('object' === (void 0 === e ? 'undefined' : i(e)) && (e.RTCPeerConnection || e.mozRTCPeerConnection)) {
                      !e.RTCPeerConnection && e.mozRTCPeerConnection && (e.RTCPeerConnection = e.mozRTCPeerConnection), ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function(t) {
                          var r = e.RTCPeerConnection.prototype[t];
                          e.RTCPeerConnection.prototype[t] = function() {
                              return arguments[0] = new ('addIceCandidate' === t ? e.RTCIceCandidate : e.RTCSessionDescription)(arguments[0]), r.apply(this, arguments);
                          };
                      });
                      var r = e.RTCPeerConnection.prototype.addIceCandidate;
                      e.RTCPeerConnection.prototype.addIceCandidate = function() {
                          return arguments[0] ? r.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve());
                      };
                      var o = {
                          inboundrtp: 'inbound-rtp',
                          outboundrtp: 'outbound-rtp',
                          candidatepair: 'candidate-pair',
                          localcandidate: 'local-candidate',
                          remotecandidate: 'remote-candidate',
                      }, n = e.RTCPeerConnection.prototype.getStats;
                      e.RTCPeerConnection.prototype.getStats = function(e, r, i) {
                          return n.apply(this, [e || null]).then(function(e) {
                              if (t.version < 53 && !r) try {
                                  e.forEach(function(e) {
                                      e.type = o[e.type] || e.type;
                                  });
                              } catch (t) {
                                  if ('TypeError' !== t.name) throw t;
                                  e.forEach(function(t, r) {
                                      e.set(r, Object.assign({}, t, { type: o[t.type] || t.type }));
                                  });
                              }
                              return e;
                          }).then(r, i);
                      };
                  }
              }, r.shimSenderGetStats = function(e) {
                  if ('object' === (void 0 === e ? 'undefined' : i(e)) && e.RTCPeerConnection && e.RTCRtpSender && !(e.RTCRtpSender && 'getStats' in e.RTCRtpSender.prototype)) {
                      var t = e.RTCPeerConnection.prototype.getSenders;
                      t && (e.RTCPeerConnection.prototype.getSenders = function() {
                          var e = this, r = t.apply(this, []);
                          return r.forEach(function(t) {
                              return t._pc = e;
                          }), r;
                      });
                      var r = e.RTCPeerConnection.prototype.addTrack;
                      r && (e.RTCPeerConnection.prototype.addTrack = function() {
                          var e = r.apply(this, arguments);
                          return e._pc = this, e;
                      }), e.RTCRtpSender.prototype.getStats = function() {
                          return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map);
                      };
                  }
              }, r.shimReceiverGetStats = function(e) {
                  if ('object' === (void 0 === e ? 'undefined' : i(e)) && e.RTCPeerConnection && e.RTCRtpSender && !(e.RTCRtpSender && 'getStats' in e.RTCRtpReceiver.prototype)) {
                      var t = e.RTCPeerConnection.prototype.getReceivers;
                      t && (e.RTCPeerConnection.prototype.getReceivers = function() {
                          var e = this, r = t.apply(this, []);
                          return r.forEach(function(t) {
                              return t._pc = e;
                          }), r;
                      }), a.wrapPeerConnectionEvent(e, 'track', function(e) {
                          return e.receiver._pc = e.srcElement, e;
                      }), e.RTCRtpReceiver.prototype.getStats = function() {
                          return this._pc.getStats(this.track);
                      };
                  }
              }, r.shimRemoveStream = function(e) {
                  !e.RTCPeerConnection || 'removeStream' in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.removeStream = function(e) {
                      var t = this;
                      a.deprecated('removeStream', 'removeTrack'), this.getSenders().forEach(function(r) {
                          r.track && e.getTracks().includes(r.track) && t.removeTrack(r);
                      });
                  });
              }, r.shimRTCDataChannel = function(e) {
                  e.DataChannel && !e.RTCDataChannel && (e.RTCDataChannel = e.DataChannel);
              };
              var s = e('../utils'), a = function(e) {
                  if (e && e.__esModule) return e;
                  var t = {};
                  if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                  return t.default = e, t;
              }(s);
          }, { '../utils': 15, './getdisplaymedia': 12, './getusermedia': 13 }], 12: [function(e, t, r) {
              'use strict';
              Object.defineProperty(r, '__esModule', { value: !0 }), r.shimGetDisplayMedia = function(e, t) {
                  e.navigator.mediaDevices && 'getDisplayMedia' in e.navigator.mediaDevices || e.navigator.mediaDevices && (e.navigator.mediaDevices.getDisplayMedia = function(r) {
                      if (!r || !r.video) {
                          var i = new DOMException('getDisplayMedia without video constraints is undefined');
                          return i.name = 'NotFoundError', i.code = 8, Promise.reject(i);
                      }
                      return !0 === r.video ? r.video = { mediaSource: t } : r.video.mediaSource = t, e.navigator.mediaDevices.getUserMedia(r);
                  });
              };
          }, {}], 13: [function(e, t, r) {
              'use strict';
              Object.defineProperty(r, '__esModule', { value: !0 });
              var i = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function(e) {
                  return typeof e;
              } : function(e) {
                  return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
              };
              r.shimGetUserMedia = function(e) {
                  var t = n.detectBrowser(e), r = e && e.navigator, o = e && e.MediaStreamTrack;
                  if (r.getUserMedia = function(e, t, i) {
                      n.deprecated('navigator.getUserMedia', 'navigator.mediaDevices.getUserMedia'), r.mediaDevices.getUserMedia(e).then(t, i);
                  }, !(t.version > 55 && 'autoGainControl' in r.mediaDevices.getSupportedConstraints())) {
                      var s = function(e, t, r) {
                          t in e && !(r in e) && (e[r] = e[t], delete e[t]);
                      }, a = r.mediaDevices.getUserMedia.bind(r.mediaDevices);
                      if (r.mediaDevices.getUserMedia = function(e) {
                          return 'object' === (void 0 === e ? 'undefined' : i(e)) && 'object' === i(e.audio) && (e = JSON.parse(JSON.stringify(e)), s(e.audio, 'autoGainControl', 'mozAutoGainControl'), s(e.audio, 'noiseSuppression', 'mozNoiseSuppression')), a(e);
                      }, o && o.prototype.getSettings) {
                          var c = o.prototype.getSettings;
                          o.prototype.getSettings = function() {
                              var e = c.apply(this, arguments);
                              return s(e, 'mozAutoGainControl', 'autoGainControl'), s(e, 'mozNoiseSuppression', 'noiseSuppression'), e;
                          };
                      }
                      if (o && o.prototype.applyConstraints) {
                          var d = o.prototype.applyConstraints;
                          o.prototype.applyConstraints = function(e) {
                              return 'audio' === this.kind && 'object' === (void 0 === e ? 'undefined' : i(e)) && (e = JSON.parse(JSON.stringify(e)), s(e, 'autoGainControl', 'mozAutoGainControl'), s(e, 'noiseSuppression', 'mozNoiseSuppression')), d.apply(this, [e]);
                          };
                      }
                  }
              };
              var o = e('../utils'), n = function(e) {
                  if (e && e.__esModule) return e;
                  var t = {};
                  if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                  return t.default = e, t;
              }(o);
          }, { '../utils': 15 }], 14: [function(e, t, r) {
              'use strict';
              Object.defineProperty(r, '__esModule', { value: !0 });
              var i = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function(e) {
                  return typeof e;
              } : function(e) {
                  return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
              };
              r.shimLocalStreamsAPI = function(e) {
                  if ('object' === (void 0 === e ? 'undefined' : i(e)) && e.RTCPeerConnection) {
                      if ('getLocalStreams' in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getLocalStreams = function() {
                          return this._localStreams || (this._localStreams = []), this._localStreams;
                      }), !('addStream' in e.RTCPeerConnection.prototype)) {
                          var t = e.RTCPeerConnection.prototype.addTrack;
                          e.RTCPeerConnection.prototype.addStream = function(e) {
                              var r = this;
                              this._localStreams || (this._localStreams = []), this._localStreams.includes(e) || this._localStreams.push(e), e.getTracks().forEach(function(i) {
                                  return t.call(r, i, e);
                              });
                          }, e.RTCPeerConnection.prototype.addTrack = function(e, r) {
                              return r && (this._localStreams ? this._localStreams.includes(r) || this._localStreams.push(r) : this._localStreams = [r]), t.call(this, e, r);
                          };
                      }
                      'removeStream' in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.removeStream = function(e) {
                          var t = this;
                          this._localStreams || (this._localStreams = []);
                          var r = this._localStreams.indexOf(e);
                          if (-1 !== r) {
                              this._localStreams.splice(r, 1);
                              var i = e.getTracks();
                              this.getSenders().forEach(function(e) {
                                  i.includes(e.track) && t.removeTrack(e);
                              });
                          }
                      });
                  }
              }, r.shimRemoteStreamsAPI = function(e) {
                  if ('object' === (void 0 === e ? 'undefined' : i(e)) && e.RTCPeerConnection && ('getRemoteStreams' in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getRemoteStreams = function() {
                      return this._remoteStreams ? this._remoteStreams : [];
                  }), !('onaddstream' in e.RTCPeerConnection.prototype))) {
                      Object.defineProperty(e.RTCPeerConnection.prototype, 'onaddstream', {
                          get: function() {
                              return this._onaddstream;
                          }, set: function(e) {
                              var t = this;
                              this._onaddstream && (this.removeEventListener('addstream', this._onaddstream), this.removeEventListener('track', this._onaddstreampoly)), this.addEventListener('addstream', this._onaddstream = e), this.addEventListener('track', this._onaddstreampoly = function(e) {
                                  e.streams.forEach(function(e) {
                                      if (t._remoteStreams || (t._remoteStreams = []), !t._remoteStreams.includes(e)) {
                                          t._remoteStreams.push(e);
                                          var r = new Event('addstream');
                                          r.stream = e, t.dispatchEvent(r);
                                      }
                                  });
                              });
                          },
                      });
                      var t = e.RTCPeerConnection.prototype.setRemoteDescription;
                      e.RTCPeerConnection.prototype.setRemoteDescription = function() {
                          var e = this;
                          return this._onaddstreampoly || this.addEventListener('track', this._onaddstreampoly = function(t) {
                              t.streams.forEach(function(t) {
                                  if (e._remoteStreams || (e._remoteStreams = []), !(e._remoteStreams.indexOf(t) >= 0)) {
                                      e._remoteStreams.push(t);
                                      var r = new Event('addstream');
                                      r.stream = t, e.dispatchEvent(r);
                                  }
                              });
                          }), t.apply(e, arguments);
                      };
                  }
              }, r.shimCallbacksAPI = function(e) {
                  if ('object' === (void 0 === e ? 'undefined' : i(e)) && e.RTCPeerConnection) {
                      var t = e.RTCPeerConnection.prototype, r = t.createOffer, o = t.createAnswer,
                          n = t.setLocalDescription, s = t.setRemoteDescription, a = t.addIceCandidate;
                      t.createOffer = function(e, t) {
                          var i = arguments.length >= 2 ? arguments[2] : arguments[0], o = r.apply(this, [i]);
                          return t ? (o.then(e, t), Promise.resolve()) : o;
                      }, t.createAnswer = function(e, t) {
                          var r = arguments.length >= 2 ? arguments[2] : arguments[0], i = o.apply(this, [r]);
                          return t ? (i.then(e, t), Promise.resolve()) : i;
                      };
                      var c = function(e, t, r) {
                          var i = n.apply(this, [e]);
                          return r ? (i.then(t, r), Promise.resolve()) : i;
                      };
                      t.setLocalDescription = c, c = function(e, t, r) {
                          var i = s.apply(this, [e]);
                          return r ? (i.then(t, r), Promise.resolve()) : i;
                      }, t.setRemoteDescription = c, c = function(e, t, r) {
                          var i = a.apply(this, [e]);
                          return r ? (i.then(t, r), Promise.resolve()) : i;
                      }, t.addIceCandidate = c;
                  }
              }, r.shimGetUserMedia = function(e) {
                  var t = e && e.navigator;
                  if (t.mediaDevices && t.mediaDevices.getUserMedia) {
                      var r = t.mediaDevices, i = r.getUserMedia.bind(r);
                      t.mediaDevices.getUserMedia = function(e) {
                          return i(s(e));
                      };
                  }
                  !t.getUserMedia && t.mediaDevices && t.mediaDevices.getUserMedia && (t.getUserMedia = function(e, r, i) {
                      t.mediaDevices.getUserMedia(e).then(r, i);
                  }.bind(t));
              }, r.shimConstraints = s, r.shimRTCIceServerUrls = function(e) {
                  var t = e.RTCPeerConnection;
                  e.RTCPeerConnection = function(e, r) {
                      if (e && e.iceServers) {
                          for (var i = [], o = 0; o < e.iceServers.length; o++) {
                              var s = e.iceServers[o];
                              !s.hasOwnProperty('urls') && s.hasOwnProperty('url') ? (n.deprecated('RTCIceServer.url', 'RTCIceServer.urls'), (s = JSON.parse(JSON.stringify(s))).urls = s.url, delete s.url, i.push(s)) : i.push(e.iceServers[o]);
                          }
                          e.iceServers = i;
                      }
                      return new t(e, r);
                  }, e.RTCPeerConnection.prototype = t.prototype, 'generateCertificate' in e.RTCPeerConnection && Object.defineProperty(e.RTCPeerConnection, 'generateCertificate', {
                      get: function() {
                          return t.generateCertificate;
                      },
                  });
              }, r.shimTrackEventTransceiver = function(e) {
                  'object' === (void 0 === e ? 'undefined' : i(e)) && e.RTCPeerConnection && 'receiver' in e.RTCTrackEvent.prototype && !e.RTCTransceiver && Object.defineProperty(e.RTCTrackEvent.prototype, 'transceiver', {
                      get: function() {
                          return { receiver: this.receiver };
                      },
                  });
              }, r.shimCreateOfferLegacy = function(e) {
                  var t = e.RTCPeerConnection.prototype.createOffer;
                  e.RTCPeerConnection.prototype.createOffer = function(e) {
                      if (e) {
                          void 0 !== e.offerToReceiveAudio && (e.offerToReceiveAudio = !!e.offerToReceiveAudio);
                          var r = this.getTransceivers().find(function(e) {
                              return 'audio' === e.receiver.track.kind;
                          });
                          !1 === e.offerToReceiveAudio && r ? 'sendrecv' === r.direction ? r.setDirection ? r.setDirection('sendonly') : r.direction = 'sendonly' : 'recvonly' === r.direction && (r.setDirection ? r.setDirection('inactive') : r.direction = 'inactive') : !0 !== e.offerToReceiveAudio || r || this.addTransceiver('audio'), void 0 !== e.offerToReceiveVideo && (e.offerToReceiveVideo = !!e.offerToReceiveVideo);
                          var i = this.getTransceivers().find(function(e) {
                              return 'video' === e.receiver.track.kind;
                          });
                          !1 === e.offerToReceiveVideo && i ? 'sendrecv' === i.direction ? i.setDirection ? i.setDirection('sendonly') : i.direction = 'sendonly' : 'recvonly' === i.direction && (i.setDirection ? i.setDirection('inactive') : i.direction = 'inactive') : !0 !== e.offerToReceiveVideo || i || this.addTransceiver('video');
                      }
                      return t.apply(this, arguments);
                  };
              };
              var o = e('../utils'), n = function(e) {
                  if (e && e.__esModule) return e;
                  var t = {};
                  if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                  return t.default = e, t;
              }(o);

              function s(e) {
                  return e && void 0 !== e.video ? Object.assign({}, e, { video: n.compactObject(e.video) }) : e;
              }
          }, { '../utils': 15 }], 15: [function(e, t, r) {
              'use strict';
              Object.defineProperty(r, '__esModule', { value: !0 });
              var i = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function(e) {
                  return typeof e;
              } : function(e) {
                  return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
              };
              r.extractVersion = s, r.wrapPeerConnectionEvent = function(e, t, r) {
                  if (e.RTCPeerConnection) {
                      var i = e.RTCPeerConnection.prototype, o = i.addEventListener;
                      i.addEventListener = function(e, i) {
                          if (e !== t) return o.apply(this, arguments);
                          var n = function(e) {
                              var t = r(e);
                              t && i(t);
                          };
                          return this._eventMap = this._eventMap || {}, this._eventMap[i] = n, o.apply(this, [e, n]);
                      };
                      var n = i.removeEventListener;
                      i.removeEventListener = function(e, r) {
                          if (e !== t || !this._eventMap || !this._eventMap[r]) return n.apply(this, arguments);
                          var i = this._eventMap[r];
                          return delete this._eventMap[r], n.apply(this, [e, i]);
                      }, Object.defineProperty(i, 'on' + t, {
                          get: function() {
                              return this['_on' + t];
                          }, set: function(e) {
                              this['_on' + t] && (this.removeEventListener(t, this['_on' + t]), delete this['_on' + t]), e && this.addEventListener(t, this['_on' + t] = e);
                          }, enumerable: !0, configurable: !0,
                      });
                  }
              }, r.disableLog = function(e) {
                  return 'boolean' != typeof e ? new Error('Argument type: ' + (void 0 === e ? 'undefined' : i(e)) + '. Please use a boolean.') : (o = e, e ? 'adapter.js logging disabled' : 'adapter.js logging enabled');
              }, r.disableWarnings = function(e) {
                  return 'boolean' != typeof e ? new Error('Argument type: ' + (void 0 === e ? 'undefined' : i(e)) + '. Please use a boolean.') : (n = !e, 'adapter.js deprecation warnings ' + (e ? 'disabled' : 'enabled'));
              }, r.log = function() {
                  if ('object' === ('undefined' == typeof window ? 'undefined' : i(window))) {
                      if (o) return;
                      'undefined' != typeof console && 'function' == typeof console.log && console.log.apply(console, arguments);
                  }
              }, r.deprecated = function(e, t) {
                  n && console.warn(e + ' is deprecated, please use ' + t + ' instead.');
              }, r.detectBrowser = function(e) {
                  var t = e.navigator, r = { browser: null, version: null };
                  if (void 0 === e || !e.navigator) return r.browser = 'Not a browser.', r;
                  if (t.mozGetUserMedia) r.browser = 'firefox', r.version = s(t.userAgent, /Firefox\/(\d+)\./, 1); else if (t.webkitGetUserMedia || !1 === e.isSecureContext && e.webkitRTCPeerConnection && !e.RTCIceGatherer) r.browser = 'chrome', r.version = s(t.userAgent, /Chrom(e|ium)\/(\d+)\./, 2); else if (t.mediaDevices && t.userAgent.match(/Edge\/(\d+).(\d+)$/)) r.browser = 'edge', r.version = s(t.userAgent, /Edge\/(\d+).(\d+)$/, 2); else {
                      if (!e.RTCPeerConnection || !t.userAgent.match(/AppleWebKit\/(\d+)\./)) return r.browser = 'Not a supported browser.', r;
                      r.browser = 'safari', r.version = s(t.userAgent, /AppleWebKit\/(\d+)\./, 1);
                  }
                  return r;
              }, r.compactObject = function e(t) {
                  return 'object' !== (void 0 === t ? 'undefined' : i(t)) ? t : Object.keys(t).reduce(function(r, o) {
                      var n = 'object' === i(t[o]), s = n ? e(t[o]) : t[o], a = n && !Object.keys(s).length;
                      return void 0 === s || a ? r : Object.assign(r, function(e, t, r) {
                          return t in e ? Object.defineProperty(e, t, {
                              value: r,
                              enumerable: !0,
                              configurable: !0,
                              writable: !0,
                          }) : e[t] = r, e;
                      }({}, o, s));
                  }, {});
              }, r.walkStats = a, r.filterStats = function(e, t, r) {
                  var i = r ? 'outbound-rtp' : 'inbound-rtp', o = new Map;
                  if (null === t) return o;
                  var n = [];
                  return e.forEach(function(e) {
                      'track' === e.type && e.trackIdentifier === t.id && n.push(e);
                  }), n.forEach(function(t) {
                      e.forEach(function(r) {
                          r.type === i && r.trackId === t.id && a(e, r, o);
                      });
                  }), o;
              };
              var o = !0, n = !0;

              function s(e, t, r) {
                  var i = e.match(t);
                  return i && i.length >= r && parseInt(i[r], 10);
              }

              function a(e, t, r) {
                  t && !r.has(t.id) && (r.set(t.id, t), Object.keys(t).forEach(function(i) {
                      i.endsWith('Id') ? a(e, e.get(t[i]), r) : i.endsWith('Ids') && t[i].forEach(function(t) {
                          a(e, e.get(t), r);
                      });
                  }));
              }
          }, {}], 16: [function(e, t, r) {
              'use strict';
              var i = e('sdp');

              function o(e, t, r, o, n) {
                  var s = i.writeRtpDescription(e.kind, t);
                  if (s += i.writeIceParameters(e.iceGatherer.getLocalParameters()), s += i.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), 'offer' === r ? 'actpass' : n || 'active'), s += 'a=mid:' + e.mid + '\r\n', e.rtpSender && e.rtpReceiver ? s += 'a=sendrecv\r\n' : e.rtpSender ? s += 'a=sendonly\r\n' : e.rtpReceiver ? s += 'a=recvonly\r\n' : s += 'a=inactive\r\n', e.rtpSender) {
                      var a = e.rtpSender._initialTrackId || e.rtpSender.track.id;
                      e.rtpSender._initialTrackId = a;
                      var c = 'msid:' + (o ? o.id : '-') + ' ' + a + '\r\n';
                      s += 'a=' + c, s += 'a=ssrc:' + e.sendEncodingParameters[0].ssrc + ' ' + c, e.sendEncodingParameters[0].rtx && (s += 'a=ssrc:' + e.sendEncodingParameters[0].rtx.ssrc + ' ' + c, s += 'a=ssrc-group:FID ' + e.sendEncodingParameters[0].ssrc + ' ' + e.sendEncodingParameters[0].rtx.ssrc + '\r\n');
                  }
                  return s += 'a=ssrc:' + e.sendEncodingParameters[0].ssrc + ' cname:' + i.localCName + '\r\n', e.rtpSender && e.sendEncodingParameters[0].rtx && (s += 'a=ssrc:' + e.sendEncodingParameters[0].rtx.ssrc + ' cname:' + i.localCName + '\r\n'), s;
              }

              function n(e, t) {
                  var r = { codecs: [], headerExtensions: [], fecMechanisms: [] }, i = function(e, t) {
                      e = parseInt(e, 10);
                      for (var r = 0; r < t.length; r++) if (t[r].payloadType === e || t[r].preferredPayloadType === e) return t[r];
                  }, o = function(e, t, r, o) {
                      var n = i(e.parameters.apt, r), s = i(t.parameters.apt, o);
                      return n && s && n.name.toLowerCase() === s.name.toLowerCase();
                  };
                  return e.codecs.forEach(function(i) {
                      for (var n = 0; n < t.codecs.length; n++) {
                          var s = t.codecs[n];
                          if (i.name.toLowerCase() === s.name.toLowerCase() && i.clockRate === s.clockRate) {
                              if ('rtx' === i.name.toLowerCase() && i.parameters && s.parameters.apt && !o(i, s, e.codecs, t.codecs)) continue;
                              (s = JSON.parse(JSON.stringify(s))).numChannels = Math.min(i.numChannels, s.numChannels), r.codecs.push(s), s.rtcpFeedback = s.rtcpFeedback.filter(function(e) {
                                  for (var t = 0; t < i.rtcpFeedback.length; t++) if (i.rtcpFeedback[t].type === e.type && i.rtcpFeedback[t].parameter === e.parameter) return !0;
                                  return !1;
                              });
                              break;
                          }
                      }
                  }), e.headerExtensions.forEach(function(e) {
                      for (var i = 0; i < t.headerExtensions.length; i++) {
                          var o = t.headerExtensions[i];
                          if (e.uri === o.uri) {
                              r.headerExtensions.push(o);
                              break;
                          }
                      }
                  }), r;
              }

              function s(e, t, r) {
                  return -1 !== {
                      offer: {
                          setLocalDescription: ['stable', 'have-local-offer'],
                          setRemoteDescription: ['stable', 'have-remote-offer'],
                      },
                      answer: {
                          setLocalDescription: ['have-remote-offer', 'have-local-pranswer'],
                          setRemoteDescription: ['have-local-offer', 'have-remote-pranswer'],
                      },
                  }[t][e].indexOf(r);
              }

              function a(e, t) {
                  var r = e.getRemoteCandidates().find(function(e) {
                      return t.foundation === e.foundation && t.ip === e.ip && t.port === e.port && t.priority === e.priority && t.protocol === e.protocol && t.type === e.type;
                  });
                  return r || e.addRemoteCandidate(t), !r;
              }

              function c(e, t) {
                  var r = new Error(t);
                  return r.name = e, r.code = {
                      NotSupportedError: 9,
                      InvalidStateError: 11,
                      InvalidAccessError: 15,
                      TypeError: void 0,
                      OperationError: void 0,
                  }[e], r;
              }

              t.exports = function(e, t) {
                  function r(t, r) {
                      r.addTrack(t), r.dispatchEvent(new e.MediaStreamTrackEvent('addtrack', { track: t }));
                  }

                  function d(t, r, i, o) {
                      var n = new Event('track');
                      n.track = r, n.receiver = i, n.transceiver = { receiver: i }, n.streams = o, e.setTimeout(function() {
                          t._dispatchEvent('track', n);
                      });
                  }

                  var l = function(r) {
                      var o = this, n = document.createDocumentFragment();
                      if (['addEventListener', 'removeEventListener', 'dispatchEvent'].forEach(function(e) {
                          o[e] = n[e].bind(n);
                      }), this.canTrickleIceCandidates = null, this.needNegotiation = !1, this.localStreams = [], this.remoteStreams = [], this._localDescription = null, this._remoteDescription = null, this.signalingState = 'stable', this.iceConnectionState = 'new', this.connectionState = 'new', this.iceGatheringState = 'new', r = JSON.parse(JSON.stringify(r || {})), this.usingBundle = 'max-bundle' === r.bundlePolicy, 'negotiate' === r.rtcpMuxPolicy) throw c('NotSupportedError', 'rtcpMuxPolicy \'negotiate\' is not supported');
                      switch (r.rtcpMuxPolicy || (r.rtcpMuxPolicy = 'require'), r.iceTransportPolicy) {
                          case'all':
                          case'relay':
                              break;
                          default:
                              r.iceTransportPolicy = 'all';
                      }
                      switch (r.bundlePolicy) {
                          case'balanced':
                          case'max-compat':
                          case'max-bundle':
                              break;
                          default:
                              r.bundlePolicy = 'balanced';
                      }
                      if (r.iceServers = function(e, t) {
                          var r = !1;
                          return (e = JSON.parse(JSON.stringify(e))).filter(function(e) {
                              if (e && (e.urls || e.url)) {
                                  var i = e.urls || e.url;
                                  e.url && !e.urls && console.warn('RTCIceServer.url is deprecated! Use urls instead.');
                                  var o = 'string' == typeof i;
                                  return o && (i = [i]), i = i.filter(function(e) {
                                      return 0 !== e.indexOf('turn:') || -1 === e.indexOf('transport=udp') || -1 !== e.indexOf('turn:[') || r ? 0 === e.indexOf('stun:') && t >= 14393 && -1 === e.indexOf('?transport=udp') : (r = !0, !0);
                                  }), delete e.url, e.urls = o ? i[0] : i, !!i.length;
                              }
                          });
                      }(r.iceServers || [], t), this._iceGatherers = [], r.iceCandidatePoolSize) for (var s = r.iceCandidatePoolSize; s > 0; s--) this._iceGatherers.push(new e.RTCIceGatherer({
                          iceServers: r.iceServers,
                          gatherPolicy: r.iceTransportPolicy,
                      })); else r.iceCandidatePoolSize = 0;
                      this._config = r, this.transceivers = [], this._sdpSessionId = i.generateSessionId(), this._sdpSessionVersion = 0, this._dtlsRole = void 0, this._isClosed = !1;
                  };
                  Object.defineProperty(l.prototype, 'localDescription', {
                      configurable: !0, get: function() {
                          return this._localDescription;
                      },
                  }), Object.defineProperty(l.prototype, 'remoteDescription', {
                      configurable: !0, get: function() {
                          return this._remoteDescription;
                      },
                  }), l.prototype.onicecandidate = null, l.prototype.onaddstream = null, l.prototype.ontrack = null, l.prototype.onremovestream = null, l.prototype.onsignalingstatechange = null, l.prototype.oniceconnectionstatechange = null, l.prototype.onconnectionstatechange = null, l.prototype.onicegatheringstatechange = null, l.prototype.onnegotiationneeded = null, l.prototype.ondatachannel = null, l.prototype._dispatchEvent = function(e, t) {
                      this._isClosed || (this.dispatchEvent(t), 'function' == typeof this['on' + e] && this['on' + e](t));
                  }, l.prototype._emitGatheringStateChange = function() {
                      var e = new Event('icegatheringstatechange');
                      this._dispatchEvent('icegatheringstatechange', e);
                  }, l.prototype.getConfiguration = function() {
                      return this._config;
                  }, l.prototype.getLocalStreams = function() {
                      return this.localStreams;
                  }, l.prototype.getRemoteStreams = function() {
                      return this.remoteStreams;
                  }, l.prototype._createTransceiver = function(e, t) {
                      var r = this.transceivers.length > 0, i = {
                          track: null,
                          iceGatherer: null,
                          iceTransport: null,
                          dtlsTransport: null,
                          localCapabilities: null,
                          remoteCapabilities: null,
                          rtpSender: null,
                          rtpReceiver: null,
                          kind: e,
                          mid: null,
                          sendEncodingParameters: null,
                          recvEncodingParameters: null,
                          stream: null,
                          associatedRemoteMediaStreams: [],
                          wantReceive: !0,
                      };
                      if (this.usingBundle && r) i.iceTransport = this.transceivers[0].iceTransport, i.dtlsTransport = this.transceivers[0].dtlsTransport; else {
                          var o = this._createIceAndDtlsTransports();
                          i.iceTransport = o.iceTransport, i.dtlsTransport = o.dtlsTransport;
                      }
                      return t || this.transceivers.push(i), i;
                  }, l.prototype.addTrack = function(t, r) {
                      if (this._isClosed) throw c('InvalidStateError', 'Attempted to call addTrack on a closed peerconnection.');
                      var i, o = this.transceivers.find(function(e) {
                          return e.track === t;
                      });
                      if (o) throw c('InvalidAccessError', 'Track already exists.');
                      for (var n = 0; n < this.transceivers.length; n++) this.transceivers[n].track || this.transceivers[n].kind !== t.kind || (i = this.transceivers[n]);
                      return i || (i = this._createTransceiver(t.kind)), this._maybeFireNegotiationNeeded(), -1 === this.localStreams.indexOf(r) && this.localStreams.push(r), i.track = t, i.stream = r, i.rtpSender = new e.RTCRtpSender(t, i.dtlsTransport), i.rtpSender;
                  }, l.prototype.addStream = function(e) {
                      var r = this;
                      if (t >= 15025) e.getTracks().forEach(function(t) {
                          r.addTrack(t, e);
                      }); else {
                          var i = e.clone();
                          e.getTracks().forEach(function(e, t) {
                              var r = i.getTracks()[t];
                              e.addEventListener('enabled', function(e) {
                                  r.enabled = e.enabled;
                              });
                          }), i.getTracks().forEach(function(e) {
                              r.addTrack(e, i);
                          });
                      }
                  }, l.prototype.removeTrack = function(t) {
                      if (this._isClosed) throw c('InvalidStateError', 'Attempted to call removeTrack on a closed peerconnection.');
                      if (!(t instanceof e.RTCRtpSender)) throw new TypeError('Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.');
                      var r = this.transceivers.find(function(e) {
                          return e.rtpSender === t;
                      });
                      if (!r) throw c('InvalidAccessError', 'Sender was not created by this connection.');
                      var i = r.stream;
                      r.rtpSender.stop(), r.rtpSender = null, r.track = null, r.stream = null;
                      var o = this.transceivers.map(function(e) {
                          return e.stream;
                      });
                      -1 === o.indexOf(i) && this.localStreams.indexOf(i) > -1 && this.localStreams.splice(this.localStreams.indexOf(i), 1), this._maybeFireNegotiationNeeded();
                  }, l.prototype.removeStream = function(e) {
                      var t = this;
                      e.getTracks().forEach(function(e) {
                          var r = t.getSenders().find(function(t) {
                              return t.track === e;
                          });
                          r && t.removeTrack(r);
                      });
                  }, l.prototype.getSenders = function() {
                      return this.transceivers.filter(function(e) {
                          return !!e.rtpSender;
                      }).map(function(e) {
                          return e.rtpSender;
                      });
                  }, l.prototype.getReceivers = function() {
                      return this.transceivers.filter(function(e) {
                          return !!e.rtpReceiver;
                      }).map(function(e) {
                          return e.rtpReceiver;
                      });
                  }, l.prototype._createIceGatherer = function(t, r) {
                      var i = this;
                      if (r && t > 0) return this.transceivers[0].iceGatherer;
                      if (this._iceGatherers.length) return this._iceGatherers.shift();
                      var o = new e.RTCIceGatherer({
                          iceServers: this._config.iceServers,
                          gatherPolicy: this._config.iceTransportPolicy,
                      });
                      return Object.defineProperty(o, 'state', {
                          value: 'new',
                          writable: !0,
                      }), this.transceivers[t].bufferedCandidateEvents = [], this.transceivers[t].bufferCandidates = function(e) {
                          var r = !e.candidate || 0 === Object.keys(e.candidate).length;
                          o.state = r ? 'completed' : 'gathering', null !== i.transceivers[t].bufferedCandidateEvents && i.transceivers[t].bufferedCandidateEvents.push(e);
                      }, o.addEventListener('localcandidate', this.transceivers[t].bufferCandidates), o;
                  }, l.prototype._gather = function(t, r) {
                      var o = this, n = this.transceivers[r].iceGatherer;
                      if (!n.onlocalcandidate) {
                          var s = this.transceivers[r].bufferedCandidateEvents;
                          this.transceivers[r].bufferedCandidateEvents = null, n.removeEventListener('localcandidate', this.transceivers[r].bufferCandidates), n.onlocalcandidate = function(e) {
                              if (!(o.usingBundle && r > 0)) {
                                  var s = new Event('icecandidate');
                                  s.candidate = { sdpMid: t, sdpMLineIndex: r };
                                  var a = e.candidate, c = !a || 0 === Object.keys(a).length;
                                  if (c) 'new' !== n.state && 'gathering' !== n.state || (n.state = 'completed'); else {
                                      'new' === n.state && (n.state = 'gathering'), a.component = 1, a.ufrag = n.getLocalParameters().usernameFragment;
                                      var d = i.writeCandidate(a);
                                      s.candidate = Object.assign(s.candidate, i.parseCandidate(d)), s.candidate.candidate = d, s.candidate.toJSON = function() {
                                          return {
                                              candidate: s.candidate.candidate,
                                              sdpMid: s.candidate.sdpMid,
                                              sdpMLineIndex: s.candidate.sdpMLineIndex,
                                              usernameFragment: s.candidate.usernameFragment,
                                          };
                                      };
                                  }
                                  var l = i.getMediaSections(o._localDescription.sdp);
                                  l[s.candidate.sdpMLineIndex] += c ? 'a=end-of-candidates\r\n' : 'a=' + s.candidate.candidate + '\r\n', o._localDescription.sdp = i.getDescription(o._localDescription.sdp) + l.join('');
                                  var p = o.transceivers.every(function(e) {
                                      return e.iceGatherer && 'completed' === e.iceGatherer.state;
                                  });
                                  'gathering' !== o.iceGatheringState && (o.iceGatheringState = 'gathering', o._emitGatheringStateChange()), c || o._dispatchEvent('icecandidate', s), p && (o._dispatchEvent('icecandidate', new Event('icecandidate')), o.iceGatheringState = 'complete', o._emitGatheringStateChange());
                              }
                          }, e.setTimeout(function() {
                              s.forEach(function(e) {
                                  n.onlocalcandidate(e);
                              });
                          }, 0);
                      }
                  }, l.prototype._createIceAndDtlsTransports = function() {
                      var t = this, r = new e.RTCIceTransport(null);
                      r.onicestatechange = function() {
                          t._updateIceConnectionState(), t._updateConnectionState();
                      };
                      var i = new e.RTCDtlsTransport(r);
                      return i.ondtlsstatechange = function() {
                          t._updateConnectionState();
                      }, i.onerror = function() {
                          Object.defineProperty(i, 'state', {
                              value: 'failed',
                              writable: !0,
                          }), t._updateConnectionState();
                      }, { iceTransport: r, dtlsTransport: i };
                  }, l.prototype._disposeIceAndDtlsTransports = function(e) {
                      var t = this.transceivers[e].iceGatherer;
                      t && (delete t.onlocalcandidate, delete this.transceivers[e].iceGatherer);
                      var r = this.transceivers[e].iceTransport;
                      r && (delete r.onicestatechange, delete this.transceivers[e].iceTransport);
                      var i = this.transceivers[e].dtlsTransport;
                      i && (delete i.ondtlsstatechange, delete i.onerror, delete this.transceivers[e].dtlsTransport);
                  }, l.prototype._transceive = function(e, r, o) {
                      var s = n(e.localCapabilities, e.remoteCapabilities);
                      r && e.rtpSender && (s.encodings = e.sendEncodingParameters, s.rtcp = {
                          cname: i.localCName,
                          compound: e.rtcpParameters.compound,
                      }, e.recvEncodingParameters.length && (s.rtcp.ssrc = e.recvEncodingParameters[0].ssrc), e.rtpSender.send(s)), o && e.rtpReceiver && s.codecs.length > 0 && ('video' === e.kind && e.recvEncodingParameters && t < 15019 && e.recvEncodingParameters.forEach(function(e) {
                          delete e.rtx;
                      }), e.recvEncodingParameters.length ? s.encodings = e.recvEncodingParameters : s.encodings = [{}], s.rtcp = { compound: e.rtcpParameters.compound }, e.rtcpParameters.cname && (s.rtcp.cname = e.rtcpParameters.cname), e.sendEncodingParameters.length && (s.rtcp.ssrc = e.sendEncodingParameters[0].ssrc), e.rtpReceiver.receive(s));
                  }, l.prototype.setLocalDescription = function(e) {
                      var t, r, o = this;
                      if (-1 === ['offer', 'answer'].indexOf(e.type)) return Promise.reject(c('TypeError', 'Unsupported type "' + e.type + '"'));
                      if (!s('setLocalDescription', e.type, o.signalingState) || o._isClosed) return Promise.reject(c('InvalidStateError', 'Can not set local ' + e.type + ' in state ' + o.signalingState));
                      if ('offer' === e.type) t = i.splitSections(e.sdp), r = t.shift(), t.forEach(function(e, t) {
                          var r = i.parseRtpParameters(e);
                          o.transceivers[t].localCapabilities = r;
                      }), o.transceivers.forEach(function(e, t) {
                          o._gather(e.mid, t);
                      }); else if ('answer' === e.type) {
                          t = i.splitSections(o._remoteDescription.sdp), r = t.shift();
                          var a = i.matchPrefix(r, 'a=ice-lite').length > 0;
                          t.forEach(function(e, t) {
                              var s = o.transceivers[t], c = s.iceGatherer, d = s.iceTransport, l = s.dtlsTransport,
                                  p = s.localCapabilities, h = s.remoteCapabilities,
                                  u = i.isRejected(e) && 0 === i.matchPrefix(e, 'a=bundle-only').length;
                              if (!u && !s.rejected) {
                                  var f = i.getIceParameters(e, r), g = i.getDtlsParameters(e, r);
                                  a && (g.role = 'server'), o.usingBundle && 0 !== t || (o._gather(s.mid, t), 'new' === d.state && d.start(c, f, a ? 'controlling' : 'controlled'), 'new' === l.state && l.start(g));
                                  var m = n(p, h);
                                  o._transceive(s, m.codecs.length > 0, !1);
                              }
                          });
                      }
                      return o._localDescription = {
                          type: e.type,
                          sdp: e.sdp,
                      }, 'offer' === e.type ? o._updateSignalingState('have-local-offer') : o._updateSignalingState('stable'), Promise.resolve();
                  }, l.prototype.setRemoteDescription = function(o) {
                      var l = this;
                      if (-1 === ['offer', 'answer'].indexOf(o.type)) return Promise.reject(c('TypeError', 'Unsupported type "' + o.type + '"'));
                      if (!s('setRemoteDescription', o.type, l.signalingState) || l._isClosed) return Promise.reject(c('InvalidStateError', 'Can not set remote ' + o.type + ' in state ' + l.signalingState));
                      var p = {};
                      l.remoteStreams.forEach(function(e) {
                          p[e.id] = e;
                      });
                      var h = [], u = i.splitSections(o.sdp), f = u.shift(),
                          g = i.matchPrefix(f, 'a=ice-lite').length > 0,
                          m = i.matchPrefix(f, 'a=group:BUNDLE ').length > 0;
                      l.usingBundle = m;
                      var S = i.matchPrefix(f, 'a=ice-options:')[0];
                      return l.canTrickleIceCandidates = !!S && S.substr(14).split(' ').indexOf('trickle') >= 0, u.forEach(function(s, c) {
                          var d = i.splitLines(s), u = i.getKind(s),
                              S = i.isRejected(s) && 0 === i.matchPrefix(s, 'a=bundle-only').length,
                              v = d[0].substr(2).split(' ')[2], y = i.getDirection(s, f), C = i.parseMsid(s),
                              b = i.getMid(s) || i.generateIdentifier();
                          if (S || 'application' === u && ('DTLS/SCTP' === v || 'UDP/DTLS/SCTP' === v)) l.transceivers[c] = {
                              mid: b,
                              kind: u,
                              protocol: v,
                              rejected: !0,
                          }; else {
                              var T, E, R, _, P, L, M, w, U;
                              !S && l.transceivers[c] && l.transceivers[c].rejected && (l.transceivers[c] = l._createTransceiver(u, !0));
                              var O, N, D = i.parseRtpParameters(s);
                              S || (O = i.getIceParameters(s, f), (N = i.getDtlsParameters(s, f)).role = 'client'), M = i.parseRtpEncodingParameters(s);
                              var I = i.parseRtcpParameters(s),
                                  z = i.matchPrefix(s, 'a=end-of-candidates', f).length > 0,
                                  A = i.matchPrefix(s, 'a=candidate:').map(function(e) {
                                      return i.parseCandidate(e);
                                  }).filter(function(e) {
                                      return 1 === e.component;
                                  });
                              if (('offer' === o.type || 'answer' === o.type) && !S && m && c > 0 && l.transceivers[c] && (l._disposeIceAndDtlsTransports(c), l.transceivers[c].iceGatherer = l.transceivers[0].iceGatherer, l.transceivers[c].iceTransport = l.transceivers[0].iceTransport, l.transceivers[c].dtlsTransport = l.transceivers[0].dtlsTransport, l.transceivers[c].rtpSender && l.transceivers[c].rtpSender.setTransport(l.transceivers[0].dtlsTransport), l.transceivers[c].rtpReceiver && l.transceivers[c].rtpReceiver.setTransport(l.transceivers[0].dtlsTransport)), 'offer' !== o.type || S) {
                                  if ('answer' === o.type && !S) {
                                      T = l.transceivers[c], E = T.iceGatherer, R = T.iceTransport, _ = T.dtlsTransport, P = T.rtpReceiver, L = T.sendEncodingParameters, w = T.localCapabilities, l.transceivers[c].recvEncodingParameters = M, l.transceivers[c].remoteCapabilities = D, l.transceivers[c].rtcpParameters = I, A.length && 'new' === R.state && (!g && !z || m && 0 !== c ? A.forEach(function(e) {
                                          a(T.iceTransport, e);
                                      }) : R.setRemoteCandidates(A)), m && 0 !== c || ('new' === R.state && R.start(E, O, 'controlling'), 'new' === _.state && _.start(N));
                                      var k = n(T.localCapabilities, T.remoteCapabilities),
                                          x = k.codecs.filter(function(e) {
                                              return 'rtx' === e.name.toLowerCase();
                                          }).length;
                                      !x && T.sendEncodingParameters[0].rtx && delete T.sendEncodingParameters[0].rtx, l._transceive(T, 'sendrecv' === y || 'recvonly' === y, 'sendrecv' === y || 'sendonly' === y), !P || 'sendrecv' !== y && 'sendonly' !== y ? delete T.rtpReceiver : (U = P.track, C ? (p[C.stream] || (p[C.stream] = new e.MediaStream), r(U, p[C.stream]), h.push([U, P, p[C.stream]])) : (p.default || (p.default = new e.MediaStream), r(U, p.default), h.push([U, P, p.default])));
                                  }
                              } else {
                                  (T = l.transceivers[c] || l._createTransceiver(u)).mid = b, T.iceGatherer || (T.iceGatherer = l._createIceGatherer(c, m)), A.length && 'new' === T.iceTransport.state && (!z || m && 0 !== c ? A.forEach(function(e) {
                                      a(T.iceTransport, e);
                                  }) : T.iceTransport.setRemoteCandidates(A)), w = e.RTCRtpReceiver.getCapabilities(u), t < 15019 && (w.codecs = w.codecs.filter(function(e) {
                                      return 'rtx' !== e.name;
                                  })), L = T.sendEncodingParameters || [{ ssrc: 1001 * (2 * c + 2) }];
                                  var H, q = !1;
                                  'sendrecv' === y || 'sendonly' === y ? (q = !T.rtpReceiver, P = T.rtpReceiver || new e.RTCRtpReceiver(T.dtlsTransport, u), q && (U = P.track, C && '-' === C.stream || (C ? (p[C.stream] || (p[C.stream] = new e.MediaStream, Object.defineProperty(p[C.stream], 'id', {
                                      get: function() {
                                          return C.stream;
                                      },
                                  })), Object.defineProperty(U, 'id', {
                                      get: function() {
                                          return C.track;
                                      },
                                  }), H = p[C.stream]) : (p.default || (p.default = new e.MediaStream), H = p.default)), H && (r(U, H), T.associatedRemoteMediaStreams.push(H)), h.push([U, P, H]))) : T.rtpReceiver && T.rtpReceiver.track && (T.associatedRemoteMediaStreams.forEach(function(t) {
                                      var r, i, o = t.getTracks().find(function(e) {
                                          return e.id === T.rtpReceiver.track.id;
                                      });
                                      o && (r = o, (i = t).removeTrack(r), i.dispatchEvent(new e.MediaStreamTrackEvent('removetrack', { track: r })));
                                  }), T.associatedRemoteMediaStreams = []), T.localCapabilities = w, T.remoteCapabilities = D, T.rtpReceiver = P, T.rtcpParameters = I, T.sendEncodingParameters = L, T.recvEncodingParameters = M, l._transceive(l.transceivers[c], !1, q);
                              }
                          }
                      }), void 0 === l._dtlsRole && (l._dtlsRole = 'offer' === o.type ? 'active' : 'passive'), l._remoteDescription = {
                          type: o.type,
                          sdp: o.sdp,
                      }, 'offer' === o.type ? l._updateSignalingState('have-remote-offer') : l._updateSignalingState('stable'), Object.keys(p).forEach(function(t) {
                          var r = p[t];
                          if (r.getTracks().length) {
                              if (-1 === l.remoteStreams.indexOf(r)) {
                                  l.remoteStreams.push(r);
                                  var i = new Event('addstream');
                                  i.stream = r, e.setTimeout(function() {
                                      l._dispatchEvent('addstream', i);
                                  });
                              }
                              h.forEach(function(e) {
                                  var t = e[0], i = e[1];
                                  r.id === e[2].id && d(l, t, i, [r]);
                              });
                          }
                      }), h.forEach(function(e) {
                          e[2] || d(l, e[0], e[1], []);
                      }), e.setTimeout(function() {
                          l && l.transceivers && l.transceivers.forEach(function(e) {
                              e.iceTransport && 'new' === e.iceTransport.state && e.iceTransport.getRemoteCandidates().length > 0 && (console.warn('Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification'), e.iceTransport.addRemoteCandidate({}));
                          });
                      }, 4e3), Promise.resolve();
                  }, l.prototype.close = function() {
                      this.transceivers.forEach(function(e) {
                          e.iceTransport && e.iceTransport.stop(), e.dtlsTransport && e.dtlsTransport.stop(), e.rtpSender && e.rtpSender.stop(), e.rtpReceiver && e.rtpReceiver.stop();
                      }), this._isClosed = !0, this._updateSignalingState('closed');
                  }, l.prototype._updateSignalingState = function(e) {
                      this.signalingState = e;
                      var t = new Event('signalingstatechange');
                      this._dispatchEvent('signalingstatechange', t);
                  }, l.prototype._maybeFireNegotiationNeeded = function() {
                      var t = this;
                      'stable' === this.signalingState && !0 !== this.needNegotiation && (this.needNegotiation = !0, e.setTimeout(function() {
                          if (t.needNegotiation) {
                              t.needNegotiation = !1;
                              var e = new Event('negotiationneeded');
                              t._dispatchEvent('negotiationneeded', e);
                          }
                      }, 0));
                  }, l.prototype._updateIceConnectionState = function() {
                      var e, t = {
                          new: 0,
                          closed: 0,
                          checking: 0,
                          connected: 0,
                          completed: 0,
                          disconnected: 0,
                          failed: 0,
                      };
                      if (this.transceivers.forEach(function(e) {
                          e.iceTransport && !e.rejected && t[e.iceTransport.state]++;
                      }), e = 'new', t.failed > 0 ? e = 'failed' : t.checking > 0 ? e = 'checking' : t.disconnected > 0 ? e = 'disconnected' : t.new > 0 ? e = 'new' : t.connected > 0 ? e = 'connected' : t.completed > 0 && (e = 'completed'), e !== this.iceConnectionState) {
                          this.iceConnectionState = e;
                          var r = new Event('iceconnectionstatechange');
                          this._dispatchEvent('iceconnectionstatechange', r);
                      }
                  }, l.prototype._updateConnectionState = function() {
                      var e, t = {
                          new: 0,
                          closed: 0,
                          connecting: 0,
                          connected: 0,
                          completed: 0,
                          disconnected: 0,
                          failed: 0,
                      };
                      if (this.transceivers.forEach(function(e) {
                          e.iceTransport && e.dtlsTransport && !e.rejected && (t[e.iceTransport.state]++, t[e.dtlsTransport.state]++);
                      }), t.connected += t.completed, e = 'new', t.failed > 0 ? e = 'failed' : t.connecting > 0 ? e = 'connecting' : t.disconnected > 0 ? e = 'disconnected' : t.new > 0 ? e = 'new' : t.connected > 0 && (e = 'connected'), e !== this.connectionState) {
                          this.connectionState = e;
                          var r = new Event('connectionstatechange');
                          this._dispatchEvent('connectionstatechange', r);
                      }
                  }, l.prototype.createOffer = function() {
                      var r = this;
                      if (r._isClosed) return Promise.reject(c('InvalidStateError', 'Can not call createOffer after close'));
                      var n = r.transceivers.filter(function(e) {
                          return 'audio' === e.kind;
                      }).length, s = r.transceivers.filter(function(e) {
                          return 'video' === e.kind;
                      }).length, a = arguments[0];
                      if (a) {
                          if (a.mandatory || a.optional) throw new TypeError('Legacy mandatory/optional constraints not supported.');
                          void 0 !== a.offerToReceiveAudio && (n = !0 === a.offerToReceiveAudio ? 1 : !1 === a.offerToReceiveAudio ? 0 : a.offerToReceiveAudio), void 0 !== a.offerToReceiveVideo && (s = !0 === a.offerToReceiveVideo ? 1 : !1 === a.offerToReceiveVideo ? 0 : a.offerToReceiveVideo);
                      }
                      for (r.transceivers.forEach(function(e) {
                          'audio' === e.kind ? --n < 0 && (e.wantReceive = !1) : 'video' === e.kind && --s < 0 && (e.wantReceive = !1);
                      }); n > 0 || s > 0;) n > 0 && (r._createTransceiver('audio'), n--), s > 0 && (r._createTransceiver('video'), s--);
                      var d = i.writeSessionBoilerplate(r._sdpSessionId, r._sdpSessionVersion++);
                      r.transceivers.forEach(function(o, n) {
                          var s = o.track, a = o.kind, c = o.mid || i.generateIdentifier();
                          o.mid = c, o.iceGatherer || (o.iceGatherer = r._createIceGatherer(n, r.usingBundle));
                          var d = e.RTCRtpSender.getCapabilities(a);
                          t < 15019 && (d.codecs = d.codecs.filter(function(e) {
                              return 'rtx' !== e.name;
                          })), d.codecs.forEach(function(e) {
                              'H264' === e.name && void 0 === e.parameters['level-asymmetry-allowed'] && (e.parameters['level-asymmetry-allowed'] = '1'), o.remoteCapabilities && o.remoteCapabilities.codecs && o.remoteCapabilities.codecs.forEach(function(t) {
                                  e.name.toLowerCase() === t.name.toLowerCase() && e.clockRate === t.clockRate && (e.preferredPayloadType = t.payloadType);
                              });
                          }), d.headerExtensions.forEach(function(e) {
                              var t = o.remoteCapabilities && o.remoteCapabilities.headerExtensions || [];
                              t.forEach(function(t) {
                                  e.uri === t.uri && (e.id = t.id);
                              });
                          });
                          var l = o.sendEncodingParameters || [{ ssrc: 1001 * (2 * n + 1) }];
                          s && t >= 15019 && 'video' === a && !l[0].rtx && (l[0].rtx = { ssrc: l[0].ssrc + 1 }), o.wantReceive && (o.rtpReceiver = new e.RTCRtpReceiver(o.dtlsTransport, a)), o.localCapabilities = d, o.sendEncodingParameters = l;
                      }), 'max-compat' !== r._config.bundlePolicy && (d += 'a=group:BUNDLE ' + r.transceivers.map(function(e) {
                          return e.mid;
                      }).join(' ') + '\r\n'), d += 'a=ice-options:trickle\r\n', r.transceivers.forEach(function(e, t) {
                          d += o(e, e.localCapabilities, 'offer', e.stream, r._dtlsRole), d += 'a=rtcp-rsize\r\n', !e.iceGatherer || 'new' === r.iceGatheringState || 0 !== t && r.usingBundle || (e.iceGatherer.getLocalCandidates().forEach(function(e) {
                              e.component = 1, d += 'a=' + i.writeCandidate(e) + '\r\n';
                          }), 'completed' === e.iceGatherer.state && (d += 'a=end-of-candidates\r\n'));
                      });
                      var l = new e.RTCSessionDescription({ type: 'offer', sdp: d });
                      return Promise.resolve(l);
                  }, l.prototype.createAnswer = function() {
                      var r = this;
                      if (r._isClosed) return Promise.reject(c('InvalidStateError', 'Can not call createAnswer after close'));
                      if ('have-remote-offer' !== r.signalingState && 'have-local-pranswer' !== r.signalingState) return Promise.reject(c('InvalidStateError', 'Can not call createAnswer in signalingState ' + r.signalingState));
                      var s = i.writeSessionBoilerplate(r._sdpSessionId, r._sdpSessionVersion++);
                      r.usingBundle && (s += 'a=group:BUNDLE ' + r.transceivers.map(function(e) {
                          return e.mid;
                      }).join(' ') + '\r\n'), s += 'a=ice-options:trickle\r\n';
                      var a = i.getMediaSections(r._remoteDescription.sdp).length;
                      r.transceivers.forEach(function(e, i) {
                          if (!(i + 1 > a)) {
                              if (e.rejected) return 'application' === e.kind ? 'DTLS/SCTP' === e.protocol ? s += 'm=application 0 DTLS/SCTP 5000\r\n' : s += 'm=application 0 ' + e.protocol + ' webrtc-datachannel\r\n' : 'audio' === e.kind ? s += 'm=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n' : 'video' === e.kind && (s += 'm=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n'), void (s += 'c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:' + e.mid + '\r\n');
                              var c;
                              e.stream && ('audio' === e.kind ? c = e.stream.getAudioTracks()[0] : 'video' === e.kind && (c = e.stream.getVideoTracks()[0]), c && t >= 15019 && 'video' === e.kind && !e.sendEncodingParameters[0].rtx && (e.sendEncodingParameters[0].rtx = { ssrc: e.sendEncodingParameters[0].ssrc + 1 }));
                              var d = n(e.localCapabilities, e.remoteCapabilities), l = d.codecs.filter(function(e) {
                                  return 'rtx' === e.name.toLowerCase();
                              }).length;
                              !l && e.sendEncodingParameters[0].rtx && delete e.sendEncodingParameters[0].rtx, s += o(e, d, 'answer', e.stream, r._dtlsRole), e.rtcpParameters && e.rtcpParameters.reducedSize && (s += 'a=rtcp-rsize\r\n');
                          }
                      });
                      var d = new e.RTCSessionDescription({ type: 'answer', sdp: s });
                      return Promise.resolve(d);
                  }, l.prototype.addIceCandidate = function(e) {
                      var t, r = this;
                      return e && void 0 === e.sdpMLineIndex && !e.sdpMid ? Promise.reject(new TypeError('sdpMLineIndex or sdpMid required')) : new Promise(function(o, n) {
                          if (!r._remoteDescription) return n(c('InvalidStateError', 'Can not add ICE candidate without a remote description'));
                          if (e && '' !== e.candidate) {
                              var s = e.sdpMLineIndex;
                              if (e.sdpMid) for (var d = 0; d < r.transceivers.length; d++) if (r.transceivers[d].mid === e.sdpMid) {
                                  s = d;
                                  break;
                              }
                              var l = r.transceivers[s];
                              if (!l) return n(c('OperationError', 'Can not add ICE candidate'));
                              if (l.rejected) return o();
                              var p = Object.keys(e.candidate).length > 0 ? i.parseCandidate(e.candidate) : {};
                              if ('tcp' === p.protocol && (0 === p.port || 9 === p.port)) return o();
                              if (p.component && 1 !== p.component) return o();
                              if ((0 === s || s > 0 && l.iceTransport !== r.transceivers[0].iceTransport) && !a(l.iceTransport, p)) return n(c('OperationError', 'Can not add ICE candidate'));
                              var h = e.candidate.trim();
                              0 === h.indexOf('a=') && (h = h.substr(2)), (t = i.getMediaSections(r._remoteDescription.sdp))[s] += 'a=' + (p.type ? h : 'end-of-candidates') + '\r\n', r._remoteDescription.sdp = i.getDescription(r._remoteDescription.sdp) + t.join('');
                          } else for (var u = 0; u < r.transceivers.length && (r.transceivers[u].rejected || (r.transceivers[u].iceTransport.addRemoteCandidate({}), (t = i.getMediaSections(r._remoteDescription.sdp))[u] += "a=end-of-candidates\r\n", r._remoteDescription.sdp = i.getDescription(r._remoteDescription.sdp) + t.join(""), !r.usingBundle)); u++) ;
                          o();
                      });
                  }, l.prototype.getStats = function(t) {
                      if (t && t instanceof e.MediaStreamTrack) {
                          var r = null;
                          if (this.transceivers.forEach(function(e) {
                              e.rtpSender && e.rtpSender.track === t ? r = e.rtpSender : e.rtpReceiver && e.rtpReceiver.track === t && (r = e.rtpReceiver);
                          }), !r) throw c('InvalidAccessError', 'Invalid selector.');
                          return r.getStats();
                      }
                      var i = [];
                      return this.transceivers.forEach(function(e) {
                          ['rtpSender', 'rtpReceiver', 'iceGatherer', 'iceTransport', 'dtlsTransport'].forEach(function(t) {
                              e[t] && i.push(e[t].getStats());
                          });
                      }), Promise.all(i).then(function(e) {
                          var t = new Map;
                          return e.forEach(function(e) {
                              e.forEach(function(e) {
                                  t.set(e.id, e);
                              });
                          }), t;
                      });
                  }, ['RTCRtpSender', 'RTCRtpReceiver', 'RTCIceGatherer', 'RTCIceTransport', 'RTCDtlsTransport'].forEach(function(t) {
                      var r = e[t];
                      if (r && r.prototype && r.prototype.getStats) {
                          var i = r.prototype.getStats;
                          r.prototype.getStats = function() {
                              return i.apply(this).then(function(e) {
                                  var t = new Map;
                                  return Object.keys(e).forEach(function(r) {
                                      var i;
                                      e[r].type = {
                                          inboundrtp: 'inbound-rtp',
                                          outboundrtp: 'outbound-rtp',
                                          candidatepair: 'candidate-pair',
                                          localcandidate: 'local-candidate',
                                          remotecandidate: 'remote-candidate',
                                      }[(i = e[r]).type] || i.type, t.set(r, e[r]);
                                  }), t;
                              });
                          };
                      }
                  });
                  var p = ['createOffer', 'createAnswer'];
                  return p.forEach(function(e) {
                      var t = l.prototype[e];
                      l.prototype[e] = function() {
                          var e = arguments;
                          return 'function' == typeof e[0] || 'function' == typeof e[1] ? t.apply(this, [arguments[2]]).then(function(t) {
                              'function' == typeof e[0] && e[0].apply(null, [t]);
                          }, function(t) {
                              'function' == typeof e[1] && e[1].apply(null, [t]);
                          }) : t.apply(this, arguments);
                      };
                  }), (p = ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']).forEach(function(e) {
                      var t = l.prototype[e];
                      l.prototype[e] = function() {
                          var e = arguments;
                          return 'function' == typeof e[1] || 'function' == typeof e[2] ? t.apply(this, arguments).then(function() {
                              'function' == typeof e[1] && e[1].apply(null);
                          }, function(t) {
                              'function' == typeof e[2] && e[2].apply(null, [t]);
                          }) : t.apply(this, arguments);
                      };
                  }), ['getStats'].forEach(function(e) {
                      var t = l.prototype[e];
                      l.prototype[e] = function() {
                          var e = arguments;
                          return 'function' == typeof e[1] ? t.apply(this, arguments).then(function() {
                              'function' == typeof e[1] && e[1].apply(null);
                          }) : t.apply(this, arguments);
                      };
                  }), l;
              };
          }, { sdp: 17 }], 17: [function(e, t, r) {
              'use strict';
              var i = {
                  generateIdentifier: function() {
                      return Math.random().toString(36).substr(2, 10);
                  },
              };
              i.localCName = i.generateIdentifier(), i.splitLines = function(e) {
                  return e.trim().split('\n').map(function(e) {
                      return e.trim();
                  });
              }, i.splitSections = function(e) {
                  var t = e.split('\nm=');
                  return t.map(function(e, t) {
                      return (t > 0 ? 'm=' + e : e).trim() + '\r\n';
                  });
              }, i.getDescription = function(e) {
                  var t = i.splitSections(e);
                  return t && t[0];
              }, i.getMediaSections = function(e) {
                  var t = i.splitSections(e);
                  return t.shift(), t;
              }, i.matchPrefix = function(e, t) {
                  return i.splitLines(e).filter(function(e) {
                      return 0 === e.indexOf(t);
                  });
              }, i.parseCandidate = function(e) {
                  for (var t, r = {
                      foundation: (t = 0 === e.indexOf('a=candidate:') ? e.substring(12).split(' ') : e.substring(10).split(' '))[0],
                      component: parseInt(t[1], 10),
                      protocol: t[2].toLowerCase(),
                      priority: parseInt(t[3], 10),
                      ip: t[4],
                      address: t[4],
                      port: parseInt(t[5], 10),
                      type: t[7],
                  }, i = 8; i < t.length; i += 2) switch (t[i]) {
                      case'raddr':
                          r.relatedAddress = t[i + 1];
                          break;
                      case'rport':
                          r.relatedPort = parseInt(t[i + 1], 10);
                          break;
                      case'tcptype':
                          r.tcpType = t[i + 1];
                          break;
                      case'ufrag':
                          r.ufrag = t[i + 1], r.usernameFragment = t[i + 1];
                          break;
                      default:
                          r[t[i]] = t[i + 1];
                  }
                  return r;
              }, i.writeCandidate = function(e) {
                  var t = [];
                  t.push(e.foundation), t.push(e.component), t.push(e.protocol.toUpperCase()), t.push(e.priority), t.push(e.address || e.ip), t.push(e.port);
                  var r = e.type;
                  return t.push('typ'), t.push(r), 'host' !== r && e.relatedAddress && e.relatedPort && (t.push('raddr'), t.push(e.relatedAddress), t.push('rport'), t.push(e.relatedPort)), e.tcpType && 'tcp' === e.protocol.toLowerCase() && (t.push('tcptype'), t.push(e.tcpType)), (e.usernameFragment || e.ufrag) && (t.push('ufrag'), t.push(e.usernameFragment || e.ufrag)), 'candidate:' + t.join(' ');
              }, i.parseIceOptions = function(e) {
                  return e.substr(14).split(' ');
              }, i.parseRtpMap = function(e) {
                  var t = e.substr(9).split(' '), r = { payloadType: parseInt(t.shift(), 10) };
                  return t = t[0].split('/'), r.name = t[0], r.clockRate = parseInt(t[1], 10), r.channels = 3 === t.length ? parseInt(t[2], 10) : 1, r.numChannels = r.channels, r;
              }, i.writeRtpMap = function(e) {
                  var t = e.payloadType;
                  void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType);
                  var r = e.channels || e.numChannels || 1;
                  return 'a=rtpmap:' + t + ' ' + e.name + '/' + e.clockRate + (1 !== r ? '/' + r : '') + '\r\n';
              }, i.parseExtmap = function(e) {
                  var t = e.substr(9).split(' ');
                  return {
                      id: parseInt(t[0], 10),
                      direction: t[0].indexOf('/') > 0 ? t[0].split('/')[1] : 'sendrecv',
                      uri: t[1],
                  };
              }, i.writeExtmap = function(e) {
                  return 'a=extmap:' + (e.id || e.preferredId) + (e.direction && 'sendrecv' !== e.direction ? '/' + e.direction : '') + ' ' + e.uri + '\r\n';
              }, i.parseFmtp = function(e) {
                  for (var t, r = {}, i = e.substr(e.indexOf(' ') + 1).split(';'), o = 0; o < i.length; o++) t = i[o].trim().split('='), r[t[0].trim()] = t[1];
                  return r;
              }, i.writeFmtp = function(e) {
                  var t = '', r = e.payloadType;
                  if (void 0 !== e.preferredPayloadType && (r = e.preferredPayloadType), e.parameters && Object.keys(e.parameters).length) {
                      var i = [];
                      Object.keys(e.parameters).forEach(function(t) {
                          e.parameters[t] ? i.push(t + '=' + e.parameters[t]) : i.push(t);
                      }), t += 'a=fmtp:' + r + ' ' + i.join(';') + '\r\n';
                  }
                  return t;
              }, i.parseRtcpFb = function(e) {
                  var t = e.substr(e.indexOf(' ') + 1).split(' ');
                  return { type: t.shift(), parameter: t.join(' ') };
              }, i.writeRtcpFb = function(e) {
                  var t = '', r = e.payloadType;
                  return void 0 !== e.preferredPayloadType && (r = e.preferredPayloadType), e.rtcpFeedback && e.rtcpFeedback.length && e.rtcpFeedback.forEach(function(e) {
                      t += 'a=rtcp-fb:' + r + ' ' + e.type + (e.parameter && e.parameter.length ? ' ' + e.parameter : '') + '\r\n';
                  }), t;
              }, i.parseSsrcMedia = function(e) {
                  var t = e.indexOf(' '), r = { ssrc: parseInt(e.substr(7, t - 7), 10) }, i = e.indexOf(':', t);
                  return i > -1 ? (r.attribute = e.substr(t + 1, i - t - 1), r.value = e.substr(i + 1)) : r.attribute = e.substr(t + 1), r;
              }, i.parseSsrcGroup = function(e) {
                  var t = e.substr(13).split(' ');
                  return {
                      semantics: t.shift(), ssrcs: t.map(function(e) {
                          return parseInt(e, 10);
                      }),
                  };
              }, i.getMid = function(e) {
                  var t = i.matchPrefix(e, 'a=mid:')[0];
                  if (t) return t.substr(6);
              }, i.parseFingerprint = function(e) {
                  var t = e.substr(14).split(' ');
                  return { algorithm: t[0].toLowerCase(), value: t[1] };
              }, i.getDtlsParameters = function(e, t) {
                  var r = i.matchPrefix(e + t, 'a=fingerprint:');
                  return { role: 'auto', fingerprints: r.map(i.parseFingerprint) };
              }, i.writeDtlsParameters = function(e, t) {
                  var r = 'a=setup:' + t + '\r\n';
                  return e.fingerprints.forEach(function(e) {
                      r += 'a=fingerprint:' + e.algorithm + ' ' + e.value + '\r\n';
                  }), r;
              }, i.getIceParameters = function(e, t) {
                  var r = i.splitLines(e), o = {
                      usernameFragment: (r = r.concat(i.splitLines(t))).filter(function(e) {
                          return 0 === e.indexOf('a=ice-ufrag:');
                      })[0].substr(12), password: r.filter(function(e) {
                          return 0 === e.indexOf('a=ice-pwd:');
                      })[0].substr(10),
                  };
                  return o;
              }, i.writeIceParameters = function(e) {
                  return 'a=ice-ufrag:' + e.usernameFragment + '\r\na=ice-pwd:' + e.password + '\r\n';
              }, i.parseRtpParameters = function(e) {
                  for (var t = {
                      codecs: [],
                      headerExtensions: [],
                      fecMechanisms: [],
                      rtcp: [],
                  }, r = i.splitLines(e), o = r[0].split(' '), n = 3; n < o.length; n++) {
                      var s = o[n], a = i.matchPrefix(e, 'a=rtpmap:' + s + ' ')[0];
                      if (a) {
                          var c = i.parseRtpMap(a), d = i.matchPrefix(e, 'a=fmtp:' + s + ' ');
                          switch (c.parameters = d.length ? i.parseFmtp(d[0]) : {}, c.rtcpFeedback = i.matchPrefix(e, 'a=rtcp-fb:' + s + ' ').map(i.parseRtcpFb), t.codecs.push(c), c.name.toUpperCase()) {
                              case'RED':
                              case'ULPFEC':
                                  t.fecMechanisms.push(c.name.toUpperCase());
                          }
                      }
                  }
                  return i.matchPrefix(e, 'a=extmap:').forEach(function(e) {
                      t.headerExtensions.push(i.parseExtmap(e));
                  }), t;
              }, i.writeRtpDescription = function(e, t) {
                  var r = '';
                  r += 'm=' + e + ' ', r += t.codecs.length > 0 ? '9' : '0', r += ' UDP/TLS/RTP/SAVPF ', r += t.codecs.map(function(e) {
                      return void 0 !== e.preferredPayloadType ? e.preferredPayloadType : e.payloadType;
                  }).join(' ') + '\r\n', r += 'c=IN IP4 0.0.0.0\r\n', r += 'a=rtcp:9 IN IP4 0.0.0.0\r\n', t.codecs.forEach(function(e) {
                      r += i.writeRtpMap(e), r += i.writeFmtp(e), r += i.writeRtcpFb(e);
                  });
                  var o = 0;
                  return t.codecs.forEach(function(e) {
                      e.maxptime > o && (o = e.maxptime);
                  }), o > 0 && (r += 'a=maxptime:' + o + '\r\n'), r += 'a=rtcp-mux\r\n', t.headerExtensions && t.headerExtensions.forEach(function(e) {
                      r += i.writeExtmap(e);
                  }), r;
              }, i.parseRtpEncodingParameters = function(e) {
                  var t, r = [], o = i.parseRtpParameters(e), n = -1 !== o.fecMechanisms.indexOf('RED'),
                      s = -1 !== o.fecMechanisms.indexOf('ULPFEC'), a = i.matchPrefix(e, 'a=ssrc:').map(function(e) {
                          return i.parseSsrcMedia(e);
                      }).filter(function(e) {
                          return 'cname' === e.attribute;
                      }), c = a.length > 0 && a[0].ssrc, d = i.matchPrefix(e, 'a=ssrc-group:FID').map(function(e) {
                          var t = e.substr(17).split(' ');
                          return t.map(function(e) {
                              return parseInt(e, 10);
                          });
                      });
                  d.length > 0 && d[0].length > 1 && d[0][0] === c && (t = d[0][1]), o.codecs.forEach(function(e) {
                      if ('RTX' === e.name.toUpperCase() && e.parameters.apt) {
                          var i = { ssrc: c, codecPayloadType: parseInt(e.parameters.apt, 10) };
                          c && t && (i.rtx = { ssrc: t }), r.push(i), n && ((i = JSON.parse(JSON.stringify(i))).fec = {
                              ssrc: c,
                              mechanism: s ? 'red+ulpfec' : 'red',
                          }, r.push(i));
                      }
                  }), 0 === r.length && c && r.push({ ssrc: c });
                  var l = i.matchPrefix(e, 'b=');
                  return l.length && (l = 0 === l[0].indexOf('b=TIAS:') ? parseInt(l[0].substr(7), 10) : 0 === l[0].indexOf('b=AS:') ? 1e3 * parseInt(l[0].substr(5), 10) * .95 - 16e3 : void 0, r.forEach(function(e) {
                      e.maxBitrate = l;
                  })), r;
              }, i.parseRtcpParameters = function(e) {
                  var t = {}, r = i.matchPrefix(e, 'a=ssrc:').map(function(e) {
                      return i.parseSsrcMedia(e);
                  }).filter(function(e) {
                      return 'cname' === e.attribute;
                  })[0];
                  r && (t.cname = r.value, t.ssrc = r.ssrc);
                  var o = i.matchPrefix(e, 'a=rtcp-rsize');
                  t.reducedSize = o.length > 0, t.compound = 0 === o.length;
                  var n = i.matchPrefix(e, 'a=rtcp-mux');
                  return t.mux = n.length > 0, t;
              }, i.parseMsid = function(e) {
                  var t, r = i.matchPrefix(e, 'a=msid:');
                  if (1 === r.length) return { stream: (t = r[0].substr(7).split(' '))[0], track: t[1] };
                  var o = i.matchPrefix(e, 'a=ssrc:').map(function(e) {
                      return i.parseSsrcMedia(e);
                  }).filter(function(e) {
                      return 'msid' === e.attribute;
                  });
                  return o.length > 0 ? { stream: (t = o[0].value.split(' '))[0], track: t[1] } : void 0;
              }, i.generateSessionId = function() {
                  return Math.random().toString().substr(2, 21);
              }, i.writeSessionBoilerplate = function(e, t, r) {
                  var o, n = void 0 !== t ? t : 2;
                  o = e || i.generateSessionId();
                  var s = r || 'thisisadapterortc';
                  return 'v=0\r\no=' + s + ' ' + o + ' ' + n + ' IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n';
              }, i.writeMediaSection = function(e, t, r, o) {
                  var n = i.writeRtpDescription(e.kind, t);
                  if (n += i.writeIceParameters(e.iceGatherer.getLocalParameters()), n += i.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), 'offer' === r ? 'actpass' : 'active'), n += 'a=mid:' + e.mid + '\r\n', e.direction ? n += 'a=' + e.direction + '\r\n' : e.rtpSender && e.rtpReceiver ? n += 'a=sendrecv\r\n' : e.rtpSender ? n += 'a=sendonly\r\n' : e.rtpReceiver ? n += 'a=recvonly\r\n' : n += 'a=inactive\r\n', e.rtpSender) {
                      var s = 'msid:' + o.id + ' ' + e.rtpSender.track.id + '\r\n';
                      n += 'a=' + s, n += 'a=ssrc:' + e.sendEncodingParameters[0].ssrc + ' ' + s, e.sendEncodingParameters[0].rtx && (n += 'a=ssrc:' + e.sendEncodingParameters[0].rtx.ssrc + ' ' + s, n += 'a=ssrc-group:FID ' + e.sendEncodingParameters[0].ssrc + ' ' + e.sendEncodingParameters[0].rtx.ssrc + '\r\n');
                  }
                  return n += 'a=ssrc:' + e.sendEncodingParameters[0].ssrc + ' cname:' + i.localCName + '\r\n', e.rtpSender && e.sendEncodingParameters[0].rtx && (n += 'a=ssrc:' + e.sendEncodingParameters[0].rtx.ssrc + ' cname:' + i.localCName + '\r\n'), n;
              }, i.getDirection = function(e, t) {
                  for (var r = i.splitLines(e), o = 0; o < r.length; o++) switch (r[o]) {
                      case'a=sendrecv':
                      case'a=sendonly':
                      case'a=recvonly':
                      case'a=inactive':
                          return r[o].substr(2);
                  }
                  return t ? i.getDirection(t) : 'sendrecv';
              }, i.getKind = function(e) {
                  var t = i.splitLines(e), r = t[0].split(' ');
                  return r[0].substr(2);
              }, i.isRejected = function(e) {
                  return '0' === e.split(' ', 2)[1];
              }, i.parseMLine = function(e) {
                  var t = i.splitLines(e), r = t[0].substr(2).split(' ');
                  return { kind: r[0], port: parseInt(r[1], 10), protocol: r[2], fmt: r.slice(3).join(' ') };
              }, i.parseOLine = function(e) {
                  var t = i.matchPrefix(e, 'o=')[0], r = t.substr(2).split(' ');
                  return {
                      username: r[0],
                      sessionId: r[1],
                      sessionVersion: parseInt(r[2], 10),
                      netType: r[3],
                      addressType: r[4],
                      address: r[5],
                  };
              }, i.isValidSDP = function(e) {
                  if ('string' != typeof e || 0 === e.length) return !1;
                  for (var t = i.splitLines(e), r = 0; r < t.length; r++) if (t[r].length < 2 || '=' !== t[r].charAt(1)) return !1;
                  return !0;
              }, 'object' == typeof t && (t.exports = i);
          }, {}],
      }, {}, [1])(1);
  }, function(e, t, r) {
      'use strict';
      var i = this && this.__assign || Object.assign || function(e) {
          for (var t, r = 1, i = arguments.length; r < i; r++) for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
          return e;
      };
      Object.defineProperty(t, '__esModule', { value: !0 });
      var o = r(0), n = r(2), s = function() {
          function e(e, t) {
              this.sendDataMap = {}, this.sendDataList = new o.LinkedList, this.sendDataCheckOnceCount = 100, this.signalSeq = 0, this.pushCallback = {}, this.sessionInfos = {}, this.tryHeartbeatCount = 0, this.heartbeatInterval = 1e4, this.sendDataTimeout = 5e3, this.sendDataDropTimeout = 1e4, this.tryConnectCount = 1, this.tryConnectTimer = null, this.tryConnectInterval = 3e3, this.state = o.ENUM_CONNECT_STATE.disconnect, this.tokenType = 0, this.browser = this.getBrowserAndVersion(), this.platform = navigator.platform, this.logger = e, this.stateCenter = t;
          }

          return e.prototype.getBrowserAndVersion = function() {
              var e, t = navigator.userAgent,
                  r = t.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || [];
              return /trident/i.test(r[1]) ? {
                  name: 'IE',
                  version: (e = /\brv[ :]+([\d\.]+)/g.exec(t) || [])[1] || '',
              } : 'Chrome' === r[1] && null != (e = t.match(/\bOPR|Edge\/([\d\.]+)/)) ? {
                  name: 'Opera',
                  version: e[1],
              } : (r = r[2] ? [r[1], r[2]] : [navigator.appName, navigator.appVersion, '-?'], null != (e = t.match(/version\/([\d+\.]+)/i)) && r.splice(1, 1, e[1]), {
                  name: r[0],
                  version: r[1],
              });
          }, e.prototype.setSessionInfo = function(e, t) {
              this.logger.debug('zs.ssi.0 call'), this.appid = e + '', this.userid = t;
          }, e.prototype.onDisconnect = function(e) {
          }, e.prototype.onUpdateHeartBeartInterval = function(e) {
          }, e.prototype.resetConnectTimer = function() {
              this.logger.info('zs.rct.0 call'), clearTimeout(this.tryConnectTimer), this.tryConnectTimer = null, this.tryConnectCount = 0;
          }, e.prototype.bindWebSocketHandle = function() {
              var e = this;
              this.websocket.onmessage = function(t) {
                  var r = JSON.parse(t.data);
                  e.logger.debug('zs.bsh.0 signmsg= ', r.header.cmd), r.header.appid == e.appid && r.header.user_id === e.userid ? e.handleServerPush(r) : e.logger.warn('zs.bsh.0 check header failed');
              }, this.websocket.onclose = function(t) {
                  e.logger.info('zs.bsh.0 close msg = ' + JSON.stringify(t)), e.state != o.ENUM_CONNECT_STATE.disconnect && (e.resetConnectTimer(), e.startConnectTimer(), e.resetCheckMessage());
              }, this.websocket.onerror = function(t) {
                  e.logger.error('zs.bsh.0 msg = ' + JSON.stringify(t));
              };
          }, e.prototype.resetCheckMessage = function() {
              this.logger.debug('zs.rcm.0 call');
              for (var e = this.sendDataList.getFirst(); null != e;) this.sendDataList.remove(e), e._data.error && e._data.error(o.SEND_MSG_RESET, e._data.seq), e = this.sendDataList.getFirst();
              this.sendDataMap = {};
          }, e.prototype.handleServerPush = function(e) {
              switch (e.header.cmd) {
                  case'LoginRsp':
                      this.handleRespondData('LoginReq', e);
                      break;
                  case'CreateSessionRsp':
                      this.handleRespondData('CreateSessionReq', e), 0 === e.body.result && this.addSession(e.header.session_id, e.body.session_token);
                      break;
                  case'MediaDescRsp':
                      this.handleRespondData('MediaDescReq', e);
                      break;
                  case'CandidateInfoRsp':
                      this.handleRespondData('CandidateInfoReq', e);
                      break;
                  case'CloseSessionRsp':
                      this.handleRespondData('CloseSessionReq', e), this.removeSession(e.header.session_id);
                      break;
                  case'ClientHBRsp':
                      this.handleRespondData('ClientHBReq', e);
                      break;
                  case'MediaDescPush':
                  case'CandidateInfoPush':
                      this.handlePushData(e);
                      break;
                  case'CloseSessionPush':
                      this.handlePushData(e), this.removeSession(e.header.session_id);
                      break;
                  case'QualityReportRsp':
                      this.handleRespondData('QualityReportReq', e);
                      break;
                  case'SessionResetPush':
                      this.handlePushResetSessionData(e);
              }
          }, e.prototype.disconnectCallback = function() {
              this.connectCallback && (this.connectCallback(-1, this.server, void 0), this.connectCallback = null);
              var e = this.server;
              this.disconnectServer(), this.onDisconnect(e);
          }, e.prototype.updateToken = function() {
              var e = this;
              this.logger.info('zs.ut.0 call');
              var t = {
                  token: this.token,
                  tokenType: this.tokenType,
                  roomid: this.stateCenter.roomid,
                  anchorname: this.stateCenter.anchor_info.anchor_id,
                  sdkversion: o.PROTO_VERSION,
                  osinfo: navigator.appVersion,
              };
              if (0 != Object.keys(this.sessionInfos).length) {
                  var r = [];
                  for (var i in this.sessionInfos) {
                      var s = parseInt(i);
                      r.push({ session_id: s, session_token: this.sessionInfos[s].token });
                  }
                  t.sessions = r;
              }
              this.sendMessageWithCallback('LoginReq', n.getSeq(), 0, t, function(t, r, i) {
                  if (0 == i.result) {
                      e.token = i.token, e.tokenType = i.tokenType;
                      var o = { report: i.report, report_interval: i.report_interval_ms };
                      null != e.connectCallback && (e.connectCallback(0, e.server, o), e.connectCallback = null);
                  } else {
                      var n = { error: i.strError };
                      null != e.connectCallback && (e.connectCallback(i.result, e.server, n), e.connectCallback = null);
                  }
              }, function(t, r) {
                  null != e.connectCallback && (e.connectCallback(-1, e.server, void 0), e.connectCallback = null);
              });
          }, e.prototype.sendMessageWithCallback = function(e, t, r, i, n, s) {
              if (this.logger.debug('zs.smwc.0 call ' + e), !this.websocket || 1 !== this.websocket.readyState) return this.logger.error('zs.smwc.0 connect not establish'), void (s && s(o.SEND_MSG_TIMEOUT, t));
              var a = { header: this.getHeader(e, t, r), body: i };
              null == n && (n = null), null == s && (s = null);
              var c = { seq: t, deleted: !1, cmd: e, time: Date.parse(new Date + ''), success: n, error: s },
                  d = this.sendDataList.push(c);
              this.sendDataMap[c.seq] = d;
              var l = JSON.stringify(a);
              this.websocket.send(l), this.logger.debug('zs.smwc.0 success');
          }, e.prototype.getHeader = function(e, t, r) {
              return this.globalHeader = {
                  version: '1.0.1',
                  cmd: e,
                  appid: this.appid + '',
                  seq: t,
                  user_id: this.userid,
                  session_id: r,
              }, this.globalHeader;
          }, e.prototype.connectServer = function(e, t, r) {
              var i = this;
              if (this.token = e, this.server = t, this.state = o.ENUM_CONNECT_STATE.connecting, this.connectCallback = r, this.websocket && 1 === this.websocket.readyState) this.resetConnectTimer(), this.state = o.ENUM_CONNECT_STATE.connected; else {
                  this.logger.debug('zs.cs.0 need new websocket');
                  try {
                      this.websocket && (this.logger.warn('zs.cs.0 close error websocket'), this.websocket.onclose = null, this.websocket.onerror = null, this.websocket.close(), this.websocket = null), this.websocket = new WebSocket(this.server), this.websocket.onopen = function() {
                          i.resetConnectTimer(), i.logger.info('zs.cs.0 websocket open call'), i.bindWebSocketHandle(), i.updateToken(), i.state = o.ENUM_CONNECT_STATE.connected;
                      };
                  } catch (e) {
                      this.logger.error('zs.cs.0 websocket error ' + e);
                  }
              }
              this.tryConnectTimer = setTimeout(function() {
                  i.startConnectTimer(r);
              }, this.tryConnectInterval);
          }, e.prototype.startConnectTimer = function(e) {
              if (this.logger.info('zs.sct.0 call'), this.tryConnectCount >= o.MAX_TRY_CONNECT_COUNT) return this.logger.error('zs.sct.0 beyond max limit'), void this.disconnectCallback();
              this.websocket && 1 === this.websocket.readyState ? this.resetConnectTimer() : (this.tryConnectCount += 1, this.connectServer(this.token, this.server, e));
          }, e.prototype.disconnectServer = function() {
              this.logger.debug('zs.ds.0 call'), this.server = null, this.connectCallback = null, this.resetCheckMessage(), this.resetConnectTimer(), this.websocket && (this.websocket.onclose = null, this.websocket.onerror = null, this.websocket.close(), this.websocket = null), this.token = '', this.sessionInfos = {}, this.tokenType = 0, this.tryHeartbeatCount = 0, this.tryConnectCount = 0, this.state = o.ENUM_CONNECT_STATE.disconnect;
          }, e.prototype.isServerConnected = function() {
              return !(!this.websocket || 1 !== this.websocket.readyState);
          }, e.prototype.createSession = function(e, t, r, i, o, n, s) {
              void 0 === o && (o = ''), this.logger.debug('zs.cs.1 call: ', i);
              var a = {
                  type: t,
                  stream_id: i,
                  platform: this.platform,
                  browser: this.browser.name,
                  version: this.browser.version,
                  app_id: this.appid,
                  negotiate_mode: r,
                  strAuthParam: o,
              };
              this.sendMessageWithCallback('CreateSessionReq', e, 0, a, n, s);
          }, e.prototype.removeSession = function(e) {
              this.logger.info('zs.rs.0 call'), this.sessionInfos[e] && delete this.sessionInfos[e];
          }, e.prototype.sendCloseSession = function(e, t, r, i, o) {
              this.logger.debug('zs.scs.0 call: ', t);
              var n = { reason: r };
              this.removeSession(t), this.sendMessageWithCallback('CloseSessionReq', e, t, n, i, o);
          }, e.prototype.sendMessage = function(e, t, r, i) {
              if (this.logger.debug('zs.sm.0 call ' + e), this.websocket && 1 === this.websocket.readyState) {
                  var o = { header: this.getHeader(e, t, r), body: i }, n = JSON.stringify(o);
                  this.websocket.send(n), this.logger.debug('zs.sm.0 success');
              } else this.logger.error('zs.sm.0 connect not establish');
          }, e.prototype.handleRespondData = function(e, t) {
              this.logger.debug('zs.hrd.0 call');
              var r = this.sendDataMap[t.header.seq];
              if (null != r) {
                  var i = r._data;
                  i.cmd !== e ? this.logger.error('sz.hrd.0 command is not match') : i.success && i.success(t.header.seq, t.header.session_id, t.body), delete this.sendDataMap[t.header.seq], this.sendDataList.remove(r);
              } else {
                  if ('CloseSessionRsp' == t.header.cmd) return;
                  this.logger.error('zs.hrd.0 cannot find data ' + e);
              }
          }, e.prototype.addSession = function(e, t) {
              this.logger.info('zs.as.0 call'), this.sessionInfos[e] = { token: t };
          }, e.prototype.handlePushData = function(e) {
              this.logger.debug('zs.hpd.0 call ' + e.header.cmd + ' session ' + e.header.session_id);
              var t = this.pushCallback[e.header.cmd + e.header.session_id];
              t ? t.callback && t.callback(e.header.seq, e.header.session_id, e.body) : this.logger.info('zs.hpd.0 no callbackData ' + e.header.cmd + ' session: ' + e.header.session_id);
          }, e.prototype.handlePushResetSessionData = function(e) {
              this.logger.debug('zs.hprsd.0 call ');
              var t = [];
              if (0 == e.body.cResetType) t = Object.keys(this.sessionInfos); else if (1 == e.body.cResetType) for (var r = 0; r < e.body.session_ids.length; r++) t.push(e.body.session_ids[r]);
              if (this.sendResetSessionAck(e.header.seq, 0, 0), 0 != t.length) for (var i = 0; i < t.length; i++) {
                  var o = this.pushCallback[e.header.cmd + t[i]];
                  null == o ? this.logger.info('zs.hprsd.0 no callbackData ' + t[i]) : o.callback && o.callback(o.object, e.header.seq, t[i], e.body);
              } else this.logger.info('zs.hprsd.0 no session to callback');
          }, e.prototype.sendMediaDesc = function(e, t, r, i, o, n) {
              this.logger.debug('zs.smd.0 call: ', t);
              var s = { type: r, sdp: i.sdp };
              null != i.width && (s.width = i.width), null != i.height && (s.height = i.height), null != i.frameRate && (s.framerate = i.frameRate), null != i.video_min_kpbs && (s.video_min_kpbs = i.video_min_kpbs), null != i.video_max_kpbs && (s.video_max_kpbs = i.video_max_kpbs), null != i.audio_kpbs && (s.audio_kpbs = i.audio_kpbs), this.sendMessageWithCallback('MediaDescReq', e, t, s, o, n);
          }, e.prototype.sendCandidateInfo = function(e, t, r, i, o) {
              this.logger.debug('zs.sci.0 call: ', t);
              for (var n = [], s = 0; s < r.length; s++) {
                  var a = { candidate: r[s].candidate, sdpMid: r[s].sdpMid, sdpMLineIndex: r[s].sdpMLineIndex };
                  n.push(a);
              }
              var c = { infos: n };
              this.sendMessageWithCallback('CandidateInfoReq', e, t, c, i, o);
          }, e.prototype.sendMediaDescAck = function(e, t, r) {
              this.logger.debug('zs.smda.0 call: ', t);
              var i = { result: r };
              this.sendMessage('MediaDescAck', e, t, i);
          }, e.prototype.sendCandidateInfoAck = function(e, t, r) {
              this.logger.debug('zs.scia.0 call: ', t);
              var i = { result: r };
              this.sendMessage('CandidateInfoAck', e, t, i);
          }, e.prototype.sendCloseSessionAck = function(e, t, r) {
              this.logger.debug('zs.scsa.0 call: ', t);
              var i = { result: r };
              this.sendMessage('CloseSessionAck', e, t, i);
          }, e.prototype.sendResetSessionAck = function(e, t, r) {
              this.logger.debug('zs.ssra.0 call: ', t);
              var i = { result: r };
              this.sendMessage('SessionResetAck', e, t, i);
          }, e.prototype.registerPushCallback = function(e, t, r) {
              r && 'function' == typeof r && (this.logger.debug('zs.rpc.0 setcallback'), this.pushCallback[e + t] = { callback: r });
          }, e.prototype.unregisterPushCallback = function(e, t) {
              delete this.pushCallback[e + t];
          }, e.prototype.checkMessageTimeout = function() {
              for (var e = this.sendDataList.getFirst(), t = Date.parse(new Date + ''), r = 0, i = 0, n = 0; !(null == e || e._data.time + this.sendDataTimeout > t || (delete this.sendDataMap[e._data.seq], this.sendDataList.remove(e), ++i, null == e._data.error || this.sendDataDropTimeout > 0 && e._data.time + this.sendDataDropTimeout < t ? ++n : e._data.error && e._data.error(o.SEND_MSG_TIMEOUT, e._data.seq), ++r >= this.sendDataCheckOnceCount));) e = this.sendDataList.getFirst();
              0 == i && 0 == n || this.logger.debug('zs.cmt.0 call success, state: timeout=', i, ' drop=', n);
          }, e.prototype.sendHeartbeat = function() {
              var e = this;
              if (this.logger.debug('zs.shb.0 call'), 0 != Object.keys(this.sessionInfos).length) {
                  if (++this.tryHeartbeatCount > o.MAX_TRY_HEARTBEAT_COUNT) return this.logger.error('zs.shb.0 heartbeat try limit'), void this.disconnectCallback();
                  var t = [];
                  for (var r in this.sessionInfos) t.push(parseInt(r));
                  var i = { session_ids: t };
                  this.sendMessageWithCallback('ClientHBReq', n.getSeq(), 0, i, function(t, r, i) {
                      e.heartbeatInterval != i.hb_interval && (e.heartbeatInterval = i.hb_interval, e.onUpdateHeartBeartInterval(i.hb_interval)), e.tryHeartbeatCount = 0;
                  }, function(t, r) {
                      e.tryHeartbeatCount += 1;
                  });
              } else this.logger.info('zs.shb.0 no need to heartbeat');
          }, e.prototype.QualityReport = function(e, t, r, o, n) {
              this.logger.debug('zs.qr.0 call');
              var s = { streams: [i({}, r, { aid: t })] };
              this.sendMessageWithCallback('QualityReportReq', e, t, s, o, n);
          }, e;
      }();
      t.ZegoSignal = s;
  }, function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var i = r(0), o = r(2), n = r(4), s = function() {
          function e(e, t, r, n) {
              this.state = i.ENUM_PLAY_STATE.stop, this.candidateInfo = [], this.waitICETimer = null, this.waitingICETimeInterval = 5e3, this.waitingOfferTimer = null, this.waitingOfferTimeInterval = 5e3, this.waitingServerTimer = null, this.waitingServerTimerInterval = 3e3, this.qualityTimer = null, this.playQualityList = [], this.maxQualityListCount = 10, this.lastPlayStats = {
                  time: 0,
                  audioBytesReceived: 0,
                  videoBytesReceived: 0,
                  framesDecoded: 0,
                  framesReceived: 0,
                  framesDropped: 0,
              }, this.reportSeq = o.getSeq(), this.videoSizeCallback = !1, this.qualityUpload = !1, this.qualityUploadInterval = 3e4, this.qualityUploadLastTime = 0, this.maxRetryCount = 3, this.currentRetryCount = 0, this.retryState = i.ENUM_RETRY_STATE.didNotStart, this.closeSessionSignal = !1, this.logger = e, this.signal = t, this.dataReport = r, this.qualityTimeInterval = n, r.newReport(this.reportSeq);
          }

          return e.prototype.setAudioDestination = function(e) {
              var t = this;
              return this.remoteVideo ? 'undefined' !== this.remoteVideo.sinkId ? (this.remoteVideo.setSinkId(e).then(function() {
                  t.logger.info('zp.sad.1 success device: ' + e);
              }).catch(function(e) {
                  t.logger.info('zp.sad.1 ' + e.name);
              }), !0) : (this.logger.error('zp.sad.1 browser does not suppport'), !1) : (this.logger.info('zp.sad.1 no remoteVideo'), !1);
          }, e.prototype.startPlay = function(e, t, r, n) {
              var s = this;
              this.logger.info('zp.sp.1 called ', e), e ? (this.streamId = e, this.remoteVideo = t, this.audioOutput = r, this.playOption = n || {}, n && n.videoDecodeType && (this.playOption.videoDecodeType = n.videoDecodeType), this.sessionSeq = o.getSeq(), this.dataReport.eventStart(this.reportSeq, 'CreateSession'), this.signal.createSession(this.sessionSeq, 1, 0, e, n && n.streamParams, function(e, t, r) {
                  s.dataReport.eventEndWithMsg(s.reportSeq, 'CreateSession', { sessionId: r.session_id }), s.logger.info('zp.sp.1 sessionId:' + r.session_id), s.sessionSeq == e ? 0 !== r.result ? (s.logger.error('zp.sp.1 create error'), s.playStateUpdateError(o.playErrorList.CREATE_SESSION_ERROR)) : (s.sessionId = r.session_id, s.onCreatePlaySessionSuccess(r)) : s.logger.error('zp.sp.1 seq is not match.');
              }, function(e, t) {
                  s.dataReport.eventEndWithMsg(s.reportSeq, 'CreateSession', { error: e }), s.playStateUpdateError(o.playErrorList.SEND_SESSION_TIMEOUT);
              }), this.state = i.ENUM_PLAY_STATE.waitingSessionRsp, this.logger.debug('zp.sp.1 called success')) : this.logger.warn('zp.sp.1 streamId is null');
          }, e.prototype.onCreatePlaySessionSuccess = function(e) {
              var t = this;
              this.logger.info('zp.ops.1 success');
              var r = [];
              e.turn_server && r.push(e.turn_server), e.stun_server && r.push(e.stun_server);
              var i = {
                  iceTransportPolicy: 'relay',
                  iceServers: [{ urls: r, username: e.turn_username, credential: e.turn_auth_key }],
              };
              this.logger.info('zp.ops.1 username: ' + e.turn_username), this.logger.info('zp.ops.1 credential: ' + e.turn_auth_key), this.peerConnection = new RTCPeerConnection(i), this.peerConnection.onicecandidate = function(e) {
                  t.onIceCandidate(e);
              }, this.peerConnection.onsignalingstatechange = function(e) {
                  t.onConnectionStateChange(e);
              }, this.peerConnection.oniceconnectionstatechange = function(e) {
                  t.onIceConnectionStateChange(e);
              }, this.peerConnection.ontrack = function(e) {
                  t.onGotRemoteStream(e.streams[0]);
              }, this.remoteVideo.oncanplay = function() {
                  t.logger.debug('zp.ops.1 ' + t.remoteVideo.videoWidth + ' X ' + t.remoteVideo.videoHeight), t.videoSizeCallback || (t.logger.debug('zp.ops.1 onresize callback'), t.onVideoSizeChanged(t.streamId, t.remoteVideo.videoWidth, t.remoteVideo.videoHeight), t.videoSizeCallback = !0);
              };
              var n = { offerToReceiveAudio: 1, offerToReceiveVideo: 1 };
              this.playOption && 'audio' === this.playOption.playType && (n.offerToReceiveVideo = 0), this.playOption && 'video' === this.playOption.playType && (n.offerToReceiveAudio = 0), this.logger.info('zp.ops.1 createOffer: ' + n), this.dataReport.eventStart(this.reportSeq, 'CreateOffer'), this.peerConnection.createOffer(n).then(function(e) {
                  t.dataReport.eventEnd(t.reportSeq, 'CreateOffer'), t.onCreateOfferSuccess(e);
              }, function(e) {
                  t.dataReport.eventEndWithMsg(t.reportSeq, 'CreateOffer', { error: e.toString() }), t.logger.error('zp.ops.0 create offer error ' + e.toString()), t.playStateUpdateError(o.playErrorList.CREATE_OFFER_ERROR);
              }), this.signal.registerPushCallback('MediaDescPush', this.sessionId, function(e, r, i) {
                  t.onRecvMediaDesc(e, r, i);
              }), this.signal.registerPushCallback('CandidateInfoPush', this.sessionId, function(e, r, i) {
                  t.onRecvCandidateInfo(e, r, i);
              }), this.signal.registerPushCallback('CloseSessionPush', this.sessionId, function(e, r, i) {
                  t.onRecvCloseSession(e, r, i);
              }), this.signal.registerPushCallback('SessionResetPush', this.sessionId, function(e, r, i) {
                  t.onRecvResetSession(e, r, i);
              }), this.logger.debug('zp.ops.1 call success');
          }, e.prototype.onCreateOfferSuccess = function(e) {
              var t = this;
              this.logger.info('zp.oco.1 localSdp1 ' + e.sdp.substr(0, e.sdp.length / 2)), this.logger.info('zp.oco.1 localSdp2 ' + e.sdp.substr(e.sdp.length / 2)), e.sdp = e.sdp.replace(/sendrecv/g, 'recvonly'), this.playOption.videoDecodeType && (e.sdp = n.sdpUtil.getSDPByVideDecodeType(e.sdp, this.playOption.videoDecodeType)), this.dataReport.eventStart(this.reportSeq, 'SetLocalDescription'), this.peerConnection.setLocalDescription(e).then(function() {
                  t.dataReport.eventEnd(t.reportSeq, 'SetLocalDescription'), t.onSetLocalDescriptionSuccess(e);
              }, function(e) {
                  t.logger.error('zp.oca.1 set error ' + e.toString()), t.dataReport.eventEnd(t.reportSeq, 'SetLocalDescription', { error: e.toString() }), t.playStateUpdateError(o.playErrorList.SET_LOCAL_DESC_ERROR);
              });
          }, e.prototype.onSetLocalDescriptionSuccess = function(e) {
              var t = this;
              this.logger.info('zp.osd.1 success');
              var r = { sdp: e.sdp };
              this.answerSeq = o.getSeq(), this.dataReport.eventStart(this.reportSeq, 'SendMediaDesc'), this.signal.sendMediaDesc(this.answerSeq, this.sessionId, 0, r, function(e, r, n) {
                  t.answerSeq == e && t.sessionId == r ? (t.logger.info('zp.osd.1 send success'), t.dataReport.eventEnd(t.reportSeq, 'SendMediaDesc'), t.waitingOfferTimer = setTimeout(function() {
                      t.state == i.ENUM_PLAY_STATE.waitingOffserRsp && (t.logger.error('zp.osd.1 waiting timeout'), t.playStateUpdateError(o.playErrorList.SERVER_CANDIDATE_TIMEOUT));
                  }, t.waitingOfferTimeInterval), t.state = i.ENUM_PLAY_STATE.waitingServerAnswer) : t.logger.error('zp.osd.1 seq or sessionId is not equal ' + t.answerSeq + ' ' + e, 0 + t.sessionId + ' ' + r);
              }, function(e, r) {
                  t.logger.error('zp.osd.1 failed to send ' + e), t.dataReport.eventEndWithMsg(t.reportSeq, 'SendMediaDesc', { error: e }), t.playStateUpdateError(o.playErrorList.SEND_MEDIA_DESC_TIMEOUT);
              }), this.state = i.ENUM_PLAY_STATE.waitingOffserRsp;
          }, e.prototype.onRecvMediaDesc = function(e, t, r) {
              var n = this;
              if (this.logger.info('zp.orm.1 received ', r), this.state === i.ENUM_PLAY_STATE.waitingServerAnswer) {
                  null != this.waitingOfferTimer && (clearTimeout(this.waitingOfferTimer), this.waitingOfferTimer = null), this.dataReport.addEvent(this.reportSeq, 'RecvMediaDesc'), this.signal.sendMediaDescAck(e, this.sessionId, 0);
                  var s = {
                      type: 'answer', sdp: r.sdp, toJSON: function() {
                      },
                  };
                  this.dataReport.eventStart(this.reportSeq, 'SetRemoteDescription'), this.logger.info('zp.orm.1 remoteSdp ', s.sdp), this.peerConnection.setRemoteDescription(new RTCSessionDescription(s)).then(function() {
                      n.dataReport.eventEnd(n.reportSeq, 'SetRemoteDescription'), n.logger.info('zp.orm.1 set success');
                  }, function(e) {
                      n.logger.error('zp.orm.1 set remote error ' + e.toString()), n.dataReport.eventEndWithMsg(n.reportSeq, 'SetRemoteDescription', { error: e.toString() }), n.playStateUpdateError(o.playErrorList.SET_REMOTE_DESC_ERROR);
                  }), this.sendCandidateInfo(this.candidateInfo), this.candidateInfo = [], this.waitICETimer = setTimeout(function() {
                      n.state == i.ENUM_PLAY_STATE.waitingServerICE && (n.logger.error('zp.orm.1 waiting server timeout'), n.playStateUpdateError(o.playErrorList.SERVER_CANDIDATE_TIMEOUT));
                  }, this.waitingICETimeInterval), this.state = i.ENUM_PLAY_STATE.waitingServerICE, this.logger.debug('zp.orm.1 call success');
              } else this.logger.error('zp.orm.1 current state ' + this.state + ' not allowed');
          }, e.prototype.onRecvCandidateInfo = function(e, t, r) {
              var n = this;
              if (this.logger.debug('zp.orci.1 received '), this.state == i.ENUM_PLAY_STATE.waitingServerICE) {
                  null != this.waitICETimer && (clearTimeout(this.waitICETimer), this.waitICETimer = null), this.dataReport.addEvent(this.reportSeq, 'RecvIceCandidate'), this.signal.sendCandidateInfoAck(e, this.sessionId, 0);
                  for (var s = 0; s < r.infos.length; s++) {
                      var a = {
                          sdpMid: r.infos[s].sdpMid,
                          sdpMLineIndex: r.infos[s].sdpMLineIndex,
                          candidate: r.infos[s].candidate,
                      };
                      this.logger.debug('zp.orci.1 candidate ' + a.candidate), this.peerConnection.addIceCandidate(new RTCIceCandidate(a)).then(function() {
                          n.logger.debug('zp.orci.1 add success');
                      }, function(e) {
                          n.logger.error('zp.orci.1 add error ' + e.toString()), n.playStateUpdateError(o.playErrorList.SERVER_CANDIDATE_ERROR);
                      });
                  }
                  this.state = i.ENUM_PLAY_STATE.connecting, this.logger.debug('zp.orci.1 call success');
              } else this.logger.warn('zp.orci.1 current state ' + this.state + ' not allowed');
          }, e.prototype.onIceCandidate = function(e) {
              if (this.logger.info('zp.oic.1 called'), null != e.candidate) if (this.logger.debug('zp.oic.1 candidate ' + e.candidate.candidate), this.state < i.ENUM_PLAY_STATE.waitingServerICE || this.state == i.ENUM_PLAY_STATE.stop) this.logger.debug('zp.oic.1 cached'), this.candidateInfo.push({
                  candidate: e.candidate.candidate,
                  sdpMid: e.candidate.sdpMid,
                  sdpMLineIndex: e.candidate.sdpMLineIndex,
              }); else {
                  this.logger.debug('zp.oic.1 send');
                  var t = {
                      candidate: e.candidate.candidate,
                      sdpMid: e.candidate.sdpMid,
                      sdpMLineIndex: e.candidate.sdpMLineIndex,
                  };
                  this.sendCandidateInfo([t]);
              }
          }, e.prototype.onConnectionStateChange = function(e) {
              this.logger.info('zp.oisc.1 called ' + e.target.signalingState);
          }, e.prototype.onIceConnectionStateChange = function(e) {
              this.state != i.ENUM_PLAY_STATE.stop && null != this.peerConnection && (this.logger.info('zp.oisc.1  stateChanged ' + this.peerConnection.iceConnectionState), 'connected' === this.peerConnection.iceConnectionState ? (this.dataReport.addEvent(this.reportSeq, 'IceConnected'), this.state != i.ENUM_PLAY_STATE.playing && this.onPlayStateUpdate(o.ENUM_PLAY_STATE_UPDATE.start, this.streamId), this.state = i.ENUM_PLAY_STATE.playing, this.retryState != i.ENUM_RETRY_STATE.didNotStart && (this.retryState = i.ENUM_RETRY_STATE.finished, this.currentRetryCount = 0), this.dataReport.eventStart(this.reportSeq, 'PlayState'), this.setPlayQualityTimer()) : 'closed' === this.peerConnection.iceConnectionState ? (this.dataReport.addEvent(this.reportSeq, 'IceClosed'), this.checkPlayConnectionFailedState(this.peerConnection.iceConnectionState)) : 'failed' === this.peerConnection.iceConnectionState && (this.dataReport.addEvent(this.reportSeq, 'IceFailed'), this.checkPlayConnectionFailedState(this.peerConnection.iceConnectionState)));
          }, e.prototype.checkPlayConnectionFailedState = function(e) {
              var t = null;
              'failed' == e ? t = o.playErrorList.MEDIA_CONNECTION_FAILED : 'closed' == e && (t = o.playErrorList.MEDIA_CONNECTION_CLOSED), null != t && (this.state != i.ENUM_PLAY_STATE.playing && this.retryState == i.ENUM_PLAY_STATE.didNotStart ? (this.logger.info('zp.oics.1  state ' + this.state + ' retryState ' + this.retryState + ' connectionState ' + e), this.playStateUpdateError(t)) : this.shouldRetryPlay() ? (this.onPlayStateUpdate(o.ENUM_PLAY_STATE_UPDATE.retry, this.streamId), this.startRetryPlay()) : this.playStateUpdateError(t));
          }, e.prototype.shouldRetryPlay = function() {
              return this.retryState == i.ENUM_RETRY_STATE.didNotStart && this.state != i.ENUM_PLAY_STATE.playing ? (this.logger.info('zp.srp.1.0 connection didn\'t success'), !1) : this.retryState == i.ENUM_RETRY_STATE.retrying ? (this.logger.info('zp.srp.0.0 already retrying'), !1) : this.currentRetryCount > this.maxRetryCount ? (this.logger.info('zp.srp.1.0 beyond max'), !1) : (this.logger.debug('zp.srp.1.0 call success'), !0);
          }, e.prototype.startRetryPlay = function() {
              this.logger.debug('zp.srp.0 call');
              var e = this.streamId, t = this.remoteVideo, r = this.audioOutput;
              this.resetPlay(), this.tryStartPlay(e, t, r);
          }, e.prototype.clearTryPlayTimer = function() {
              null != this.waitingServerTimer && (clearTimeout(this.waitingServerTimer), this.waitingServerTimer = null);
          }, e.prototype.tryStartPlay = function(e, t, r) {
              var n = this;
              if (this.logger.debug('zp.tsp.1 call'), this.clearTryPlayTimer(), this.streamId = e, this.remoteVideo = t, this.audioOutput = r, this.currentRetryCount > this.maxRetryCount) return this.logger.error('zp.tsp.1 beyond max limit'), void this.playStateUpdateError(o.playErrorList.WEBSOCKET_ERROR);
              this.retryState = i.ENUM_RETRY_STATE.retrying, this.currentRetryCount += 1, this.signal.isServerConnected() ? (this.logger.debug('zp.tsp.1 signal connected'), this.startPlay(e, this.remoteVideo, this.audioOputput)) : (this.logger.debug('zp.tsp.1 signal server not connected'), this.waitingServerTimer = setTimeout(function() {
                  n.tryStartPlay(e, n.remoteVideo, n.audioOputput);
              }, this.waitingServerTimerInterval));
          }, e.prototype.clearPlayQualityTimer = function() {
              null != this.qualityTimer && (clearInterval(this.qualityTimer), this.qualityTimer = null), this.lastPlayStats = {
                  time: null,
                  audioBytesReceived: null,
                  videoBytesReceived: null,
                  framesDecoded: null,
                  framesDropped: null,
                  framesReceived: null,
              };
          }, e.prototype.resetPlay = function() {
              this.logger.info('zp.rp.1 call'), this.streamId = null, this.state = i.ENUM_PLAY_STATE.stop, null != this.peerConnection && (this.peerConnection.close(), this.peerConnection = null), null != this.waitingOfferTimer && (clearTimeout(this.waitingOfferTimer), this.waitingOfferTimer = null), null != this.waitICETimer && (clearTimeout(this.waitICETimer), this.waitICETimer = null), this.clearPlayQualityTimer(), this.remoteVideo && (this.remoteVideo.srcObject = null, this.remoteVideo.oncanplay = null, this.remoteVideo = null), this.audioOputput = null, this.signal && (this.signal.unregisterPushCallback('MediaDescPush', this.sessionId), this.signal.unregisterPushCallback('CandidateInfoPush', this.sessionId), this.signal.unregisterPushCallback('CloseSessionPush', this.sessionId)), this.sessionSeq = 0, this.answerSeq = 0, this.videoSizeCallback = !1, this.currentRetryCount = 0, this.retryState = i.ENUM_RETRY_STATE.didNotStart, this.clearTryPlayTimer();
          }, e.prototype.setPlayQualityTimer = function() {
              var e = this;
              null == this.qualityTimer && (this.logger.debug('zp.spq.1 startTimer'), this.clearPlayQualityTimer(), this.qualityTimer = setInterval(function() {
                  e.peerConnection && e.peerConnection.getStats(null).then(function(t) {
                      e.getPlayStats(t);
                  }, function(t) {
                      e.logger.info('zp.spq.1 getStats error ' + t.toString());
                  });
              }, this.qualityTimeInterval), this.lastPlayStats = {
                  time: 0,
                  audioBytesReceived: 0,
                  videoBytesReceived: 0,
                  framesDecoded: 0,
                  framesReceived: 0,
                  framesDropped: 0,
              });
          }, e.prototype.getPlayStats = function(e) {
              var t = this;
              if (null != e) {
                  var r = {
                      audioFractionLost: 0,
                      audioPacketsLost: 0,
                      audioBitrate: 0,
                      videoBitrate: 0,
                      videoFPS: 0,
                      playData: 0,
                      nackCount: 0,
                      pliCount: 0,
                      sliCount: 0,
                      videoFractionLos: 0,
                      audioJitter: 0,
                      videoFractionLost: null,
                      videoFramesDecoded: 0,
                      frameHeight: 0,
                      frameWidth: 0,
                      videoTransferFPS: 0,
                      videoFramesDropped: 0,
                      totalRoundTripTime: 0,
                      currentRoundTripTime: 0,
                  }, i = this.lastPlayStats.time;
                  e.forEach(function(e) {
                      ('inbound-rtp' == e.type || 'ssrc' == e.type && null != e.bytesReceived) && ('audio' == e.mediaType || e.id.indexOf('AudioStream') >= 0) ? (0 != i && (r.audioBitrate = 8 * (e.bytesReceived - t.lastPlayStats.audioBytesReceived) / (e.timestamp - i)), r.audioBitrate < 0 && (r.audioBitrate = 0), r.audioJitter = e.jitter, r.audioPacketsLost = e.packetsLost, r.audioFractionLost = e.fractionLost, t.lastPlayStats.audioBytesReceived = e.bytesReceived, t.lastPlayStats.time = e.timestamp) : ('inbound-rtp' == e.type || 'ssrc' == e.type && null != e.bytesReceived) && ('video' == e.mediaType || e.id.indexOf('VideoStream') >= 0) ? (0 != i && (r.videoBitrate = 8 * (e.bytesReceived - t.lastPlayStats.videoBytesReceived) / (e.timestamp - i), r.videoFPS = 1e3 * (e.framesDecoded - t.lastPlayStats.framesDecoded) / (e.timestamp - i)), r.videoBitrate < 0 && (r.videoBitrate = 0), r.videoFPS < 0 && (r.videoFPS = 0), r.nackCount = e.nackCount, r.pliCount = e.pliCount, r.sliCount = e.sliCount, r.videoFractionLost = e.fractionLost, r.videoFramesDecoded = e.framesDecoded, t.lastPlayStats.videoBytesReceived = e.bytesReceived, t.lastPlayStats.framesDecoded = e.framesDecoded, t.lastPlayStats.time = e.timestamp) : 'track' == e.type && ('video' == e.kind || e.id.indexOf('video') >= 0) ? (r.frameHeight = e.frameHeight, r.frameWidth = e.frameWidth, 0 != i && (r.videoTransferFPS = 1e3 * (e.framesReceived - t.lastPlayStats.framesReceived) / (e.timestamp - i), r.videoFramesDropped = e.framesDropped - t.lastPlayStats.framesDropped), r.videoTransferFPS < 0 && (r.videoTransferFPS = 0), r.videoFramesDropped < 0 && (r.videoFramesDropped = 0), t.lastPlayStats.framesReceived = e.framesReceived, t.lastPlayStats.framesDropped = e.framesDropped) : 'candidate-pair' == e.type && (null != e.totalRoundTripTime && (r.totalRoundTripTime = e.totalRoundTripTime), null != e.currentRoundTripTime && (r.currentRoundTripTime = e.currentRoundTripTime));
                  }), this.uploadPlayQuality(r), 0 != i && this.onPlayQualityUpdate(this.streamId, r);
              }
          }, e.prototype.uploadPlayQuality = function(e) {
              var t = this;
              if (this.qualityUpload) {
                  var r = Date.parse(new Date + '');
                  (0 == this.qualityUploadLastTime || r - this.qualityUploadLastTime >= this.qualityUploadInterval) && (this.logger.debug('zp.upq.1 upload'), e.stream_type = 'play', e.stream_id = this.streamId, e.timeStamp = r / 1e3, this.signal.QualityReport(o.getSeq(), this.sessionId, e, function(e, r, i) {
                      void 0 !== i.report && (t.qualityUpload = i.report, t.qualityUploadInterval = i.report_interval_ms);
                  }, function(e, r) {
                      t.logger.info('zp.upq.1 upload failed ' + e);
                  }), this.qualityUploadLastTime = r);
              }
          }, e.prototype.onRecvResetSession = function(e, t, r) {
              this.logger.info('zp.orrs.1 received '), t == this.sessionId ? (this.dataReport.addEvent(this.reportSeq, 'RecvResetSession'), this.shouldRetryPlay() && this.startRetryPlay()) : this.logger.info('zp.orrs.1 cannot find session');
          }, e.prototype.onRecvCloseSession = function(e, t, r) {
              this.logger.info('zp.orcs.1 reason: ' + r.reason), this.dataReport.addEvent(this.reportSeq, 'RecvCloseSession'), this.signal.sendCloseSessionAck(e, this.sessionId, 0);
              var i = JSON.parse(JSON.stringify(o.playErrorList.SESSION_CLOSED));
              i.msg += r.reason, 24 === r.reason ? this.startRetryPlay() : this.playStateUpdateError(i);
          }, e.prototype.onGotRemoteStream = function(e) {
              this.logger.info('zp.ogrs.0 called ' + e), this.remoteVideo ? (this.remoteVideo.srcObject = e, this.audioOputput && this.setAudioDestination(this.audioOputput), this.dataReport.addEvent(this.reportSeq, 'GetRemoteStream')) : this.logger.error('zp.ogrs.0 no remoteVideo');
          }, e.prototype.sendCandidateInfo = function(e) {
              var t = this;
              this.logger.debug('zp.sci.1 called'), !(e = e.filter(function(e) {
                  return !(e.candidate.indexOf('tcp') > 0) && (!!e.candidate || void 0);
              })) || e.length < 1 ? this.logger.info('zp.sci.1 cancelled') : (this.dataReport.eventStart(this.reportSeq, 'SendIceCandidate'), this.signal.sendCandidateInfo(o.getSeq(), this.sessionId, e, function(e, r, i) {
                  t.logger.debug('zp.sci.1 send success'), t.dataReport.eventEnd(t.reportSeq, 'SendIceCandidate');
              }, function(e, r) {
                  t.logger.error('zp.sci.1 failed to send: ' + e.toString()), t.dataReport.eventEndWithMsg(t.reportSeq, 'SendIceCandidate', { error: e }), t.playStateUpdateError(o.playErrorList.SEND_CANDIDATE_ERROR);
              }));
          }, e.prototype.shouldSendCloseSession = function(e) {
              return this.state != o.ENUM_PLAY_STATE_UPDATE.stop && this.state != i.ENUM_PLAY_STATE.waitingSessionRsp;
          }, e.prototype.playStateUpdateError = function(e) {
              this.logger.debug('zp.psue.1 called ', e.code), 0 != this.sessionId && this.shouldSendCloseSession(e) && (this.signal.sendCloseSession(o.getSeq(), this.sessionId, 1), this.closeSessionSignal = !0), this.state = i.ENUM_PLAY_STATE.stop, this.onPlayStateUpdate(o.ENUM_PLAY_STATE_UPDATE.error, this.streamId, e), this.resetPlay();
          }, e.prototype.onPlayStateUpdate = function(e, t, r) {
          }, e.prototype.onPlayQualityUpdate = function(e, t) {
          }, e.prototype.onVideoSizeChanged = function(e, t, r) {
          }, e.prototype.stopPlay = function() {
              this.logger.debug('zp.sp.1.1 called'), this.sessionId && !this.closeSessionSignal && this.signal.sendCloseSession(o.getSeq(), this.sessionId, 0), this.dataReport.eventEndWithMsg(this.reportSeq, 'PlayState', { state: this.state + '' }), this.dataReport.addEvent(this.reportSeq, 'StopPlay'), this.dataReport.addMsgExt(this.reportSeq, {
                  stream: this.streamId,
                  sessionId: this.sessionId,
              }), this.dataReport.uploadReport(this.reportSeq, 'RTCPlayStream'), this.resetPlay();
          }, e.prototype.onDisconnect = function() {
              this.logger.info('zp.od.1 call'), this.logger.info('zp.od.1 websocket disconnect'), this.dataReport.addEvent(this.reportSeq, 'OnDisconnect'), this.playStateUpdateError(o.playErrorList.WEBSOCKET_ERROR);
          }, e;
      }();
      t.ZegoPlayWeb = s;
  }, function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var i = function() {
          function e(e, t) {
              this.playerList = {}, this.publisherList = {};
          }

          return e.prototype.setSessionInfo = function(e, t, r, i) {
          }, e;
      }();
      t.ZegoStreamCenter = i;
  }, function(e, t, r) {
      'use strict';
      var i,
          o = this && this.__extends || (i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
              e.__proto__ = t;
          } || function(e, t) {
              for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
          }, function(e, t) {
              function r() {
                  this.constructor = e;
              }

              i(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r);
          });
      Object.defineProperty(t, '__esModule', { value: !0 });
      var n = r(17), s = r(0), a = r(1), c = r(18), d = r(19), l = r(20), p = r(21), h = r(22), u = r(23),
          f = function(e) {
              function t() {
                  return e.call(this) || this;
              }

              return o(t, e), t.prototype.init = function() {
                  this.bindSocketHandler(), this.bindStreamHandler(), this.bindHeatBeatHandler(), this.bindHallHandler(), this.bindRoomHandler(), this.bindMessageHandler(), this.bindStreamCenterHandler();
              }, t.prototype.bindSocketHandler = function() {
                  var e = this;
                  this.socketCenter = new c.SocketCenter(this.logger, this.stateCenter), this.socketCenter.getSocket = function(t) {
                      return e.getSocket(t);
                  }, this.socketCenter.handleHallKickout = function(t) {
                      e.logger.info('zb.cm.bsh.0 call hhk'), e.hallHandler.setHallState(s.ENUM_RUN_STATE.logout), e.hallHandler.resetHall(), e.onKickOut({
                          code: s.sdkErrorList.KICK_OUT.code,
                          msg: s.sdkErrorList.KICK_OUT.msg + t.body.reason,
                      }), e.logger.debug('zb.cm.bsh.0 call hhk success');
                  }, this.socketCenter.handlePushKickout = function(t) {
                      e.logger.info('zb.cm.bsh.0  call hpk'), e.roomHandler.setRunState(s.ENUM_RUN_STATE.logout), e.roomHandler.resetRoom(), e.onKickOut({
                          code: s.sdkErrorList.KICK_OUT.code,
                          msg: s.sdkErrorList.KICK_OUT.msg + t.body.reason,
                      }), e.logger.debug('zb.cm.bsh.0  call hpk success');
                  }, this.socketCenter.handlePushCustomMsg = function(t) {
                      e.messageHandler.handlePushCustomMsg(t);
                  }, this.socketCenter.handlePushUserStateUpdateMsg = function(t) {
                      e.roomHandler.handlePushUserStateUpdateMsg(t);
                  };
              }, t.prototype.bindStreamHandler = function() {
                  var e = this;
                  this.streamHandler = new l.StreamHandler(this.logger, this.stateCenter, this.socketCenter), this.streamHandler.onStreamUpdated = function(t, r) {
                      e.onStreamUpdated(t, r), e.onStreamUpdatedCustomer(t, r);
                  }, this.streamHandler.onPublishStateUpdate = function(t, r, i) {
                      e.onPublishStateUpdate(t, r, i);
                  }, this.streamHandler.onStreamExtraInfoUpdated = function(t) {
                      e.onStreamExtraInfoUpdated(t);
                  };
              }, t.prototype.bindHeatBeatHandler = function() {
                  var e = this;
                  this.heartBeatHandler = new p.HeartBeatHandler(this.logger, this.stateCenter, this.socketCenter), this.heartBeatHandler.hbLogout = function(t) {
                      e.onDisconnect(t);
                  };
              }, t.prototype.bindRoomHandler = function() {
                  var e = this;
                  this.roomHandler = new d.RoomHandler(this.logger, this.stateCenter, this.socketCenter), this.roomHandler.loginSuccessCallBack = function(t, r) {
                      e.streamCenter.setSessionInfo(e.stateCenter.appid, e.stateCenter.idName, e.stateCenter.token, e.stateCenter.testEnvironment), e.logger.info('zb.cm.brh hls userStateUpdate ' + e.stateCenter.userStateUpdate), e.stateCenter.userStateUpdate && (e.logger.info('zb.cm.brh hls fetch all new userlist'), e.roomHandler.fetchUserList()), e.streamHandler.handleStreamStart(t, r);
                  }, this.roomHandler.onGetTotalUserList = function(t, r) {
                      e.onGetTotalUserList(t, r);
                  }, this.roomHandler.resetRoomCallBack = function() {
                      e.resetStreamCenter();
                  }, this.roomHandler.onUserStateUpdate = function(t, r) {
                      e.onUserStateUpdate(t, r);
                  }, this.roomHandler.onDisconnect = function(t) {
                      e.onDisconnect(t);
                  }, this.roomHandler.loginBodyData = function() {
                      return e.loginBodyData();
                  };
              }, t.prototype.bindHallHandler = function() {
                  var e = this;
                  this.hallHandler = new u.HallHandler(this.logger, this.stateCenter, this.socketCenter), this.hallHandler.loginSuccessCallBack = function(t, r) {
                      var i = r.body.hb_interval < s.MINIUM_HEARTBEAT_INTERVAL ? s.MINIUM_HEARTBEAT_INTERVAL : r.body.hb_interval;
                      e.heartBeatHandler.start(i);
                  }, this.hallHandler.resetHallCallBack = function() {
                      e.heartBeatHandler.resetHeartbeat();
                  }, this.hallHandler.onDisconnect = function(t) {
                      e.onDisconnect(t);
                  }, this.hallHandler.onTempBroken = function() {
                      return e.onTempBroken();
                  }, this.hallHandler.onReconnect = function() {
                      return e.onReconnect();
                  }, this.hallHandler.loginBodyData = function() {
                      return e.loginHallBodyData();
                  }, this.hallHandler.dispatchBodyData = function() {
                      return e.dispatchBodyData();
                  };
              }, t.prototype.bindMessageHandler = function() {
                  var e = this;
                  this.messageHandler = new h.MessageHandler(this.logger, this.stateCenter, this.socketCenter), this.messageHandler.onRecvCustomCommand = function(t, r, i) {
                      e.onRecvCustomCommand(t, r, i);
                  };
              }, t.prototype.bindStreamCenterHandler = function() {
                  var e = this;
                  this.streamCenter.onPlayStateUpdate = function(t, r, i) {
                      e.onPlayStateUpdateHandle(t, r, i);
                  }, this.streamCenter.onPlayQualityUpdate = function(t, r) {
                      e.onPlayQualityUpdate(t, r);
                  }, this.streamCenter.onPublishStateUpdate = function(t, r, i) {
                      e.onPublishStateUpdateHandle(t, r, i);
                  }, this.streamCenter.onPublishQualityUpdate = function(t, r) {
                      e.onPublishQualityUpdate(t, r);
                  }, this.streamCenter.onPlayerStreamUrlUpdate = function(t, r, i) {
                      e.onStreamUrlUpdate(t, r, i);
                  }, this.streamCenter.onVideoSizeChanged = function(t, r, i) {
                      e.onVideoSizeChanged(t, r, i);
                  };
              }, t.prototype.config = function(e) {
                  return this.logger.debug('zb.cm.cf call'), a.ClientUtil.checkConfigParam(e, this.logger) ? (this.stateCenter.appid = e.appid, this.stateCenter.deviceId = e.deviceId, this.stateCenter.deviceType = e.deviceType || '', this.stateCenter.anType = e.anType, this.stateCenter.dispatchServer = e.dispatchSever, this.stateCenter.idName = e.idName, this.stateCenter.nickName = e.nickName, 'boolean' == typeof e.roomFlag && (e.roomFlag ? this.stateCenter.roomFlag = 1 : this.stateCenter.roomFlag = 0), 'boolean' == typeof e.testEnvironment && (this.stateCenter.testEnvironment = e.testEnvironment), this.logger.setLogLevel(e.logLevel), e.remoteLogLevel ? this.logger.setRemoteLogLevel(e.remoteLogLevel) : this.logger.setRemoteLogLevel(0), this.logger.setSessionInfo(e.appid, '', '', e.idName, '', s.PROTO_VERSION, e.deviceId), e.logUrl && this.logger.openLogServer(e.logUrl), this.stateCenter.configOK = !0, this.logger.debug('zb.cm.cf call success'), !0) : (this.logger.error('zb.cm.cf param error'), !1);
              }, t.prototype.login = function(e, t, r) {
                  e && 'string' == typeof e ? this.hallHandler.login(e, t, r) : this.logger.error('zb.id.lg token format error');
              }, t.prototype.logout = function() {
                  return this.hallHandler.logout();
              }, t.prototype.enterRoom = function(e, t, r, i) {
                  !e || 'string' != typeof e || 0 !== t && 1 !== t ? this.logger.error('zb.id.er params error') : this.roomHandler.login(e, t, r, i);
              }, t.prototype.leaveRoom = function() {
                  return this.roomHandler.logout();
              }, t.prototype.getRoomInfo = function(e) {
                  this.roomHandler.getRoomInfo(e);
              }, t.prototype.setUserStateUpdate = function(e) {
                  'boolean' == typeof e ? this.roomHandler.setUserStateUpdate(e) : console.error('setUserStateUpdate param error');
              }, t.prototype.onUserStateUpdate = function(e, t) {
              }, t.prototype.onGetTotalUserList = function(e, t) {
              }, t.prototype.release = function() {
                  this.logger.debug('zb.cm.rl call'), this.roomHandler.setRunState(s.ENUM_RUN_STATE.logout), this.roomHandler.resetRoom(), this.logger.stopLogServer(), this.logger.debug('zb.cm.rl call success');
              }, t.prototype.sendCustomCommand = function(e, t, r, i) {
                  return 'string' != typeof t && 'object' != typeof t ? (this.logger.error('zb.mh.scc params error'), !1) : this.messageHandler.sendCustomCommand(e, t, r, i);
              }, t.prototype.onRecvCustomCommand = function(e, t, r) {
              }, t.prototype.updateStreamExtraInfo = function(e, t) {
                  return this.streamHandler.updateStreamExtraInfo(e, t);
              }, t.prototype.onStreamUrlUpdate = function(e, t, r) {
              }, t.prototype.onStreamUpdated = function(e, t) {
              }, t.prototype.onStreamUpdatedCustomer = function(e, t) {
              }, t.prototype.onStreamExtraInfoUpdated = function(e) {
              }, t.prototype.onPlayStateUpdate = function(e, t, r) {
              }, t.prototype.onVideoSizeChanged = function(e, t, r) {
              }, t.prototype.onPlayQualityUpdate = function(e, t) {
              }, t.prototype.onPublishStateUpdate = function(e, t, r) {
              }, t.prototype.onPublishStateUpdateCustomer = function(e, t, r) {
              }, t.prototype.onPublishQualityUpdate = function(e, t) {
              }, t.prototype.onDisconnect = function(e) {
              }, t.prototype.onTempBroken = function() {
              }, t.prototype.onReconnect = function() {
              }, t.prototype.onKickOut = function(e) {
              }, t.getCurrentVersion = function() {
                  return s.PROTO_VERSION;
              }, t;
          }(n.Common);
      t.BaseCenter = f;
  }, function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var i = r(0), o = function() {
          function e() {
          }

          return e.prototype.onPlayStateUpdateHandle = function(e, t, r) {
              1 == e && this.stopPlayingStream(t), this.onPlayStateUpdate(e, t, r), this.onPublishStateUpdateCustomer(e, t, r);
          }, e.prototype.onPublishStateUpdateHandle = function(e, t, r) {
              var o = this;
              0 == e ? this.stateCenter.publishStreamList[t] && (this.stateCenter.publishStreamList[t].state == i.ENUM_PUBLISH_STREAM_STATE.tryPublish ? (this.stateCenter.publishStreamList[t].state = i.ENUM_PUBLISH_STREAM_STATE.update_info, this.streamHandler.updateStreamCreated(t, this.stateCenter.publishStreamList[t].extra_info, function(e) {
                  o.stateCenter.publishStreamList[t] && o.stateCenter.publishStreamList[t].state == i.ENUM_PUBLISH_STREAM_STATE.update_info && (o.stateCenter.publishStreamList[t].state = i.ENUM_PUBLISH_STREAM_STATE.stop, o.onPublishStateUpdate(1, t, e), o.stopPublishingStream(t));
              })) : this.WebrtcOnPublishStateUpdateHandle(e, t, r)) : (this.onPublishStateUpdate(e, t, r), 1 == e && this.stopPublishingStream(t));
          }, e.prototype.resetStreamCenter = function() {
              if (this.stateCenter.customUrl && (this.stateCenter.customUrl = null), this.streamCenter.reset(), !this.socketCenter.isDisConnect()) for (var e in this.stateCenter.publishStreamList) this.stateCenter.publishStreamList[e].state == i.ENUM_PUBLISH_STREAM_STATE.publishing && this.streamHandler.updateStreamDeleted(e);
          }, e.prototype.handleFetchWebRtcUrlRsp = function(e) {
              if (e.body.code && 0 !== e.body.code) this.logger.error('cb.cm.hfwur error ' + e.body.code + ' ' + e.body.message); else if (e.body.stream_url_info && 0 != e.body.stream_url_info.length && e.body.stream_url_info.ip_infos && 0 != e.body.stream_url_info.ip_infos.length) {
                  var t = e.body.stream_id, r = [], i = e.body.stream_url_info.stream_url,
                      o = e.body.stream_url_info.ip_infos, n = /^ws(s)?:\/\/(.*?)\//;
                  if (o.forEach(function(e) {
                      var t = e.ip_address + ':' + e.port;
                      r.push(i.replace(n.exec(i)[2], t));
                  }), this.stateCenter.publishSeq.includes(e.header.seq)) this.stateCenter.publishStreamList[t] ? this.streamCenter.startPublishingStream(t, r) : this.logger.error('cb.cm.hfwur no streamid to publish'); else if (this.stateCenter.playSeq.includes(e.header.seq)) {
                      for (var s = !1, a = 0; a < this.stateCenter.streamList.length; a++) if (this.stateCenter.streamList[a].stream_id === t) {
                          s = !0;
                          break;
                      }
                      0 == s && this.logger.warn('cb.cm.hfwur cannot find stream, continue to play'), this.streamCenter.startPlayingStream(t, r);
                  }
              } else this.logger.error('cb.cm.hfwur no stream info');
          }, e;
      }();
      t.Common = o;
  }, function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var i = r(0), o = function() {
          function e(e, t) {
              var r = this;
              this.cmdSeq = 0, this.responseRouters = {}, this.logger = e, this.stateCenter = t, this.responseRouters = {
                  'zegochat_js.push_user_kickout': function(e) {
                      r.handleHallKickout(e);
                  }, 'zegochat_js.push_room_kickout': function(e) {
                      r.handlePushKickout(e);
                  }, 'zegochat_js.push_room_custommsg_req': function(e) {
                      r.handlePushCustomMsg(e);
                  }, 'zegochat_js.push_room_im_chat_req': function(e) {
                      r.handlePushRoomMsg(e);
                  }, 'zegochat_js.push_room_userlist_update_req': function(e) {
                      r.handlePushUserStateUpdateMsg(e);
                  }, push_merge_message: function(e) {
                      r.handlePushMergeMsg(e);
                  }, trans: function(e) {
                      r.handleTransRsp(e);
                  }, push_trans: function(e) {
                      r.handlePushTransMsg(e);
                  },
              };
          }

          return e.prototype.handleHallKickout = function(e) {
          }, e.prototype.handlePushKickout = function(e) {
          }, e.prototype.handlePushCustomMsg = function(e) {
          }, e.prototype.handlePushRoomMsg = function(e) {
          }, e.prototype.handlePushUserStateUpdateMsg = function(e) {
          }, e.prototype.handlePushMergeMsg = function(e) {
          }, e.prototype.handlePushTransMsg = function(e) {
          }, e.prototype.handleBigImMsgRsp = function(e) {
          }, e.prototype.handleTransRsp = function(e) {
              if (this.stateCenter.isLogin()) if (0 == e.body.code) {
                  var t = e.body.trans_type;
                  this.stateCenter.transSeqMap[t] ? (this.stateCenter.transSeqMap[t].seq = e.body.trans_seq, this.logger.debug('zb.sc.htr trans ' + t + ' seq ' + e.body.trans_seq)) : this.logger.error('zb.sc.htr cannot match send info');
              } else this.logger.error('zb.sc.htr trans send error ' + e.body.code); else this.logger.error('zb.sc.htr not login');
          }, e.prototype.handleBizChannelRspCallback = function(e, t) {
              0 === e.body.code ? null != t.success && t.success(e.header.seq, e.body.cmd, e.body.rsp_body) : null != t.error && t.error(e.body.code, e.header.seq, e.body.rsp_body);
          }, e.prototype.registerRouter = function(e, t) {
              this.responseRouters[e] = t;
          }, e.prototype.getSocket = function(e) {
              return null;
          }, e.prototype.getHeaderV2 = function(e) {
              return {
                  Protocol: 'req_v2',
                  cmd: e,
                  appid: this.stateCenter.appid,
                  seq: ++this.cmdSeq,
                  user_id: this.stateCenter.userid,
                  session_id: this.stateCenter.sessionid || '',
                  room_id: this.stateCenter.roomid || '',
              };
          }, e.prototype.getHeader = function(e) {
              return {
                  cmd: e,
                  seq: ++this.cmdSeq,
                  timestamp: this.stateCenter.timeStamp || Math.ceil((new Date).getTime() / 1e3) + '',
                  app_id: this.stateCenter.appid,
                  user_uid: this.stateCenter.userid || '0',
                  session_id: this.stateCenter.sessionid || '0',
              };
          }, e.prototype.sendMessage = function(e, t, r, o) {
              if (this.logger.debug('zb.sc.sm call ' + e), this.isDisConnect()) return this.logger.error('zb.sc.sm error  ' + e), -1;
              var n = 'V1' === i.ROOMVERSION ? this.getHeader(e) : this.getHeaderV2(e), s = { header: n, body: t };
              if (null == r && (r = null), null == o && (o = null), null != r || null != o) {
                  var a = { data: s, seq: n.seq, deleted: !1, time: Date.parse(new Date + ''), success: r, error: o },
                      c = this.stateCenter.sendCommandList.push(a);
                  this.stateCenter.sendCommandMap[a.seq] = c;
              }
              return this.websocket.send(JSON.stringify(s)), this.logger.debug('zb.sc.sm success'), n.seq;
          }, e.prototype.sendCustomMessage = function(e, t, r, o) {
              if (this.logger.debug('zb.sc.scm call'), this.isDisConnect()) return this.logger.error('zb.sc.scm error'), !1;
              var n = 'V1' === i.ROOMVERSION ? this.getHeader(e) : this.getHeaderV2(e), s = { header: n, body: t },
                  a = JSON.stringify(s);
              null == r && (r = null), null == o && (o = null);
              var c = { data: s, seq: n.seq, deleted: !1, time: Date.parse(new Date + ''), success: r, error: o },
                  d = this.stateCenter.sendDataList.push(c);
              return this.stateCenter.sendDataMap[c.seq] = d, this.websocket.send(a), this.logger.debug('zb.sc.scm success seq: ', n.seq), !0;
          }, e.prototype.isDisConnect = function() {
              return !this.websocket || 1 !== this.websocket.readyState;
          }, e.prototype.closeSocket = function() {
              this.websocket && (this.logger.info('zb.sc.cs close websocket'), this.websocket.onclose = null, this.websocket.onerror = null, this.websocket.close(), this.websocket = null);
          }, e.prototype.createSocket = function(e) {
              this.websocket = this.getSocket(e);
          }, e.prototype.openHandler = function(e) {
              this.websocket.onopen = e;
          }, e.prototype.closeHandler = function(e) {
              this.websocket.onclose = e;
          }, e.prototype.errorHandler = function() {
              var e = this;
              this.websocket.onerror = function(t) {
                  e.logger.error('zb.sc.oe msg=' + JSON.stringify(t));
              };
          }, e.prototype.checkResponse = function(e) {
              var t = e.header.app_id !== this.stateCenter.appid || e.header.session_id !== this.stateCenter.sessionid || this.stateCenter.hallState !== i.ENUM_RUN_STATE.login;
              return t && this.logger.error('zb.sc.crp check session fail.'), t;
          }, e.prototype.responseHandler = function() {
              var e = this;
              this.websocket.onmessage = function(t) {
                  var r = JSON.parse(t.data);
                  e.logger.info('zb.sc.ws.rph jsonmsg= ', r.header.cmd), e.logger.info('zb.sc.ws.rph jsonmsg= ', t.data), 'zegochat_js.user_login_ws_rsp' !== r.header.cmd ? 'zegochat_js.user_logout_rsp' !== r.header.cmd ? 'zegochat_js.room_enter_rsp' !== r.header.cmd ? 'zegochat_js.room_quit_rsp' !== r.header.cmd ? e.stateCenter.isLogin() ? e.checkResponse(r) ? e.logger.error('zb.sc.ws.rph check session fail.') : (e.handleSendCommandMsgRsp(r), e.logger.info('zb.sc.ws.rph cmd=' + r.header.cmd + ',function=' + !!e.responseRouters[r.header.cmd]), e.responseRouters[r.header.cmd] && e.responseRouters[r.header.cmd](r)) : e.logger.warn('zb.sc.ws.rph  already logout') : e.responseRouters.leaveRoom(r, e.cmdSeq) : e.responseRouters.enterRoom(r, e.cmdSeq) : e.responseRouters.hallLogout(r, e.cmdSeq) : e.responseRouters.hallLogin(r, e.cmdSeq);
              };
          }, e.prototype.handleSendCommandMsgRsp = function(e) {
              this.logger.debug('zb.sc.hscmr call');
              var t, r = this.stateCenter.sendCommandMap[e.header.seq];
              null != r && ('zegochat_js.user_login_ws_req' == (t = r._data).data.header.cmd ? this.logger.debug('zb.sc.hscmr don\'t check ' + t.data.header.cmd) : 0 === e.body.code ? null != t.success && t.success(e.header.seq) : null != t.error && t.error(e.body.messsage, e.header.seq), delete this.stateCenter.sendCommandMap[e.header.seq], this.stateCenter.sendCommandList.remove(r)), this.logger.debug('zb.sc.hscmr call success');
          }, e;
      }();
      t.SocketCenter = o;
  }, function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var i = r(0), o = r(1), n = function() {
          function e(e, t, r) {
              this.logger = e, this.socketCenter = r, this.stateCenter = t;
          }

          return e.prototype.setRunState = function(e) {
              this.logger.debug('zb.rh.srs old=' + this.stateCenter.runState + ', new=' + e), this.stateCenter.lastRunState = this.stateCenter.runState, this.stateCenter.runState = e;
          }, e.prototype.resetTryLogin = function() {
              this.logger.debug('zb.rh.rtl call'), clearTimeout(this.stateCenter.tryLoginTimer), this.stateCenter.tryLoginTimer = null, this.stateCenter.tryLoginCount = 0, this.logger.debug('zb.rh.rtl call success');
          }, e.prototype.resetBigRoomInfo = function() {
              this.stateCenter.transSeqMap = {}, this.stateCenter.realyMessageList = [], this.stateCenter.relayTimer && (clearTimeout(this.stateCenter.relayTimer), this.stateCenter.relayTimer = null), this.stateCenter.bigImLastTimeIndex = 0, this.stateCenter.bigIMmessageList = [], this.stateCenter.bigImCallbackMap = {}, this.stateCenter.bigImTimer && (clearTimeout(this.stateCenter.bigImTimer), this.stateCenter.bigImTimer = null), this.stateCenter.serverTimeOffset = 0, this.stateCenter.datiTimeWindow = 0, this.stateCenter.bigimTimeWindow = 0;
          }, e.prototype.resetRoom = function() {
              var e = this;
              if (this.logger.debug('zb.rh.rr call'), this.resetTryLogin(), this.resetRoomCallBack(), this.stateCenter.streamList = [], this.stateCenter.streamQuerying = !1, this.stateCenter.publishStreamList = {}, this.stateCenter.publishSeq = [], this.stateCenter.playSeq = [], this.stateCenter.joinLiveCallbackMap = {}, this.stateCenter.joinLiveRequestMap = {}, this.stateCenter.streamUrlMap = {}, this.resetBigRoomInfo(), this.logger.debug('zb.rh.rr call send logout=', this.stateCenter.sessionid), '0' !== this.stateCenter.sessionid) {
                  var t = {
                      room_header: {
                          room_id: this.stateCenter.roomid,
                          room_sid: this.stateCenter.roomSid,
                          room_user_session_id: this.stateCenter.roomSessionId,
                      },
                  };
                  this.socketCenter.registerRouter('leaveRoom', function(t) {
                      e.handleLogoutRsp(t);
                  }), this.socketCenter.sendMessage('zegochat_js.room_quit_req', t);
              }
              this.stateCenter.roomSid = '0', this.stateCenter.roomSessionId = '0', this.setRunState(i.ENUM_RUN_STATE.logout), this.logger.setSessionInfo(this.stateCenter.appid, this.stateCenter.roomid, this.stateCenter.userid, this.stateCenter.idName, this.stateCenter.sessionid, i.PROTO_VERSION, this.stateCenter.deviceId), this.logger.debug('zb.rh.rr call success');
          }, e.prototype.resetRoomCallBack = function() {
          }, e.prototype.onDisconnect = function(e) {
          }, e.prototype.loginSuccessCallBack = function(e, t) {
          }, e.prototype.onGetTotalUserList = function(e, t) {
          }, e.prototype.login = function(e, t, r, n) {
              this.logger.setSessionInfo(this.stateCenter.appid, e, '', this.stateCenter.idName, '', i.PROTO_VERSION, this.stateCenter.deviceId), this.logger.info('zb.rh.lg call:', e), this.stateCenter.isLogin() ? (this.stateCenter.runState !== i.ENUM_RUN_STATE.logout && (this.logger.debug('zb.rh.lg reset'), this.setRunState(i.ENUM_RUN_STATE.logout), this.resetRoom()), this.logger.debug('zb.rh.lg begin'), this.setRunState(i.ENUM_RUN_STATE.trylogin), this.stateCenter.roomid = e, this.stateCenter.role = t, o.ClientUtil.registerCallback('enterRoom', {
                  success: r,
                  error: n,
              }, this.stateCenter.callbackList), this.resetTryLogin(), this.tryLogin(), this.logger.info('zb.rh.lg call success')) : n({
                  code: '',
                  msg: 'no login hall before entering room',
              });
          }, e.prototype.getRoomInfo = function(e) {
              var t = this;
              if (this.stateCenter.runState === i.ENUM_RUN_STATE.login) {
                  o.ClientUtil.registerCallback('getRoomInfo', {
                      success: e,
                      error: e,
                  }, this.stateCenter.callbackList), this.socketCenter.registerRouter('zegochat_js.room_info_rsp', function(e) {
                      t.handleRoomInfoRsp(e);
                  });
                  var r = {
                      room_header: {
                          room_id: this.stateCenter.roomid,
                          room_sid: this.stateCenter.roomSid || '0',
                          room_user_session_id: this.stateCenter.roomSessionId || '0',
                      },
                  };
                  this.socketCenter.sendMessage('zegochat_js.room_info_req', r);
              } else this.logger.error('zn.rh.gri no enter room');
          }, e.prototype.loginBodyData = function() {
              return null;
          }, e.prototype.tryLogin = function() {
              var e = this;
              if (this.logger.debug('zb.rh.tl call'), this.stateCenter.runState === i.ENUM_RUN_STATE.trylogin) {
                  if (++this.stateCenter.tryLoginCount > i.MAX_TRY_LOGIN_COUNT) {
                      this.logger.error('zb.rh.tl fail times limit');
                      var t = this.stateCenter.lastRunState;
                      return this.setRunState(i.ENUM_RUN_STATE.logout), this.resetRoom(), void (t == i.ENUM_RUN_STATE.login ? (this.logger.error('zb.rh.tl fail and disconnect'), this.onDisconnect(i.sdkErrorList.LOGIN_DISCONNECT)) : (this.logger.info('zb.rh.tl fail and callback user'), o.ClientUtil.actionErrorCallback('enterRoom', this.stateCenter.callbackList)(i.sdkErrorList.LOGIN_TIMEOUT)));
                  }
                  this.stateCenter.startConnceTime = (new Date).getTime(), console.warn('start enterRoom', this.stateCenter.startConnceTime), this.socketCenter.registerRouter('enterRoom', function(t, r) {
                      e.handleLoginRsp(t, r);
                  });
                  var r = this.loginBodyData();
                  this.logger.info('zb.rh.tl use current websocket and sent login'), this.socketCenter.sendMessage('zegochat_js.room_enter_req', r), this.stateCenter.tryLoginTimer = setTimeout(function() {
                      e.tryLogin();
                  }, i.TRY_LOGIN_INTERVAL[this.stateCenter.tryLoginCount % i.MAX_TRY_LOGIN_COUNT]), this.logger.info('zb.rh.tl call success');
              } else this.logger.error('zb.rh.tl state error');
          }, e.prototype.handleRoomInfoRsp = function(e) {
              if (this.logger.debug('zb.rh.hrir call'), this.stateCenter.runState === i.ENUM_RUN_STATE.login) return e.body.code && 0 !== e.body.code ? (this.logger.error('zb.rh.hrir server error=', e.body.code + ' ' + e.body.message), void o.ClientUtil.actionErrorCallback('getRoomInfo', this.stateCenter.callbackList)({
                  code: e.body.code,
                  msg: e.body.message,
              })) : (o.ClientUtil.actionSuccessCallback('getRoomInfo', this.stateCenter.callbackList)(null, e.body.streams_info), void this.logger.info('zb.rh.hrir call success'));
              this.logger.error('zb.rh.hrir state error');
          }, e.prototype.handleLoginRsp = function(e, t) {
              if (this.logger.debug('zb.rh.hlr call'), this.stateCenter.runState === i.ENUM_RUN_STATE.trylogin) {
                  if (e.header.seq === t) return e.body.code && 0 !== e.body.code ? (this.handleLoginFail(e), void this.logger.error('zb.rh.hlr server error=', e.body.code + ' ' + e.body.message)) : (this.handleLoginSuccess(e), void this.logger.info('zb.rh.hlr call success.'));
                  this.logger.error('zb.rh.hlr in wrong seq, local=', t, ',recv=', e.header.seq);
              } else this.logger.error('zb.rh.hlr state error');
          }, e.prototype.handleLoginFail = function(e) {
              if (this.logger.debug('zb.rh.hlf call'), o.ClientUtil.isKeepTryLogin(e.body.code)) this.logger.warn('zb.rh.hlf KeepTry true'); else {
                  var t = this.stateCenter.lastRunState;
                  this.setRunState(i.ENUM_RUN_STATE.logout), this.resetRoom(), t === i.ENUM_RUN_STATE.login ? (this.logger.info('zb.rh.hlf callback disconnect'), this.onDisconnect(e.body.code)) : (this.logger.info('zb.rh.hlf callback error'), o.ClientUtil.actionErrorCallback('enterRoom', this.stateCenter.callbackList)({
                      code: e.body.code,
                      msg: e.body.message,
                  })), this.logger.debug('zb.rh.hlf call success');
              }
          }, e.prototype.handleLoginSuccess = function(e) {
              this.stateCenter.startloginSucTime = (new Date).getTime(), console.warn('enterRoom suc', this.stateCenter.startloginSucTime, this.stateCenter.startloginSucTime - this.stateCenter.startloginTime, this.stateCenter.startloginSucTime - this.stateCenter.startConnceTime), this.logger.info('zb.rh.hls call');
              var t = this.stateCenter.lastRunState;
              this.setRunState(i.ENUM_RUN_STATE.login), this.stateCenter.timeStamp = e.header.timeStamp, this.stateCenter.roomSid = e.body.room_header.room_sid, this.stateCenter.roomSessionId = e.body.room_header.room_user_session_id, this.stateCenter.userSeq = e.body.userlist_seq, this.logger.setSessionInfo(this.stateCenter.appid, this.stateCenter.roomid, this.stateCenter.userid, this.stateCenter.idName, this.stateCenter.sessionid, i.PROTO_VERSION, this.stateCenter.deviceId), this.resetTryLogin(), this.loginSuccessCallBack(t, e);
          }, e.prototype.logout = function() {
              return this.logger.debug('zb.rh.lo call'), this.stateCenter.runState === i.ENUM_RUN_STATE.logout ? (this.logger.warn('zb.rh.lo at logout'), !1) : (this.resetRoom(), this.logger.info('zb.rh.lo call success'), !0);
          }, e.prototype.setUserStateUpdate = function(e) {
              return this.logger.debug('zb.rh.su call'), 'boolean' != typeof e ? (this.logger.info('zb.rh.su param error'), !1) : (this.stateCenter.userStateUpdate = e, this.logger.info('zb.rh.su call success ' + e), !0);
          }, e.prototype.fetchUserList = function() {
              this.logger.debug('zb.rh.ful call'), this.stateCenter.userQuerying ? this.logger.warn('zb.rh.ful is already querying') : (this.stateCenter.userQuerying = !0, this.stateCenter.userTempList = [], this.fetchUserListWithPage(0), this.logger.info('zb.rh.ful the first time call'));
          }, e.prototype.fetchUserListWithPage = function(e) {
              var t = this;
              this.logger.debug('zb.rh.fulwp call'), this.socketCenter.registerRouter('zegochat_js.room_userlist_rsp', function(e) {
                  t.handleFetchUserListRsp(e);
              }), this.socketCenter.sendMessage('zegochat_js.room_userlist_req', {
                  room_header: {
                      room_id: this.stateCenter.roomid,
                      room_sid: this.stateCenter.roomSid,
                      room_user_session_id: this.stateCenter.roomSessionId,
                  }, mark: '0',
              }), this.logger.info('zb.rh.fulwp call success');
          }, e.prototype.handleFetchUserListRsp = function(e) {
              if (this.logger.debug('zb.rh.hfulr call'), e.body.code && 0 !== e.body.code) return this.stateCenter.userQuerying = !1, void this.logger.info('zb.rh.hfulr fetch error ' + e.body.code + ' ' + e.body.message);
              if (this.stateCenter.userStateUpdate) {
                  this.stateCenter.userTempList = this.stateCenter.userTempList.concat(e.body.users), this.stateCenter.userSeq = e.body.userlist_seq, this.logger.info('zb.rh.hfulr set user Seq ' + this.stateCenter.userSeq);
                  for (var t = [], r = 0; r < this.stateCenter.userTempList.length; r++) {
                      var i = {
                          idName: this.stateCenter.userTempList[r].user_id,
                          nickName: this.stateCenter.userTempList[r].user_name,
                          role: this.stateCenter.userTempList[r].role,
                      };
                      t.push(i);
                  }
                  this.stateCenter.userQuerying = !1, this.onGetTotalUserList(this.stateCenter.roomid, t), this.stateCenter.userTempList = [], this.logger.info('zb.rh.hfulr call success user_list ' + t + ' count ' + t.length);
              }
          }, e.prototype.handleLogoutRsp = function(e) {
              this.logger.debug('zb.rh.hlor result=', e.body.code);
          }, e.prototype.handlePushUserStateUpdateMsg = function(e) {
              if (this.logger.info('zb.rh.hpus call'), this.stateCenter.isLogin()) if (this.stateCenter.userStateUpdate) {
                  if (this.stateCenter.userSeq + e.body.user_actions.length !== e.body.user_list_seq) return this.logger.warn('zb.rh.hpus fetch new userlist ' + this.stateCenter.userSeq, NaN + e.body.user_list_seq), void this.fetchUserList();
                  this.stateCenter.userSeq = e.body.user_list_seq, this.logger.debug('zb.rh.hpus push userSeq ' + this.stateCenter.userSeq);
                  for (var t = [], r = 0; r < e.body.user_actions.length; r++) {
                      var i = {
                          action: e.body.user_actions[r].action,
                          idName: e.body.user_actions[r].user_id,
                          nickName: e.body.user_actions[r].user_name,
                          role: e.body.user_actions[r].role,
                          loginTime: e.body.user_actions[r].login_time,
                      };
                      t.push(i);
                  }
                  this.onUserStateUpdate(e.body.room_pushheader.room_id, t), this.logger.info('zb.rh.hpus call success');
              } else this.logger.error('zb.rh.hpus no userStateUpdate flag'); else this.logger.error('zb.rh.hpus not login');
          }, e.prototype.onUserStateUpdate = function(e, t) {
          }, e;
      }();
      t.RoomHandler = n;
  }, function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var i = r(0), o = r(1), n = function() {
          function e(e, t, r) {
              this.logger = e, this.socketCenter = r, this.stateCenter = t;
          }

          return e.prototype.onStreamUpdated = function(e, t) {
          }, e.prototype.onStreamExtraInfoUpdated = function(e) {
          }, e.prototype.handleStreamStart = function(e, t) {
              var r = this;
              if (this.stateCenter.streamQuerying = !1, this.socketCenter.registerRouter('zegochat_js.push_room_stream_update_req', function(e) {
                  r.handlePushStreamUpdateMsg(e);
              }), e == i.ENUM_RUN_STATE.login) this.logger.info('zb.sh.hss recover from disconnect so call streamupdate'), this.handleFullUpdateStream(t.body.stream_seq, t.body.streams_info || []); else {
                  this.logger.info('zb.sh.hss success callback user'), this.stateCenter.streamList = t.body.streams_info || [], this.stateCenter.streamSeq = t.body.stream_seq;
                  for (var n = 0; n < this.stateCenter.streamList.length; n++) this.stateCenter.streamList[n].user_id == this.stateCenter.idName && (this.updateStreamDeleted(this.stateCenter.streamList[n].stream_id), this.stateCenter.streamList.splice(n, 1));
                  var s = this.makeCallbackStreamList(this.stateCenter.streamList);
                  o.ClientUtil.actionSuccessCallback('enterRoom', this.stateCenter.callbackList)(s);
              }
          }, e.prototype.onPublishStateUpdate = function(e, t, r) {
          }, e.prototype.updateStreamInfo = function(e, t, r) {
              var i = this;
              void 0 === t && (t = ''), this.logger.debug('zb.sh.usi call');
              var o = '', n = null;
              if (this.stateCenter.streamList.forEach(function(t, r) {
                  t.stream_id === e && (n = r);
              }), this.stateCenter.publishStreamList[e]) o = this.stateCenter.publishStreamList[e].sid; else {
                  if (!n) return void this.logger.error('zb.sh.usi stream is not exist');
                  o = this.stateCenter.streamList[n].stream_sid;
              }
              var s = {
                  room_header: {
                      room_id: this.stateCenter.roomid,
                      room_sid: this.stateCenter.roomSid || '0',
                      room_user_session_id: this.stateCenter.roomSessionId || '0',
                  }, stream_id: e, stream_sid: o, extra_info: t, title: '',
              };
              this.socketCenter.registerRouter('zegochat_js.room_stream_update_rsp', function(e) {
                  i.handleStreamUpdateRsp(e);
              }), this.socketCenter.sendMessage('zegochat_js.room_stream_update_req', s, void 0, r), this.logger.info('zb.sh.usi call success ');
          }, e.prototype.handleStreamUpdateRsp = function(e) {
              if (this.stateCenter.isLogin()) if (e.body.code && 0 !== e.body.code) this.logger.error('zb.sh.hsur stream update error ' + e.body.code + ' ' + e.body.message); else {
                  this.logger.info('zb.sh.hsur stream seq ' + this.stateCenter.streamSeq + ' server seq ' + e.body.stream_seq), this.stateCenter.streamSeq = e.body.stream_seq;
                  for (var t = 0; t < e.body.stream_info.length; t++) {
                      var r = e.body.stream_info[t].stream_id;
                      if (!this.stateCenter.publishStreamList[r]) return void this.logger.info('hsur.0 stream is not exist');
                      this.stateCenter.publishStreamList[r].state == i.ENUM_PUBLISH_STREAM_STATE.update_info && (this.stateCenter.publishStreamList[r].state = i.ENUM_PUBLISH_STREAM_STATE.publishing, this.onPublishStateUpdate(0, r, 0));
                  }
              } else this.logger.error('zb.sh.hsur not login');
          }, e.prototype.handleFetchStreamListRsp = function(e) {
              this.logger.info('zb.sh.hfslr call'), this.stateCenter.streamQuerying = !1, 0 === e.body.code ? this.stateCenter.streamSeq !== e.body.stream_seq ? (this.handleFullUpdateStream(e.body.stream_seq, e.body.stream_info), this.logger.debug('zb.sh.hfslr call success')) : this.logger.info('zb.sh.hfslr same seq') : this.logger.info('zb.sh.hfslr server error=', e.body.code);
          }, e.prototype.handleFullUpdateStream = function(e, t) {
              var r = this;
              this.logger.debug('zb.sh.hfus call'), this.stateCenter.streamSeq = e, this.logger.debug('zb.sh.hfus server seq ' + this.stateCenter.streamSeq), o.ClientUtil.mergeStreamList(this.logger, this.stateCenter.idName, this.stateCenter.streamList, t, function(e, t, o) {
                  0 !== e.length && (r.logger.debug('zb.sh.hfus callback addstream'), r.onStreamUpdated(i.ENUM_STREAM_UPDATE_TYPE.added, r.makeCallbackStreamList(e))), 0 !== t.length && (r.logger.debug('zb.sh.hfus callback delstream'), r.onStreamUpdated(i.ENUM_STREAM_UPDATE_TYPE.deleted, r.makeCallbackStreamList(t))), 0 !== o.length && (r.logger.debug('zb.sh.hfus callback updatestream'), r.onStreamExtraInfoUpdated(r.makeCallbackStreamList(o)));
              }), this.logger.info('zb.sh.hfus call success');
          }, e.prototype.handlePushStreamUpdateMsg = function(e) {
              if (this.logger.info('zb.sh.hpsum call'), e.body.streams_info && 0 !== e.body.streams_info.length) {
                  if (e.body.streams_info.length + this.stateCenter.streamSeq !== e.body.stream_seq) return this.logger.info('zb.sh.hpsum call updatestream'), void this.fetchStreamList();
                  switch (this.stateCenter.streamSeq = e.body.stream_seq, e.body.stream_cmd + 12e3) {
                      case i.ENUM_STREAM_UPDATE_CMD.added:
                          this.handleAddedStreamList(e.body.streams_info);
                          break;
                      case i.ENUM_STREAM_UPDATE_CMD.deleted:
                          this.handleDeletedStreamList(e.body.streams_info);
                          break;
                      case i.ENUM_STREAM_UPDATE_CMD.updated:
                          this.handleUpdatedStreamList(e.body.streams_info);
                  }
                  this.logger.info('zb.sh.hpsum call success');
              } else this.logger.info('zb.sh.hpsum, emtpy list');
          }, e.prototype.handleAddedStreamList = function(e) {
              this.logger.debug('zb.sh.hasl call');
              for (var t, r = [], o = 0; o < e.length; o++) if (e[o].anchor_id_name != this.stateCenter.idName) {
                  t = !1;
                  for (var n = 0; n < this.stateCenter.streamList.length; n++) if (e[o].stream_id === this.stateCenter.streamList[n].stream_id) {
                      t = !0;
                      break;
                  }
                  t || r.push(e[o]);
              } else this.logger.debug('hdsl.0 have self stream added');
              if (0 !== r.length) {
                  this.logger.debug('zb.sh.hasl callback addstream');
                  for (var s = 0; s < r.length; s++) this.stateCenter.streamList.push(r[s]);
                  this.onStreamUpdated(i.ENUM_STREAM_UPDATE_TYPE.added, this.makeCallbackStreamList(r));
              }
              this.logger.info('zb.sh.hasl call success');
          }, e.prototype.handleDeletedStreamList = function(e) {
              this.logger.debug('zb.sh.hdsl call');
              for (var t = [], r = 0; r < e.length; r++) if (e[r].anchor_id_name != this.stateCenter.idName) {
                  for (var o = this.stateCenter.streamList.length - 1; o >= 0; o--) if (e[r].stream_id === this.stateCenter.streamList[o].stream_id) {
                      this.stateCenter.streamList.splice(o, 1), t.push(e[r]);
                      break;
                  }
              } else this.logger.debug('zb.sh.hdsl have self stream deleted');
              0 !== t.length && (this.logger.debug('zb.sh.hdsl callback delstream'), this.onStreamUpdated(i.ENUM_STREAM_UPDATE_TYPE.deleted, this.makeCallbackStreamList(t))), this.logger.info('zb.sh.hdsl call');
          }, e.prototype.handleUpdatedStreamList = function(e) {
              this.logger.debug('zb.sh.husl call');
              for (var t = [], r = 0; r < e.length; r++) if (e[r].anchor_id_name != this.stateCenter.idName) {
                  for (var i = 0; i < this.stateCenter.streamList.length; i++) if (e[r].stream_id === this.stateCenter.streamList[i].stream_id) {
                      e[r].extra_info !== this.stateCenter.streamList[i].extra_info && (this.stateCenter.streamList[i] = e[r], t.push(e[r]));
                      break;
                  }
              } else this.logger.debug('hsul.0 have self stream updated');
              0 !== t.length && (this.logger.debug('zb.sh.husl callback updatestream'), this.onStreamExtraInfoUpdated(this.makeCallbackStreamList(t))), this.logger.info('zb.sh.husl call success');
          }, e.prototype.fetchStreamList = function() {
              if (this.logger.info('zb.sh.fsl call'), this.stateCenter.isLogin()) this.logger.info('zb.sh.fsl state error'); else if (this.stateCenter.streamQuerying) this.logger.info('zb.sh.fsl already doing'); else {
                  this.stateCenter.streamQuerying = !0, this.logger.debug('zb.sh.fsl send fetch request');
                  this.socketCenter.registerRouter('stream_info', this.handleFetchStreamListRsp), this.socketCenter.sendMessage('stream_info', { reserve: 0 }), this.logger.debug('zb.sh.fsl call success');
              }
          }, e.prototype.makeCallbackStreamList = function(e) {
              var t = [];
              if (e && e.length > 0) for (var r = 0; r < e.length; r++) {
                  var i = {
                      user_id: e[r].user_id,
                      user_name: e[r].user_name,
                      stream_id: e[r].stream_id,
                      stream_sid: e[r].stream_sid,
                      extra_info: e[r].extra_info,
                      title: e[r].title,
                      stream_ver: e[r].stream_ver,
                  };
                  t.push(i);
              }
              return t;
          }, e.prototype.updateStreamExtraInfo = function(e, t) {
              return this.logger.info('zb.sh.usei call'), e ? 'string' == typeof t && (this.stateCenter.publishStreamList[e] && (this.stateCenter.publishStreamList[e].extra_info = t, this.stateCenter.publishStreamList[e].state >= i.ENUM_PUBLISH_STREAM_STATE.update_info && this.updateStreamInfo(e, t)), !0) : (this.logger.error('zb.sh.usei param error'), !1);
          }, e.prototype.updateStreamCreated = function(e, t, r) {
              var i = this;
              if (this.logger.info('zb.sh.usc call'), e) {
                  var o = {
                      room_header: {
                          room_id: this.stateCenter.roomid,
                          room_sid: this.stateCenter.roomSid || '0',
                          room_user_session_id: this.stateCenter.roomSessionId || '0',
                      }, stream_id: e, extra_info: t, title: '',
                  };
                  this.socketCenter.registerRouter('zegochat_js.room_stream_create_rsp', function(e) {
                      i.handleStreamCreatedRsp(e);
                  }), setTimeout(function() {
                      i.socketCenter.sendMessage('zegochat_js.room_stream_create_req', o, void 0, r);
                  }, 100);
              } else this.logger.error('zb.sh.usc streamid error');
          }, e.prototype.handleStreamCreatedRsp = function(e) {
              if (this.stateCenter.isLogin()) if (e.body.code && 0 !== e.body.code) this.logger.error('zb.sh.hsur stream update error ' + e.body.code + ' ' + e.body.message); else {
                  this.logger.info('zb.sh.hsur stream seq ' + this.stateCenter.streamSeq + ' server seq ' + e.body.stream_seq), this.stateCenter.streamSeq = e.body.stream_seq;
                  var t = e.body.stream_id;
                  this.stateCenter.publishStreamList[t] ? this.stateCenter.publishStreamList[t].state == i.ENUM_PUBLISH_STREAM_STATE.update_info && (this.stateCenter.publishStreamList[t].state = i.ENUM_PUBLISH_STREAM_STATE.publishing, this.stateCenter.publishStreamList[t].sid = e.body.stream_sid, this.stateCenter.publishStreamList[t].ver = e.body.stream_ver, this.onPublishStateUpdate(0, t, 0)) : this.logger.info('hsur.0 stream is not exist');
              } else this.logger.error('zb.sh.hsur not login');
          }, e.prototype.updateStreamDeleted = function(e, t) {
              var r = this;
              if (this.logger.info('zb.sh.usd call'), e) {
                  var i = {
                      room_header: {
                          room_id: this.stateCenter.roomid,
                          room_sid: this.stateCenter.roomSid || '0',
                          room_user_session_id: this.stateCenter.roomSessionId || '0',
                      }, stream_id: e, stream_sid: this.stateCenter.publishStreamList[e].sid,
                  };
                  this.socketCenter.registerRouter('zegochat_js.room_stream_delete_rsp', function(e) {
                      r.handleStreamDeletedRsp(e);
                  }), this.socketCenter.sendMessage('zegochat_js.room_stream_delete_req', i, void 0, t);
              } else this.logger.error('zb.sh.usd streamid error');
          }, e.prototype.handleStreamDeletedRsp = function(e) {
              this.stateCenter.isLogin() ? e.body.code && 0 !== e.body.code ? this.logger.error('zb.sh.hsur stream update error ' + e.body.code + ' ' + e.body.message) : (this.logger.info('zb.sh.hsur stream seq ' + this.stateCenter.streamSeq + ' server seq ' + e.body.stream_seq), this.stateCenter.streamSeq = e.body.stream_seq, delete this.stateCenter.publishStreamList[e.body.stream_id]) : this.logger.error('zb.sh.hsur not login');
          }, e;
      }();
      t.StreamHandler = n;
  }, function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var i = r(0), o = r(1), n = function() {
          function e(e, t, r) {
              this.logger = e, this.socketCenter = r, this.stateCenter = t;
          }

          return e.prototype.resetHeartbeat = function() {
              this.logger.debug('zb.hb.rht call'), clearTimeout(this.stateCenter.heartbeatTimer), this.stateCenter.heartbeatTimer = null, this.stateCenter.tryHeartbeatCount = 0, this.logger.debug('zb.hb.rht call success');
          }, e.prototype.hbLogout = function(e) {
          }, e.prototype.start = function(e) {
              var t = this;
              if (this.logger.debug('zb.hb.sht call'), this.stateCenter.isLogin()) {
                  if (++this.stateCenter.tryHeartbeatCount > 3) return this.logger.error('zb.hb.sht come to try limit'), void this.hbLogout(i.sdkErrorList.HEARTBEAT_TIMEOUT);
                  this.logger.debug('zb.hb.sht send packet');
                  this.socketCenter.registerRouter('zegochat_js.user_hb_rsp', function(e) {
                      t.handleHeartbeatRsp(e);
                  }), this.socketCenter.sendMessage('zegochat_js.user_hb_req', { reserve: 0 }), this.logger.debug('zb.hb.sht call success'), this.stateCenter.heartbeatInterval = e, this.stateCenter.heartbeatTimer = setTimeout(function() {
                      t.start(t.stateCenter.heartbeatInterval);
                  }, this.stateCenter.heartbeatInterval);
              } else this.logger.error('zb.hb.sht state error');
          }, e.prototype.handleHeartbeatRsp = function(e) {
              if (this.logger.debug('zb.hb.hhbr call'), e.body.code && 0 !== e.body.code) return this.logger.error('zb.hb.hhbr call disconnect, server error=', e.body.code + ' ' + e.body.message), void this.hbLogout(o.ClientUtil.getServerError(e.body.code));
              this.stateCenter.tryHeartbeatCount = 0, this.stateCenter.heartbeatInterval = e.body.hb_interval, this.stateCenter.heartbeatInterval < i.MINIUM_HEARTBEAT_INTERVAL && (this.stateCenter.heartbeatInterval = i.MINIUM_HEARTBEAT_INTERVAL), this.stateCenter.sessionid = e.header.session_id, this.stateCenter.timeStamp = e.header.timestamp, this.stateCenter.userid = e.header.user_uid, this.logger.debug('zb.hb.hhbr call success');
          }, e;
      }();
      t.HeartBeatHandler = n;
  }, function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var i = r(1), o = function() {
          function e(e, t, r) {
              this.logger = e, this.socketCenter = r, this.stateCenter = t;
          }

          return e.prototype.sendCustomCommand = function(e, t, r, o) {
              var n = this;
              if (this.logger.debug('zb.mh.scc call'), !this.stateCenter.isLogin()) return this.logger.error('zb.mh.scc state error'), !1;
              if (!e || 0 == e.length) return this.logger.error('zb.mh.scc dstMembers error'), !1;
              'object' == typeof t && (t = JSON.stringify(t));
              var s = {
                  room_header: {
                      room_id: this.stateCenter.roomid,
                      room_sid: this.stateCenter.roomSid || '0',
                      room_user_session_id: this.stateCenter.roomSessionId || '0',
                  }, request_id: this.stateCenter.getRequestId(), msg: t, destids: e,
              };
              return i.ClientUtil.checkCustomCommandParam(s) ? (this.socketCenter.registerRouter('zegochat_js.room_custommsg_rsp', function(e) {
                  n.handleSendCustomMsgRsp(e);
              }), this.socketCenter.sendCustomMessage('zegochat_js.room_custommsg_req', s, r, o), this.logger.info('zb.mh.scc call success'), !0) : (this.logger.info('zb.mh.scc param error'), !1);
          }, e.prototype.handleSendCustomMsgRsp = function(e) {
              this.logger.debug('zb.mh.hscmrcall');
              var t, r = this.stateCenter.sendDataMap[e.header.seq];
              null != r ? ('zegochat_js.room_custommsg_req' != (t = r._data).data.header.cmd ? this.logger.error('zb.mh.hscmrcmd wrong' + t.data.header.cmd) : e.body.code && 0 !== e.body.code ? t.error && t.error(e.body.msg, e.header.seq, t.data.body.msg) : t.success && t.success(e.header.seq, t.data.body.msg), delete this.stateCenter.sendDataMap[e.header.seq], this.stateCenter.sendDataList.remove(r)) : this.logger.error('zb.mh.hscmrno found seq=' + e.header.seq), this.logger.debug('zb.mh.hscmr  call success');
          }, e.prototype.handlePushCustomMsg = function(e) {
              this.logger.debug('zb.mh.hpcm submsg=', e.body.msg), this.onRecvCustomCommand(e.body.from_user_id, e.body.from_user_name, e.body.msg);
          }, e.prototype.onRecvCustomCommand = function(e, t, r) {
          }, e;
      }();
      t.MessageHandler = o;
  }, function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var i = r(0), o = r(1), n = function() {
          function e(e, t, r) {
              this.logger = e, this.socketCenter = r, this.stateCenter = t;
          }

          return e.prototype.setHallState = function(e) {
              this.logger.debug('zb.hh.srs old=' + this.stateCenter.hallState + ', new=' + e), this.stateCenter.lastHallState = this.stateCenter.hallState, this.stateCenter.hallState = e;
          }, e.prototype.resetHallTryLogin = function() {
              this.logger.debug('zb.hh.rtl call'), clearTimeout(this.stateCenter.tryHallLoginTimer), this.stateCenter.tryHallLoginTimer = null, this.stateCenter.tryHallLoginCount = 0, this.logger.debug('zb.hh.rtl call success');
          }, e.prototype.resetHall = function() {
              var e = this;
              if (this.logger.debug('zb.hh.rh call'), this.resetHallTryLogin(), this.resetHallCallBack(), this.stateCenter.cmdCallback = {}, this.logger.debug('zb.hh.rh call send logout=', this.stateCenter.sessionid), '0' !== this.stateCenter.sessionid) {
                  var t = { user_id: this.stateCenter.idName || 0 };
                  this.socketCenter.registerRouter('hallLogout', function(t) {
                      e.handleLogoutRsp(t);
                  }), this.socketCenter.sendMessage('zegochat_js.user_logout_req', t);
              }
              this.socketCenter.closeSocket(), this.setHallState(i.ENUM_RUN_STATE.logout), this.stateCenter.userid = '0', this.stateCenter.sessionid = '0', this.logger.setSessionInfo(this.stateCenter.appid, '', this.stateCenter.userid, '', this.stateCenter.sessionid, i.PROTO_VERSION, this.stateCenter.deviceId), this.logger.debug('zb.hh.rh call success');
          }, e.prototype.resetHallCallBack = function() {
          }, e.prototype.onDisconnect = function(e) {
          }, e.prototype.onTempBroken = function() {
          }, e.prototype.onReconnect = function() {
          }, e.prototype.loginSuccessCallBack = function(e, t) {
          }, e.prototype.dispatchConnecnt = function() {
              var e = this;
              this.logger.info('zc.hh.dc call');
              var t = this.dispatchBodyData(), r = this.stateCenter.dispatchServer;
              if (XMLHttpRequest) {
                  var i = new XMLHttpRequest;
                  i.open('POST', r), i.setRequestHeader('Content-type', 'application/json; charset=utf-8'), i.onreadystatechange = function() {
                      if (200 == i.status && 4 == i.readyState && i.responseText && '' !== i.responseText) {
                          var t = JSON.parse(i.responseText);
                          t.server_addrs && 0 !== t.server_addrs.length && (e.stateCenter.server = t.server_addrs[0], e.stateCenter.sessionExpire = t.session_expire + '', e.resetHallTryLogin(), e.tryHallLogin(), e.logger.info('zb.hh.lg call success'));
                      }
                  }, i.send(JSON.stringify(t));
              } else wx.request({
                  url: r,
                  header: { 'Content-Type': 'application/json' },
                  method: 'POST',
                  data: JSON.stringify(t),
                  dataType: 'json',
                  success: function(t) {
                      t.data.server_addrs && 0 !== t.data.server_addrs.length && (e.stateCenter.server = t.data.server_addrs[0], e.stateCenter.sessionExpire = t.data.session_expire + '', e.resetHallTryLogin(), e.tryHallLogin(), e.logger.info('zb.hh.lg call success'));
                  },
                  fail: function(e) {
                      console.log('send failed ' + e.statusCode);
                  },
              });
          }, e.prototype.login = function(e, t, r) {
              if (this.logger.info('zb.hh.lg call:', e), !this.stateCenter.configOK) return this.logger.error('zb.hh.lg param error'), void r({
                  code: '',
                  msg: 'config error',
              });
              this.stateCenter.hallState !== i.ENUM_RUN_STATE.logout && (this.logger.debug('zb.hh.lg reset'), this.setHallState(i.ENUM_RUN_STATE.logout), this.resetHall()), this.logger.debug('zb.hh.lg begin'), this.setHallState(i.ENUM_RUN_STATE.trylogin), this.stateCenter.token = e, o.ClientUtil.registerCallback('hallLogin', {
                  success: t,
                  error: r,
              }, this.stateCenter.callbackList), this.dispatchConnecnt();
          }, e.prototype.loginBodyData = function() {
              return null;
          }, e.prototype.dispatchBodyData = function() {
              return null;
          }, e.prototype.tryHallLogin = function() {
              var e = this;
              if (this.logger.debug('zb.hh.tl call'), this.stateCenter.hallState === i.ENUM_RUN_STATE.trylogin) {
                  if (++this.stateCenter.tryHallLoginCount > i.MAX_TRY_LOGIN_COUNT) {
                      this.logger.error('zb.hh.tl fail times limit');
                      var t = this.stateCenter.lastHallState;
                      return this.setHallState(i.ENUM_RUN_STATE.logout), this.resetHall(), void (t == i.ENUM_RUN_STATE.login ? (this.logger.error('zb.hh.tl fail and disconnect'), this.onDisconnect(i.sdkErrorList.LOGIN_DISCONNECT)) : (this.logger.info('zb.hh.tl fail and callback user'), o.ClientUtil.actionErrorCallback('hallLogin', this.stateCenter.callbackList)(i.sdkErrorList.LOGIN_TIMEOUT)));
                  }
                  if (this.stateCenter.startConnceTime = (new Date).getTime(), console.warn('start connect', this.stateCenter.startConnceTime), this.socketCenter.isDisConnect()) {
                      this.logger.debug('zb.hh.tl need new websocket');
                      try {
                          this.socketCenter.closeSocket(), this.logger.debug('zb.hh.tl new websocket'), this.socketCenter.createSocket(this.stateCenter.server), this.socketCenter.registerRouter('hallLogin', function(t, r) {
                              e.handleLoginRsp(t, r);
                          }), this.socketCenter.closeHandler(function(t) {
                              e.socketCenter.closeSocket(), e.closeHandler(t);
                          }), this.socketCenter.openHandler(function() {
                              e.openHandler();
                          });
                      } catch (e) {
                          this.logger.error('zb.hh.tl websocket err:' + e);
                      }
                  } else {
                      var r = this.loginBodyData();
                      this.logger.info('zb.hh.tl use current websocket and sent login'), this.socketCenter.sendMessage('zegochat_js.user_login_ws_req', r);
                  }
                  this.stateCenter.tryHallLoginTimer = setTimeout(function() {
                      e.tryHallLogin();
                  }, i.TRY_LOGIN_INTERVAL[this.stateCenter.tryHallLoginCount % i.MAX_TRY_LOGIN_COUNT]), this.logger.info('zb.hh.tl call success');
              } else this.logger.error('zb.hh.tl state error');
          }, e.prototype.handleLoginRsp = function(e, t) {
              if (this.logger.debug('zb.hh.hlr call'), this.stateCenter.hallState === i.ENUM_RUN_STATE.trylogin) {
                  if (e.header.seq === t) return e.body.code && 0 !== e.body.code ? (this.handleLoginFail(e), void this.logger.error('zb.hh.hlr server error=', e.body.code + ' ' + e.body.message)) : (this.handleLoginSuccess(e), void this.logger.info('zb.hh.hlr call success.'));
                  this.logger.error('zb.hh.hlr in wrong seq, local=', t, ',recv=', e.header.seq);
              } else this.logger.error('zb.hh.hlr state error');
          }, e.prototype.handleLoginFail = function(e) {
              if (this.logger.debug('zb.hh.hlf call'), o.ClientUtil.isKeepTryLogin(e.body.code)) this.logger.warn('zb.hh.hlf KeepTry true'); else {
                  var t = this.stateCenter.lastHallState;
                  this.setHallState(i.ENUM_RUN_STATE.logout), this.resetHall(), t === i.ENUM_RUN_STATE.login ? (this.logger.info('zb.hh.hlf callback disconnect'), this.onDisconnect(e.body.code)) : (this.logger.info('zb.hh.hlf callback error'), o.ClientUtil.actionErrorCallback('hallLogin', this.stateCenter.callbackList)({
                      code: e.body.code,
                      msg: e.body.message,
                  })), this.logger.debug('zb.hh.hlf call success');
              }
          }, e.prototype.handleLoginSuccess = function(e) {
              this.stateCenter.startloginSucTime = (new Date).getTime(), console.warn('login suc', this.stateCenter.startloginSucTime, this.stateCenter.startloginSucTime - this.stateCenter.startloginTime, this.stateCenter.startloginSucTime - this.stateCenter.startConnceTime), this.logger.info('zb.hh.hls call');
              var t = this.stateCenter.lastHallState;
              this.setHallState(i.ENUM_RUN_STATE.login), this.stateCenter.userid = e.body.user_uid, this.stateCenter.sessionid = e.body.session_id, this.stateCenter.timeStamp = e.header.timestamp, this.stateCenter.heartbeatTimeOut = e.body.hb_timeout, this.logger.setSessionInfo(this.stateCenter.appid, '', this.stateCenter.userid, '', this.stateCenter.sessionid, i.PROTO_VERSION, this.stateCenter.deviceId), e.body.log_sever_addr && '' != e.body.log_sever_addr && this.logger.openLogServer(e.body.log_sever_addr), this.resetHallTryLogin(), this.loginSuccessCallBack(t, e), this.stateCenter.isHallReconnect ? (this.onReconnect(), this.stateCenter.isHallReconnect = !1) : o.ClientUtil.actionSuccessCallback('hallLogin', this.stateCenter.callbackList)();
          }, e.prototype.openHandler = function() {
              this.logger.info('zb.hh.oh websocket.onpen call'), this.socketCenter.responseHandler();
              var e = this.loginBodyData();
              this.logger.info('zb.hh.oh websocket.onpen send login'), this.stateCenter.startloginTime = (new Date).getTime(), console.warn('start login', this.stateCenter.startloginTime, this.stateCenter.startloginTime - this.stateCenter.startConnceTime), this.socketCenter.sendMessage('zegochat_js.user_login_ws_req', e), this.logger.debug('zb.hh.oh websocket.onpen call success');
          }, e.prototype.closeHandler = function(e) {
              this.logger.info('zb.hh.ws.oc msg=' + JSON.stringify(e)), this.stateCenter.hallState !== i.ENUM_RUN_STATE.logout ? this.stateCenter.hallState === i.ENUM_RUN_STATE.trylogin && this.stateCenter.tryLoginCount <= i.MAX_TRY_LOGIN_COUNT ? this.logger.info('zb.hh.ws.oc is called because of try login') : this.stateCenter.hallState === i.ENUM_RUN_STATE.login ? (this.logger.info('zb.hh.ws.oc is called because of network broken, try again'), this.setHallState(i.ENUM_RUN_STATE.trylogin), this.resetHallTryLogin(), this.onTempBroken(), this.stateCenter.isHallReconnect = !0, this.tryHallLogin()) : (this.logger.error('zb.hh.ws.oc out of think!!!'), this.setHallState(i.ENUM_RUN_STATE.logout), this.resetHall(), this.onDisconnect(i.sdkErrorList.UNKNOWN)) : this.logger.info('zb.hh.ws.oc onclose logout flow call websocket.close');
          }, e.prototype.logout = function() {
              return this.logger.debug('zb.hh.lo call'), this.stateCenter.hallState === i.ENUM_RUN_STATE.logout ? (this.logger.warn('zb.hh.lo at logout'), !1) : (this.resetHall(), this.logger.info('zb.hh.lo call success'), !0);
          }, e.prototype.handleLogoutRsp = function(e) {
              this.logger.debug('zb.hh.hlor result=', e.body.code);
          }, e;
      }();
      t.HallHandler = n;
  }, function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var i = r(0), o = r(2), n = function() {
          function e() {
              this.testEnvironment = !1, this.third_token = '', this.pullLimited = !0, this.configOK = !1, this.netType = 2, this.roomFlag = 1, this.runState = i.ENUM_RUN_STATE.logout, this.lastRunState = i.ENUM_RUN_STATE.logout, this.hallState = i.ENUM_RUN_STATE.logout, this.lastHallState = i.ENUM_RUN_STATE.logout, this.isHallReconnect = !1, this.callbackList = {}, this.streamList = [], this.publishStreamList = {}, this.publishSeq = [], this.playSeq = [], this.userQuerying = !1, this.userTempList = [], this.userSeq = 0, this.anchor_info = {
                  anchor_id: '',
                  anchor_id_name: '',
                  anchor_nick_name: '',
              }, this.sendCommandMap = {}, this.sendCommandList = new i.LinkedList, this.sendDataMap = {}, this.sendDataList = new i.LinkedList, this.joinLiveCallbackMap = {}, this.joinLiveRequestMap = {}, this.streamUrlMap = {}, this.cmdCallback = {}, this.transSeqMap = {}, this.realyMessageList = [], this.relayTimer = null, this.bigImLastTimeIndex = 0, this.bigIMmessageList = [], this.bigImCallbackMap = {}, this.bigImTimer = null, this.serverTimeOffset = 0, this.datiTimeWindow = 0, this.bigimTimeWindow = 0, this.bigImMessageList = [], this.tryLoginCount = 0, this.tryLoginTimer = null, this.tryHallLoginCount = 0, this.tryHallLoginTimer = null, this.heartbeatTimer = null, this.hearbeatTimeOutTimer = null, this.sendDataCheckTimer = null, this.sendDataCheckInterval = 2e3, this.sendDataTimeout = 5e3, this.sendDataDropTimeout = 1e4, this.sendDataCheckOnceCount = 100, this.sendRoomMsgTime = 0, this.SendRoomMsgInterval = 500, this.cmdSeq = 0, this.audioEffectBuffer = {}, this.audioBitRate = 48e3;
          }

          return e.prototype.isLogin = function() {
              return this.hallState === i.ENUM_RUN_STATE.login;
          }, e.prototype.getRequestId = function() {
              return this.idName + '-' + o.getSeq();
          }, e.prototype.getSignalCmdContent = function(e, t, r) {
              var i = {
                  request_id: e,
                  room_id: this.roomid,
                  from_userid: this.idName,
                  from_username: this.nickName,
                  to_userid: t,
              };
              return null != r && (i.result = r), JSON.stringify(i);
          }, e;
      }();
      t.StateCenter = n;
  }, function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var i = r(1), o = function() {
          function e(e) {
              var t = e.type, r = e.channels, i = void 0 === r ? 1 : r, o = e.bufferSize, n = void 0 === o ? 0 : o,
                  s = e.sampleBit, a = void 0 === s ? 16 : s, c = e.sampleRate, d = void 0 === c ? 44100 : c,
                  l = this;
              this.instant = 0, this.slow = 0, this.clip = 0;
              var p = new ('undefined' != typeof webkitAudioContext ? webkitAudioContext : AudioContext);
              this.context = p, this.type = t, this.channels = i, this.bufferSize = n, this.sampleBit = a, this.sampleRate = d, this.script = p.createScriptProcessor(n, i, i);
              (new Date).getTime();
              this.script.addEventListener('audioprocess', function(e) {
                  var r, i = e.inputBuffer.getChannelData(0), o = 0, n = 0;
                  for (r = 0; r < i.length; ++r) o += i[r] * i[r], Math.abs(i[r]) > .99 && (n += 1);
                  if (l.instant = Math.sqrt(o / i.length), l.slow = .95 * l.slow + .05 * l.instant, l.clip = n / i.length, 'pcm' === t || 'wav' === t) {
                      for (var s = [], a = 0; a < l.channels; a++) s.push(e.inputBuffer.getChannelData(a));
                      l.recorderBuffer(s);
                  }
              }), 'pcm' !== t && 'wav' !== t || this.initRecorderBuffer(t);
          }

          return e.prototype.connectToSource = function(e, t) {
              console.log('SoundMeter connecting');
              try {
                  this.mic = this.context.createMediaStreamSource(e), this.mic.connect(this.script), this.script.connect(this.context.destination), void 0 !== t && t(null);
              } catch (e) {
                  console.error(e), void 0 !== t && t(e);
              }
              return this;
          }, e.prototype.recorderBuffer = function(e) {
              this.worker.postMessage({ command: 'record', val: e });
          }, e.prototype.initRecorderBuffer = function(e) {
              var t = this;
              this.worker = i.ClientUtil.inlineWorker(function() {
                  var e, t, r, i, o, n, s = [], a = this;

                  function c(t) {
                      var r, i;
                      if (1 == e) r = l(s[0], o, s), 1 != t && (i = d(t, r)); else if (2 == e) {
                          var n = l(s[0], o, s), a = l(s[1], o, s);
                          1 != t ? i = p(d(t, n), d(t, a)) : r = p(n, a);
                      }
                      return 1 != t ? i : r;
                  }

                  function d(e, t) {
                      for (var r = new Float32Array(t.length / e), i = 0, o = 0; i < r.length;) r[i] = t[o], o += e, i++;
                      return r;
                  }

                  function l(e, t, r) {
                      for (var i = new Float32Array(t * e.length), o = 0, n = 0; n < r[0].length; n++) i.set(r[0][n], o), o += r[0][n].length;
                      return i;
                  }

                  function p(e, t) {
                      for (var r = new Float32Array(e.length + t.length), i = 0; i < e.length + t.length; i += 2) r[i] = e[i / 2 >> 0], r[i + 1] = t[i / 2 >> 0];
                      return r;
                  }

                  function h(e, t, r) {
                      for (var i = 0; i < r.length; i++) e.setUint8(t + i, r.charCodeAt(i));
                  }

                  function u(e, t, r) {
                      for (var i = 0; i < r.length; i++, t += 2) {
                          var o = Math.max(-1, Math.min(1, r[i]));
                          e.setInt16(t, o < 0 ? 32768 * o : 32767 * o, !0);
                      }
                  }

                  function f(e, t, r) {
                      for (var i = 0; i < r.length; i++, t++) {
                          var o = Math.max(-1, Math.min(1, r[i])), n = o < 0 ? 128 * o : 127 * o;
                          n += 128, e.setInt8(t, n);
                      }
                  }

                  this.onmessage = function(d) {
                      switch (d.data.command) {
                          case'init':
                              l = d.data.val, e = l.sampleChannel, t = l.sampleBit, r = l.sampleRate, i = l.oldSampleRate, o = l.bufferSize, n = l.type;
                              break;
                          case'record':
                              !function(o) {
                                  for (var d = 0; d < e; d++) s[d] || (s[d] = []), s[d].push(o[d]);
                                  var l = Math.round(i / r);
                                  'pcm' === n ? function(e) {
                                      var r = function(e, r) {
                                          var i;
                                          8 == r ? i = e.length : 16 == r && (i = e.length, i *= 2);
                                          var o = new ArrayBuffer(i), n = new DataView(o);
                                          8 == r ? f(n, 0, e) : 16 == t && u(n, 0, e);
                                          return n;
                                      }(c(e), t);
                                      a.postMessage({ command: 'exportPcmLive', val: r });
                                  }(l) : 'wav' === n && function(i) {
                                      var o = function(i, o) {
                                          var n;
                                          8 == o ? n = i.length : 16 == t && (n = i.length, n *= 2);
                                          var s = new ArrayBuffer(n + 44), a = new DataView(s), c = r, d = t, l = e;
                                          h(a, 0, 'RIFF'), a.setUint32(4, 36 + n, !0), h(a, 8, 'WAVE'), h(a, 12, 'fmt '), a.setUint32(16, 16, !0), a.setUint16(20, 1, !0), a.setUint16(22, l, !0), a.setUint32(24, c, !0), a.setUint32(28, c * l * (d / 8), !0), a.setUint16(32, l * (d / 8), !0), a.setUint16(34, d, !0), h(a, 36, 'data'), a.setUint32(40, n, !0), 8 == t ? f(a, 44, i) : 16 == t && u(a, 44, i);
                                          return a;
                                      }(c(i), t);
                                      a.postMessage({ command: 'exportWav', val: o });
                                  }(l);
                                  s = [];
                              }(d.data.val);
                      }
                      var l;
                  };
              }), this.worker.postMessage({
                  command: 'init',
                  val: {
                      sampleChannel: this.channels,
                      sampleBit: this.sampleBit,
                      sampleRate: this.sampleRate,
                      oldSampleRate: this.context.sampleRate,
                      bufferSize: this.bufferSize,
                      type: e,
                  },
              }), this.worker.onmessage = function(e) {
                  switch (e.data.command) {
                      case'exportPcmLive':
                          t.onReceiveBuffer(e.data.val);
                          break;
                      case'exportWav':
                          t.onReceiveWav(e.data.val);
                  }
              };
          }, e.prototype.onReceiveBuffer = function(e) {
          }, e.prototype.onReceiveWav = function(e) {
          }, e.prototype.writeString = function(e, t, r) {
              for (var i = 0; i < r.length; i++) e.setUint8(t + i, r.charCodeAt(i));
          }, e.prototype.writeBuffer = function(e, t, r) {
              for (var i = 0; i < r.byteLength; i++) e.setUint8(t + i, r[i]);
          }, e.prototype.concatenation = function(e) {
              for (var t = 0, r = 0; r < e.length; ++r) t += e[r].buffer.byteLength;
              var i = new Uint8Array(t), o = 0;
              for (r = 0; r < e.length; ++r) i.set(new Uint8Array(e[r].buffer), o), o += e[r].buffer.byteLength;
              return i;
          }, e.prototype.encodeWave = function(e) {
              var t = this.concatenation(e), r = t.byteLength, i = new ArrayBuffer(r + 44), o = new DataView(i),
                  n = this.sampleRate, s = this.sampleBit, a = this.channels;
              return this.writeString(o, 0, 'RIFF'), o.setUint32(4, 36 + r, !0), this.writeString(o, 8, 'WAVE'), this.writeString(o, 12, 'fmt '), o.setUint32(16, 16, !0), o.setUint16(20, 1, !0), o.setUint16(22, a, !0), o.setUint32(24, n, !0), o.setUint32(28, n * a * (s / 8), !0), o.setUint16(32, a * (s / 8), !0), o.setUint16(34, s, !0), this.writeString(o, 36, 'data'), o.setUint32(40, r, !0), this.writeBuffer(o, 44, t), o;
          }, e.prototype.stop = function() {
              this.mic.disconnect(), this.script.disconnect();
          }, e;
      }();
      t.MediaUtil = o;
  }]);
});

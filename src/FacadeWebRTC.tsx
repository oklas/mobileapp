//import React from 'react';

import {
  RTCPeerConnection,
//  RTCIceCandidate,
//  RTCSessionDescription,
//  RTCView,
//  MediaStream,
//  MediaStreamTrack,
//  getUserMedia,
} from 'react-native-webrtc';


export default function check() {
  var configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]}
  var pc = new RTCPeerConnection(configuration)
  return Object.keys(pc).length > 0 ? 'check: OK' : 'check NOT OK'
}

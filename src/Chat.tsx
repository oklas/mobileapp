import React from 'react';

import { GiftedChat } from 'react-native-gifted-chat';
import Connection from 'wrtc-simple-data-native';


export type WrtcDataConnectionOptions = {
  signallingServer ?: string
  roomName ?: string
  rtcOpts ?: Object
  channelName ?: string
  channelOpts ?: Object
  debugMode ?: boolean
  debugLogger ?: (msg: string) => void
}

export interface Props {
  wrtcDataParams ?: WrtcDataConnectionOptions
}

export interface State {
  messages: Object[],
  ready: boolean,
}

export default class Chat extends React.Component<Props, State> {
  state: State
  connection: Connection
  localUser: Object
  remoteUser: Object
  newMessageId: number
  wrtcDataParams: WrtcDataConnectionOptions
  logger: (msg: string) => void

  constructor(props: Props) {
    super(props)
    this.state = {
      messages: [],
      ready: false
    }

    this.localUser = {
      _id: 1,
      name: 'Local User',
    }

    this.remoteUser = {
      _id: 2,
      name: 'Remote and Debug',
    }

    this.newMessageId = 1

    this.logger = (msg: string) => {
      this.appendMessage(false, msg)
    }

    let wdp: WrtcDataConnectionOptions = props.wrtcDataParams || {}

    this.wrtcDataParams = {
      roomName: wdp.roomName || 'chatRoom',
      signallingServer: wdp.signallingServer || 'http://192.168.0.5:3000',
      rtcOpts: wdp.rtcOpts || {iceServers: [{urls: 'stun:stun.l.google.com:19301'}]},
      debugMode: wdp.debugMode || true,
      debugLogger: wdp.debugLogger || this.logger,
    }
  }

  appendMessage = (local: boolean, message: string) => {
    const {remoteUser, localUser} = this
    const messages = [{
      _id: this.newMessageId++,
      text: message,
      createdAt: new Date(),
      user: local ? localUser : remoteUser,
    }]
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  onSend = (messages = []) => {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
//    if(this.state.ready) {
      messages.forEach(item => this.connection.sendMessage(item.text))
//    }
  }

  componentDidMount() {

    this.connection = new Connection(this.wrtcDataParams)

    this.connection.on('ready', () => {
      this.logger('ready')
      this.connection.on('channel:ready', () => {
        this.logger('channel:ready')
        this.setState({ready: true})
      })
      this.connection.on('message', (data) => {
        this.appendMessage(false, data.text)
      })
    })

    this.appendMessage(true, 'Start conversation')
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={this.localUser}
      />
    )
  }
}

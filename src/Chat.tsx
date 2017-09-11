import React from 'react';

import { GiftedChat } from 'react-native-gifted-chat';
import Connection from 'wrtc-simple-data-native';

/*
  <Chat
    wrtcDataParams={{
      ...config // onfigure `wrtc-simple-data` connection
    }}
    logger={(msg: string) => console.log(msg)}
    messages=[] // initial messages if any
  />
*/

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
  messages ?: Object[]
  logger ?: (msg: string) => void
}

export interface State {
  messages: Object[],
  ready: boolean,
}

export default class Chat extends React.Component<Props, State> {
  state: State
  connection: Connection
  users: Object
  newMessageId: number
  wrtcDataParams: WrtcDataConnectionOptions
  logger: (msg: string) => void

  constructor(props: Props) {
    super(props)
    this.state = {
      messages: props.messages || [],
      ready: false
    }

    this.users = {
      'local': {
        _id: 'local',
        name: 'Local User',
      },
      'system': {
        _id: 'system',
        name: '',
      }
    }

    this.newMessageId = 1

    this.logger = props.logger ? props.logger : (msg: string) => {
      this.appendMessage('system', msg)
    }

    let wdp: WrtcDataConnectionOptions = props.wrtcDataParams || {}

    this.wrtcDataParams = {
      roomName: wdp.roomName || 'chatRoom',
      signallingServer: wdp.signallingServer || 'http://localhost:3000',
      rtcOpts: wdp.rtcOpts || {iceServers: [{urls: 'stun:stun.l.google.com:19301'}]},
      debugMode: wdp.debugMode || false,
      debugLogger: wdp.debugLogger || this.logger,
    }
  }

  findUser = (userId) => {
    let user = this.users[userId]
    if( !user ) {
      user = {
        _id: userId,
        name: userId,
      }
      this.users[userId] = user
    }
    return user
  }

  appendMessage = (userId: string, message: string) => {
    const messages = [{
      _id: this.newMessageId++,
      text: message,
      createdAt: new Date(),
      user: this.findUser(userId),
    }]
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  onSend = (messages = []) => {
    if(this.state.ready) {
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }))
      messages.forEach(item => this.connection.sendMessage(item.text))
    }
  }

  componentDidMount() {
    this.connection = new Connection(this.wrtcDataParams)

    this.connection.on('ready', () => {
      this.logger('connected to the server')
      this.connection.on('channel:ready', () => {
        this.logger('new peer connected')
        this.setState({ready: true})
      })
      this.connection.on('message', (data) => {
        this.appendMessage(data.sender, data.text)
      })
    })
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={this.findUser('local')}
      />
    )
  }
}

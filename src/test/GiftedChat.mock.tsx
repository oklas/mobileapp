import React from 'react'
import {
  Text,
  View
} from 'react-native';

export interface Props {
  user: Object
  messages: Object[]
  onSend: (messages: any[]) => void
}
export interface State {
  messages: Object[],
  ready: boolean,
}

export class GiftedChat extends React.Component<Props, State> {
  static append(currentMessages = [], messages) {
    if (!Array.isArray(messages)) {
      messages = [messages];
    }
    return messages.concat(currentMessages);
  }

  componentDidMonunt() {
    const messages = [{
      _id: 10,
      text: 'mock message of GiftedChat',
      createdAt: new Date(),
      user: this.props.user,
    }]

    this.props.onSend(messages)
  }

  renderMessages() {
    return this.props.messages.map((message: any, i: number) => (
      <View key={i}>
        <Text>{message.user.name}</Text>
        <View>
          <Text>{message.text}</Text>
        </View>
      </View>
    ))
  }

  render() {
    return (
      <View>
        {this.renderMessages()}
      </View>
    )
  }
}


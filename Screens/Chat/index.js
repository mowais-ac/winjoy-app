import React from 'react';
import {StyleSheet,Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import io from 'socket.io-client';
export default class App extends React.Component {
  state = {
    chatMessage: "",
    chatMessages: []
  };

  componentWillMount() {
    // this.socket = io('http://192.168.10.6:3000');
    // this.socket.on('message', (msg) => {
    //   this.setState({messages: [...this.state.messages, msg]});
      
    // });
    
    // this.socket.on('message', (msg) => {
    //   console.log('msg', msg);
    // });

    // this.setState({
    //   messages: [
    //     {
    //       _id: 1,
    //       text: 'Hello developer',
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: 'https://placeimg.com/140/140/any',
    //       },
    //     },
    //   ],
    // });
    this.socket = io('http://192.168.10.13:3000');
    this.socket.on("chat message", msg => {
          this.setState({ chatMessages: [...this.state.chatMessages, msg]   
     });
  });
  }

  // onSend(messages = []) {
  //   console.log('this.state.messages', this.state.messages)
  //   console.log('messsss', messages)
  //   this.setState((previousState) => ({
  //     messages: GiftedChat.append(previousState.messages, messages),
  //   }));
  //   this.socket.emit('chat message', messages);
  //   this.setState({chatMessage: ''});
  // }
  submitChatMessage() {
    console.log('msgs', this.state.chatMessages)
    this.socket.emit('chat message', this.state.chatMessage);
    this.setState({chatMessage: ''});
  }

  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <Text style={{borderWidth: 2, top: 300}}>{chatMessage}</Text>
    ));

    return (
      <View style={styles.container}>
        {chatMessages}
        <TextInput
          style={{height: 40, borderWidth: 2, top: 300}}
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={chatMessage => {
            this.setState({chatMessage});
            this.socket.emit('typing');
          }}
        />
      </View>
   );
  }
}
  const styles = StyleSheet.create({
    container: {
      height: 400,
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
  });
import React, {Component} from 'react'
import './ChatWindow.css'

//dependencies
import Title from '../Title/Title'
import InputText from '../InputText/InputText'
import MessagesContainer from '../MessagesContainer/MessagesContainer'
import Username from '../Username/Username'

export default class ChatWindow extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
    }
    this.getUsername = this.getUsername.bind(this)
  }
  getUsername(username){
    this.setState({
      username
    })
  }
  render(){
    return (
      <div className="ChatWindow">
        <Title />
        <Username getUsername={this.getUsername}/>
        <MessagesContainer />
        <InputText username={this.state.username} />
      </div>
    )
  }
}


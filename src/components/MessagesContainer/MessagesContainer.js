import React, {Component} from 'react'
import socket from '../../helpers/socketConnection'
import './MessagesContainer.css'

//dependencies
import Message from '../Message/Message'

export default class MessagesContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: []
    }
    this.renderMessages = this.renderMessages.bind(this)
    this.getMessage = this.getMessage.bind(this)
  }
  renderMessages(){         
    return Object.keys(this.state.messages).map(key => {
      return (
        <Message key={key} 
          message={this.state.messages[key].message} 
          from={this.state.messages[key].from} 
          username={this.state.messages[key].username} 
          fromId={this.state.messages[key].fromId}
        />
      )
    })
  }
  getMessage(){
    socket.on('message', data => {
      if(data.fromId === socket.id){
        let temp = this.state.messages       
        temp.push({message: data.message, from: data.from, fromId: data.fromId, username: data.username})
        this.setState({
          messages: temp
        }) 
      }else {
        let temp = this.state.messages
        temp.push({message: data.message, from: !data.from, fromId: data.fromId, username: data.username})
        this.setState({
          messages: temp
        }) 
      }
    })
  }
  componentDidMount(){
    this.getMessage() 
  }
  render(){ 
    return (
      <div className="MessagesContainer">
        {this.renderMessages()}
      </div>
    )
  }
}
import React, {Component} from 'react'
import socket from '../../helpers/socketConnection'
import './MessagesContainer.css'

//dependencies
import Message from '../Message/Message'

export default class MessagesContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: [],
      data: {}
    }
    this.renderMessages = this.renderMessages.bind(this)
    this.getMessage = this.getMessage.bind(this)
    this.handleTyping = this.handleTyping.bind(this)
    this.scrollBottom = this.scrollBottom.bind(this)
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
  handleTyping(){
    socket.on('typing', data => {
      this.setState({
        data
      })
    })
  }
  scrollBottom(){    
    document.getElementsByClassName('MessagesContainer').scrollHeight
  }
  componentDidMount(){
    this.getMessage() 
    this.handleTyping()
    this.scrollBottom()
  }
  render(){ 
    return (
      <div className="MessagesContainer">
        {this.renderMessages()}
        <UserTyping username={this.state.data.username} typing={this.state.data.typing} />
      </div>
    )
  }
}


const UserTyping = ({username, typing})=>(
  typing ? <span className="typing">{username ? username : 'Anonymous'} is typing...</span> : null
)
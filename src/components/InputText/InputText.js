import React, {Component} from 'react'
import socket from '../../helpers/socketConnection'
import './InputText.css'

export default class InputText extends Component {
  constructor(props){
    super(props)
    this.state = {
      typing: false
    }
    this.handleSend = this.handleSend.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleSend(e){
    e.preventDefault()
    if(e.target.message.value){
      socket.emit('typing', {username: this.props.username, typing: this.state.typing})
      socket.emit('message', {message: e.target.message.value, from: true, fromId: socket.id, username: this.props.username}) 
      e.target.message.value = ''
    }    
  }
  handleChange(e){
    if(e.target.value){
      socket.emit('typing', {username: this.props.username, typing: !this.state.typing})
    }else {
      socket.emit('typing', {username: this.props.username, typing: this.state.typing})
    }
  }
  render(){
    return(
      <div className="InputText">
        <form onSubmit={this.handleSend} autoComplete='off'>
          <input className="message" name="message" onChange={this.handleChange} placeholder="Enter message..." required/>
        </form>
      </div>
    )
  }
}
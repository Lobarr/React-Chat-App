import React, {Component} from 'react'
import socket from '../../helpers/socketConnection'
import './InputText.css'

export default class InputText extends Component {
  constructor(props){
    super(props)
    this.handleSend = this.handleSend.bind(this)
  }
  handleSend(e){
    e.preventDefault()
    if(e.target.message.value){
      socket.emit('message', {message: e.target.message.value, from: true, fromId: socket.id, username: this.props.username})      
      e.target.message.value = ''
    }    
  }
  render(){
    return(
      <div className="InputText">
        <form onSubmit={this.handleSend} autoComplete='off'>
          <input className="message" name="message" placeholder="Enter message..." required/>
        </form>
      </div>
    )
  }
}
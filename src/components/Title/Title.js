import React, {Component} from 'react';
import socket from '../../helpers/socketConnection'
import './Title.css'

export default class Title extends Component {
  constructor(props){
    super(props);
    this.state = {
      connected: 0
    }
  }
  componentDidMount(){
    socket.on('users', data => {
      this.setState({
        connected: data
      })
    })
  }
  render(){
    return (
      <div className='TitleContainer'>
        <span className="Title">React-Chat by Lobarr<span className="connected">{this.state.connected}</span></span>
      </div>      
    )
  }
}
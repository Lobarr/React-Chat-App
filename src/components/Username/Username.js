import React from 'react'
import './Username.css'


export default class Username extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e){
    e.preventDefault()
     if(e.target.username.value){      
       this.setState({
         username: e.target.username.value
       })
      this.props.getUsername(e.target.username.value)
    }
  }
  render(){
    if(this.state.username){
      return null
    }else {
      return (
        <form onSubmit={this.handleSubmit}>
          <input className="Username" name='username' placeholder="Enter username..." required/>
        </form>
      )
    }
  }
}
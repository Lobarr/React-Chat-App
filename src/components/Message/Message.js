import React, {Component} from 'react'
import './Message.css'

export default class Message extends Component {
  constructor(props){
    super(props);
    this.renderMessage = this.renderMessage.bind(this)
    this.parseMessages = this.parseMessages.bind(this)
  }  
  parseMessages(){
    let tempArr = []
    let tempStr = this.props.message
    const cut = 40;
    while(tempStr.length > 0){
      if(tempStr.length > cut){
        tempArr.push(tempStr.slice(0, cut))
        tempStr = tempStr.slice(cut, tempStr.length)  
      }else{
        tempArr.push(tempStr)
        tempStr = ''
      }      
    }
    return tempArr
  }
  renderMessage(){
    return this.parseMessages().map((val, index) => {
      return (
        <h1 key={index}> {val}</h1>  
      )
    })
  }
  render(){
    if(this.props.from){
      return (
        <div className="MessageFrom">
          <div className="MessageFromCont">
            {this.renderMessage()}
            <RenderUsername username={this.props.username} />
          </div>   
        </div>
      )
    }else {
      return (
        <div className="MessageTo">
          <div className="MessageToCont">
            {this.renderMessage()}
            <RenderUsername username={this.props.username} />
          </div>          
        </div>
      )
    }    
  }
}

const RenderUsername = ({username})=>(
  <span className="user">- {username ? username : 'Anonymous'}</span>
)
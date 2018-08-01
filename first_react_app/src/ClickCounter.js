import React ,{Component} from 'react'
export default class ClickCounter extends Component{
 		constructor(props){
 			super(props);
 			this.onClickButton = this.onClickButton.bind(this);
 			this.state = {
 				count:0
 			}
 		}

 		onClickButton(){
 			this.setState({
 				count:this.state.count+1
 			})
 		}

 		render(){
 			return (
 				<div>
 					<button onClick = {this.onClickButton}>click me</button>
 					<div>
						Click Count :{this.state.count}
 					</div>
 				</div>
 				)
 		}
 }

 // export default ClickCounter
import React,{Component} from 'react'
import Counter from './Counter'
export default class ControlPanel extends Component{
	constructor (props) {
    super(props)
    this.test = this.test.bind(this)
    this.state = {
        checkboxCheck: true
    }

    this.onCounterUpdate = this.onCounterUpdate.bind(this)
    this.initValues = [0,10,20];
    const initSum = this.initValues.reduce((a,b)=>a+b,0)
    this.state = {
    	sum:initSum
    }
  }
  onCounterUpdate(newVal,preVal){
  	const changeVal = newVal - preVal
  	this.setState({
  		sum:this.state.sum+changeVal
  	})
  }
  test(){
  	this.setState({
        checkboxCheck: !this.state.checkboxCheck
    })
  }
	render(){
		console.log('enter ControlPanel render ')
		return (
			<div>
				<Counter onUpdate={this.onCounterUpdate} caption="First" initValue={this.initValues[0]} />
				<Counter onUpdate={this.onCounterUpdate} caption="Second" initValue={this.initValues[1]} />
				<Counter onUpdate={this.onCounterUpdate} caption="Third" initValue={this.initValues[2]} />
				<button onClick={this.test} >test {this.state.checkboxCheck}</button>
				<div>Total Count: {this.state.sum}</div>
			</div>
			)
	}
}
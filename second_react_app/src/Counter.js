import React,{Component} from 'react'

class Counter extends Component{
	// Counter.propTypes = {
	// 	caption:PropTypes.string.isRequired
	// }
	constructor(props){
		console.log('enter constructor '+props.caption)
		super(props);
		this.addNum = this.addNum.bind(this);
		this.decrementNum = this.decrementNum.bind(this);
		this.state = {
			count:props.initValue || 0
		}
	}
	
	addNum(){
		// this.setState({
		// 	count:this.state.count+1
		// })
		this.updateCount(true)
	}
	decrementNum(){
		// this.setState({
		// 	count:this.state.count-1
		// })
		this.updateCount(false)
	}
	updateCount(isAdd){
		const previousValue = this.state.count;
		const newValue = isAdd ? previousValue+1:previousValue-1
		this.setState({
			count:newValue
		})
		this.props.onUpdate(newValue,previousValue)
	}
	componentWillMount(){
		console.log('enter componentWillMount '+this.props.caption)
	}
	render(){
		const {caption} = this.props;
		console.log('enter render '+this.props.caption)
		return (
				<div>
				<button onClick={this.addNum}>+</button>
				<button onClick={this.decrementNum}>-</button>
				<span>{caption}:{this.state.count}</span>
				</div>
			)
	}
	componentDidMount(){
		console.log('enter componentDidMount '+this.props.caption)
	}
	componentWillReceiveProps(nextProps){
		console.log('enter componentWillReceiveProps '+this.props.caption)
	}
	shouldComponentUpdate(nextProps,nextState){
		return (nextProps.caption!== this.props.caption) ||(nextState.count!==this.state.count)
	}
}


export default Counter
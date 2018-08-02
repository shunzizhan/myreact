# 第二章 设计搞质量的react组件

## 生命周期
![image](https://images.gitee.com/uploads/images/2018/0802/105120_d144fc52_375548.png)

### 装载过程 Mount
> 组件第一次在dom树中渲染的过程

#### constructor
> 无状态的组件，则不需要定义构造函数，一个组件需要构造函数，往往是以下的目的：  
- 初始化state
- 绑定函数的this环境
```bash
this.foo = ::this.foo
# 等价
this.foo = this.foo.bind(this)
```

#### getInitialState 
>返回值会用来初始化组件的this.state 只用React.createClass方法创造的组件

#### getDefaultProps
>返回值会作为props的初始值 只用React.createClass方法创造的组件

#### componentWillMount
> 所有可以在这个中做的事情，都可以提前到constructor中间去做；可以在服务器端被调用，也可以在浏览器端被调用

#### render
> render 函数并不做实际的渲染动作，它只返回一个jsx描述的结构，最终由react来操作渲染过程

#### componentDidMount
> render函数被调用完毕后，componentDidMount并不是会被立马调用，而是等render函数返回的东西已经引发了渲染，组件已经被“装载”到了dom树上；只能在浏览器端被调用
【如果需要引用第三方插件(譬如jq)，则在这个周期里操作】

```bash
import React,{Component} from 'react'

export default class Counter extends Component{
  
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
    this.setState({
      count:this.state.count+1
    })
  }
  decrementNum(){
    this.setState({
      count:this.state.count-1
    })
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
}

```
![image](https://user-images.githubusercontent.com/7811369/43517196-6b3aa6f6-95ba-11e8-9b51-4ff22cbaaf69.png)

### 更新过程 Update
> 组件被重新渲染的过程

#### componentWillReceiveProps
> 只要父组件的render函数被调用，在render函数里被渲染的字组件就会经历更新过程，不管父组件传给子组件的props有没有改变，都会触发子组件的componentWillReceiveProps。注意通过setState方法触发的更新过程就不会调用这个函数，这个函数适合根据心的props值（nextProps）来计算出是不是要更新内部状态的state。

**注意：**尽量不要直接把用匿名函数赋值给onClick的方法，每次渲染都会创造一个心的匿名方法对象，有可能引发子组件不必要的重新渲染

```bash
export default class ControlPanel extends Component{
  constructor (props) {
    super(props)
    this.test = this.test.bind(this)
    this.state = {
        checkboxCheck: true
    }
  }
  test(){
    this.setState({
        checkboxCheck: !this.state.checkboxCheck
    })
  }
  render(){
    return (
      <div>
        <Counter caption="First" initValue={0} />
        <Counter caption="Second" initValue={10} />
        <Counter caption="Third" initValue={20} />
        <button onClick={this.test} >test {this.state.checkboxCheck}</button>
      </div>
      )
  }
}
```
![image](https://images.gitee.com/uploads/images/2018/0801/201757_cffeecf4_375548.png)
#### shouldComponentUpdate
>参数nextProps nextState, 它决定一个组件什么时候不需要渲染，返回bool值【性能优化】
```bash
shouldComponentUpdate(nextProps,nextState){
  return (nextProps.caption!== this.props.caption) ||(nextState.count!==this.state.count)
}
```
![image](https://images.gitee.com/uploads/images/2018/0801/202037_3dee07a4_375548.png)

#### componentWillUpdate
> 不论更新过程发生在服务端还是浏览器端，该函数都会被调用

#### render
> 同上面的render

#### componentDidUpdate
>执行其他的ui库

### 卸载过程 Unmount
> 组件从dom中删除的过程
#### componentWillUnmount
> 注意销毁非react方法创造的dom

## 子组件向父组件传值
>通过prop，父组件定义方法，作为属性传递给子组件，子组件执行方法
```bash
# counter.js 子组件
    addNum(){
    this.updateCount(true)
  }
  decrementNum(){
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

#ControlPanel.js 父组件
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
```
but不推荐这样使用，原因：
- 每个Counter组件都有自己的状态记录当前计数，而父组件也有一个状态来存储所有的子组件计数之和，数据发生了重复
- 如果数据存在多份，但是不一致，则很难决定使用那些数据   

全局状态就是唯一可靠的数据源，为了避免这个问题，下一章将探讨Store

[github地址](https://github.com/shunzizhan/myreact/second_react_app)

[码云地址](https://gitee.com/shunzizhan/myreact/second_react_app)

[React学习交流群](https://images.gitee.com/uploads/images/2018/0802/105745_58970a9c_375548.png)
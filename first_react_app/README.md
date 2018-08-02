
## 第一章 React新的前端思维
### 环境配置
```bash
# 安装脚手架
npm install -g create-react-app


# 新建一个项目
create-react-app first_react_app

# 启动项目
npm start

```
### export与export default
- export与export default均可用于导出常量、函数、文件、模块等
- 你可以在其它文件或模块中通过import+(常量 | 函数 | 文件 | 模块)名的方式，将其导入，以便能够对其进行使用
- 在一个文件或模块中，export、import可以有多个，export default仅有一个
- 通过export方式导出，在导入时要加{ }，export default则不需要  

[export ，export default 和 import 区别 以及用法](https://www.cnblogs.com/xiaotanke/p/7448383.html)
```bash
# export
## ClickCounter.js

import React ,{Component} from 'react'
export class ClickCounter extends Component{
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
 
 ## index.js
 ## 必须用{},且名称需要与export的相同，否则就会报错
 
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {ClickCounter} from './ClickCounter';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ClickCounter />, document.getElementById('root'));
registerServiceWorker();

```

```bash
# export default
## ClickCounter.js

import React ,{Component} from 'react'
export default class ClickCounter extends Component{
    ……
}

## index.js
### 模块名，随意，支持自定义
import ClickCounter from './ClickCounter'; //正常执行
import App from './ClickCounter'; //正常执行
```

## jsx
- html中避免直接给dom `onclick`, 容易引起代码混乱
  - onclick处理函数在全局环境下，污染全局
  - 给很多dom添加onclick事件，可能会影响网页性能
  - 动态删除dom，事件没有注销，可能造成内存泄露
- jsx中则支持，'分而治之'：同一件事的代码应该有高耦合的设计原则
  - 事件委托
  - 在unmount的时候，会清除所有的事件处理函数

## 查看config文件
- 所有的配置都隐藏在node_modules/react-scripts
- `npm run eject`将技术站配置都弹射到顶层，增加scripts config文件夹 package.json文件也会发生改变
- 执行 `npm i`
- 执行 `npm run start`

## React 理念
- 对比，做出最少的改动
- UI = render(data)
- 响应式编程 reactive programming  

![图解](https://user-images.githubusercontent.com/7811369/43500301-6c7df62c-9582-11e8-89a0-d19ccdedaa8f.jpg)

[github地址](https://github.com/shunzizhan/myreact/first_react_app)

[码云地址](https://gitee.com/shunzizhan/myreact/first_react_app)

![image](https://images.gitee.com/uploads/images/2018/0802/105745_58970a9c_375548.png)
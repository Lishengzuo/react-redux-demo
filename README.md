#基于`react-react-app`引入`react-redux`的脚手架搭建
##一、背景介绍
在`react`的世界中，它的数据传递是单向的，正常情况下数据只可以从父组件向子组件逐级传递，当组件进行多层嵌套并且最内层组件需要获取最外层组建数据的时候，数据的传递将会变得很麻烦，只能通过`props`一级一级的传递下去。这时候在项目中使用`reacr-redux`将是一个很好的解决办法，`react-redux`通过唯一的一个`store`来储存和管理整个页面所有的数据，页面组件只要和`store`树进行连接，就可从`sotre`树中取到任意的数据，数据的传递将不回是一个问题。
##二、向`react`项目中添加`react-redux`的步骤
###1、创建一个简单的react项目
在保存项目的文件夹中，在文件夹空白处按住`shirf`t键`+`鼠标右键弹出一个菜单，接着点击打开**此处打开命令窗口**，在窗口中输入指令
	
	create-react-app react-redux-demo	

空格之后的指令值得就是项目名称，此时项目的名称为`react-redux-demo`，然后按`enter`执行，之后就会自动创建一个简单的`react`项目。
创建完成之后，项目的文件结构如下：

	
	├── node_modules                  // 模块安装依赖包
	├── public                        //公共文件，可以不用管
	│   ├── favicon.ico               //图标
	│   ├── index.html                //入口html
	│   ├── manifest.json             //manifest配置文件，指定应用名称、图标等信息
	├── src 						  //编写自己代码的存放文件
	│   ├── App.css                   //app的引用css文件
	│   ├── App.js					  //组件js文件
	│   ├── App.test.js               //测试文件
	│   ├── index.css                 //idnex引用的css文件
	│   └── index.js				  //页面入口文件
	│   ├── logo.svg                  //页面图片
	│   ├── serviceWorker.js          //加速程序运行文件
	├──.gitignore                     //提交到远程代码库时要忽略的文件
	├──package.json                   //用来声明项目的各种模块安装信息，脚本信息等
	├──package-lock.json              //用来锁定模块安装版本的，确保安装的模块版本一致
	├──README.md					  //盛放关于这个项目的说明文件
	
###2、打开新建的`react`项目
进入`react-redux-demo`这个项目的文件夹之中，打开命令窗口，输入

	npm start

运行一下项目，测试一下是否运行正常。如果正常运行就会自动在浏览器窗口中打开这个项目，效果如下：

![markdown](https://github.com/Lishengzuo/react-router-demo/raw/master/docimages/runresult.png "cnd")

###3、在新建的`react`项目中安装`react-redux`
首先需要在`react`项目中安装`redux`，它是用来提供`createStore`这个用来创建`store`的工厂函数的。
终止项目的运行，在命令窗口中按`Ctrl+c`即可终止项目运行，然后在窗口中输入指令

	npm install redux --save-dev

按`enter`执行就会自动在项目中安装`redux`。

接着安装`react-readux`，它是用来提供`Provider`和`connect`的，在命令窗口输入

	npm install reacr-redux --save-dev

等待安装完毕，我们就在`react`项目中搭建好了可以使用`redux`的框架。
##三、项目中使用`react-redux`
###1、创建一个自定义的组件
在`src`文件夹中创建一个`components`文件夹，用来存放自定义的组件。现在在`components`中新建一个计数器组件`counter.j`s，它的代码如下

	import React, { Component } from 'react';
	class Counter extends Component {
		render() {
			return (
				<div>
					<p>次数：</p>
					<button>加一</button>
					<button>减一</button>
				</div>
			);
		}
	}
	export default Counter;

###2、让组件和`store`树进行连接
在Counter组件的头部引入`connect`方法

	import { connect } from 'react-redux';

在导出文件的地方使用`connect`方法生成一个`container`包裹住`Counter`组件，具体代码如下

	export default connect()(Counter);

这样`Counter`组件就与`store`树进行了连接，但是现在是拿不到`store`树上的数据的，只有将`store`树的数据和`Counter`组件的`props`属性进行映射之后，组件才能取到`store`上的数据，所以用到了`connect`方法的两个参数中的`mapStateToProps`，具体代码如下

	const mapStateToProps = (state) => {
		return ({
			counter: state
		});
	}

	export default connect( mapStateToProps )(Counter);

这样就把`store`树上的数据映射到`Counter`组件的`props`属性之中，就可以在组件中通过

	this.props.counter

取到相应的值。

###3、初始化`store`树的值
在`src`中新建一个`reducers`文件夹，再新建一个`reducer.js`的文件，就在这个`reducer.js`文件中编写`reducer`，用来初始化`store`树上的值，具体代码如下

	export function counter(state, action) {
		switch(action.type) {
			case "add":
				return state + 1;
			case "sub":
				return state - 1;
			default:
				return state;
		}
	}

###4、把`reducer`当做参数传给`store`
在入口文件引入`createStore`，然后使用它创建`store`，再把`reducer`当作参数传进去，并把`store`赋值给`Provider`组件中的`store`属性，代码如下

	import { createStore } from 'redux';
	import Reducer from './reducers/reducer.js';
	import { Provider } from 'react-redux';
	import Counter from './components/counter.js';

	const store = createStore(Reducer);
	ReactDOM.render(
		<Provider store={ store }>
			<Counter />
		</Provider>, 
		document.getElementById('root')
	);

###5、在组件中编写触发`action`的事件
在`Counter`组件中编写`dispatch(action)`的事件，并把数据在页面中展示出来，具体代码如下

	import React, { Component } from 'react';
	import { connect } from 'react-redux';

	class Counter extends Component {
		render() {
			const { dispatch } = this.props;
			return (
				<div>
					<p>次数：{ this.props.counter }</p>
					<button onClick={ () => dispatch({ type: "add" }) } >加一</button>
					<button onClick={ () => dispatch({ type: "sub" }) } >减一</button>
				</div>
			);
		}
	}
	const mapStateToProps = (state) => {
		return ({
			counter: state
		});
	}
	export default connect( mapStateToProps )(Counter);


这就完成了在`react`项目中引入`react-redux`的框架的搭建。具体的运行结果如下

初始状态

![markdown](https://github.com/Lishengzuo/react-redux-demo/raw/master/docimages/0.png "result")

加一

![markdown](https://github.com/Lishengzuo/react-redux-demo/raw/master/docimages/1.png "result")

减一

![markdown](https://github.com/Lishengzuo/react-redux-demo/raw/master/docimages/-1.png "result")



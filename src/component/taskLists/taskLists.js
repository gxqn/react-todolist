import React,{Component} from 'react'
import './taskLists.scss'

class listItem extends Component {
	constructor(props) {
		super(props)
		this.handleDelte = this.handleDelte.bind(this)
		this.handleFinish = this.handleFinish.bind(this)
	}

	handleDelte() {
		this.props.deleteBtnClick(this.props.val)
	}

	handleFinish() {
		this.props.finishBtnClick(this.props.val)
	}

	render() {
		return (
			<li>
				<span onClick={this.handleFinish} className="chooseBtn">{this.props.list.status == 0 ? '未完成':'已完成'}</span>
				<span className="taskCont">{this.props.list.cont}</span>
				<button onClick={this.handleDelte} className="deleteBtn">删除</button>
			</li>)
	}
}

export default listItem
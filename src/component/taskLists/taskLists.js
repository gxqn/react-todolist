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
			<li className="Listitem-li">
				<span onClick={this.handleFinish} className={`chooseBtn ${this.props.val.status === 0 ? 'undone' : 'done'}`}></span>
				<span className={`taskCont ${this.props.val.status === 0 ? 'undone' : 'done'}`}>{this.props.list.cont}</span>
				<span onClick={this.handleDelte} className="deleteBtn">删除</span>
			</li>)
	}
}

export default listItem
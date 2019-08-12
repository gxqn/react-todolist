import React,{Component} from 'react';
import './filterBtn.scss';
 
class FilterBtn extends Component {
	constructor(props) {
		super(props)
		this.handleShowAll = this.handleShowAll.bind(this)
		this.handleShowDone = this.handleShowDone.bind(this)
		this.handleShowUndone = this.handleShowUndone.bind(this)
	}

	handleShowAll() {
		this.props.filterList(0)
	}
	handleShowDone() {
		this.props.filterList(1)
	}
	handleShowUndone() {
		this.props.filterList(2)
	}

	render() {
		return (
			<div className="btnWrap">
				<button onClick={this.handleShowAll} className="btn all">全部</button>
				<button onClick={this.handleShowDone} className="btn done">已完成</button>
				<button onClick={this.handleShowUndone} className="btn undone">未完成</button>
			</div>
		)
	}
}

export default FilterBtn
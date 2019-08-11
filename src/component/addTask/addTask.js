import React,{Component} from 'react'
import "./addTask.scss"

class AddInput extends Component {
  constructor(props) {
    super(props)
		this.handleAddBtnClick = this.handleAddBtnClick.bind(this)
		this.handleKeyUp = this.handleKeyUp.bind(this)
  }

	handleAddBtnClick() {
		if(this.refs.ipt.value && this.refs.ipt.value.trim() != '') {
			let taskObj = {
				id: +new Date(),
				cont: this.refs.ipt.value.trim(),
				status: 0
			}
			this.props.clickAddBtn(taskObj)
			this.refs.ipt.value = ''
		}
	}

	handleKeyUp(e) {
		if(e.keyCode == 13) {
			this.handleAddBtnClick()
		}
	}

  render() {
    return (
      <div className="addWrap">
				<span className="addTitle">新建任务：</span>
				<input className="addIpt" ref="ipt" placeholder="请输入新的任务" onKeyUp={this.handleKeyUp}></input>
				<button className="addBtn" onClick={this.handleAddBtnClick}>保存</button>
      </div>
    )
  }
}

export default AddInput
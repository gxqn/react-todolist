import React,{Component} from 'react'
import "./addTask.scss"

class AddInput extends Component {
  constructor(props) {
    super(props)
		this.handleAddBtnClick = this.handleAddBtnClick.bind(this)
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

  render() {
    return (
      <div className="addWrap">
        <div className="inputWrap">
					<span>新建任务：</span>
					<input ref="ipt" placeholder="请输入新的任务"></input>
				</div>
				<button className="addBtn" onClick={this.handleAddBtnClick}>保存</button>
      </div>
    )
  }
}

export default AddInput
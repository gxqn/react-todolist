import React,{Component} from 'react';
// import logo from './logo.svg';
import './App.scss';
import ListItem from './component/taskLists/taskLists';
import AddInput from './component/addTask/addTask';
import FilterBtn from './component/filterBtn/filterBtn';

class App extends Component {
  constructor(props) {
    super(props)
    this.addNewTask = this.addNewTask.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.taskDone = this.taskDone.bind(this)
    this.handleFilterList = this.handleFilterList.bind(this)
    this.resetTaskClick = this.resetTaskClick.bind(this)
    this.state = {
      //初始化的任务列表（id,内容，状态）
      lists: [],
      taskDone: 0,
      setVal: {}
    }
  }
  //初始化lists和taskdone
  componentDidMount() {
    let lists = []
    if(localStorage.getItem('taskLists')) {
      lists = JSON.parse(localStorage.getItem('taskLists'))
    }
    let doneNum = 0
    lists.forEach((val,index) => {
      if(val.status === 1) {
        doneNum+=1
      }
    })
    this.setState({
      lists: lists,
      taskDone: doneNum
    })
  }

  //添加新任务
  addNewTask(item) {
    //避免直接操作state数据
    let allTask = []
    if(localStorage.getItem('taskLists')) {
      allTask = JSON.parse(localStorage.getItem('taskLists'))
    }
    let resetIndex = -1
    allTask.forEach((val,index) => {
      if(val.id === item.id) {
        resetIndex = index
      }
    })
    if(resetIndex != -1) {
      allTask.splice(resetIndex,1,item)
    }else {
      allTask.push(item)
    }
    this.setState({
      lists: allTask
    })
    localStorage.setItem('taskLists',JSON.stringify(allTask))
  }
  //删除任务
  deleteTask(item) {
    let lists = this.state.lists
    let doneNum = this.state.taskDone
    lists.forEach((val,index) => {
      if(val.id === item.id) {
        lists.splice(index,1)
        if(val.status === 1) {
          doneNum-=1
        }
      }
    })
    this.setState({
      lists: lists,
      taskDone: doneNum
    })
    localStorage.setItem('taskLists',JSON.stringify(lists))
  }
  //完成任务
  taskDone(item) {
    let lists = this.state.lists
    let doneNum = this.state.taskDone
    lists.forEach((val,index) => {
      if(val.id === item.id) {
        val.status = val.status == 0 ? 1 : 0
        if(val.status == 1) {
          doneNum++
        }else {
          doneNum--
        }
      }
    })
    this.setState({
      lists: lists,
      taskDone: doneNum
    })
    localStorage.setItem('taskLists',JSON.stringify(lists))
  }
  //筛选不同任务
  handleFilterList(type) {
    let lists = [],listTemp = []
    if(localStorage.getItem('taskLists')) {
      lists = JSON.parse(localStorage.getItem('taskLists'))
    }
    if(type === 0) {
      listTemp = lists
    }else if(type === 1) {
      listTemp = lists.filter((val,index) => {
        return val.status === 1
      })
    }else if(type === 2) {
      listTemp = lists.filter((val,index) => {
        return val.status === 0
      })
    }
    this.setState({
      lists: listTemp
    })
  }
  //任务可修改
  resetTaskClick(item) {
    this.refs.addIpt.refs.ipt.value = item.cont
    this.refs.addIpt.refs.ipt.focus()
    this.refs.addIpt.refs.addWrap.setAttribute('data-id',item.id)
    this.refs.addIpt.refs.addWrap.setAttribute('data-status',item.status)
  }

  render() {
    return (
      <div className="App">
        <h3 className="App-title">任务列表</h3>
        <ul className="App-wrap">
          {this.state.lists.map((val,index) => {
            return <ListItem deleteBtnClick={this.deleteTask} finishBtnClick={this.taskDone} resetTask={this.resetTaskClick} key={index} list={val} val={val}></ListItem>
          })}
          <li className={`tips ${this.state.lists.length === 0 ? '' : 'unshow'}`}>您暂时还没有添加新的任务</li>
        </ul>
        <p className="App-taskNum">
          <span className="done">已完成：<span>{this.state.taskDone}</span> 条</span>
          <span className="total">总计：<span>{this.state.lists.length}</span> 条</span>
        </p>
        <FilterBtn filterList={this.handleFilterList}></FilterBtn>
        <AddInput ref="addIpt" clickAddBtn={this.addNewTask} iptVal={this.state.setVal}></AddInput>
      </div>
    )
  }
}


export default App;

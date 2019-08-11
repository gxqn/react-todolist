import React,{Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import ListItem from './component/taskLists/taskLists';
import AddInput from './component/addTask/addTask';

class App extends Component {
  constructor(props) {
    super(props)
    this.addNewTask = this.addNewTask.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.taskDone = this.taskDone.bind(this)
    this.state = {
      //初始化的任务列表（id,内容，状态）
      lists: [],
      taskDone: 0
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
    let allTask = this.state.lists
    allTask.push(item)
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

  render() {
    return (
      <div className="App">
        <h3 className="title">任务列表</h3>
        <ul>
          {this.state.lists.map((val,index) => {
            return <ListItem deleteBtnClick={this.deleteTask} finishBtnClick={this.taskDone} key={index} list={val} val={val}></ListItem>
          })}
        </ul>
        <p className="taskNum">
          <span className="done">已完成：{this.state.taskDone}</span>
          <span className="total">总计：{this.state.lists.length}</span>
        </p>
        
        <AddInput clickAddBtn={this.addNewTask}></AddInput>
      </div>
    )
  }
}


export default App;

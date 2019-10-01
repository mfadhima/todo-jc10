import React from 'react';
import axios from 'axios'
import './App.css';

const urlApi = 'http://localhost:8080/'

class App extends React.Component {

  state = {
    data : [],
    inputTodo : '',
    selectInput : ''
  }

  componentDidMount() {
    this.getDataApi()
  }

  getDataApi = () => {
    axios.get(
      urlApi + 'getlist'
    ).then((res) => {
      this.setState({data : res.data})
    }).catch((err) => {
      console.log(err)
      alert('System Error')
    })
  }

  onDeleteClick = (id) => {
    axios.delete(
      urlApi + 'deletetodo/' + id
    ).then((res) => {
      this.getDataApi()
    }).catch((err) => {
      console.log(err)
      alert('System Error')
    })
  }

  onAddClick = () => {
    axios.post(
      urlApi + 'addtodo',
      {
        action : this.state.inputTodo
      }
    ).then((res) => {
      this.getDataApi()
    }).catch((err) => {
      console.log(err)
      alert('System Error')
    })
  }

  onSelectSearch = () => {
    if(this.state.selectInput < 2) {
      axios.get(
        urlApi + 'getlistcompleted',
        {
          params : {
            parameterKu : this.state.selectInput
          }
        }
      ).then((res) => {
        this.setState({data : res.data})
      }).catch((err) => {
        console.log(err)
        alert('System Error')
      })
    } else {
      this.getDataApi()
    }
  }

  buttonCompleteAction = (data_id) => {
    axios.put(
      urlApi + 'completetodo',
      {
        id : data_id
      }
    ).then((res) => {
      this.getDataApi()
      console.log('Update Success')
    }).catch((err) => {
      console.log(err)
    })
  }

  renderTodo = () => {
    let hasil = this.state.data.map((element, idx) => {
      if(element.isCompleted === 0) {
        return (
          <tr key={element.id}>
            <td>{idx +1}</td>
            <td>{element.action}</td>
            <td>{element.isCompleted ? 'v' : 'x'}</td>
            <td><input onClick={()=>(this.onDeleteClick(element.id))} type="button" value="DELETE" className="btn btn-danger"/></td>
            <td><input type="button" value="Complete Action" className="btn btn-secondary" onClick={()=>{this.buttonCompleteAction(element.id)}}/></td>
          </tr>
        )
      } else {
        return (
          <tr key={element.id}>
            <td>{idx +1}</td>
            <td>{element.action}</td>
            <td>{element.isCompleted ? 'v' : 'x'}</td>
            <td><input onClick={()=>(this.onDeleteClick(element.id))} type="button" value="DELETE" className="btn btn-danger"/></td>
            <td><input type="button" value="Complete Action" className="btn btn-secondary disabled" onClick={()=>{this.buttonCompleteAction(element.id)}}/></td>
          </tr>
        )
      }
    })
    return hasil
  }

  render() {
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Action</th>
              <th>Status</th>
              <th>Delete</th>
              <th>Button</th>
            </tr>
          </thead>

          <tbody>
            {this.renderTodo()}
          </tbody>

          <tfoot>
            <tr>
              <td>
                <input type="text" className="form-control" onChange={(e)=>{this.setState({inputTodo : e.target.value})}}/>
              </td>
              <td>
                <input type="button" value="Add Todo" className="btn btn-primary" onClick={this.onAddClick}/>
              </td>
              <td>
                <select className="form-control" onChange={(e)=>{this.setState({selectInput : e.target.value})}}>
                  <option value="2">All</option>
                  <option value="1">Done</option>
                  <option value="0">Not Done</option>
                </select>
              </td>
              <td>
                <input type="button" value="Search" className="btn btn-success" onClick={this.onSelectSearch}/>
              </td>
            </tr>
          </tfoot>
        </table>
        <hr/>
        <div className="row">
          <div className="offset-2 col-4">
            <input type="file" ref="fileBtn" className="d-none"/>
          <input type="button" onClick={() => {this.refs.fileBtn.click()}} value="Select a file" className="btn btn-block btn-primary"/>
          </div>
          <div className="col-4">
            <input type="button" value="Submit" className="btn btn-block btn-success"/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;

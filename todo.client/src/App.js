import './App.css';
import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
class App extends React.Component {
    constructor() {
        super();
        this.baseUrl = "https://localhost:5001";
        this.state = {
            todos: [], title: "",
        }
    }
    
    componentDidMount() {
        axios.get(`${this.baseUrl}/Api/todo`).then(p => this.setState({ todos: p.data.todos }))
    }

    // Refresh Data If Update In Todos
    componentDidUpdate(){
        axios.get(`${this.baseUrl}/Api/todo`).then(p => this.setState({ todos: p.data.todos }))
    }

    // Add A Todo
    AddTodo = () => {
        if (this.state.title === "") {
            swal("خطا", "نباید عنوان خالی باشد", "error");
        }
        else{
            axios.post(`${this.baseUrl}/Api/todo`, { 'title': this.state.title }).then(p => swal("موفقیت","با موفقیت افزوده شد","success"))
        }
    }

    // Change Status(If true Changed To false Or )
    ChangeStatus = (id) => {
        axios.put(`${this.baseUrl}/api/todo/${id}`).then(e => swal("موفقیت","با موفقیت وضعیت تغییر کرد","success"));
    }

    // Handle Change Title Value
    TitleChange = (e) => {
        this.setState({ title: e.target.value })
    }

    // Delete Todo With  Id
    DeleteTodo(id) {
        axios.delete(`${this.baseUrl}/Api/todo/${id}`).then(p =>swal("موفق","با موفقیت حذف شد", "warning"));
    }

    // render Page
    render() {
        return (
            <div className="App container">
                <div  className="header">
                    <h3>کار های من</h3>
                    <input onChange={this.TitleChange} type="text"  className="form-control" placeholder="عنوان"></input>
                    <span onClick={this.AddTodo} className="btn btn-primary">اضافه کردن</span>
                </div>

                <table className="table table-striped table-hover ">
                    <thead >
                        <tr>
                            <th >عنوان</th>
                            <th>حذف</th>
                            <th>وضعیت </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map((e) => <tr key={e.id}><td className={e.isEnded?'status':''} key={e.id}>{e.title}</td><td><button  className="btn btn-danger" onClick={() => this.DeleteTodo(e.id)}>حذف</button></td><td><input type="checkbox" onClick={()=>this.ChangeStatus(e.id)} defaultChecked={e.isEnded?true:false}></input></td></tr>)
                        }
                    </tbody>
                </table>

            </div>

        );
    }
}
export default App;
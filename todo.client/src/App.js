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
        // Binds
        this.TitleChange = this.TitleChange.bind(this);
        this.ChangeStatus = this.ChangeStatus.bind(this);
        this.AddTodo = this.AddTodo.bind(this);
        this.DeleteTodo = this.DeleteTodo.bind(this);
    }

    componentDidMount() {
        axios.get(`${this.baseUrl}/Api/todo`).then(p => this.setState({ todos: p.data.todos }))
    }

    // Refresh Data If Update In Todos
    componentDidUpdate() {
        axios.get(`${this.baseUrl}/Api/todo`).then(p => this.setState({ todos: p.data.todos })).catch(e => swal("خطا", "خطایی رخ داد بعدا تلاش کنید", "error"))
    }

    // Add A Todo
    AddTodo(e) {
        e.preventDefault();
        if (this.state.title === "") {
            swal("خطا", "نباید عنوان خالی باشد", "error");
        }
        else {
            axios.post(`${this.baseUrl}/Api/todo`, { 'title': this.state.title }).then(p => swal("موفقیت", "با موفقیت افزوده شد", "success")).catch(e => swal("خطا", "خطایی رخ داد بعدا تلاش کنید", "error"))
        }
    }

    // Change Status(If true Changed To false Or )
    ChangeStatus(id) {
        axios.put(`${this.baseUrl}/api/todo/${id}`).then(e => swal("موفقیت", "با موفقیت وضعیت تغییر کرد", "success")).catch(e => swal("خطا", "خطایی رخ داد بعدا تلاش کنید", "error"))
    }

    // Handle Change Title Value
    TitleChange(e) {
        this.setState({ title: e.target.value })
    }

    // Delete Todo With  Id
    DeleteTodo(id) {
        axios.delete(`${this.baseUrl}/Api/todo/${id}`).then(p => swal("موفق", "با موفقیت حذف شد", "warning")).catch(e => swal("خطا", "خطایی رخ داد بعدا تلاش کنید", "error"))
    }

    // render Page
    render() {
        return (
            <div className="App container">
                <div className="header">
                    <h3>کار های من</h3>
                    <form onSubmit={(e) => this.AddTodo(e)}>
                        <input onChange={this.TitleChange} type="text" className="form-control" placeholder="عنوان"></input>
                        <br></br>
                        <input type="submit" className="btn btn-primary" value="افزودن"></input>
                    </form>
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
                            this.state.todos.map((e) => {
                                return (
                                    <tr key={e.id}>
                                        <td className={e.isEnded ? 'status' : ''} key={e.id}>{e.title}</td>
                                        <td><button className="btn btn-danger" onClick={() => this.DeleteTodo(e.id)}>حذف</button></td>
                                        <td><input type="checkbox" onClick={() => this.ChangeStatus(e.id)} defaultChecked={e.isEnded ? true : false}></input></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
export default App;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class Course extends React.Component {

    state = {
        listUser: []
    }
    async componentDidMount() {
        try {
            let res = await axios.get("http://localhost:8080/v1/user/getAll");
            res.then(
                this.setState({
                    listUser: res.data
                })
            )
        } catch (e) {
            window.alert("Somethings wrong")
        }
        
    }

    render() {
        console.log(">>check res: ", this.state);
        let {listUser} = this.state;
        return (
            <div>
                <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUser && listUser.length > 0 &&
                        listUser.map((user, index) =>
                        <tr key={index + 1}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Course;
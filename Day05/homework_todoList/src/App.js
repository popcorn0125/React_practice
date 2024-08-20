import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Input from "./Input";
import Output from "./Output";

const App = () => {

    const [name, setName] = useState("Todo List");
    const [todoList, setToDoList] = useState([]);
    const [noCnt, setNoCnt] = useState(105);
    
    const serverURL = 'http://localhost:5000/toDoList';

    useEffect(() => {
        axios({
            method: 'get',
            url: serverURL,
        })
            .then((response) => {
                setToDoList(response.data);
            });
    })

    const onClickEvenet = (inputTitle) => {
        axios({
            method: 'post',
            url: serverURL,
            data: {
                title : inputTitle
            }
        })
            .then((response) => {
                setToDoList(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const onDelete = (item) => {
        axios({
            method: 'delete',
            url: serverURL,
            data : {
                no : item.no
            }
        })
            .then((response)=> {
                setToDoList(response.data);
            });
    }
    const onDoneFlag = (item) => {
        item.done = !item.done;
        axios({
            method: 'put',
            url: serverURL,
            data: {
                item : item
            }
        })
            .then((response)=>{
                setToDoList(response.data);
            })
    }

    const onEdit = (item) => {
        axios({
            method: 'put',
            url : serverURL,
            data : {
                item : item
            }
        })
            .then((response) => {
                setToDoList(response.data);
            })
    }
    const lineThrough = {textDecoration:"line-through", color:"blue"};

    return (
        <div className="todoList">
            <div className="App-header">
                <h1>{name} App</h1>
            </div>
            {/* todo 타이틀 입력 컴포넌트 위치 */}
            <Input onClickEvenet={onClickEvenet} />
            
            {/* todo 목록이 출력 되는 컴포넌트 위치 */}
            <Output todoList={todoList} onDoneFlag={onDoneFlag} onDelete={onDelete} onEdit={onEdit} />
        </div>
    )
}

export default App;
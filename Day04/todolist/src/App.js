import { useState } from "react";
import "./App.css";
import ItemRow from "./ItemRow";

const App = () => {
    // 전역변수를 state로 만들어야 re rendering 된다
    // 구조분해 할당 = 앞에는 state변수, 뒤에는 setter 함수
    const [name, setName] = useState("Todo List");
    const [todoList, setToDoList] = useState([
        // <li>팀 프로젝트 준비</li>,
        // <li>React 예습</li>,
        // <li>Vue 예습</li>
        { no : 101, title : "공부하기", done : false},
        { no: 102, title: "자바하기" , done:true },
        { no: 103, title: "리액트하기" , done:false},
        { no: 104, title: "스프링하기", done:false },

    ]);
    const [noCnt, setNoCnt] = useState(105);
    const [inputTitle, setInputTitle] = useState("");
    const [outputTitle, setoutputTitle] = useState("");
    const [flag, setFlag] = useState(false);
    const onClickEvenet = () => {
        // 기존 내용에 새 내용을 추가 해서 새 배열을 저장
        setToDoList([...todoList, { no: noCnt, title: inputTitle, done: false }]);
        setNoCnt(noCnt+1);
        setInputTitle("");
    }
    // function onClickEvenet() {
    //     alert("클릭 이벤트 발생");
    // }
    const onChangeTitle = (e) => {
        setInputTitle(e.target.value);
    }
    const onDelete = (item) => {
        const newList = todoList.filter((todo) => {
            return todo.no != item.no;
        });
        setToDoList(newList);
    }
    const onDoneFlag = ({no, title, done}) => {
        const newTodoList = [...todoList];
        todoList.forEach((item, index) => {
            if(item.no == no) {
                newTodoList[index].done = !done;
            }
        })
        // ...은 기존에 있는걸 복사해서 사용하겠다는 의미
        setToDoList(newTodoList);
    }

    const onEdit = ({ no, title, done }) => {
        const newTodoList = [...todoList];
        todoList.forEach((item, index) => {
            if (item.no == no) {
                newTodoList[index].title = title;
            }
        })
        // ...은 기존에 있는걸 복사해서 사용하겠다는 의미
        setToDoList(newTodoList);
    }
    const lineThrough = {textDecoration:"line-through", color:"blue"};

    return (
        <div className="todoList">
            <div className="App-header">
                <h1>{name} App</h1>
            </div>
            <div className="input-title">
                <div className="container">
                    <div className="input-group mb-3">
                        <input value={inputTitle} onChange={onChangeTitle} type="text" className="form-control" />
                        <div className="input-group-append">
                            <button className="btn btn-success" type="button" onClick={onClickEvenet}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="list-body">
                <div className="container">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Done</th>
                                <th>Title</th>
                                <th>Buttons</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                todoList.map((item) => {
                                    return (
                                        <tr key={item.no} >
                                            <td colSpan={3} style={{padding:"0px", margin:"0px"}}>
                                                <ItemRow item={item} onDoneFlag={onDoneFlag} onDelete={onDelete} onEdit={onEdit}/>
                                            </td>
                                        </tr>
                                        )
                                    }
                                )
                            }
                        </tbody>
                    </table>
                    
                </div>
            </div>
        </div>
    )
}

export default App;
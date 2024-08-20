import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Input from "./Input";
import Output from "./Output";

const App = () => {
    // 전역변수를 state로 만들어야 re rendering 된다
    // 구조분해 할당 = 앞에는 state변수, 뒤에는 setter 함수
    const [name, setName] = useState("Todo List");
    const [todoList, setToDoList] = useState([]);
    const [noCnt, setNoCnt] = useState(105);

    // useEffect() 훅 - 렌더링 되는 것과 비동기로 작동한다.
    // 비동기로 작동하므로 최초 한번만 실행 됨.
    // 훅은 콜백함수 내부에 포함 될 수 없다.
    // useEffect() 훅 내부에서 axios를 이용해서 처리.
    // npm i -S axios
    useEffect(() => {
        axios.get('http://localhost:5000/todo')
            .then( (response) => {
                setToDoList(response.data);
            });
    }, []);

    const onClickEvenet = (inputTitle) => {
        // 기존 내용에 새 내용을 추가 해서 새 배열을 저장
        setToDoList([...todoList, { no: noCnt, title: inputTitle, done: false }]);
        setNoCnt(noCnt+1);
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
            {/* todo 타이틀 입력 컴포넌트 위치 */}
            <Input onClickEvenet={onClickEvenet} />
            
            {/* todo 목록이 출력 되는 컴포넌트 위치 */}
            <Output todoList={todoList} onDoneFlag={onDoneFlag} onDelete={onDelete} onEdit={onEdit} />
        </div>
    )
}

export default App;
import { useState } from "react";
import "./App.css";
import ItemRow from "./ItemRow";
import Input from "./Input";
import Output from "./Output";

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

    const onClickEvenet = (inputTitle) => {
        // 기존 내용에 새 내용을 추가 해서 새 배열을 저장
        setToDoList([...todoList, { no: noCnt, title: inputTitle, done: false }]);
        setNoCnt(noCnt+1);
    }

    // function onClickEvenet() {
    //     alert("클릭 이벤트 발생");
    // }

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
import { useRef, useState } from "react";

const Input = ({onClickEvenet}) => {
    const [inputTitle, setInputTitle] = useState(""); // 초기화 안하면 undefined가 나옴

    // 훅은 콜백함수에 포함될 수 없다.
    const ref = useRef(null);

    return (
        <div className="input-title">
            <div className="container" style={{margin: "10px"}}>
                <div className="input-group mb-3">
                    <input autoFocus ref={ref} value={inputTitle} onChange={(e)=>setInputTitle(e.target.value)} type="text" className="form-control" />
                    <div className="input-group-append">
                        <button className="btn btn-success" type="button" onClick={(e) => {
                            if(inputTitle === "" || inputTitle === null) {
                                alert("내용이 없습니다.")
                                ref.current.focus();
                                return;
                            }
                            onClickEvenet(inputTitle);
                            setInputTitle("");
                            // useRef() 훅 사용 focus 잡아줌.
                            ref.current.focus();
                        }}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// default는 하나만 사용할 때 작성
export default Input;

/* 여러 컴포넌트를 등록할 경우
const Input

const InputSub = () => . . .

export {Input, InputSub}; 여러개일 때는 이렇게 사용하면 된다.
*/
// 그리고 불러올 때는 import {Input, InputSub} from "./Input"
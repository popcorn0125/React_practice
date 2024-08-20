import { useState } from "react";

const ItemRow = ({item, onDoneFlag, onDelete, onEdit}) => {
    const [flag, setFlag] = useState(false);
    const [outputTitle, setoutputTitle] = useState(item.title);
    const lineThrough = {textDecoration:"line-through", color: "blue"};
    const [titleTmp, setTitleTmp] = useState(item.title);
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <div className="input-group-text">
                    <input onChange={() => {
                        onDoneFlag(item);
                    }} checked={item.done && "checked"} type="checkbox" />
                </div>
            </div>
            <input
                style={item.done ? lineThrough : {}}
                type="text" className="form-control"
                readOnly={flag ? "" : "readOnly"}
                value={outputTitle}
                onChange={(e) => {
                    setoutputTitle(e.target.value);
                    setTitleTmp(e.target.value);
                }}
                onFocus={(e) => {
                    setFlag(true);
                }}
                onBlur={(e) => {
                    setFlag(false);
                    setoutputTitle(item.title);
                }} />
            <div className="input-group-append">
                <button onClick={() => {
                    setoutputTitle(titleTmp);
                    onEdit({no:item.no, title:titleTmp, done:item.done});
                }} className="btn btn-primary" type="button">Edit</button>
                <button className="btn btn-danger" type="button" onClick={() => {
                    onDelete(item)
                }} >DELETE</button>
            </div>
        </div>
    );
}

export default ItemRow;
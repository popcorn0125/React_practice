const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.set('port', 5000);

app.use('/', express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const newToDoList = [
    { no: 101, title: "공부하기", done: false },
    { no: 102, title: "자바하기", done: false },
    { no: 103, title: "리액트하기", done: false },
    { no: 104, title: "스프링하기", done: false }
]
let noCnt = 105;

// 목록 출력
app.get('/toDoList', (req, res) => {
    res.send(newToDoList);
})

// 새로운 List 등록 및 출력
app.post('/toDoList', (req, res) => {
    // 할일 목록
    const newInputToDo = {
        no : noCnt++,
        title: req.body.title,
        done: false
    };
    newToDoList.push(newInputToDo);
    res.send(newToDoList);
})

// 수정
app.put('/toDoList', (req, res) => {
    const idx = newToDoList.findIndex((item) => {
        return item.no === parseInt(req.body.item.no);
    })
    if (idx != -1) {
        newToDoList[idx] = req.body.item;
    }
    res.send(newToDoList);
})

// 목록 삭제
app.delete('/toDoList', (req, res) => {
    const idx = newToDoList.findIndex((item) => {
        return item.no === parseInt(req.body.no);
    })
    if( idx != -1 ) {
        newToDoList.splice(idx, 1);
    }
    res.send(newToDoList);
})

const server = http.createServer(app);
server.listen(app.get('port'), ()=>{
    console.log('서버 실행 중 >>> http://localhost:' + app.get('port') );
});


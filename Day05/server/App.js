const http = require('http');
const express = require('express');
const app = express();

app.set('port', 5000);

// static 미들 웨어
app.use('/', express.static('public'));

// 데이터 임시 저장 배열
const todoList = [
    { no: 101, title: "공부하기(서버)", done: false },
    { no: 102, title: "자바하기(서버)", done: true },
    { no: 103, title: "리액트하기(서버)", done: false },
    { no: 104, title: "스프링하기(서버)", done: false },
];

app.get('/todo', (req, res) => {
    // 목록 출력
    res.send(todoList);
});

app.post('/todo', (req, res) => {
    // 할일 입력
    res.send(todoList);
});

app.put('/todo', (req, res) => {
    // 할일 수정
    res.send(todoList);
});

app.delete('/todo', (req, res) => {
    // 할일 삭제
    res.send(todoList);
});

const server = http.createServer(app);
server.listen(app.get('port'), ()=>{
    console.log('실행 중 >> http://localhost:' + app.get('port'));
});

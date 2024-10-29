const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 파일에서 데이터베이스 설정 불러오기
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mariaDB = require('mariadb');

const pool = mariaDB.createPool({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database,
    connectionLimit: 5
});

const multer = require('multer');
const upload = multer({ dest: './upload' });

app.get('/api/customers', async (req, res) => {
    let conn;
    try {
        // 풀에서 연결 가져오기
        conn = await pool.getConnection();

        // 쿼리 실행
        const rows = await conn.query("SELECT * FROM CUSTOMER");

        // 결과를 클라이언트로 전송
        res.send(rows);
    } catch (err) {
        // 오류 발생 시 로그 출력 및 오류 응답 전송
        console.error('쿼리 실행 중 오류 발생:', err);
        res.status(500).send('Internal Server Error');
    } finally {
        if (conn) conn.release(); // 항상 연결을 풀로 반환
    }
});

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: '업로드된 파일이 없음' });
    }
    console.log(req.body);  // 전달된 폼 데이터 로그
    console.log(req.file);  // 파일 정보 로그

    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)';
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;       
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];

    let conn;
    try {
        // 풀에서 연결 가져오기
        conn = await pool.getConnection();
        // 쿼리 실행
        const result = await conn.query(sql, params);
        // BigInt 값이 있는지 확인하고 문자열로 변환
        const resultStringified = JSON.parse(JSON.stringify(result, (key, value) => 
            typeof value === 'bigint' ? value.toString() : value
        ));
        // 결과를 클라이언트로 전송
        res.json(resultStringified);
    } catch (err) {
        // 오류 발생 시 로그 출력 및 오류 응답 전송
        console.error('쿼리 실행 중 오류 발생:', err);
        res.status(500).send('내부 서버 오류');
    } finally {
        if (conn) conn.release(); // 항상 연결을 풀로 반환
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
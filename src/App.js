import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import { styled } from '@mui/system';
import { Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
  overflowX: 'auto',
}));

const StyledTable = styled(Table)({
  minWidth: 1080,
});

const customers = [
  {
    'id' : 1,
    'image' : 'https://placeimg.com/64/64/1',
    'name' : '홍길동',
    'birthday' : '960911',
    'gender' : '남자',
    'job' : '대학생'
  },
  {
    'id' : 2,
    'image' : 'https://placeimg.com/64/64/2',
    'name' : '춘향',
    'birthday' : '990312',
    'gender' : '여자',
    'job' : '프로그래머'
  },
  {
    'id' : 3,
    'image' : 'https://placeimg.com/64/64/3',
    'name' : '누군가',
    'birthday' : '000000',
    'gender' : '남자',
    'job' : '교수'
  }
]

function App() {
  return (
    <Root>
      <Paper>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.id}</TableCell>
                <TableCell>
                  <img src={c.image} alt={c.name} />
                </TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.birthday}</TableCell>
                <TableCell>{c.gender}</TableCell>
                <TableCell>{c.job}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </Paper>
    </Root>
  );
}

export default App;

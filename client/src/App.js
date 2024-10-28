import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import { CircularProgress, Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { styled } from '@mui/system';

// 스타일 정의 (styled 사용)
const Root = styled('div')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
  overflowX: 'auto',
}));

const StyledTable = styled(Table)({
  minWidth: 1080,
});

const ProgressWrapper = styled('div')(({ theme }) => ({
  margin: theme.spacing(2)
}));

class App extends Component {

  state = {
    customers: "",  // 고객 정보 초기 상태
    completed: 0  // Progress Bar의 초기 상태
  }

  // 컴포넌트가 마운트될 때 실행
  componentDidMount() {
    this.timer = setInterval(this.progress, 20);  // 타이머 설정
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }

  // 컴포넌트가 언마운트될 때 타이머 해제
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  // API 호출 함수
  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  // Progress Bar 증가 함수
  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  }

  render() {
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
              {this.state.customers ? this.state.customers.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.id}</TableCell>
                  <TableCell><img src={c.image} alt={c.name} /></TableCell>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.birthday}</TableCell>
                  <TableCell>{c.gender}</TableCell>
                  <TableCell>{c.job}</TableCell>
                </TableRow>
              )) :
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <ProgressWrapper>
                      <CircularProgress variant="determinate" value={this.state.completed} />
                    </ProgressWrapper>
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </StyledTable>
        </Paper>
      </Root>
    );
  }
}

export default App;

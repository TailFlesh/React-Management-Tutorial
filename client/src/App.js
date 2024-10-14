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

class App extends Component {

  state = {
    customers:""
  }

  componentDidMount(){
    this.callApi()
    .then(res => this.setState({customers:res}))
    .catch(err => console.log(err));
  }

  callApi = async() => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  render() {
    const {classes } = this.props;
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
                  <TableCell>
                    <img src={c.image} alt={c.name} />
                  </TableCell>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.birthday}</TableCell>
                  <TableCell>{c.gender}</TableCell>
                  <TableCell>{c.job}</TableCell>
                </TableRow>
              )) : ""}
            </TableBody>
          </StyledTable>
        </Paper>
      </Root>
    );
  }
}

export default App;

import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export default function Home() {
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  useEffect(() => {
    UsersGet()
  }, [])
  
  const UsersGet = () => {
    fetch("http://localhost:8080/api/member/getAll")
    // fetch("https://www.mecallapi.com/api/users")
      .then(res => res.json())
      .then(
        (result) => {
          setUsers(result)
          console.log(result)
        }
      )
  }

 
  const UpdateUser = id => {
    window.location = '/updateForm/'+id
  }


  const UserDelete = id => {
    var data = {
      'id': id
    }
    fetch(`http://localhost:8080/api/member/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(
      (result) => {
        alert(result['message'])
        if (result['status'] === 'ok') {
          UsersGet();
          console.log(result)
        }
      }
    )
  }

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">    
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                고객 정보
              </Typography>
            </Box>
            <Box>
              <Link to="/saveForm" className="navbar-brand">
                <Button variant="contained" color="primary">
                    추가
                </Button>
            </Link>{" "}
            </Box>
          </Box>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell align="center">조회수</TableCell>
                <TableCell align="left">이름</TableCell>
                <TableCell align="left">성별</TableCell>
                <TableCell align="left">이메일</TableCell>
                <TableCell align="left">출생년도</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.ID}>
                  <TableCell align="right">{user.id}</TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center">
                      <Avatar src={user.avatar} />
                    </Box>
                  </TableCell>
                  <TableCell align="left">{user.name}</TableCell>
                  <TableCell align="left">{user.gender}</TableCell>
                  <TableCell align="left">{user.userEmail}</TableCell>
                  <TableCell align="left">{user.birthYear}</TableCell>

                  <TableCell align="center">
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                      <Button onClick={() => UpdateUser(user.id)}>수정</Button>
                      <Button onClick={() => UserDelete(user.id)}>삭제</Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
      </Container>
    </div>
    
  );
}






// import { useEffect, useState } from "react";
// import BookItem from "../../components/BookItem";
// import Table from 'react-bootstrap/Table';


// const Home = () => {
//   const [members, setMembers] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8080/api/member/getAll")
//       .then((res) => res.json())
//       .then((res) => {
//         console.log(1, res);
//         setMembers(res);
//       });
//   }, []);

//   return (
//     <div>
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>이름</th>
//               <th>이메일</th>
//               <th>출생년도</th>
//               <th>성별</th> 
//               <th>Action</th>
//             </tr>
//           </thead>
//         </Table>
//       {members.map((member) => (
//         <BookItem key={member.id} book={member}/>
//       ))}
//     </div>

//   );
// };

// export default Home;
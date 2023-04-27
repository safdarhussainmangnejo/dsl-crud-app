import axios from 'axios';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useTheme, styled } from '@mui/material/styles';
import {
  Card,
  Table,
  Stack,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableHead
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  margin: theme.spacing(2, 4),
  borderRadius: theme.shape.borderRadiusSm
}));


export default function Userslist(t) {
  const [selected, setSelected] = useState([]);
  const [users, setUsers]=useState({});
  const [usersnumber, setusersNumber]=useState({});

  const navigate = useNavigate();

  const displayUsers =  () => {
    fetch('http://localhost:8080/displayUsers')
      .then(response => response.json())
      .then(data => {setUsers(data);
        console.log("Users Data : ",data, "and type of Users ", typeof(users));  
        }
      )
  }


    const handleDeleteUser = async (userId) => {
      let response = '';
      try
      {
          response = await axios.delete(`http://localhost:8080/deleteUser/${userId}`);
          console.log('deleted User is : ', response);
          setTimeout(displayUsers(),500);
      }
      catch(error)
      {
        console.log('Delete User api error: ', error);
      }
     
    };

    const totalUsers =()=>{
      fetch(`http://localhost:8080/totalUsers`)
        .then((response) => response.json())
        .then((data) => {
          if (!data) {
            console.log('User Not found----------');
          } else {
            setusersNumber(data.totalUsers);
          }
        });
    }
    
    

    

  useEffect(() => {
    displayUsers();  
    totalUsers();
  }, []);

  const handleUpdateUser = async (userId) => {
      
    navigate(`/edituser/${userId}`)
   
  };

   return (<Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 100,
                  }}
                >
                  <Typography variant="h3" component="div">Welcome to DSL Users Dashboard</Typography>
                  
                 
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 100,
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                            
                  <Typography variant="h4" component="div">Total Users</Typography>
                  <Typography variant="h5" component="div">{usersnumber}</Typography>
                            
                  </Stack>
                  
                  
                </Paper>
              </Grid>
              
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  
                <Table>
                  
                    <TableCell>
                        Image
                      </TableCell>
                      <TableCell>
                        Name
                      </TableCell>
                      <TableCell>
                        Address
                      </TableCell>
                      <TableCell>
                        Phone
                      </TableCell>
                      <TableCell>
                        Edit
                      </TableCell>
                      <TableCell>
                        Delete
                      </TableCell>
                  
                  
                  <TableBody>
                  
                  { users?.length>0 && users?.map((row)=>{
                    
                    const { _id, name, address, phone, about, image } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        
                        <TableCell  scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={1}>
                            
                            <ThumbImgStyle alt={name} src={image} />
                            
                          </Stack>
                        </TableCell>
                        <TableCell align="left"><Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography></TableCell>
                        <TableCell align="left">{address}</TableCell>
                        <TableCell align="left">{phone}</TableCell>
                        
                        <TableCell align="left">
                          <IconButton id={_id} color="primary" aria-label="edit" onClick={()=>{handleUpdateUser(_id)}} >
                          <EditIcon />
                        </IconButton>
                        </TableCell>

                        <TableCell>
                          <IconButton id={_id} aria-label="delete" onClick={()=>{handleDeleteUser(_id)}}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                 
                </TableBody>
              </Table>

                </Paper>
              </Grid>
            </Grid>
            
          </Container>
        </Box>)
};
import React,{useEffect,useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom'; 
import clsx from 'clsx'; 
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BookIcon from '@material-ui/icons/Book';
import TuneIcon from '@material-ui/icons/Tune';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardPage from './DashboardPage';
import Testimonial from './Testimonial';
import Profile from './Profile';
import Slider from './Slider';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Dashboard = () => {
  let history = useHistory(); 
  useEffect(() => {
    console.log("Document ready");
    // If not logged in then redirect to login.
    setCurrentComponent (() => { return window.location.pathname; })
  });


  

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const menuList = [
    {text:'Dashboard',link:'dashboard',icon:<DashboardIcon/>},
    {text:'Testimonial', link:'testimonial',icon:<BookIcon/>},
    {text:'Slider',link:'slider',icon:<TuneIcon/>},
    {text:'Profile',link:'profile',icon:<AccountBoxIcon/>},
    {text:'Logout',link:'logout',icon:<ExitToAppIcon/>}
  ];

  const [currentComponent,setCurrentComponent] = useState(window.location.pathname);

  const checkCurrentPage = ()=>{
    console.log("path: "+window.location.pathname);
    /* setCurrentComponent = () => {
      return window.location.pathname;
    } */
    console.log("component: "+currentComponent);
    if(currentComponent == "/admin/dashboard" || currentComponent == "/admin"){
      return <Typography paragraph><DashboardPage/></Typography> 
     }else if(currentComponent == "/admin/testimonial"){  
      return <Typography paragraph><Testimonial/></Typography>
     }else if(currentComponent == "/admin/slider"){  
      return <Typography paragraph><Slider/></Typography>
     }else if(currentComponent == "/admin/profile"){  
      return <Typography paragraph><Profile/></Typography>
     }
  } 

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            M<span className="text text-danger">@</span>S
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuList.map((text, index) => (
            <NavLink to={text.link} style={{ textDecoration:"none", color:"gray" }}> 
              <ListItem button key={text.text}>
                  <ListItemIcon>{text.icon}</ListItemIcon>
                  <ListItemText primary={text.text} /> 
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Drawer> 
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {checkCurrentPage()}
      </main>
    </div>
  );
}
export default Dashboard;

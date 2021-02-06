import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Loader from '../Loader/Loader'
import {loadChannels} from './../../../redux/reducers/channelsReducer'
import { Link } from 'react-router-dom'
import css from './Menu.module.css'
import TelegramIcon from '@material-ui/icons/Telegram'
import AddBoxIcon from '@material-ui/icons/AddBox'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
      
    },
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      //width: `calc(100% - ${drawerWidth}px)`,
      width: '100%',
      marginLeft: drawerWidth,
      zIndex: '9999',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
  title: {
    [theme.breakpoints.down(500)]: {
      fontSize: 15
    },
    [theme.breakpoints.down(350)]: {
      fontSize: 12,
    },
  }
}));

function ResponsiveDrawer(props) {

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  useEffect(() => {
    props.loadChannels(props.token)
  }, [])
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
        <Divider />
        <List>
          <Link to='/channel/add' className={css.Link}>
            <ListItem button key="1">
              <ListItemIcon><AddBoxIcon /></ListItemIcon>
              <ListItemText primary="Додати канал" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          {props.channels && props.channels.length !== 0 && props.channels.map((el) => (
            <Link to={`/channel/${el._id}`} className={css.Link}>
              <ListItem button key={el.name}>
                <ListItemIcon><TelegramIcon /></ListItemIcon>
                <ListItemText primary={el.name} />
              </ListItem>
            </Link>
          ))}
        </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      {props.fetching && <Loader></Loader>}
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap>
            Telegram channel content manager
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    channels: state.channels.channels,
    fetching: state.channels.fetching,
    token: state.auth.token
  }
}
const mapDispatchToProps = {
  loadChannels
}
export default connect(mapStateToProps,mapDispatchToProps)(ResponsiveDrawer)
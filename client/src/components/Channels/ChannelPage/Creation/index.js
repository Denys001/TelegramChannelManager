import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import CreatePost from '../CreatePost'
import CreateQuiz from '../CreateQuiz';
function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Box height={15}></Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}
function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  }
}

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
    padding: 0
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
  // [theme.breakpoints.down(421)]: {
  //   root: {
      
  //   }
  // },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    padding: 0,
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
  [theme.breakpoints.down(421)]: {
    root: {
      padding: 0
    }
  },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: 0,
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
  demo2: {
    backgroundColor: '#2e1534',
  },
  p0: {
    padding: 0
  },
  [theme.breakpoints.down(421)]: {
    tabs: {
      fontSize: 10,
      padding: 0
    }
  },
}));

export default function CustomizedTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.demo1}>
        <AntTabs value={value} className={classes.p0} onChange={handleChange} aria-label="ant example" centered>
          <AntTab className={classes.tabs} label="Створити пост"  {...a11yProps(0)} />
          <AntTab className={classes.tabs} label="Створити опитування"  {...a11yProps(1)} />
        </AntTabs>
        <TabPanel value={value} index={0} className={classes.p0}>
          <CreatePost className={classes.p0} channel_id={props.channel_id} />
        </TabPanel>
        <TabPanel value={value} index={1} className={classes.p0}>
          <CreateQuiz/>
      </TabPanel>
      </div>
    </div>
  );
}

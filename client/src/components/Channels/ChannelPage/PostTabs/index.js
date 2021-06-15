import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import Posts from '../Posts'
import Archive from '../Archive'
import Trash from '../Trash'

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
    padding: 0,
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
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
    padding: theme.spacing(3),
  },
  p0: {
    padding: 0,
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
  demo2: {
    backgroundColor: '#2e1534',
  },
  [theme.breakpoints.down(321)]: {
    tabs: {
      fontSize: 10,
      padding: 0,
      margin: 0
    }
  },
  [theme.breakpoints.down(475)]: {
    tabs: {
      //fontSize: 10,
      padding: 0,
      margin: 0
    }
  },
}));

export default function CustomizedTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.demo1}>
        <AntTabs className={classes.p0} value={value} onChange={handleChange} aria-label="ant example" centered>
          <AntTab label="Опубліковано"  {...a11yProps(0)} className={classes.tabs} />
          <AntTab label="Архів"  {...a11yProps(1)} className={classes.tabs} />
          <AntTab label="Корзина"  {...a11yProps(2)} className={classes.tabs} />
        </AntTabs>
        {/* <Typography className={classes.padding} /> */}
        <TabPanel className={classes.p0} value={value} index={0}>
          <Posts />
        </TabPanel>
        <TabPanel className={classes.p0} value={value} index={1}>
          <Archive />
        </TabPanel>
        <TabPanel className={classes.p0} value={value} index={2}>
          <Trash />
        </TabPanel>
      </div>
    </div>
  );
}

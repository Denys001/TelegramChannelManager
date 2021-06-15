import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import FilterIcon from '@material-ui/icons/Folder'
import SettingsIcon from '@material-ui/icons/Settings';
import PostAddIcon from '@material-ui/icons/PostAdd'
import TimelineIcon from '@material-ui/icons/Timeline'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useSelector, useDispatch } from 'react-redux'
import POSTS from '../../../modules/posts'
import STATISTIC from '../../../modules/statistic'
import Statistic from './Statistic'
import PostTabs from './PostTabs'
import Creation from './Creation'
import ChannelDetails from '../../ChannelPage'

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
        <Box p={3}>
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
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexWrap: 'wrap',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  box: {
    '&$.MuiBox-root': {
      padding: '0px',
    },
  },
  [theme.breakpoints.down(670)]: {
    tab: {
      fontSize: 10,
      padding: 2,
    }
  },
  [theme.breakpoints.down(331)]: {
    tab: {
      fontSize: 7.5,
    },
    icon:{
      fontSize: 18,
      //display: 'none'
    },
    tabPanel: {
      padding: 0
    }
  },
  
}))

function ChannelPage(props) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const id = props.match.params.id
  const id_ = useSelector(POSTS.getCurrentChannel)
  useEffect(() => {
    dispatch(POSTS.posts(id))
    dispatch(STATISTIC.load())
  }, [id_])
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          className={classes.tabPanel}
          // variant="scrollable"
          // scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
          centered
        >
          <Tab className={classes.tab} label="Створити пост" icon={<PostAddIcon className={classes.icon}/>} {...a11yProps(0)} />
          <Tab className={classes.tab} label="Пости" icon={<FilterIcon className={classes.icon}/>} {...a11yProps(1)} />
          <Tab className={classes.tab} label="Статистика" icon={<TimelineIcon className={classes.icon}/>} {...a11yProps(2)} />
          <Tab className={classes.tab} label="Налаштування" icon={<SettingsIcon className={classes.icon}/>} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel className={classes.tabPanel} value={value} index={0} >
        <Creation channel_id={id}/>
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={value} index={1} >
        <PostTabs/>
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={value} index={2} classes={{ root: classes.box }} id="specialTab" component='p' >
        <Statistic/>
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={value} index={3} >
        <ChannelDetails/>
      </TabPanel>
    </div>
  )
}

export default ChannelPage
import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import FilterIcon from '@material-ui/icons/Folder'
import StorageIcon from '@material-ui/icons/Storage'
import PostAddIcon from '@material-ui/icons/PostAdd'
import TimelineIcon from '@material-ui/icons/Timeline'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Posts from '../ChannelPage/Posts/Posts'
import CreatePost from '../ChannelPage/CreatePost/CreatePost'
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
  [theme.breakpoints.down(429)]: {
    tab: {
        fontSize: 9
    }
  },
  [theme.breakpoints.down(321)]: {
    tab: {
        fontSize: 7.5
    }
  }
}))

function ChannelPage(props) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const id = props.match.params.id
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          //variant="scrollable"
          //scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
          centered
        >
          <Tab className={classes.tab}  label="Створити пост" icon={<PostAddIcon />} {...a11yProps(0)} />
          <Tab className={classes.tab} label="Пости" icon={<FilterIcon />} {...a11yProps(1)} />
          <Tab className={classes.tab} label="Архів" icon={<StorageIcon />} {...a11yProps(2)} />
          <Tab className={classes.tab} label="Статистика" icon={<TimelineIcon />} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CreatePost channel_id={id}></CreatePost>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Posts></Posts>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
    </div>
  )
}

export default ChannelPage
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import { useDispatch } from 'react-redux'
import TrashStore from '../../../../../../../modules/trash'
import PostsStore from '../../../../../../../modules/posts'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { useHistory } from 'react-router-dom'

const options = ['Переглянути', 'Опублікувати', 'Повернути в архів', 'Видалити']

function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  buttons: {
    dispalay: "flex",
    justifyContent: 'space-around'
  }
}))


export default function SplitButton(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  let history = useHistory()
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const [selectedIndex, setSelectedIndex] = React.useState(1)

  const [modalStyle] = React.useState(getModalStyle)
  const [openModal, setOpenModal] = React.useState(false)
  const handleOpenModal = () => {
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
  }
  const confirmed = () => {
    //dispatch(TrashStore.delete(props.id))
    dispatch(TrashStore.delete(props.id))
    setOpenModal(false)
  }
  const handleClick = (index) => {
    switch (options[index]) {
      case 'Опублікувати': {
        dispatch(TrashStore.backToPublished(props.id))
        break
      }
      case 'Повернути в архів': {
        dispatch(TrashStore.backToArchive(props.id))
        break
      }
      case 'Видалити': {
        setOpenModal(true)
        break
      }
      case 'Переглянути': {
        dispatch(PostsStore.setCurrentPost(props.post))
        history.push(`/post/${props.id}`)
      }
    }
  }

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setOpen(false)
    handleClick(index)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <ButtonGroup variant="default" color="default" ref={anchorRef} aria-label="split button">
          {/* <Button onClick={handleClick}>{options[selectedIndex]}</Button> */}
          <IconButton
            color="default"
            component="span"
            onClick={handleToggle}
          >
            <MoreVertIcon />
          </IconButton >
        </ButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        onClick={
                          (event) => {
                            handleMenuItemClick(event, index)
                          }
                        }
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Ви впевнені що хочете видалити пост?</h2>
          <Grid container spacing={3}>
            <Grid item xs>
              <Grid item xs={3}>
                <Paper>   </Paper>
              </Grid>
              <Button variant="contained" color="primary" onClick={confirmed}>
                Так
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" color="secondary" onClick={() => setOpenModal(false)}>
                Ні
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </Grid>
  )
}

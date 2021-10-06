import React from "react";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import useStyles from "../CustomAppBar/Styles";
import PhotoAlbumIcon from "@material-ui/icons/PhotoAlbum";
import ListAltIcon from "@material-ui/icons/ListAlt";
import "./Drawer.css";
import { Avatar, CssBaseline, Drawer, Typography, useTheme } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useLocation, withRouter } from "react-router";
import HomeIcon from "@material-ui/icons/Home";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import UsersModal from "../UsersModal/UsersModal";

const pages = {
  post: {
    id: 1,
    title: "Publications",
    descr: "Liste des publications",
    path: "/",
  },
  toDo: {
    id: 2,
    title: "To Do",
    descr: "Liste des ToDo",
    path: "/todo",
  },
  album: {
    id: 3,
    title: "Mes Albums",
    descr: "Liste des Albums",
    path: "/album",
  },
};


const CustomAppBar = ({RouteContent}) => {
  const location = useLocation();
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user_menenu_open = Boolean(anchorEl);;
  const [open, setOpen] = React.useState(true);
  const [modalUsersOpen, setModalUsersOpen] = React.useState(false);
  const [connectedUser,setConnectedUser] = React.useState('1'); 

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleBottomUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseModal = (id_user) =>{
    setModalUsersOpen(false);
    setConnectedUser(id_user);
  }

  const handleOpenModal = () => {
    setModalUsersOpen(true);
    handleCloseMenu();
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <UsersModal open={modalUsersOpen} 
        handleClose={handleCloseModal}/>
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
            onClick={handleDrawer}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap className={classes.titlePage}>
            {(location.pathname===pages.post.path) ? pages.post.title: ""}
            {(location.pathname===pages.album.path) ? pages.album.title: ""}
            {(location.pathname===pages.toDo.path) ? pages.toDo.title: ""}
          </Typography>

          <div className={classes.containerAccount}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleBottomUserMenu}
              color="inherit"
            >
              <Avatar
                aria-label="recipe" 
                src={'avatar/'+ connectedUser + '.jpg'}/>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={user_menenu_open}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                <MenuItem onClick={handleOpenModal}>Changer de compte</MenuItem>
              </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawer}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>

        <Divider />

        <List>
        <Link to={pages.post.path}>
          <ListItem
            button
            className={
              location.pathname === pages.post.path ? classes.menuActif : ""
            }
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={pages.post.title} />
          </ListItem>
        </Link>
        <Link to={pages.album.path}>
          <ListItem
            button
            className={
              location.pathname === pages.album.path ? classes.menuActif : ""
            }
          >
            <ListItemIcon>
              <PhotoAlbumIcon />
            </ListItemIcon>
            <ListItemText primary={pages.album.title} />
          </ListItem>
        </Link>

        <Link to={pages.toDo.path}>
          <ListItem
            button
            className={
              location.pathname === pages.toDo.path ? classes.menuActif : ""
            }
          >
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary={pages.toDo.title} />
          </ListItem>
        </Link>
      </List>

      </Drawer>

      <RouteContent {...{open}}/>
    </div>
  );
};

export const CAppBar = withRouter(CustomAppBar);

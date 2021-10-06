import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import clsx from "clsx";
import useStyles from "../components/CustomAppBar/Styles";
import ToDo from "./ToDo";
import Post from "./Post";
import Album from "./Album";
import { Typography } from "@material-ui/core";
import { CAppBar } from "../components/CustomAppBar";
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

const Navigator = () => {
  const classes = useStyles();

  return (
    <Router>
      <CAppBar
        RouteContent={({open}) => {
          return (
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: open,
              })}
            >
              <div className={classes.drawerHeader} />
              <Typography paragraph>
                <Switch>
                  <Route path={pages.toDo.path}>
                    <ToDo />
                  </Route>
                  <Route path={pages.album.path}>
                    <Album />
                  </Route>
                  <Route path={pages.post.path}>
                    <Post />
                  </Route>
                </Switch>
              </Typography>
            </main>
          );
        }}
      />
    </Router>
  );
};

export default Navigator;

import React, { useEffect, useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
// import { makeStyles } from "@material-ui/core/styles";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { bugs, website, server } from "variables/general.js";

import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import AddPopup from "../../components/AddPopup";

import logout from "../../actions/logoutUser";
import clearAlert from "../../actions/clearAlert";

import axios from "axios";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { object } from "prop-types";

const useStyles = makeStyles(styles);

let textStyle = {
  color: "red",
  textDecoration: "line-through",
};
let paddingStyle = {
  padding: "30px",
};

let padding = {
  float: "right",
  marginTop: "-10px",
};

export default function Dashboard(props) {
  let [todos, updateTodo] = useState([]);
  let [open, setOpen] = React.useState(false);
  let todolist = {
    title: "",
    description: "",
    id: "",
    // email: props.user.email,
    email: "pravin@pravin.com",
  };
  const user = {
    firstName: "pravin",
  };

  // let [auth] = useState(props.user);
  let [auth] = useState(user);
  const [todo, setTodo] = React.useState(todolist);

  // const UserEmail = props.user.email;
  const UserEmail = "pravin@pravin.com";
  let getData = async () => {
    let res = await axios.post("http://localhost:3001/getList", { UserEmail });
    console.log("pravin", res);

    updateTodo(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  let updateLatest = (todo) => updateTodo(todo);

  function handleClose() {
    setOpen(false);
  }

  function editList(val) {
    setTodo({
      title: val.title,
      description: val.description,
      id: val.todo_id,
    });
    setOpen(true);
  }

  function handleChange(e) {
    setTodo({
      ...todo,
      [e.target.id]: e.target.value,
    });
  }

  async function handleUpdate(type, id = "") {
    if (type === "edit") {
      await axios.post("http://localhost:3001/updateList", { ...todo, type });
      setOpen(false);
    }
    if (type === "status") {
      await axios.post("http://localhost:3001/updateList", {
        id: id.id,
        status: id.event.target.checked,
        type,
      });
    }
    if (type === "delete") {
      await axios.post("http://localhost:3001/updateList", { id, type });
    }
    let res = await axios.post("http://localhost:3001/getList", { UserEmail });
    updateTodo(res.data);
  }

  let handleLogOut = () => {
    props.logout();
    props.history.push("/login");
  };

  if (props.user == "undefined") {
    props.history.push("/login");
  }
  const classes = useStyles();

  return (
    <div style={paddingStyle}>
      <AddPopup
        updateLatest={(todo) => updateLatest(todo)}
        editList={() => editList()}
        todo={todo}
      />

      <Grid item xs={12} md={6}>
        <List className={classes.root}>
          {todos.length > 0 &&
            todos.map((val) => (
              <ListItem key={val.todo_id} role={undefined} dense button>
                <ListItemIcon>
                  <Checkbox
                    onChange={(event) =>
                      handleUpdate("status", { id: val.todo_id, event })
                    }
                    edge="start"
                    checked={val.status === 1 ? true : false}
                    disableRipple
                    inputProps={{ "aria-labelledby": val.todo_id }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={val.todo_id}
                  primary={
                    val.status === 1 ? (
                      <Typography type="body2" style={textStyle}>
                        {" "}
                        {`${val.title} - ${val.date.split("T")[0]}`}
                      </Typography>
                    ) : (
                      <Typography type="body2">
                        {`${val.title} - ${val.date.split("T")[0]}`}{" "}
                      </Typography>
                    )
                  }
                  secondary={
                    val.status === 1 ? (
                      <Typography style={textStyle}>
                        {" "}
                        {val.description}{" "}
                      </Typography>
                    ) : (
                      <Typography> {val.description} </Typography>
                    )
                  }
                />

                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => editList(val)}
                    color="secondary"
                    aria-label="comments"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleUpdate("delete", val.todo_id)}
                    edge="end"
                    aria-label="comments"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit To-Do</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            defaultValue={todo.title}
            onChange={(event) => handleChange(event)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            defaultValue={todo.description}
            onChange={(event) => handleChange(event)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleUpdate("edit")} color="primary">
            Update
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

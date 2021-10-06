import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import useStyles from './Style';
import AddBtn from './AddBtn';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EditBtn from './EditBtn';
import FloatingMenu from '../FloatingMenu/FloatingMenu'


export default function ModalForm(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = (Post) => {
    // console.log(Post)
    props.setPostInput(Post);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () =>{
    props.validateForm();
    setOpen(false);
  }

  const renderCallModalButton=(action)=>{
    if (action==="add"){
      return (
        // <AddBtn setAction={props.setAction} 
        //   currentPost={{nom:"",date:"", actif:true}} 
        //   setCurrentPost={handleOpen}
        // />
        <FloatingMenu setAction={props.setAction}
          currentPost={{title:"",body:"",userId:""}}
          setCurrentPost={handleOpen}
          handleToTop={props.handleToTop}
          topBtnIsVisible = {props.topBtnIsVisible}
        />
      );
    }
    else return  (
      <EditBtn 
        setAction={props.setAction} 
        currentPost={props.currentPost} 
        setCurrentPost={handleOpen}
      />
      
    )
  }

  return (
    <div>
      {renderCallModalButton(props.action)}
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">To Do</h2>
            <form className={classes.rootForm} noValidate autoComplete="off">
              <TextField onChange={ (event) => {
                                  props.changeTitle(event.target.value);
                                  console.log(props.Post.title);
                                  console.log(event.target.value);
                              }} 
                          value={props.Post.title ? props.Post.title:""} 
                          id="standard-basic" label="Renseignez le titre" 
              /><br/>
              <Button variant="contained" onClick={handleSubmit}  color="primary"> 
                Enregistrer
              </Button>
            </form>
            <p id="transition-modal-description"></p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
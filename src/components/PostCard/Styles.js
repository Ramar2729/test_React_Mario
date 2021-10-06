import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
      margin: 20,
      maxWidth: 2000,
      textAlign : 'left'
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    postContainer:{
      fontSize : '1.02rem !important',
    },
    commentContainer: {
      margin : '30px',
    },
    commentContent: {
      fontSize : '0.84rem !important',
      color: 'rgba(0, 0, 0, 0.54)',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    head_comments: {
      textAlign: 'center',
      fontSize: '0.93rem'
    },
    loadingComments : {
      marginLeft: 'auto',
      marginRigth: '20px'
    },
  }));

export default useStyles;
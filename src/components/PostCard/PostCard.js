import React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useStyles from './Styles'
import Divider from '@material-ui/core/Divider';
import CommentIcon from '@material-ui/icons/Comment';
import DelayingAppearance from './loading'


export default function RecipeReviewCard(props) {

  const post = props.post;
  const comments = post.get_comments();
  const classes = useStyles();

  const avatar =  'avatar/'+ post.get_userId() +'.jpg'

  return (
  <div>
    <Card className={classes.root}>
      <div className={classes.postContainer}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" src={avatar}>
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={post.get_title()}
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.get_body()}
          </Typography>
        </CardContent>

        <Divider/>

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <div className={classes.loadingComments}></div>
            {props.loadingComments && (
              <div className={"loadingio-spinner-pulse-g11xbpaq2z"}>
                <div className={"ldio-6avyk8t052"}>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            )} 
            {!props.loadingComments && (<IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: (props.expanded),
              })}
              onClick= {()=>{
                props.expand_comments(post)
                }}
              aria-expanded={(props.expanded)}
              aria-label="show comments"
            >
              <ExpandMoreIcon />
              <CommentIcon/>
            </IconButton>)}
        </CardActions>
        <Collapse in={(props.expanded)} timeout="auto" unmountOnExit>
          <div className={classes.head_comments}>Commentaires</div>
            {comments.map((item)=>{
              console.log('Commets items : ', item)
              return (
                <div className={classes.commentContainer}>
                  {/* <Divider/> */}
                  <CardContent>
                    <Typography paragraph>
                      <div className={classes.commentContent}>
                        <h4> {item.get_name()} </h4>
                        <span> {item.get_email()} </span>
                        <p> {item.get_body()} </p>
                      </div>
                    </Typography>
                  </CardContent>
                </div>
              )
            })}
        </Collapse>
      </div>  
    </Card>
  </div>
  );
}




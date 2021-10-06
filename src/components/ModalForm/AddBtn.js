
import AddIcon from '@material-ui/icons/Add';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export default function AddBtn(props){
    const handleClick=() => {
        console.log(new Date().toISOString());
        console.log(props.currentPost);
        props.setCurrentPost(props.currentPost)
        props.setAction("add")
    };
    return (
        <ListItem button onClick={handleClick}>
            <ListItemIcon>
                <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Ajouter" />
        </ListItem>
    );
}


import ServiceConfig from './ServiceConfig';
const BASE_URL_ = ServiceConfig.BASE_URL;

export default class Album{
    _id;
    get_id() {
        return this._id;
    }
    set_id(value) {
        this._id = value;
    }

    _title;
    get_title(){
        return this._title
    }
    setTitle(val){
        this._title = val
    }
    
    _userId;
    get_userId() {
        return this.userId;
    }
    set_userId(value) {
        this.userId = value;
    }


    albumImages=[];
    setAlbumImages= (imageList) => {
        this.albumImages=imageList;
    } 


    constructor (id_, title_, email_, body_, userId_ ){
        this._id = id_;
        this._title = title_;
        this._userId = userId_; 
    }

    static async getAlbumsByIdUser(idUser){
        let url = BASE_URL_ + 'users/' + idUser + '/albums';
        return await fetch (url);
    }

    fetchImages(){
        return Comment.getCommentsByIdPost(this._id);
    }

}

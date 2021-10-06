import ServiceConfig from './ServiceConfig';
import Comment from './Comment';
const BASE_URL=ServiceConfig.BASE_URL;

export default class Post {

    _id;
    _title;
    _body;
    _userId;
    _comments = [];

    
    constructor(id_, title_,body_,userId_){
        this._id = id_;
        this._title = title_;
        this._body = body_;
        this._userId = userId_;
    }

    get_comments() {
        return this._comments;
    }
    set_comments(val){
        this._comments = val;
    }


    get_userId() {
        return this._userId;
    }


    get_body() {
        return this._body;
    }

    get_title() {
        return this._title;
    }
    

    get_id() {
        return this._id;
    }


    static async postsList(){
        const response = await fetch(BASE_URL+'posts');
        return response;
    }

    fetchComments(){
        return Comment.getCommentsByIdPost(this._id);
    }

    async saveNewPost(){
        let data = {
            title: this._title,
            body: this._body,
            userId: this._userId,
        }
        const response = await fetch(BASE_URL+"posts",{
            body: JSON.stringify(data),
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return response;                
    }

    
}


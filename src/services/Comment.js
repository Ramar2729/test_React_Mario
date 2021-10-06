import ServiceConfig from './ServiceConfig';
const BASE_URL_ = ServiceConfig.BASE_URL;

export default class Comment{
    _id;
    get_id() {
        return this._id;
    }
    set_id(value) {
        this._id = value;
    }
    _name;
    get_name() {
        return this._name;
    }
    set_name(value) {
        this._name = value;
    }
    _email;
    get_email() {
        return this._email;
    }
    set_email(value) {
        this._email = value;
    }
    _body;
    get_body() {
        return this._body;
    }
    set_body(value) {
        this._body = value;
    }
    _postId;
    get_postId() {
        return this._postId;
    }
    set_postId(value) {
        this._postId = value;
    }


    constructor (id_, name_, email_, body_, postId_ ){
        this._id = id_;
        this._name = name_;
        this._email = email_;
        this._body = body_;
        this._postId = postId_; 
    }

    static async getCommentsByIdPost(idPost){
        let url = BASE_URL_ + 'posts/' + idPost + '/comments';
        return await fetch (url);
    }
}
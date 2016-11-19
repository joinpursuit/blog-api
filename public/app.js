import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {IndexRoute ,Router, Route, browserHistory} from 'react-router';

const App = React.createClass({
    getInitialState(){
        return {data: [],tags:[],texts:[], tagInput:'',textInput:''}
    },
    clear(e){
        e.preventDefault();
        this.setState({data:null, tags:null,tagInput:null, textInput:null})
    },
    getAllPosts(e){
        e.preventDefault();
        $.ajax({
            url:"/api/posts",
            type: 'GET'
        }).done(data =>{
            console.log('ajax GET data:',data);
            this.setState({data: data})
         });
        // console.log('data from state: ',this.state.data)
    },
    getTagData(e){
        e.preventDefault();
        $.ajax({
            url:`/api/posts/tags/${this.state.tagInput}`,
            type: 'GET'
        }).done(tags =>{
            console.log('ajax GET specific tag:',tags);
            this.setState({tags: tags})
        });
        // e.target.value='';
    },
    getTextData(e){
        // e.preventDefault();
        $.ajax({
            url:`/api/posts/texts/${this.state.textInput}`,
            type: 'GET'
        }).done(texts =>{
            console.log('ajax GET specific text in the body:',texts);
            this.setState({texts: texts})
        });
        // e.target.value='';
    },
    handleTagChange(e){
        this.setState({tagInput:e.target.value});
        console.log('tagInput value: ',this.state.tagInput)
    },
    handleTextChange(e){
        this.setState({textInput:e.target.value});
        console.log('textInput value: ',this.state.textInput)
    },
    render: function() {
        {
            if(this.state.data) {
                var posts = this.state.data.map((post, indx) => {
                    return (
                        <div key={indx}>
                            <h3>Title: {post.title}</h3>
                            <p>Body: {post.body}</p>
                        </div>
                    )
                })
            }
            else if(this.state.tags) {
                var tags = this.state.tags.map((tag, indx) => {
                    return (
                        <div key={indx}>
                            <h3>Title: {tag.title}</h3>
                            <p>Body: {tag.body}</p>
                        </div>
                    )
                })
            }
            if(this.state.texts) {
                var texts = this.state.texts.map((text, indx) => {
                    return (
                        <div key={indx}>
                            <h3>Title: {text.title}</h3>
                            <p>Body: {text.body}</p>
                        </div>
                    )
                })
            }
        }
        return (
            <div>
                <form >
                    <input onClick={this.getAllPosts} className="btn btn-primary" type="submit" value="get all posts"/>
                    <input onClick={this.clear} className="btn btn-danger" type="submit" value="Clear data"/>
                    <div className="form-group">
                        <label >Tag Search</label>
                        <input type="text" className="form-control" onChange={this.handleTagChange} placeholder="Tag Search"/>
                    </div>
                    <input className="btn btn-info" onClick={this.getTagData} type="button" value="search by tag"/>
                    <div className="form-group">
                        <label >Text Search</label>
                        <input  type="text" className="form-control" onChange={this.handleTextChange} placeholder="Text Search"/>
                    </div>
                    <input className="btn btn-info" onClick={this.getTextData} type="button" value="search by text"/>

                </form>
                <h2>Posts:</h2>
                {posts ? posts: tags? tags:null}
                {texts? texts: null}
            </div>)
    }
})

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/home" component={App}/>
    </Router>,
    document.getElementById('root')
);


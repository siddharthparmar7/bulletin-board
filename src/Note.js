import React, { Component } from 'react';


class Note extends React.Component{
    constructor(props){
        super(props);
        this.state = {editing: false};
        this.save = this.save.bind(this);
        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
    }

    // css for the component
    componentWillMount(){
        this.style = {
            right: this.randomBetween(0, window.innerWidth -100, 'px'),
            top: this.randomBetween(0, window.innerHeight - 100, 'px')
        };
    }

    // called right after update
    // when you go to the editing mode, it will auto focus and select the 
    // note text and you can start editing right away
    componentDidUpdate(){
        if(this.state.editing){
            this.refs.newText.focus();
            this.refs.newText.select();
        }
    }

    // to enhance the performance
    // will check if the component should update or not depending 
    // on if the text has changed in the editing mode or not
    shouldComponentUpdate(nextProps, nextState){
        return this.props.children !== nextProps.children || this.state !== nextState
    }

    // x-axis, y-axis, s = units (ex: px)
    // generating numbers
    randomBetween(x, y, s){
        return (x + Math.ceil(Math.random() * (y-x))) + s;
    }

    edit(){
        this.setState({editing: true});
    }

    save(){
        this.props.onChange(this.refs.newText.value, this.props.id);
        this.setState({editing: false});
    }
    
    remove(){
        this.props.onRemove(this.props.id);
    }

    // edit form for Note
    renderForm(){
        return(
            <div className="container">
                <div className="row">
                    <div className="note" style={this.style}>
                        <textarea className="form-control" ref="newText" defaultValue={this.props.children}></textarea>
                        <button className="btn btn-primary" onClick={this.save}>Save</button>
                    </div>
                </div>
            </div>
        )
    }

    // display Note
    renderDisplay(){
        return(
            <div className="container">
                <div className="row">
                    <div className="note" style={this.style}>
                        <p>{this.props.children}</p>
                        <span>
                            <button className="btn btn-default" onClick={this.edit}>Edit</button>
                            <button className="btn btn-danger" onClick={this.remove}>X</button>
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    render(){
        return (
                    (this.state.editing) ?  this.renderForm() 
                                : this.renderDisplay()
                )
    }
}

export default Note;
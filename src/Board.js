import React, { Component } from 'react';
import Note from './Note';
// import Draggable from 'react-draggable';

class Board extends React.Component{
    constructor(props){
        super(props);
        this.state = {notes:  []};
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
        this.eachNote = this.eachNote.bind(this);
    }

    componentWillMount(){
        if(this.props.count){

            // get values from the spaceX server
            // print flight details on sticky notes 
            // these are just random notes

            var url = `https://api.spacexdata.com/v1/launches/latest`;
            fetch(url)
            .then(response => response.json())
            .then(items => items.details)
            .then(details => details.toString().split(','))
            .then(array => array.forEach(sentence => this.add(sentence)))
            .catch(error => console.log("error connecting server" + error))

            // get reandom values to generate data
            // var url = `http://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`
            // fetch(url, {mode : 'no-cors'} )
                // .then(results => results.json())
                // .then(array => array[0])
                // .then(text => text.split('. '))
                // .then(array => array.forEach(
                //     title => this.add(title)))
                // .catch(function(error){
                //     console.log("Did not connect to the server", error)
                // });
                
        }
    }

    // generate next id of a note
    nextID(){
        this.uniiqueID = this.uniiqueID || 0;
        return this.uniiqueID++;
    }

    // add new note
    add(text){
        var notes = [
            ...this.state.notes,
            {
                id: this.nextID(), 
                note:text
            }
        ]
        this.setState({notes: notes});
    }

    // update note
    update(newText, id){
        var notes = this.state.notes.map(function(note){
            return (note.id !== id) ? note : {
                ...note, note: newText
            }
        });
        this.setState({notes: notes});
    }

    // remove note
    remove(id){
        var notes = this.state.notes.filter(note => (note.id !== id));
        this.setState({notes: notes});
    }

    // each note gets generated from here
    eachNote(note){
        return (
            <Note key={note.id} id={note.id} onChange={this.update} onRemove={this.remove}>{note.note}</Note>

        )
    }

    // render screen
    render(){
        return(
            <div className="board">
                {this.state.notes.map(this.eachNote)}
                <button className="btn btn-default" onClick={() => this.add('New Note')}>+</button>
            </div>
        )
    }
}

// error check on count PROP
Board.propTypes = {
    count: function(props, propName){
        if(typeof props[propName] !== "number"){
            return new Error("The count must be a number");
        }
        else if(props[propName] > 100){
            return new Error("creating " + props[propName] + " notes is riddiculous");
        }
    }
}

export default Board
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration} mins</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>Edit</Link> | <a href="#" onClick={()=>props.deleteExercise(props.exercise._id)}>Delete</a>
        </td>
    </tr>
);

export default class ExercisesList extends Component{

    constructor(props){
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = { exercises : [] };
    }

    componentDidMount(){
        axios.get('http://localhost:3000/exercises/').then(
            res => {
                if(res.data.length > 0){
                    this.setState({
                        exercises:res.data
                    });
                }
            }
        ).catch((err) => { console.log(err); } );  
    }

    deleteExercise(id){
        axios.delete('http://localhost:3000/exercises/' + id).then(
            res => {
                console.log(res.data);
            }
        ).catch((err) => { console.log(err); } );  

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        });
    }

    exercisesList(){
        return this.state.exercises.map(ce => {
            return <Exercise exercise={ce} deleteExercise={this.deleteExercise} key={ce._id}  />
        });
    }

    render(){
        return(
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Descriptiom</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exercisesList()}
                    </tbody>
                </table>
            </div>
        );
    }
}
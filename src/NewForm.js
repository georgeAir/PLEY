import React, {Component} from 'react'


export default class NewForm extends Component {
    constructor(props){
        super(props)

        this.state = {
            name:''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        //fetch to the backend
        fetch(this.props.baseURL + '/favorites' , {
            method: 'POST',
            body: JSON.stringify({name: this.state.name}),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(res => {
            return res.json()
        }).then(data => {
            // console.log(data)
            this.props.addFavorite(data)
            this.setState({
                name: ''
            })
        })
    }

    handleChange = (event) => {
        // console.log(event.target.value);
        this.setState({
            name: event.target.value
        })
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" name="name" onChange={ (event) => this.handleChange(event)} value={this.state.name}/>
                <input type="submit" value="Add a reason to celebrate"/>
            </form>
        )
    }
}

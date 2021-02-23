import React from 'react'


    class SearchInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        };

        this.changeHandler = this.changeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }
        
    changeHandler(event) {
        this.setState({ value: event.target.value });
        console.log(event.target.value)
        
    }
    submitHandler(event) {
        event.preventDefault();
        console.log(this.state.value)
        }





    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <label>
                <input type="text" placeholder="search for weather" value={this.state.value}  onChange={this.changeHandler}></input>
                    </label>
                <input type="submit" value="search" />
                </form>
                
            </div>
        )
    }
}




export default SearchInput

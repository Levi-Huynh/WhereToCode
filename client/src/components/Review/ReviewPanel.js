import React, { Component } from 'react';
import TextArea from "../Review/TextArea";
import Select from "../Review/Select";
import Button from "../Review/Button";
import { withFirebase } from '../../Firebase';

import axios from "axios";


// import Firebase from './firebase';
const buttonStyle = {
  margin: "10px 10px 10px 10px"
};


class ReviewPanel1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: {
        user_id: null,
        rating: null,
        internet_rating: null,
        comments: ''
      },
      rating: ["1", "2", "3"],
      internet_rating: ["1", "2", "3"],
      uid: this.props.firebase.auth.currentUser.uid
    };

    this.handleTextArea = this.handleTextArea.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }


  componentDidMount() {


    axios
      .get(`https://wheretocode-master.herokuapp.com/users/${this.state.uid}`)
      .then(user => {
        console.log("get", user);
        console.log("userid", user.data[0].id);
        let currentUserId = {
          user_id: user.data[0].id,
          rating: null,
          internet_rating: null,
          comments: ''
        }
        this.setState({
          newUser: currentUserId
        })
      }

      )
      .catch(error => {
        console.log(error);
      })

  }


  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;


    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          [name]: value
        }
      }),
    );
  }

  handleTextArea(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          comments: value
        }
      }),
    );
  }







  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newUser;
    console.log(this.state.newUser);
    axios
      .post("https://wheretocode-master.herokuapp.com/reviews", userData)
      .then(response => {
        console.log("res", response)
      })
      .catch(error => {
        console.log(error);
      })
  }


  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      newUser: {
        user_id: '',
        rating: '',
        comments: '',
        internet_rating: ''
      }
    });
  }




  render() {
    return (
      <>

        <form onSubmit={this.handleFormSubmit}>


          {/* Rating Required*/}
          <Select
            title={"Rating"}
            name={'rating'}
            options={this.state.rating}
            value={this.state.newUser.rating}
            placeholder={"Select Rating"}
            handleChange={this.handleInput}
          />
          {/*Internet Rating */}
          <Select
            title={"Interet Rating"}
            name={'internet_rating'}
            options={this.state.internet_rating}
            value={this.state.newUser.internet_rating}
            placeholder={"Select Internet Rating"}
            handleChange={this.handleInput}
          />
          {/*Comment */}
          <TextArea
            title={"Comments"}
            rows={10}
            value={this.state.newUser.comments}
            name={'comment'}
            handleChange={this.handleTextArea}
            placeholder={"Leave a comment"}
          />
          {/*Submit */}
          <Button
            action={this.handleFormSubmit}
            type={"primary"}
            title={"Submit"}
            style={buttonStyle}
          />
          {/* Clear form */}
          <Button
            action={this.handleClearForm}
            type={"secondary"}
            title={"Clear"}
            style={buttonStyle}
          />
        </form>


      </>
    );
  }
}

const ReviewPanel = withFirebase(ReviewPanel1);
export { ReviewPanel };


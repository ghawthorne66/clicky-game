import React, { Component } from "react";
// import Wrapper from "./components/Wrapper";
// import Title from "./components/Title";
import friends from "./friends.json";
import NavBar from "./components/NavBar";
import GridMDC from "./components/GridMDC";
import PaperMDC from "./components/PaperMDC";
import CharCard from "./components/CharCard";
import Score from "./components/Score";
import Alert from "./components/Alert";
import BottomNavMDC from "./components/BottomNavMDC";
import FriendCard from "./components/FriendCard";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends: friends,
    pikedChars: [],
    topScore: 0,
    alertMessage: ""
  };

  handlePicked = event => {

    const name = event.target.attributes.getNamedItem("name").value;
    this.shuffleCharacters()
    this.checkGuess(name, this.updateTopScore)
  }

  shuffleCharacters = () => {
    this.setState(this.state.characters = this.shuffleArray(this.state.characters))
  }

  shuffleArray = (a) => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  checkGuess = (name, cb) => {
    const newState = { ...this.state };
    if (newState.pickedChars.includes(name)) {
      newState.alertMessage = `YOU ALREADY PICKED "${name.toUpperCase()}"!`
      newState.pickedChars = []
      this.setState(this.state = newState)
    } else {
      newState.pickedChars.push(name)
      newState.alertMessage = `GOOD CHOICE!`
      this.setState(this.state = newState)
    }
    cb(newState, this.alertWinner)
  }

  updateTopScore = (newState, cb) => {
    if (newState.pickedChars.length > newState.topScore) {
      newState.topScore++
      this.setState(this.state = newState)
    }
    cb(newState)
  }

  alertWinner = (newState) => {
    if (newState.pickedChars.length === 12) {
      newState.alertMessage = "CHAMPION!";
      newState.pickedChars = [];
      this.setState(this.state = newState)
    }
  }


  removeFriend = id => {
    // Filter this.state.friends for friends with an id not equal to the id being removed
    const friends = this.state.friends.filter(friend => friend.id !== id);
    // Set this.state.friends equal to the new friends array
    this.setState({ friends });
  };

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <div>
      <NavBar style={{ background: "#313133", marginBottom: "5px" }} />

      <GridMDC container direction="column" style={{ margin: "0 auto", maxWidth: 945 }}>

        
     
            <PaperMDC>
              {this.state.alertMessage === "GOOD CHOICE!" ? (
                <Alert message={this.state.alertMessage} style={{ color: "green" }} />
              ) : (
                  <Alert message={this.state.alertMessage} style={{ color: "red" }} />
                )}
            </PaperMDC>
          </GridMDC> 

        {/* <Title>Friends List</Title> */}
        {this.state.friends.map(friend => (
          <FriendCard
            removeFriend={this.removeFriend}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            occupation={friend.occupation}
            location={friend.location}
          />
        ))}
      </div>
    );
  }
}

export default App;

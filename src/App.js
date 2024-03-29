import React, { Component } from "react";
import artists from "./data/artists.json";
import days from "./data/days.json";
import ArtistCard from "./components/ArtistCard";
import TimeTable from "./containers/TimeTable";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.artists = artists;
    this.days = days;
    this.state = {
      activeArtist: this.artists[0],
      artistCardActive: false,
      favouriteArtists: [],
    };
  }

  toggleFavouriteArtist = (artist) => {
    const ar = this.state.favouriteArtists;
    const index = ar.indexOf(artist);
    index >= 0 ? ar.splice(index, 1) : ar.push(artist);
    this.setState({
      favouriteArtists: ar,
    });
  };

  handleClick = (artist) => {
    this.setState({
      activeArtist: artist,
      artistCardActive: !this.state.artistCardActive,
    });
    document.documentElement.style.setProperty("--main-color", artist.color, "");
    document.documentElement.style.setProperty("--main-color-dark", artist.colorDark, "");
  };

  clickArtistCard = (e) => {
    const hideArtistCard = e.target.className === "ArtistCard active";
    if (!hideArtistCard) return;
    this.setState({
      artistCardActive: false,
    });
    document.documentElement.style.setProperty("--main-color", "#060685", "");
    document.documentElement.style.setProperty("--main-color-dark", "#040463", "");
  };

  render() {
    const classNaam = `time-table-container ${this.state.artistCardActive ? "artist-card-active" : ""}`;
    return (
      <div className="App">
        <div className={classNaam}>
          <h2 className="tt-Title">DEFQON .1 SIDDEBUREN 2021</h2>
          <TimeTable
            artists={this.artists}
            day={this.days["day1"]}
            handleClick={this.handleClick}
            toggleFavouriteArtist={this.toggleFavouriteArtist}
          />
        </div>
        <ArtistCard artistCardActive={this.state.artistCardActive} handleClick={this.clickArtistCard} artist={this.state.activeArtist} />
      </div>
    );
  }
}

export default App;

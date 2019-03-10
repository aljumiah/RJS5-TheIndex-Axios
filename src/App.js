import React, { Component } from "react";
import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";

class App extends Component {
  state = {
    currentAuthor: null,
    filteredAuthors: [],
    authors: [],
    loading: true
  };

  async componentDidMount() {
    try {
      let respons = await axios.get(
        "https://the-index-api.herokuapp.com/api/authors/"
      );
      //console.log(respons.data);
      this.setState({ authors: respons.data });
      this.setState({ filteredAuthors: respons.data });
      this.setState({ loading: false });
    } catch (error) {
      console.error(error);
    }
  }

  selectAuthor = async author => {
    try {
      this.setState({ loading: true });
      let respons = await axios.get(
        `https://the-index-api.herokuapp.com/api/authors/${author.id}/`
      );
      this.setState({ loading: false, currentAuthor: respons.data });
      //console.log(respons.data);
    } catch (error) {
      console.error(error);
    }
  };

  //this.setState({ currentAuthor: author });

  unselectAuthor = () => this.setState({ currentAuthor: null });

  filterAuthors = query => {
    query = query.toLowerCase();
    let filteredAuthors = this.state.authors.filter(author => {
      return `${author.first_name} ${author.last_name}`
        .toLowerCase()
        .includes(query);
    });
    this.setState({ filteredAuthors: filteredAuthors });
  };

  getContentView = () => {
    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return (
        <AuthorsList
          selectAuthor={this.selectAuthor}
          filterAuthors={this.filterAuthors}
          authors={this.state.authors}
        />
      );
    }
  };

  render() {
    if (this.state.loading) return <div>loading ...</div>;
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">{this.getContentView()}</div>
        </div>
      </div>
    );
  }
}

export default App;

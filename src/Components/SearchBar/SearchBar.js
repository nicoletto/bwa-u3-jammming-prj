import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state={
      term:''
    }
    this.handleTermChange = this.handleTermChange.bind(this);
    this.search = this.search.bind(this);
  }
  search(event){
    if(this.state.term!==''){
          this.props.onSearch(this.state.term);
    }
  }
  handleTermChange(event){
    this.setState({term: event.target.value})
  }
  render(){
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChange}
        />
        <a
         onClick={this.search}
        >SEARCH</a>
      </div>
    )
  }
}

export default SearchBar;

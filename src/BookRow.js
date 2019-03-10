import React, { Component } from "react";

class BookRow extends Component {
  render() {
    const book = this.props.book;
    //const author = this.props.author;
    const authors = this.props.book.authors.map(authors => authors);
    //console.log(authors);
    return (
      <tr>
        <td>{book.title}</td>

        <td>
          {authors.map(author => (
            <div key={author.id}>
              {author.name} {author.name}
            </div>
          ))}
        </td>

        <td>
          <button className="btn" style={{ backgroundColor: book.color }} />
        </td>
      </tr>
    );
  }
}

export default BookRow;

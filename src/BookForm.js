import React, { Component } from "react";

class BookForm extends Component {
  state = {
    title: "",
    color: []
  };

  componentWillUnmount() {
    if (this.props.errors.length) this.props.resetErrors();
  }

  submitBook = event => {
    event.preventDefault();
    this.props.postBook(this.state, this.props.closeModal);
  };
  textChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const errors = this.props.errors;

    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitBook}>
          {!!errors.length && (
            <div className="alert alert-danger" role="alert">
              {errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Title</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="title"
              onChange={this.textChangeHandler}
              value={this.state.title}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Color</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="color"
              onChange={this.textChangeHandler}
              value={this.state.color}
            />
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.rootErrors.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postBook: (newBook, closeModal) =>
      dispatch(actionCreators.postBook(newBook, closeModal)),
    resetErrors: () => dispatch(actionCreators.resetErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookForm);

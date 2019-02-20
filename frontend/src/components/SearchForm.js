import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { Form, Input, InputGroup, InputGroupAddon, Button } from "reactstrap";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.history.push(`/search/${this.state.query}`);
  };

  renderSearchForm = () => {
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <InputGroup>
          <Input
            bsSize="sm"
            type="text"
            placeholder="Search store..."
            label="Search store..."
            onChange={e => this.setState({ query: e.target.value })}
          />
          <InputGroupAddon addonType="append">
            <Button outline color="secondary" size="sm">
              <i className="fas fa-search text-white" />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    );
  };

  render() {
    return <React.Fragment>{this.renderSearchForm()}</React.Fragment>;
  }
}

export default withRouter(SearchForm);

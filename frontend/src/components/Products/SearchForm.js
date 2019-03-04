import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { Form, Input, InputGroup, InputGroupAddon, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <Form inline onSubmit={this.handleSubmit} style={{ width:"290px" }}>
        <InputGroup>
          <Input
            bsSize="sm"
            type="text"
            placeholder="Search store..."
            label="Search store..."
            className="border-0"
            onChange={e => this.setState({ query: e.target.value })}
          />
          <InputGroupAddon addonType="append">
            <Button outline color="secondary" size="sm" className="bg-white text-dark">
              <FontAwesomeIcon icon="search" />
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

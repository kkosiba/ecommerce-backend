import React from "react";
import PropTypes from "prop-types";
import { Label, Input } from "reactstrap";

const RenderField = ({ input, label, type, meta: { touched, error } }) => (
  <React.Fragment>
    <Label className="d-flex justify-content-between">
      {label}
      {touched && error && (
        <span className="text-danger font-weight-bold">{error}</span>
      )}
    </Label>
    <div>
      <Input {...input} placeholder={label} type={type} />
    </div>
  </React.Fragment>
);

RenderField.propTypes = {
  input: PropTypes.array,
  label: PropTypes.string,
  type: PropTypes.string
};

export default RenderField;

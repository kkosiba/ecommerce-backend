const validate = values => {
  const errors = {};
  if (!values.fullName) {
    errors.fullName = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.street) {
    errors.street = "Required";
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = "Required";
  } else if (
    !/^(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|(?:\(?0))(?:(?:\d{5}\)?[\s-]?\d{4,5})|(?:\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3}))|(?:\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4})|(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}))(?:[\s-]?(?:x|ext\.?|)\d{3,4})?$/g.test(
      values.phoneNumber
    )
  ) {
    errors.phoneNumber = "Invalid UK phone number!";
  }
  if (!values.postcode) {
    errors.postcode = "Required";
  } else if (
    !/^([A-Za-z][A-Ha-hK-Yk-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] 0[Aa]{2})$/gi.test(
      values.postcode
    )
  ) {
    errors.postcode = "Invalid postcode";
  }
  // if (!/^(34|37|4|5[1-5]).*$/.i.test(values.cardNumber)) {
  //   errors.cardNumber = "Invalid card number";
  // }
  return errors;
};

export default validate;

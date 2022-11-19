import * as yup from 'yup';

export default yup.object().shape({
  newtodo: yup
    .string()
    .min(1, ' must be at least 1 character')
    .max(25, 'must be less than 25 characters')
    .required("todo is required"),
});
import * as yup from 'yup';

export default yup.object().shape({
  user_email: yup
    .string()
    .email("Not a valid email")
    .max(50, 'must be less than 50 characters')
    .required("email is required"),
  user_password: yup
    .string()
    .required("password is required")
    .min(4, "Must be at least 4 characters")
    .max(16),
});
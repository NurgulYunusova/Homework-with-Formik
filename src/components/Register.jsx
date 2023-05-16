import { useFormik } from "formik";
import * as Yup from "yup";

function Register() {
  const addProductValidationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username field cannot be empty!")
      .max(50, "Maximum 50 character"),
    email: Yup.string()
      .required("Email field cannot be empty!")
      .email("Invalid email address!")
      .test("email", "Email must end with @code.edu.az", (value) => {
        return value.endsWith("@code.edu.az");
      }),
    gender: Yup.string().required("Gender field cannot be empty!"),
    password: Yup.string()
      .required("Password field cannot be empty!")
      .min(8, "Minimum 8 character")
      .matches(/^(?=.*[A-Z])/, "Password must start with an uppercase letter"),
    confirmPassword: Yup.string()
      .required("Confirm password field cannot be empty!")
      .min(8, "Minimum 8 character")
      .matches(/^(?=.*[A-Z])/, "Password must start with an uppercase letter")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      gender: "female",
      password: "",
      confirmPassword: "",
    },
    validationSchema: addProductValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      alert("Registration completed successfully!");
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="registerForm">
        <div className="form">
          <h1>REGISTER</h1>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <p style={{ color: "red" }}>{formik.errors?.username}</p>
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <p style={{ color: "red" }}>{formik.errors?.email}</p>
          </div>

          <div>
            <p style={{ display: "inline-block" }}>Select your gender:</p>

            <label htmlFor="male">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={formik.values.gender == "male"}
                onChange={formik.handleChange}
              />
              Male
            </label>

            <label htmlFor="female">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={formik.handleChange}
                checked={formik.values.gender == "female"}
              />
              Female
            </label>
            <p style={{ color: "red" }}>{formik.errors?.gender}</p>
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <p style={{ color: "red" }}>{formik.errors?.password}</p>
          </div>

          <div>
            <label htmlFor="password">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            <p style={{ color: "red" }}>{formik.errors?.confirmPassword}</p>
          </div>

          <button type="submit" className="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default Register;

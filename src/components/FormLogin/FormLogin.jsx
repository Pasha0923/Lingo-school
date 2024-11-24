import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import sprite from "../../assets/sprite.svg";
import css from "./FormLogIn.module.css";
import { loginUser } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Must be a valid email!")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Too Short! Minimum 6 symbols")
      .max(50, "Too Long! Maximum 50 symbols")
      .required("Password is required"),
  })
  .required();

const FormLogIn = ({ onCloseModal }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = async (data) => {
    // Залогирование пользователя
    dispatch(loginUser(data));

    reset();
    onCloseModal();
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Log In</h2>
      <p>
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.formContainer}>
          <label className={css.label}>
            <input
              className={css.input}
              name="email"
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <div className={css.errorContainer}>
                <span className={css.errorMessage}>{errors.email.message}</span>
              </div>
            )}
          </label>
          <label className={css.label}>
            <input
              className={css.input}
              name="password"
              type={isVisible ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 50,
              })}
            />
            {errors.password && (
              <div className={css.errorContainer}>
                <span className={css.errorMessage}>
                  {errors.password.message}
                </span>
              </div>
            )}

            <button
              type="button"
              className={css.eyeBtn}
              onClick={() => setIsVisible(!isVisible)}
            >
              <svg className={css.iconEyePassword} width="20" height="20">
                <use
                  href={`${sprite}#icon-${isVisible ? "eye" : "close-eye"}`}
                ></use>
              </svg>
            </button>
          </label>
        </div>
        <button className={css.logInBtn} type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default FormLogIn;

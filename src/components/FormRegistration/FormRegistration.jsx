import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import sprite from "../../assets/sprite.svg";
import css from "./FormRegistration.module.css";
import { registerUser } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import { clearFavorites } from "../../redux/favorites/slice";

const schema = yup
  .object({
    name: yup
      .string()
      .min(2, "Too Short! Minimum 2 symbols")
      .max(50, "Too Long! Maximum 50 symbols")
      .required("Name is required"),
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

const FormRegistration = ({ onCloseModal }) => {
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

  const onSubmit = (data) => {
    localStorage.removeItem("favoriteItems");

    dispatch(clearFavorites());

    dispatch(registerUser(data));
    reset();
    onCloseModal();
  };
  return (
    <div className={css.container}>
      <h2 className={css.title}>Registration</h2>
      <p>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information
      </p>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.formContainer}>
          <label className={css.label}>
            <input
              className={css.input}
              name="name"
              type="text"
              placeholder="Name"
              {...register("name", {
                required: true,
                minLength: 2,
                maxLength: 50,
              })}
            />
            {errors.name && (
              <div className={css.errorContainer}>
                <span className={css.errorMessage}>{errors.name.message}</span>
              </div>
            )}
          </label>
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
                  href={`${sprite}#${
                    isVisible ? "icon-eye" : "icon-close-eye"
                  }`}
                ></use>
              </svg>
            </button>
          </label>
        </div>
        <button className={css.registrBtn} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default FormRegistration;

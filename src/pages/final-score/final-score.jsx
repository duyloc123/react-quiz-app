import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setUser } from "../../redux/dashboard.action";

import { useForm, Controller } from "react-hook-form";

function FinalScore() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const score = useSelector((state) => state.question.score);
  const users = useSelector((state) => state.dashboard.users);

  // { firstName: 'tony', lastName: 'nguyen', email: 'tony@gmail.com', score: 10 }

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const onSubmit = (data) => {
    const user = {
      id: Date.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      score,
    };
    // save session storage
    const storageUsers = window.sessionStorage.getItem("users");
    const parserUsers = storageUsers ?  JSON.parse(storageUsers) : [] ;
    const sessionUsers = [
      ...(parserUsers.length === 0 ? users : parserUsers),
      user,
    ];
    window.sessionStorage.setItem("users", JSON.stringify(sessionUsers));

    dispatch(setUser(user));
    navigate("/leaderboard");
  };

  return (
    <>
      <Typography variant="h3" noWrap component="h2" sx={{ marginBottom: 5 }}>
        Final Score: {score}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="First Name"
              variant="standard"
              error={Boolean(errors.firstName)}
              helperText={errors.firstName ? "Please enter first name" : ""}
              {...register("firstName", { required: true, maxLength: 20 })}
              {...field}
            />
          )}
        />
        <br /> <br />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Last Name"
              variant="standard"
              error={Boolean(errors.lastName)}
              helperText={errors.lastName ? "Please enter last name" : ""}
              {...register("lastName", { required: true, maxLength: 20 })}
              {...field}
            />
          )}
        />
        <br /> <br />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Email Name"
              variant="standard"
              error={Boolean(errors.email)}
              helperText={
                errors.email ? "Enterted value does not match email format" : ""
              }
              {...register("email", {
                required: "required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
              {...field}
            />
          )}
        />
        <br /> <br />
        <Box sx={{ textAlign: "right", marginTop: 5 }}>
          <Button
            type="submit"
            size="small"
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
}

export default FinalScore;

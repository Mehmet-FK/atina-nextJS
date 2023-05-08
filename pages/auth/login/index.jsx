"use client";

import { dashboardStyles } from "@/styles/dashboard_styles";
import { Box, Button, TextField } from "@mui/material";
import { getSession, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const [inputVal, setInputVal] = useState({});
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const router = useRouter();
  // const { login } = useAuthCalls();

  const handleChange = (e) => {
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      username: inputVal.username,
      password: inputVal.password,
      redirect: false,
    });

    const session = await getSession();
    if (session) {
      router.push("/mobile-bookings");
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: "#e10000",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "300px",
          rowGap: "15px",
          padding: "2rem",
        }}
      >
        <Image
          src={"/assets/attensam-logo.svg"}
          width={250}
          height={100}
          alt="logo"
        />

        <TextField
          onChange={handleChange}
          sx={{ width: "100%" }}
          inputProps={{
            sx: { backgroundColor: "#fff", borderRadius: "5px" },
          }}
          variant="outlined"
          name="username"
          label="Benutzername"
          type="text"
          required
        />
        <TextField
          onChange={handleChange}
          sx={{ width: "100%" }}
          inputProps={{
            sx: { backgroundColor: "#fff", borderRadius: "5px" },
          }}
          variant="outlined"
          name="password"
          label="Kennwort"
          type="password"
          required
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ ...dashboardStyles.logoutBtn, width: "100%" }}
        >
          einloggen
        </Button>
      </Box>
    </Box>
  );
};

export default Login;

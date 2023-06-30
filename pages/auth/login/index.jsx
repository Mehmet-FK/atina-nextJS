"use client";

import { dashboardStyles } from "@/styles/dashboard_styles";
import { Box, Button, TextField } from "@mui/material";
import { getSession, signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const [inputVal, setInputVal] = useState({});
  const router = useRouter();

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
    <>
      <Head>
        <title>Attensam Login</title>
      </Head>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ccc",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: "#e10000",
            boxShadow: " -11px 13px 45px 0px rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "300px",
            rowGap: "15px",
            padding: "2rem",
            border: "2px solid #fff",
            borderRadius: "1rem",
          }}
        >
          <Image
            src={"/assets/attensam-logo.svg"}
            style={{
              marginBottom: "3rem",
            }}
            width={375}
            height={150}
            alt="logo"
          />

          <TextField
            onChange={handleChange}
            sx={{ width: "350px" }}
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
            sx={{ width: "350px" }}
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
            sx={{ ...dashboardStyles.logoutBtn, width: "350px" }}
          >
            einloggen
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Login;

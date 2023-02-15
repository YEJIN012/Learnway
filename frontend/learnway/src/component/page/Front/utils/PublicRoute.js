import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { CheckToken } from "./CheckToken";

export default function PublicRoute() {
  const location = useLocation()
  console.log(location)
  const { isAuth } = CheckToken(location.key);
  const navigate = useNavigate()

  if (isAuth === "Success") {
    navigate('/')
  } 
  return <Outlet />
}
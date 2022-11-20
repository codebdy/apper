import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useInstanceParams } from "~/plugin-sdk";
import { parseRoute } from "./parseRoute";

export function useNavigateRoute() {
  const navigate = useNavigate();
  const { instance } = useInstanceParams()
  const navigateRoute = useCallback((route: string) => {
    const realRoute = parseRoute(route, instance);
    navigate(realRoute)
  }, [navigate, instance])

  return navigateRoute;
}
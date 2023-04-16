import { useToken } from "antd/es/theme/internal";
import { LOGIN_URL } from "consts";
import { useEntix } from "enthooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export function useLoginCheck() {
  const navigate = useNavigate();
  const entix = useEntix();
  const token = useToken()

  useEffect(() => {
    if (entix?.tokenName && !token) {
      navigate(LOGIN_URL);
    }
  }, [entix, token, navigate])
}
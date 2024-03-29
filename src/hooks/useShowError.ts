import { message } from "antd";
import { CODE_LOGIN_EXPIRED, LOGIN_URL } from "consts";
import { GraphQLRequestError } from "enthooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export function useShowError(err?: GraphQLRequestError| Error) {
  const navigate = useNavigate();
  useEffect(() => {
    if ((err as GraphQLRequestError)?.extensions?.["code"] === CODE_LOGIN_EXPIRED) {
      navigate(LOGIN_URL);
    } else if (err) {
      message.error(err.message)
    }
  }, [err, navigate])
}
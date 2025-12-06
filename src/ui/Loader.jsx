import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loggedIn } from "../features/logIn/loginSlice";
import { API_GET_DATA } from "../utils/config";
import { useNavigate } from "react-router-dom";

const Loader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_GET_DATA, {
          credentials: "include",
        });

        if (!res)
          throw new Error(
            "there is some problem to visit this account right now pls come again later"
          );

        const data = await res.json();

        if (data.status === "fail" || data.status === "error")
          return navigate("/login", { replace: true });

        dispatch(loggedIn(data.user));
        navigate(`/admin/${data.user.username}`, { replace: true });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  return (
    <StyledWrapper
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
      className="bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 h-screen"
    >
      <div className="preloader">
        <div className="crack crack1" />
        <div className="crack crack2" />
        <div className="crack crack3" />
        <div className="crack crack4" />
        <div className="crack crack5" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .preloader {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0 0 2px #aaa);
  }

  .crack {
    position: absolute;
    width: 10%;
    aspect-ratio: 1;
    background-image: linear-gradient(to bottom right, #3b82f6, #1d4ed8);
    clip-path: polygon(
      50% 0%,
      61% 35%,
      98% 35%,
      68% 57%,
      79% 91%,
      50% 70%,
      21% 91%,
      32% 57%,
      2% 35%,
      39% 35%
    );
    animation: rotate 6s infinite;
  }

  .crack2 {
    width: 12%;
    background-image: linear-gradient(to bottom left, white, black);
    animation-delay: 1s;
  }
  .crack3 {
    width: 14%;
    background-image: linear-gradient(to bottom left, white, black);
    animation-delay: 1.5s;
  }
  .crack4 {
    width: 16%;
    background-image: linear-gradient(to bottom left, white, black);
    animation-delay: 2s;
  }
  .crack5 {
    width: 18%;
    animation-delay: 2.5s;
  }

  @keyframes rotate {
    to {
      rotate: 360deg;
    }
  }
`;

export default Loader;

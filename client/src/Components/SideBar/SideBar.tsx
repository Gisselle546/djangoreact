"use client";
import React, { useState } from "react";
import {
  SideBarContainer,
  LogoContainer,
  HeadingContainer,
  SideBarItemContainers,
  SidebarHeader,
  SidebarList,
  SidebarListBottom,
  ListItem,
  ListButton,
  SidebarBody,
  CartLength,
} from "./SideBar.style";
import { CSSTransition } from "react-transition-group";
import { BiExit } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import logo from "../../assets/images/logo-grey.png";
import { useRouter } from "next/router";
import { useStore } from "@/context/cart";
import { useAppSelector } from "@/redux/hooks";
import { tokenValue } from "@/redux/reducer/userSlice";
import { removeSessionValue } from "../../../utils/storage";

type Props = {
  show: boolean;
};

const Animation = ({
  state,
  children,
}: {
  state: string;
  children: React.ReactNode;
}) => {
  const base: React.CSSProperties = {
    position: "fixed",
    left: "7rem",
    zIndex: 5,
    width: 300,
    height: "100vh",
    transition: "opacity 500ms, transform 500ms",
    background: "#ffffff",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  };
  if (state === "entering") {
    return (
      <div style={{ ...base, opacity: 0, transform: "translateX(-20rem)" }}>
        {children}
      </div>
    );
  }
  if (state === "entered") {
    return <div style={{ ...base, opacity: 1 }}>{children}</div>;
  }
  if (state === "exiting") {
    return <div style={{ ...base, opacity: 1 }}>{children}</div>;
  }
  if (state === "exited") {
    return (
      <div style={{ ...base, opacity: 0, transform: "translateX(-20rem)" }}>
        {children}
      </div>
    );
  }
  return <div style={base}>{children}</div>;
};

function SideBarItems({ show }: Props) {
  const router = useRouter();
  const { state } = useStore();
  const token = useAppSelector(tokenValue);

  let cart = state.cart;

  const handleClick = (data: string) => {
    router.push(`/${data}`);
  };

  const clickto = () => {
    removeSessionValue("token");
    router.push("/");
  };

  return (
    <>
      <CSSTransition in={show} timeout={300} unmountOnExit={false}>
        {(state) => (
          <Animation state={state}>
            <SideBarItemContainers>
              <SidebarHeader>
                <h1>Strikers</h1>
                <div style={{ margin: "10px 0px 0px 40px" }}>
                  <BiExit size={32} style={{ verticalAlign: "middle" }} />
                </div>
              </SidebarHeader>
              <SidebarBody>
                <SidebarList>
                  <ListItem onClick={() => handleClick("footwear")}>
                    Footwear
                  </ListItem>
                  <ListItem onClick={() => handleClick("players")}>
                    Players
                  </ListItem>
                  <ListItem onClick={() => handleClick("clubs")}>
                    Clubs
                  </ListItem>
                  <ListItem onClick={() => handleClick("national")}>
                    {" "}
                    National Teams
                  </ListItem>
                </SidebarList>
                <SidebarList>
                  <div>
                    <ListItem onClick={() => handleClick("cart")}>
                      Cart{" "}
                      <FiShoppingCart
                        size={18}
                        style={{
                          verticalAlign: "middle",
                          marginRight: "0.2rem",
                          position: "relative",
                        }}
                      />
                    </ListItem>
                    <CartLength>{cart.length}</CartLength>
                  </div>
                </SidebarList>
                <SidebarListBottom>
                  {token ? (
                    <ListButton onClick={() => clickto()}>Sign out</ListButton>
                  ) : (
                    <ListButton onClick={() => handleClick("signin")}>
                      Sign In
                    </ListButton>
                  )}
                </SidebarListBottom>
              </SidebarBody>
            </SideBarItemContainers>
          </Animation>
        )}
      </CSSTransition>
    </>
  );
}

function SideBar() {
  const [show, setShow] = useState(false);

  return (
    <div style={{ display: "flex" }}>
      <SideBarContainer>
        <LogoContainer img={logo.src} onClick={() => setShow(!show)} />
        <HeadingContainer>
          <h3
            style={{
              textOrientation: "upright",
              writingMode: "vertical-lr",
              color: "white",
              letterSpacing: "16px",
              fontSize: "1.2rem",
            }}
          >
            Strikers
          </h3>
        </HeadingContainer>
      </SideBarContainer>
      <SideBarItems show={show} />
    </div>
  );
}

export default SideBar;

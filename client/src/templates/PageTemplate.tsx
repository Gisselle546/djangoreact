"use client";

import React, { ReactNode } from "react";

import dynamic from "next/dynamic";

type PageTemplateProps = {
  type?: "default" | "home";
  children: ReactNode;
};

const Container = ({ children }: { children: ReactNode }) => (
  <div style={{ display: "flex" }}>{children}</div>
);

const SideBarWrapper = ({ children }: { children: ReactNode }) => (
  <div style={{ width: "7rem" }}>{children}</div>
);

const ChildrenWrapper = ({ children }: { children: ReactNode }) => (
  <div style={{ flex: 1 }}>{children}</div>
);

const Header = dynamic(() => import("../Components/Header/Header"), {
  ssr: false,
});

const SideBar = dynamic(() => import("../Components/SideBar/SideBar"), {
  ssr: false,
});

export const PageTemplate = ({
  type = "default",
  children,
}: PageTemplateProps) => {
  let shouldRenderHeader;
  if (typeof window !== "undefined") {
    shouldRenderHeader = window.matchMedia("(max-width: 768px)").matches;
  }

  switch (type) {
    case "home":
      return (
        <Container>
          <SideBarWrapper>
            <SideBar />
          </SideBarWrapper>
          <ChildrenWrapper>
            {shouldRenderHeader && <Header />}
            {children}
          </ChildrenWrapper>
        </Container>
      );
  }

  return (
    <>
      <Header />
      <>{children}</>
    </>
  );
};

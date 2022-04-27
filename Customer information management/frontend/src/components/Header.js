import React from "react";
import {
  Container,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar bg="primary " variant="dark">
        <Container>
          <Nav className="mx-auto">
          <Link to="/" className="navbar-brand">
          🔥고객 관리 시스템🔥
          </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

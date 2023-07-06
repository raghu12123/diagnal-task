import React, { useState, useEffect, useRef } from 'react';
import { Nav, Navbar, Container, Form, Row, Col, Card } from "react-bootstrap";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
export default function ScrollToLoad() {

const [movieList, setMovieList] = useState();
const [title, setTitle] = useState();

async function fetchMovieData() {
  const res = await fetch("https://test.create.diagnal.com/data/page1.json");
  const JsonData = await res.json();
  setMovieList(JsonData.page["content-items"]["content"]);
  setTitle(JsonData.page.title);
}

useEffect(() => {
  fetchMovieData();
}, []);

return (
  <div>
    <Navbar variant="dark" expand="lg"  bg="transparent">
      <Container className="d-flex justify-content-between">
        <Nav>
          <Navbar.Brand href="#">
            <FaArrowLeft /> {title}
          </Navbar.Brand>
        </Nav>
        <Form>
          <FaSearch className="search-icon" />
        </Form>
      </Container>
    </Navbar>
    <div className="container">
      <Row>
        {movieList?.map((item, index) => (
          <Col key={index} xs={4}>
            <Card bg="transparent" style={{ border: "none" }}>
              <Card.Img
                variant="top"
                src={
                  "https://test.create.diagnal.com/images/" +
                  item["poster-image"]
                }
              />
              <Card.Title style={{ color: "white", fontSize: "12px" }}>
                {item.name}
              </Card.Title>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  </div>
);
              }
import { useState } from "react";
import { Nav, Navbar, Container, Form, Row, Col, Card } from "react-bootstrap";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import useInfiniteScroll from "react-infinite-scroll-hook";
export default function App() {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchInput, setSearchInput] = useState();
  const [isSearch, setisSearch] = useState(0);

  const [data, setData] = useState([]);
  const [originalData, setoriginalData] = useState([]);

  const [page, setPage] = useState(1); // Current page number

  const [loading, setLoading] = useState(false);

  const [hasNextPage, setHasNextPage] = useState(true);

  const handleSearchIconClick = () => {
    setShowSearchInput(!showSearchInput);
  };

  const handleInput = (value) => {
    setSearchInput(value);

    if (isSearch === 0) {
      setoriginalData(data);
      setisSearch(1);
    }

    if (value.length === 0) {
      setisSearch(0);
      setData(originalData);
      setShowSearchInput(!showSearchInput);
    } else {
      const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setData(filteredData);
    }
  };

  const fetchmore = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://test.create.diagnal.com/data/page${page}.json`
      );
      const json = await response.json();
      const JsonData = json.page["content-items"]["content"];

      return setData((data) => [...data, ...JsonData]);
    } catch (e) {
      return setHasNextPage(false);
    } finally {
      return setLoading(false);
    }
  };

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasNextPage,
   
    onLoadMore: () => {
      setPage((prevPage) => prevPage + 1); // Increment the page number
      fetchmore();
    },
  });

  return (
    <div>
      <Navbar variant="dark" expand="lg" bg="transparent">
        <Container className="d-flex justify-content-between">
          <Nav>
            <Navbar.Brand href="#">
              <FaArrowLeft /> Romantic Comedy
            </Navbar.Brand>
          </Nav>
          <Form>
            {showSearchInput ? (
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 custom-bg"
                aria-label="Search"
                onChange={(event) => handleInput(event.target.value)}
                value={searchInput}
              />
            ) : (
              <div >
                <FaSearch color="white"
                onClick={handleSearchIconClick}
              />
              </div>
              
            )}
          </Form>
        </Container>
      </Navbar>
      <div className="container">
        <Row>
          {data &&
            data.map((item, index) => {
              return (
                <Col key={index} xs={4}>
                  <Card bg="transparent" style={{ border: "none" }}>
                
                    <Card.Img
                      variant="top"
                      src={
                        "https://test.create.diagnal.com/images/" +
                        item["poster-image"]
                      }
                    />
                 
                    <Card.Title className="text-truncate"style={{ color: "white", fontSize: "14px",marginTop:"5px" }}>
                      {item.name}
                    </Card.Title>
                  </Card>
                </Col>
              );
            })}
          {(loading || hasNextPage) && (
            <div className="loader" ref={sentryRef}>
              <h1>Loading...</h1>
            </div>
          )}
        </Row>
      </div>
    </div>
  );
}

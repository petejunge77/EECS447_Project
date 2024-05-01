import React, { useState, useEffect } from "react";
import { Col, Container, Row, Nav, Navbar, 
    Button, Card, CardBody, CardText, CardTitle, CardSubtitle } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
// components
import Header from '../components/Header'
import Login from './login.js';
import Query from '../components/queries'

import MLB from "../images/mlb.svg"
import NBA from "../images/nba.webp"


export default function Home() {

    const [seen, setSeen] = useState(true);
    let navigate = useNavigate();
    // let username = localStorage.getItem('user').replace(/['"]+/g, '');

    function togglePop() {
    //   setSeen(!seen);
      navigate('/');
    };

        function mlb() {
            navigate('/mlb')
        }
        function nba() {
            navigate('/nba')
        }

    return(
        <Container className="d-flex w-100 h-75 mt-5 justify-content-center align-items-center">
            {/* <Container>
                <Header  />
            </Container> */}
            {/* <Container className=" ">          */}
               <Row>
                <Col className="h-25 rounded  ">
                <Card 
                    style={{
                        width: '25rem', 
                        height: '30rem'
                    }}
                    >
                    <img 
                    style={{height: '50%'}}
                        alt="Sample"
                        src={NBA}
                    />
                    <CardBody>
                        <CardTitle tag="h1">
                        NBA
                        </CardTitle>
                        {/* <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                        >
                        
                        </CardSubtitle> */}
                        <CardText>
                        Enjoy player and team statistics dating back to 1980
                        </CardText>
                        <Button onClick={nba}>
                        Check it out
                        </Button>
                    </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card
                    style={{
                        width: '25rem',
                        height: '30rem'

                    }}
                    >
                    <img 
                    style={{height: '50%'}}
                        alt="Sample"
                        src={MLB}
                    />
                    <CardBody>
                        <CardTitle tag="h1">
                        MLB
                        </CardTitle>
                        {/* <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                        >
                        Card subtitle
                        </CardSubtitle> */}
                        <CardText>
                        Enjoy player and team statistics dating back to 1980
                        </CardText>
                        <Button onClick={mlb}>
                        Check it out
                        </Button>
                    </CardBody>
                    </Card>
                </Col>
               </Row>
            {/* </Container> */}
            
            {/* <Container>
                
                <button className='login' onClick={togglePop}>Login/signup</button>
                {seen ? <Login toggle={togglePop} /> : null}
            </Container> */}

        </Container>
    );
}
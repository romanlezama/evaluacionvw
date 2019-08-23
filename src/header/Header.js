import React from 'react';
import {Navbar, Nav} from "react-bootstrap";
import {Link} from 'react-router-dom'
import './Header.css'

const Header = (props) =>(
	<Navbar bg="dark" variant="dark">
		<Navbar.Brand href="#">Company</Navbar.Brand>
		<Nav className="mr-auto">
			<Nav.Link>
				<Link to={{ pathname:'/home',
					state:{
						username: props.username
					}
				}}>Home</Link>
			</Nav.Link>
			<Nav.Link>
				<Link to={{ pathname:'/transfer',
					state:{
						username: props.username
					}
				}}>Transfer</Link>
			</Nav.Link>
		</Nav>
		<Navbar.Toggle />
		<Navbar.Collapse className="justify-content-end">
			<Navbar.Text>
				<a href="/">Log Out</a>
			</Navbar.Text>
		</Navbar.Collapse>
	</Navbar>
);
export default Header;
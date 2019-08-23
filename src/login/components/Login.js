import React, {Component} from 'react';
import {Navbar, Form, Button} from "react-bootstrap";
import { withRouter, Redirect } from 'react-router';
import Display from '../../utils/Display'
import '../Login.css';

class Login extends Component{
	constructor(...props){
		super(...props);
		this.state = {
			loginOK: false,
			usernameOK: false,
			passwordOK: false,
			notificUsername: false,
			notificPass: false,
			toHome: false,
			userName: ''
		}
	}

	evalUsername = (e) => {
		var valUsername = e.target.value;
		var valuePass = document.getElementById('pass').value;
		if(valUsername.length > 7 && valUsername.length < 21){
			var validUsername = /^[A-Za-z0-9!"$%&/]*$/.test(valUsername);
			this.setState({notificUsername: !validUsername})
			this.setState({userName: valUsername})
			if(valuePass!==""){
				this.setState({loginOK:validUsername})
			}else{
				this.setState({loginOK:false})
			}
		} else{
			this.setState({notificUsername: true})
			this.setState({loginOK:false})
		}
	}

	evalPassword = (e) => {
		var valPass = e.target.value;
		var valueUsr = document.getElementById('usrname').value;
		if(valPass.length > 7 && valPass.length < 21){
			var validPass = /(?=.*[a-z])(?=.*[A-Z])(?=.*[!"$%&\/])[\d+]?/.test(valPass);
			if(validPass){
				var validSeqNumber = /\d{1}\d/.test(valPass)
				this.setState({notificPass: validSeqNumber})
				if(valueUsr!==""){
					this.setState({loginOK:!validSeqNumber})
				}else{
					this.setState({loginOK:false})
				}
			}else{
				this.setState({notificPass: true})
				this.setState({loginOK:false})
			}
		} else{
			this.setState({notificPass: true})
			this.setState({loginOK:false})
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		document.location.href="/home"
	}

	doLogin = () => {
		this.setState({
			toHome: true
		})
	}

	goToHome = () =>{
		if(this.state.toHome){
			return <Redirect to={{
				pathname:'/home',
				state:{
					username: this.state.userName
				}
			}} />
		}
	}

	render(){
		return (
			<div className="App">
				{this.goToHome()}
		      <Navbar expand="lg" variant="dark" bg="dark">
		        <Navbar.Brand href="#">Company</Navbar.Brand>
		      </Navbar>
		      <mainContainer className="App-container">
		        <Form onSubmit={this.handleSubmit} className="form-login">
		          <Form.Group>
		            <Form.Label>Username</Form.Label>
		            <Form.Control type="text" onBlur={this.evalUsername} id="usrname"/>
		            <Display if={this.state.notificUsername}>
			            <Form.Text className="text-muted">
					      El usuario debe tener entre 8 y 20 digitos, caracteres aceptados !"$%&/
					    </Form.Text>
				    </Display>
		          </Form.Group>
		          <Form.Group>
		            <Form.Label>Password</Form.Label>
		            <Form.Control type="password" onBlur={this.evalPassword} id="pass"/>
		            <Display if={this.state.notificPass}>
			            <Form.Text className="text-muted">
					      La contraseña debe contener entre 8 y 20 digitos, al menos una letra mayuscula, una minuscula y un caracter especial !"$%&/ no se permiten numeros consecutivos
					    </Form.Text>
				    </Display>
		          </Form.Group>
		          <Button variant="primary" type="button" className={this.state.loginOK ? '' : 'not-enabled' } onClick={this.doLogin}>
		            Enter
		          </Button>
		        </Form>
		      </mainContainer>
		    </div>
		);
		
	}
}
export default Login;
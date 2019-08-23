import React, {Component} from 'react';
import Header from '../../header/Header'
import {Card, Table} from "react-bootstrap";
import PieChart from 'react-minimal-pie-chart';
import TransactionsHistory from '../../api/transactionsHistory.json'
import '../Home.css';

class Home extends Component{
	state = {
		valuesToGraph: []
	}
	renderDate = (dateToRender) => {
		var d = new Date(dateToRender);
		var arMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		return d.getDate() + "/" + arMonths[d.getMonth()] + "/" + d.getFullYear();
	}
	componentDidMount(){
		var groupTrans = {};
		TransactionsHistory.transactions.map((detail,index)=>{
			if(typeof groupTrans[detail.toAccount] == "undefined"){
				groupTrans[detail.toAccount] = 0;
			}
			groupTrans[ detail.toAccount ] += detail.amount.value;
		})
		var arValues = []
		for(let el in groupTrans){
			arValues.push({
				title: el,
				value: groupTrans[el],
				color: '#'+Math.random().toString(16).substr(-6)
			});
		}
		this.setState({valuesToGraph: arValues});
	}
	render(){
		return (
			<div>
				<Header username={this.props.location.state.username}/>
				<center><h2 className="margin-top-20">Wellcome to your online banking {this.props.location.state.username}</h2></center>
				<div className="container">
					<div className="margin-top-20 row">
						<Card className="col-md-3">
							<PieChart
							  data={this.state.valuesToGraph}
							/>
							<Card.Body>
								<Card.Title>Transactions History</Card.Title>
								<Card.Text>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt, purus eu pulvinar volutpat, nulla eros vehicula metus, nec semper nibh nunc aliquet magna. Nam non sagittis lacus, sed venenatis neque. In eu justo gravida, facilisis sapien quis, ultricies nibh. Pellentesque ac vestibulum odio. Donec vel molestie erat.
								</Card.Text>
							</Card.Body>
						</Card>
						<div className="col-md-1"></div>
						<Card className="col-md-3">
							<div className="areaGray"></div>
							<Card.Body>
								<Card.Title>Main Expenses</Card.Title>
								<Card.Text>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt, purus eu pulvinar volutpat, nulla eros vehicula metus, nec semper nibh nunc aliquet magna. Nam non sagittis lacus, sed venenatis neque. In eu justo gravida, facilisis sapien quis, ultricies nibh. Pellentesque ac vestibulum odio. Donec vel molestie erat.
								</Card.Text>
							</Card.Body>
						</Card>
						<div className="col-md-1"></div>
						<Card className="col-md-3">
							<Card.Title className="padding-like-card">Current Balance</Card.Title>
							<Table striped bordered hover size="sm">
								<thead>
									<tr>
										<th>Account No.</th>
										<th>Balance</th>
										<th>Latest Transfer</th>
									</tr>
								</thead>
								<tbody>
									{TransactionsHistory.transactions.map((detail, index)=>{
										return <tr><td>{detail.toAccount}</td><td>{detail.amount.currency} {detail.amount.value}</td><td>{this.renderDate(detail.sentAt)}</td></tr>
									})}
								</tbody>
							</Table>
						</Card>
					</div>
				</div>
			</div>
		);
	}
}
export default Home;
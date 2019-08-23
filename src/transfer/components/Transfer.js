import React, {Component} from 'react';
import Header from '../../header/Header'
import {Card, Table, Form, Button} from "react-bootstrap";
import PieChart from 'react-minimal-pie-chart';
import TransactionsHistory from '../../api/transactionsHistory.json'
import Display from '../../utils/Display'
import '../Transfer.css';

class Transfer extends Component{
	state = {
		valuesToGraph: [],
		groupTotalOrigin: [],
		groupByOrigin: {},
		accountMessage: false,
		amountMessage: false
	}
	renderDate = (dateToRender) => {
		var d = new Date(dateToRender);
		var arMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		return d.getDate() + "/" + arMonths[d.getMonth()] + "/" + d.getFullYear();
	}
	componentDidMount(){
		var groupTrans = {};
		var groupOr = {};
		var groupByOrigin = {};
		TransactionsHistory.transactions.map((detail,index)=>{
			if(typeof groupTrans[detail.toAccount] == "undefined"){
				groupTrans[detail.toAccount] = 0;
			}
			groupTrans[ detail.toAccount ] += detail.amount.value;
			if(typeof groupByOrigin[detail.fromAccount] == "undefined"){
				groupByOrigin[detail.fromAccount] = [];
			}
			groupByOrigin[detail.fromAccount].push(detail)
			if(typeof groupOr[detail.fromAccount] == "undefined"){
				groupOr[detail.fromAccount] = 0;
			}
			groupOr[ detail.fromAccount ] += detail.amount.value;
		})
		var arValues = []
		for(let el in groupTrans){
			arValues.push({
				title: "Destination: "+el+" Amount: "+groupTrans[el],
				value: groupTrans[el],
				color: '#'+Math.random().toString(16).substr(-6)
			});
		}
		var arValuesOr = []
		for(let el in groupOr){
			arValuesOr.push({
				title: el,
				value:groupOr[el]
			})
		}
		this.setState({groupByOrigin: groupByOrigin});
		this.setState({valuesToGraph: arValues});
		this.setState({groupTotalOrigin: arValuesOr});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		var orAccount = document.getElementById('originAccount').value;
		var desAccount = document.getElementById('destinationAccount').value;
		var amountToTrans = document.getElementById('amountToTransfer').value;
		if(desAccount.length==8){
			this.setState({
				accountMessage: !/^[0-9]*$/.test(desAccount)
			})
		}else{
			this.setState({accountMessage: true})
		}

		this.state.groupTotalOrigin.map((detail, index)=>{
			if(detail.title==orAccount){
				if(/^[0-9]*$/.test(amountToTrans)){
					if(parseFloat(amountToTrans) > detail.value){
						this.setState({amountMessage: true})
					}else{
						this.setState({amountMessage: parseFloat(amountToTrans)>100000});
					}
				}else{
					this.setState({amountMessage: true})
				}
			}
		})
		if(this.state.accountMessage==false && this.state.amountMessage==false){
			this.state.groupByOrigin[orAccount].push({
				fromAccount: orAccount,
				toAccount: desAccount,
				sentAt: new Date(),
				amount:{
					currency: "$",
					value: amountToTrans
				}
			});
			this.state.valuesToGraph.map((detail, index)=>{
				if(detail.title == desAccount){
					detail.value += parseFloat(amountToTrans)
				}
			})
			this.state.groupTotalOrigin.map((detail, index)=>{
				if(detail.title == orAccount){
					detail.value -= parseFloat(amountToTrans)
				}
			})
		}
	}

	render(){
		return (
			<div>
				<Header/>
				<div className="container">
					<div className="margin-top-20 row">
						<div className="col-6">
							<Form onSubmit={this.handleSubmit}>
							  <Form.Group>
							    <Form.Label>Select origin account</Form.Label>
							    <Form.Control as="select" id="originAccount">
							    	{this.state.groupTotalOrigin.map((detail, index)=>{
										return <option value={detail.title}>{detail.title} - ${detail.value}</option>
									})}
							    </Form.Control>
							  </Form.Group>
							  <Form.Group>
							    <Form.Label>Destination account</Form.Label>
							    <Form.Control type="text" id="destinationAccount"/>
							    <Display if={this.state.accountMessage}>
								    <Form.Text className="text-muted">
								      Only numbers, minimum 8 digits
								    </Form.Text>
							    </Display>
							  </Form.Group>
							  <Form.Group>
							    <Form.Label>Amount</Form.Label>
							    <Form.Control type="text" id="amountToTransfer"/>
							    <Display if={this.state.amountMessage}>
								    <Form.Text className="text-muted">
								      Only numbers, maybe you have not money or Amount is more that 100,000
								    </Form.Text>
							    </Display>
							  </Form.Group>
							  <Button variant="primary" type="submit">
							    Transfer
							  </Button>
							</Form>
						</div>
						<div className="col-2"></div>
						<div className="col-4">
							<PieChart
							  data={this.state.valuesToGraph}
							/>
						</div>
					</div>
					<div className="margin-top-20 row">
						<div className="col-10">
							{Object.keys(this.state.groupByOrigin).map((el, i)=>{
								return (<Table striped bordered hover size="sm">
									<thead>
										<tr>
											<th>Origin Account</th>
											<th>Destination Account</th>
											<th>Transfer Date</th>
											<th>Amount</th>
										</tr>
									</thead>
									<tbody>
									{this.state.groupByOrigin[el].map((detail, index)=>{
										return(<tr><td>{detail.fromAccount}</td><td>{detail.toAccount}</td><td>{this.renderDate(detail.sentAt)}</td><td>{detail.amount.currency} {detail.amount.value}</td></tr>)
									})}
									</tbody>
								</Table>)
							})}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Transfer;
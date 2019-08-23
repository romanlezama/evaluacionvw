"use strict";
export const getHistoryTransaction = () =>
	fetch('../api/transactionsHistory.json')
		.then(function(resp){
			return resp.text();
		})
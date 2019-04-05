const express = require('express');
const app = express();
const Web3 = require('web3')
const web3 = new Web3('http://175.211.37.35:8545')
const abi = require('human-standard-token-abi');
const bodyParser = require('body-parser');
const abiDecoder = require('abi-decoder'); 
const elasticsearch = require('elasticsearch');

const DAI = '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359';
const MKR = '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2';

const client = elasticsearch.Client({ // elasticsearch 인스턴스 생성
    host: '175.211.37.35:9212',
    log: 'debug'
});


app.use(bodyParser.json()); // for parsing application/json


app.post('/addr/list', function (req, res) {
	let params = req.body;

	const elasticData3 =  client.search({
	  index: 'eth',
	  type : 'transaction',
	  size : params.size, 	
	  filter_path:'hits.hits._source',
	  body: {
		  "query": {
			"bool" : {  
			  "should" : [
				{ "match" : { "from" : params.addr } },
				{ "match" : { "to" : params.addr } }
			  ] 
			} 
		  },
		  "sort": [
			{"timestampSeoul" : "desc"}
		  ]
	  }
	});

	var resultDatas = [];

	elasticData3.then(tx_data =>{
		for(var v in tx_data.hits.hits) {
			let resultData = {};
			resultData.from = tx_data.hits.hits[v]._source.from
			resultData.to = tx_data.hits.hits[v]._source.to
			let value = tx_data.hits.hits[v]._source.value
			if(value.substring(value.length-2,value.length)==".0"){
				value = value.substring(0,value.length-2)
			}
			resultData.value = value
			resultData.txTime = tx_data.hits.hits[v]._source.txDateSeoul
			resultData.txHash = tx_data.hits.hits[v]._source.hash
            resultData.timeLong =  tx_data.hits.hits[v]._source.timeLong
			resultData.currency = 'ETH';
			resultDatas.push(resultData);
			//to_do
			//web3 promise. 호출
		}
		 erc20Log(resultDatas).then( txDatas =>{

			 erc20Value(resultDatas).then(txDatas =>{

                 let sortingField = "timeLong";
                 txDatas.sort(function(a,b){
                     return b[sortingField] > a[sortingField] ? 1:-1;
                 })

				res.json(txDatas);
			 })

		 });

	 });
});


var isEmpty = function(value){
	if( value == "" || value == null || value == undefined || 
	   ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
		return true; 
     }else{
		return false; 
	 }
};


const erc20Log = async txDatas =>{
 
    for(let tx in txDatas){
	 
 		abiDecoder.addABI(abi);
		
		await web3.eth.getTransactionReceipt(txDatas[tx].txHash).then( receipt => {

			const decodedLogs = abiDecoder.decodeLogs(receipt.logs);

			if(isEmpty(decodedLogs)){
			  return;
			}

			let erc20Results = [];
			

			for(var v in decodedLogs){
				let erc20Data = {};

				if(isEmpty(decodedLogs[v])){
					continue;
				}

				if(decodedLogs[v].name!="Transfer"){
					continue;
				}

				for(var i in decodedLogs[v].events){
					let name  = decodedLogs[v].events[i].name;
					let value = decodedLogs[v].events[i].value;
					if(name == "_from"){
						erc20Data.from =  value;
					}else if(name == "_to"){
						erc20Data.to =  value;
					}else if(name == "_value"){
						erc20Data.value =  value;
					};
				}
				erc20Data.address = decodedLogs[v].address;
				erc20Results.push(erc20Data);
			}

			  txDatas[tx].logData = erc20Results;

		}).catch(error =>{
				console.log("error in erc20Log");
				console.log(error);
				throw error;
		});
		
	}
	return txDatas;

};


 const erc20Value = async txDatas =>{

 	addErc20Datas =[]

	for(let tx in txDatas ){

		if(isEmpty(txDatas[tx].logData)){
			continue;
		}

		for(let log in txDatas[tx].logData){

			let tokenContract = new web3.eth.Contract(abi,txDatas[tx].logData[log].address);
			let decimals      = tokenContract.methods.decimals().call();
            let symbol 		  = tokenContract.methods.symbol().call();
			let name 		  = tokenContract.methods.name().call();
            let resData ={};

            if(DAI == txDatas[tx].logData[log].address){
                 symbol = new Promise(function(resolve,reject){ resolve("DAI")})
                 name = new Promise(function(resolve,reject){ resolve("Dai Stablecoin v1.0 (DAI)")})
                 decimals = new Promise(function(resolve,reject){ resolve(18)})
            }else if(MKR == txDatas[tx].logData[log].address) {
                 symbol = new Promise(function (resolve, reject) {resolve("MAR")})
                 name = new Promise(function (resolve, reject) {resolve("maker")})
                 decimals = new Promise(function(resolve,reject){ resolve(18)})
            }

			await Promise.all([decimals,symbol,name]).then(arrayResult =>{

				resData.decimals  = arrayResult[0];
                resData.symbol    = arrayResult[1];
                resData.tokenName = arrayResult[2];

				const BN = web3.utils.BN;
				
				console.log(web3.fromWei(txDatas[tx].logData[log].value,"ether"))
				
				const balanceWeiBN = new BN(txDatas[tx].logData[log].value)
				const decimalsBN = new BN(resData.decimals)
				const divisor = new BN(10).pow(decimalsBN)
				
				

				let beforeDecimal = balanceWeiBN.div(divisor)
				let afterDecimal  = balanceWeiBN.mod(divisor)
				let beforeDecimalST = beforeDecimal.toString()
				let afterDecimalST = afterDecimal.toString()
				let afterDecimalReturn = "";
				for(let i=afterDecimalST.length;  i >= 1 ; i--){
					let data = afterDecimalST.substring(i-1,i)
                    if(data==0){
                        afterDecimalReturn = afterDecimalST.substring(0,i-1);
                    }
				}

				if(afterDecimalReturn==""){
					resData.value = beforeDecimalST;
				}else{
					resData.value = beforeDecimalST+"."+afterDecimalReturn;
				}

                resData.from = txDatas[tx].logData[log].from
                resData.to = txDatas[tx].logData[log].to
                resData.currency =   resData.symbol
				resData.txHash = txDatas[tx].txHash
                resData.txTime = txDatas[tx].txTime
                resData.timeLong = txDatas[tx].timeLong

                addErc20Datas.push(resData)

				txDatas[tx].logData[log].symbol = resData.symbol;
				txDatas[tx].logData[log].tokenName = resData.tokenName;
				txDatas[tx].logData[log].value = resData.value;

			}).catch(error=>{
				console.log("error in erc20Value");
				console.log(error);
			})
		}
	}

	for(let i in addErc20Datas){
        txDatas.push(addErc20Datas[i])
    }

	returnData =[];
	for(let i in txDatas){
		if(txDatas[i].value=='0' && !isEmpty(txDatas[i].logData)){
			continue;
		}
		returnData.push(txDatas[i])
	}

	return returnData;
};



var isEmpty = function(value){
	if( value == "" || value == null || value == undefined || 
	   ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
		return true; 
     }else{
		return false; 
	 } 
};


app.listen(3000);


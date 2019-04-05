 const express = require('express');
const app = express();
const Web3 = require('web3')
const web3 = new Web3('http://175.211.37.35:8545')
const abi = require('human-standard-token-abi');
const bodyParser = require('body-parser');
const abiDecoder = require('abi-decoder'); 


app.use(bodyParser.json()); // for parsing application/json

app.post('/', async function (req, res) {
	var resData={};
	var params = req.body;

	abiDecoder.addABI(abi);

	let erc20Results = [];

	await web3.eth.getTransactionReceipt(params.txHash).then( receipt => {

        const decodedLogs = abiDecoder.decodeLogs(receipt.logs);

        if(isEmpty(decodedLogs)){
            res.json([])
        }

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

        symbolCheck(abi,erc20Results).then( erc20Results => {
            console.log("symbolCheck")
            console.log(erc20Results);
          
            res.json(erc20Results)

        }).catch(error =>{
			console.log("error in erc20Log");
			console.log(error);
			res.send("error")
			throw error;
		});
	

	}).catch(error =>{
        console.log("error in erc20Log");
        console.log(error);
        res.send("error")
        throw error;
	});
	


});

var symbolCheck = async function(abi,erc20DataList){
    
    for(let v in erc20DataList){
    
        let tokenContract = await new web3.eth.Contract(abi,erc20DataList[v].address );
        let decimals      = tokenContract.methods.decimals().call();
        let symbol 	  = tokenContract.methods.symbol().call();
        let name 	  = tokenContract.methods.name().call();

        await Promise.all([decimals,symbol,name]).then(arrayResult =>{
            erc20DataList[v].decimals  = arrayResult[0];
            erc20DataList[v].symbol    = arrayResult[1];
            erc20DataList[v].tokenName = arrayResult[2];
		})
	}
    
    return erc20DataList;
}
	 
	 
var isEmpty = function(value){
	 if( value == "" || value == null || value == undefined ||
	   ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
		return true;
	 }else{
		return false;
	 }
};


app.listen(3001);

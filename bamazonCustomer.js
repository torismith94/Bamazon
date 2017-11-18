var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",

	password: "144037",
	database: "bamazon"
}); 

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
	connection.query("SELECT * FROM products", function (err, res) {
		for (var i = 0; i < res.length; i++) {
			console.log(res[i].item_id + " | " + res[i].product_name + " | "+ "$" + res[i].price);
		}
		order();

	});
}


function order() {
	inquirer
	.prompt({
		name: "product_id",
		type: "input", 
		message: "What is the ID of the product you would like to buy?"
	})
	.then(function(answer) {
		if (answer.product_id === "1", "2", "3", "4", "5", "6", "7", "8", "9", "10") {
			console.log("You bought item " + answer.product_id);
		}
		buyItem();
	});
}


function buyItem() {
	inquirer
	.prompt({
		name: "quantity",
		type: "input",
		message: "How many units of the item would you like to buy?"
	})
	.then(function(answer){
		var quantityBought;
		for (var i = 0; i < results.length; i++) {
		  if (results[i].stock_quantity === answer.choice) {
			quantityBought = results[i];
		  }
		}

		if (quantityBought.stockquantity < parseInt(answer.bid)){
			
		}
	}

		)





	.then(function(answer){
		connection.query(
			"INSERT INTO bamazon SET",
			{
				stock_quantity: answer.stockquantity

			},
			function(err) {
				if (err) throw err;
				console.log("There is not enough stock to fulfill your order. Your order was not placed.");
			}
			);
		console.log('You bought ' + answer.quantity + ' units.');
	
});
}


	




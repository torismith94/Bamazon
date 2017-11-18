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
	connection.query("SELECT * FROM products", function (err, results) {
		for (var i = 0; i < results.length; i++) {
			console.log(results[i].item_id + " | " + results[i].product_name + " | "+ "$" + results[i].price);
		}
		order(results);

	});
}


function order(query) {
	inquirer
	.prompt([{
		name: "item_id",
		type: "input", 
		message: "What is the ID of the product you would like to buy?"
	},
	{
		name: "quantity",
		type: "input",
		message: "How many units of the item would you like to buy?"
	}])
	.then(function(results) {
		var validItem = false;
		for (var i = 0; i < query.length && !validItem; i++) {
		  if (query[i].item_id === parseInt(results.item_id)) {
				validItem = true;
		 	}
		 }
		if (validItem) {
			checkQuantity(parseInt(results.item_id), parseInt(results.quantity));
		}
		else {
			console.log("Not a valid item. Please choose one from the list above.")
			connection.end();
		}	
		// if (answer.product_id === "1", "2", "3", "4", "5", "6", "7", "8", "9", "10") {
		// 	console.log("You bought item " + answer.product_id);
		// }
		// buyItem();
	});
}


function checkQuantity (id, quantity) {
	connection.query("SELECT * from products where?", 
		[{
			item_id: id
		}], 
		function(err, results) {
			if (err) throw err; 
			else {
				if(results[0].stock_quantity >= parseInt(quantity)) {
					var total = parseInt(quantity) * results[0].price;
					console.log("Your total is $" + total)
					updateDb(id, quantity, results[0].stock_quantity);
				}
				else {
					console.log("There is not enough stock to fulfill your order. Your order was not placed.");
					connection.end();
				}
			}
			})
	}

function updateDb(id, requested, instock) {
	connection.query("UPDATE products SET ? WHERE ?", 
		[
			{
				stock_quantity: (instock-requested)
			},
			{
				item_id: id
			}
		],
		function(err,res){
			console.log("Complete!");
			connection.end();
		})
}



# Bamazon

##Overview

Bamazon is an interactive CLI node app utilizing MySQL and Node.JS. The app allows users to purchase items as a customer if they are in stock, and will notify customers if they are out of stock. 

When you run Bamazon, a list of all available products will appear.

![List View of Items](/images/list_of_products.png) 

You will then be prompted with two questions: 
1. What is the ID of the product you would like to buy?
1. How many units of the item would you like to buy?

Once you select an item from the list and enter the quantity you would like to purchase, the app checks quantities with the MySQL database. 

If stock is available, your order is successful and you will be show your order total.

![Successful purchase](/images/Completed_purchase.png) 

If the stock is unavailable, your order will not be completed. 

![Out of Stock Items](/images/out-of-stock.png)

##Live Demo: 
https://youtu.be/ApdGwLY0_Kw
// Display all bookings when page loads 
console.log("Furniture Retailer successfully loaded.");

const orderForm = document.getElementById("orderForm");
const orderlist = document.getElementById("orderlist");
const output = document.getElementById("output");
const orderHistory = document.getElementById("orderHistory");
const filterorders = document.getElementById("filterorders");

const history = [
    {
        id: 1,
        customerName: "Ryan",
        productName: "Couch",
        finalCost: 400,
        status:"Pending" 
    },
    {
        id: 2,
        customerName: "Brandon",
        productName: "Desk",
        finalCost: 1200,
        status:"Ready" 
    },
    {
        id: 3,
        customerName: "Shane",
        productName: "Bed Frame",
        finalCost: 800,
        status:"Pending" 
    },
    {
        id: 4,
        customerName: "Charl",
        productName: "Couch",
        finalCost: 20000,
        status:"Pending" 
    },
    {
        id: 5,
        customerName: "Johan",
        productName: "Desk",
        finalCost: 400,
        status:"Ready" 
    }
];

// Function 1: Calculate the Default cost
function calculateDefaultPrice(quantity, unitPrice) {
    const defaultPrice = quantity * unitPrice;

    console.log("Default cost calculated:", defaultPrice);

    return defaultPrice;
}


// Function 2: Apply the Member Discount
function applyMemberDiscount(defaultPrice, memberStatus) {

    if (memberStatus) {
        const finalCost = defaultPrice - 1.10; 
        
        console.log("Member Status Dectected."); 
        console.warn("A 10% discount has been applied has been applied."); 
        
        return finalCost;
    }

    return defaultPrice;
}

orderForm.addEventListener("submit", function(event){
    console.log("Order Button was clicked");

    event.preventDefault();

    const customerName = document.getElementById("customerName").value;
    const productName = document.getElementById("productName").value;
    const quantity = Number(document.getElementById("quantity").value);
    const deliveryType = document.getElementById("deliveryType").value;
    const memberStatus = document.getElementById("memberStatus").checked;

    //Validate Customer Name
    if (customerName === ""){
        console.error ("Error: Customer name is missing.")

        output.innerHTML = `
        <p> Please enter Customer Name</p>`;
        return;

    }

        //Validate Product
    if (productName === ""){
        console.error ("Error: Product is not selected.")

        output.innerHTML = `
        <p> Please select a Product</p>`;
        return;
        
    }

    //Validate Delivary
    if (deliveryType === ""){
        console.error ("Error: Delivary is not selected.")

        output.innerHTML = `
        <p> Please select a Delivary Option</p>`;
        return;
        
    }

     //Validate Quanity 
    if (isNaN(quantity) || quantity <=0){
        console.error ("Error: Quanity cannot be less then zero or be an negative number.")

        output.innerHTML = `
        <p> Please enter a valid amount for the Quanity</p>`;
        return;
        
    }

    //Unit Price

    const unitPrice = 400;

    // First Function
    const defaultPrice = calculateDefaultPrice(quantity, unitPrice);

    //Second Function
    const finalCost = applyMemberDiscount(defaultPrice, memberStatus);

    /*//Calculate Defualt Price
    const defaultPrice = quantity * unitPrice;*/

    let orderStatus;

    if (memberStatus){
        orderStatus = "Is a Member";
    } else {
        orderStatus = "Not a Member"
    }

    //Calculate Member discount

    let memberDiscount = 0;

    if (memberStatus) {
        memberDiscount = defaultPrice * 0.10;
    }

    // Calculate Final cost

    /*const finalCost = defaultPrice - memberDiscount;*/

    //Order Result
    output.innerHTML =`
    <h2>Orders</h2>
    <p><strong>Customer:</strong> ${customerName}<p>
    <p><strong>Product:</strong> ${productName}<p>
    <p><strong>SubTotal Price:</strong> R${defaultPrice.toFixed(2)}<p>
    <p><strong>Discount Price:</strong> R${memberDiscount.toFixed(2)}<p>
    <p><strong>Final Price:</strong> R${finalCost.toFixed(2)}<p>`;

    console.log("Order Booking displayed successfully.");

    //Display Order History
    function displayedOrders(ordersArray){
        console.log("Displaying order history:", ordersArray);

        orderHistory.innerHTML = "";

        ordersArray.forEach(function(history) {
            orderHistory.innerHTML += `
                <div class="order-card">
                    <p><strong>ID:</strong> ${history.id}</p>
                    <p><strong>Customer Name:</strong> ${history.customerName}</p>
                    <p><strong>Product Name:</strong> ${history.productName}</p>
                    <p><strong>Final Cost:</strong> ${history.finalCost}</p>
                    <p><strong>Status:</strong> ${history.status}</p>
                </div>
            `;
        });
    }

    orderHistory.addEventListener("change", function(){
        const selectValue = orderHistory.value;
        console.log ("Filter selected:", selectValue);

        if (selectValue === "All") {
            console.log("Displaying all orders.");

            displayedOrders(history);
        } else {
            const filterorders = history.filter(function(history){
                return history.status === selectValue ||
                history.productName === selectValue;
            });
            if (filterorders.length === 0) {
                console.warn ("No orders found for:", selectValue );
            } else{
                console.log("Number of orders found:", filterorders.length);
            }

            displayedOrders(filterorders);
        }
    })
});

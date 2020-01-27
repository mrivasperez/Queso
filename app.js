/*
* What I learned while making this:
*   Modules are very important to keep process of code a secret
*   as well as to help improve maintainability of code
*   by ensuring that each function of the application
*   is completely independent from one another.
*/

//creating modules in js
//each module does one thing completely independent from one another.
//BUDGET CONTROLLER MODULE
var budgetController = (function() {

    //code

})();


//UI CONTROLLER MODULE
var UIController = (function() {

    //code

    return {
        getinput: function(){
            
        }
    }
})();


// GLOBAL APP CONTROLLER MODULE - CENTRAL PLACE WHERE EVENTS ARE DELEGATED
var controller = (function(budgetCrl, UICtrl){

    //Code to run when click or key event listeners are triggered
    var ctrlAddItem = function(){
        //1. get field input data

        // 2. Add the item to the budget controller

        // 3. Add the new item to the UI

        // 4. Calculate the budget

        // 5. Display the budget on the UI

    };

    //event listener for the add button
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    //event listener for when enter key is pressed
    document.addEventListener('keypress', function(event){

        if(event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        };

    });


})(budgetController, UIController);
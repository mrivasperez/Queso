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
    //all strings so that we can modify in the future vs keeping them else.
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
    };

    //code

    return {
        getInput: function(){
            //create object to return so that it's easier to get values later on
            return {
                type: document.querySelector(DOMstrings.inputType).value, //will be either income (inc or expense (exp)
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        getDOMstrings: function(){
            return DOMstrings;
        }
    };
})();


// GLOBAL APP CONTROLLER MODULE - CENTRAL PLACE WHERE EVENTS ARE DELEGATED
var controller = (function(budgetCrl, UICtrl){
    //function for all event listeners
    var setupEventListeners = function(){

        //event listener for the add button
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        //event listener for when enter key is pressed
        document.addEventListener('keypress', function(event){

            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            };

         });
    };
    
    var DOM = UICtrl.getDOMstrings();

    //Code to run when click or key event listeners are triggered
    var ctrlAddItem = function(){
        //1. get field input data

        var input = UICtrl.getInput();

        // 2. Add the item to the budget controller

        // 3. Add the new item to the UI

        // 4. Calculate the budget

        // 5. Display the budget on the UI

    };

    return {
        //app initiliazation function
        init: function() {
            console.log('application has started');
            setupEventListeners();
        }
    };


})(budgetController, UIController);

//start the application
controller.init()
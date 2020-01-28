/*
* What I learned while making this:
*   Modules are very important to keep process of code a secret
*   as well as to help improve maintainability of code
*   by ensuring that each function of the application
*   is completely independent from one another.
*/

//creating modules in js
//each module does one thing completely independent from one another.
//BUDGET CONTROLLER MODULE - keeps track of income, expenses, and percentages
var budgetController = (function() {

    //data model for expenses and income
    //function constructor for expense
    var Expense = function(id, description, value) {
        this.id = id;
        this. description = description;
        this.value = value;
    };

    //function constructo for income
    var Income = function(id, description, value) {
        this.id = id;
        this. description = description;
        this.value = value;
    };

    var calculateTotal = function(type) {
        var sum = 0;
        // go through array using foreach to get total sum of each type
        data.allItems[type].forEach(function(cur){
            sum += cur.value;
        });
        // save totals to total object in data object based on type
        data.totals[type] = sum;
    };

    //best data structure to maintain items is a an object with an object with two arrays
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    //add a new item based on type
    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            //create new ID = previous ID + 1 only if array.type is greater than 0
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id +1;
            } else {
                ID = 0;
            }

            //create new item based on type
            //if expense
            if (type === 'exp'){
                newItem = new Expense(ID, des, val);

            //if income
            } else if (type === 'inc'){
                newItem = new Income(ID, des, val);
            };

            //push newItem to allItems array in the data object created above
            data.allItems[type].push(newItem);

            //return new element
            return newItem;
        },
        //public function to get budget totals, difference, and percentages
        calculateBudget: function(){
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            //calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            // calculate the percentage of income that we spent
            // I used an if statement here to make sure that calculation is only made when total income is greater than 0
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            };
        },

        // public function to retrieve budget, inc/exp, and % from data
        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

    };
})();


//UI CONTROLLER MODULE
var UIController = (function() {
    //all strings so that we can modify in the future vs keeping them else.
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };

    return {
        getInput: function(){
            //create object to return so that it's easier to get values later on
            return {
                type: document.querySelector(DOMstrings.inputType).value, //will be either income (inc or expense (exp)
                description: document.querySelector(DOMstrings.inputDescription).value,
                //covert value of input value to a number and add to object
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value) 
            };
        },

        addListItem: function(obj, type){
            var html, newHTML, element;
            // 1 create element and html string w/ placeholder text depending on type

            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp'){
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // 2 replace placeholder text with actual data
            newHTML = html.replace('%id%',obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace('%value%', obj.value);

            // 3 insert the html indo the DOM
             //add to income list
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        },

        //method to clear input field
        clearFields: function () {
            var fields, fieldsArr;
            //get a list of current fields
            fields = document.querySelectorAll(DOMstrings.inputDescription +', ' + DOMstrings.inputValue);
            //make an array out of the fields list 
            fieldsArr = Array.prototype.slice.call(fields);
            //use for each method in array to loop over elements in fields array and set value to an empty string
            fieldsArr.forEach(function(current, index, array){
                current.value = "";
            });
            fieldsArr[0].focus();
        },

        getDOMstrings: function(){
            return DOMstrings;
        }
    };
})();


// GLOBAL APP CONTROLLER MODULE - CENTRAL PLACE WHERE EVENTS ARE DELEGATED
var controller = (function(budgetCtrl, UICtrl){
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

    //update budget function
    var updateBudget = function(){
        // calculate the budget
        budgetCtrl.calculateBudget();
        // return the budget
        var budget = budgetCtrl.getBudget();
        // display the budget on the UI
        console.log(budget);
    };

    //Code to run when click or key event listeners are triggered
    var ctrlAddItem = function(){
        var input, newItem;
        //1. get field input data
        input = UICtrl.getInput();
        //only run if input description is not empty
        if(input.description !== "" && !isNaN(input.value) && input.value > 0){
        // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            // 3. Add the new item to the UI
            UICtrl.addListItem(newItem, input.type);
            // 4. clear the field
            UICtrl.clearFields();
            // Calculate and update budget
            updateBudget();
        };
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
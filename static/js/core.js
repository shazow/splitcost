function parseDollar(s) {
    return Number(s.replace('$', ''));
};


function CostCtrl($scope) {
    $scope.members = [];
    $scope.expenses = [];

    $scope.avgExpense = 0;
    $scope.totalExpense = 0;

    $scope.addMember = function() {
        var id = $scope.members.length + 1;
        $scope.members.push({
            id: id,
            name: $scope.memberName.trim(),
            paid: 0.0,
            _selected: id == 1
        });
        $scope.memberName = '';
        $scope.avgExpense = $scope.totalExpense / $scope.members.length;
    };

    $scope.selectMember = function(selected) {
        if (modPressed) return;

        angular.forEach($scope.members, function(member) {
            if (member.name == selected.name) return;
            member._selected = false;
        });
    };

    $scope.addExpense = function() {
        var who = [];
        angular.forEach($scope.members, function(member) {
            if (!member._selected) return;
            who.push(member);
        });

        var amount = parseDollar($scope.amount);
        var amountEach = amount / who.length;
        angular.forEach(who, function(member) {
            member.paid += amountEach;
        });
        $scope.expenses.push({
            amount: amount,
            description: $scope.description,
            who: who
        });
        $scope.totalExpense += amount;
        $scope.avgExpense = $scope.totalExpense / $scope.members.length;

        $scope.description = '';
        $scope.amount = '';

        $('#expense-amount').focus();
    };

    $scope.getNames = function(members) {
        var names = [];
        angular.forEach(members, function(member) {
            names.push(member.name);
        });
        return names;
    };
};



/* Key and mouse magic: */

var modPressed = false;

window.addEventListener('keydown', function(e) {
    if (e.keyCode >= 16 || e.keyCode <= 18) {
        modPressed = true;
    }
}, false);

window.addEventListener('keyup', function(e) {
    if (e.keyCode >= 16 || e.keyCode <= 18) {
        modPressed = false;
    }
}, false);

$.support.selectstart = "onselectstart" in document.createElement("div");
$.fn.disableSelection = function() {
    return this.bind( ( $.support.selectstart ? "selectstart" : "mousedown" ) +
        ".ui-disableSelection", function( event ) {
        event.preventDefault();
    });
};

$(function() {
    $(".members").disableSelection();
});

/***/



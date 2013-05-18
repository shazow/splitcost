/*
var modPressed = false;

window.addEventListener('keydown', function(e) {
    if (e.keyCode == 16 || e.keyCode == 17) {
        modPressed = true;
    }
}, false);

window.addEventListener('keyup', function(e) {
    if (e.keyCode == 16 || e.keyCode == 17) {
        modPressed = false;
    }
}, false);
*/

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

    $scope.getMember = function(name) {
        angular.forEach($scope.members, function(member) {
            if (member.name == name) return member;
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

        document.getElementById('expense-amount').focus();
    };

    $scope.getNames = function(members) {
        var names = [];
        angular.forEach(members, function(member) {
            names.push(member.name);
        });
        return names;
    };
};

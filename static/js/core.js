function parseDollar(s) {
    return Number(s);
};


function CostCtrl($scope) {
    $scope.expenses = [];
    $scope.members = [];

    $scope.avgExpense = 0.0;
    $scope.totalExpense = 0.0;

    $scope.addMember = function() {
        $scope.members.push({
            name: $scope.memberName.trim(),
            paid: 0.0,
            _selected: false
        });
        $scope.memberName = '';
    };

    $scope.getMember = function(name) {
        angular.forEach($scope.members, function(member) {
            if (member.name == name) return member;
        });
    };

    $scope.addExpense = function() {
        var num = $scope.members.length;
        var amount = parseDollar($scope.amount);
        var amountEach = amount / num;
        var who = [];
        angular.forEach($scope.members, function(member) {
            if (!member._selected) return;
            member.paid += amountEach;
            who.push(member);
        });
        $scope.expenses.push({
            amount: amount,
            description: $scope.description,
            who: who
        });
        $scope.totalExpense += amount;
        $scope.avgExpense = $scope.totalExpense / $scope.num;
    };
};

function parseDollar(s) {
    return Number(s);
};


function CostCtrl($scope) {
    $scope.expenses = [];
    $scope.members = [
        {
            id: 1,
            name: 'Andrey',
            paid: 0.0,
            _selected: true
        },
        {
            id: 2,
            name: 'Tracy',
            paid: 0.0,
            _selected: false
        },
    ];

    $scope.avgExpense = 0.0;
    $scope.totalExpense = 0.0;

    $scope.addMember = function() {
        var id = $scope.members.length + 1;
        $scope.members.push({
            id: id,
            name: $scope.memberName.trim(),
            paid: 0.0,
            _selected: id == 1
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
        $scope.avgExpense = $scope.totalExpense / num;
    };
};

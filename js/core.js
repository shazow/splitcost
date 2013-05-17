function parse_dollar(s) {
    return Number(s);
}

function CostCtrl($scope) {
    $scope.expenses = [];
    $scope.members = [];
    $scope.members_balance = {};

    $scope.num_members = 0;
    $scope.avg_expense = 0.0;
    $scope.total_expense = 0.0;

    $scope.add_member = function() {
        var name = $scope.memberName.trim();
        $scope.members.push(name);
        $scope.members_balance[name] = 0.0;
        $scope.num_members += 1;
        $scope.memberName = '';
    };

    $scope.add_expense = function() {
        var num_split = $scope.who.length;
        var amount = parse_dollar($scope.amount);
        var amount_each = amount / num_split;
        $scope.expenses.push({
            amount: amount,
            description: $scope.description,
            who: $scope.who
        });
        angular.forEach($scope.who, function(name) {
            $scope.members_balance[name.trim()] += amount_each;
        });
        $scope.total_expense += amount;
        $scope.avg_expense = $scope.total_expense / $scope.num_members;
    };
}

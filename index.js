function createEmployeeRecord(employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

function createEmployeeRecords(employees) {
    return employees.map(e => createEmployeeRecord(e));
};


function createTimeInEvent(dateTime) {
    const punchArray = dateTime.split(" ");
    this.timeInEvents.push({
        type: "TimeIn",
        date: punchArray[0],
        hour: parseInt(punchArray[1], 10)
    });
    return this;
};

function createTimeOutEvent(dateTime) {
    const punchArray = dateTime.split(" ");
    this.timeOutEvents.push({
        type: "TimeOut",
        date: punchArray[0],
        hour: parseInt(punchArray[1], 10)
    });
    return this;
};

function hoursWorkedOnDate(date) {
    const dateIn = this.timeInEvents.find(e => e.date === date);
    const dateOut = this.timeOutEvents.find(e => e.date === date);
    return (dateOut.hour - dateIn.hour)/100;
};

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
};

function calculatePayroll(employees) {
    let wagesArray = employees.map(e => allWagesFor.call(e));
    return wagesArray.reduce((x, e) => x + e);
};

function findEmployeeByFirstName(array, name) {
    return array.find(e => e.firstName === name);
};

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
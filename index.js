// Your code here
const createEmployeeRecord = (employee) => {
    const Object ={
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour : employee[3],
        timeInEvents : [],
        timeOutEvents :[],
    }
    return Object;
}

function createEmployeeRecords (array) {
    let objectArray = array.map(arr => createEmployeeRecord(arr))
    console.log(objectArray)
    return objectArray;
}

function createTimeInEvent (employeeObject, dateStamp) {
    const timeYear = dateStamp.split(" ")
    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(timeYear[1]),
        date: timeYear[0]
    }
    employeeObject.timeInEvents.push(timeInEvent)
    return employeeObject
}

function createTimeOutEvent (employeeObject, dateStamp) {
    const timeYear = dateStamp.split(" ")
    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(timeYear[1]),
        date: timeYear[0]
    }
    employeeObject.timeOutEvents.push(timeOutEvent)
    return employeeObject
}

function hoursWorkedOnDate (employeeObject, dateStamp) {
    let timeIn = employeeObject.timeInEvents.find(element => element.date === dateStamp)
    let timeOut = employeeObject.timeOutEvents.find(element => element.date === dateStamp)
    return (timeOut.hour - timeIn.hour) /100
}

function wagesEarnedOnDate (employeeObject, dateStamp) {
    let pay = employeeObject.payPerHour
    return hoursWorkedOnDate(employeeObject,dateStamp) * pay
}

function allWagesFor (employeeObject) {
    let total = 0
    for (let i = 0; i < employeeObject.timeInEvents.length; i++) {
        let wages = wagesEarnedOnDate(employeeObject, employeeObject.timeInEvents[i].date);
        total += wages;
    }
    return total
}

function calculatePayroll (employeeArray) {
    let allWages = []
    employeeArray.forEach(element => {
        allWages.push(allWagesFor(element))
    });
    return allWages.reduce((accumulator, currentValue) => accumulator + currentValue) 
}
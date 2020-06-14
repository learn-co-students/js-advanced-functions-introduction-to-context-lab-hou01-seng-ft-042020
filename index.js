// Your code here
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = (arr) => {
    return arr.map(a => createEmployeeRecord(a))
}

let createTimeInEvent = function(record, timein) {
    let [date, hour] = timein.split(' ')
    record.timeInEvents.push({type: "TimeIn", hour: parseInt(hour, 10), date})
    return record
}

let createTimeOutEvent = function(record, timeout) {
    let [date, hour] = timeout.split(' ')
    record.timeOutEvents.push({type: "TimeOut", hour: parseInt(hour, 10), date})
    return record
}

function hoursWorkedOnDate(record, inputDate) {
    let inTime = record.timeInEvents.find(r => r.date === inputDate)
    let outTime = record.timeOutEvents.find(r => r.date === inputDate)
    let hours = (outTime.hour - inTime.hour) / 100
    return hours
}

function wagesEarnedOnDate(record, inputDate) {
    let hours = hoursWorkedOnDate(record, inputDate)
    return hours * (record.payPerHour)
}

let allWagesFor = function(record) {
    let dates = record.timeInEvents.map(e => e.date)
    let wages = dates.reduce(function(acc, d) {
        return acc + wagesEarnedOnDate(record, d)
    }, 0)
    // let inHours = 0
    // record.timeInEvents.forEach(e => inHours += e.hour)
    // let outHours = 0
    // record.timeOutEvents.forEach(e => outHours += e.hour)
    // let hours = (outHours - inHours) / 100
    // let wage = hours * record.payPerHour
    return wages
}

function findEmployeeByFirstName(arr, first) {
    return arr.find(rec => rec.firstName === first)
}

let calculatePayroll = function(arr) {
    return arr.reduce(function(acc, rec) {
        return acc + allWagesFor(rec)
    },0)
}
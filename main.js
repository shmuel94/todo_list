const fileName = "tasks.txt";
const fs = require("fs");
const process = require("process");
const express = require("express");
const path = require("path");
const PORT = 8080;
const app = express();
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));
const tasks = [
    {id: 1, name: "homework", data: 12.10, isCompleted: true},
    {id: 2, name: "work", data: 13.10, isCompleted: true},
    {id: 3, name: "studies", data: 14.10, isCompleted: false},
    {id: 4, name: "shopping", data: 15.10, isCompleted: false}
];
// fs.writeFileSync(fileName,JSON.stringify(tasks));
function addObj(){
    let data =JSON.parse(fs.readFileSync(fileName, "utf8"));
    let task = {id: process.argv[3], name: process.argv[4], date: process.argv[5], isCompleted: process.argv[6]}
    // let taskJson = task;
    data.push(task);
    fs.writeFileSync(fileName, JSON.stringify(data));

}

function printObj(){
    console.log(fs.readFileSync(fileName, "utf8"));
}

function updateObj(){
    let data = JSON.parse(fs.readFileSync(fileName, "utf8"));
    let found = data.find(element  => element.id == process.argv[3]);
    found.isCompleted = process.argv[4];
    fs.writeFileSync(fileName,JSON.stringify(data));
}

function deleteObj(){
    let data = JSON.parse(fs.readFileSync(fileName, "utf8"));
    let found = data.findIndex(element  => element.id == process.argv[3]);
    data.splice(found,1);
    fs.writeFileSync(fileName,JSON.stringify(data));
    console.log(data);
}

switch (process.argv[2]) {
    case "add":
        addObj();
        break;

    case "print":
        printObj();
        break;
    
    case "update":
        updateObj();
        break;
    
    case "delete":
        deleteObj();
        break;   

    default:
        console.log("not found");
        break;
}
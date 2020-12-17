var express = require("express")
var app = express()
var PORT = process.env.PORT || 3000;
var path = require('path');
app.use(express.static("page"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
var m = []
var k = []
function plcie(){
    m = []
    k = []
    tab.forEach(a =>{
        if (a.gender == "m"){
            m.push(a)
        }else{
            k.push(a)
        }
})
}

menuski = `<div id="pasekadmin">
        <a href="/sort"> Sort </a>
        <a href="/gender"> Gender </a>
        <a href="/show"> Show </a>
        <a href="/logout">Logout</a>
        </div>`


var tab = [
    { id: 1, username: "AAA", pass: "PASS1", age: 10, student: "checked", gender: "m" },
    { id: 2, username: "BBB", pass: "PASS2", age: 17, student: "", gender: "k" },
    { id: 3, username: "CCC", pass: "PASS3", age: 16, student: "checked", gender: "m" },
    { id: 4, username: "DDD", pass: "PASS1", age: 20, student: "", gender: "k" }
]

app.listen(PORT, function() {
    console.log("Start serwera na porcie " + PORT);
  });
  
app.get("/", function (req,res){
    res.sendFile(path.join(__dirname + "/page/html/main.html"))
})

app.get("/register", function (req,res){
    res.sendFile(path.join(__dirname + "/page/html/register.html"))
})

app.get("/login", function(req,res){
    res.sendFile(path.join(__dirname + "/page/html/login.html"))
})

app.post("/register", function(req,res){
    var check;
    tab.forEach(a =>{
        if(a.username == req.body.username) check = true
    })
    if(check == true){
        res.send("User already exists")  
    }else{
    if(req.body.student) var student = 'checked';
    else var student = '';
    var user = {
        id: tab.length + 1,
        username: req.body.username,
        pass: req.body.password,
        age: req.body.age,
        student: student,
        gender: req.body.gender,
      };
      tab.push(user)
      res.send("Zostales zarejestrowany " + req.body.username)  
      console.log(tab)
    }
})
var logged = false;
app.post("/login", function(req,res){
    for(let a=0; a<tab.length; a++){
        if(a.username == req.body.username && a.pass == req.body.password){
            logged = true
        }
    }
    if(logged = true){
        res.redirect("/admin")
    }else{
        res.send("Nieprawidłowy login lub hasło")
    }
})

app.get("/admin", function(req,res){
    if(logged == true){res.sendFile(path.join(__dirname + "/page/html/admin.html"))}
    else{res.sendFile(path.join(__dirname + "/page/html/denied.html"))} 

})

app.get("/logout", function(req,res){
    logged = false
    res.redirect("/")
})

app.get("/show", function(req,res){
    tab.sort(function (a, b) {
        return parseFloat(a.id) - parseFloat(b.id);
    });
    
    
    var tablica = "<link rel='stylesheet' href='../css/css.css'><body>" + menuski + "<table>"
    tab.forEach(a =>{
        tablica += "<tr><td>id: " + a.id + "</td>" + "<td>user: " + a.username + " - " + a.pass + "</td>"
        if(a.student == "checked"){ tablica += "<td>uczeń: <input type='checkbox' checked disabled/></td>"
        }else{
            tablica += "<td>uczeń: <input type='checkbox' disabled/></td>"
        }
        tablica += "<td> wiek: " + a.age + "</td>" + "<td> płeć " + a.gender + "</td></tr>"
    })
    tablica += "</table></body>"
    res.send(tablica)


})

app.get("/gender", function(req,res){
    plcie()
    var tablica = "<link rel='stylesheet' href='../css/css.css'><body>" + menuski + "<br><table>"
    m.forEach(a =>{
        tablica += "<tr><td>id: " + a.id + "</td>" + "<td> płeć " + a.gender + "</td></tr>"
    })
    tablica += "</table><br><table>"
    k.forEach(a =>{
        tablica += "<tr><td>id: " + a.id + "</td>" + "<td> płeć " + a.gender + "</td></tr>"
    })
    tablica += "</table></body>"
    res.send(tablica)


})

app.get("/sort", function(req,res){
    tab.sort(function (a, b) {
        return parseFloat(a.age) - parseFloat(b.age);
    });
    var tablica = "<link rel='stylesheet' href='../css/css.css'><body>" + menuski + `<br><br><form method="POST" action="/sort" onchange="this.submit()">        <label>malejąco</label>
    <input type="radio" name="sort" value="mal"/>
    <label>rosnąco</label>
    <input type="radio" name="sort" value="ros" checked/><br><br></form><table>`
    tab.forEach(a =>{
        tablica += "<tr><td>id: " + a.id + "</td>" + "<td>user: " + a.username + " - " + a.pass + "</td>"
        tablica += "<td> wiek: " + a.age + "</td>" + "<td> płeć " + a.gender + "</td></tr>"
    })
    tablica += "</table></body>"
    res.send(tablica)

 
})

app.post("/sort", function(req,res){
    if(req.body.sort == "ros"){
        tab.sort(function (a, b) {
            return parseFloat(a.age) - parseFloat(b.age);
        });
        console.log(tab)
        var tablica = "<link rel='stylesheet' href='../css/css.css'><body>" + menuski + `<br><br><form method="POST" action="/sort" onchange="this.submit()">        <label>malejąco</label>
        <input type="radio" name="sort" value="mal"/>
        <label>rosnąco</label>
        <input type="radio" name="sort" value="ros" checked/><br><br></form><table>`
        tab.forEach(a =>{
            tablica += "<tr><td>id: " + a.id + "</td>" + "<td>user: " + a.username + " - " + a.pass + "</td>"
            tablica += "<td> wiek: " + a.age + "</td>" + "<td> płeć " + a.gender + "</td></tr>"
        })
        tablica += "</table></body>"
        res.send(tablica)
    }
    else if(req.body.sort == "mal"){
        tab.sort(function (a, b) {
            return parseFloat(b.age) - parseFloat(a.age);
        });
        console.log(tab)
                var tablica = "<link rel='stylesheet' href='../css/css.css'><body>" + menuski + `<br><br><form method="POST" action="/sort" onchange="this.submit()">        <label>malejąco</label>
        <input type="radio" name="sort" value="mal" checked/>
        <label>rosnąco</label>
        <input type="radio" name="sort" value="ros"/><br><br></form><table>`
        tab.forEach(a =>{
            tablica += "<tr><td>id: " + a.id + "</td>" + "<td>user: " + a.username + " - " + a.pass + "</td>"
            tablica += "<td> wiek: " + a.age + "</td>" + "<td> płeć " + a.gender + "</td></tr>"
        })
        tablica += "</table></body>"
        res.send(tablica)
    }
    console.log(tab)

})
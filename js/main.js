// variables
let product = document.querySelector("#exampleInputText1")
let count = document.querySelector("#exampleInputNumber1")
let price = document.querySelector("#exampleInputNumber2")
let date = document.querySelector("#exampleInputDate1")
let search1 = document.querySelector("#exampleInputSearch1")
let search2 = document.querySelector("#exampleInputSearch2")
let searchbar = document.createElement("div");
let Allsearchbar = document.querySelector("#Allsearchbar")
let add = document.querySelector("#add")
let save = document.querySelector("#save")
let sort1 = document.querySelector("#sort1")
let sort2 = document.querySelector("#sort2")
let sort3 = document.querySelector("#sort3")
let sort4 = document.querySelector("#sort4")
let tbody = document.querySelector("#tbody")
let mainArr = []
if (localStorage.getItem("myProduct") != null) {
    mainArr = JSON.parse(localStorage.getItem("myProduct"))
}else{
    mainArr = []
}
let mainObj = {}
let thisDay = new Date()
let day = thisDay.getDate()
let month = thisDay.getMonth()+1
let year = thisDay.getFullYear()
if(day < 10){
    day = `0${day}`
}
if(month < 10){
    month = `0${month}`
}
let today = `${year}-${month}-${day}`
date.value = today


// functions
add.addEventListener("click", function(){
    if(product.value != "" && count.value != "" && price.value != "" && date.value != ""){
        if(date.value > today){
            date.value = today
        }
        mainObj = {
            objProduct : product.value,
            objCount : count.value,
            objPrice : price.value,
            objDate : date.value,
        }
        mainArr.push(mainObj)
        console.log(mainArr)
        localStorage.setItem("myProduct", JSON.stringify(mainArr))
        showProduct()
        clear()
        date.value = today
    }
})

function showProduct(){
    let tbodyX = ""
    let total = 0
    let newArr = mainArr.sort((a, b) => a.objDate > b.objDate ? -1 : 1)
    for(let i = 0; i < newArr.length; i++){
            total += parseInt(newArr[i].objPrice)
            tbodyX += 
            `
            <tr id="id${i}">
                <td>${i+1}</td>
                <td>${newArr[i].objProduct}</td>
                <td>${newArr[i].objCount}</td>
                <td>${newArr[i].objPrice}</td>
                <td>${newArr[i].objDate}</td>
                <td><button onclick="update(${i})" id="Update" class="btn yellow">Update</button></td>
                <td><button onclick="delate(${i})" id="Delete" class="btn red">Delete</button></td>
            </tr>
            `
            tbody.innerHTML = `
            ${tbodyX}
            <tr>
            <td class="col">Total amount</td>
            <td class="TotalIncome" colspan="6">${total}</td>
            </tr>
            `
    }
    if (mainArr.length<1){
        tbody.innerHTML = `
        <tr>
            <td class="col">Total amount</td>
            <td class="TotalIncome" colspan="6">${total}</td>
        </tr>
        `
    }
}
showProduct()

function delate(i){
    mainArr.splice(i,1)
    localStorage.setItem("myProduct", JSON.stringify(mainArr))
    showProduct()
}

function update(i){
    product.value = mainArr[i].objProduct
    count.value = mainArr[i].objCount
    price.value = mainArr[i].objPrice
    date.value = mainArr[i].objDate
    add.style.display="none"
    save.style.display="block"
    let scrollS2 = scrollS1
    window.scrollTo(0,0)
    save.addEventListener("click",function(){
        if(product.value != "" && count.value != "" && price.value != "" && date.value != ""){
            if(date.value > today){
                date.value = today
            }
        mainArr[i].objProduct = product.value
        mainArr[i].objCount = count.value
        mainArr[i].objPrice = price.value
        mainArr[i].objDate = date.value
        add.style.display="block"
        save.style.display="none"
        localStorage.setItem("myProduct", JSON.stringify(mainArr))
        showProduct()
        clear()
        date.value = today
        window.scrollTo(0,scrollS2)
        }
        
    })
}

let scrollS1
window.onscroll = function(){
    scrollS1 = window.scrollY
    localStorage.setItem("scrollS",scrollS1)
}

search1.onkeyup = function(){
    x()
}

function validate(input){
    if(/^\s/.test(input.value))
        input.value = '';
}

search1.oninput = function(){
    validate(this)
}

function x(){
    search2.value = ""
    let tbodyX = ""
    let searchX = ""
    let total = 0
    for(let i = 0; i < mainArr.length; i++) {
            if(mainArr[i].objProduct.includes(search1.value)){
                Allsearchbar.style.display = "block"
                searchbar.setAttribute("class", "searchbar");
                searchX += `<p class="p">${mainArr[i].objProduct}</p>`
                Allsearchbar.innerHTML = searchX
                Allsearchbar.appendChild(searchbar);
                let p = document.querySelectorAll('.p')
                for(let k = 0; k < p.length; k++) {
                    p[k].onclick = function(){
                        search1.value = p[k].innerHTML
                        x()
                        Allsearchbar.style.display = "none"
                    }
                }
            }
            if(mainArr[i].objProduct.includes(search1.value)){
            total += parseInt(mainArr[i].objPrice)
            tbodyX += 
            `
            <tr>
                <td>${i+1}</td>
                <td>${mainArr[i].objProduct}</td>
                <td>${mainArr[i].objCount}</td>
                <td>${mainArr[i].objPrice}</td>
                <td>${mainArr[i].objDate}</td>
                <td><button onclick="update(${i})" id="Update" class="btn yellow">Update</button></td>
                <td><button onclick="delate(${i})" id="Delete" class="btn red">Delete</button></td>
            </tr>
            `
            tbody.innerHTML = `
            ${tbodyX}
            <tr>
            <td class="col">Total amount</td>
            <td class="TotalIncome" colspan="6">${total}</td>
            </tr>
            `
            }
            if(search1.value == ""){
                Allsearchbar.style.display = "none"
            }
    }

}

search2.addEventListener("change",function(){
    // console.log(search2.value)
    // rows(search2.value)
    let tbodyX = ""
    let total = 0
    let newArr = mainArr.sort((a, b) => a.objDate > b.objDate ? 1 : -1)
    for(let i = 0; i < newArr.length; i++) {
         if(newArr[i].objDate.includes(search2.value)) {
                total += parseInt(newArr[i].objPrice)
                tbodyX += 
                `
                <tr>
                    <td>${i+1}</td>
                    <td>${newArr[i].objProduct}</td>
                    <td>${newArr[i].objCount}</td>
                    <td>${newArr[i].objPrice}</td>
                    <td>${newArr[i].objDate}</td>
                    <td><button onclick="update(${i})" id="Update" class="btn yellow">Update</button></td>
                    <td><button onclick="delate(${i})" id="Delete" class="btn red">Delete</button></td>
                </tr>
                `
                tbody.innerHTML = `
                ${tbodyX}
                <tr>
                <td class="col">Total amount</td>
                <td class="TotalIncome" colspan="6">${total}</td>
                </tr>
                `
            }
        }
})

function rows(e){
    let tbodyX = ""
    let total = 0
    let newArr = mainArr.sort((a, b) => a.objDate > b.objDate ? 1 : -1)
    for(let i = 0; i < newArr.length; i++) {
            if(newArr[i].objDate.includes(`${e}`)==true){
                total += parseInt(newArr[i].objPrice)
                tbodyX += 
                `
                <tr>
                    <td>${i+1}</td>
                    <td>${newArr[i].objProduct}</td>
                    <td>${newArr[i].objCount}</td>
                    <td>${newArr[i].objPrice}</td>
                    <td>${newArr[i].objDate}</td>
                    <td><button onclick="update(${i})" id="Update" class="btn yellow">Update</button></td>
                    <td><button onclick="delate(${i})" id="Delete" class="btn red">Delete</button></td>
                </tr>
                `
                tbody.innerHTML = `
                ${tbodyX}
                <tr>
                <td class="col">Total amount</td>
                <td class="TotalIncome" colspan="6">${total}</td>
                </tr>
                `
            }
        }
}

sort1.onclick = function(){
    rows(today)
}

sort2.onclick = function(){
    rows(`${year}-${month}`)
}

sort3.onclick = function(){
    let tbodyX = ""
    let total = 0
    let newArr = mainArr.sort((a, b) => a.objDate > b.objDate ? 1 : -1)
    for(let i = 0; i < newArr.length; i++) {
        for(let j = 0; j < 6 ; j++){
            let mu = month - j;
            if (mu < 10){
                mu = `0${mu}`
            }
            if(newArr[i].objDate.includes(`${year}-${mu}`)){
                total += parseInt(newArr[i].objPrice)
                tbodyX += 
                `
                <tr>
                    <td>${i+1}</td>
                    <td>${newArr[i].objProduct}</td>
                    <td>${newArr[i].objCount}</td>
                    <td>${newArr[i].objPrice}</td>
                    <td>${newArr[i].objDate}</td>
                    <td><button onclick="update(${i})" id="Update" class="btn yellow">Update</button></td>
                    <td><button onclick="delate(${i})" id="Delete" class="btn red">Delete</button></td>
                </tr>
                `
                tbody.innerHTML = `
                ${tbodyX}
                <tr>
                <td class="col">Total amount</td>
                <td class="TotalIncome" colspan="6">${total}</td>
                </tr>
                `
            }
        }
    }
}

sort4.onclick = function(){
    rows(year)
}

function clear(){
    product.value = ""
    count.value = ""
    price.value = ""
    date.value = ""
}
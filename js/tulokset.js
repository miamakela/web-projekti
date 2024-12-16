let paakaupungit = Number(sessionStorage.getItem("score"))
let kulttuurit = Number(sessionStorage.getItem("game2"))
let nahtavyydet = Number(sessionStorage.getItem("peli3"))
let liput = Number(sessionStorage.getItem("pisteet"))
let luonto = Number(sessionStorage.getItem("score2"))

let peli1 = document.querySelector(".peli1 p span")
let peli2 = document.querySelector(".peli2 p span")
let peli3 = document.querySelector(".peli3 p span")
let peli4 = document.querySelector(".peli4 p span")
let peli5 = document.querySelector(".peli5 p span")
let total = document.querySelector(".speech-bubble span")

let points = paakaupungit + kulttuurit + nahtavyydet + liput + luonto

total.textContent = points

peli1.textContent = paakaupungit
peli2.textContent = kulttuurit
peli3.textContent = nahtavyydet
peli4.textContent = liput
peli5.textContent = luonto
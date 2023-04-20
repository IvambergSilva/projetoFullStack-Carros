fetch('http://localhost:3000/api/carros')
.then((res) => res.json())
.then((data) => {
    addHead()
    main(data.result)
})

function addHead() {
    let thModelo = document.createElement('th')
    thModelo.setAttribute('class', 'th')
    thModelo.textContent = 'Modelo'

    let thPlaca = document.createElement('th')
    thPlaca.setAttribute('class', 'th')
    thPlaca.textContent = 'Placa'

    let trh = document.createElement('tr')
    trh.appendChild(thModelo)
    trh.appendChild(thPlaca)

    let thead = document.createElement('thead')
    thead.setAttribute('class', 'thead')
    thead.appendChild(trh)

    document.querySelector('.table').appendChild(thead)
}

function addBody(data) {
    let tdModelo = document.createElement('td')
    tdModelo.setAttribute('class', 'td')
    tdModelo.textContent = data.descricao

    let tdPlaca = document.createElement('td')
    tdPlaca.setAttribute('class', 'td')
    tdPlaca.textContent = data.placa

    let trb = document.createElement('tr')
    trb.appendChild(tdModelo)
    trb.appendChild(tdPlaca)

    let tbody = document.createElement('tbody')
    tbody.setAttribute('class', 'tbody')
    tbody.appendChild(trb)    

    document.querySelector('.table').appendChild(tbody)
}

function main(data) {
    for (let i = 0; i < data.length; i++) {
        addBody(data[i])        
    }
    addGraphBar(data)
    addGraphPie(data)
}

const ctxB = document.getElementById('myChartBar');
const ctxP = document.getElementById('myChartPie');

let listLabelP = []
let listLabelB = []
let listdataP = []
let listdataB = []


function addGraphBar(data) {     
    for (let i = 0; i < data.length; i++) {
        listLabelB.push(data[i].descricao)
        listdataB.push(data[i].placa[6])
    }
    new Chart(ctxB, {
    type: 'bar',
    data: {        
        labels: listLabelB,
        datasets: [{
        label: 'Valores',
        data: listdataB,
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: '#C1C1C1'
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
                }
            }
        }
    });
}

function addGraphPie(data) {     
    for (let i = 0; i < data.length; i++) {
        listLabelP.push(data[i].descricao)
    }
    for (let i = 0; i < data.length; i++) {
        listdataP.push(data[i].placa[6])
    }
    new Chart(ctxP, {
    type: 'pie',
    data: {        
        labels: listLabelP,
        datasets: [{
        label: 'Valores',
        data: listdataP,
        backgroundColor: [
            '#000',
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            '#F00'
          ],
          hoverOffset: 4
        }]
    }});
}


var Productos = JSON.parse( localStorage.getItem('Productos') );
let xValues = Productos.map((producto) => producto['Nombre']);
let yValues = Productos.map((producto) => producto['Unidad']);

var ctx = document.getElementById("GraStock").getContext("2d");

var barColors = [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
] ;
var borderColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
];

var Stock = new Chart (ctx, {
    type: 'bar',
    data: {
        labels: xValues,
        datasets: [{
            data: yValues,
            backgroundColor: barColors,
            borderColor: borderColors,
            borderWidth: 1
        }]
    },
    options: {
        plugins:{
            legend: {
                display: false
            }
        }
    }
});
var app = angular.module("datosApp", ["firebase", "highcharts-ng"]);

app.controller("DatosController", function($scope, $firebase) {
  $scope.alcoholSeries = [];
  $scope.proximidadSeries = [];
  $scope.fuegoSeries = [];
  $scope.humedadSeries = [];
  $scope.luzSeries = [];
  $scope.horaSeries = [];
  

  // now we can use $firebase to synchronize data between clients and the server!
  var ref = new Firebase("https://ejemplox.firebaseio.com/").child("datos");

  ref.on('value', function(dataSnapshot) {
      // store dataSnapshot for use in below examples.
      dataSnapshot.forEach(function(childSnapshot) {
          // key will be "fred" the first time and "wilma" the second time
          // var key = childSnapshot.key();
          // childData will be the actual contents of the child
          $scope.alcoholSeries.push(parseInt(childSnapshot.val().alcohol));
          $scope.proximidadSeries.push(parseInt(childSnapshot.val().proximidad));
          $scope.fuegoSeries.push(parseInt(childSnapshot.val().fuego));
          $scope.humedadSeries.push(parseInt(childSnapshot.val().humedad));
          $scope.luzSeries.push(parseInt(childSnapshot.val().luz));
          $scope.horaSeries.push(childSnapshot.val().hora);
       });

      //alcohol
      var a = $scope.alcoholSeries;
      a = a.slice(a.length-20,a.length);
      $scope.chartConfig.series[0].data=a;

      //proximidad
       var p = $scope.proximidadSeries;
       p = p.slice(p.length - 20, p.length);
       //var prox = []
       //p.forEach(function(dato) {
       //    if(!isNaN(dato))
       //     prox.push(dato);
       //   else prox.push(0);
       //});
       $scope.chartConfig.series[1].data = p;
       /*
      //fuego
      var f = $scope.fuegoSeries;
      f = f.slice(f.length-20,f.length);
      $scope.chartConfig.series[2].data=f;
     */
      //humedad 
      var h = $scope.humedadSeries;
      $scope.chartConfig.series[3].data = h.slice(h.length - 20, h.length);
       
      var l = $scope.luzSeries;
      $scope.chartConfig.series[4].data = l.slice(l.length - 20, l.length);

  });
    
  var sync = $firebase(ref);
  $scope.list = sync.$asArray();
  
  $scope.chartSeries = [
    {
        name: "Alcohol",
        id: "series-0",
        data: [],
        type: "line",
        connectNulls: true
    },
    {
        name: "Proximidad",
        id: "series-1",
        data: [],
        type: "line",
        connectNulls: true
    },
    {
        name: "Fuego",
        id: "series-2",
        data: [],
        type: "line",
        connectNulls: true
    },
    {
        name: "Humedad",
        id: "series-3",
        data: [],
        type: "line",
        connectNulls: true
    },
    {
        name: "Luz Ambiental",
        id: "series-4",
        data: [],
        type: "line",
        connectNulls: true
    }
  ];

  $scope.chartConfig = {
    options: {
      chart: {
        type: 'line'
      },
      plotOptions: {
        series: {
          stacking: ''
        }
      }
    },
    series: $scope.chartSeries,
    title: {
      text: 'Datos en tiempo real'
    },
    credits: {
      enabled: false
    },
    loading: false,
    size: {}
  }

  $scope.reflow = function () {
    $scope.$broadcast('highchartsng.reflow');
  };
});
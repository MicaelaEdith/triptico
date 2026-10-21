// Exportación del tríptico.
(function () {
  'use strict';

  var imprimir = document.getElementById('btnImprimir');
  if (imprimir) {
    imprimir.addEventListener('click', function () {
      window.print();
    });
  }
})();

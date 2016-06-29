
$(document).ready(function() {
    $('select').material_select();


  $('.datepicker').pickadate({
    selectMonths: false, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });

  $('.timepicker').timepicker({ 'scrollDefault': 'now' })


  });

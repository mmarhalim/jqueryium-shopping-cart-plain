var sum = function (acc, x) { return acc + x; };

var updateSubtotal = function (ele) {
  var unitP = parseFloat($(ele).find('.price input').val());
  var unitQTY = parseFloat($(ele).find('.quant input').val());

  var subTot = unitP * unitQTY;
  $(ele).children('.subtotal').html(subTot);
  return subTot;
}

var updateTotal = function () {
  var allSubTot = [];

  $('tbody tr.orig').each(function (i, ele) {
    var tempSubTot = updateSubtotal(ele);
    allSubTot.push(tempSubTot);
  });

  if (allSubTot.length === 0 ) {
    $('#total').html('$ ' + 0);
  } else {
    var tot = allSubTot.reduce(sum);
    $('#total').html('$ ' + tot);
  }
}

$(document).ready(function() {
  updateTotal();

  $(document).on('click', '.remove', function (event) {
    $(this).closest('tr').remove();
    updateTotal();
  });

  var timeout;
  $(document).on('input', 'tr input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updateTotal();
    }, 500);
  });

  $('#addItem').on('click', function (event) {
    var item = $('#a').val();
    var price = $('#b').val();
    var quant = $('#c').val();

  $('<tr class="orig">' +
    '<td class="item">' + item + '</td>' +
    '<td class="price"><input type="text" value="' + price + '" /></td>' +
    '<td class="quant"><input type="number" value="' + quant + '" /></td>' +
    '<td class="subtotal"></td>' +
    '<td><button class="remove">Remove</button></td>' +
    '</tr>').insertBefore('tbody tr:last');

  
  updateTotal();
  $('#a').val('');
  $('#b').val('');
  $('#c').val('');
  }); 
  
});
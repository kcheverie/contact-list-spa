$(document).ready(function() {
  var $table = $('#contact-table');
  var data = [];

  function renderTable() {
    var $tableBody = $table.find('tbody');
    $tableBody.html('');

    data.forEach(function(contact) {
      var html = "<tr>" +
              "<td>" + contact.id + "</td>" +
              "<td>" + contact.name + "</td>" +
              "<td>" + "<a href='mailto:" + contact.email + "'>" + contact.email + "</a>" + "</td>" +
              "<td>" + contact.phone + "</td>" +
              "</tr>";
      $('tbody').append(html); 
    });
  }

  $.ajax({
    url: '/contacts',
    method: 'get',
    headers: { accept: 'application/json' }
  }).done(function(res) {
    data = res;
    renderTable();
  });

  $('#submit').on('click', function(e) {
    e.preventDefault();
    var newContact = {
      name: $('#name').val(),
      email: $('#email').val(),
      phone: $('#phone').val()
    };
    $.ajax({
      url: '/contacts',
      method: 'POST',
      headers: { accept: 'application/json' },
      data: { contact: newContact}
    }).done(function(res) {
      data.push(res);
      renderTable();
    });
    $('form').trigger("reset");

  });

  $('#submit-search').on('click', function(e) {
    e.preventDefault();
    var search = $('#search_term').val()
    $.ajax({
      url: '/search',
      method: 'get',
      headers: { accept: 'application/json' },
      data: { "search_term": search }
    }).done(function(res) {
      data = res;
      renderTable();
    });
    $('form').trigger("reset");
  });

  $('#submit-all').on('click', function(e) {
    $.ajax({
      url: '/contacts',
      method: 'get',
      headers: { accept: 'application/json' }
    }).done(function(res) {
      data = res;
      renderTable();
    });

  });

})
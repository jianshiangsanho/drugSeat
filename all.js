function csvToJson(csv) {
  var lines = csv.split('\n');
  var result = [];
  var headers = lines[0].split(',');

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(',');

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  return result;
}

$(document).ready(function() {
  $('#example').DataTable({
    "processing": true,
    "deferRender": true,
    "ajax": {
      "url": "data.csv",
      "dataType": "text",
      "dataSrc": function(csv) {
        var data = csvToJson(csv);
        return data;
      }
    },
    "language": {
      "url": "https://cdn.datatables.net/plug-ins/1.11.3/i18n/zh_Hant.json"
    },
    "columns": [
      { "data": "健保碼"},
      { "data": "位置"},
      { "data": "英文商品名"},
      { "data": "中文商品名"},
      { "data": "成分"},
      { "data": "供應商"},
      { "data": "價格"},
      { "data": "適應症"},
      { "data": "庫存"}
    ],
    "responsive": true
  });
});

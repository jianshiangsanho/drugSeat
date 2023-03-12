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
      { "data": "Code", "defaultContent": ""  },
    { "data": "Position", "defaultContent": ""  },
    { "data": "englishName", "defaultContent": "" },
    { "data": "MandarineName", "defaultContent": ""  },
    { "data": "Contain", "defaultContent": ""  },
    { "data": "Reseller" , "defaultContent": "" },
    { "data": "Price", "defaultContent": ""  },
    { "data": "Condition", "defaultContent": ""  },
    { "data": "Storage", "defaultContent": ""  }
    ],
  });
});


function tsvToJson(tsv) {
  var lines = tsv.split('\n');
  var result = [];
  var headers = lines[0].split('\t');

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split('\t');

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j] || null; // 使用 null 來代表缺失值
    }

    result.push(obj);
  }

  return result;
}

$(document).ready(function() {
  $('#example').DataTable({
    "processing": true,
    "deferRender": true,
    "responsive": true,
    "suppressWarnings": true,
    "ajax": {
      "url": "data.tsv",
      "dataType": "text",
      "dataSrc": function(tsv) {
        var data = tsvToJson(tsv);
        return data;
      }
    },
    "language": {
      "url": "https://cdn.datatables.net/plug-ins/1.11.3/i18n/zh_Hant.json"
    },
    "columns": [
      { "data": "健保碼/國際代碼", "defaultContent": "" },
      { "data": "編號", "defaultContent": "" },
      { "data": "位置", "defaultContent": "" },
      { "data": "層架", "defaultContent": "" },
      { "data": "英文商品名", "defaultContent": "" },
      { "data": "中文商品名", "defaultContent": "" },
      { "data": "成分", "defaultContent": "" },
      { "data": "供應商", "defaultContent": "" },
      { "data": "價格", "defaultContent": "" },
      { "data": "適應症", "defaultContent": "" },
    ],
    "initComplete": function () {
      this.api().columns(2).every(function () {
        var column = this;
        var select = $('<select><option value=""></option></select>')
          .appendTo($(column.header()).empty())
          .on('change', function () {
            var val = $.fn.dataTable.util.escapeRegex(
              $(this).val()
            );

            column.search(val ? '^' + val + '$' : '', true, false).draw();
          });

        column.data().unique().sort().each(function (d, j) {
          select.append('<option value="' + d + '">' + d + '</option>');
        });
      });
    },
  });
});

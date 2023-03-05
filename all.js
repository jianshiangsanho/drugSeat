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

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // 將 CSV 格式的字符串轉換為 JSON 對象
    var json = csvToJson(xhr.responseText);
    
    // 將轉換後的 JSON 對象導入 DataTables
    $(document).ready(function() {
      $('#example').DataTable({
        data: json,
        columns: [
          { "data": "Code" },
          { "data": "Position"},
          { "data": "EnglishName" },
          { "data": "MandarineName" },
          { "data": "Contain"},
          { "data": "Reseller" },
          { "data": "Price" },
          { "data": "Condition"},
          { "data": "Storage" },
        ],
        "language": {
          "url": "https://cdn.datatables.net/plug-ins/1.11.3/i18n/zh_Hant.json"
        },
        "charset": "utf8"
      });
    });
  }
};
xhr.open('GET', 'data.csv');
xhr.send();

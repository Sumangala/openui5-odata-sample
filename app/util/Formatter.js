(function() {
  var dateFormatter;

  jQuery.sap.require("sap.ui.core.format.DateFormat");

  jQuery.sap.declare("util.Formatter");

  dateFormatter = sap.ui.core.format.DateFormat.getDateInstance({
    pattern: "yyyy/MM/dd"
  });

  util.Formatter = {
    formatDate: function(val) {
      if (val) {
        return dateFormatter.format(val);
      } else {
        return "";
      }
    }
  };

}).call(this);

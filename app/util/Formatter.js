(function() {
  jQuery.sap.declare("com.mitsuruog.openui5.odata.util.Formatter");

  com.mitsuruog.openui5.odata.util.Formatter = {
    uppercaseFirstChar: function(str) {
      return str.charAt().toUpperCase() + str.slice(1);
    },
    discontinuedStatusState: function(discontinuedDate) {
      if (discontinuedDate) {
        return "Error";
      } else {
        return "None";
      }
    },
    discontinuedStatusValue: function(discontinuedDate) {
      if (discontinuedDate) {
        return "Discontinued";
      } else {
        return "";
      }
    },
    currencyValue: function(currency) {
      return parseFloat(currency).toFixed(2);
    }
  };

}).call(this);

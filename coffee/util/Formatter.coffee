jQuery.sap.require "sap.ui.core.format.DateFormat"

jQuery.sap.declare "util.Formatter"

dateFormatter = sap.ui.core.format.DateFormat.getDateInstance
  pattern: "yyyy/MM/dd"  

util.Formatter = 
  formatDate: (val) ->
    if val
      dateFormatter.format val
    else
      ""

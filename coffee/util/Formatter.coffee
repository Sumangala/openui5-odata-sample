jQuery.sap.declare "com.mitsuruog.openui5.odata.util.Formatter"

com.mitsuruog.openui5.odata.util.Formatter = 
	
	uppercaseFirstChar: (str) ->
		str.charAt().toUpperCase() + str.slice(1)

	discontinuedStatusState: (discontinuedDate) ->
		if discontinuedDate then "Error" else "None"

	discontinuedStatusValue: (discontinuedDate) ->
		if discontinuedDate then "Discontinued" else ""

	currencyValue: (currency) ->
		parseFloat(currency).toFixed(2)
 
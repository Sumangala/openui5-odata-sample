sap.ui.jsview "com.mitsuruog.openui5.odata.view.NotFound",

  getControllerName: -> "com.mitsuruog.openui5.odata.view.NotFound"

  createContent: (oController) ->
    @page = new sap.m.Page
      title: "{i18n>notFoundTitle}"
      content: [
      	new sap.m.FlexBox
      		alignItems: "Center"
      		justifyContent: "Center"
      		items: [
      			new sap.m.Label
      				textAlign: "Center"
      				text: "{i18n>notFoundText}"
      		]
      ]

    @page
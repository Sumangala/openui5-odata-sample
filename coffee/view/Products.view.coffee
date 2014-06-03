jQuery.sap.require "util.Formatter"

sap.ui.jsview "view.Products",

  getControllerName: -> "view.Products"

  createContent: (oController) ->
    @page = new sap.m.Page
      title: "商品"

    header = new sap.m.Button
      text: "新規登録"
      press: [oController.handlePressCreate, oController]
      type: sap.m.ButtonType.Accept

    search = new sap.m.Bar
      contentMiddle: [
        new sap.m.SearchField
          search: [oController.handleSearch, oController]
      ]

    list = new sap.m.List
      id: @createId "product-list"
      growing: true
      growingThreshold: 5
      growingTriggerText: "もっと見る"
      items: 
        path: "odata>/Products"
        template: new sap.m.ObjectListItem
          title: "{odata>Name}"
          number : "{odata>Price}"
          intro: "{odata>ID}"
          type: "Active"
          press: [oController.onListItemPress, oController]
          attributes: [
            new sap.m.ObjectAttribute
              text: "{odata>Description}"
            new sap.m.ObjectAttribute
              text: 
                path: "odata>Rating"
                formatter: (val) ->
                  "Rating: #{val}" 
          ]
          firstStatus: new sap.m.ObjectStatus
            text: 
              path: "odata>ReleaseDate"
              formatter: util.Formatter.formatDate
            state: "Success"
          secondStatus: new sap.m.ObjectStatus
            text: 
              path: "odata>DiscontinuedDate"
              formatter: util.Formatter.formatDate
            state: "Error"

    @page.addHeaderContent header
    @page.setSubHeader search
    @page.addContent list
    @page 
sap.ui.jsview "view.Products",

  getControllerName: -> "view.Products"

  createContent: (oController) ->
    @page = new sap.m.Page
      title: "商品"

    list = new sap.m.List
      id: @createId "product-list"
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
            text: "{odata>ReleaseDate}"
            state: "Success"
          secondStatus: new sap.m.ObjectStatus
            text: "{odata>DiscontinuedDate}"
            state: "Error"

    @page.addContent list

    @page 
sap.ui.jsview "view.Product",

  getControllerName: -> "view.Product"

  createContent: (oController) ->
    @page = new sap.m.Page
      title: "商品"

    @page
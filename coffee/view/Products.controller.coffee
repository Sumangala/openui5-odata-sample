sap.ui.controller "view.Products",

  onInit: ->
    @router = sap.ui.core.UIComponent.getRouterFor @
    @router.attachRouteMatched @onRouteMatched, @

  onRouteMatched: (evt)->

  onListItemPress: (evt) ->
    selectedItem = evt.getSource().getBindingContext("odata").getObject()
    @router.navTo "Product",
      id: selectedItem.ID
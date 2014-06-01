sap.ui.controller "view.Product",

  onInit: ->
    @router = sap.ui.core.UIComponent.getRouterFor @
    @router.attachRouteMatched @onRouteMatched, @

  onRouteMatched: (evt)->
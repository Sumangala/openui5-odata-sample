sap.ui.controller "com.mitsuruog.openui5.odata.view.NotFound",

  onInit: ->
    @router = sap.ui.core.UIComponent.getRouterFor @
    @router.attachRouteMatched @onRouteMatched, @

  onRouteMatched: (evt, param) ->
    unless evt.getParameter("name") is "notFound"
      return
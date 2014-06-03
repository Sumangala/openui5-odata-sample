sap.ui.controller "view.Product",

  _fragments: {}

  onInit: ->
    @router = sap.ui.core.UIComponent.getRouterFor @
    @router.attachRouteMatched @onRouteMatched, @

  onRouteMatched: (evt, param) ->

    unless evt.getParameter("name") is "Product"
      return

    id = evt.getParameter("arguments").id
    @getView().bindElement "odata>/Products(#{id})"

    fragName = "ProductInfo"
    unless @_fragments[fragName]
      @_fragments[fragName] = sap.ui.jsfragment "util.#{fragName}", @

    fragConteiner = sap.ui.getCore().byId "fragConteiner"
    fragConteiner.removeContent 0
    fragConteiner.insertContent @_fragments[fragName], 0

  backToProducts: (evt) ->
    window.history.go -1

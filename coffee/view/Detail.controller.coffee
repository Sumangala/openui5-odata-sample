jQuery.sap.require "com.mitsuruog.openui5.odata.util.Controller"

com.mitsuruog.openui5.odata.util.Controller.extend "com.mitsuruog.openui5.odata.view.Detail",

  onInit: ->
    @view = @getView()
    @getRouter().attachRouteMatched @onRouteMatched, @

  onRouteMatched: (evt, param) ->
    unless evt.getParameter("name") is "product"
      return

    @parameters = evt.getParameter("arguments")
    product = @parameters.product
    bindingPath = "/#{product}"

    @view.bindElement bindingPath

    #初期表示するタブを選択する
    @_showTab()

  _showTab: ->
    tabs = @view.byId "tabs"
    tabKey = @parameters.tab or "supplier"
    if tabs.getSelectedKey() isnt tabKey
      tabs.setSelectedKey tabKey
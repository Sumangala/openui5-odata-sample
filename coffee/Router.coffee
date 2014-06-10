jQuery.sap.require "sap.m.routing.RouteMatchedHandler"
jQuery.sap.require "sap.ui.core.routing.Router"

jQuery.sap.declare "com.mitsuruog.openui5.odata.Router"

com.mitsuruog.openui5.odata.Router = 

  ###
   * to extend the router with a nav to method that
   * does not write hashes but load the views properly
  ###
  navToWithoutHash: (currentView, viewName, viewType = "JS", isMasterPage = false, data) ->
    app = @_findAppConteiner(currentView)
    view = @getView viewName, viewType
    app.addPage view, isMasterPage
    app.toDetail view.getId(), "show", data

  ###
   * navigates back if there was a previos navigation,
   * if not, navigation back to home/welcome screen
  ###
  navBack: (route, data) ->
    history = sap.ui.core.routing.History.getInstance()
    previosHash = history.getPreviousHash()
    if previosHash is undefined
      window.history.go -1
    else
      @navTo route, data, true

  backWithoutHash: (currentView, isMaster) ->
    backMethod = if isMaster then "backMaster" else "backDetail"
    app = @_findAppConteiner(currentView)
    app[cackMethod]()

  _findAppConteiner: (control) ->
    conteinerName = "appConteiner"
    appConteiner = sap.ui.getCore().byId conteinerName
    if appConteiner and appConteiner.getMetadata()._sClassName is "sap.m.SplitApp"
      appConteiner
    else
      null
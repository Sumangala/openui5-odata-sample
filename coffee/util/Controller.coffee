jQuery.sap.declare "com.mitsuruog.openui5.odata.util.Controller"

sap.ui.core.mvc.Controller.extend "com.mitsuruog.openui5.odata.util.Controller",
  
  getEventBus: ->
    componentId = sap.ui.core.Component.getOwnerIdFor @getView()
    sap.ui.component(componentId).getEventBus()

  getRouter: ->
    sap.ui.core.UIComponent.getRouterFor @

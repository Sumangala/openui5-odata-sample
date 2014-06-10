(function() {
  jQuery.sap.declare("com.mitsuruog.openui5.odata.util.Controller");

  sap.ui.core.mvc.Controller.extend("com.mitsuruog.openui5.odata.util.Controller", {
    getEventBus: function() {
      var componentId;
      componentId = sap.ui.core.Component.getOwnerIdFor(this.getView());
      return sap.ui.component(componentId).getEventBus();
    },
    getRouter: function() {
      return sap.ui.core.UIComponent.getRouterFor(this);
    }
  });

}).call(this);

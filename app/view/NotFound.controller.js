(function() {
  sap.ui.controller("com.mitsuruog.openui5.odata.view.NotFound", {
    onInit: function() {
      this.router = sap.ui.core.UIComponent.getRouterFor(this);
      return this.router.attachRouteMatched(this.onRouteMatched, this);
    },
    onRouteMatched: function(evt, param) {
      if (evt.getParameter("name") !== "notFound") {

      }
    }
  });

}).call(this);

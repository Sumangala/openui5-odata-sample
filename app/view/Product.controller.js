(function() {
  sap.ui.controller("view.Product", {
    onInit: function() {
      this.router = sap.ui.core.UIComponent.getRouterFor(this);
      return this.router.attachRouteMatched(this.onRouteMatched, this);
    },
    onRouteMatched: function(evt) {}
  });

}).call(this);

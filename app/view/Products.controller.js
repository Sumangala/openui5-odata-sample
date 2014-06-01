(function() {
  sap.ui.controller("view.Products", {
    onInit: function() {
      this.router = sap.ui.core.UIComponent.getRouterFor(this);
      return this.router.attachRouteMatched(this.onRouteMatched, this);
    },
    onRouteMatched: function(evt) {},
    onListItemPress: function(evt) {
      var selectedItem;
      selectedItem = evt.getSource().getBindingContext("odata").getObject();
      return this.router.navTo("Product", {
        id: selectedItem.ID
      });
    }
  });

}).call(this);

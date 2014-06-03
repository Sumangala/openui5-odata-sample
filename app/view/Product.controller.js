(function() {
  sap.ui.controller("view.Product", {
    _fragments: {},
    onInit: function() {
      this.router = sap.ui.core.UIComponent.getRouterFor(this);
      return this.router.attachRouteMatched(this.onRouteMatched, this);
    },
    onRouteMatched: function(evt, param) {
      var fragConteiner, fragName, id;
      if (evt.getParameter("name") !== "Product") {
        return;
      }
      id = evt.getParameter("arguments").id;
      this.getView().bindElement("odata>/Products(" + id + ")");
      fragName = "ProductInfo";
      if (!this._fragments[fragName]) {
        this._fragments[fragName] = sap.ui.jsfragment("util." + fragName, this);
      }
      fragConteiner = sap.ui.getCore().byId("fragConteiner");
      fragConteiner.removeContent(0);
      return fragConteiner.insertContent(this._fragments[fragName], 0);
    },
    backToProducts: function(evt) {
      return window.history.go(-1);
    }
  });

}).call(this);

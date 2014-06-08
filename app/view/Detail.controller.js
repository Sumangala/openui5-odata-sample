(function() {
  jQuery.sap.require("com.mitsuruog.openui5.odata.util.Controller");

  com.mitsuruog.openui5.odata.util.Controller.extend("com.mitsuruog.openui5.odata.view.Detail", {
    onInit: function() {
      this.view = this.getView();
      return this.getRouter().attachRouteMatched(this.onRouteMatched, this);
    },
    onRouteMatched: function(evt, param) {
      var bindingPath, product;
      if (evt.getParameter("name") !== "product") {
        return;
      }
      this.parameters = evt.getParameter("arguments");
      product = this.parameters.product;
      bindingPath = "/" + product;
      this.view.bindElement(bindingPath);
      return this._showTab();
    },
    _showTab: function() {
      var tabKey, tabs;
      tabs = this.view.byId("tabs");
      tabKey = this.parameters.tab || "supplier";
      if (tabs.getSelectedKey() !== tabKey) {
        return tabs.setSelectedKey(tabKey);
      }
    }
  });

}).call(this);

(function() {
  jQuery.sap.require("com.mitsuruog.openui5.odata.util.Controller");

  jQuery.sap.require("com.mitsuruog.openui5.odata.util.Formatter");

  com.mitsuruog.openui5.odata.util.Controller.extend("com.mitsuruog.openui5.odata.view.Detail", {
    onInit: function() {
      this.view = this.getView();
      this.tabs = this.view.byId("tabs");
      return this.getRouter().attachRouteMatched(this.onRouteMatched, this);
    },
    onRouteMatched: function(evt, param) {
      this.routeName = evt.getParameter("name");
      this.routeParameters = evt.getParameter("arguments");
      return this._initalLoaded();
    },
    onTabSelect: function(evt) {
      var product, tab;
      product = evt.getSource().getBindingContext().getPath().slice(1);
      tab = evt.getParameter("selectedKey");
      return this.getRouter().navTo("product", {
        product: product,
        tab: tab
      }, true);
    },
    onNavBack: function(evt) {
      return this.getRouter().navBack("master");
    },
    _initalLoaded: function() {
      var bindingPath, product;
      if (this.routeName !== "product") {
        return;
      }
      product = this.routeParameters.product;
      bindingPath = "/" + product;
      this.view.bindElement(bindingPath);
      this._checkReceivedProductData(bindingPath);
      this._bindDisplayData();
      return this._showTab();
    },
    _onMasterLoaded: function() {
      return this.view.setBusy(false);
    },
    _checkReceivedProductData: function(bindingPath) {
      return this.view.getElementBinding().attachEventOnce("dataReceived", jQuery.proxy(this._handleDataReceived(bindingPath), this));
    },
    _handleDataReceived: function(bindingPath) {
      var odata;
      odata = this.view.getModel().getData(bindingPath);
      if (!odata) {
        return this.getRouter().navToWithoutHash(this.view, "com.mitsuruog.openui5.odata.view.NotFound");
      }
    },
    _bindDisplayData: function() {
      return this.tabs.getItems().forEach(function(item) {
        var element;
        element = com.mitsuruog.openui5.odata.util.Formatter.uppercaseFirstChar(item.getKey());
        return item.bindElement(element);
      });
    },
    _showTab: function() {
      var tabKey;
      tabKey = this.routeParameters.tab || "supplier";
      if (this.tabs.getSelectedKey() !== tabKey) {
        return this.tabs.setSelectedKey(tabKey);
      }
    }
  });

}).call(this);

(function() {
  jQuery.sap.require("com.mitsuruog.openui5.odata.util.Controller");

  com.mitsuruog.openui5.odata.util.Controller.extend("com.mitsuruog.openui5.odata.view.Master", {
    onInit: function() {
      if (sap.ui.Device.system.phone) {
        return;
      }
      this.list = this.getView().byId("list");
      this.getRouter().attachRouteMatched(this.onRouteMatched, this);
      this.updateFinishedDeferred = jQuery.Deferred();
      return this.list.attachEventOnce("updateFinished", function() {
        return this.updateFinishedDeferred.resolve();
      }, this);
    },
    onRouteMatched: function(evt, param) {
      this.routeName = evt.getParameter("name");
      this.routeParameters = evt.getParameter("arguments");
      jQuery.when(this.updateFinishedDeferred).then(jQuery.proxy(this._listLoaded, this));
      return this.getRouter().navToWithoutHash(this.getView(), "com.mitsuruog.openui5.odata.view.Detail");
    },
    onSearch: function(evt) {
      var binding, filters, list, query;
      filters = [];
      query = this.getView().byId("query").getValue();
      list = this.getView().byId("list");
      if (query && query.length > 0) {
        filters = [new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, query)];
      }
      binding = list.getBinding("items");
      return binding.filter(filters);
    },
    onItemSelect: function(evt) {
      var selectItem;
      selectItem = evt.getParameter("listItem") || evt.getSource();
      return this.showDetail(selectItem);
    },
    onAddProduct: function(evt) {
      return this.getRouter().navToWithoutHash(this.view, "com.mitsuruog.openui5.odata.view.AddProduct");
    },
    showDetail: function(selectItem) {
      var isHistoryReplace, product;
      isHistoryReplace = jQuery.device.is.phone ? false : true;
      product = selectItem.getBindingContext().getPath().substr(1);
      return this.getRouter().navTo("product", {
        from: "master",
        product: product,
        tab: "supplier"
      }, isHistoryReplace);
    },
    _listLoaded: function() {
      var i, item, items, product, _i, _len, _results;
      switch (this.routeName) {
        case "master":
          return this._selectDetail();
        case "product":
          product = this.routeParameters.product;
          items = this.list.getItems();
          _results = [];
          for (i = _i = 0, _len = items.length; _i < _len; i = ++_i) {
            item = items[i];
            if (item.getBindingContext().getPath() === ("/" + product)) {
              this.list.setSelectedItem(item, true);
              break;
            } else {
              _results.push(void 0);
            }
          }
          return _results;
      }
    },
    _selectDetail: function() {
      var items;
      if (sap.ui.Device.system.phone) {
        return;
      }
      items = this.list.getItems();
      if (items.length && !this.list.getSelectedItem()) {
        this.list.setSelectedItem(items[0], true);
        return this.showDetail(items[0]);
      }
    }
  });

}).call(this);

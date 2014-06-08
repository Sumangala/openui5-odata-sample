(function() {
  jQuery.sap.require("com.mitsuruog.openui5.odata.util.Controller");

  com.mitsuruog.openui5.odata.util.Controller.extend("com.mitsuruog.openui5.odata.view.Master", {
    onInit: function() {
      if (sap.ui.Device.system.phone) {
        return;
      }
      return this.getRouter().attachRouteMatched(this.onRouteMatched, this);
    },
    onRouteMatched: function(evt, param) {
      if (evt.getParameter("name") !== "Master") {
        return;
      }
      return this.getRouter().myNavToWithoutHash(this.getView(), "com.mitsuruog.openui5.odata.view.Detail");
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
    showDetail: function(selectItem) {
      var isHistoryReplace, product;
      isHistoryReplace = jQuery.device.is.phone ? false : true;
      product = selectItem.getBindingContext().getPath().substr(1);
      return this.getRouter().navTo("product", {
        from: "master",
        product: product,
        tab: "supplier"
      }, isHistoryReplace);
    }
  });

}).call(this);

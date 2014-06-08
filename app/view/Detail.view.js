(function() {
  jQuery.sap.require("com.mitsuruog.openui5.odata.util.Formatter");

  sap.ui.jsview("com.mitsuruog.openui5.odata.view.Detail", {
    getControllerName: function() {
      return "com.mitsuruog.openui5.odata.view.Detail";
    },
    createContent: function(oController) {
      var header, tabs;
      this.page = new sap.m.Page({
        title: "{i18n>detailTitle}",
        showNavButton: "{device>/isPhone}",
        navButtonPress: [oController.onNavBack, oController]
      });
      header = new sap.m.ObjectHeader({
        title: "{Name}",
        number: {
          path: "Price",
          formatter: com.mitsuruog.openui5.odata.util.Formatter.currencyValue
        },
        numberUnit: "{i18n>masterPriceUnit}",
        attributes: [
          new sap.m.ObjectAttribute({
            text: "{ReleaseDate}"
          }), new sap.m.ObjectAttribute({
            text: "{Description}"
          })
        ],
        firstStatus: new sap.m.ObjectStatus({
          text: {
            path: "DiscontinuedDate",
            formatter: com.mitsuruog.openui5.odata.util.Formatter.discontinuedStatusValue
          },
          state: {
            path: "DiscontinuedDate",
            formatter: com.mitsuruog.openui5.odata.util.Formatter.discontinuedStatusState
          }
        })
      });
      tabs = new sap.m.IconTabBar({
        id: this.createId("tabs"),
        select: [oController.onTabSelect, oController],
        items: [
          new sap.m.IconTabFilter({
            key: "supplier",
            text: "{i18n>iconTabFilterSupplier}",
            icon: "sap-icon://supplier",
            content: [sap.ui.jsfragment("com.mitsuruog.openui5.odata.view.SupplierAddressForm")]
          }), new sap.m.IconTabFilter({
            key: "category",
            text: "{i18n>iconTabFilterCategory}",
            icon: "sap-icon://hint",
            content: [sap.ui.jsfragment("com.mitsuruog.openui5.odata.view.CategoryInfoForm")]
          })
        ]
      });
      this.page.addContent(header);
      this.page.addContent(tabs);
      return this.page;
    }
  });

}).call(this);

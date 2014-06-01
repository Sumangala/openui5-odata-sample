(function() {
  sap.ui.jsview("view.Products", {
    getControllerName: function() {
      return "view.Products";
    },
    createContent: function(oController) {
      var list;
      this.page = new sap.m.Page({
        title: "商品"
      });
      list = new sap.m.List({
        id: this.createId("product-list"),
        items: {
          path: "odata>/Products",
          template: new sap.m.ObjectListItem({
            title: "{odata>Name}",
            number: "{odata>Price}",
            intro: "{odata>ID}",
            type: "Active",
            press: [oController.onListItemPress, oController],
            attributes: [
              new sap.m.ObjectAttribute({
                text: "{odata>Description}"
              }), new sap.m.ObjectAttribute({
                text: {
                  path: "odata>Rating",
                  formatter: function(val) {
                    return "Rating: " + val;
                  }
                }
              })
            ],
            firstStatus: new sap.m.ObjectStatus({
              text: "{odata>ReleaseDate}",
              state: "Success"
            }),
            secondStatus: new sap.m.ObjectStatus({
              text: "{odata>DiscontinuedDate}",
              state: "Error"
            })
          })
        }
      });
      this.page.addContent(list);
      return this.page;
    }
  });

}).call(this);

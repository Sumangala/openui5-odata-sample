(function() {
  sap.ui.jsview("com.mitsuruog.openui5.odata.view.App", {
    getControllerName: function() {
      return "com.mitsuruog.openui5.odata.view.App";
    },
    createContent: function(oController) {
      this.setDisplayBlock(true);
      return new sap.m.SplitApp("appConteiner", {
        afterDetailNavigate: function() {
          return this.hideMaster();
        },
        homeIcon: {
          "phone": "img/icon_057.png",
          "phone@2": "img/icon_114.png",
          "tablet": "img/icon_072.png",
          "tablet@2": "img/icon_144.png",
          "favicon": "favicon.ico",
          "precomposed": false
        }
      });
    }
  });

}).call(this);

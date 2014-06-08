jQuery.sap.require "com.mitsuruog.openui5.odata.util.Formatter"

sap.ui.jsview "com.mitsuruog.openui5.odata.view.Master",

  getControllerName: -> "com.mitsuruog.openui5.odata.view.Master"

  createContent: (oController) ->

    @page = new sap.m.Page
      title: "{i18n>masterTitle}"

    subHeader = new sap.m.Bar
      contentMiddle: [
        new sap.m.SearchField
          id: @createId("query")
          width: "100%"
          showRefreshButton: "{device>/isNoTouch}"
          tooltip: "{i18n>masterSearchTooltip}"
          search: [oController.onSearch, oController]
      ]

    rowTemplate = new sap.m.ObjectListItem
      type: "{device>/listItemType}"
      press: [oController.onItemSelect, oController]
      title: "{Name}"
      number:
        path: "Price"
        formatter: com.mitsuruog.openui5.odata.util.Formatter.currencyValue
      numberUnit: "{i18n>masterPriceUnit}" 

    list = new sap.m.List
      id: @createId("list")
      mode: "{device>/listMode}"
      noDataText: "{i18n>masterListNoDataText}"
      select: [oController.onItemSelect, oController]
      growing: true
      growingScrollToLoad: true
      items: 
        path: "/Products"
        template: rowTemplate

    footer = new sap.m.Bar
      contentRight: [
        new sap.m.Button
          icon: "sap-icon://add"
          tooltip: "{i18n>masterFooterAddButtonTooltip}"
          press: [oController.onAddProduct]
      ] 

    @page.setSubHeader subHeader
    @page.addContent list
    @page.setFooter footer
    @page
jQuery.sap.require "util.Formatter"

sap.ui.jsfragment "util.ProductInfo", 

  createContent: (oController) ->

    jQuery.sap.require "sap.ui.layout.form.SimpleForm"
    
    form = new sap.ui.layout.form.SimpleForm
      minWidth: 1024
      maxContainerCols: 2
      editable: false
      layout: "ResponsiveGridLayout"
      title: 
        path: "odata>ID"
        formatter: (oVal) ->
          "商品ID: #{oVal}"
      labelSpanL: 4
      labelSpanM: 4
      emptySpanL: 1
      emptySpanM: 1
      columnsL: 1
      columnsM: 1
      content: [
        new sap.m.Label
          text: "商品名"
        new sap.m.Text
          text: "{odata>Name}"
        new sap.m.Label
          text: "説明"
        new sap.m.Text
          text: "{odata>Description}"
        new sap.m.Label
          text: "価格"
        new sap.m.ObjectNumber
          number: "{odata>Price}"
          unit: "円"
        new sap.m.Label
          text: "レート"
        new sap.m.Text
          text: "{odata>Rating}"
        new sap.m.Label
          text: "発売日"
        new sap.m.ObjectStatus
          text: 
            path: "odata>ReleaseDate"
            formatter: util.Formatter.formatDate
          state: "Success"
        new sap.m.Label
          text: "割引開始日"
        new sap.m.ObjectStatus
          text: 
            path: "odata>DiscontinuedDate"
            formatter: util.Formatter.formatDate
          state: "Error"
      ]

    grid = new sap.ui.layout.Grid
      defaultSpan: "L12 M12 S12"
      width: "auto"
      content: [form]
sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("odatacrud.controller.View1", {
            onInit: function () {
                this.onReadAll();
            },
            onReadAll: function () {
                const that = this;
                const oModel = this.getOwnerComponent().getModel();
                oModel.read("/Products", {
                    success: function (odata) {
                        console.log(odata);
                        const jModel = new sap.ui.model.json.JSONModel(odata);
                        that.getView().byId("idProducts").setModel(jModel);

                    }, error: function (onError) {
                        console.log(onError)
                    }
                });
            }
        });
    });

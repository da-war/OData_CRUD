sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("odatacrud.controller.View1", {
            onInit: function () {
                // this.oReadAll();
            },
            oReadAll: function () {
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
            },
            oReadFilters: function () {
                const that = this;
                const oModel = this.getOwnerComponent().getModel();
                const oFilter = new sap.ui.model.Filter("Rating", "EQ", "4");
                oModel.read("/Products", {
                    filters: [oFilter],
                    success: function (odata) {
                        console.log(odata);
                        const jModel = new sap.ui.model.json.JSONModel(odata);
                        that.getView().byId("idProducts").setModel(jModel);
                    },
                    error: function (error) {
                        console.log(error)
                    }
                })

            },
            oReadSorter: function () {
                const that = this;
                const oModel = this.getOwnerComponent().getModel();
                const oSorter = new sap.ui.model.Sorter("Name", false);
                oModel.read("/Products", {
                    sorters: [oSorter],
                    success: function (odata) {
                        console.log(odata);
                        const jModel = new sap.ui.model.json.JSONModel(odata);
                        that.getView().byId("idProducts").setModel(jModel);
                    },
                    error: function (error) {
                        console.log(error)
                    }
                })
            },
            oReadParameters: function () {
                const that = this;
                const oModel = this.getOwnerComponent().getModel();
                oModel.read("/Products", {
                    urlParameters: { $skip: 0, $top: 4 },
                    success: function (odata) {
                        console.log(odata);
                        const jModel = new sap.ui.model.json.JSONModel(odata);
                        that.getView().byId("idProducts").setModel(jModel);
                    },
                    error: function (error) {
                        console.log(error)
                    }
                })
            },
            oReadKey: function () {
                const that = this;
                const oModel = this.getOwnerComponent().getModel();
                oModel.read("/Products(3)", {
                    success: function (odata) {
                        console.log(odata);
                        const jModel = new sap.ui.model.json.JSONModel({ results: [odata] });
                        that.getView().byId("idProducts").setModel(jModel);
                    },
                    error: function (error) {
                        console.log(error)
                    }
                })
            },
            oEdit: function (oEvent) {
                const that = this;
                const oModel = this.getOwnerComponent().getModel();
                oModel.setUseBatch(false);
                if (oEvent.getSource().getText() === "Edit") {
                    oEvent.getSource().setText("Submit");
                    oEvent.getSource().getParent().getParent().getCells()[3].setEditable(true);
                }
                else {

                    oEvent.getSource().setText("Edit")
                    oEvent.getSource().getParent().getParent().getCells()[3].setEditable(false);

                    const oInput = oEvent.getSource().getParent().getParent().getCells()[3].getValue();
                    const oId = oEvent.getSource().getBindingContext().getProperty("ID");

                    oModel.update("/Products(" + oId + ")", { Rating: oInput }, {
                        success: function (odata) {
                            console.log(odata);
                            that.oReadAll();
                        },
                        error: function (error) {
                            console.log(error)
                        }
                    })
                }

            },
            oDuplicate: function (oEvent) {
                const that = this;
                const oModel = this.getOwnerComponent().getModel();
                oModel.setUseBatch(false);

                const oDuplicateData = oEvent.getSource().getBindingContext().getObject();
                oDuplicateData.ID = 100 + oDuplicateData.ID;
                oModel.create("/Products", oDuplicateData, {
                    success: function (odata) {
                        console.log(odata);
                        that.oReadAll();
                    },
                    error: function (error) {
                        console.log(error)
                    }
                })

            },
            oDelete: function (oEvent) {
                const that = this;
                const oModel = this.getOwnerComponent().getModel();
                oModel.setUseBatch(false);

                const oId = oEvent.getSource().getBindingContext().getProperty("ID");
                oModel.remove("/Products(" + oId + ")", {
                    success: function (odata) {
                        console.log(odata);
                        that.oReadAll();
                    },
                    error: function (error) {
                        console.log(error)
                    }
                })

            }
        });
    });

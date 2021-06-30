define([
    'jquery',
    'ko',
    'uiComponent'
], function ($, ko, Component) {
    'use strict';

    return Component.extend({
        defaults: {
            // define default observable values
            template: 'DnD_QuantityUpdater/qty-field',
            labelForAndInputIdAttributes: "qty",
            inputName: "qty",
            dataCartItemId: ""
        },

        initialize: function() {
            // current component inherits its parent
            this._super();

            // declare observables
            this.qty = ko.observable(this.defaultQty);
            this.uniqueId = ko.observable(this.labelForAndInputIdAttributes);
            this.name = ko.observable(this.inputName);
            this.dataId = ko.observable(this.dataCartItemId);

            this.checkDefaultQty();
        },

        // decrease button functionality
        decreaseQty: function() {
            let newQty = this.qty() - 1;
            if (newQty < 1) {
                newQty = 1;
                this.checkDefaultQty();
            }
            else {
                this.reloadCart();
            }
            this.qty(newQty);
        },

        // increase button functionality
        increaseQty: function() {
            let newQty = this.qty() + 1;
            this.qty(newQty);
            this.checkDefaultQty();
            this.reloadCart();
        },

        // check if product quantity is 1 or higher, hide decrease button if useless
        checkDefaultQty: function() {
            return this.qty() === 1;
        },

        // update cart prices according to new quantity
        reloadCart: function() {
            const cartUpdateButton = document.querySelectorAll(".cart.main.actions .action.update");
            if (cartUpdateButton) {
                cartUpdateButton.forEach(function (element) {
                    element.click();
                });
            }
        }
    });
});

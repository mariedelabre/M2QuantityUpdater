Quantity updater module
======================

Development environment:
 * Magento 2.4.2 with sample data
 * Docker Desktop running on MacOS BigSur
 * PhpStorm

## Functional insight

`DnD_QuantityUpdater` is meant to provide a reusable component that replaces M2 standard quantity field frontend view on product and cart pages.

This module provides +/- buttons around quantity field to increment/decrement it.

Quantity value should never be less than 1. That's why decrement button isn't showing if quantity equals 1.

On cart page, quantity changes must trigger prices update.

This component was supposed to allow users to edit quantity field without clicking on +/- buttons. For technical reasons (detailed below), quantity field can't be edited that way. In a B2B shop context, such a functionality would be an issue since buyers might buy in large quantities. In a B2C shop context, it might be fine.

Lastly, this module takes digital accessibility into account.


## Technical insight

`DnD_QuantityUpdater` module provides a UI component built with knockoutJS library.
 * view location: `DnD/QuantityUpdater/view/frontend/web/template/qty-field.html`
 * viewmodel location: `DnD/QuantityUpdater/view/frontend/web/js/qty-updater.js` 
 
 
 This component view contains 4 elements:
 * a label
 * a decrement button
 * an input
 * an increment button
 
 
 This component is called on product and cart pages through the phtml templates below:
   * Product page: `DnD/QuantityUpdater/view/frontend/templates/catalog/product/view/addtocart.phtml`
  * Cart page: `DnD/QuantityUpdater/view/frontend/templates/cart/item/default.phtml`


 Those views override Magento2 standard as defined in layout:
 * Product page: `DnD/QuantityUpdater/view/frontend/layout/catalog_product_view.xml`
 * Cart page: `DnD/QuantityUpdater/view/frontend/layout/checkout_cart_item_renderers.xml` 
 

  As I said in above section, users were supposed to be able to edit quantity field without using +/- buttons. I tried different approaches to achieve this:
  * adding an `event` binding on input element using `change` or `keyup` (among others) events to trigger reloadCart function to update prices. Result: first ko update on `qty` observable with `defaultValue` (initialisation) is detected as a value change, thus it creates an infinite page reload loop.
  * using ko `subscribe` function in viewmodel to get notified of changes to `qty` observable. Result: for unknown reasons, updates on observables were detected using +/- buttons but not editing quantity field with mouse/keyboard interactions.
  * using jQuery. I noticed Magento2 standard proposed this solution, for instance on password strength indicator. I gave it a try, even if it seems to me a pretty dirty way to do so. But it was inconclusive anyway.
  
To get around the issue described above and deliver a bug-free functionality, I decided to add a `readonly` html attribute on quantity input. 
 
 
 Lastly, the look and feel of this view has been designed in `mystore/default` frontend theme. This theme inherits from Luma and only manages CSS.

 

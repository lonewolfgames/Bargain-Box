## README

BargainBox is a webapp that lets you make quick comparisons and get the best deal from items in your shopping box.

#### System dependencies
* ruby 2.0
* rails 4.0

#### Overview

A user can create an account and login at bargainbox. Afterwards, he gets a unique bookmarklet that lets him use the app while browsing
for products online. Whenever he finds a product he likes he can click on the bookmarklet link which loads a popup menu, and inside here he can click save to add the product on the page to his current shopping bag. When he is finished browsing he can click on the compare button inside the bookmarklet popup which takes him to the webapp.

Inside the webapp, the user sees a single page view of all the products he has saved for his current shopping session - in a simple list which is by default sorted by "Deal Factor". Here he can filter his different possible purchase choices based on 5 factors Price, Deal Factor (which is the combination of all the others), User Rating, Shipping Rating, and Seller Rating. If he wants to see more details about a particular product, he can click on the product to see more detailed information. He can also click "Pack it" to make his choice (which takes him to the buy now page for the product, for instance amazon.com)


Each Product has the following attributes (this is a complete list):
* price
* base_price
* shipping_price
* product_title
* tax_price
* image
* url
* user_rating
* user_comments      (this is a list of all comments)
* comments_rating    (the average value of all user comments)
* seller_rating      (the product sellers rating based off of multiple attributes - from the sellers db table)
* shipping_rating    (the overall shipping rating based off of multiple attributes from the shippings database table)

#### Authors
John Faucett
Nathan Faucett

# ItemCatalog
A MERN Stack application where users can add information -- name, price, and a short description -- about items they find on eBay, Amazon, etc. Other users can see the items' price, description and popularity amongst users of the app to hopefully aid in making informed decisions about which items to buy. Users can post items and like items that they have not posted. Users can only like an item once, however (i.e. a user cannot like an item 2+ times). The most popular items with the lowest price are the first items users will see upon logging in. Users are also granted a profile showing recent activity on the app such as most popular items, recently liked and posted items, and total number of liked and posted items.


My MERN Stack is currently [hosted on Docker Hub](https://hub.docker.com/repository/docker/donoftime2018/item-catalog/general), and I have setup a CI/CD pipeline to update the client and server images on every merged request to the main branch.

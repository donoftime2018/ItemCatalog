# ItemCatalog
### RoadMap:
- [x] Core CRUD functionality with MongoDB and Express
- [x] User authentication
- [x] Nodemailer for sending emails on account creation, deletion, etc. 
- [x] Using JSON Web Tokens (JSWTs) for secure password reset 
- [x] Item ranking by popularity and affordability
- [🚧] Integrate Redux for improved state management
- [🚧] Enable image uploads using Multer
- [🚧] Add Cheerio-based web crawling for real-time data updates
- [ ] Mobile-first UI improvements
- [ ] Flagging inappropriate items
- [ ] Dark mode support
- [ ] Hosting on Railway

Put a Price On It! is a modern MERN stack web application designed to help users make smarter purchasing decisions. Users can share information about items they find on platforms like eBay, Amazon, and more by adding an item’s name, price, and a brief description. The community can view these items, like their favorites, and assess their popularity. Key features include:

- Community-Driven Insights: Users can post items and like others' posts (but can only like each item once).
- Optimized Discoverability: Items are ranked and displayed based on popularity and affordability, ensuring the best value deals are highlighted first when users log in.
- Personalized Profiles: Each user has a profile showcasing their activity, including recently liked and posted items, the most popular items, and a summary of their total contributions (likes and posts).

This intuitive platform empowers users to make informed buying decisions by combining price visibility with community feedback.


This MERN stack application is containerized and was initially available as [Docker images on Docker Hub](https://hub.docker.com/repository/docker/donoftime2018/item-catalog/general). However, with the full transition to Render.com for hosting, the Docker-based deployment is now defunct.

Continuous Integration/Continuous Deployment (CI/CD):
A robust CI/CD pipeline automates updates to the client and server images. Each merged pull request to the main branch triggers the pipeline, which rebuilds and pushes updated Docker images to Docker Hub, ensuring that the latest code changes remain available for reference.

Hosting on Render.com:
The live application is now [hosted on Render.com](https://item-catalog-client.onrender.com/) using the renderDeploymentSetup branch. Render.com handles all hosting and scaling requirements, ensuring a seamless and reliable user experience. This branch is specifically configured for the deployment workflow, replacing the previous Docker deployment.

Feel free to explore the Docker images or view the live application hosted on Render.com!

🚧 Work in Progress:
Several new features and enhancements are currently being developed to improve functionality, performance, and user experience:

1. Redux Integration for Smarter State Management:
Refactoring the app to use Redux for global state management, reducing unnecessary network requests by only syncing with the backend during actual CRUD operations.

1. Image Uploads via Multer:
Enabling users to upload images of listed items for better visual context and assessment, using Multer for handling image uploads on the backend.

1. Real-Time Price and Stock Monitoring with Cheerio:
Implementing web scraping functionality with Cheerio to detect live updates such as price changes or stock availability by crawling item links from external platforms.

These features are actively being developed on feature branches and will be merged into the main codebase as they are completed and tested.

> 📌 Used as a Foundation for HCI/UIUX Coursework:
>
> This deployed application was selected as the base project for a Human-Computer Interaction and UI/UX design class. As part of a team project, we conducted usability testing on the live site and developed low- and high-fidelity prototypes in Figma to explore enhancements and new features grounded in user feedback.
 
# ItemCatalog
Put a Price On It! is a modern MERN stack web application designed to help users make smarter purchasing decisions. Users can share information about items they find on platforms like eBay, Amazon, and more by adding an item’s name, price, and a brief description. The community can view these items, like their favorites, and assess their popularity. Key features include:

- Community-Driven Insights: Users can post items and like others' posts (but can only like each item once).
- Optimized Discoverability: Items are ranked and displayed based on popularity and affordability, ensuring the best value deals are highlighted first when users log in.
- Personalized Profiles: Each user has a profile showcasing their activity, including recently liked and posted items, the most popular items, and a summary of their total contributions (likes and posts).

This intuitive platform empowers users to make informed buying decisions by combining price visibility with community feedback.


This MERN stack application is containerized and available as [Docker images on Docker Hub](https://hub.docker.com/repository/docker/donoftime2018/item-catalog/general). The application is designed with scalability and efficiency in mind, utilizing modern DevOps practices to ensure seamless updates and deployment.

Continuous Integration/Continuous Deployment (CI/CD):
A robust CI/CD pipeline is implemented to automate updates to the client and server images. Every merged pull request to the main branch triggers the pipeline, which rebuilds and pushes the updated Docker images to Docker Hub. This ensures that the latest code changes are always available as part of the deployment workflow.

Hosting on Render.com:
The application is [deployed on Render.com](https://item-catalog-client.onrender.com/login) using the renderDeploymentSetup branch. This branch is specifically configured for deployment on Render.com, handling all necessary adjustments for seamless integration. Render.com provides scalable hosting, ensuring the application remains reliable and accessible.

Feel free to explore the Docker images or view the live application hosted on Render.com!
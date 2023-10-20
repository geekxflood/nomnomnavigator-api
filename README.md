# 🍽️ NomNomNavigator

Ahoy there, brave digital voyagers! Welcome aboard the SS NomNomNavigator, a gallant vessel sailing the turbulent seas of the web in quest for scrumptious sustenance! With a map of allergens in one hand and a spoon in the other, we're on a grand expedition to fetch the fabled menu data from the mysterious Restaurant Isles. 🏴‍☠️🦜

## Table of Contents

- [🍽️ NomNomNavigator](#️-nomnomnavigator)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API](#api)
    - [Get Menu](#get-menu)
  - [Development](#development)
  - [Dockerization](#dockerization)
  - [The Chart](#the-chart)
  - [License](#license)

## Installation

Before we set sail, ensure ye have [Node.js](https://nodejs.org/en/) installed in yer system.

1. Clone this repository to yer local machine:

    ```bash
    git clone https://github.com/your-username/nomnomnavigator.git
    cd nomnomnavigator
    ```

2. Install the necessary provisions (dependencies) for our voyage:

    ```bash
    npm install
    ```

3. Hoist the sails and set the environment variable for the restaurant website:

    ```bash
    export RESTAURANT_WEBSITE='https://your-restaurant-url.com'
    ```

## Usage

1. With the preparations complete, it's time to set sail! Launch the server with the following command:

    ```bash
    npm start
    ```

2. The SS NomNomNavigator is now simmering on port 3000. Access the bounteous banquet of data at:

    ```http
    GET http://localhost:3000/menu
    ```

## API

### Get Menu

Fetches the fabled menu data from the Restaurant Isles.

- **URL:** `/menu`
- **Method:** `GET`
- **Success Response:**
    - **Code:** 200 OK
    - **Content:**
        ```json
        [
            {
                "date": "YYYY-MM-DD",
                "meals": [
                    {
                        "title": "String",
                        "description": "String",
                        "price": "Number",
                        "currency": "String",
                        "allergens": [
                            {
                                "id": "Number",
                                "name": "String",
                                "emoji": "String"
                            }
                        ],
                        "nutritionalInfo": [
                            {
                                "name": "String",
                                "value": "Number",
                                "percentage": "Number"
                            }
                        ]
                    }
                ]
            }
        ]
        ```

## Development

Should ye wish to venture into the codebase and contribute to the grand expedition, follow these steps:

1. Fork the repository to yer own account and clone it to yer local machine.
2. Install the provisions:
    ```bash
    npm install
    ```

3. Commence tinkering! Create a new branch for yer feature or bug fix:
    ```bash
    git checkout -b my-awesome-feature
    ```

4. Make yer changes and commit them with a hearty message:
    ```bash
    git commit -am "Add some awesome feature"
    ```

5. Push yer changes to GitHub:
    ```bash
    git push origin my-awesome-feature
    ```

6. Open a pull request from yer branch and wait for the crew to review yer contributions.

## Dockerization

Arr matey, ready to containerize the SS NomNomNavigator and sail smoothly across any machine? Follow the steps below:

1. Build the Docker image with a tag of yer choice:
    
    ```bash
    docker build -t nomnomnavigator:latest .
    ```
    
2. Run the image in a container, mapping the port to yer liking:
    
    ```bash
    docker run -p 3000:3000 nomnomnavigator:latest
    ```

## The Chart

With the helm at yer fingertips, navigate through the Kubernetes seas with our chart. Install it and man the helm!

1. Add the NomNomNavigator chart repository:

    ```bash
    helm repo add nomnomnavigator https://your-chart-repo.com
    ```

2. Update yer chart repositories:

    ```bash
    helm repo update
    ```
    
3. Install the NomNomNavigator chart:

    ```bash
    helm install nomnomnavigator nomnomnavigator/nomnomnavigator
    ```

## License

This project is licensed under the MIT License. For more information, see the [LICENSE](LICENSE) file in the project repository.

---

Fair winds and full bellies, adventurers! May yer forks be sharp and yer code be bug-free! 🍽️🎉

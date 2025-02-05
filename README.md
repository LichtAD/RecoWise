# RecoWise

**Welcome to RecoWise !!!**
Discover top products tailored to your needs, compare options, explore reviews, and snag the best prices!

RecoWise is a platform to recommend products to users based on their preferences. It uses a combination of user ratings and product features to suggest the best products for users. The platform is built using Node.js, Express.js, and MongoDB. The user interface is built using React.js and hosted on Firebase with Vercel as the deployment platform.

![RecoWise](https://i.ibb.co.com/nnhjx78/Reco-Wise-front.png)

## Key Features

- Users can see All Queries that are available
- User can see details of a query and recommend a product based on a query
- If user has any query, he can post and get recommendations based on his product
- User can update and delete his queries
- User can see what others has recommended for all his queries
- Users can Login with Email and Password or Google

## Technologies Used

- HTML5
- CSS3
- Tailwind CSS
- JavaScript (ES6+)
- React.js
- React Hooks
- Firebase
- Vite
- React Router
- React Helmet
- React Icons
- React Toastify
- React Tooltip
- Swiper
- DaisyUI
- Autoprefixer
- PostCSS
- ESLint
- animate.css
- aos
- axios
- date-fns
- firebase
- localforage
- lottie-react
- match-sorter
- react
- react-dom
- react-helmet
- react-icons
- react-router-dom
- sort-by
- sweetalert2
- swiper

##  Handling and Managing data

- MongoDB
- Context API

## Requirement Document Link of the Project

# [Requirement Document Link of the Project](https://docs.google.com/document/d/1khXORj7dda0E1aJfYR3xB5u6Q0m3HTTDuXYtpbCWvN0/edit?usp=sharing)

## Live Link of the Project

# [Live Site](https://project-recommendation-lichtad.web.app/)

## How to run the project in local

- First, clone the project
```
git clone <private-repo-url>
```
- Then go to project folder
```
cd <project-directory>
```

- Install all packages
```
npm i
```

- Create .env.local file. Next, go to firebase and create a project and install firebase. Then, add all the environment variables from firebase in .env.local
![.env.local example](https://i.ibb.co.com/hBhD6Qs/image.png)

- Clone the server, create .env there and add DB_USER, DB_PASS and JWT_SECRET from mongodb atlas

- To run the project locally, replace all the server links with 'http://localhost:5000'

- Run the project
```
npm run dev
```
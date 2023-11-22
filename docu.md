# .env file
Create a .env file to save all api keys or secret variables

# Page creation:
`````javascript
// NewPage file
const NewPage = () => {}

export default NewPage;


// Import NewPage in Routes file
// this adds lazyLoading
const NewPage = lazy(() => import("../pages/NewPage/Index"));
``````
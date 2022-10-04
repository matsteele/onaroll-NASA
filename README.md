![Screen Shot 2022-10-03 at 9 49 18 PM](https://user-images.githubusercontent.com/16779479/193717517-b4865c3f-2c2f-4eb1-9c7f-d49ea7f98742.png)

# Description: 

NASA publishes a free and open API via https://api.nasa.gov/ — the first one listed is
APOD — NASA's famous Astronomy Picture of the Day.

This project takes a a date input field and outputs the associated image for that day. Related info is shown in an infobox on the page. 


## How to run

In the project directory, you can run:

1) Install dependencies 

```bash
yarn install 
or
npm install
```
2) run project tests

```bash
yarn test
or
npm test
```

2) run project
```bash
yarn start
or
npm start
```

### Known Bugs: 
The data formatter sometimes would use dates that were a day before expected. 

## Future Work
If this were part of a broader project that might need access to this data across the app, I would likely connect the hook I build to the context api, and wrap the app in a provider so that all components could have access to the hook's data as needed. 

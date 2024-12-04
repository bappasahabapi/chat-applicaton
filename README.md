    #    npm packages install 
    
-    `npm i json-server-auth`


# Run the client

-    git clone 
-    git checkout: `git checkout -b c00-react-starter-pack`
-    `npm install`
-    ` npm start`

```shell

    cd server 
    npm install
    npm start

```


#    Run the server

```shell

    cd server 
    npm install
    npm start

```

Update package dependencies:

1. Install npm-check-updates globally:

-   ` npm install -g npm-check-updates`

2. Run ncu to see which packages are outdated:

-    `ncu`

3. Run ncu -u to update the package.json file:

-    `ncu -u`
-  `npm install`


##    conversation


<details>
<summary>10`- Make the conversationalApi </summary> 

```bash


import { apiSlice } from "../api/apiSlice";

const REACT_APP_CONVERSATIONS_PER_PAGE = 5;

export const conversationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversatons: builder.query({
      query: (email) =>
        `/conversations?participants_like{email}&_sort=timestamp&_order=desc&_page=1&_limit=${REACT_APP_CONVERSATIONS_PER_PAGE}`,
    }),
  }),
});


export const {useGetConversatonsQuery}=conversationsApi;

```
</details>
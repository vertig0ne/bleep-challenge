# bleep-challenge

Challenge product issued by Bleep Plc. 

## Specifications

```
 1) Splash screen displaying "Opening App..." message
 2) Retrieve, manipulate and display data located at http://demo.w-bo.com/api/pos/sample_data
  2a) By Sales Table. Showing transactional value of each day represented in the dataset
  2b) By Sales chart. Displaying the top 5 selling products from the data set.
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Design Choices
 - Vuex, While not completely necessary for the challenge project (due to scope), the application wouldn't get much larger before requiring it 
 and would be significant changes to codebase to implement at a later date.
 - Charts, tables datepicker, simple... the work is already done.
 - Bootstrap, I put zero effort into the design and it looks bearable. I'd take that as a win.

## Dev notes
 - Provided API URL for Challenge, has a CORS related error.
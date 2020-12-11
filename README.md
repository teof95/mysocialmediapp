![logo_hatebook](https://hatebooksocial.herokuapp.com/static/media/hatebook-words.71c9f562.jpg)

# Hatebook
MERN Social Media Website

MongoDB, Express, React, Node, Redux. Axios, AtlasDB, Cors, Express validator,

## Introduction

Nowdays there are many web sites for people showing their lives and things that they like!
In many cases, people declare their hate and dilike on different posts, users, things on social media apps. 
So far, there is no dedicated website for people to declare their dislike, their hate or even a bad review on a certain topic.
The topics do not have limitations. 

It can be a person, it can be a place, a airline company, a restaurant or a shop! 
It can be an animal, a plant or even a color!
It can be your boss or your flatmates! It can be the weather conditions! 


![](https://www.shareicon.net/data/128x128/2016/07/07/792197_sign_512x512.png)

## Creation

This project was created based on youtube tutorial that you can find here

```shell
https://www.youtube.com/playlist?list=PL9t4T-rEV6sYvqcodoQ-4fWkwBE5kGYxu
```

## Limitations

The are few bugs in the code in the deployment and styling but is fully functional. The code is connected to the ATLAS DB and there is a flow from and to the database. 

## Instructions
You can Register and Sign-up in the application and create posts, give your hate to different posts, short the posts and make comments. You can also see the information and the posts of other users. 

### Iteration 0 | Setup

#### Bulma installation

We will use [Bulma](https://bulma.io/) for the design :)

```sh
$ npm install bulma --save
```

```javascript
import 'bulma/css/bulma.css';
```

#### Import a JSON

Import the foods from the `foods.json`.

```js
import foods from './foods.json';
```

#### About the design

If you struggle with the design, you can find a static example of what is expected inside file `style-guides.html`.

So let's start!

### Iteration 1 | Create `FoodBox` component

Create a `FoodBox` component that takes at least `food` as a prop and displays a box with all the information about an ingredient.

You can use this HTML snippet to display properly the `FoodBox`:

```html
<div className="box">
  <article className="media">
    <div className="media-left">
      <figure className="image is-64x64">
        <img src="https://i.imgur.com/eTmWoAN.png" />
      </figure>
    </div>
    <div className="media-content">
      <div className="content">
        <p>
          <strong>Pizza</strong> <br />
          <small>400 cal</small>
        </p>
      </div>
    </div>
    <div className="media-right">
      <div className="field has-addons">
        <div className="control">
          <input className="input" type="number" value="1" />
        </div>
        <div className="control">
          <button className="button is-info">
            +
          </button>
        </div>
      </div>
    </div>
  </article>
</div>
```

![](https://i.imgur.com/bY9i5Rw.png)

### Iteration 2 | Display food

In your `App` component (your main component), display as many `FoodBox` as elements inside the variable `foods`.

![](https://i.imgur.com/3TVQJDO.png)

### Iteration 3 | Add new food

Create a button to add new foods.

When a user clicks the button, a form will appear with fields for a name, number of calories, and an image.

When the user clicks submit, the food will be added to the list.

The form should disappear when the user clicks the submit button.

### Iteration 4 | Implement search bar

Create a `Search` component to perform a search that updates the list of all meal.

![](https://i.imgur.com/XaOpAx8.png)

### Iteration 5 | Create add buttons

On your `FoodBox`, you have an input an "+" button. Use them so that when a user clicks on the button, it adds them on a list on the right called "_Today's foods_".

You will also need to display the total amount of calories at the bottom of the list as a recap.

![](https://media.giphy.com/media/fH0dyqpPJRvTbiF5rJ/giphy.gif)

If you don't remember how to create responsive columns with Bulma, you can check the [documentation](https://bulma.io/documentation/columns/basics/).

### Iteration 6 | Bonus | Group ingredients

You made an awesome application, but you have found a little problem in the UX. For example, if you click twice on "Pizza", it will display 2 lines "_1 Pizza = 400 cal_" instead of 1 line "_2 Pizza = 800 cal_". Fix that problem.

### Iteration 7 | Bonus | Allow the user to remove an ingredient

On the "_Today's food_", add a trash icon to let users removing one of their items.

Happy coding! :heart:

# Tutorials
To get acquainted with how tutorials work I would suggest looking at the extisting tutorials in `/src/tutorial`. There are three main components to a tutorial: 

## The Mask
The mask highlights a part of the screen and provides some information. Each tutorial step should focus on a part of the screen by wrapping the element you want to focus in a [TutorialAnchor](../src/component/TutorialAnchor/TutorialAnchor.js).

At each step of your tutorial the mask will look to see the `(x,y)` **center** position and `(width, height)` of the active anchor and draw an SVG with that circle cut out. If you need to adjust these values you can do so when you configure your step; more on that below.

For more information on how the mask is rendered check out [this document](../src/component/Mask/Mask.readme.md).

## Initialization Function
The initialization function should be the default export of your tutorial configuration file. This function can do any setup that you need to do, but should always start your tutorial by calling `store.dispatch(actions.start(steps))`

Two example intialization function:
- The [careGiver tutorial](../src/tutorial/careGiver.js) only starts the tutorial
- The [share tutorial](../src/tutorial/share.js) does some initial setup - such as moving the user to the Item screen before starting the tutorial

## Steps
The steps of your tutorial should be defined in your tutorial configuration file, and passed in when you call the `start` action in your initialization function.

Each step configures some layout options for the tutorial step, and what should happen when the user clicks on the mask.

### Callbacks
You can provide two callbacks to your tutorial steps - `onNext` and `onPress`. `onNext` will advance the tutorial to the next step and then fire. `onPress` will be fired when the mask is tapped, but will not advance the tutorial to the next step. **You probably want to use `onPress` to dismiss your tutorial**.

The `onNext` callback in each step should either navigate to the next page of the tutorial or switch the current tutorial anchor. 

To see these callbacks in use, each step in the [share tutorial](../src/tutorial/share.js) handles the mask press differently:
- **Step 1**: `onNext` navigates to a new screen 
- **Step 2**: `onNext` changes the mask to focus on a new anchor
- **Step 3**: `onPress` dismisses the tutorial

### Mask Configuration
If you need to customize the mask cutout in a step you can do so in your tutorial configuration by providing the `maskPadding` and/or `maskOffset` configuration variables. You can see them both being used in the [careGiver tutorial](../src/tutorial/careGiver.js)

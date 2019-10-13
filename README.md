# Memory game

The objective of this webpage is to provide users of all ages a way to exercise and improve their memory as well as a way to fight boredom, the aim is to create a memory based game that provides some challenge with varying degrees of difficulty selected by the user. 

## UX

The website is aimed at people who have difficulty with memory or would like to exercise their memory skills, this could be adults to older people who struggle to remember things, children who can both exercise their memory while being entertained or general users who are looking for a quick source of entertainment.

### User Stories

#### User with memory difficulties
As someone who has difficulty remembering things, I would like to find a game that is entertaining, not too much of a challenge to begin with and will help to improve my memory.

#### User exercising memory skills
As a younger developing person I would benefit from exercising my memory, I woud like to find a way that will keep me entertained and allow me to control the difficulty that I am playing at.

#### User looking for quick entertainemnt 
As someone who has some spare time on my hands I would like to find a game that doesn't require too much investment and can provide a quick source of entertainment.

### Wireframes

Below are my first drafted ideas of how the page would look and work, these were originally made using Balsamiq Mockups.

- [Desktop Easy & Medium difficulty Light theme](wireframes/Desktop-Easy-Med-Light.png)
- [Desktop Hard difficulty Light theme](wireframes/Desktop-Hard-Light.png)
- [Desktop Light theme instructions](wireframes/Desktop-HowToPlay-Light.png)
- [Desktop Easy & Medium difficulty Dark theme](wireframes/Desktop-Easy_Med-Dark.png)
- [Desktop Hard difficulty Dark theme](wireframes/Desktop-Hard-Dark.png)
- [Desktop Dark theme instructions](wireframes/Desktop-HowToPlay-Dark.png)
- [Mobile Easy & Medium Difficulty Light theme](wireframes/Mobile-Easy-Med-Light.png)
- [Mobile Hard difficulty Light theme](wireframes/Mobile-Hard-Light.png)
- [Mobile Light Theme Instructions](wireframes/Mobile-HowToPlay-Light.png)
- [Mobile Easy & Medium difficulty Dark theme](wireframes/Mobile-Easy-Med-Dark.png)
- [Mobile Hard difficulty Dark theme](wireframes/Mobile-Hard-Dark.png)
- [Mobile Dark Theme Instructions](wireframes/Mobile-HowToPlay-Dark.png)
- [Tablet Easy & Medium Dificulty Light theme](wireframes/Tablet-Easy-Med-Light.png)
- [Tablet Hard Dificulty Light theme](wireframes/Tablet-Hard-Light.png)
- [Tablet Instructions Light theme](wireframes/Tablet-HowToPlay-Light.png)
- [Tablet Easy & Medium Dificulty Dark theme](wireframes/Tablet-Easy-Med-Dark.png)
- [Tablet Hard Dificulty Dark theme](wireframes/Tablet-Hard-Dark.png)
- [Tablet Instructions Dark theme](wireframes/Tablet-HowToPlay-Dark.png)

The Theme selector was later discarded as it clogged the top of the page up, this would be reintroduced as a possible feature to implement alongside more customizability.

All devices with a screen width of `567px` or less were too small to play the game effectively, it was decided that devices of that size would be asked to rotate to a landscape orientation.

The start button was discarded as the game is ready to play on page load or when the restart button is pressed.

A timer and move counter was added to give users something to track and to try and beat when they came back.

The page layout was made more central to neaten the display of the page.

## Features

### Rotate to landscape
On a device with a screen width of `567px` or less a message appears prompting users to rotate their device to a landscape orientation, this is targeted generally at mobile phones. This is done with a **CSS** **media query** where the `<header>` and `<section>` are given a style of `display: none;` and the message is styled to fill the screen with a rotating icon, its `display: none;` being replaced with `display: block;`.

### How To Play Modal
The instructions **modal** is shown by giving the element targeted the `id= "howtoPlay"`, using **jQuery** this sets a click function that will check what value the variable `selectedDifficulty` has, if it has the value `"easy"` it will display the **modal** with `id= "easyInfo"`, if it has the value `"medium"` it will display the **modal** with `"id= "medInfo"` and if it has the value `"hard"` it will display the **modal** with `"id= "hardInfo"`.
The **modals** were created by using Bootstrap and removing HTML code that was not needed, then styled with **CSS**.

### Dificulty Selector
The dificulty selector was created by using a **Radio button** provided by the Bootstrap library, I then added my own **JavaScript** to add functionality. This was achieved by calling **jQuery** when the button is clicked to call a function called `difficulty` thats value was determined by which button out of the radio buttons was selected.
When `difficulty(value)` is called a **switch** is used to run specific code depending on the value given at the time it was called, this runs other functions that hide or show features specific to each difficulty as well as setting the value of a variable called `selectedDifficulty` which allows other features to work.
The difficulty selector was created by using Bootstrap and styling with **CSS**.

### The Game 
When the page loads the `startGame()` function is called which shuffles the cards in to a random order, when a card is clicked it has **CSS** classes added to it, `flip` which provides the card with its turning animation and displays the Font Awesome icon and `disable` which gives the card `pointer-events: none;` so that the card can't be flipped multiple times.

The card is then pushed to the `flippedCards` **array** which is an empty **array** at the start of the game, it will then run the `checkMatch()` function but the parameters of the `if` have not been met yet.

 Once another card has been selected the `timer`(easy)/`diffTimer`(med/hard) will begin and the `moves` counter will go up by 1 for every two cards flipped and the code will run again. 

 This time there are two cards in the `flippedCards` **array** meaning that the parameters of the `if` in the `checkMatch()` function have been met. The `dataset-type` of both objects in the `flippedCards` **array** are then checked to see if they are identical, if they are then the `match()` function is called adding the `matched` class to the flipped cards and removing the class `flip`, then the contents of the `flippedCards` **array** are pushed to another currently empty **array** called `matchedCards`.

 The function `complete()` is then called but at this point the parameters of the `if` within that function are not met. If the cards are not identical the `notMatch()` function is called adding the class `not-match` to the elements in the `flippedCards` **array**, which gives a visual sign to the user that the cards don't match, and removes the class `flip` from the elements in the `flippedCards` **array**. It then adds the class `disable` to all elements with the `game-card` class so that other cards can't be flipped and a **Timeout function** is set to wait `1100` miliseconds, after this time the classes `not-match` and `disable` are removed from all elements with the `game-card` class and then any elements that have the `matched` class have the `disable` class applied to them. 

 This process is repeated until the parameters of the `if` within the `complete()` function are met meaning that all cards are matched, the **modal** with `id= "congratulations"` is shown, the `timer`(easy)/`diffTimer`(med/hard) interval is stopped and within the **modal** the time and moves taken to finish are shown as well as the players record time and moves which are stored in local storage so that they persist from session to session.

#### Medium Difficulty
Medium dificulty introduces the `timerDown()` function, instead of starting at `0` and counting up this timer starts at `60` and counts down giving the user one minute to complete the game. When the counter reaches `30` the timer gives an indicator to the user that they are half way through their time by turning **yellow**, when the counter reaches `10` another visual indicator is given to the user that they are nearly out of time and it turns **red**. Once the timer reaches `0` the **modal** with `id= "timeLoser"` appears showing the user that they have failed to complete the game due to running out of time and gives them the option to play again.

#### Hard Difficulty
Hard difficulty uses the timer introduced in Medium difficulty but also introduces a **life mechanic**, the user starts with `4` lives and every time they flip two cards that don't match they lose a life, every time they match two cards they gain a life this produces more pressure on the player who is already battling against the clock.

### Restart Button
The user can restart the game at any time by clicking the restart button, **jQuery** was used to set a **click function** on the element with `id= "restart"`. When clicked all `timers` are reset to `0` and their **interval** functions cleared, all cards are reverted back to their original state, The `flippedCards` and `matchedCards` array are cleared and the move counter is set back to `0`. In the case of hard difficulty the lives are restored back to their original value.
The `startGame()` function is called to re shuffle the cards in to another random order.

### Move Counter
When the user flips two cards the value of the variable `moves` is increased by `1`, this is to show the user how many moves they have made and the final value is displayed in the congratulations **modal** when the game is completed, the value is also checked against the saved value in **local storage** which will update with the new value if it is lower than the saved one.

### Timers:
#### Easy Difficulty
When the variable `moves` has a value of `1` an **interval** is set in the `time()` function that runs every `1000` miliseconds, this interval adds `1` to the value of the variable seconds which starts at `0`. when the value of seconds reaches `60` it is reset back to `0` and the variable minutes has `1` added to its value which starts at `0`. When the value of `minutes` reaches `60` it is reset back to `0` and the variable `hours` has `1` added to its value. This works as a **timer** so that the user can see how long they are taking to complete the game. The **interval** is stopped when the game is completed and the final value of the variables `seconds`, `minutes` and `hours` is shown in the congratulations **modal** displayed when the game is completed. The values are also used to check against the times saved in **local storage** which are updated if the time is lower.

#### Medium/Hard Difficulty
When the variable `moves` has a value of `1` and the difficulties Medium or Hard are selected an **interval** is set in the `timerDown()` function that runs every `1000` miliseconds, this **interval** subtracts `1` from the value of the variable `countDown` which starts at `60`, when the value reaches `30` the colour of the displayed value turns **yellow**, when the value reaches `10` the colour of the displayed value turns **red** and when the value reaches `0` all cards are **disabled** and the **modal** with `id= "timeLoser` is displayed.

### Possible Features To Implement
- A username and login for users with a customizable profile
- A points scoring system rewarding a higher score for matching cards without flipping cards that don't match, completeing the game faster and on a harder difficulty
- An online leaderboard where users can compare their best scores against other users and try to beat them
- In depth customisation allowing users to select their own themes and icons

## Technologies Used

- This project uses **HTML**, **CSS** and **JavaScript** programming languages
- [**Visual Studio Code**](https://code.visualstudio.com/) was used as the development IDE
- [**Bootstrap**](https://getbootstrap.com/)
- [**FontAwesome**](https://fontawesome.com/)
- [**Google Fonts**](https://fonts.google.com/)
- [**JQuery**](https://jquery.com/)
- [**Popper.js**](https://popper.js.org/)
- this projects wireframes were created on [**Balsamiq**](https://balsamiq.com/)
- The HTML and CSS code were validated using the [**W3C Markup Validation Service**](https://validator.w3.org/) website

## Testing
- The HTML and CSS code were validated using the [**W3C Markup Validation Service**](https://validator.w3.org/) website

### User Stories Tested

#### User with memory difficulties
**As someone who has difficulty remembering things, I would like to find a game that is entertaining, not too much of a challenge to begin with and will help to improve my memory.**
- The game provides a quick and simple explenation as to how to play
- Upon arriving at the page the game is set to Easy mode which will never interrupt the user and cause frustration
- The game will record the users best number of moves and quickest time to give them something to try to beat
- Once the user is used to the game and finding Easy to be too easy they can then select to go on to Medium or Hard difficulty
- Medium difficulty provides an added challenge in that the user must complete the game within 60 seconds or be interupted and have to start again
- Hard difficulty adds even more of a challenge by adding a life mechanic on top of Medium difficulty, the player will lose a life every time they fail to match a card and gain a life every time they do match a chard, if their lives reach 0 they are interrupted and will have to start again
- To play the game well a user will need to remember the position of each icon they have uncovered, with the added difficulty of Medium and Hard mode this will help them to exercise their memory

#### User exercising memory skills
**As a younger developing person I would benefit from exercising my memory, I woud like to find a way that will keep me entertained and allow me to control the difficulty that I am playing at.**
- The game provides a quick and simple explenation as to how to play
- Upon arriving at the page the game is set to Easy mode which will never interrupt the user and cause frustration
- The game will record the users best number of moves and quickest time to give them something to try to beat
- Once the user is used to the game and finding Easy to be too easy they can then select to go on to Medium or Hard difficulty, if this is too difficult the user can at any time change the dificulty back
- Medium difficulty provides an added challenge in that the user must complete the game within 60 seconds or be interupted and have to start again
- Hard difficulty adds even more of a challenge by adding a life mechanic on top of Medium difficulty, the player will lose a life every time they fail to match a card and gain a life every time they do match a chard, if their lives reach 0 they are interrupted and will have to start again
- To play the game well a user will need to remember the position of each icon they have uncovered, with the added difficulty of Medium and Hard mode this will help them to exercise their memory in an entertaining way



#### User looking for quick entertainemnt
**As someone who has some spare time on my hands I would like to find a game that doesn't require too much investment and can provide a quick source of entertainment.**
- The game provides a quick and simple explenation as to how to play
- Upon arriving at the page the game is set to Easy mode which will never interrupt the user and cause frustration
- The game will record the users best number of moves and quickest time to give them something to try to beat
- Once the user is used to the game and finding Easy to be too easy they can then select to go on to Medium or Hard difficulty
- Medium difficulty provides an added challenge in that the user must complete the game within 60 seconds or be interupted and have to start again
- Hard difficulty adds even more of a challenge by adding a life mechanic on top of Medium difficulty, the player will lose a life every time they fail to match a card and gain a life every time they do match a chard, if their lives reach 0 they are interrupted and will have to start again
- The game provides a quick source of entertainment and can be dialed up or down depending on the challenge the user is seeking

### Manual Testing
**Testing was carried out on a desktop computer**

#### How to play
- Open the game in a new browser window
- Hover mouse over the "How to play" text and font awesome icon under the page title and see that the white colour fades to grey and the cursor has changed to a pointing hand
- Click the "How to play" button and see that a modal pops up describing how to play the game on easy mode
- Click the cross in the top right corner of the modal to see it close
- Click on the Medium button of the Difficulty selector
- Click on the "How to play" button and see that a modal has appeared with information on how to play the game on Medium difficulty
- Click on the cross in the top right corner of the modal to see it close
- Click on the Hard button of the difficulty selector
- Click on the "How to play" button and see that a modal has appeared with information on how to play the game on Hard difficulty
- Click on the cross in the top right corner of the modal to see it close

#### Difficulty Selector
- Open the game in a new browser window
- See that the game loads in easy difficulty
- Click on the Medium button of the difficulty selector
- See that the timer on the right side of the page has changed from 0:0:0 to 60
- Click on the Hard button of the difficulty selector
- See that a heart appears in the centre above the restart button and displays the number 4 inside it
- Click on the Easy button of the difficulty selector
- See that the Heart dissapears and the timer on the right side of the page has changed from 60 to 0:0:0

#### Move Counter
- Open the game in a new browser window
- Click on a game card, see it flip over and stay that way
- Click on a second game card, see it flip over and either match or not match the other card
- See that the move conter now displays Move(s): 1
- Repeat the process above and see that the move counter no displayes Move(s): 2
- Continue to repeat this process until satisfied that the move counter increases by 1 for every two cards flipped

#### Timer (Easy)
- Open the game in a new browser window
- Click on a game card, see it flip over and stay that way
- Click on a second game card, see it flip over and either match or not match the other card
- See that the timer in the right corner has begun to count upwards (0:0:0 to 0:0:1 to 0:0:2 etc)
- Wait for the counter to reach 0:0:59 and then turn to 0:1:0
- Wait for the counter to reach 0:59:59 nd see that it turns to 1:0:0

#### Timer (Medium/Hard)
- Open the game in a new browser window
- Click on the Medium Button of the difficulty selector
- See that the timer on the right hand side has changed from 0:0:0 to 60
- Click on a game card, see it flip over and stay that way
- Click on a second game card, see it flip over and either match or not match the other card
- See that the timer has begun counting down (60 to 59 to 58 etc)
- When the timer reaches 30 see that the color of the timer changes from white to yellow
- When the timer reaches 10 see that the color of the timer change from yellow to red
- When the timer reaches 0 see that a modal pops up saying "You didn't complete the game in under 60 seconds!"
- Open the game in a new browser window
- Click on the Hard Button of the difficulty selector
- See that the timer on the right hand side has changed from 0:0:0 to 60
- Click on a game card, see it flip over and stay that way
- Click on a second game card, see it flip over and either match or not match the other card
- See that the timer has begun counting down (60 to 59 to 58 etc)
- When the timer reaches 30 see that the color of the timer changes from white to yellow
- When the timer reaches 10 see that the color of the timer change from yellow to red
- When the timer reaches 0 see that a modal pops up saying "You didn't complete the game in under 60 seconds!"

#### Restart button
- Open the game in a new browser window
- Click on a game card, see it flip over and stay that way
- Click on a second game card, see it flip over and either match or not match the other card
- See that the timer in the right corner has begun to count upwards (0:0:0 to 0:0:1 to 0:0:2 etc)
- See that the move counter is displaying Move(s): 1
- Click on the button labeled Restart in the center of the move counter and timer
- See that any matched cards are back to their original facing
- See that the timer is displaying 0:0:0 and isn't counting up
- See that the move counter is back to 0
- Open the game in a new browser window
- Click on the Medium button of the difficulty selector
- Click on a game card, see it flip over and stay that way
- Click on a second game card, see it flip over and either match or not match the other card
- See that the timer in the right corner has begun counting down (60 to 59 to 58 etc)
- See that the move counter is displaying Move(s): 1
- Click on the button labeled Restart in the center of the move counter and timer
- See that any matched cards are back to their original facing
- See that the timer is displaying 60 and isn't counting down
- See that the move counter is back to 0
- Open the game in a new browser window
- Click on the Hard button of the difficulty selector
- Click on a game card, see it flip over and stay that way
- Click on a second game card, see it flip over and either match or not match the other card
- If it matched see that the number of lives displayed in the heart has gone up (4 to 5)
- If it didn't match see that the number of lives dosplayed in the heart has gone down (4 to 3)
- See that the timer in the right corner has begun counting down (60 to 59 to 58 etc)
- See that the move counter is displaying Move(s): 1
- Click on the button labeled Restart in the center of the move counter and timer
- See that the lives displayed in the heart are showing 4
- See that any matched cards are back to their original facing
- See that the timer is displaying 60 and isn't counting down
- See that the move counter is back to 0






### Code Validation

- The **HTML** code was validated using [**W3C Markup Validation**](https://validator.w3.org/)
- The **CSS** code was validated using [**W3C CSS Validation**](https://jigsaw.w3.org/css-validator/)


### Further Testing

The page was shared with family and friends to gather any feedback on any issues found

- The game board didn't display centered with the page, this was due to the width parameter on .deck, I wanted the cards to stay around the same size on all devices and in the same layout(4x4). This was fixed by reducing the width on .deck from 600px to 520px
- The values stored in local storage were not updating as intended, some users found that after a couple of games the timer displayed 0:0:0, this was due to the way that the JavaScript was written. This was fixed by tightening the parameters on which values updated by using if else methods and updating only the values which needed to change
- When Medium or Hard difficulties were failed some users found that they could close the modal that popped up and carry on playing without the timer. This was caused by the notMatch() functions timeout function which removed the disable class from all cards after 1100 miliseconds. This was fixed by removing the call for jQuery to add the class to all game cards from the parameter that checks if the player has lost and putting it within a timeout function inside of the function called to bring up the modal, this timeout function was set to 1101.


## Deployment

The Visual Studio Code IDE was used to develop this project and all work was added, commited and pushed to a GitHub repsitory.

**To deploy on GitHub Pages**

1. **Login** to GitHub
2. Select the **Repositories** tab
3. Select the **MilestoneProject2** repository
4. From the options near the top of the page select **Settings**
5. Scroll down to the section titled **GitHub Pages**
6. Under **Source** select the drop down menu and select **Master Branch**
7. The page will automatically refresh and the page is now **deployed**
8. Scroll back down to the GitHub Pages section to find the **URL**

**How to run the project locally**

1. Use [**this**](https://github.com/OwenCookman/Milestoneproject2) link to go to the **repository**
2. Above the repository files select the green button that says **Clone or download**
3. Select the **copy to clip board** image next to the URL to copy the URL to your clip board
4. Using your **local IDE** open a **Git terminal**
5. Change the durectory to the location that you want to create the **cloned directory**
6. Type **git clone** and **paste** the URL you copied from GitHub

## Credits

I would like to credit user Alexey Lebedev on [**Stack Overflow**](https://stackoverflow.com/questions/7070054/javascript-shuffle-html-list-element-order?fbclid=IwAR1w-IDlqpvp22TWQQBhF4QQBndle4ikf6vEgWK4DIcW75yCZmN_m2jQY94) for the Shuffle function that was used in this project.

## Acknowledgements
I would like to thank my family and friends for testing this project and reporting back to me with any issues.
I would also like to thank my mentor Simen Daehlin for his brilliant tutelage


*This project was created for educational purposes only*
# Memory game

Click [here](https://owencookman.github.io/MilestoneProject2/) to view the deployed website.

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

#### Wireframes

Below are my first drafted ideas of how the page would look and work, these were originally made using Balsamiq Mockups 3.

- [Desktop Easy & Medium difficulty Light theme](assets/wireframes/Desktop-Easy-Med-Light.png)
- [Desktop Hard difficulty Light theme](assets/wireframes/Desktop-Hard-Light.png)
- [Desktop Light theme instructions](assets/wireframes/Desktop-HowToPlay-Light.png)
- [Desktop Easy & Medium difficulty Dark theme](assets/wireframes/Desktop-Easy_Med-Dark.png)
- [Desktop Hard difficulty Dark theme](assets/wireframes/Desktop-Hard-Dark.png)
- [Desktop Dark theme instructions](assets/wireframes/Desktop-HowToPlay-Dark.png)
- [Mobile Easy & Medium Difficulty Light theme](assets/wireframes/Mobile-Easy-Med-Light.png)
- [Mobile Hard difficulty Light theme](assets/wireframes/Mobile-Hard-Light.png)
- [Mobile Light Theme Instructions](assets/wireframes/Mobile-HowToPlay-Light.png)
- [Mobile Easy & Medium difficulty Dark theme](assets/wireframes/Mobile-Easy-Med-Dark.png)
- [Mobile Hard difficulty Dark theme](assets/wireframes/Mobile-Hard-Dark.png)
- [Mobile Dark Theme Instructions](assets/wireframes/Mobile-HowToPlay-Dark.png)
- [Tablet Easy & Medium Dificulty Light theme](assets/wireframes/Tablet-Easy-Med-Light.png)
- [Tablet Hard Dificulty Light theme](assets/wireframes/Tablet-Hard-Light.png)
- [Tablet Instructions Light theme](assets/wireframes/Tablet-HowToPlay-Light.png)
- [Tablet Easy & Medium Dificulty Dark theme](assets/wireframes/Tablet-Easy-Med-Dark.png)
- [Tablet Hard Dificulty Dark theme](assets/wireframes/Tablet-Hard-Dark.png)
- [Tablet Instructions Dark theme](assets/wireframes/Tablet-HowToPlay-Dark.png)

## Features

### Theme Selector


### Dificulty Selector
The dificulty selector was created by using a Radio button provided by the Bootstrap library, I then added my own JavaScript to add functionality. This was achieved by calling jQuery when the button is clicked to call a function called difficulty thats value was determined by which button out of the radio buttons was selected.
When difficulty(value) is called a switch is used to run specific code depending on the value given at the time it was called, this runs other functions that hide or show features specific to each difficulty as well as setting the value of a variable called selectedDifficulty which allows other features to work.


### Instructions Modal


### The Game 
When the page loads the startGame() function is called which shuffles the cards in to a random order, when a card is clicked it has CSS classes added to it, flip which provides the card with its turning animation and displays the Font Awesome icon and disable which gives the card a pointer event of none so that the card can't be flipped multiple times.
The card is then pushed to the flippedCards array which is an empty array at the start of the game, it will then run the checkMatch() function but the parameters of the if() have not been met yet. Once another card has been selected the timer(easy)/diffTimer(med/hard) will begin and the moves counter will go up by 1 for every two cards flipped and the code will run again, this time there are two cards in the flippedCards array meaning that the parameters of the if() in the checkMatch() function has been met. The dataset type of both objects in the flippedCards array are then checked to see if they are identical, if they are then the match() function is called adding the matched class to the flipped cards and removing the class flip, then the contents of the flippedCards array are pushed to another currently empty array called matchedCards. The function complete() is then called but at this point the parameters of the if() within that function are not met. If the cards are not identical the notMatch() function is called adding the class not-match to the elements in the flippedCards array, which gives a visual sign to the user that the cards don't match, and removes the class flip from the elements in the flippedCards array. It then adds the class disable to all elements with the game-card class so that other cards can't be flipped and a Timeout function is set to wait 1100 miliseconds, after this time the classes not-match and disable are removed from all elements with the game-card class and then any elements that have the matched class have the disable class applied to them. This process is repeated until the parameters of the if() within the complete() function are met meaning that all cards are matched, the modal with the ID congratulations is shown, the 
timer(easy)/diffTimer(med/hard) interval is stopped and within the modal the time and moves taken to finish are shown as well as the players record time and moves which are stored in local storage so that they persist from session to session.


#### Medium Difficulty
Medium dificulty introduces the diffTimer, instead of starting at 0 and counting up this timer starts at 60 and counts down giving the user one minute to complete the game. When the counter reaches 30 the timer gives an indicator to the user that they are half way through their time by turning yellow, when the counter reaches 10 another visual indicator is given to the user that they are nearly out of time and it turns red. Once the timer reaches 0 the modal with the Id timeLoser appears showing the user that they have failed to complete the game due to running out of time and gives them the option to play again.

#### Hard Difficulty
Hard difficulty uses the timer introduced in Medium difficulty but also introduces a life mechanic, the user starts with 4 lives and every time they flip two cards that don't match they lose a life, every time they match two cards they gain a life this produces more pressure on the player who is already battling against the clock.

## Technologies Used

- This project uses **HTML**, **CSS** and **JavaScript** programming languages
- [**Visual Studio Code**]() was used as the development IDE
- [**Bootstrap**](https://getbootstrap.com/)
- [**FontAwesome**](https://fontawesome.com/)
- [**Google Fonts**](https://fonts.google.com/)
- [**JQuery**](https://jquery.com/)
- [**Popper.js**](https://popper.js.org/)
- this projects wireframes were created on [**Balsamiq**](https://balsamiq.com/)
- The HTML and CSS code were validated using the [**W3C Markup Validation Service**](https://validator.w3.org/) website

## Testing

### User Stories Tested

#### User with memory difficulties
**As someone who has difficulty remembering things, I would like to find a game that is entertaining, not too much of a challenge to begin with and will help to improve my memory.**


#### User exercising memory skills
**As a younger developing person I would benefit from exercising my memory, I woud like to find a way that will keep me entertained and allow me to control the difficulty that I am playing at.**



#### User looking for quick entertainemnt
**As someone who has some spare time on my hands I would like to find a game that doesn't require too much investment and can provide a quick source of entertainment.**


## Features Manual Testing

### Code Validation

- The **HTML** code was validated using [**W3C Markup Validation**](https://validator.w3.org/)
- The **CSS** code was validated using [**W3C CSS Validation**](https://jigsaw.w3.org/css-validator/)


### Further Testing

## Deployment

The Visual Studio Code IDE was used to develop this project and all work was added, commited and pushed to a GitHub repsitory.

GitHub pages was used to deploy this project using the following steps:

1. **Login** to GitHub
2. Select the **Repositories** tab
3. Select the **Milestone-project-1** repository
4. From the options near the top of the page select **Settings**
5. Scroll down to the section titled **GitHub Pages**
6. Under **Source** select the drop down menu and select **Master Branch**
7. The page will automatically refresh and the page is now **deployed**
8. Scroll back down to the GitHub Pages section to find the **URL**

**To deploy the page locally**

1. Use [**this**](https://github.com/OwenCookman/Milestoneproject2) link to go to the **repository**
2. Above the repository files select the green button that says **Clone or download**
3. Select the **copy to clip board** image next to the URL to copy the URL to your clip board
4. Using your **local IDE** open a **Git terminal**
5. Change the durectory to the location that you want to create the **cloned directory**
6. Type **git clone** and **paste** the URL you copied from GitHub

## Credits

I would like to credit user Alexey Lebedev on [**Stack Overflow**](https://stackoverflow.com/questions/7070054/javascript-shuffle-html-list-element-order?fbclid=IwAR1w-IDlqpvp22TWQQBhF4QQBndle4ikf6vEgWK4DIcW75yCZmN_m2jQY94) for the Shuffle function that was used in this project.

### Content


### Media


## Acknowledgements



*This project was created for educational purposes only*
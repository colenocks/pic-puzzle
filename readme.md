# PICTURE PUZZLE

### with Javascript

This simple javascript based game entails clicking on the back faces of the cards with images randomly ordered. A User clicks and flips the cards to find a match, the aim is to perform the lowest possible number of flips to get all cards turned/matched.

## Cards Shuffle Functionality

The images behind the cards are shuffled at random for each try. Due to unreliability and bias inherent in the `Array.prototype.sort` method, which may vary between JavaScript engines as proven in the article by [Ilya Kantor](https://javascript.info/task/shuffle), the shuffle functionality was implemented using the [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)- an algorithm for generating a random, unbiased permutation of a finite sequence. This permutation makes every element have an equal chance of being selected at random.

## Usage Instructions (VS Code)

### This project is run using the live server in visual studio code

1. Download the Zip file to your local repository.
2. Open with visual studio code.
3. Go to the index.html file, right click and select _Open with live server_
4. You can download the [Live Server Extension by Ritwick Dey](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), if you don't already have it.
5. Enjoy!

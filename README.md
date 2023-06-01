<img src="https://raw.githubusercontent.com/pranavgoel29/2048-game/main/src/assets/logo.png" alt="logo" width="20%" />

# 2048-Game

## Functions, components of the Game

- Initialize grid/matrix
- Swipes
  - Left
  - Right
  - Up
  - Down
- Check if → Game Over or Complete
  - Basically when no more moves are left (Not able to add numbers), e.g. → 2,4,8,2
- Reset if over

<br>
At First there will be two randomly placed 2s or 4s to start the game (Initial State)

    For Desktop we are using the arrow keys. →, ←, ↑, ↓

## 📦About Project

Tech Stack:

- React
- TypeScript
- Styled-Components (Add types, when using TS)
- Vite

<br>

I am trying to document how I progressed with the whole game development, attaching screenshots for reference.

<br>

<blockquote><b><i>Till this point we were able to have a initialization state of the game where we will either get two boxes with the random combination of 2 and 4.</i></b></blockquote>

![Initial state during developement](./screenshots/initial_state_developement.png)


<b>Generating 2D array just from Grid-Size to make it dynamic.</b>
&nbsp;


<blockquote><b><i>Adding Operation in one-direction, combined with swipe.</i></b></blockquote>
<img src="https://raw.githubusercontent.com/pranavgoel29/2048-game/main/screenshots/Adding_operation.gif" alt="Adding Operation" width="100%" height="100%" loop=infinite>

<br>

## 🐛Bug Reporting

Feel free to [open an issue](https://github.com/pranavgoel29/2048-Game/issues) on GitHub if you find any bug.

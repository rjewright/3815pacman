let gameAlreadyStarted = false

function startGame()  {
        
        if (gameAlreadyStarted == false)
        {
            var music = new Audio('sounds/music.wav')
            music.play()
            gameAlreadyStarted = true
            const scoreDisplay = document.getElementById('score')
            const width = 21
            let score = 0
            let dotsEaten = 0
            const grid = document.querySelector('.grid')
            const layout = [
                4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,
                4,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,4,
                4,1,3,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,3,1,4,
                4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,
                4,1,0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1,4,
                4,1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,4,
                4,1,1,1,1,0,1,1,1,4,1,4,1,1,1,0,1,1,1,1,4,
                4,4,4,4,1,0,1,4,4,4,4,4,4,4,1,0,1,4,4,4,4,
                1,1,1,1,1,0,1,4,1,1,2,1,1,4,1,0,1,1,1,1,1,
                4,4,4,4,4,0,4,4,1,4,2,4,1,4,4,0,4,4,4,4,4,
                1,1,1,1,1,0,1,4,1,1,1,1,1,4,1,0,1,1,1,1,1,
                4,4,4,4,1,0,1,4,4,4,4,4,4,4,1,0,1,4,4,4,4,
                4,1,1,1,1,0,1,4,1,1,1,1,1,4,1,0,1,1,1,1,4,
                4,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,4,
                4,1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1,4,
                4,1,3,0,1,0,0,0,0,0,4,0,0,0,0,0,1,0,3,1,4,
                4,1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1,4,
                4,1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,4,
                4,1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1,4,
                4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,
                4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,
                
            ]
            // 0 - dots
            // 1 - wall
            // 2 - ghost-lair
            // 3 - power-pellet
            // 4 - empty

            //add sounds

            var nom1 = new Audio('sounds/nom1.wav')
            var pellet = new Audio('sounds/pellet.wav')
            var music = new Audio('sounds/music.wav')
            var lose = new Audio('sounds/gameover.wav')
            var eatghost = new Audio('sounds/eatghost.wav')

            //variables for config page
            
            let pacmanSpeed = 150

            //new var to check if key hasn't been pressed in last few milliseconds

            let keyTimer = 0
            
            function loopMovePacman(){
                
            }

            function incrementTimer() {
                keyTimer = 0
            }
        
            const pixels = []
        
            //create your board
            function drawGame() {
            for (let i = 0; i < layout.length; i++) {
                const pixel = document.createElement('div')
                grid.appendChild(pixel)
                pixels.push(pixel)
        
                //add layout to the board
                if(layout[i] === 0) {
                pixels[i].classList.add('dot')
                } else if (layout[i] === 1) {
                pixels[i].classList.add('wall')
                } else if (layout[i] === 2) {
                pixels[i].classList.add('ghost-lair')
                } else if (layout[i] === 3) {
                pixels[i].classList.add('power-pellet')
                }
            }
            }
            drawGame()
        

            //create Characterss
            //draw pacman onto the board
            let pacmanCurrentIndex = 325
            pixels[pacmanCurrentIndex].classList.add('pac-man')
            //get the coordinates of pacman on the grid with X and Y axis
            function getCoordinates(index) {
            return [index % width, Math.floor(index / width)]
            }
        
            console.log(getCoordinates(pacmanCurrentIndex))
            
            //functions for moving pacman with onscreen buttons

            // function pacmanUp() {
            //     pixels[pacmanCurrentIndex].classList.remove('pac-man')
            //     if(
            //         pacmanCurrentIndex % width !== 0 &&
            //         !pixels[pacmanCurrentIndex -1].classList.contains('wall') &&
            //         !pixels[pacmanCurrentIndex -1].classList.contains('ghost-lair')
            //         )
            //     pacmanCurrentIndex -= 1
            //     if (pixels[pacmanCurrentIndex -1] === pixels[363]) {
            //         pacmanCurrentIndex = 391
            //     }
            // }

            // function pacmanDown() {
            //     pixels[pacmanCurrentIndex].classList.remove('pac-man')
            //     if(
            //         pacmanCurrentIndex - width >= 0 &&
            //         !pixels[pacmanCurrentIndex -width].classList.contains('wall') &&
            //         !pixels[pacmanCurrentIndex -width].classList.contains('ghost-lair')
            //         ) 
            //     pacmanCurrentIndex -= width
            // }

            // function pacmanLeft() {
            //     pixels[pacmanCurrentIndex].classList.remove('pac-man')
            //     if(
            //         pacmanCurrentIndex % width < width - 1 &&
            //         !pixels[pacmanCurrentIndex +1].classList.contains('wall') &&
            //         !pixels[pacmanCurrentIndex +1].classList.contains('ghost-lair')
            //     )
            //     pacmanCurrentIndex += 1
            //     if (pixels[pacmanCurrentIndex +1] === pixels[392]) {
            //         pacmanCurrentIndex = 364
            //     }
            // }

            // function pacmanRight() {
            //     pixels[pacmanCurrentIndex].classList.remove('pac-man')
            //     if (
            //         pacmanCurrentIndex + width < width * width &&
            //         !pixels[pacmanCurrentIndex +width].classList.contains('wall') &&
            //         !pixels[pacmanCurrentIndex +width].classList.contains('ghost-lair')
            //     )
            //     pacmanCurrentIndex += width
            // }


            //move pacman
            function movePacman(e) {
            console.log(e.keyCode)
            if (keyTimer == 0) {
                keyTimer = 1
                setTimeout(incrementTimer, pacmanSpeed);
                console.log(keyTimer)
                console.log(getCoordinates(pacmanCurrentIndex))
                pixels[pacmanCurrentIndex].classList.remove('pac-man')
                switch(e.keyCode) {
                    case 37:
                    if(
                        pacmanCurrentIndex % width !== 0 &&
                        !pixels[pacmanCurrentIndex -1].classList.contains('wall') &&
                        !pixels[pacmanCurrentIndex -1].classList.contains('ghost-lair')
                        )
                    pacmanCurrentIndex -= 1
                    if (pixels[pacmanCurrentIndex -1] === pixels[363]) {
                        pacmanCurrentIndex = 391
                    }
                    break
                    case 38:
                    if(
                        pacmanCurrentIndex - width >= 0 &&
                        !pixels[pacmanCurrentIndex -width].classList.contains('wall') &&
                        !pixels[pacmanCurrentIndex -width].classList.contains('ghost-lair')
                        ) 
                    pacmanCurrentIndex -= width
                    break
                    case 39:
                    if(
                        pacmanCurrentIndex % width < width - 1 &&
                        !pixels[pacmanCurrentIndex +1].classList.contains('wall') &&
                        !pixels[pacmanCurrentIndex +1].classList.contains('ghost-lair')
                    )
                    pacmanCurrentIndex += 1
                    if (pixels[pacmanCurrentIndex +1] === pixels[392]) {
                        pacmanCurrentIndex = 364
                    }
                    break
                    case 40:
                    if (
                        pacmanCurrentIndex + width < width * width &&
                        !pixels[pacmanCurrentIndex +width].classList.contains('wall') &&
                        !pixels[pacmanCurrentIndex +width].classList.contains('ghost-lair')
                    )
                    pacmanCurrentIndex += width
                    break
                    }
            }
            pixels[pacmanCurrentIndex].classList.add('pac-man')
            pacDotEaten()
            powerPelletEaten()
            checkForGameOver()
            checkForWin()
            pelletflashing()
            }
            document.addEventListener('keydown', movePacman)
            // document.getElementById("upBtn").addEventListener("click", pacmanUp)
            // document.getElementById("downBtn").addEventListener("click", pacmanDown)
            // document.getElementById("leftBtn").addEventListener("click", pacmanLeft)
            // document.getElementById("rightBtn").addEventListener("click", pacmanRight)
        
            // what happens when you eat a dot
            function pacDotEaten() {
            if (pixels[pacmanCurrentIndex].classList.contains('dot')) {
                score++
                dotsEaten++
                nom1.play()
                scoreDisplay.innerHTML = score
                pixels[pacmanCurrentIndex].classList.remove('dot')
            }
            }
        
            //what happens when you eat a power-pellet
            function powerPelletEaten() {
            if (pixels[pacmanCurrentIndex].classList.contains('power-pellet')) {
                pellet.volume = 0.4
                pellet.play()
                score +=10
                ghosts.forEach(ghost => ghost.isScared = true)
                setTimeout(unScareGhosts, 10000)
                pixels[pacmanCurrentIndex].classList.remove('power-pellet')
            }
            }
        
            //make the ghosts stop flashing
            function unScareGhosts() {
            ghosts.forEach(ghost => ghost.isScared = false)
            }
        
            //create ghosts using Constructors
            class Ghost {
            constructor(className, startIndex, speed) {
                this.className = className
                this.startIndex = startIndex
                this.speed = speed
                this.currentIndex = startIndex
                this.isScared = false
                this.timerId = NaN
            }
            }
        
            //all my ghosts
            ghosts = [
            new Ghost('blinky', 199, 300),
            new Ghost('pinky', 199, 670),
            new Ghost('inky', 199, 450),
            new Ghost('clyde', 199, 500)
            ]
        
            //draw my ghosts onto the grid
            ghosts.forEach(ghost => {
            pixels[ghost.currentIndex].classList.add(ghost.className)
            pixels[ghost.currentIndex].classList.add('ghost')
            })
        
            //loops through the ghost object and runs the move ghost function, 
            //for each specific ghost, the interval set determines how quickly they will be redrawn onto the map
            ghosts.forEach(ghost => moveGhost(ghost))
        
            function moveGhost(ghost) {
            const directions =  [-1, +1, width, -width]
            let direction = directions[Math.floor(Math.random() * directions.length)]
        
            ghost.timerId = setInterval(function() {

                //ghosts move out of the ghost lair right away

                //if the ghosts are in the lair
                if (pixels[ghost.currentIndex].classList.contains('ghost-lair')){
                    //they disappear
                    pixels[ghost.currentIndex].classList.remove(ghost.className)
                    pixels[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
                    //the position of them moves up
                    ghost.currentIndex -= width
                    //the ghost is readded on the next cycle (simulating movement)
                    pixels[ghost.currentIndex].classList.add(ghost.className, 'ghost')
                }
                
                //covering all other cases, once the ghosts are outside the lair
                else{
                    
                    //if the next place the ghost will go doesn't have a ghost, a wall or it isn't inside the ghost lair
                    if  (!pixels[ghost.currentIndex + direction].classList.contains('ghost') &&
                    !pixels[ghost.currentIndex + direction].classList.contains('wall') && 
                    !pixels[ghost.currentIndex + direction].classList.contains('ghost-lair')) {
                        //they disappear
                        pixels[ghost.currentIndex].classList.remove(ghost.className)
                        pixels[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
                        //the position of them moves up
                        ghost.currentIndex += direction
                        //the ghost is readded on the next cycle (simulating movement)
                        pixels[ghost.currentIndex].classList.add(ghost.className, 'ghost')

                    //if the predicted direction has something blocking it, such as one of three conditoins above, it will choose from one of the 4 potential directions
                    console.log(ghost.speed)
                    } else direction = directions[Math.floor(Math.random() * directions.length)]
            
                    //if the ghost is currently scared
                    if (ghost.isScared) {
                    pixels[ghost.currentIndex].classList.add('scared-ghost')
                    }
            
                    //if the ghost is currently scared and pacman is on it
                    if(ghost.isScared && pixels[ghost.currentIndex].classList.contains('pac-man')) {
                    pixels[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
                    ghost.currentIndex = ghost.startIndex
                    eatghost.play()
                    score +=100
                    pixels[ghost.currentIndex].classList.add(ghost.className, 'ghost')
                }
                }
            checkForGameOver()
            checkForWin()
            }, ghost.speed)
            }
        
            //check for a game over
            function checkForGameOver() {
            if (pixels[pacmanCurrentIndex].classList.contains('ghost') &&
                !pixels[pacmanCurrentIndex].classList.contains('scared-ghost')) {
                ghosts.forEach(ghost => clearInterval(ghost.timerId))
                document.removeEventListener('keydown', movePacman)
                music.pause()
                lose.play()
                setTimeout(function(){ alert("Game Over"); }, 500)
            }
            }
        
            //check for a win - more is when this score is reached
            function checkForWin() {
            if (dotsEaten >= 146) {
                ghosts.forEach(ghost => clearInterval(ghost.timerId))
                document.removeEventListener('keydown', movePacman)
                setTimeout(function(){ alert('New Highscore!!: ' + score); }, 500)
                setTimeout(function(){window.location.reload()},4000)
            }
            }
        }
    }

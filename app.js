let gameAlreadyStarted = false

function startGame()  {
        
        if (gameAlreadyStarted == false)
        {
            var music = new Audio('sounds/music.wav')
            music.play()
            gameAlreadyStarted = true
            const scoreDisplay = document.getElementById('score')
            const width = 21
            const height = 21
            let numofDots = 0
            const totalLocations = width*height
            let score = 0
            let dotsEaten = 0
            const grid = document.querySelector('.grid')
            const layout = []
            // const layout = [
            //     [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4],
            //     [4,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,4],
            //     [4,1,3,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,3,1,4],
            //     [4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4],
            //     [4,1,0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1,4],
            //     [4,1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,4],
            //     [4,1,1,1,1,0,1,1,1,4,1,4,1,1,1,0,1,1,1,1,4],
            //     [4,4,4,4,1,0,1,4,4,4,4,4,4,4,1,0,1,4,4,4,4],
            //     [1,1,1,1,1,0,1,4,1,1,2,1,1,4,1,0,1,1,1,1,1],
            //     [4,4,4,4,4,0,4,4,1,4,2,4,1,4,4,0,4,4,4,4,4],
            //     [1,1,1,1,1,0,1,4,1,1,1,1,1,4,1,0,1,1,1,1,1],
            //     [4,4,4,4,1,0,1,4,4,4,4,4,4,4,1,0,1,4,4,4,4],
            //     [4,1,1,1,1,0,1,4,1,1,1,1,1,4,1,0,1,1,1,1,4],
            //     [4,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,4],
            //     [4,1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1,4],
            //     [4,1,3,0,1,0,0,0,0,0,4,0,0,0,0,0,1,0,3,1,4],
            //     [4,1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1,4],
            //     [4,1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,4],
            //     [4,1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1,4],
            //     [4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4],
            //     [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4],
                
            // ]
            // 0 - dots
            // 1 - wall
            // 2 - ghost-lair
            // 3 - power-pellet
            // 4 - empty=

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
            

            function incrementTimer() {
                keyTimer = 0
            }
        
            const pixels = []
            
            function mirrorPrefabHorizontally(prefab)
            {
                let x = 0
                for (let i = prefab.length -1; i >= 0; i--)
                {
                prefab[i] = prefab[i].reverse()
                }
                return prefab
            }
            
            function mirrorPrefabVertically(prefab)
            {
                prefab = mirrorPrefabHorizontally(prefab).reverse()
                
                return prefab
            }
            
            function drawPrefabOntoLayout(prefab, layout, offsetX, offsetY)
            {
                prefab.forEach(function(prefabRow, rowIndex)
                {
                    prefabRow.forEach(function(prefabCol, colIndex)
                    {
                        layout[rowIndex + offsetY][colIndex + offsetX] = prefabCol
                    })
                })
            }

            // 
            function createLayout()
            {
                // Create initial walled layout
                for (let i = 0; i < height; i++)
                {
                    let row = []
                    
                    for (let j = 0; j < width; j++)
                    {
                        // top and bottom walls
                        if(i == 0 || i == height-1)
                        {
                            row.push(1)
                        }
                        // left and right walls
                        else if (j == 0 || j == width-1)
                        {
                            row.push(1)
                        }
                        // space between walls
                        else
                        {
                            row.push(1)
                        }
                    }
                    
                    layout.push(row)
                }
                //prefab for the lair

                const lair = [
                        [1,1,1,1,1],
                        [4,4,4,4,4],
                        [4,1,2,1,4],
                        [4,1,2,1,4],
                        [4,1,1,1,4],
                        [4,4,4,4,4],
                    ]
            
                //prefabricated layout, plan is to mirror them vertically or horizontally depending on which position in the map they will be place in
                const prefab1 = [
                        [1,3,0,0,0,0,0,0,0],
                        [1,0,1,1,0,1,1,1,0],
                        [1,0,0,0,3,0,0,0,0],
                        [1,0,1,1,0,1,0,1,0],
                        [0,0,0,0,0,1,0,0,0],
                        [1,1,1,1,4,1,1,1,0],
                        [1,1,1,1,4,1,4,4,4],
                        [1,1,1,1,4,1,4,1,1],
                        [1,1,1,1,4,1,4,1,1],
                    ]
                
                const prefab2 = [
                        [3,0,0,0,0,1,1,0,0],
                        [0,1,1,1,0,1,1,0,1],
                        [0,0,0,1,0,0,0,0,1],
                        [0,1,0,1,0,1,0,1,1],
                        [0,0,3,1,4,4,4,4,4],
                        [0,1,1,1,4,1,1,1,1],
                        [0,0,0,0,4,1,4,4,4],
                        [1,1,1,1,4,1,4,1,1],
                        [1,1,1,1,4,1,4,1,4],
                    ]

                const prefab3 = [
                        [0,0,0,0,0,0,0,0,0],
                        [0,1,1,0,1,0,1,1,0],
                        [0,1,1,0,1,0,1,1,0],
                        [0,0,0,3,1,0,0,0,0],
                        [0,1,1,1,1,1,1,1,0],
                        [0,0,0,0,1,3,0,0,0],
                        [0,1,1,0,1,0,1,1,1],
                        [0,1,1,0,1,0,1,1,1],
                        [0,0,0,0,0,0,1,1,1],
                    ]

                const prefab4 = [
                        [0,0,0,0,0,0,0,0,0],
                        [0,1,0,1,0,1,0,1,0],
                        [0,1,0,0,0,1,0,1,0],
                        [0,1,1,1,3,0,0,0,0],
                        [0,1,4,1,1,1,1,1,0],
                        [0,1,1,1,3,0,0,0,1],
                        [0,0,0,0,0,1,1,0,1],
                        [1,0,1,0,0,0,0,0,1],
                        [1,0,0,0,0,1,1,1,1],
                    ]
                
                // const prefab2 = [...prefab1]
                // const prefab3 = [...prefab1]
                // const prefab4 = [...prefab1]
                
                const prefabs = [prefab1, prefab2, prefab3, prefab4]
                
                // Place prefabs
                const prefabWidth = (width - 3) / 2
                const prefabHeight = (height - 3) / 2
                // prefab slot positions are the offset of the top left corner of the prefab onto the map
                const prefabSlot1XPos = 1
                const prefabSlot1YPos = 1
                const prefabSlot2XPos = Math.round(width / 2)
                const prefabSlot2YPos = 1
                const prefabSlot3XPos = 1
                const prefabSlot3YPos = Math.round(height/2)
                const prefabSlot4XPos = Math.round(width/2)
                const prefabSlot4YPos = Math.round(height/2)
                
                
                // Figure out what you want to do here
                // Note: these functions don't do anything yet, but you can implement them later if you wish
                //mirrorPrefabHorizontally(prefab1)
                //mirrorPrefabVertically(prefab2)
                
                // Non random test
                // drawPrefabOntoLayout(prefab1, layout, prefabSlot1XPos, prefabSlot1YPos);
                // drawPrefabOntoLayout(prefab2, layout, prefabSlot2XPos, prefabSlot2YPos);
                // drawPrefabOntoLayout(prefab3, layout, prefabSlot3XPos, prefabSlot3YPos);
                // drawPrefabOntoLayout(prefab4, layout, prefabSlot4XPos, prefabSlot4YPos);
                // Random test

                let topPrefab = prefabs[Math.floor(Math.random()*4)]
                let botPrefab = prefabs[Math.floor(Math.random()*4)]
                //ensure bot prefab is different from top prefab
                while (topPrefab == botPrefab)
                {
                    botPrefab = prefabs[Math.floor(Math.random()*4)]
                }
                
                drawPrefabOntoLayout(topPrefab, layout, prefabSlot1XPos, prefabSlot1YPos)
                drawPrefabOntoLayout(mirrorPrefabHorizontally(topPrefab), layout, prefabSlot2XPos, prefabSlot2YPos)
                drawPrefabOntoLayout(mirrorPrefabHorizontally(mirrorPrefabVertically(botPrefab)), layout, prefabSlot3XPos, prefabSlot3YPos)
                drawPrefabOntoLayout(mirrorPrefabHorizontally(botPrefab), layout, prefabSlot4XPos, prefabSlot4YPos)
                
                // Place interconnects
                
                layout[10][5] = 4
                layout[10][15] = 4
                layout[5][10] = 4
                layout[15][10] = 4
                // layout[9 + 21*4] = 3
                // layout[9 + 21*9] = 3
                // layout[5 + 21*9] = 3
                // layout[9 + 21*14] = 3
                
                // Place lair
                
                drawPrefabOntoLayout(lair, layout, 8, 6)
                
                // layout[i] = 4
                
                //push top [411111111111111111114]
                //push bottom [411111111111111111114]
                
                //at the end of generation, overrwrite location 179 and location 200
                //if (i == 179 || i == 200){
                //layout[i] = 2 
                //}

                
                
                // Other stuff
                
                
                // Dots
                // while num of dots to put in level is larger than 0
                    // find a random spot that is an empty space, and turn it into a dot
                    // num of dots to put in level -= 1
            }
            //creates a random layout
            createLayout()

            //create your board
            
            function drawGame(){
                
                let i = 0;
                
                layout.forEach(function(layoutRow, rowIndex)
                {
                    layoutRow.forEach(function(layoutCol, colIndex)
                    {
                        const pixel = document.createElement('div')
                        grid.appendChild(pixel)
                        pixels.push(pixel)
                        
                        if (layoutCol === 0) {
                            pixels[i].classList.add('dot')
                            numofDots++
                        }
                        if (layoutCol === 1) {
                            pixels[i].classList.add('wall')
                        }
                        if (layoutCol === 2) {
                            pixels[i].classList.add('ghost-lair')
                        }
                        if (layoutCol === 3) {
                            pixels[i].classList.add('power-pellet')
                        }
                        
                        i++;
                    })
                })
            } 
            
            // function drawGame() {
            //     for (let i = 0; i < layout.length; i++) {
            //         const pixel = document.createElement('div')
            //         grid.appendChild(pixel)
            //         pixels.push(pixel)
                    
            //         //add layout to the board
            //         if(layout[i] === 0) {
            //         pixels[i].classList.add('dot')
            //         } else if (layout[i] === 1) {
            //         pixels[i].classList.add('wall')
            //         } else if (layout[i] === 2) {
            //         pixels[i].classList.add('ghost-lair')
            //         } else if (layout[i] === 3) {
            //         pixels[i].classList.add('power-pellet')
            //         }
            //     }
            // }
            drawGame()
        

            //create Characterss
            //draw pacman onto the board
            let pacmanCurrentIndex = 325
            pixels[pacmanCurrentIndex].classList.add('pac-man')
            //get the coordinates of pacman on the grid with X and Y axis

            function getCoordinates(index) {
                return [index % width, Math.floor(index / width)]
            }
            
            function getRow(index)
            {
                return Math.floor(index / width)
            }

            function getColumn(index)
            {
                return index % width
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

            //find pacman current row
            
            
            // function pacmancurrentRow(pacmanIndex)
            // {
            //     let x = 1;
            //     let pacmanRow = null
            //     while  (x != height)
            //     {
            //         if (pacmanIndex < (x * width) && pacmanIndex > (x * width - width)){
            //             pacmanRow = x
            //         }
            //     }
            //     x++
            //     return pacmanRow
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
            
            const directions = [-1, +1, width, -width]
        
            //create ghosts using Constructors
            class Ghost {
                constructor(className, startIndex, speed) {
                    this.className = className
                    this.startIndex = startIndex
                    this.speed = speed
                    this.currentIndex = startIndex
                    this.isScared = false
                    this.timerId = NaN
                    this.direction = 0
                    this.lastDirection = 0
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
                ghost.timerId = setInterval(function() {
                    
                    //if direction isn't set yet, give it a random direction
                    if(ghost.direction == 0)
                    {
                        lastDirection = ghost.direction
                        ghost.direction = directions[Math.floor(Math.random() * directions.length)]
                    }

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
                        
                        return;
                    }
                    
                    //if the ghosts is currently moving in a direction and the next space is free, keep moving in that direction
                    if (
                        !pixels[ghost.currentIndex + ghost.direction].classList.contains('ghost') &&
                        !pixels[ghost.currentIndex + ghost.direction].classList.contains('wall') && 
                        !pixels[ghost.currentIndex + ghost.direction].classList.contains('ghost-lair')
                        )
                    {
                        //stop drawing the ghost in the old position
                        pixels[ghost.currentIndex].classList.remove(ghost.className)
                        pixels[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
                        //move the ghost to the new position
                        ghost.currentIndex += ghost.direction
                        //draw the ghost in the new position (simulating movement)
                        pixels[ghost.currentIndex].classList.add(ghost.className, 'ghost')

                        //if the predicted direction has something blocking it, such as one of three conditoins above, it will choose from one of the 4 potential directions
                        // console.log(ghost.speed)
                    }

                    //if the ghost has to pick a new direction, try to move towards the player, but try not to move backwards
                    else if(getRow(pacmanCurrentIndex) > getRow(ghost.currentIndex) && ghost.lastDirection != directions[2])
                    {
                        console.log(`${ghost.className} is moving down`)
                        ghost.lastDirection = ghost.direction
                        ghost.direction = directions[2]
                    }
                    else if(getRow(pacmanCurrentIndex) < getRow(ghost.currentIndex) && ghost.lastDirection != directions[3])
                    {
                        console.log(`${ghost.className} is moving up`)
                        ghost.lastDirection = ghost.direction
                        ghost.direction = directions[3]
                    }
                    else if(getColumn(pacmanCurrentIndex) > getColumn(ghost.currentIndex) && ghost.lastDirection != directions[1])
                    {
                        console.log(`${ghost.className} is moving right`)
                        ghost.lastDirection = ghost.direction
                        ghost.direction = directions[1]
                    }
                    else if(getColumn(pacmanCurrentIndex) < getColumn(ghost.currentIndex) && ghost.lastDirection != directions[0])
                    {
                        console.log(`${ghost.className} is moving left`)
                        ghost.lastDirection = ghost.direction
                        ghost.direction = directions[0]
                    }
                    else
                    {
                        console.log(`${ghost.className} is moving randomly`)
                        ghost.lastDirection = ghost.direction
                        ghost.direction = 0 // will be set to random on next loop
                    }
                    
                    //debugging ghost movement
                    // console.log({
                    //     ghost: ghost.className,
                    //     pacmanColumn: getColumn(pacmanCurrentIndex),
                    //     ghostColumn: getColumn(ghost.currentIndex),
                    //     pacmanRow: getRow(pacmanCurrentIndex),
                    //     ghostRow: getRow(ghost.currentIndex),
                    //     lastDirection: ghost.lastDirection,
                    //     direction: ghost.direction
                    // })
                    
                    
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
                if (dotsEaten >= numofDots) {
                    ghosts.forEach(ghost => clearInterval(ghost.timerId))
                    document.removeEventListener('keydown', movePacman)
                    setTimeout(function(){ alert('New Highscore!!: ' + score); }, 500)
                    setTimeout(function(){window.location.reload()},4000)
                }
            }
        }
    }

// Color Blast!
// License MIT
// © 2014 Nate Wiley

(function(window){

    let Game = {
    
        init: function(){
            this.c = document.getElementById("game");
            this.c.width = this.c.width;
            this.c.height = this.c.height;
            this.ctx = this.c.getContext("2d");
            this.color = "rgba(20,20,20,.7)";
            this.bullets = [];
            this.enemyBullets = [];
            this.enemies = [];
            this.particles = [];
            this.bulletIndex = 0;
            this.enemyBulletIndex = 0;
            this.enemyIndex = 0;
            this.particleIndex = 0;
            this.maxParticles = 50;
            this.maxEnemies = 7;
            this.enemiesAlive = 0;
            this.currentFrame = 0;
            this.maxLives = 1;
            this.life = 0;
            this.binding();
            this.player = new Player();
            this.score = 0;
            this.paused = false;
            this.shooting = false;
            this.oneShot = false;
            this.isGameOver = false;
         this.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
            for(let i = 0; i<this.maxEnemies; i++){
                new Enemy();
                this.enemiesAlive++;
            }
            this.invincibleMode(1000);
    
            this.loop();
        },
    
        binding: function(){
            window.addEventListener("keydown", this.buttonDown);
            window.addEventListener("keyup", this.buttonUp);
            window.addEventListener("keypress", this.keyPressed);
            this.c.addEventListener("click", this.clicked);
        },
    
        clicked: function(){
            if(!Game.paused) {
                Game.pause();
            } else {
                if(Game.isGameOver){
                    Game.init();
                } else {
                    Game.unPause();
                    Game.loop();
                    Game.invincibleMode(1000);
                }
            }
        },
    
        keyPressed: function(e){
            if(e.keyCode === 32){
                if(!Game.player.invincible  && !Game.oneShot){
                    Game.player.shoot();
                    Game.oneShot = true;
                }
                if(Game.isGameOver){
                    Game.init();
                }
          e.preventDefault();
            }
        },
    
        buttonUp: function(e){
            if(e.keyCode === 32){
                Game.shooting = false;
                Game.oneShot = false;
            e.preventDefault();
            }
            if(e.keyCode === 37 || e.keyCode === 65){
                Game.player.movingLeft = false;
            }
            if(e.keyCode === 39 || e.keyCode === 68){
                Game.player.movingRight = false;
            }
        },
    
        buttonDown: function(e){
            let i=0;
            if(e.keyCode === 32){
            i++;
            if(i==2){
            if(e.keyCode === 32){
                Game.shooting = true;
            }
        }
        i=0;
    }
        if(e.keyCode === 37 || e.keyCode === 65){
            setTimeout(
            Game.player.movingLeft = true,2000)
        }
        if(e.keyCode === 39 || e.keyCode === 68){
            Game.player.movingRight = true;
        }
        },
    
        random: function(min, max){
        return Math.floor(Math.random() * (max - min) + min);
      },
    
      invincibleMode: function(s){
          this.player.invincible = true;
          setTimeout(function(){
              Game.player.invincible = false;
          }, s);
      },
    
      collision: function(a, b){
            return !(
            ((a.y + a.height) < (b.y)) ||
            (a.y > (b.y + b.height)) ||
            ((a.x + a.width) < b.x) ||
            (a.x > (b.x + b.width))
            )
        },
    
      clear: function(){
          this.ctx.fillStyle = Game.color;
          this.ctx.fillRect(0, 0, this.c.width, this.c.height);
      },
       
      pause: function(){
            this.paused = true;
      },
    
      unPause: function(){
            this.paused = false;
      },
    
    
      gameOver: function(){
          this.isGameOver = true;
          this.clear();
          let message = "Game Over";
          let message2 = "Score: " + Game.score;
          let message3 = "Click or press Spacebar to Play Again";
          this.pause();
          this.ctx.fillStyle = "white";
          this.ctx.font = "bold 30px Lato, sans-serif";
          this.ctx.fillText(message, this.c.width/2 - this.ctx.measureText(message).width/2, this.c.height/2 - 50);
          this.ctx.fillText(message2, this.c.width/2 - this.ctx.measureText(message2).width/2, this.c.height/2 - 5);
          this.ctx.font = "bold 16px Lato, sans-serif";
          this.ctx.fillText(message3, this.c.width/2 - this.ctx.measureText(message3).width/2, this.c.height/2 + 30);
      },
    
      updateScore: function(){
          this.ctx.fillStyle = "white";
          this.ctx.font = "16px Lato, sans-serif";
          this.ctx.fillText("Score: " + this.score, 8, 20);
          if(this.score>=600){
              window.location="http://127.0.0.1:5500/done.html"
              localStorage.setItem("done","true");
          }
          this.ctx.fillText("Lives: " + (this.maxLives - this.life), 8, 40);
      },
      
        loop: function(){
            if(!Game.paused){
                Game.clear();
                for(let i in Game.enemies){
                    let currentEnemy = Game.enemies[i];
                    currentEnemy.draw();
                    currentEnemy.update();
                    if(Game.currentFrame % currentEnemy.shootingSpeed === 0){
                        currentEnemy.shoot();
                    }
                }
                for(let x in Game.enemyBullets){
                    Game.enemyBullets[x].draw();
                    Game.enemyBullets[x].update();
                }
                for(let z in Game.bullets){
                    Game.bullets[z].draw();
                    Game.bullets[z].update();
                }
                if(Game.player.invincible){
                    if(Game.currentFrame % 20 === 0){
                        Game.player.draw();
                    }
                } else {
                    Game.player.draw();
                }
    
            for(let i in Game.particles){
              Game.particles[i].draw();
            }
                Game.player.update();
                Game.updateScore();
                Game.currentFrame = Game.requestAnimationFrame.call(window, Game.loop);
            }
        }
    
    };
    
    
    
    
    
    
    let Player = function(){
        this.width = 20;
        this.height = 20;
        this.x = Game.c.width/2 - this.width/2;
        this.y = Game.c.height - this.height;
        this.movingLeft = false;
        this.movingRight = false;
        this.speed = 7;
        this.invincible = false;
        this.color = "hsl("+ Game.random(0, 360) +", 40%, 60%)";
    };
    
    
    Player.prototype.die = function(){
        if(Game.life < Game.maxLives){
            Game.invincibleMode(2000);  
             Game.life++;
        } else {
            Game.pause();
            Game.gameOver();
        }
    };
    
    
    Player.prototype.draw = function(){
        Game.ctx.fillStyle = this.color;
        Game.ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    
    
    Player.prototype.update = function(){
        if(this.movingLeft && this.x > 0){
            this.x -= this.speed;
        }
        if(this.movingRight && this.x + this.width < Game.c.width){
            this.x += this.speed;
        }
        if(Game.shooting && Game.currentFrame % 10 === 0){
            this.shoot();
        }
        for(let i in Game.enemyBullets){
            let currentBullet = Game.enemyBullets[i];
            if(Game.collision(currentBullet, this) && !Game.player.invincible){
                this.die();
                delete Game.enemyBullets[i];
            }
        }
    };
    
    
    Player.prototype.shoot = function(){
        Game.bullets[Game.bulletIndex] = new Bullet(this.x + this.width/2);
        Game.bulletIndex++;
    };
    
    
    
    
    
    
    let Bullet = function(x){  
        this.width = 90;
        this.height = 1;
        this.x = x;
        this.y = Game.c.height - 10;
        this.vy = 19;
        this.index = Game.bulletIndex;
        this.active = true;
        this.color = "hsl("+ Game.random(0, 360) +", 25%, 40%)";
        
    };
    
    
    Bullet.prototype.draw = function(){
        Game.ctx.fillStyle = this.color;
        Game.ctx.fillText("▲",this.x,this.y,this.width,this.height)
    };
    
    
    Bullet.prototype.update = function(){
        this.y -= this.vy;
        if(this.y < 0){
            delete Game.bullets[this.index];
        }
    };
    
    
    
    
    
    
    let Enemy = function(){
        this.width = 95;
        this.height = 30;
        this.x = Game.random(0, (Game.c.width - this.width));
        this.y = Game.random(10, 200);
        this.vy = Game.random(1, 3) * .1;
        this.index = Game.enemyIndex;
        Game.enemies[Game.enemyIndex] = this;
        Game.enemyIndex++;
        this.speed = Game.random(9, 11);
        this.shootingSpeed = Game.random(65, 75);
        this.movingLeft = Math.random() < 0.5 ? true : false;
        this.color = "hsl("+ Game.random(0, 360) +", 60%, 50%)";
        
    };
    
    
    Enemy.prototype.draw = function(){
        Game.ctx.fillStyle = this.color;
        Game.ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    
    
    Enemy.prototype.update = function(){
        if(this.movingLeft){
            if(this.x > 0){
                this.x -= this.speed;
                this.y += this.vy;
            } else {
                this.movingLeft = false;
            }
        } else {
            if(this.x + this.width < Game.c.width){
                this.x += this.speed;
                this.y += this.vy;
            } else {
                this.movingLeft = true;
            }
        }
        
        for(let i in Game.bullets){
            let currentBullet = Game.bullets[i];
            if(Game.collision(currentBullet, this)){
                this.die();
                delete Game.bullets[i];
            }
        } 
    };
    
    Enemy.prototype.die = function(){
      this.explode();
      delete Game.enemies[this.index];
      Game.score += 15;
      Game.enemiesAlive = Game.enemiesAlive > 1 ? Game.enemiesAlive - 1 : 0;
      if(Game.enemiesAlive < Game.maxEnemies){
          Game.enemiesAlive++;
          setTimeout(function(){
              new Enemy();
          }, 500);
        }
      
    };
    
    Enemy.prototype.explode = function(){
        for(let i=0; i<Game.maxParticles; i++){
        new Particle(this.x + this.width/2+50, this.y, this.color);
        new Particle(this.x + this.width/2, this.y, this.color);
        new Particle(this.x + this.width/2-50, this.y, this.color);
      }
    };
    
    Enemy.prototype.shoot = function(){
        new EnemyBullet(this.x + this.width/2-50, this.y, this.color);
        new EnemyBullet(this.x + this.width/2+50, this.y, this.color);
    };
    
    let EnemyBullet = function(x, y, color){
        this.width = 20;
        this.height = 20;
        this.x = x;
        this.y = y;
        this.vy = 7.5;
        this.color = color;
        this.index = Game.enemyBulletIndex;
        Game.enemyBullets[Game.enemyBulletIndex] = this;
        Game.enemyBulletIndex++;
    };
    
    EnemyBullet.prototype.draw = function(){
        Game.ctx.fillStyle = this.color;
        Game.ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    
    EnemyBullet.prototype.update = function(){
        this.y += this.vy;
        if(this.y > Game.c.height){
            delete Game.enemyBullets[this.index];
        }
    };
    
    
    
    
    let Particle = function(x, y, color){
        this.x = x;
        this.y = y;
        this.vx = Game.random(-30, 30);
        this.vy = Game.random(-30, 30);
        this.color = color || "orange";
        Game.particles[Game.particleIndex] = this;
        this.id = Game.particleIndex;
        Game.particleIndex++;
        this.life = 0;
        this.gravity = .01;
        this.size = Math.floor(Math.random(35)*40);
        this.maxlife = 10000000000;
      }
    
      Particle.prototype.draw = function(){
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.size *=.90;
        Game.ctx.fillStyle = this.color;
        Game.ctx.fillRect(this.x, this.y, this.size, this.size);
        this.life++;
        if(this.life >= this.maxlife){
          delete Game.particles[this.id];
        }
      };
    
    Game.init();
    
    
    }(window));
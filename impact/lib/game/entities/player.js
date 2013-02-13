ig.module(
  'game.entities.player'
).requires(
  'impact.entity',
	'game.entities.chatbubble',
  'impact.debug.debug'  
).defines(function() {
	
	 EntityPlayer = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/player.png', 16, 16 ),
        size: {x: 8, y:14},
        offset: {x: 4, y: 2},
        flip: false,
        maxVel: {x: 100, y: 150},
        friction: {x: 600, y: 0},
        accelGround: 400,
        accelAir: 200,
        jump: 200,
        init: function( x, y, settings ) {
          this.parent( x, y, settings );
          this.addAnim( 'idle', 1, [0] );
          this.addAnim( 'run', 0.07, [0,1,2,3,4,5] );
          this.addAnim( 'jump', 1, [9] );
          this.addAnim( 'fall', 0.4, [6,7] );
        },
        update: function() {
        // move left or right
        var accel = this.standing ? this.accelGround : this.accelAir;
        if( ig.input.state('left') ) {
          this.accel.x = -accel;
          this.flip = true;
        }else if( ig.input.state('right') ) {
          this.accel.x = accel;
          this.flip = false;
        }else{
          this.accel.x = 0;
        }
        // jump
        if( this.standing && ig.input.pressed('jump') ) {
        this.vel.y = -this.jump; }
        // set the current animation, based on the player's speed
        if( this.vel.y < 0 ) {
          this.currentAnim = this.anims.jump;
        } else if( this.vel.y > 0 ) {
            this.currentAnim = this.anims.fall;
        }else if( this.vel.x != 0 ) {
            this.currentAnim = this.anims.run;
        }else{
            this.currentAnim = this.anims.idle;
        }
        //speech
        if( ig.input.pressed('speak') ) {
          if(!ig.game.getEntityByName('playerBubble')) {
            var parameters = {text: 'I pwn.', tracks: 'player1', margin: 20, lifeSpan: 5, shape: 'square', name: 'playerBubble'};
            ig.game.spawnEntity(EntityChatbubble, 0, 0, parameters);
          }
        }
        //flipping
        this.currentAnim.flip.x = this.flip;
        // move!
        this.parent();
        },
        });
});
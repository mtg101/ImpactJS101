ig.module(
  'game.entities.monster'
).requires(
  'impact.entity',
	'game.entities.chatbubble'
).defines(function() {
	
	 EntityMonster = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/zombie.png', 16, 16 ),
        size: {x: 8, y:14},
        offset: {x: 4, y: 2},
        flip: false,
        friction: {x: 150, y: 0},
        speed: 14,
        maxVel: {x: 100, y: 150},
        init: function( x, y, settings ) {
          this.parent( x, y, settings );
          this.addAnim( 'walk', 0.04, [0,1,2,3,4,5] );
        },
        update: function() {
          // near an edge? turn around!
          if( !ig.game.collisionMap.getTile(this.pos.x + (this.flip ? +4 : this.size.x -4), this.pos.y + this.size.y+1) ) {
              this.flip = !this.flip;
          }
          var xdir = this.flip ? -1 : 1;
          this.vel.x = this.speed * xdir;
          this.currentAnim.flip.x = this.flip;
          this.speak();
          this.parent();
        },
        speak: function() {
          if (Math.random() < .01) {
            var bubbleName = this.name + 'Bubble';
            if(!ig.game.getEntityByName(bubbleName)) {
              var parameters = {text: 'BRAINS!', tracks: this.name, margin: 0, lifeSpan: 0, shape: 'square', name: bubbleName, color:[30,70,30]};
              ig.game.spawnEntity(EntityChatbubble, 0, 0, parameters);
            }
          }
        },
        handleMovementTrace: function( res ) {
          this.parent( res );
          // collision with a wall? turn around!
          if( res.collision.x ) {
            this.flip = !this.flip;
          }
        }
   });
});
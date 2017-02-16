import Phaser from 'phaser'

/*
Rope Sprie Class
*/

this.anchor.setTo(0.5);

export default class extends Phaser.Sprite {

    constructor ({length, xAnchor, yAnchor}) {

        super(length, xAnchor, yAnchor);

        let lastRect;

        //  Height for the physics body - your image height is 8px
        this.height = 20;

        //  This is the width for the physics body. If too small the rectangles will get scrambled together.
        this.width = 16;

        //  The force that holds the rectangles together.
        this.maxForce = 20000;

    }

    createRope (length, xAnchor, yAnchor) {

        let lastRect;
        let height = 20;        //  Height for the physics body - your image height is 8px
        let width = 16;         //  This is the width for the physics body. If too small the rectangles will get scrambled together.
        let maxForce = 20000;   //  The force that holds the rectangles together.

        for (let i = 0; i <= length; i++)
        {
            let x = xAnchor;                    //  All rects are on the same x position
            let y = yAnchor + (i * height);     //  Every new rect is positioned below the last

            if (i % 2 === 0)
            {
                //  Add sprite (and switch frame every 2nd time)
                newRect = game.add.sprite(x, y, 'chain', 1);
            }
            else
            {
                newRect = game.add.sprite(x, y, 'chain', 0);
                lastRect.bringToTop();
            }

            //  Enable physicsbody
            game.physics.p2.enable(newRect, false);

            //  Set custom rectangle
            newRect.body.setRectangle(width, height);

            if (i === 0)
            {
                newRect.body.static = true;
            }
            else
            {
                //  Anchor the first one created
                newRect.body.velocity.x = 400;      //  Give it a push :) just for fun
                newRect.body.mass = length / i;     //  Reduce mass for evey rope element
            }

            //  After the first rectangle is created we can add the constraint
            if (lastRect)
            {
                game.physics.p2.createRevoluteConstraint(newRect, [0, -10], lastRect, [0, 10], maxForce);
            }

            lastRect = newRect;

        }

    }


}

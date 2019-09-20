// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Runner = Matter.Runner,
    Common = Matter.Common,
    Vertices = Matter.Vertices,
    Svg = Matter.Svg;

// create an engine
var engine = Engine.create(),
     world = engine.world;

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, ground]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

var runner = Runner.create();
Runner.run(runner, engine);
var svgs = ['Subtract'];
console.log("bad");
if (typeof $ !== 'undefined') {
    console.log("good");
    for (var i = 0; i < svgs.length; i += 1) {
        (function(i) {
            $.get('./svg/' + svgs[i] + '.svg').done(function(data) {
                var vertexSets = [],
                    color = Common.choose(['#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58']);

                $(data).find('path').each(function(i, path) {
                    var points = Svg.pathToVertices(path, 10);
                    vertexSets.push(Vertices.scale(points, .5, 0.5));
                });

                console.log(vertexSets);


                World.add(world, Bodies.fromVertices(250 + i * 150, 200 + i * 50, vertexSets, {
                    render: {
                        fillStyle: color,
                        strokeStyle: color,
                        lineWidth: 1
                    }
                }, true,0.00001,0.000001));
            });
        })(i);
    }

    $.get('./svg/svg.svg').done(function(data) {
        var vertexSets = [],
            color = Common.choose(['#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58']);

        $(data).find('path').each(function(i, path) {
            vertexSets.push(Svg.pathToVertices(path, 20));
        });

        World.add(world, Bodies.fromVertices(400, 80, vertexSets, minimumArea=10, {
            render: {
                fillStyle: color,
                strokeStyle: color,
                lineWidth: 1
            }
        }, true));
    });
}
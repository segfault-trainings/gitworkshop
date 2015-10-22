var container;

var camera, scene, renderer, objects;
var particleLight;

init();
animate();

function init( )
{
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.set( 0, 200, 0 );

    scene = new THREE.Scene();

    // Materials

    var shading = THREE.SmoothShading;

    var materials = [];


    var imgTexture2 = THREE.ImageUtils.loadTexture( "moon_1024.jpg" );
    imgTexture2.wrapS = imgTexture2.wrapT = THREE.RepeatWrapping;
    imgTexture2.anisotropy = 16;

    materials.push( new THREE.MeshPhongMaterial( { map: imgTexture2, bumpMap: imgTexture2, bumpScale: 1, color: 0x00ff00, specular: 0x333333, shininess: 10, metal: true, shading: shading } ));

    // Spheres geometry

    var geometry_smooth = new THREE.SphereBufferGeometry( 70, 32, 16 );

    objects = [];

    var sphere, geometry, material;

    for ( var i = 0, l = materials.length; i < l; i ++ )
    {

        material = materials[ i ];

        sphere = new THREE.Mesh( geometry_smooth, material );

        sphere.position.x = ( i % 4 ) * 200 - 200;
        sphere.position.z = Math.floor( i / 4 ) * 200 - 200;

        objects.push( sphere );

        scene.add( sphere );

    }

    particleLight = new THREE.Mesh( new THREE.SphereBufferGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
    scene.add( particleLight );

    // Lights

    scene.add( new THREE.AmbientLight( 0xa0a0a0, 5 ));

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set( 1, 1, 1 ).normalize();
    scene.add( directionalLight );

    var pointLight = new THREE.PointLight( 0xffffff, 2, 800 );
    particleLight.add( pointLight );

    //

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setClearColor( 0x000000 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.sortObjects = true;

    container.appendChild( renderer.domElement );

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    //

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

    requestAnimationFrame( animate );

    render();

}

function render() {

    var timer = Date.now() * 0.00025;

    camera.position.x = Math.cos( timer ) * 800;
    camera.position.z = Math.sin( timer ) * 800;

    camera.lookAt( scene.position );

    for ( var i = 0, l = objects.length; i < l; i ++ ) {

        var object = objects[ i ];

        object.rotation.y += 0.005;

    }

    particleLight.position.x = Math.sin( timer * 7 ) * 300;
    particleLight.position.y = Math.cos( timer * 5 ) * 400;
    particleLight.position.z = Math.cos( timer * 3 ) * 300;

    renderer.render( scene, camera );

}


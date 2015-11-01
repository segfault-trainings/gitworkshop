var camera, scene, texture, particleLight, renderer;
var moons = [];

init();
moon( "green" );
animate();

function moon( color )
{
  m = new THREE.MeshPhongMaterial( { map: texture,
    bumpMap: texture, bumpScale: 5, color: color,
    specular: 0x333333, shininess: 10, metal: true, shading: THREE.SmoothShading } );
  sphere = new THREE.Mesh( new THREE.SphereBufferGeometry( 70, 32, 16 ), m );
  pos = moons.length +1
  sphere.position.x = ( pos % 4 ) * 200 - 200;
  sphere.position.z = Math.floor( pos / 4 ) * 200 - 200;
  moons.push( sphere );
  scene.add( sphere );
}

function init( )
{
  // Container
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  // Camera
  camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.set( 0, 200, 0 );
  scene = new THREE.Scene();

  // Texture
  texture = THREE.ImageUtils.loadTexture( "moon_1024.jpg" );
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 16;

  // Lights
  particleColor = "white";
  particleLight = new THREE.Mesh( new THREE.SphereBufferGeometry( 4, 8, 8 ),
                                  new THREE.MeshBasicMaterial( { color: particleColor } ));
  scene.add( particleLight );
  scene.add( new THREE.AmbientLight( 0xa0a0a0, 5 ));
  var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
  directionalLight.position.set( 1, 1, 1 ).normalize();
  scene.add( directionalLight );
  pointLightColor = "white";
  var pointLight = new THREE.PointLight( pointLightColor, 2, 800 );
  particleLight.add( pointLight );

  // Render
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setClearColor( 0x000000 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.sortObjects = true;
  container.appendChild( renderer.domElement );
  renderer.gammaInput = true;
  renderer.gammaOutput = true;

  // Resize
  window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize()
{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate()
{
  requestAnimationFrame( animate );
  render();
}

function render()
{
  var timer = Date.now() * 0.00025;
  camera.position.x = Math.cos( timer ) * 800;
  camera.position.z = Math.sin( timer ) * 800;
  camera.lookAt( scene.position );

  // make the moons spin
  for( var i = 0, l = moons.length; i < l; i ++ )
    moons[i].rotation.y += 0.005;

  particleLight.position.x = Math.sin( timer * 7 ) * 300;
  particleLight.position.y = Math.cos( timer * 5 ) * 400;
  particleLight.position.z = Math.cos( timer * 3 ) * 300;

  renderer.render( scene, camera );
}


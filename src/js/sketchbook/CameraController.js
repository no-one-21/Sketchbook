import * as THREE from 'three';

export class CameraController {

    constructor(camera) {

        this.camera = camera;
        this.target = new THREE.Vector3();
    
        this.radius = 3;
        this.theta = 0;
        this.phi = 0;
    
        this.onMouseDownPosition = new THREE.Vector2();
        this.onMouseDownTheta = this.theta;
        this.onMouseDownPhi = this.phi;
        
        this.boundOnMouseDown = evt => this.onMouseDown(evt);
        this.boundOnMouseMove = evt => this.onMouseMove(evt);
        this.boundOnMouseUp = evt => this.onMouseUp(evt);

        document.addEventListener( "mousedown", this.boundOnMouseDown, false );
    }

    onMouseDown(event) {
        this.onMouseDownPosition = new THREE.Vector2(event.clientX, event.clientY);
        this.onMouseDownTheta = this.theta;
        this.onMouseDownPhi = this.phi;

        document.addEventListener( "mousemove", this.boundOnMouseMove, false );
        document.addEventListener( "mouseup", this.boundOnMouseUp, false );
    }

    onMouseMove(event) {
        this.theta = -((event.clientX - this.onMouseDownPosition.x) * 0.5) + this.onMouseDownTheta;
        this.phi = ((event.clientY - this.onMouseDownPosition.y) * 0.5) + this.onMouseDownPhi;
        this.phi = Math.min( 179, Math.max( -179, this.phi ) );
    }

    onMouseUp(event) {
        document.removeEventListener( "mousemove", this.boundOnMouseMove, false );
        document.removeEventListener( "mouseup", this.boundOnMouseUp, false );
    }

    setRadius(value) {
        this.radius = Math.max( 0.001, value );
    }
    
    update() {
        this.camera.position.x = this.target.x + this.radius * Math.sin( this.theta * Math.PI / 360 ) * Math.cos( this.phi * Math.PI / 360 );
        this.camera.position.y = this.target.y + this.radius * Math.sin( this.phi * Math.PI / 360 );
        this.camera.position.z = this.target.z + this.radius * Math.cos( this.theta * Math.PI / 360 ) * Math.cos( this.phi * Math.PI / 360 );
        this.camera.updateMatrix();
        this.camera.lookAt(this.target);
    }
}
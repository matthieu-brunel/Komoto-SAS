import React, { Component } from 'react';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import './canvas.css'

class Rendu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model_name: undefined

        };
        this.canvas = undefined;
        this.engine = undefined;
        this.scene = undefined;
    }

    componentDidMount() {
        this.canvas = document.getElementById("canvas");
        this.engine = new BABYLON.Engine(this.canvas, true, null, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.createDefaultLight(true);
        this.engine.runRenderLoop(() => {
            this.scene.render();
        })

        this.displayModel();
    }

    displayModel() {
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), this.scene);
        camera.attachControl(this.canvas, false);
        const { model_name, root } = this.props;

        if (this.scene) {
            for (let maille of this.scene.meshes) {
                maille.dispose();
            }

            if (model_name) {
                BABYLON.SceneLoader.ImportMesh(null, root, model_name, this.scene, (newMeshes) => {

                    camera.target = newMeshes[0];
                });
            }
        }
    }

    componentWillUnmount() {
        if (this.engine) {
            this.engine.dispose();
        }
    }

    componentDidUpdate(prevProps) {
        const { model_name } = this.props;
        if (model_name !== prevProps.model_name) {
            this.displayModel();
        }
    }

    render() {
        const { model_name, root } = this.props;
        console.log(`${root}${model_name}`);
        return (
            <div>
                <canvas id="canvas"></canvas>
            </div>
        )
    }
}

export default Rendu;
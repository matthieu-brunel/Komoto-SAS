import React, { Component } from 'react';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import './canvas.css'

class Rendu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model_name: undefined,
            is_loading: true

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
        this.setState({ is_loading: true });
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
                    this.setState({ is_loading: false });
                });
            }
        }
    }

    componentWillUnmount() {
        if (this.engine) {
            this.engine.dispose();
            
        }
        
    }

    componentDidUpdate(prevProps, prevState) {
        const { model_name } = this.props;
        if (model_name !== prevProps.model_name) {
            this.displayModel();
        }

    }

    render() {
        const { model_name, root } = this.props;
        console.log(`${root}${model_name}`);
        return (
            <div className="container-canvas-3d">
                {this.state.is_loading &&
                    <button className="btn btn-primary" disabled>
                        <span className="spinner-border spinner-border-sm"></span>
                    Loading..
                  </button>
                }
                <canvas id="canvas"></canvas>


            </div>
        )
    }
}

export default Rendu;
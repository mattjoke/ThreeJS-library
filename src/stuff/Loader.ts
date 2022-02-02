import { Config } from "@manualTypes/configTypes";
import { File } from "@manualTypes/jsonTypes";
import { Group, Mesh, Quaternion } from "three";
import Window from "../initialization/Window";
import { Objects3D } from "../types/applicationTypes";
import LoaderManager from "./loaders/LoaderManager";
import LoaderOverlay from "./loaders/LoaderOverlay";
import Object3D from "./Object3D";

const Loader = async (
    files: File[],
    window: Window,
    config?: Config
): Promise<Objects3D> => {
    const div = config?.loadingOverlay ?? LoaderOverlay();
    div.style.zIndex = "100";
    window.container.appendChild(div);

    const items: Objects3D = new Map();

    const manager = LoaderManager();

    for (const file of files) {
        const loader = manager.getHandler(file.file);

        await loader?.loadAsync(file.file).then((object) => {
            let obj: Object3D;
            switch (object.type) {
                case "Group":
                    const o = object as Group;
                    const child = o.children[0] as Mesh;
                    obj = new Object3D(child.geometry, file);
                    obj.setScale(50, 50, 50);
                    break;
                default:
                    obj = new Object3D(object, file);
                    break;
            }

            obj.setOutlineColor(config?.colors?.selectionColor);

            if (items.get(file.id)) {
                throw new Error(`Duplicate object name: ${file.id}, please check your files array.`)
            }

            items.set(file.id, obj);

            if (config?.world?.globalRotation != null) {
                const rotation = new Quaternion();
                rotation.set(
                    config?.world?.globalRotation?.[0],
                    config?.world?.globalRotation?.[1],
                    config?.world?.globalRotation?.[2],
                    config?.world?.globalRotation?.[3]
                );
                obj.setRotation(rotation);
            }

            window.getScene().addObject(obj.getMesh());
            window.getScene().addObject(obj.getOutline());
        });
    }

    window.container.removeChild(div);

    return items;
};

export default Loader;

import { JSON } from "../types/jsonTypes";
import { buildSteps, ManualStep } from "./stepper/ManualStep";
import { Redraw } from "./stepper/Redraw";

class Stepper {
    private getObject: Function;
    private currentStep: ManualStep;
    private currentStepPosition = 0;
    public length = 0;
    public signaler;

    private root: ManualStep | null;
    private animationLoop: [string] | [];

    constructor(json: JSON, getObject: Function, animationLoop?: [string]) {
        this.getObject = getObject;
        this.signaler = new EventTarget();

        const { root, length } = buildSteps(json.steps);
        this.currentStep = root ?? new ManualStep();
        this.root = root;
        this.length = length;
        console.log(root)

        this.animationLoop = animationLoop ?? [];

        requestAnimationFrame(this.redraw.bind(this));

        //Loop Animations
        if (this.animationLoop.length > 0) {
            let i = 0;
            const loop = () => {
                setTimeout(() => {
                    const el = this.animationLoop[i];
                    setTimeout(() => {
                        this.findLoopNext(el);
                    }, 1000);
                    i++;
                    if (i >= this.animationLoop.length) {
                        i = 0;
                    }
                    loop();
                }, 1000 * this.animationLoop.length);
            };
            loop();
        }
    }

    private redraw() {
        Redraw(this.currentStep, this.getObject);
        this.signaler.dispatchEvent(
            new CustomEvent("update", {
                detail: this.currentStepPosition,
            })
        );
    }

    public destroy() {
        this.currentStep = new ManualStep();
        this.currentStepPosition = 0;
        this.length = 0;
        this.root = null;
        this.animationLoop = [];
    }

    private findLoopNext(name: string) {
        if (this.root == null) {
            return;
        }
        let curr = this.root;
        let pos = 0;
        while (curr.name != name) {
            if (curr.next == null) {
                break;
            }
            curr = curr.next;
            pos++;
        }
        this.setStep(pos);
    }

    public setStep(position: number) {
        while (this.currentStepPosition != position) {
            if (position > this.currentStepPosition) {
                if (this.currentStep.next == null) {
                    break;
                }
                this.currentStep = this.currentStep.next;
                this.currentStepPosition++;
                this.redraw();
            } else {
                if (this.currentStep.prev == null) {
                    break;
                }
                this.currentStep = this.currentStep.prev;
                this.currentStepPosition--;
            }
            this.redraw();
        }
        return this.currentStepPosition;
    }

    public getCurrentStep() {
        return this.currentStepPosition;
    }
}

export default Stepper;

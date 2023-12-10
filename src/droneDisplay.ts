import DroneState from "./droneState";

export function createSvg(size = 10): SVGElement {
    const svgNS = "http://www.w3.org/2000/svg";
    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('class', 'drone');
    path.setAttributeNS(null, 'd', `
M ${size * 2} 0
L ${-size} ${size}
L 0 0
L ${-size} ${-size}
Z`);

    return path;
}

export function setTransform(element: SVGElement, state: DroneState): SVGElement {
    const [ baseX, baseY ] = state.position;
    element.setAttributeNS(null, 'transform', `translate(${baseX}, ${baseY}) rotate(${state.facing * 180 / Math.PI}, 0 0)`);

    return element;
}

// The cursor point, translated into svg coordinates
const svgCoordinateOfEvent = function (event, svg) {
    const pt = new DOMPoint(event.clientX, event.clientY);
    return pt.matrixTransform(svg.current.getScreenCTM().inverse());
};

export {svgCoordinateOfEvent};

// The cursor point, translated into svg coordinates
const svgCoordinateOfEvent = function (event, svg) {
    const pt = new DOMPoint(event.clientX, event.clientY);
    return pt.matrixTransform(svg.getScreenCTM().inverse());
};

const eventCoordinates = function (event, svg, scaleX, scaleY) {
  const cursorPoint = svgCoordinateOfEvent(event, svg);
  const x = scaleX.invert(cursorPoint.x);
  const y = scaleY.invert(cursorPoint.y);
  return {x,y};
}

export {svgCoordinateOfEvent, eventCoordinates};

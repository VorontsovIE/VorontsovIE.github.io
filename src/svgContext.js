import { createContext, useContext } from "react";

const SvgContext = createContext(null);
const useSvgContext = () => useContext(SvgContext);

export {SvgContext, useSvgContext};

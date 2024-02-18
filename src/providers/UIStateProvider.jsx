import { useState, useContext, createContext } from "react";

const UIStateContext = createContext();

export function useUIState() {
	return useContext(UIStateContext);
}

export default function UIProvider({ children }) {
	const [openDrawer, setOpenDrawer] = useState(false);
	return (
		<UIStateContext.Provider value={{ openDrawer, setOpenDrawer }}>
			{children}
		</UIStateContext.Provider>
	);
}

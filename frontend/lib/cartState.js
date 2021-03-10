import { createContext, useContext, useState } from "react";

const LocalStateContext = createContext();

export const CartStateProvider = ({ children }) => {
	const [cartOpen, setCartOpen] = useState(false);

	const toggleCart = () => {
		setCartOpen(!cartOpen);
	};

	const closeCart = () => {
		setCartOpen(false);
	};

	const openCart = () => {
		setCartOpen(true);
	};

	return (
		<LocalStateContext.Provider
			value={{ cartOpen, toggleCart, openCart, closeCart }}
		>
			{children}
		</LocalStateContext.Provider>
	);
};

export const useCart = () => {
	const all = useContext(LocalStateContext);
	if (!all) throw new Error("useCart");
	return all;
};

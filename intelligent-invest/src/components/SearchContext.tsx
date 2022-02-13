import { useContext } from "react";
import { createContext } from "react";

export type GlobalContent = {
    quote: string,
    setQuote: (c: string) => void
}
export const MyContext = createContext<GlobalContent>({
    quote: "AAPL",
    setQuote: () => {}
});

export const useGlobalContext = () => useContext(MyContext);
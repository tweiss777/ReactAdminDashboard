import { createContext, useState } from 'react';

export interface IThemeContext{
    toggle: Function,
    isEnabled: boolean

}

interface IProps {
    children: JSX.Element | JSX.Element[]
}

export const ThemeContext = createContext<IThemeContext>({
    toggle: () => {},
    isEnabled: false,
})



export default function ThemeProvider(props: IProps){
    const [darkMode, setDarkMode] = useState<boolean>(false)

    function toggleDarkMode(value: boolean){
        setDarkMode(value)
    }


    return (
        <ThemeContext.Provider value={{toggle: toggleDarkMode, isEnabled: darkMode}}>
                { props.children }
        </ThemeContext.Provider>

    )


}

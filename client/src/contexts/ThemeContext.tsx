import { createContext, useContext, useState } from 'react';

interface IThemeContext{
    toggle: Function,
    isEnabled: boolean

}

interface IProps {
    children: JSX.Element | JSX.Element[]
}

const ThemeContext = createContext<IThemeContext>({
    toggle: () => {},
    isEnabled: false,
})


export const useThemeContext = () => useContext(ThemeContext)

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

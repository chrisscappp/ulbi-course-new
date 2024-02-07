// eslint-disable-next-line react/no-deprecated
import { render } from "react-dom";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "app/providers/ThemeProvider/index";
import { SideBarProvider } from "app/providers/SidebarProvider/index"
import "./shared/config/i18nConfig/i18n"

render(
    <BrowserRouter>
        <ThemeProvider>
            <SideBarProvider><App/></SideBarProvider>
        </ThemeProvider>
    </BrowserRouter>,
	
    document.getElementById('root')
)
import React from 'react';
import { ThemeProvider } from "theme-ui";
import "./reset.css";
import theme from "../theme/theme";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Landingpage = React.lazy(()=>import('./pages/Landingpage'));

const Root = ()=>{

    return (
        <ThemeProvider theme={theme}>
            <React.Suspense fallback={<span>Loading...</span>}>
                <Router>
                    <Switch>
                        <Route exact path='/'>
                            <Landingpage/>
                            </Route> 
                        <Route render={()=><h1>Not Found</h1>}/>

                    </Switch>

                </Router>
            </React.Suspense>
        </ThemeProvider>
    )
}
export default Root;
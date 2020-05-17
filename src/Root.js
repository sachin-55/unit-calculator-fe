import React from 'react';
import { ThemeProvider } from "theme-ui";
import "./reset.css";
import theme from "../theme/theme";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Fallback from './components/Fallback';

const Landingpage = React.lazy(()=>import('./pages/Landingpage'));
const Homepage = React.lazy(()=>import('./pages/Homepage'));
const LoginRegisterPage = React.lazy(()=>import('./pages/LoginRegisterPage'));
const RegisterMeter = React.lazy(()=>import('./pages/RegisterMeterpage'));
const Readings = React.lazy(()=>import('./pages/Readingspage'));

const Root = ()=>{

    return (
        <ThemeProvider theme={theme}>
            <React.Suspense fallback={<Fallback/>}>
                <Router>
                    <Switch>
                        <Route exact path='/'>
                            <Landingpage/>
                        </Route>
                        <Route exact path='/login'>
                            <LoginRegisterPage/>
                        </Route>  
                        <Route exact path='/home'>
                            <Homepage/>
                        </Route>
                        <Route exact path='/register'>
                            <RegisterMeter/>
                        </Route>
                        <Route exact path='/readings'>
                            <Readings/>
                      </Route>
                        <Route render={()=><h1>Not Found</h1>}/>

                    </Switch>

                </Router>
            </React.Suspense>
        </ThemeProvider>
    )
}
export default Root;
import Script from "next/script";
import React from "react";
import { ReactNode } from "react";


export default class TabsScript extends React.Component
{
    constructor(props: any)
    {
        super(props);
    }

    render(): ReactNode
    {
        return(
            <Script >
                {`
                window.onload=function(){

                    window.launchApplication = function launchApplication( url, load_window_refName)
                    {
                        // make sure there is a winrefs object
                        if ( typeof window.launchApplication.winrefs == 'undefined' )
                        {
                            window.launchApplication.winrefs = {};
                        }

                        if (
                            typeof window.launchApplication.winrefs[load_window_refName] == 'undefined' ||
                            window.launchApplication.winrefs[load_window_refName].closed ||
                            window.launchApplication.winrefs[load_window_refName].location.origin !== window.location.origin
                        )
                        {
                            // if no window present, opens it and stores the refernece
                            window.launchApplication.winrefs[load_window_refName] = window.open( url, load_window_refName);
                            
                        }
                        else
                        {
                            // if present, focuses
                            window.launchApplication.winrefs[load_window_refName].focus();
                        }

                        return window.launchApplication.winrefs[load_window_refName];
                    }
            
                };
                
                `}
            </Script>
        )    
    }
}
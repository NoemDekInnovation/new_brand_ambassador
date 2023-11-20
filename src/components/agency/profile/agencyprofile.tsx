import react from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProfileContainer } from "./agencyprofilestyle";
import { AgencyLayout } from "../../Layout";
import { Card } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";


export const AgencyProfile = () => {

    return (
       <AgencyLayout>
              <ProfileContainer>
                <div className="body">
                    <div className="split">
                        <Card className="card">
                            <h1 className="text1">My Account</h1>
                            <Separator className="separator"/>
                            <h1 className="text2">Profile</h1>
                            <Separator className="separator"/>
                            <h1 className="text2">Billings & Payments</h1>
                            <Separator className="separator"/>
                            <h1 className="text2" >Settings</h1>
                        </Card>
                        <div className="header">
                            <h1 className="head-text">Profile</h1>
                            <Separator/>
                        </div>
                    </div>
                </div>
               
              </ProfileContainer>
         </AgencyLayout>
    )

}
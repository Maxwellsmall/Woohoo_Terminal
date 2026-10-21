import { Route, Routes } from "react-router-dom"
import Staticlayout from "../layout/StaticLayout"
import Home from"../pages/Home"


export default function AllScreen() {
    return (
        <Routes>
            <Route path="" element={<Staticlayout/>}>
                <Route index element={<Home/>}/>
            </Route>
        </Routes>
    )
}
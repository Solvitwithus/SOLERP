import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./Components/ProtectedRoute"; 
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Sales from "./Pages/Sales";
import Procurement from "./Pages/Procurement";
import Breeding from "./Pages/Breeding";
import HumanResourceManagement from "./Pages/HumanResourceManagement";
import Finance from "./Pages/Finance";
import KennelManagement from "./Pages/KennelManagement";
import HealthHubb from "./Pages/HealthHubb";
import Settings from "./Pages/Settings";
import TaskSchedulling from "./Pages/TaskScheduling";
import Dimesion from "./Pages/Dimesion";
import AssetManagement from "./Pages/AssetManagement";
import Inventory from "./Pages/Inventory";
import AddBreedForm from "./BreedForms/AddBreedForm";
import BreedReport from "./BreedForms/BreedReport";
import CategorySetupform from "./AssetModule/CategorySetupform";
import TaxType from "./AssetModule/TaxType";
import UnitofMeasurement from "./ItemsandInventory/UnitofMeasurement";
import SalesAccount from "./Finance/SalesAccount";
import PurchaseAccount from "./Finance/PurchaseAccount";
import OtherAccounts from "./Finance/OtherAccounts";
import Currency from "./Finance/Currency";
import AssetInventoryReport from "./AssetModule/AssetInventoryReport";
import Itemsetup from "./AssetModule/Itemsetup";
import ItemReport from "./AssetModule/ItemReport";




function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Signup />} />
          <Route exact path="/Login" element={<Login />} />
          
          {/* Protect the route with ProtectedRoute */}
          <Route
            exact
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard /> 
              </ProtectedRoute>
            }
          />
            <Route
            exact
            path="/sales"
            element={
              <ProtectedRoute>
                <Sales/> 
              </ProtectedRoute>
            }
          />

<Route
            exact
            path="/procurement"
            element={
              <ProtectedRoute>
                <Procurement /> 
              </ProtectedRoute>
            }
          />



<Route
            exact
            path="/items-and-inventory-management"
            element={
              <ProtectedRoute>
                <Inventory /> 
              </ProtectedRoute>
            }
          />

<Route
            exact
            path="/human-resources-management"
            element={
              <ProtectedRoute>
                <HumanResourceManagement /> 
              </ProtectedRoute>
            }
          />


<Route
            exact
            path="/finance"
            element={
              <ProtectedRoute>
                <Finance/> 
              </ProtectedRoute>
            }
          />

<Route
            exact
            path="/kennel-management"
            element={
              <ProtectedRoute>
                <KennelManagement/> 
              </ProtectedRoute>
            }
          />

          <Route
          exact
          path="/health-hubb"
          element={
            <ProtectedRoute>
              <HealthHubb/> 
            </ProtectedRoute>
          }
          />

          
<Route
            exact
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings/> 
              </ProtectedRoute>
            }
          />

                    
<Route
            exact
            path="/task-schedule"
            element={
              <ProtectedRoute>
                <TaskSchedulling/> 
              </ProtectedRoute>
            }
          />

<Route
            exact
            path="/dimension"
            element={
              <ProtectedRoute>
                <Dimesion/> 
              </ProtectedRoute>
            }
          />

<Route
            exact
            path="/asset-management"
            element={
              <ProtectedRoute>
                <AssetManagement/> 
              </ProtectedRoute>
            }
          />


<Route
            exact
            path="/breeding"
            element={
              <ProtectedRoute>
                <Breeding /> 
              </ProtectedRoute>
            }
          />


<Route
            exact
            path="/breeding/breadebreed"
            element={
              <ProtectedRoute>
                <AddBreedForm/> 
              </ProtectedRoute>
            }
          />

<Route
            exact
            path="/breeding/breedreport"
            element={
              <ProtectedRoute>
                <BreedReport/> 
              </ProtectedRoute>
            }
          />
      <Route
            exact
            path="/assetmanagement/createcategory"
            element={
              <ProtectedRoute>
                <CategorySetupform/> 
              </ProtectedRoute>
            }
          />   


                <Route
            exact
            path="/assetmanagement/taxtype"
            element={
              <ProtectedRoute>
                <TaxType/> 
              </ProtectedRoute>
            }
          />  


<Route
            exact
            path="/finance/otheraccountssetup"
            element={
              <ProtectedRoute>
                <OtherAccounts/> 
              </ProtectedRoute>
            }
          />  

<Route
            exact
            path="/finance/purchaseaccountsetup"
            element={
              <ProtectedRoute>
                <PurchaseAccount/> 
              </ProtectedRoute>
            }
          /> 


<Route
            exact
            path="/finance/saleaccountsetup"
            element={
              <ProtectedRoute>
                <SalesAccount/> 
              </ProtectedRoute>
            }
          /> 


<Route
            exact
            path="/finance/currencysetup"
            element={
              <ProtectedRoute>
                <Currency/> 
              </ProtectedRoute>
            }
          /> 
         

         <Route
            exact
            path="/assetmanagement/unitofmeasurement"
            element={
              <ProtectedRoute>
                <UnitofMeasurement/> 
              </ProtectedRoute>
            }
          /> 


<Route
            exact
            path="/assetmanagement/itemsetup"
            element={
              <ProtectedRoute>
                <Itemsetup/> 
              </ProtectedRoute>
            }
          />


          
         <Route
            exact
            path="/assetmanagement/assetsreport"
            element={
              <ProtectedRoute>
                <AssetInventoryReport/> 
              </ProtectedRoute>
            }
          />  

<Route
            exact
            path="/assetmanagement/itemsreport"
            element={
              <ProtectedRoute>
                <ItemReport/> 
              </ProtectedRoute>
            }
          /> 
        </Routes>

        
        
      </Router>
      
      
      
    </div>
  );
}

export default App;

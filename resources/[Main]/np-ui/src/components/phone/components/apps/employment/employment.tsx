import React, { useState, useEffect } from 'react';
import '../../index.css';
import Typography from '@mui/material/Typography';
import { fetchNui } from '../../../../../utils/fetchNui';
import { useNuiEvent } from "../../../../../hooks/useNuiEvent";
import { Link } from 'react-router-dom';
import AppContainer from '../../components/app-container';
import { useRecoilState } from 'recoil';
import { 
    phoneCurrentApp,
    phoneEmploymentBusinessId
} from '../../../../../../src/store';

const EmploymentApp: React.FC = () => {
  const [employmentData, setEmploymentData] = useState([])
  const [filteredEmploymentData, setFilteredEmploymentData] = useState([])
  const [CurrentApp, SetCurrentApp]: any = useRecoilState(phoneCurrentApp)
  const [businessId, setBusinessId]: any = useRecoilState(phoneEmploymentBusinessId)
  useEffect(() => {
    fetchNui('np-ui:getEmploymentData', {}).then(resData => {
      setEmploymentData(resData.data)
      setFilteredEmploymentData(resData.data)
    })
  }, []);

  useNuiEvent<boolean>('closeApps', () => {
  })

  const primaryActions: any = [];

  return (
    <>
      <AppContainer
        emptyMessage={filteredEmploymentData.length === 0}
        primaryActions={primaryActions}
        search={{
          filter: ['businessname'],
          list: employmentData,
          onChange: setFilteredEmploymentData,
        }}
      >
        {filteredEmploymentData && filteredEmploymentData.length > 0 ? (
          filteredEmploymentData.map((employment: any, index) => (
            <div onClick={()=>{
              setBusinessId(employment.businessid)
              SetCurrentApp('employees')
            }} style={{ color: '#fff', textDecoration: 'none' }}>
              <div key={employment.id} id={employment.id} className="component-paper cursor-pointer">
                <div className="main-container">
                  <div className="image">
                    <i className="fas fa-business-time fa-w-16 fa-fw fa-3x"></i>
                  </div>
                  <div className="details">
                    <div className="title">
                      <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{employment.businessname}</Typography>
                    </div>
                    <div className="description">
                      <div className="flex-row">
                        <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{employment.businessrole}</Typography>
                      </div>
                    </div>
                  </div>
                  <div className="actions">
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
          </>
        )}
      </AppContainer>
    </>
  );
}

export default EmploymentApp;
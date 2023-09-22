import React, { useState, useEffect } from 'react';
import '../../index.css';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { fetchNui } from '../../../../../utils/fetchNui';
import { useNuiEvent } from "../../../../../hooks/useNuiEvent";
import AppContainer from '../../components/app-container';
import moment from 'moment';

const EmailApp: React.FC = () => {
  const [emailData, setEmailData]: any = useState([])
  const [filteredEmails, setFilteredEmails]: any = useState([])

  useNuiEvent('uiMessage', function (data) {
    var dvexdata = data.data;
    if('twatter-receive' === dvexdata.action){
      const date = new Date();
      setEmailData(...emailData, {
        sender: dvexdata.sender,
        subject: dvexdata.subject,
        body: dvexdata.body,
        time: date
      });
      setFilteredEmails(...filteredEmails, {
        sender: dvexdata.sender,
        subject: dvexdata.subject,
        body: dvexdata.body,
        time: data
      });
    }
  });



  const primaryActions: any = [];

  return (
    <>
      <AppContainer
        emptyMessage={filteredEmails.length === 0}
        primaryActions={primaryActions}
        search={{
          filter: ['from', 'subject', 'message'],
          list: emailData,
          onChange: setFilteredEmails,
        }}
      >
        {filteredEmails && filteredEmails.length > 0 ? (
          filteredEmails.map((email) => (
            <div className="component-paper cursor-pointer">
              <div className="main-container">
                <div className="details">
                  <div className="title">
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>From: {email.sender}</Typography>
                  </div>
                  <div className="description">
                    <div className="flex-row">
                      <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>Subject: {email.subject}</Typography>
                    </div>
                    <div className="flex-row">
                      <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{email.body}</Typography>
                    </div>
                  </div>
                  <Divider variant="fullWidth" sx={{ borderColor: '#5e6d7d' }} />
                  <Typography style={{ color: '#fff', wordBreak: 'break-word', textAlign: 'center', marginTop: '5%' }} variant="body2" gutterBottom>{moment(email.time).fromNow()}</Typography>
                </div>
                <div className="actions">
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

export default EmailApp;
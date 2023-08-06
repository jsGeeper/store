import React, { useState, useEffect } from 'react';
import { Box, styled, Grid } from '@mui/material';
import { ZIMKitManager, Common } from '@zegocloud/zimkit-react';
// import '@zegocloud/zimkit-react/index.css';

import { AppWrapper } from '../components/layouts/app-wrapper';
import { useSelector } from 'react-redux';
import { IRootReducerState } from '../redux/IRootReducer';

const ZEGO_APP_ID = 1561561789;
const ServerSecret = '70d02ff6cb5ccda4a1b631edff02c546';

const ChatScreenContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '441px 1fr',
  gridTemplateRows: 'auto 1fr',
  height: '100%'
});

const ConversationList = styled('aside')({
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  overflowY: 'auto',
  gridRow: '1 / -1'
});

const Messages = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  gap: '1rem',
  backgroundColor: '#F9FAFB'
});

export const MessagingScreen: React.FC = () => {
  const { user } = useSelector((state: IRootReducerState) => state.auth);

  const [appId, setAppId] = useState(ZEGO_APP_ID);
  const [serverSecret, setServerSecret] = useState(ServerSecret);
  const [userInfo, setUserInfo] = useState({
    userID: user.id,
    userName: user.last_name + ' ' + user.first_name,
    userAvatarUrl: user.image
  });

  //   const zimCallable = async () => {
  //     const zimkitManager = new ZIMKitManager();
  //     const token = zimkitManager.generateKitTokenForTest(appId, serverSecret, userInfo.userID);
  //     await zimkitManager.init(appId);
  //     await zimkitManager.connectUser(userInfo, token);
  //   };

  //   useEffect(() => {
  //     zimCallable();
  //   }, []);

  return (
    <AppWrapper title='Messages'>
      {/* <Common></Common> */}
      <ChatScreenContainer>
        <ConversationList>
          <button>Item 1</button>
          <button>Item 2</button>
          <button>Item 3</button>
          <button>Item 4</button>
          <button>Item 5</button>
        </ConversationList>

        <header>
          <button className='go-back' id='back-button'>
            ◀
          </button>
          <h2>Details header here</h2>
        </header>

        <Messages>
          <article className='message'>Message</article>
          <article className='message'>Message</article>
          <article className='message'>Message</article>
        </Messages>
      </ChatScreenContainer>
    </AppWrapper>
  );
};

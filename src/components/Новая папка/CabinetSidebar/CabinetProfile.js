import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
// import { useHistory } from "react-router-dom";
// import {searchAPI} from "../../api/api";
import { useSelector } from 'react-redux';
// import {setVisiblePopupAuth} from "../../redux/actions/popup";
// import {setToken, setUserData} from "../../redux/actions/settings";
// import {setSelectedEngine} from "../../redux/actions/filter";

function CabinetProfile() {
  // const dispatch = useDispatch();
  const { userData } = useSelector(({ settings }) => settings);
  // const history = useHistory();
  const [change, setChange] = React.useState(false);
  const [userAvatar, setUserAvatar] = React.useState('');
  // const [userName,setUserName] = React.useState('');
  // const [userEmail,setUserEmail] = React.useState('');

  function modification() {
    setChange(!change);
  }

  /* if(!localStorage.getItem('auth_identity_token')){
       const identityUser = {
           "auth_identity_token": localStorage.getItem('auth_identity_token'),
           "user_data": navigator.userAgent
       }
       searchAPI.getUser(identityUser)
           .then(response => {
               if(response.status === 200){
                   localStorage.setItem('auth_identity_token', response.data.user.auth_identity_token);
                   dispatch(setUserData(response.data.user));
               }
           })
            .catch((error) => {
                if( error.response ){
                    console.log(error.response.data);
                }
                dispatch(setToken(false));
                localStorage.removeItem('auth_identity_token');
                history.push('/');
                dispatch(setVisiblePopupAuth(true));
            });
    } */

  /* React.useEffect(() => {
        if(userData){
            setUserAvatar(userData.avatar);
            setUserName(userData.username);
            setUserEmail(userData.email);
        }
    },[userData]); */

  /* React.useEffect(() => {
        headerCabinet()
    }, [registrToken]) */

  return (
    <div className="cabinet-profile">
      <div className="cabinet-profile-buttons">
        <Link to="#" className="cabinet-profile__edit" />
      </div>
      <div className="cabinet-profile__photo">
        <img src={userAvatar} alt="" />
      </div>
      <div className="cabinet-profile-data">
        <div className="cabinet-profile-data__item">
          <span>Имя:</span>
          <input
            type="text"
            name="user_name"
            className={classNames('cabinet-profile-data__input', { active: change })}
            defaultValue={userData.username}
            readOnly={!change && 'readOnly'}
          />
        </div>
        <div className="cabinet-profile-data__item">
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            className={classNames('cabinet-profile-data__input', { active: change })}
            defaultValue={userData.email}
            readOnly={!change && 'readOnly'}
          />
        </div>
        <button type="button" className="cabinet-profile-data__change" onClick={modification}>
          {!change ? 'изменить' : 'сохранить' }
        </button>
      </div>
    </div>
  );
}

export default React.memo(CabinetProfile);

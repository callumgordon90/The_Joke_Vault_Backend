import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import UpdateProfile from "../components/Profile/UpdateProfile";

const Profile = () => {
  const uid = useContext(UidContext);

  return (
    <div className="profile-page">
      {uid ? (
        <UpdateProfile />
      ) : (
        <div className="log-container">
          <Log signin={false} signup={true} />
          <div className="img-container">
            <img src="./img/icon.png" alt="img-log" />
            <h3 >Welcome to the Joke Vault. The only social network dedicated solely to sharing silly jokes and videos.</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
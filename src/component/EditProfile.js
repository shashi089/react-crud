import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import "./components.css";
import ProfileEdit from "./subComponents/ProfileEdit";
export default function EditProfile({ match }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setStatename] = useState("");
  const context = useContext(Context);
  const [profileNotedited, setProfileNotEdited] = useState(true);

  //to set the inputfields when editprofile button clicked
  let setInput = async () => {
    let uservalue = context.users.filter((user) => user.id === match.params.id);
    //if page refreshed this will fetch api and set input fileds
    if (uservalue.length === 0) {
      const { data } = await axios.get(
        `https://611f263e9771bf001785c72a.mockapi.io/crud/${match.params.id}`
      );
      uservalue.push(data);
    }
    uservalue.forEach((user) => {
      setName(user.name);
      setEmail(user.email);
      setCompany(user.company);
      setCountry(user.country);
      setCity(user.city);
      setStatename(user.state);
    });
  };

  useEffect(() => {
    setInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let putuser = async () => {
    const { data } = await axios.put(
      `https://611f263e9771bf001785c72a.mockapi.io/crud/${match.params.id}`,
      {
        name: name,
        email: email,
        company: company,
        country: country,
        city: city,
        state: state,
      }
    );

    let tempusers = [...context.users];
    let index = context.users.findIndex((user) => user.id === match.params.id);
    tempusers[index] = data;
    context.setUsers(tempusers);
    setProfileNotEdited(false);
  };

  //handle the submit and call putuser
  let handleSubmit = (event) => {
    event.preventDefault();
    putuser();
  };

  return (
    <>
      <div className="container">
        {profileNotedited ? (
          <>
            <h2 className="text-center text-info">
              Edit Profile {match.params.id}
            </h2>
            <ProfileEdit
              name={name}
              email={email}
              company={company}
              country={country}
              state={state}
              city={city}
              setName={setName}
              setEmail={setEmail}
              setCompany={setCompany}
              setCountry={setCountry}
              setStatename={setStatename}
              setCity={setCity}
              handleSubmit={handleSubmit}
            />
          </>
        ) : (
          <>
            <div className="confirmtext">
              <h1>Profile Successfully Edited !</h1>
              <i className="fas fa-check-circle"></i>
            </div>
          </>
        )}
      </div>
    </>
  );
}

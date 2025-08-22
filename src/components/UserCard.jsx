import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      {/* Use conditional rendering to only show the figure and image if photoUrl exists */}
      {photoUrl && (
        <figure>
          <img src={photoUrl} alt="photo" />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button
            onClick={() => handleSendRequest("ignored", _id)}
            className="btn btn-primary"
          >
            Ignore
          </button>
          <button
            onClick={() => handleSendRequest("interested", _id)}
            className="btn btn-secondary "
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
import Error from "../components/error";
import useFetch from "../utils/useFetch";

const Profile = () => {
  const url = import.meta.env.VITE_APP_API_URL;
  const { error, isPending, data: user } = useFetch(`${url}/user/me`);
  const getAvatar = (name) => {
    const getArray = name.split(" ");
    const initials = getArray.map((part) => part.charAt(0));

    return initials.join("");
  };
  return (
    <div className="flex flex-col justify-center items-center  m-auto">
      {isPending && (
        <span className="loading loading-spinner loading-md"></span>
      )}
      {error && <Error error={error} />}
      {user && (
        <div className="outline p-10 rounded-2xl mx-4 w-4/16">
          <h1 className="text-2xl text-center">Profile</h1>
          <div>
            <div className="avatar my-5">
              {user?.photoURL ? (
                <div className="w-24 rounded-full">
                  <img src={user.photoURL} />
                </div>
              ) : (
                <div className="avatar placeholder">
                  <div className="bg-slate-600 text-neutral-content rounded-full w-24">
                    <span className="text-2xl">{getAvatar(user.name)}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="">
              <div className="my-2">
                <h2 className="text-md">Name</h2>
                <p className="text-2xl">{user.name}</p>
              </div>

              <div className="my-2">
                <h1 className="text-md">Email</h1>
                <p className="text-2xl">{user.email}</p>
              </div>

              <div className="my-2">
                <h1 className="text-md">Birthdate</h1>
                <p className="text-2xl">20-04-2004</p>
              </div>
            </div>
            <div className="flex justify-between mt-5">
              <button className="btn btn-neutral ">Edit</button>
              <button className="btn btn-error">Delete Account</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

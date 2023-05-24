import { type NextPage } from "next";
import Head from "next/head";
import { api } from "../../utils/api";
import { useRouter } from 'next/router'
import Link from "next/link";
import { ArrowLeftIcon, FolderOpenIcon } from "@heroicons/react/24/solid"
import { useState } from "react";

import { UserDetail } from "../../components/shared/Navbar/UserDetail";

const EditProfile: NextPage = () => {
  const countries = api.profiles.getAllCountry.useQuery()
  const router = useRouter()
  const profileMutation = api.profiles.updateProfile.useMutation()

  const [profile, setProfile] = useState({
    name: "",
    countryCode: "",
    bio: ""
  });
  const handleChange = (event: any) => {
    const value = event.target.value;
    setProfile({ ...profile, [event.target.id]: value });
  };


  const saveUpdateProfile = async (e: any) => {
    e.preventDefault();

    // Create a new object that only includes the fields that have been modified
    const updatedProfile: { name?: string, bio?: string, countryCode?: string } = {};
    if (profile.name !== "") {
      updatedProfile.name = profile.name;
    }
    if (profile.bio !== "") {
      updatedProfile.bio = profile.bio;
    }
    if (profile.countryCode !== "") {
      updatedProfile.countryCode = profile.countryCode;
    }

    profileMutation.mutate(updatedProfile);
    router.push("/profile");
  };




  return (
    <>
      <Head>
        <title>Hyper - Edit Profile</title>
      </Head>
      <div className="flex justify-between mx-16 pt-8">
        <Link href="/profile"> <button className="flex btn btn-ghost normal-case gap-2 text-white"><ArrowLeftIcon className="w-4" /> Go Back</button> </Link>
        <button className="flex btn btn-primary bg-blue-700 normal-case gap-2" onClick={(e) => saveUpdateProfile(e)}><FolderOpenIcon className="w-4" />Save Changes</button>

      </div>
      <div className="mx-16">
        <h1 className="text-4xl font-bold font text-white my-4">
          Edit Profile
        </h1>
        <div className="flex flex-row gap-6  ">
          <div>
            <UserDetail></UserDetail>
          </div>
          <div className="flex flex-col gap-2 w-full justify-center">
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Name</span>

              </label>
              <input type="text" id="name"
                value={profile.name}
                onChange={(e) => handleChange(e)} placeholder="Type here" className="input input-bordered w-full" />

            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Country of Origin</span>

              </label>
              <select className="select select-bordered" id="countryCode"
                name="countryCode" onChange={(event) =>
                  setProfile(
                    { ...profile, [event.target.id]: event.target.value }
                  )}>
                <option disabled selected>Select origin</option>
                {countries?.data?.map(country =>
                  <>

                    <option value={country.localeCode}> {country.name} </option>
                  </>
                )}

              </select>

            </div>



          </div>
        </div>
        <div className="form-control my-4">
          <label className="label">
            <span className="label-text">Your bio</span>

          </label>
          <textarea className="textarea textarea-bordered h-36" placeholder="Bio" id="bio"
            value={profile.bio}
            onChange={(e) => handleChange(e)}></textarea>

        </div>
      </div>

    </>
  );
};

export default EditProfile;

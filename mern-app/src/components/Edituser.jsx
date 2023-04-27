import axios from 'axios';
import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Edituser = () => {
  const [users, setUsers]=useState({});
  const [finduser, setFinduser] = useState({});
  const { userId} = useParams();
  console.log("UseParams userID: ", userId)

  
  const displayUsersbyID = async  () => {
    const searchData = new FormData();
    searchData.append('userId', userId)
    console.log("SearchUserData: ", searchData)
    const value = await fetch('http://localhost:8080/displaySpecificUser/'+userId);
      if(value){
        const data = await value.json();

        setUsers(data);
        console.log("Search User by ID: ", data);
      }
      else{
        console.log("Error is finding user");
      }
      
    }

    useEffect(() => {
      console.log("HI")
      displayUsersbyID();
    }, []);
    
    
    useEffect(() => {
      setName(users.name);
      setAddress(users.address);
      setPhone(users.phone);
      setAbout(users.about)
      setImage(users.image);
      
    }, [users]);
    
    const [name, setName] = useState(users.name);
    const [address, setAddress] = useState(users.address);
    const [phone, setPhone] = useState(users.phone);
    const [image, setImage] = useState(users.image);
    const [about, setAbout] = useState(users.about);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [url, setUrl] = useState(false);
    const navigate = useNavigate();


    const handleImage = (e)=>{
      console.log("Image ",e.target.files[0]);
      setImage(e.target.files[0]);
      }
  

const uploadImage = async event => {
  // event.preventDefault();
  console.log("Sendinf Image: ", image)
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', 'agency');
  formData.append('cloud_name','yadgarsafar');

  const response = await axios.post(
    'https://api.cloudinary.com/v1_1/yadgarsafar/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );

  const convertedData = await response.data;
    console.log("Converted Data: ", convertedData);
    console.log("image URL: ", convertedData.secure_url);
    setUrl(convertedData.secure_url);

  console.log("Response of API: ",convertedData, " Image URL: ", convertedData.secure_url );
  const img = convertedData.secure_url;
    return img;
    
};

const updateUser = async e => {
  e.preventDefault();
  setLoading(true);
  console.log("SetURL: ", url);
  try {
  uploadImage().then(async(data) => {
    console.log('Receiving Image URL after Promise Done : ', data,  +" , typeof " +typeof(data));
  
    const formdata = new FormData();
    formdata.append("userId",users._id);
    formdata.append("name",name);
    formdata.append("address",address);
    formdata.append("phone",phone);
    formdata.append("about",about);
    formdata.append("image", data);
    console.log("Here is IMage URL: ", formdata, "type of ", typeof(formdata));

      let user = await axios.post(`http://localhost:8080/updateUser`, formdata );
  
      if(user) {
          
          navigate('/dashboard');
        } else {
          console.log("Error in updating user")
          navigate('/edituser');
        }
      
    
    });
  }
  catch (error) {
  setLoading(false);
  console.error(error);
}

}
      
    return (
          <>
            <form onSubmit={updateUser} encType="multipart/form-data"  style={{ width: "400px", margin: "auto", marginTop: "100px" }}>

            <h1 style={{ textAlign: 'center' }}>Update User</h1>
            <br /><br />

            
            <div className="mb-3" style={{ textAlign: 'left' }}> 
                <label htmlFor="formFile" className="form-label" >Upload Image</label>
                <input className="form-control" type="file" id="formFile"  onChange={handleImage} name="image"/>
                {error && !image &&<span style={{color:"red", fontSize:"16px"}}>Upload Image</span>}
            </div>
            <div className="form-outline mb-4">
                <input type="text" id="form2Example1" placeholder='Name' className="form-control" value={name} onChange={(e) => setName(e.target.value)} name="name" />
                
                {error && !name &&<span style={{color:"red", fontSize:"16px"}}>Enter valid name</span>}
            </div>

            <div className="form-outline mb-4">
                <input type="text" id="form2Example2" placeholder='Address' className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} name="address" />
                {error && !address && <span style={{color:"red", fontSize:"16px"}}>Enter address</span>}
                
            </div>

            <div className="form-outline mb-4">
                <input type="text" id="form2Example3" placeholder='phone' className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} name="phone" />
                {error && !phone && <span style={{color:"red", fontSize:"16px"}}>Phone</span>}
            </div>

            <div className="form-outline mb-4">
                <input type="text" id="form2Example3" placeholder='about' className="form-control" value={about} onChange={(e) => setAbout(e.target.value)} name="about" />
                {error && !about && <span style={{color:"red", fontSize:"16px"}}>Phone</span>}
            </div>
            
            <button type="submit" name="add" className="btn btn-primary btn-block mb-4" disabled={loading}>
            <span id="button-text">
          {loading ? "Updating User..." : "Edit"}
        </span>
            </button>
            
        </form>
        </>
  )
}
export default Edituser;
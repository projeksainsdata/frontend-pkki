import { useState } from 'react';
import axios from 'axios';

const usePostData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (body) => {
    setLoading(true); 
    setError(null); 
    try {
      const response = await axios.post(url, body);
      setData(response.data); 
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false); 
    }
  };

  return { data, loading, error, postData };
};

export default usePostData;


// import { useState } from 'react';
// import axios from 'axios';

// const usePostData = (url) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const postData = async (formData) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.post(url, formData, {
//         headers: {
//           'Authorization': `Bearer YOUR_API_KEY_HERE`, // Replace with your actual token if needed
//         },
//       });
//       setData(response.data); // Adjust according to the response structure
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { data, loading, error, postData };
// };

// export default usePostData;
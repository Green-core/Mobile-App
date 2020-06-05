 
import axios from 'axios'; 

export function getUserDetails(){
    axios
    .get(
      ' https://ancient-temple-30883.herokuapp.com/users/get/5ecb578fb2b10b0844de4cff',
    )
    .then(async (res) => { 
        const data = await res.data
        return data;
    })
    .catch((error) => console.log(error));
}


export function setUnitDetails(data){
    axios
    .get(
      ' https://ancient-temple-30883.herokuapp.com/users/get/5ecb578fb2b10b0844de4cff',
    )
    .then(async (res)  => { 
        const data = await res.data
        return data;
    })
    .catch((error) => console.log(error));
}


export function getPlantDetails(){
    axios
    .get(
      'https://ancient-temple-30883.herokuapp.com/plants/get',
    )
    .then(async (res) => { 
        const data = await res.data
        return data;
    })
    .catch((error) => console.log(error));
        retrun (data);
}
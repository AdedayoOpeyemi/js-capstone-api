// const getLikes = async (showData) => {

//   const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/9j4T0EvloyUNWKzzonxh/likes/', {
//     method: 'POST',
//     body: showData,
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   });
//   const data = await response.json();
//   return data;
// };

const getLikes = async () => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/9j4T0EvloyUNWKzzonxh/likes/');
  const data = await response.json()
  console.log(data)
  return data;
};

export { getLikes as default }
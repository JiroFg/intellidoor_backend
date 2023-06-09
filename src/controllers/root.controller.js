const root = async (req, res) => {
  //devuelve un json con los recursos por los que esta conformado el api
  const json = {
    "token": "intellidoorbackend-production.up.railway.app/login",
    "users": "intellidoorbackend-production.up.railway.app/users",
    "classrooms": "intellidoorbackend-production.up.railway.app/classrooms",
    "inuseclassrooms": "intellidoorbackend-production.up.railway.app/inuseclassrooms",
    "doors": "intellidoorbackend-production.up.railway.app/doors"
  }
  res.status(200).json(json)
};

export default root;
const root = async (req, res) => {
  const json = {
    "token": "intellidoorbackend-production.up.railway.app/login",
    "users": "intellidoorbackend-production.up.railway.app/users",
    "classrooms": "intellidoorbackend-production.up.railway.app/classrooms",
    "inuseclassrooms": "intellidoorbackend-production.up.railway.app/inuseclassrooms",
    "doors": "intellidoorbackend-production.up.railway.app/doors"
  }
  res.status(200).send(JSON.stringify(json))
};

export default root;
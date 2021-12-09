import http from "../commonHttp";

const fetchAllTutorials = async () => {
  try {
    let response = await http.get();
    return response.data;
  } catch (err) {
    console.log("Error in service", err)
  }
};

const fetchTutorialById = async (id) => {
  try {
    let response = await http.get(`/${id}`);
    return response.data;
  } catch (err) {
    console.log("Error in service", err)
  }
};

const createNewTutorial = async (data) => {
  try {
    let response = await http.post(``,data);
    return response.data;
  } catch (err) {
    console.log("Error in service", err)
  }
};

const updateTutorial = async (data) => {
  try {
    let response = await http.put(``,data);
    return response.data;
  } catch (err) {
    console.log("Error in service", err)
  }
};

const removeTutorial = async (id) => {
  try {
    let response = await http.delete(`/${id}`);
    return response.data;
  } catch (err) {
    console.log("Error in service", err)
  }
};

const removeAllTutorials = async () => {
  try {
    let response = await http.delete();
    return response.data;
  } catch (err) {
    console.log("Error in service", err)
  }
};

const findTutorialByTitle = async (data) => {
  try {
    let response = await http.post(`/qp`, data);
    return response.data;
  } catch (err) {
    console.log("Error in service", err)
  }
};

const findTutorialByStatus = async (data) => {
  return await http.post(`/qp`, data)
    .then(res => res.data)
    .catch(err => console.log("Error in service", err));
};

const TutorialService = {
  fetchAllTutorials,
  fetchTutorialById,
  createNewTutorial,
  updateTutorial,
  removeTutorial,
  removeAllTutorials,
  findTutorialByTitle,
  findTutorialByStatus
};

export default TutorialService;

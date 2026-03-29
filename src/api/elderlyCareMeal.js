import request, { withQuery } from "./request";

export const getDinnerProviders = () => {
  return request({
    url: "/api/dinner_provider",
    method: "GET",
  });
};

export const addDinnerProvider = (data) => {
  return request({
    url: "/api/dinner_provider",
    method: "POST",
    data,
  });
};

export const updateDinnerProvider = (id, data) => {
  return request({
    url: withQuery("/api/dinner_provider", { id }),
    method: "PUT",
    data,
  });
};

export const deleteDinnerProvider = (id) => {
  return request({
    url: withQuery("/api/dinner_provider", { id }),
    method: "DELETE",
  });
};

export const addDetailMeal = (data) => {
  return request({
    url: "/api/detail_meal",
    method: "POST",
    data,
  });
};

export const getDetailMeals = ({ belongto, datetime, type }) => {
  return request({
    url: withQuery("/api/detail_meal", { belongto, datetime, type }),
    method: "GET",
  });
};

export const updateDetailMeal = (id, data) => {
  return request({
    url: withQuery("/api/detail_meal", { id }),
    method: "PUT",
    data,
  });
};

export const deleteDetailMeal = (id) => {
  return request({
    url: withQuery("/api/detail_meal", { id }),
    method: "DELETE",
  });
};

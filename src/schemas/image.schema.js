const image = async (url) => {
  try {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type");
    if (response.ok && contentType && contentType.startsWith("image/")) {
      return false;
    }
    return true;
  } catch {
    return true;
  }
};
export default image;
